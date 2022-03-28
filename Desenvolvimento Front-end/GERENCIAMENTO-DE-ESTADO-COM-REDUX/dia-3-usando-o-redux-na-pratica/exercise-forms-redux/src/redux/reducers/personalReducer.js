const initialState = {
  nome: '',
  email: '',
  cpf: '',
  endereco: '',
  cidade: '',
  estado: '',
};

function personalReducer(state = initialState, action) {
  switch (action.type) {
  case 'form/addInfo': {
    const { nome, email, cpf, endereco, cidade, estado } = action.payload;
    return {
      nome,
      email,
      cpf,
      endereco,
      cidade,
      estado,
    };
  }
  default:
    return state;
  }
}

export default personalReducer;
