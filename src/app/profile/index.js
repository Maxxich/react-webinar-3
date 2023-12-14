import {memo, useEffect} from 'react';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";
import AuthNavigation from '../../containers/auth-navigation';
import ProfileCard from '../../components/profile-card';

/**
 * Страница профиля
 */
function Profile() {
  const store = useStore();

  const select = useSelector(state => ({
    profile: state.profile.data,
    waiting: state.profile.waiting,
    token: state.auth.data.token
  }));

  useInit(() => {
    store.actions.profile.load(select.token);
  }, [select.token]);

  // Очистка store перед уходом со страницы
  useEffect(() => {
    return () => store.actions.profile.clear()
  }, [])

  const {t} = useTranslate();

  return (
    <PageLayout>
      <AuthNavigation/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <ProfileCard profile={select.profile} t={t}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
