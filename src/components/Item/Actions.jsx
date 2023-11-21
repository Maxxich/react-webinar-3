import React from 'react';

/**
 * Компонент-Обертка над компонтами управления записью
 * @param children {React.ReactElement} Дочерний компонент
 * @returns {React.ReactElement}
 */

export function Actions(props) {
  const { children } = props
  return (
    <div className='Item-actions'>
      {children}
    </div>
  )
}