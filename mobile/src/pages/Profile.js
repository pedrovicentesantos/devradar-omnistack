import React from 'react';

import {WebView} from 'react-native-webview';

// Componente da página principal (página com o mapa)
function Profile({navigation}) {
  // Para pegar o parâmetro 'github_username' que foi enviado com a navegação da página principal pelo Callout
  const githubUsername = navigation.getParam('github_username');
  return <WebView style={{flex:1}} source={{uri:`https://github.com/${githubUsername}`}} />
}

export default Profile;