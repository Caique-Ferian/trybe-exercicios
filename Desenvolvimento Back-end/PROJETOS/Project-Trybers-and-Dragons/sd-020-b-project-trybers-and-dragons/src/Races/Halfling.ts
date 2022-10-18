import Races from './Race';

export default class Halfling extends Races {
  private static halflingCreated = 0;
  constructor(
    name: string,
    dexterity: number, 
    private _maxLifePoints: number = 60,
  ) {
    super(name, dexterity);
  }

  public static createdRacesInstances() : number {
    this.halflingCreated += 1;
    return this.halflingCreated;
  }

  get maxLifePoints(): number { return this._maxLifePoints; }
}