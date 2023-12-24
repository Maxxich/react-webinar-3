import { memo, useCallback, useEffect, useMemo, useRef } from "react";
import AddCommentForm from "../../components/add-comment-form";
import CommentCard from "../../components/comment-card";
import CommentSigninOffer from "../../components/comment-signin-offer";
import { useLocation } from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import CommentsLayout from "../../components/comments-layout";
import Spinner from "../../components/spinner";
import {useDispatch, useSelector as useReduxSelector} from 'react-redux'
import shallowEqual from "shallowequal";
import commentsActions from '../../store-redux/comments/actions';
import useTranslate from '../../hooks/use-translate';
import formatDate from "../../utils/format-date";

function Comments() {
  const location = useLocation();
  const dispatch = useDispatch();

  const select = useSelector(state => ({
    authExists: state.session.exists,
    authId: state.session.user._id,
  }));

  const reduxSelect = useReduxSelector(state => ({
    comments: state.comments.data,
    count: state.comments.count,
    waiting: state.comments.waiting,
    rootParentId: state.comments.rootParentId,
    rootParentType: state.comments.rootParentType,
    targetParentId: state.comments.targetParentId,
    targetParentType: state.comments.targetParentType,
    text: state.comments.text,
    renderAfterCommentWithId: state.comments.renderAfterCommentWithId,
    renderLevel: state.comments.renderLevel
  }), shallowEqual);

  const callbacks = {
    onCancelReply: useCallback(
      _id => dispatch({type: "comments/reset-parent"}
    ), [dispatch]),

    onClickReply: useCallback(
      _id => dispatch(commentsActions.setParent(_id,'comment'))
    , [dispatch]),

    onTextChange: useCallback((text) => dispatch({
      type: "comments/set-text",
      payload: text
    }), [dispatch]),

    onSend: useCallback(() => dispatch(commentsActions.post()), [dispatch])
  };

  const {t,lang} = useTranslate();
  
  const renders = {
    title: useMemo(() => (
      `${t('comments.comments')} (${reduxSelect.count || 0})`
    ), [reduxSelect.count, t]),
    maxLevel: 7
  }
  
  const ref = useRef()

  useEffect(() => {
    if (!reduxSelect.targetParentId) return 
    if (reduxSelect.targetParentId === reduxSelect.rootParentId) return 
    ref.current.scrollIntoView({
      block: 'center',
      behavior: 'smooth',
    })
    ref.current.focus?.()
  }, [reduxSelect.targetParentId, reduxSelect.rootParentId])

  return (
    <Spinner active={reduxSelect.waiting}>
      <CommentsLayout title={renders.title}>
        {
          reduxSelect.comments.map((c) => (
            <div key={c._id}>
              <CommentCard _id={c._id}
                            authorName={c.author.name}
                            dateCreate={formatDate(c.dateCreate, lang)}
                            level={c.level}
                            maxLevel={renders.maxLevel}
                            text={c.text}
                            labelReply={t('comments.reply')}
                            key={c._id}
                            onReply={callbacks.onClickReply}
                            belongsToAuth={c.author._id === select.authId}/>
              {reduxSelect.renderAfterCommentWithId === c._id && (select.authExists 
                ? <AddCommentForm title={t('comments.new-reply')}
                                  sendLabel={t('comments.send')}
                                  cancelLabel={t('comments.cancel')}
                                  level={reduxSelect.renderLevel}
                                  maxLevel={renders.maxLevel+1}
                                  key={'form' + reduxSelect.targetParentId}
                                  onCancel={callbacks.onCancelReply}
                                  value={reduxSelect.text}
                                  onValueChange={callbacks.onTextChange}
                                  disabled={reduxSelect.waiting}
                                  placeholder={t('comments.text')}
                                  onSend={callbacks.onSend}
                                  ref={ref}/>
                : <CommentSigninOffer to={'/login'} 
                                      backPathname={location.pathname}
                                      level={reduxSelect.renderLevel}
                                      maxLevel={renders.maxLevel+1}
                                      onCancel={callbacks.onCancelReply}
                                      linkLabel={t('comments.login')}
                                      messageLabel={t('comments.to-reply')}
                                      key={'offer' + reduxSelect.targetParentId}
                                      cancelLabel={t('comments.cancel')}
                                      ref={ref}/>
              )}
            </div>
          ))
        }

        {
          (reduxSelect.rootParentId === reduxSelect.targetParentId) && (select.authExists
            ? <AddCommentForm title={t('comments.new-comment')} 
                              sendLabel={t('comments.send')}
                              value={reduxSelect.text}
                              onValueChange={callbacks.onTextChange}
                              disabled={reduxSelect.waiting}
                              placeholder={t('comments.text')}
                              onSend={callbacks.onSend}/>
            :  <CommentSigninOffer to={'/login'} 
                                   backPathname={location.pathname}
                                   linkLabel={t('comments.login')}
                                   messageLabel={t('comments.to-comment')}/>
          )
        }
      </CommentsLayout>
  </Spinner>
  )
}

export default memo(Comments)