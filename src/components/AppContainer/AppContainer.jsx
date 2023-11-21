import React from 'react';

/**
 * Компонент-конейнер приложения
 * @param children {React.ReactElement} Дочерний компонент
 * @returns {React.ReactElement}
 */

export function AppContainer(props) {
  const { children } = props

  return (
    <main className='App-center'>
      {children}
    </main>
  )
}