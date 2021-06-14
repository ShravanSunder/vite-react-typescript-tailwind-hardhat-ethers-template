import { Button, StyledEngineProvider } from '@material-ui/core';
import React, { Suspense, useState } from 'react';
import { RecoilRoot } from 'recoil';
import { ErrorBoundary, ErrorFallback } from '~~/components/common/app/ErrorFallback';
import { MainPage } from '~~/components/routes/MainPage/MainPage';

const App = () => {
   const [count, setCount] = useState(0);

   return (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
         <RecoilRoot>
            <StyledEngineProvider injectFirst={false}>
               <Suspense fallback={<div></div>}>
                  <MainPage></MainPage>
               </Suspense>
            </StyledEngineProvider>
         </RecoilRoot>
      </ErrorBoundary>
   );
};

export default App;
