import React from 'react';
// Aqui altero a status bar para todas as páginas, mas poderia fazer individualmente
import {StatusBar, LogBox} from 'react-native';

import Routes from './src/routes';

LogBox.ignoreLogs([
  // Só é necessário passar o início da mensagem para ela ser ignorada
  'Unrecognized WebSocket'
]);

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7"/>
      <Routes />
    </>
  );
}