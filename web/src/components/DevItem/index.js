import React from 'react';
import EasyEdit from 'react-easy-edit';

import { XCircle, Check } from 'react-feather';

import './style.css';

function DevItem(props){
  // Para pegar o dev que foi passado como propriedade pelo componente Pai
  const {dev, onDelete, onUpdateDev} = props;
  
  const techs = dev.techs.join(", ");

  async function handleDelete () {
    const id = dev._id;

    try {
      await onDelete(id);
    } catch (error) {
      console.log(error);
    }
  }

  async function editDevName(value) {
    const name = value;
    const id = dev._id;
    const bio = dev.bio;
    try {
      await onUpdateDev(id, name, techs, bio);
    } catch (error) {
      console.log(error);
    }
  }

  async function editDevTechs(value) {
    const techs = value;
    const id = dev._id;
    const bio = dev.bio;
    try {
      await onUpdateDev(id, dev.name, techs, bio);
    } catch (error) {
      console.log(error);
    }
  }

  async function editDevBio(value) {
    const bio = value;
    const id = dev._id;
    try {
      await onUpdateDev(id, dev.name, techs, bio);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <li className="dev-item">
      <div>
        <header>
          <div className="header">
            <img src={dev.avatar_url} alt={dev.name}/>
            <div className="user-info">
              <div className="dev-name">
                <EasyEdit 
                  type = "text"
                  placeholder = "Insira o nome do Dev"
                  onSave = {editDevName}
                  saveButtonLabel= {<Check size={18} color="green" />}
                  value = {dev.name}
                  hideCancelButton = {true}
                />
              </div>
              <div className="dev-techs">
                <EasyEdit 
                  type = "text"
                  placeholder = "Insira as techs do Dev"
                  onSave = {editDevTechs}
                  saveButtonLabel= {<Check size={18} color="green" />}
                  value = {techs}
                  hideCancelButton = {true}
                />
              </div>
            </div>
          </div>
          <XCircle className="delete-button" onClick={handleDelete} color="red"/>
        </header>
        <div className="dev-bio">
          <EasyEdit 
            type="textarea"
            placeholder = "Insira a bio do Dev"
            onSave = {editDevBio}
            saveButtonLabel= {<Check size={18} color="green" />}
            value = {dev.bio}
            hideCancelButton = {true}
          />
        </div>
        {/* <p>{dev.bio}</p> */}
      </div>
      <a href={`https://github.com/${dev.github_username}`} rel="noopener noreferrer" target="_blank">Acessar perfil no Github</a>
    </li>
  )
}

export default DevItem;