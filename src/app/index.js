import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainPage from './main';
import ArticlePage from './article';
import NotFoundPage from './not-found';
import useSelector from '../store/use-selector';
import Basket from './basket';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <>
        <MainPage/>
        {activeModal === 'basket' && <Basket/>}
      </>
    },
    {
      path: '/articles/:id',
      element: <> 
        <ArticlePage/>
        {activeModal === 'basket' && <Basket/>}
      </>
    },
    {
      path: '*',
      element: <> 
        <NotFoundPage/>
        {activeModal === 'basket' && <Basket/>}
      </>
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App;
