import React from 'react';
import { Item } from './Item.jsx';

/**
 * Компонент списка записей
 * @param list {list} Спискок записей
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
export function ItemsList(props) {
    const {list, store} = props

    return (
        <ul className='List'>{
            list.map(item =>
              <Item
                code={item.code}
                selected={item.selected}
                selectCount={item.selectCount}
                title={item.title}
                store={store}
                key={item.code}
              />
            )}
          </ul>
    )
}