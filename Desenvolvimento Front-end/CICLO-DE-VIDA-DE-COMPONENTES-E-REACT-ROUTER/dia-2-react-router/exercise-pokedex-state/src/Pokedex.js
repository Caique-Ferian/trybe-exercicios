import React from 'react';
import Pokemon from './Pokemon';
import Button from './Button'
import './pokedex.css';
class Pokedex extends React.Component {
  constructor(){
    super();
    this.state = {
      pokemonIndex : 0,
      filteredType : 'all',
    };
  }
  //O estado inicial da props e estabelecido com duas chaves , uma chave com  o Index do Pokemon(para assim quando clicar no botao Próximo pokémon alterar o pokemon exibido) e filteredType (o tipo de filtro padrao como pedido o exercicio, decide-se por padrao deixar o "ALL" e caso o usuario queira ele altera o tipo de filtro para exibir o pokemon de acordo com seu tipo).
  pokemonTypes () {
    const pokelist = this.props.pokelist;
    return [...new Set(pokelist.reduce((prevElement, {type}) => [...prevElement, type],[]))];
  } // (POKEMONTYPES ARRAY) Cria um array com o construtor de objetos Set, que cria um objeto com valores unicos, mesmo se houver valor repetido ele apenas criara 1 chave com aquele valor, atraves do Set usa-se o spread operator, para "espalhar" os valores do objeto Set em um array, criando assim apenas um array de valores, dentro do Set e estabelecida a logica de reduce, ele percorre o array pokelist que se trata de um array de objetos, cada objeto e referente a um pokemon (arquivo data.js passado via props para o Pokedex), o valor inicial do reduce se nao estabelecido por padrao e zero, desta forma como tem-se a necessidade de criar um array e necessario informar como valor inicial um array vazio, assim o reduce comeca a procurar os valores da chave type(desestruturacao de objeto) e comeca a logica (inicialmente o prevElement tem valor como [], o type, dentro do reduce representa o valor da posicao atual do array (comeca com 0), assim o valor do type sera 'Eletric', em seguida acontece a soma de [] + "Eletric" , o javaScript por tras dos panos realiza um push e o valor passa a ser ["Eletric"], agora o valor incial do elemento anterior (prevElement), e ["Eletric"], e o proximo tipo de pokemon na lista e "Fire", assim o javaScript realiza a mesma operacao ["Eletric"] + "Fire", realiza outro push e o resultado fica ["Eletric", "Fire"] e assim sucessivamente).
  filteredPokemons (pokeType) {
    this.setState({ filteredType:pokeType, pokemonIndex: 0 })
  }
  
  handlePokeRender (numberOfPokemons){
      this.setState((prevState) => ({
        pokemonIndex : (prevState.pokemonIndex + 1) % numberOfPokemons,
      }));
    
  }
  //(EXPLICANDO LOGICA DE HANDLEPOKERENDER) Basicamente a logica funciona assim ele pega atraves do setState o valor anterior do estado pokemonIndex(e necessario realizar o setState para alterar um estado) que de inicio como estabelecido e 0, soma com 1 e pega o resto da divisao pelo tamanho do array de pokemons. Ex se o array de pokemons tiver um tamanho de 9 (ou seja o arquivo data.js completo) ele realiza 1/9 e pega o primeiro resto da divisao, logo 1/9 o primeiro resto e 1, desta forma o index passa a valer 1 e assim por diante e quando chegar no valor do tamanho do array ele volta para zero ja que 8+1/9 tem resto 0 e lembrando que o ultimo elemento de um array esta sempre na posicao tamanhoDoArray -1, logo o ultimo elemento esta na posicao 8, se o programa chegasse a 9 ele crasharia por que nao tem como renderizar um objeto inexistente ja que nao existe o index 9 no array data.js
  pokeTypeRender () {
    const pokelist = this.props.pokelist;
    const { filteredType } = this.state;

    return pokelist.filter((element) => {
      if(filteredType === 'all') {
        return true;
      }
      return element.type === filteredType;
    });
  }
  render(){
    const pokemonTypes = this.pokemonTypes();
    //(PRIMEIRO USO DO ARRAY POKEMONTYPES) Apos criar o array como dito acima usa-se o return da funcao para criar de maneira dinamica todos os botoes necessarios para cada tipo de pokemon, com Excessao do All, pois este valor nao existe no arquivo data.js, assim ele e criado antes de utilizar o map e criar de forma dinamica os restantes dos botoes.
    const filteredPokemons = this.pokeTypeRender();
    console.log(filteredPokemons)
    const pokemon = filteredPokemons[this.state.pokemonIndex];
    // a constante pokemon recebe o array de objetos filtrados pelo seu tipo, atraves da funcao pokeTypeRender() e passa para a props do componente <Pokemon /> o elemento do array que se encontra dentro do indice que esta estabelecido dentro do estado da props na chave pokemonIndex (chave alteravel, altera-se toda vez que se clica no botao "Próximo pokémon").
    return (
      <div className="pokedex">
        <Pokemon pokemon={pokemon} />
        <div className="pokedex-buttons-panel">
          <Button
            onClick={() => this.filteredPokemons('all')}
            className="filter-button"
          >
            All
          </Button>
          {pokemonTypes.map((element) => 
            <Button 
            key={element}
            onClick={() => this.filteredPokemons(element)}
            className="filter-button"
            >
              {element}
            </Button>
            //(SEGUNDO USO DO ARRAY POKEMONTYPES) Apos se criar os botoes de forma dinamica entra a logica de alteracao de filtro, basicamente e implementado a funcao filteredPokemons que recebe um tipo de pokemon(passado atraves da HOF map dentro do array pokemonTypes explicado acima) a funcao recebe o tipo de pokemon do array e altera o estado da props, ele zera o Index do pokemon (isso e necessario pois caso o usuario tenha clicado no botao "Próximo pokémon" e alterado o valor do estado do index de 0 para 1 por exemplo, para a aplicacao nao dar erro e necessario que ao se trocar de filtro zere o valor do Index do Pokemon) e altera o filteredType para o valor fornecido a ele e assim como uma cascata, ao alterar o o filtro no estado da props clicando no botao, o pokemon que sera renderizado pelo componente <Pokemon /> sera alterado ja que ele usa como base a funcao pokeTypeRender() que realiza dentro dela uma filtragem do objeto data.js e transmite os valores pedidos pelo componente via Props para ser renderizado, ou seja o pokeTypeRender() pega o arquivo data.js(passado via props ao Pokedex, com nome de pokelist) e pega tambem o tipo de filtro que esta selecionado que foi armazenado no estado do props, atraves disso ela retorna um filter dentro do array de objetos data.js e separa os elementos em outro array de acordo com o tipo que estava no estado da props(o valor padrao e ALL, como nao existe ALL dentro do data.js criou-se uma logica para, caso o valor do estado for "all" ele retorne true, quando a HOF retorna true ela basicamente ira retornar o elemento inteiro que ela esta iterando e se for diferente de "all" ele filtra de acordo com o tipo).
        )}
        </div>
        <Button
          className="pokedex-button" 
          onClick={() => this.handlePokeRender(filteredPokemons.length)}
          disabled = {filteredPokemons.length <= 1}
        >
          Próximo pokémon
        </Button>
      </div>
      // Ao se clicar no botao "Próximo pokémon" e disparado um evento que aciona  funcao handlePokeRender que recebe por parametro o tamanho do array filteredPokemons(pois de acordo com cada filtro e retornado pela funcao um array com diferentes quantidades de objetos e como estabelicido na propriedade disabled (necessario para aplicar nao crashar) se o tamanho do array for menor ou igual a 1 o botao nao funciona) assim ele realiza uma logica para alteracao do valor do index do pokemon (dentro do estado da props na chave pokemonIndex) e assim renderizar o proximo pokemon do array data.js e assim por diante.
      );
  }
}

export default Pokedex;
