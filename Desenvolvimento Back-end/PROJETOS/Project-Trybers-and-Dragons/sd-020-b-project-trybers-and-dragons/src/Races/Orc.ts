import Races from './Race';

export default class Orc extends Races {
  private static orcsCreated = 0;
  constructor(
    name: string,
    dexterity: number, 
    private _maxLifePoints: number = 74,
  ) {
    super(name, dexterity);
  }

  public static createdRacesInstances(): number {
    this.orcsCreated += 1;
    return this.orcsCreated;
  }

  get maxLifePoints(): number { return this._maxLifePoints; }
}