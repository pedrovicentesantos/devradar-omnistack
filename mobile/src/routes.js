import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Main from './pages/Main';
import Profile from './pages/Profile';

// createAppContainer deve ser usado 1 única vez dentro da aplicação
// Routes e não routes pois é um componente
const Routes = createAppContainer(
  // Passa uns objetos com as rotas da aplicação
  createStackNavigator({
    Main:{
      // Qual componente vai ser renderizado
      screen: Main,
      navigationOptions: {
        title: 'DevRadar'
      }
    },
    Profile:{
      screen: Profile,
      navigationOptions:{
        title: 'Perfil no Github'
      }
    },
  }, {
    // Configurações aplicadas a todas as telas
    defaultNavigationOptions:{
      headerTintColor: '#FFF',
      // Para não exibir texto na setinha pra voltar de página
      // headerBackTitleVisible: false,
      headerStyle:{
        backgroundColor: '#7D40E7',
      }
    },
  })
);

export default Routes;