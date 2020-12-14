import React, { useRef } from 'react';
import EasyEdit from 'react-easy-edit';

import { XCircle, Check } from 'react-feather';

import Editable from '../Editable';

import './style.css';

function DevItem(props){
  // Para pegar o dev que foi passado como propriedade pelo componente Pai
  const {dev, onDelete, onUpdateDev} = props;
  // console.log(dev.techs)
  // const t = dev.techs.filter(tech => tech);
  // console.log(t)
  const techs = dev.techs.join(", ");

  const techsRef = useRef();

  async function handleDelete () {
    const id = dev._id;

    try {
      await onDelete(id);
    } catch (error) {
      console.log(error);
    }
  }

  // TODO:
  // Comunicar com rota de patch da api para atualizar no BD
  async function handleEdit(e) {
    const newTechs = e.target.value;
    // console.log(newTechs)
    const id = dev._id;
    try {
      await onUpdateDev(id, newTechs);
    
    } catch (error) {
      console.log(error);
    }
  }

  async function editDevName(value) {
    const name = value;
    const id = dev._id;
    try {
      await onUpdateDev(id, name, techs)
    } catch (error) {
      console.log(error);
    }
  }

  async function editDevTechs(value) {
    const techs = value;
    const id = dev._id;
    try {
      await onUpdateDev(id, dev.name, techs)
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
              {/* <strong>{dev.name}</strong> */}
              <div className="dev-name">
                <EasyEdit 
                  type = "text"
                  onSave = {editDevName}
                  saveButtonLabel= {<Check size={18} color="green" />}
                  value = {dev.name}
                  hideCancelButton = {true}
                />
              </div>
              <div className="dev-techs">
                <EasyEdit 
                  type = "text"
                  onSave = {editDevTechs}
                  saveButtonLabel= {<Check size={18} color="green" />}
                  value = {techs}
                  hideCancelButton = {true}
                />
              </div>
              {/* <Editable
                text={techs}
                childRef={techsRef}
                type="input"
              >
                <input
                  ref={techsRef}
                  type="text"
                  name="techs"
                  value={techs}
                  onChange={handleEdit}
                />
              </Editable> */}
              {/* <span onClick={handleEdit}>{dev.techs.join(", ")}</span>                 */}
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