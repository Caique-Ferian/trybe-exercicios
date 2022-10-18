import Archetype from './Archetype';
import { EnergyType } from '../Energy';

export default class Mage extends Archetype {
  private static magesCreated = 0;
  constructor(name: string, private _energyType:EnergyType = 'mana') {
    super(name);
  }

  public static createdArchetypeInstances(): number {
    this.magesCreated += 1;
    return this.magesCreated;
  }

  get energyType():EnergyType { return this._energyType; }
}