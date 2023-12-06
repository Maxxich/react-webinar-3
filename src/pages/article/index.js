import {memo, useCallback, useEffect} from 'react';
import { useParams } from 'react-router';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useSelector from '../../store/use-selector';
import useStore from '../../store/use-store';
import ArticleInfo from '../../components/article-info';
import Navigation from '../../components/navigation';
import { navigationLinks } from '../navigation-links';
import PageLayout from '../../components/page-layout';
import { i } from '../../internationalization/i';

function ArticlePage() {

  const { id } = useParams()
  const store = useStore();
  const data = useSelector(state => state.article.data);
  const status = useSelector(state => state.article.status);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  }

  useEffect(() => {
    store.actions.article.load(id)
  }, [id])

  useEffect(() => store.actions.article.reset.bind(store.actions.article), [])

  const render = {
    headTitle: useCallback(() => {
      switch (status) {
        case 'idle': return i('Загрузка...')
        case 'rejected': return i('Ошибка')
        case 'pending': return i('Загрузка...')
        case 'fulfilled': return data.title
        default: return null
      }
    }, [status, data]),

    info: useCallback(() => {
      switch (status) {
        case 'idle': return i('Загрузка...')
        case 'rejected': return i('Ошибка. Товар не найден')
        case 'pending': return i('Загрузка...')
        case 'fulfilled': return <ArticleInfo article={data}
                                              onAdd={callbacks.addToBasket}/>
        default: return null
      }
    }, [status, data, callbacks]),
  }

  return (
    <PageLayout
      head={
        <Head title={render.headTitle()}/>
      }
      navigation={
        <>
          <Navigation links={navigationLinks}/>
          <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                      sum={select.sum}/>
        </>
      }
    >
      {render.info()}
    </PageLayout>

  );
}

export default memo(ArticlePage);
