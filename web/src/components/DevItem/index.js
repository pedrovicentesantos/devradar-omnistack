import React from 'react';

import { XCircle } from 'react-feather';

import './style.css';

function DevItem(props){
  // Para pegar o dev que foi passado como propriedade pelo componente Pai
  const {dev} = props;

  function handleDelete () {
    const id = dev._id;
    console.log(id);
  }

  return (
    <li className="dev-item">
      <div>
        <header>
          <div className="header">
            <img src={dev.avatar_url} alt={dev.name}/>
            <div className="user-info">
              <strong>{dev.name}</strong>
              <span>{dev.techs.join(", ")}</span>                
            </div>
          </div>
          <XCircle className="delete-button" onClick={handleDelete} color="red"/>
        </header>
        <p>{dev.bio}</p>
      </div>
      <a href={`https://github.com/${dev.github_username}`} rel="noopener noreferrer" target="_blank">Acessar perfil no Github</a>
    </li>
  )
}

export default DevItem;