import React from 'react';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import store from './store';
import * as UiContext from './contexts/ui';
import Routes from './routes';

export default function App() {
  const [applicationState, setApplicationState] = React.useState(
    UiContext.createApplicationInitialState(),
  );

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <UiContext.Context.Provider
          value={{applicationState, setApplicationState}}>
          <Routes />
        </UiContext.Context.Provider>
      </SafeAreaProvider>
    </Provider>
  );
}
