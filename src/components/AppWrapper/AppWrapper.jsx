import React from 'react';

/**
 * Компонент-обёртка приложения
 * @param children {React.ReactElement} Дочерний компонент
 * @returns {React.ReactElement}
 */

export function AppWrapper(props) {
  const { children } = props

  return (
    <div className='App'>
      {children}
    </div>
  )
}