import Races from './Race';

export default class Elf extends Races {
  private static elfsCreated = 0;
  constructor(
    name: string,
    dexterity: number, 
    private _maxLifePoints: number = 99,
  ) {
    super(name, dexterity);
  }

  public static createdRacesInstances(): number { 
    this.elfsCreated += 1;
    return this.elfsCreated;
  }

  get maxLifePoints(): number { return this._maxLifePoints; }
}