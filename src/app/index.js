import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './layout';
import CatalogPage from '../pages/catalog';
import ArticlePage from '../pages/article';
import NotFoundPage from '../pages/not-found-page';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {



  const router = createBrowserRouter([
    {
      element: <Layout/>,
      children: [
        {
          path: '/',
          element: <CatalogPage/>
        },
        {
          path: '/articles/:id',
          element: <ArticlePage/>
        },
        {
          path: '*',
          element: <NotFoundPage/>
        }
      ]
    },
  ]);

  return <RouterProvider router={router} />
}

export default App;
