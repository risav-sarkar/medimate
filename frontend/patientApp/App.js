import React, {useRef} from 'react';
import NavigatorContainer from './src/NavigatorContainer';
import {AuthContextProvider} from './src/context/AuthContext';
import {ToastProvider} from 'react-native-toast-notifications';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import Toast from './src/components/toast';

const App = () => {
  const queryClient = useRef(
    new QueryClient({
      defaultOptions: {
        queries: {staleTime: 'Infinity'},
        refetchOnWindowFocus: 'always',
      },
    }),
  );

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AuthContextProvider>
        <ToastProvider
          renderType={{
            custom: toast => (
              <Toast type={toast.data.type} message={toast.message} />
            ),
          }}>
          <QueryClientProvider client={queryClient.current}>
            <NavigatorContainer />
          </QueryClientProvider>
        </ToastProvider>
      </AuthContextProvider>
    </GestureHandlerRootView>
  );
};

export default App;
