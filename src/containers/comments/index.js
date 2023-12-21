import { memo, useCallback, useMemo } from "react";
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

function Comments() {
  const location = useLocation();
  const dispatch = useDispatch();

  const select = useSelector(state => ({
    authExists: state.session.exists,
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
  
  const renders = {
    title: useMemo(() => (
      `Комментарии (${reduxSelect.count || 0})`
    ), [reduxSelect.count]),
  }

  return (
    <Spinner active={reduxSelect.waiting}>
      <CommentsLayout title={renders.title}>
        {
          reduxSelect.comments.map((c) => (
            <div key={c._id}>
              <CommentCard comment={c}
                          labelReply={'Ответить'}
                          key={c._id}
                          onReply={callbacks.onClickReply}/>
              {reduxSelect.renderAfterCommentWithId === c._id && (select.authExists 
                ? <AddCommentForm title={'Новый ответ'}
                                  sendLabel={'Отправить'}
                                  cancelLabel={'Отмена'}
                                  level={reduxSelect.renderLevel}
                                  key={'form' + reduxSelect.targetParentId}
                                  onCancel={callbacks.onCancelReply}
                                  value={reduxSelect.text}
                                  onValueChange={callbacks.onTextChange}
                                  disabled={reduxSelect.waiting}
                                  placeholder={'Текст'}
                                  onSend={callbacks.onSend}/>
                : <CommentSigninOffer to={'/login'} 
                                      backPathname={location.pathname}
                                      level={reduxSelect.renderLevel}
                                      onCancel={callbacks.onCancelReply}
                                      linkLabel="Войдите"
                                      messageLabel=", чтобы иметь возможность ответить."
                                      key={'offer' + reduxSelect.targetParentId}
                                      cancelLabel="Отмена"/>
              )}
            </div>
          ))
        }

        {
          (reduxSelect.rootParentId === reduxSelect.targetParentId) && (select.authExists
            ? <AddCommentForm title={'Новый комментарий'} 
                              sendLabel={'Отправить'}
                              value={reduxSelect.text}
                              onValueChange={callbacks.onTextChange}
                              disabled={reduxSelect.waiting}
                              placeholder={'Текст'}
                              onSend={callbacks.onSend}/>
            :  <CommentSigninOffer to={'/login'} 
                                   backPathname={location.pathname}
                                   linkLabel="Войдите"
                                   messageLabel=", чтобы иметь возможность комментровать"/>
          )
        }
      </CommentsLayout>
  </Spinner>
  )
}

export default memo(Comments)