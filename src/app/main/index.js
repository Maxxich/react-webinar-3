import {memo} from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import AuthNavigation from '../../containers/auth-navigation';
import useSelector from '../../hooks/use-selector';

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {

  const store = useStore();

  const categoriesList = useSelector(state => state.category.list)

  useInit(async () => {
    if (categoriesList.length) {
      const urlParams = new URLSearchParams(window.location.search);
      let category = ''
      if (urlParams.has('category')) {
        const categoryUrlParam = urlParams.get('category');
        if (categoriesList.find(c => c.value === categoryUrlParam)) {
          category = categoryUrlParam
        }
      }
      store.actions.catalog.initParams({category});
    } else {
      store.actions.category.initCategories();
    }
  }, [categoriesList], true);


  const {t} = useTranslate();

  return (
    <PageLayout>
      <AuthNavigation/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <CatalogFilter/>
      <CatalogList/>
    </PageLayout>
  );
}

export default memo(Main);
