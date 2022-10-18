import Archetype from './Archetype';
import { EnergyType } from '../Energy';

export default class Necromancer extends Archetype {
  private static necromancersCreated = 0;
  constructor(name: string, private _energyType:EnergyType = 'mana') {
    super(name);
  }

  public static createdArchetypeInstances(): number {
    this.necromancersCreated += 1;
    return this.necromancersCreated;
  }

  get energyType():EnergyType { return this._energyType; }
}