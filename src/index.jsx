import React from 'react';
import ReactDom from 'react-dom/client';
import App from './App';
import { BookProvider } from './context/book';
// import { UserProvider as UseProvider } from './context/user';
import UseProvider from './context/user';

const el = document.getElementById('root');
const root = ReactDom.createRoot(el);

root.render(
    <UseProvider>
        <BookProvider>
            <App />
        </BookProvider>
    </UseProvider>
);