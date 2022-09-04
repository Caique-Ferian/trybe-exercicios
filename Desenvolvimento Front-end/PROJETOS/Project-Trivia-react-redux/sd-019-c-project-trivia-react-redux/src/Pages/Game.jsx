import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import Header from '../component/Header';
import { addScoreAction } from '../actions';
import '../styles/Game.scss';
import Timer from '../component/Timer';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      questionIndex: 0,
      isClicked: false,
      shuffledQuestions: [],
      time: 0,
    };
  }

  componentDidMount() {
    this.sortQuestions();
  }

  sortQuestions = () => {
    const { props: { data: { results } }, state: { questionIndex } } = this;
    const correctAnswer = results[questionIndex].correct_answer;
    const incorrectAnswer = results[questionIndex].incorrect_answers;
    const concatAnswers = incorrectAnswer.concat(correctAnswer);
    const shuffled = concatAnswers
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    this.setState({ shuffledQuestions: shuffled });
  }

  handleIncorrect = () => {
    this.setState({
      isClicked: true,
    });
  }

  handleCorrect = () => {
    const { props: { data: { results } },
      state: { questionIndex, time } } = this;
    const { difficulty } = results[questionIndex];
    const { dispatchScore } = this.props;
    // acho q esse score pode ir pra dentro do objeto tbm
    const diff = { ten: 10, easy: 1, medium: 2, hard: 3, score: 0 };
    if (difficulty === 'hard') diff.score = diff.ten + (time * diff.hard);
    if (difficulty === 'medium') diff.score = diff.ten + (time * diff.medium);
    if (difficulty === 'easy') diff.score = diff.ten + (time * diff.easy);
    dispatchScore(diff.score);
    this.setState({
      isClicked: true,
    });
  }
  // Gerando aleatoriedade das perguntas feito com à ajuda de : https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

  handleNextQuestion = () => {
    const MAX = 4;
    const { questionIndex } = this.state;
    if (questionIndex === MAX) {
      const { player: { name, score, gravatarEmail }, history } = this.props;
      const hashEmail = md5(gravatarEmail).toString();
      const picture = `https://www.gravatar.com/avatar/${hashEmail}`;
      const storage = localStorage.getItem('ranking');
      const ranking = {
        name,
        score,
        picture,
      };
      if (!storage) localStorage.setItem('ranking', JSON.stringify([ranking]));
      else {
        const value = JSON.parse(storage).concat(ranking);
        localStorage.setItem('ranking', JSON.stringify(value));
      }
      history.push('/feedback');
    }
    this.setState((prevState) => ({
      questionIndex: prevState.questionIndex + 1, isClicked: false }),
    () => this.sortQuestions());
  }

  handleTimer = (time) => {
    if (time === 0) this.handleIncorrect();
    this.setState({ time: time - 1 });
  };

  render() {
    const { props: { data: { results } },
      state: { questionIndex, isClicked, shuffledQuestions } } = this;
    const correctAnswer = results[questionIndex].correct_answer;
    const initialPos = -1;
    let pos = initialPos;
    return (
      <div className="game-container">
        <Header />
        <main>
          {!isClicked ? <Timer handleTimer={ this.handleTimer } /> : null}
          <p data-testid="question-category">{results[questionIndex].category}</p>
          <h1 data-testid="question-text">{results[questionIndex].question}</h1>
          <div data-testid="answer-options" className="asks-container">
            {shuffledQuestions.map((answer, index) => {
              if (answer === correctAnswer) {
                return (
                  <button
                    key={ index }
                    className={ isClicked ? 'correct-answer' : '' }
                    type="button"
                    disabled={ isClicked }
                    data-testid="correct-answer"
                    onClick={ this.handleCorrect }
                  >
                    {answer}
                  </button>);
              }
              pos += 1;
              return (
                <button
                  key={ index }
                  type="button"
                  className={ isClicked ? 'incorrect-answer' : '' }
                  disabled={ isClicked }
                  data-testid={ `wrong-answer-${pos}` }
                  onClick={ this.handleIncorrect }
                >
                  {answer}
                </button>);
            })}
          </div>
          {
            isClicked ? (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ this.handleNextQuestion }
              >
                Next
              </button>) : null
          }
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.game,
  player: state.player,
});
const mapDispatchToProps = (dispatch) => ({
  dispatchScore: (score) => dispatch(addScoreAction(score)),
});
Game.propTypes = {
  data: PropTypes.object,
}.isRequired;
export default connect(mapStateToProps, mapDispatchToProps)(Game);
