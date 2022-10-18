import Fighter, { SimpleFighter } from './Fighter';
import Race, { Elf } from './Races';
import Archetype, { Mage } from './Archetypes';
import Energy from './Energy';
import getRandomInt from './utils';

export const randomStats = () => {
  const MIN = 1;
  const MAX = 10;
  return getRandomInt(MIN, MAX);
};

export default class Character implements Fighter {
  private _race: Race;
  private _archetype: Archetype;
  private _maxLifePoints: number;
  private _lifePoints: number;
  private _strength: number;
  private _defense: number;
  private _dexterity: number;
  private _energy: Energy;
  constructor(private _name: string = 'Invoker') {
    this._dexterity = randomStats();
    this._race = new Elf(this._name, this._dexterity);
    this._archetype = new Mage(this._name);
    this._maxLifePoints = this._race.maxLifePoints / 2;
    this._lifePoints = this._maxLifePoints;
    this._strength = randomStats();
    this._defense = randomStats();
    this._energy = { type_: this._archetype.energyType, amount: randomStats() };
  }

  get race(): Race { return this._race; }
  get archetype(): Archetype { return this._archetype; }
  get lifePoints(): number { return this._lifePoints; }
  get strength(): number { return this._strength; }
  get defense(): number { return this._defense; }
  get dexterity(): number { return this._dexterity; }
  get energy(): Energy {
    return (
      { type_: this._energy.type_, amount: this._energy.amount }); 
  }

  public receiveDamage(attackPoints: number): number {
    const damage = attackPoints - this._defense;
    if (damage > 0) {
      this._lifePoints -= damage;
      if (this._lifePoints <= 0) {
        this._lifePoints = -1;
      }
    }
    return this._lifePoints;
  }

  public attack(enemy: SimpleFighter): void {
    enemy.receiveDamage(this._strength);
  }

  public levelUp(): void {
    const increment = randomStats();
    const fullEnergy = 10;
    this._maxLifePoints += increment;
    if (this._maxLifePoints > this._race.maxLifePoints) {
      this._maxLifePoints = this._race.maxLifePoints;
    }
    this._strength += increment;
    this._dexterity += increment;
    this._defense += increment;
    this._energy.amount = fullEnergy;
    this._lifePoints = this._maxLifePoints;
  }

  public special(enemy: SimpleFighter): void {
    const specialCost = 200;
    const damage = this._strength * Math.random();
    console.log('Chaos Meteor');
    this._energy.amount -= specialCost;
    enemy.receiveDamage(damage);
  }
}