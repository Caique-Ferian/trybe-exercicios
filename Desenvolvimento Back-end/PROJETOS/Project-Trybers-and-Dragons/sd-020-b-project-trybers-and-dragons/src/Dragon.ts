import Monster from './Monster';

export default class Dragon extends Monster {
  constructor(lifePoints = 999) {
    super(lifePoints);
  }
}