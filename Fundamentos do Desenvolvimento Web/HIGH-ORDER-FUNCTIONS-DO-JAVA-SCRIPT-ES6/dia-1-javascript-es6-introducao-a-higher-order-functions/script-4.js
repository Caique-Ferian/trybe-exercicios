const mage = {
    healthPoints: 130,
    intelligence: 45,
    mana: 125,
    damage: undefined,
  };
  
  const warrior = {
    healthPoints: 200,
    strength: 30,
    weaponDmg: 2,
    damage: undefined,
  };
  
  const dragon = {
    healthPoints: 350,
    strength: 50,
    damage: undefined,
  };
  
  const battleMembers = { mage, warrior, dragon };

  const dragonDamage = (dragon) => {
    const minDmg=15;
    const dragonDmg = Math.round((Math.random() * (dragon.strength - minDmg) + minDmg));
    return dragonDmg;
    };


const warriorDamage = (warrior) => {
    const minDmg = warrior.strength;
    const maxDmg= minDmg*(warrior.weaponDmg);
    const warriorDamage = Math.round((Math.random() * (maxDmg - minDmg)) + minDmg);
    
    return warriorDamage;
    };


const mageDamage = (mage) => {
    const mana=mage.mana;
    const minDmg = mage.intelligence;
    const maxDmg= minDmg*2;
    const turnStats= {
        manaSpent:0,
        damageDealt: "Não possui mana suficiente",
    }
    if(mana>15){
        const mageDamage = Math.round((Math.random() * (maxDmg - minDmg)) + minDmg);
        turnStats.manaSpent=15;
        turnStats.damageDealt=mageDamage;
        return turnStats;
    }
    return turnStats;
    };

const gameActions = {
    warriorTurn: (warriorAttack) => {
        const warriorDamage= warriorAttack(warrior);
        warrior.damage = warriorDamage;
        dragon.healthPoints -= warriorDamage;
    },
    mageTurn: (mageAttack) => {
        const mageTurn = mageAttack(mage)
        const mageDamage= mageTurn.damageDealt;
        mage.damage=mageDamage;
        mage.mana-=mageTurn.manaSpent;
        dragon.healthPoints-= mageDamage;
    },
    dragonTurn: (dragonAttack) => {
        const dragonDamage= dragonAttack(dragon);
        dragon.damage=dragonDamage;
        mage.healthPoints-=dragonDamage;
        warrior.healthPoints-=dragonDamage;
    },
    turnResults: () => battleMembers,            
};
gameActions.warriorTurn(warriorDamage);
gameActions.mageTurn(mageDamage);
gameActions.dragonTurn(dragonDamage);
console.log(gameActions.turnResults());
