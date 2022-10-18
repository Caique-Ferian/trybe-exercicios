import { SimpleFighter } from './Fighter';

export default class Monster implements SimpleFighter {
  constructor(
    private _lifePoints: number = 85, 
    private _strength:number = 63,
  ) {}

  get lifePoints(): number { return this._lifePoints; }
  get strength(): number { return this._strength; }

  public receiveDamage(attackPoints: number): number {
    this._lifePoints -= attackPoints;
    if (this._lifePoints <= 0) {
      this._lifePoints = -1;
    }
    return this._lifePoints;
  }

  public attack(enemy: SimpleFighter): void {
    enemy.receiveDamage(this._strength);
  }
}