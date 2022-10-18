import Battle from './Battle';
import Character from '../Character';
import Fighter from '../Fighter';

export default class PVP extends Battle {
  constructor(playerOne: Fighter, private _playerTwo: Fighter) {
    super(playerOne);
    this._playerTwo = new Character();
  }

  private hasWinner(): boolean {
    if (this._playerTwo.lifePoints === -1) {
      console.log('Player One Wins!!!');
      return true;
    } if (this.player.lifePoints === -1) {
      console.log('Player Two Wins!!!');
      return true;
    } 
    return false;
  }

  private playerAttacks(): void {
    this.player.attack((this._playerTwo));
    if (this._playerTwo.lifePoints !== -1) {
      this._playerTwo.attack(this.player);
      this._playerTwo.levelUp();
    }
  }

  public fight(): number {
    this.playerAttacks();
    if (!this.hasWinner()) {
      this.fight(); 
    }
    return this.player.lifePoints === -1 ? -1 : 1;
  }
}