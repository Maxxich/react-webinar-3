import React from 'react';

/**
 * Компонент удаления записи
 * @param store {Store} Хранилище состояния приложения
 * @param code {number} Код записи
 * @returns {React.ReactElement}
 */

export function Delete(props) {
  const { code, store } = props

  return (
    <button onClick={() => store.deleteItem(code)}>
      Удалить
    </button>
  )
}