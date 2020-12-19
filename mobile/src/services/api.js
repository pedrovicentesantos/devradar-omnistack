import axios from 'axios';

const api = axios.create({
  // A porta tem que ser a utilizada no backend
  // Se estiver usando um emulador ao invés do celular pode trocar o IP por localhost
  // No emulador Android pode ter que usar o IP: 10.0.2.2
  baseURL: 'http://192.168.0.35:3333',
});

export default api;