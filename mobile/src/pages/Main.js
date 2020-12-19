import React, {useState, useEffect} from 'react';
// Se eu importasse um 'Button' ele teria um estilo default para iOS e Android
// Como vamos criar nosso próprio botão, faz mais sentido usar o 'TouchableOpacity'
import {StyleSheet, Image, View, Text, TextInput, TouchableOpacity,
        Platform, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
// Marker: para realizar marcações dentro do mapa
import MapView, {Marker, Callout} from 'react-native-maps';
// Pedir permissões ao usuário e pegar a localização do usuário
import {requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location';

import { MaterialIcons } from '@expo/vector-icons';

import api from '../services/api';
import {connect,disconnect,subscribeToNewDevs} from '../services/socket';

// Componente da página principal (página com o mapa)
function Main({navigation}) {
  const [devs, setDevs] = useState([]);
  const [currentRegion, setCurrentRegion] = useState(null);
  const [techs, setTechs] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  useEffect(() => {
    async function loadInitialPosition(){
      const {granted} = await requestPermissionsAsync();

      if (granted) {
        const {coords} = await getCurrentPositionAsync({
          // Para usar o GPS
          enableHighAccuracy: true,
        });

        const {latitude, longitude} = coords;

        setCurrentRegion({
          latitude,
          longitude,
          // Calculos para ter zoom no mapa
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        })
      }
    }

    loadInitialPosition();
  }, []);

  // Monitara a variável devs e chama a função subscribeToNewDevs quando ela muda de valor
  useEffect(() => {
    // Recebe os dados enviados do back-end (o dev) e deve setar o valor da variável devs
    subscribeToNewDevs(dev => setDevs([...devs,dev]));
  },[devs]);

  function setupWebsocket() {
    // Para evitar que fiquem com várias conexões sobrando
    disconnect();

    // Pegar a latitude e longitude atual do usuário
    const {latitude,longitude} = currentRegion;
  
    // Dados serão enviados para o servidor
    // Serão utilizados para ver se os novos Devs cadastrados estão no raio de 10km e com a tech correta 
    connect(
      latitude,
      longitude,
      techs,
    );
  }
  
  async function loadDevs() {
    const exactMatch = toggleCheckBox;
    const {latitude,longitude} = currentRegion;

    const response = await api.get('/search',{
      params: {
        latitude,
        longitude,
        techs,
        exactMatch
      }
    });
  
    // Precisa colocar o .devs no final pois a resposta da API é um objeto com os arrays de 'devs'
    setDevs(response.data.devs);
    // O setup do WebSocket precisa ser aqui pois é essa função que é ativada ao clicar no botão de pesquisar por techs
    // Essa função que fará a atualização em tempo real caso seja cadastrado um novo Dev com tecnologia pesquisada no raio de 10 km
    setupWebsocket();
    // Por conta da característica assíncrona do setDevs, tem grandes chances de setupWebsocket ser executada ANTES setDevs
  }

  // A latitude e longitude só estão sendo carregadas 1 única vez, quando carrega o mapa
  // Se o usuário mudar a localização no mapa não pega os novos valores
  // A função é para corrigir isso
  function handleRegionChanged(region) {
    setCurrentRegion(region);
  }

  // Para só renderizar o mapa quando carregar a localização do usuário
  if (!currentRegion) {
    return null;
  }

  // Tudo que coloco dentro do Callout é oq aparece quando clico na imagem do avatar
  return( 
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : ""}
      style={styles.container}
    >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

    <View style={styles.container}>
      <MapView 
        onRegionChangeComplete={handleRegionChanged} 
        initialRegion={currentRegion} 
        style={styles.map}
      >
        {devs.map(dev => (
          <Marker 
            key={dev._id}
            coordinate={{
              latitude: dev.location.coordinates[1], 
              longitude: dev.location.coordinates[0]
            }}
          >
            <Image 
              style={styles.avatar} 
              source={{uri: dev.avatar_url}} 
            />
            <Callout onPress={() => {
              // Atributo onPress é para indicar oq acontece quando clico em algo
              // Para qual página vou navegar
              navigation.navigate('Profile', {github_username: dev.github_username});
            }}>
              <View style={styles.callout}>
                <Text style={styles.devName}>{dev.name}</Text>
                <Text style={styles.devBio}>{dev.bio}</Text>
                <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
              </View>
            </Callout>
          </ Marker>
        ))}
      </MapView>

      <View style={styles.searchForm}>
        <TextInput 
          style={styles.searchInput}
          placeholder="Buscar devs por techs..."
          placeholderTextColor="#999"
          // Cada tecnologia vai com a primeira letra maiúscula
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          // Diferente da web que recebe o evento e tem que acessar o texto a partir dele
          // Acessa o texto diretamente
          onChangeText={text => setTechs(text)}
          // A linha de cima também poderia ser escrita da seguinte forma:
          // onChangeText = {setTechs}, pois só tenho um parâmetro e só chamo 1 função passando esse parâmetro
        />
        <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
          <MaterialIcons name="my-location" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.checkboxContainer}>
        <Text style={styles.checkboxLabel}>Busca Exata:</Text>
        <CheckBox
          style={styles.checkbox}
          // disabled={false}
          value={toggleCheckBox}
          onValueChange={(newValue) => setToggleCheckBox(newValue)}
        />
      </View>
    </View>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  map: {
    flex:1,
  },

  avatar:{
    // No React Native não preciso colocar px depois dos tamanhos
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#FFF'
  },

  callout:{
    width: 260,
  },

  devName:{
    fontWeight: 'bold',
    fontSize: 16,
  },

  devBio:{
    color: '#666',
    marginTop: 5,
  },

  devTechs:{
    marginTop: 5,
  },

  searchForm:{
    position: "absolute",
    // Para ficar em baixo
    bottom: 20,
    // Para ficar em cima
    // top:20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: "row"
  },

  searchInput:{
    flex:1,
    height:50,
    backgroundColor: "#FFF",
    color: "#333",
    borderRadius: 25,
    // Coloca o padding na esquerda e direita ao mesmo tempo
    paddingHorizontal: 20,
    fontSize: 16,
    // Sombra no iOS
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset:{
      width:4,
      height:4,
    },
    // Sombra no Android
    elevation: 2,
  },

  loadButton:{
    width: 50,
    height: 50,
    backgroundColor: '#8E4DFF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },

  checkboxContainer: {
    position: "absolute",
    // Para ficar em baixo
    // bottom: 20,
    // Para ficar em cima
    top: 20,
    left: 20,
    // right: 10,
    zIndex: 5,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10
  },

  checkboxLabel: {
    
    paddingHorizontal: 5,
    paddingVertical: 5 ,
    fontSize: 14,
    fontWeight: "bold"
  }
})

export default Main;