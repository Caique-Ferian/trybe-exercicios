import Character from './Character';
import Monster from './Monster';
import Dragon from './Dragon';
import Battle, { PVP, PVE } from './Battle';

const player1 = new Character();
player1.levelUp();
player1.levelUp();
const player2 = new Character('Anti-Mage');
const player3 = new Character('Bristleback');

const monster1 = new Monster(10);
const monster2 = new Dragon(10);

const pvp = new PVP(player2, player3);
const pve = new PVE(player1, [monster1, monster2]);

const runBattles = (battles: Battle[]): void => {
  battles.forEach((battle) => battle.fight());
};

export { player1, player2, player3, monster1, monster2, pvp, pve, runBattles };