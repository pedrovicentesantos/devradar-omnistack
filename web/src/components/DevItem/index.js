import React, { useRef } from 'react';

import { XCircle } from 'react-feather';

import Editable from '../Editable';

import './style.css';

function DevItem(props){
  // Para pegar o dev que foi passado como propriedade pelo componente Pai
  const {dev, onDelete, onUpdate} = props;
  console.log(dev.techs)
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
    console.log(newTechs)
    const id = dev._id;
    try {
      await onUpdate(id, newTechs);
    
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
              <strong>{dev.name}</strong>
              <Editable
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
              </Editable>
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