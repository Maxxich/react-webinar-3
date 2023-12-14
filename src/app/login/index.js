import {memo, useLayoutEffect} from 'react';
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import AuthNavigation from '../../containers/auth-navigation';
import LoginForm from '../../containers/login-form';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import Title from '../../components/title';

/**
 * Страница входа
 */
function Login() {

  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  // Перенаправление после авторизации
  useLayoutEffect(() => {
    if (!isAuthenticated) return
    // Перенаправление по переданному пути
    if (searchParams.has('callbackPath')) {

      if (searchParams.has('callbackSearch')) {
        const searchString = '?' + searchParams.get('callbackSearch').replaceAll('/\\', '&')
        const path = searchParams.get('callbackPath')
        return navigate(path + searchString, {replace: true});
      } else {
        navigate(searchParams.get('callbackPath'), {replace: true});
      }
    // Перенаправление на главную
    } else {
      navigate('/', {replace: true});
    }
  }, [isAuthenticated, location.key])

  const {t} = useTranslate();

  return (
    <PageLayout>
      <AuthNavigation/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Title text={'Вход'}/>
      <LoginForm/>
    </PageLayout>
  );
}

export default memo(Login);
