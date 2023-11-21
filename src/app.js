import React from 'react';
import { Head } from './components/Head';
import { AppControls } from './components/AppControls';
import { ItemsList } from './components/Item';
import { AppContainer } from './components/AppContainer';
import { AppWrapper } from './components/AppWrapper';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;

  return (
    <AppWrapper>
      <Head/>
      <AppControls store={store}/>
      <AppContainer>
        <ItemsList list={list} store={store}/>
      </AppContainer>
    </AppWrapper>
  );
}

export default App;
