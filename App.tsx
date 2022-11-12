import React from 'react';
import { NativeBaseProvider } from 'native-base';
import Index from './src';

const App = () => {
  return (
    <NativeBaseProvider>
      <Index />
    </NativeBaseProvider>
  );
};

export default App;
