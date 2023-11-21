import React from 'react';
import { getWordAfterCount } from '../../utils/getWordAfterCount.js';
import { Actions } from './Actions.jsx';
import { Delete } from './Delete.jsx';

/**
 * Компонент записи
 * @param code {number} Код записи
 * @param selected {boolean} Флаг состояния selected записи
 * @param selectCount {number | undefined} Сколько раз запись была выбрана
 * @param title {string} Название записи
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */

export function Item(props) {
  const { code, selected, selectCount, title, store } = props

  const onItemClick = () => store.selectItem(code)
  const className = 'Item' + (selected ? ' Item_selected' : '')
  const titleText = (selectCount > 0) 
    ? `${title}  | Выделяли ${selectCount} ${getWordAfterCount(selectCount, 'раз', 'раза')}`
    : title

  return (
    <li className='List-item'>
      <div 
        className={className}
        onClick={onItemClick}
      >
        <div className='Item-code'>{code}</div>
        <div className='Item-title'>{titleText}</div>
        <Actions>
          <Delete
            store={store}
            code={code}
          />
        </Actions>
      </div>
    </li>
  )
}