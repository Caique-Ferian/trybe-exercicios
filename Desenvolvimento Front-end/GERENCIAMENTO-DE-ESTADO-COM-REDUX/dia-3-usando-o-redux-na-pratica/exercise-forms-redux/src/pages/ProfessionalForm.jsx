import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { formProfessionalAction } from '../redux/actions';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import Button from '../components/Button';

class ProfessionalForm extends Component {
  constructor() {
    super();
    this.state = {
      curriculo: '',
      cargo: '',
      descricao: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { curriculo, cargo, descricao } = this.state;
    const { formProfessionalDispatch, history } = this.props;
    console.log(formProfessionalDispatch);
    return (
      <fieldset>
        <TextArea
          label="Resumo do currículo: "
          value={ curriculo }
          name="curriculo"
          maxLength="1000"
          onChange={ this.handleChange }
          required
        />
        <Input
          label="Cargo:"
          name="cargo"
          type="text"
          value={ cargo }
          onChange={ this.handleChange }
          required
        />
        <TextArea
          label="Descrição do cargo: "
          name="descricao"
          maxLength="500"
          onChange={ this.handleChange }
          value={ descricao }
          required
        />
        <Button
          label="enviar"
          onClick={ () => {
            formProfessionalDispatch(this.state);
            history.push('/formdisplay');
          } }
        />
      </fieldset>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  formProfessionalDispatch: (state) => dispatch(formProfessionalAction(state)),
});

ProfessionalForm.propTypes = {
  formProfessionalDispatch: PropTypes.func,
}.isRequired;
export default connect(null, mapDispatchToProps)(ProfessionalForm);
