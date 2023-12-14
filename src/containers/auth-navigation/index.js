import {memo, useCallback, useEffect, useMemo, useState} from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import SideLayout from "../../components/side-layout";
import AuthTool from "../../components/auth-tool";
import AuthMenu from "../../components/auth-menu";

/**
 * Контейнер авторизованной навигации
 */
function AuthNavigation() {
  const store = useStore();
  const [pathname, setPathname] = useState(new URL(window.location.href).pathname)
  const [search, setSearch] = useState(new URL(window.location.href).search)

  const select = useSelector(state => ({
    name: state.auth.data.name,
    isAuthenticated: state.auth.isAuthenticated,
  }));

  const callbacks = {
    onLogout: useCallback(() => store.actions.auth.logout(), [store]),
  }

  const {t} = useTranslate();

  const options = {
    menu: useMemo(() => ([
      {key: 1, title: select.name, link: '/profile'},
    ]), [select.name])
  };
  const links = {
    login: useMemo(() => {
      // Формирование ссылки на /login с любой страницы кроме /login
      if (pathname !== '/login') {
        const searchString = search 
          ? '&callbackSearch=' + search.slice(1).replaceAll('&', '/\\') 
          : ''
        return '/login?callbackPath=' + pathname + searchString
      // Ссылка на /login на самой странице /login во избежание дублирования 
      // параметров callbackSearch и callbackPath при переходе
      } else {
        return pathname + search
      }
    }, [pathname, search])
  }

  //Изменение локальных состояний search, pathname при измениении URL
  useEffect(() => {
    let previousUrl = '';
    const observer = new MutationObserver(function() {
      if (window.location.href !== previousUrl) {
          previousUrl = window.location.href;
          const url = new URL(window.location.href)
          setSearch(url.search)
          setPathname(url.pathname)
        }
    });
    const config = {subtree: true, childList: true};
    observer.observe(document, config);
    return () => {
      observer.disconnect();
    };
  },[])

  return (
    <SideLayout side='end' border={'bottom'} sideMargin={'none'}>
      <>{select.isAuthenticated && <AuthMenu items={options.menu}/>}</>
      <AuthTool onLogout={callbacks.onLogout} 
                loginLink={links.login}
                isAuthenticated={select.isAuthenticated}
                t={t}/>
    </SideLayout>
  );
}

export default memo(AuthNavigation);
