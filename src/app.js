import React, { useCallback } from 'react';
import List from "./components/list";
import Cart from "./components/cart/cart";
import Head from './components/Head';
import PageLayout from "./components/page-layout";
import Good from './components/good';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const {
    list, cartList, cartTotalCost
  } = store.getState()

  const callbacks = {
    onAddGoodToCart: useCallback((goodCode) => {
      store.addGoodToCart(goodCode)
    }, [store]),

    onDeleteGoodFromCart: useCallback((goodCode) => {
      store.deleteGoodFromCart(goodCode)
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Cart list={cartList} 
            onDelete={callbacks.onDeleteGoodFromCart}
            totalCost={cartTotalCost}/>
      <List list={list}
            renderItem={(good) => (
              <Good good={good} 
                    onAddToCart={callbacks.onAddGoodToCart}/>
            )}/>
    </PageLayout>
  );
}

export default App;
