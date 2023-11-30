import React, { useCallback } from 'react';
import List from "./components/list";
import CartControls from "./components/cart/cart-controls";
import Head from './components/Head';
import PageLayout from "./components/page-layout";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;

  const callbacks = {
    onAddGoodToCart: useCallback((goodCode) => {
      store.addGoodToCart(goodCode)
    }, [store]),

    onDeleteGoodFromCart: useCallback((goodCode) => {
      store.deleteGoodFromCart(goodCode)
    }, [store])
  }

  const goodsInCart = list.filter((good) => good.quantityInCart)

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <CartControls goodsInCart={goodsInCart} 
                    onDeleteFromCart={callbacks.onDeleteGoodFromCart}/>
      <List list={list}
            onAddGoodToCart={callbacks.onAddGoodToCart}/>
    </PageLayout>
  );
}

export default App;
