import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './app.js';
import Store from './store.js';
import { generateUniqueNumber } from './utils/getUniqueNumber.js';

const store = new Store({
  list: [
    {code: generateUniqueNumber(), title: 'Название элемента'},
    {code: generateUniqueNumber(), title: 'Некий объект'},
    {code: generateUniqueNumber(), title: 'Заголовок'},
    {code: generateUniqueNumber(), title: 'Очень длинное название элемента из семи слов'},
    {code: generateUniqueNumber(), title: 'Запись'},
    {code: generateUniqueNumber(), title: 'Шестая запись'},
    {code: generateUniqueNumber(), title: 'Седьмая запись'},
  ]
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store}/>);
});

// Первый рендер приложения
root.render(<App store={store}/>);
