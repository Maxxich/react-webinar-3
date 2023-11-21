import React from 'react';

/**
 * Компонент добавления записи
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
export function AddItem(props) {
  const {store} = props

  return (
    <button onClick={() => store.addItem()}>Добавить</button>
  )
}