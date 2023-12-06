import {memo, useCallback, useEffect, useState} from 'react';
import Item from "../../components/item";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PaginationTool from '../../components/pagination-tool';
import { getValidPageFromUrlSearchParams, setPageToUrlSearchParams } from '../../utils';
import Navigation from '../../components/navigation';
import { navigationLinks } from '../navigation-links';
import PageLayout from '../../components/page-layout';
import { i } from '../../internationalization/i';
import LanguageSelect from '../../components/language-select';

function CatalogPage() {

  const store = useStore();
  const lastPage = useSelector(state => state.catalog.lastPage)

  const [page, setPage] = useState(
    getValidPageFromUrlSearchParams(lastPage)
  )

  useEffect(() => {
    setPageToUrlSearchParams(page)
    store.actions.catalog.load(page);
  }, [page])

  useEffect(() => {
    if (page > lastPage) {
      setPage(lastPage)
    }
  }, [lastPage])

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));
  
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Изменить номер страницы
    changePage: useCallback((page) => setPage(page), [])
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout
      head={
        <Head title={i('Магазин')}
          addon={<LanguageSelect/>}
        />
      }
      navigation={
        <>
          <Navigation links={navigationLinks}/>
          <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                      sum={select.sum}/>
        </>
      }
    >
      <List list={select.list} renderItem={renders.item}/>
      <PaginationTool page={page}
                      lastPage={lastPage || 1}
                      changePage={callbacks.changePage}/>
    </PageLayout>

  );
}

export default memo(CatalogPage);
