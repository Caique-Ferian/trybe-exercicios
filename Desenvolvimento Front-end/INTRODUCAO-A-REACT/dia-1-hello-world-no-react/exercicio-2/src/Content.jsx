import React, {Component} from 'react'

class Content extends Component {
    render(){
        const conteudos = [
            {
              conteudo: 'High Order Functions',
              bloco: 8,
              status: 'Aprendido'
            },
            {
              conteudo: 'Composicao de Componentes',
              bloco: 11,
              status: 'Aprendendo',
            },
            {
              conteudo: 'Composicao de Estados',
              bloco: 12,
              status: 'Aprenderei'
            },
            {
              conteudo: 'Redux',
              bloco: 16,
              status: 'Aprenderei'
            },
          ];
        return (
            <ol className='content'>
           {conteudos.map((element) => <li className='card'> O conteúdo é: {element.conteudo} <br></br>Status: {element.status}<br></br> Bloco: {element.bloco}</li>)}
            </ol>
        );
    }
}

export default Content;