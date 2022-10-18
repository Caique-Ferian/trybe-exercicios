import Archetype from './Archetype';
import { EnergyType } from '../Energy';

export default class Warrior extends Archetype {
  private static warriorsCreated = 0;
  constructor(name: string, private _energyType:EnergyType = 'stamina') {
    super(name);
  }

  public static createdArchetypeInstances(): number {
    this.warriorsCreated += 1;
    return this.warriorsCreated;
  }

  get energyType():EnergyType { return this._energyType; }
}