// Начальное состояние
export const initialState = {
  data: [],
  waiting: false, // признак ожидания загрузки
  count: undefined,
  rootParentId: undefined,
  rootParentType: undefined,
  targetParentId: undefined,
  targetParentType: undefined,
  renderAfterCommentWithId: undefined,
  renderLevel: undefined,
  text: '' 
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return {...state, data: [], waiting: true};
    case "comments/reload-start":
      return {...state, waiting: true};
  
    case "comments/load-success":
      return {
        ...state, 
        data: action.payload.data, 
        waiting: false, 
        count: action.payload.count,
        rootParentId: action.payload.rootParentId,
        rootParentType: action.payload.rootParentType,
        targetParentId: action.payload.rootParentId,
        targetParentType: action.payload.rootParentType,
        renderAfterCommentWithId: undefined,
        renderLevel: undefined,
        text: ''
      };

    case "comments/load-error":
      return {...state, data: [], waiting: false, count: undefined}; //@todo текст ошибки сохранять?

    case "comments/set-parent":
      return {
        ...state, 
        targetParentId: action.payload._id,
        targetParentType: action.payload._type,
        renderAfterCommentWithId: action.payload.renderAfterCommentWithId,
        renderLevel: action.payload.renderLevel,
        text: ''
      }
    
    case "comments/reset-parent":
      return {
        ...state, 
        targetParentId: state.rootParentId,
        targetParentType: state.rootParentType,
        renderAfterCommentWithId: undefined,
        renderLevel: undefined,
        text: ''
      }
    
    case "comments/set-text": 
      return {
        ...state, 
        text: action.payload
      }

    case "comments/post-start":
      return {...state, waiting: true}

    // @TODO
    case "comments/post-success":
      return {
        ...state, 
        waiting: false, 
        targetParentId: state.rootParentId,
        targetParentType: state.rootParentType,
        renderAfterCommentWithId: undefined,
        renderLevel: undefined,
        text: '',
        data: [...action.payload]
      }
      
    case "comments/post-error":
      return {...state, waiting: false}
    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
