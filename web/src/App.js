import React, { Component, useState, useEffect } from 'react';
import './App.css';
import './global.css';
import './Sidebar.css';
import './Main.css';
import './services/api';
import api from './services/api';

import ProfItem from './components/ProfItem';
import { render } from '@testing-library/react';
import Dropzone from 'react-dropzone';
import {DropContainer, UploadMessage, Container, Content} from './Upload/styles.js';
import Upload from './Upload';
import 'react-circular-progressbar/dist/styles.css'; //para usar o css do progress bar em mais lugares
import FileList from './FileList';
import {uniqueId} from 'lodash';
import filesize from 'filesize';
// Componente: função que retorna um html,css ou JS. Não afeta o layout, nem os anuncios, nem o chat.
//      ex: time line do FB, cada um dos posts é um componente. ex: App, sempre maiúsculo
//      um componente por arquivo, sempre que usar html dentro do JS importar o react
//      componente é um bloco isolado de HTML, CSS e JS, o qual não interfe no resto da aplicação

// Estado: Informações mantidas pela componente (Lembrar: imutabilidade)

// Propriedade: informações que um componente PAI passa para o componente FILHO
//      não precisa ser apenas string, pode ser variável, func ...(objetos ?)

//import Header from './Header';

/*function App2() {      //html dentro do javaScript
  const [counter, setCounter] = useState(1); //pode ser var

  function incrementCounter(){//como é uma funcao do componente, fica dentro do mesmo
  
     setCounter(counter +1);
     
  }
  
  return (
  <div>
     <h1>Contador: {counter}</h1>
     <button onClick = {incrementCounter} >IncreaseHealth</button>

    </div>
  //por critérios de organização, div pode ser apagado
  );
  
}
*/

/*strong=negrito
se for usar uma classe usar className, pois class é palavra reservada
similarmente: hmtlFor, for é reservada.
*/
/*<br/> (break) quebra de linha*/
/*<ul/> unordered list, <li/> list item*/
/*className= "user-info, significa que estou criando a class user-info, que vai guardas as infos do user*/
function App(){
  //em caso de querer utilizar coordenadas, rever useEffect
  const [profs, setProfs]=useState([]);

  const [lattes_link, setLattes_link]=useState('');
  const [nome, setNome]= useState('');
  const [email, setEmail]= useState('');
  const [celular, setCelular]= useState('');
  const [sexo, setSexo]=useState('');
  const [profissao, setProfissao]=useState('');
  const [especialidades, setEspecialidades]=useState('');
  const [bio, setBio]=useState('');

  
  /* state = {
   uploadedFiles:[],
 };
*/
    /**busca dos profs na api, array vazio para executar apenas uma vez */
    /*2 parametros(funcao,[var]), executa sempre que var tiver seu valor alterado */
    useEffect(() => {
      async function loadProfs(){
        const response = await api.get('./profs').
        then(()=>setProfs(response.data))
        .catch((error)=> console.error(error));
        /*criar um novo estado para poder mostrar os profs em tela */

//      setProfs(response.data);
      }   
     // loadProfs();/*chama depois de executar o useEffect*/
    },[]);

    useEffect(() => {

      
      //loadProfsProfissao();/*chama depois de executar o useEffect*/
    },[]);


  async function handleAddProf(e){ /* função disparada quando o 
    usuário clicar em submit 'e' é o evento, vulgo o que é recebido do usuário
    */
    e.preventDefault();/*o comportamento padrão é redirecionar para outra pagina*/
    /*chamdada api pra adiciona o prof a listagem*/  
    const response = await api.post('./profs',{
      lattes_link,
      nome,
      email,
      celular,
      sexo,
      profissao,
      especialidades,
      bio,
    })
    /*console.log(response.data);/**aparece no inspecionar elemento */

    /**deixar os campos vazios depois do cadastro */
    setLattes_link('');
    setNome('');
    setProfissao('');
    setSexo('');
    setBio('');
    setEmail('');
    setCelular('');
    setEspecialidades('');

    setProfs([...profs,response.data]);
  }


  async function loadProfissao(prNutri){
    const response = await api.get('./profs/'+prNutri);
    /**criar um novo estado para poder mostrar os profs em tela */
    setProfs(response.data)
    //setProfsProfissao(response.data);
  }

  async function handleNutricionistas(e){
    e.preventDefault();
    //console.log(e.target.value)
    const nutri="Enfermeiro";
    loadProfissao(nutri);
  }

  async function handlePsiquiatras(e){
  e.preventDefault();
  const psiqui = "Médico";
  loadProfissao(psiqui);
  }
  async function handlePsicologos(e){
    e.preventDefault();
    const psico="Fonoaudiologia";
    loadProfissao(psico);
}
  async function handlePersonal(e){
  e.preventDefault();
  const perso="Técnico de enfermagem";
  loadProfissao(perso);
}

 function handleUpload (files){
const uploadedFiles = files.map(file => ({
  file,
  id: uniqueId(),
  name: file.name,
  readableSize: filesize(file.size),
  preview: URL.createObjectURL(file),
  progress: 0,      
  uploaded: false, //estado inicial
  error: false,     //estado inicial
  url: null,      //pro user clicar e chegar ao link da img
}))
this.setState({
  uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles)
});

};
/*const {uploadedFiles} = this.state;*/

  return (
    <div id ="app">
      
<aside>
<strong>Cadastrar</strong>   
<form onSubmit ={handleAddProf}>
  <div className = "input-block">
  <label htmlFor = "nome"> Nome </label>
  <input 
  name = "nome" 
  id="nome" 
  required 
  value = {nome}
  onChange = {e => setNome(e.target.value)} 
  />
  </div>
  
  <div className = "input-block">
  <label htmlFor = "email"> Email </label>
  <input 
  name = "email" 
  id="email" 
  required 
  value = {email}
  onChange = {e => setEmail(e.target.value)}
  />
  </div>

  <div className = "input-block">
  <label htmlFor = "celular"> Celular </label>
  <input name = "celular" id="celular" required
  value = {celular}
  onChange = {e => setCelular(e.target.value)} 
  />
  </div>

  <div className = "input-block">
  <label htmlFor = "sexo"> Sexo </label>
  <input name = "sexo" id="sexo" required
  value = {sexo}
  onChange = {e => setSexo(e.target.value)}
  />
  </div>

  <div className = "input-block">
  <label htmlFor = "profissao"> Profissão </label>
  <input name = "profissao" id="profissao" required 
  value = {profissao}
  onChange = {e => setProfissao(e.target.value)}
  />
  </div>

  <div className = "input-block">
  <label htmlFor = "especialidades"> Especialidades </label>
  <input name = "especialidades" id="especialidades" required 
  value = {especialidades}
  onChange = {e => setEspecialidades(e.target.value)}
  />
  </div>

  <div className = "input-block">
  <label htmlFor = "lattes_link"> Link do Lattes </label>
  <input name = "lattes_link" id="lattes_link"  required
  value = {lattes_link}
  onChange = {e => setLattes_link(e.target.value)}
  />
  </div>

  <div className = "input-block">
  <label htmlFor = "bio"> Bio </label>
  <input name = "bio" id="bio" required 
  value = {bio}
  onChange = {e => setBio(e.target.value)}
  />
  </div>

  <div className = "dropzone">
  <label htmlFor = "foto"> Enviar Foto</label>
<Container>
  <Content>
    <Upload onUpload ={handleUpload}/>
    {/*!! uploadedFiles.length && <FileList files = {uploadedFiles}/> */}
    
  </Content>
</Container>
</div>
  
  <div>
    <button type= "submit"> Salvar</button>
      </div>
    </form>
  </aside>

  <main>
    <div className = "search-form">
      <form >
    <strong>Qual profissional de saúde você precisa?</strong>
  {/*<input name="searchBox" value={searchProf}
  onChange = {e =>setSearchProf(e.target.value)}>
  </input>*/}
  <div >
    <ul className="button-list">
      <li > <button onClick={handleNutricionistas} type="submit">Nutricionista</button> </li>
      <li > <button onClick={handlePsiquiatras} type="submit">Psiquiatra</button> </li>
      <li > <button onClick={handlePsicologos} type="submit">Psicólogo</button> </li>
      <li > <button onClick={handlePersonal} type="submit">Personal Trainer</button> </li>

    </ul>
</div>
  </form>
    </div>
 
  
  

  <ul>
      {profs.map(prof => (  /**dentro de {} é o corpo da função
      de () é o retorno */
        <ProfItem key={prof._id} prof = {prof} />
      ))}
    </ul>

    <ul>
      {profs.map(prof => (  /**dentro de {} é o corpo da função
      de () é o retorno */
        <ProfItem key={prof._id} prof = {prof} />
      ))}
    </ul>

  </main>

    </div>

  );
}
export default App;

