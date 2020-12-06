import React, {useEffect, useState} from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css'

// Não preciso colocar o index no final, pois por default sempre pega o index.js na pasta
import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

// Função para pegar longitude e latitude do usuário: navigator.geolocation.getCurrentPosition();

function App(){
  // Estado para armazenar os Devs recebidos da API
  const [devs, setDevs] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // Para pegar os Devs da API e fazer isso apenas uma vez
  useEffect(()=>{
    async function loadDevs(){
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data){
    try {
      // POST pois estou cadastrando um Dev novo
      const response = await api.post('/devs', data );
      // Preciso adicionar o Dev novo na página
      // Se fizer isso: setDevs(response.data) sobrescreve o arrays devs todo e tira os Devs já listados
      // Copia o array devs todo e adiciona o novo Dev no final
      setDevs([...devs, response.data]);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Dev already exists");
    }
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm errorMessage={errorMessage} onSubmit={handleAddDev}/>
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            // Usa-se o atributo key para evitar o erro no console com o uso da função .map
            // Para isso passa uma propriedade única para o atributo key
            // Preciso passar uma propriedade chamada dev para funcionar
            <DevItem key={dev._id} dev={dev}/>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
