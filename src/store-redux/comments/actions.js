import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";

const commentsActions = {
  /**
   * Загрузка комментариев к товару по id товара
   * @param _id {String}
   * @param reload {boolean}
   * @return {Function}
   */
  load: (_id, reload = false) => {
    return async (dispatch, getState, services) => {
      dispatch({type: reload ? 'comments/reload-start' : 'comments/load-start'});
      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${_id}`
        });
        let rootParent
        const data = treeToList(listToTree(res.data.result.items)[0].children, (comment, level) => {
          if (!rootParent && level === 0) {
            rootParent = comment.parent
          }
          return ({
            level,
            author: {
              name: comment.author.profile.name,
              _id: comment.author._id
            },
            dateCreate: comment.dateCreate,
            text: comment.text,
            _id: comment._id
          })
        })
        dispatch({type: 'comments/load-success', payload: {
          data,
          count: res.data.result.count,
          rootParentId: rootParent._id,
          rootParentType: rootParent._type
        }});

      } catch (e) {
        dispatch({type: 'comments/load-error'});
      }
    }
  },

  /**
   * Создание комментария к сущности
   * @return {Function}
   */
  post: () => {
    return async (dispatch, getState, services) => {
      const {targetParentId, targetParentType, text} = getState().comments
      if (!text || !targetParentId || !targetParentType) return
      dispatch({type: 'comments/post-start'});
      try {
        const res = await services.api.request({
          url: `/api/v1/comments`,
          method: 'POST',
          body: JSON.stringify({
            text,
            parent: {
              _id: targetParentId,
              _type: targetParentType
            }
          })
        });
        if (res.status !== 200) throw new Error()
        dispatch({type: 'comments/post-success'});
        dispatch(commentsActions.load(getState().comments.rootParentId, true))
      } catch (e) {
        dispatch({type: 'comments/post-error'});
      }
    }
  },

    /**
   * Установка родителя нового комментария
   * @param _id {String}
   * @param _type {String}
   * @return {Function}
   */
    setParent: (_id, _type) => {
      return async (dispatch, getState, services) => {
        let renderAfterCommentWithId
        let renderLevel
        const {rootParentId, data} = getState().comments
        if (rootParentId !== _id) {
          const replyIndex = data.findIndex(c => c._id === _id)
          const foundNextTreeIndex = data.findIndex((c,i) => {
            if (i <= replyIndex) return false
            if (c.level <= data[replyIndex].level) return true
          })
          if (foundNextTreeIndex === -1) renderAfterCommentWithId = data[data.length - 1]._id
          else renderAfterCommentWithId = data[foundNextTreeIndex-1]._id
          renderLevel = data[replyIndex].level + 1
        }
        dispatch({
          type: "comments/set-parent",
          payload: {
            _id,
            _type,
            renderAfterCommentWithId,
            renderLevel
          }
        })
      }
    },
}

export default commentsActions