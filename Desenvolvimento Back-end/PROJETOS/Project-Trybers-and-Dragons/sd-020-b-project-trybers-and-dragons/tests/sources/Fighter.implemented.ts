import Fighter from '../../src/Fighter';

class f implements Fighter {
  constructor(
    public lifePoints: 100,
    public strength: 10,
    public defense: 10,
  ) { }

  attack(enemy: Fighter) { }
  receiveDamage(amount: number): number { return 0 }
  levelUp(): void { }
  special(enemy: Fighter): void { }
};
