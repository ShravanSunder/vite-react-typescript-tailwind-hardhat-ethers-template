import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const App = lazy(() => import('./components/common/app/App'));

ReactDOM.render(
   <React.StrictMode>
      <Suspense fallback={<div></div>}>
         <App />
      </Suspense>
   </React.StrictMode>,
   document.getElementById('root')
);
