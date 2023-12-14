import {Routes, Route, Navigate} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from './login';
import Profile from './profile';
import useInit from '../hooks/use-init';
import useStore from '../hooks/use-store';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {

  const store = useStore()

  const select = useSelector(state => ({
    activeModal: state.modals.name,
    isAuthenticated: state.auth.isAuthenticated,
    waitingForAuth: state.auth.waitingForAuth
  }));

  useInit(() => {
    store.actions.auth.initAuthentication();
  }, []);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/login'} element={<Login/>}/>
        <Route path={'/profile'} element={
          (select.isAuthenticated || select.waitingForAuth) ? <Profile/> : <Navigate to='/login?callbackPath=/profile' replace/>
        }/>
      </Routes>

      {select.activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
