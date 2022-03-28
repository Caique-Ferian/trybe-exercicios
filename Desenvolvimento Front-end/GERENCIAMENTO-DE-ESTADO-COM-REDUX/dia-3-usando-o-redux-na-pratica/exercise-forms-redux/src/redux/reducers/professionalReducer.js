const INITIAL_STATE = {
  curriculo: '',
  cargo: '',
  descricao: '',
};

function professionalReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'form/AddCurriculo': {
    const { curriculo, cargo, descricao } = action.payload;
    return {
      curriculo,
      cargo,
      descricao,
    };
  }
  default:
    return state;
  }
}

export default professionalReducer;
