import React from 'react';
import { AddItem } from './AddItem.jsx';

/**
 * Компонент управления приложением
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
export function AppControls(props) {
  const {store} = props
    
  return (
    <div className='App-controls'>
      <AddItem store={store}/>
    </div>
  )
}