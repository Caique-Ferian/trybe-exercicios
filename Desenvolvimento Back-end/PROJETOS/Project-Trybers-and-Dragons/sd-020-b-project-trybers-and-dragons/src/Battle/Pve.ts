import Battle from './Battle';
import { randomStats } from '../Character';
import Monster from '../Monster';
import Fighter, { SimpleFighter } from '../Fighter';

export default class PVE extends Battle {
  private static indexMonster = 0;
  constructor(
    player: Fighter,
    private _monster: SimpleFighter[] = [new Monster()],
  ) {
    super(player);
  }

  private validateAllFights(): number[] {
    const fights = this._monster.map((monster) => {
      if (monster.lifePoints === -1) {
        console.log('The enemy has been killed!!!');
        return 1;
      } if (this.player.lifePoints === -1) {
        return -1;
      }
      return 0;
    });
    return fights;
  }
  
  private hasWinner(): boolean {
    const validate = this.validateAllFights();
    if (validate.includes(-1)) {
      console.log('You died!!!');
      return true;
    } if (validate.every((e) => e === 1)) {
      console.log('All enemy\'s has been killed!!!');
      return true;
    } 
    return false;
  }

  private playerAttacks(): void {
    this.player.attack(this._monster[PVE.indexMonster]);
    if (this._monster[PVE.indexMonster].lifePoints !== -1) {
      this._monster[PVE.indexMonster].attack(this.player);
    }
  }

  private monsterAttacks(): void {
    this._monster[PVE.indexMonster].attack(this.player);
    if (this.player.lifePoints !== -1) {
      this.player.attack(this._monster[PVE.indexMonster]);
    }
  }

  private static incrementIndex(length:number): void {
    if (PVE.indexMonster >= length - 1) {
      PVE.indexMonster = 0;
    } else {
      PVE.indexMonster += 1;
    }
  }

  public fight(): number {
    const playerDice = randomStats();
    const monsterDice = randomStats();
    if (playerDice > monsterDice) {
      this.playerAttacks();
    } else {
      this.monsterAttacks();
    }
    if (!this.hasWinner()) {
      PVE.incrementIndex(this._monster.length);
      this.fight(); 
    }
    return this.player.lifePoints === -1 ? -1 : 1;
  }
}
