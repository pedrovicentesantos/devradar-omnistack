import React, {useState, useEffect} from 'react';

import "./style.css";

// {onSubmit}: forma mais direta de extrair a propriedade onSubmit
function DevForm({onSubmit, errorMessage}){
  const [github_username, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  // Para pegar a geolocalização do usuário e fazer isso apenas uma vez
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {latitude, longitude} = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) =>{
        console.log(err);
      },
      // Parâmetros que posso passar para função  
      {
        timeout: 30000,
      }
    )
  }, []);

  // Recebe o evento como parâmetro. Neste caso, o evento é o submit do form
  async function handleSubmit(e){
    // Para evitar que o submit do form envia o usuário para outra página
    e.preventDefault();
    // Executo a função passada pelo componente pai por meio das propriedades
    // Neste caso a função é: onSubmit = handleAddDev
    await onSubmit({
      github_username,
      techs,
      latitude,
      longitude
    });

    // Para limpar as inputs depois que cadastrar um Dev novo
    setGithubUsername('');
    setTechs('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="github_username">Usuário do Github</label>
        <input 
          name="github_username" 
          id="github_username" 
          value={github_username}
          onChange={e => setGithubUsername(e.target.value)}
          required
        />
      </div>

      <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
        <input 
          name="techs" 
          id="techs" 
          value={techs}
          onChange={e => setTechs(e.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input 
            type="number"
            name="latitude" 
            id="latitude" 
            value={latitude} 
            // Para refletir as mudanças que o usuário fizer no input para o estado
            onChange={e => setLatitude(e.target.value)} 
            required
          />
        </div>

        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input 
            type="number" 
            name="longitude" 
            id="longitude" 
            value={longitude} 
            onChange={e => setLongitude(e.target.value)} 
            required
          />
        </div>
      </div>

      <button type="submit">Salvar</button>

      <div className="error">
        <p>{errorMessage}</p>
      </div>
    </form>
  );
}

export default DevForm;