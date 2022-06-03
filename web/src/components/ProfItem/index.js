import React from 'react';

import './styles.css';

function ProfItem(props){
    const{ prof}=props;
    
    return(
        <li  className = 'prof-item'>
        <header>
          <img src={`http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=${prof.lattes_code}`} alt={prof.nome} />
          <div className="user-info"> 
            <strong> {prof.nome}</strong>
            <h1>{prof.profissao}</h1>
            <span> {prof.especialidades.join(',')}</span>          
            </div>
        </header>
        <p>{prof.bio}</p>
        <a href={`http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=${prof.lattes_code}`}> Acessar Currículo Lattes</a>
        
      </li>
    );
}

export default ProfItem;