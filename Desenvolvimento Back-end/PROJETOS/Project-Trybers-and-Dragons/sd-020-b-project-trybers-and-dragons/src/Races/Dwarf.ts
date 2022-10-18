import Races from './Race';

export default class Dwarf extends Races {
  private static dwarfsCreated = 0;
  constructor(
    name: string,
    dexterity: number, 
    private _maxLifePoints: number = 80,
  ) {
    super(name, dexterity);
  }

  public static createdRacesInstances(): number { 
    this.dwarfsCreated += 1;
    return this.dwarfsCreated;
  }

  get maxLifePoints(): number { return this._maxLifePoints; }
}