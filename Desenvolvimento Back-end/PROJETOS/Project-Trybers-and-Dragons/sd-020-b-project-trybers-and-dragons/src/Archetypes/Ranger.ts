import Archetype from './Archetype';
import { EnergyType } from '../Energy';

export default class Warrior extends Archetype {
  private static rangersCreated = 0;
  constructor(name: string, private _energyType:EnergyType = 'stamina') {
    super(name);
  }

  public static createdArchetypeInstances(): number {
    this.rangersCreated += 1;
    return this.rangersCreated;
  }

  get energyType():EnergyType { return this._energyType; }
}