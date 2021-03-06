function createPlayer (username, hero) {
    this.username = username;
    this.hero = hero;
};

function createVillain (villain){
    this.villain = villain;
};

 const shuffleCardDeck = function(deck){
    let i = 0
    , j = 0
    , temp = null

    for (i = deck.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1))
        temp = deck[i]
        deck[i] = deck[j]
        deck[j] = temp
    }
} 

const dealDamage = function (damage, target1, attacker, target2) {
    console.log('this is dealDamage');
    if (target2) {
        target1.hp = eval(target1.hp) - damage - eval(attacker.increaseDamage) + eval(target1.decreaseDamage) 
        target2.hp = eval(target2.hp) - damage - eval(attacker.increaseDamage) + eval(target2.decreaseDamage)
    } else {
        target1.hp = eval(target1.hp) - damage - eval(attacker.increaseDamage) + eval(target1.decreaseDamage) 
    }
    if(target1.reflectDamage) {
        console.log('this is reflectDamage');

        dealDamage(3, attacker, target1);
    }
}

const dealDamageMaxHp = function (damage, target1, attacker, target2) {
    console.log('this is dealDamageMaxHp');
    let dmg1 = damage + eval(attacker.increaseDamage) - eval(target1.decreaseDamage)
    let dmg2 = damage + eval(attacker.increaseDamage) - eval(target2.decreaseDamage)
    if (target2.hp > target1.hp) {
        target2.hp = eval(target2.hp) - dmg2
    } else {
        target1.hp = eval(target1.hp) - dmg1 
    }
    if(target1.reflectDamage) {
        dealDamage(3, attacker, target1);
    }
}

const dealDamageBoth = function (damage, target1, attacker, target2) {
    console.log('this is dealDamageBoth');

    let dmg1 = damage + eval(attacker.increaseDamage) - eval(target1.decreaseDamage)
    let dmg2 = damage + eval(attacker.increaseDamage) - eval(target2.decreaseDamage)
    if (target2.hp > target1.hp) {
        target2.hp = (eval(target2.hp) - dmg2 + 2)
        target1.hp = eval(target1.hp) - dmg1
    } else {
        target2.hp = eval(target2.hp) - dmg2
        target1.hp = (eval(target1.hp) - dmg1 + 2)
    }
    if(target1.reflectDamage) {
        dealDamage(3, attacker, target1);
    }
}

const increaseMaxHp = function (heal, target) {
    console.log('this is increaseMaxHp');

    target.hp = eval(target.hp) + heal;
}

const restoreHp = function (heal, target1, target2) {
    console.log('this is restoreHp');

    if ( target2 ) {
        if ( (eval(target1.hp) + heal) > eval(target1.maxHp) ) {
            target1.hp = target1.maxHp
        } else {
            target1.hp = eval(target1.hp) + heal
        }
        if ( (eval(target2.hp) + heal) > eval(target2.maxHp) ) {
            target2.hp = target2.maxHp
        } else {
            target2.hp = eval(target2.hp) + heal
        }
        
    } else  { 

        if ( (eval(target1.hp) + heal) > eval(target1.maxHp) ) {
            target1.hp = target1.maxHp
        } else {
            target1.hp = eval(target1.hp) + heal
        }
    }    
};

const increaseDamage = function (damage, target1, target2) {
    console.log('this is increaseDamage');

    if ( target2 ) {
        target1.increaseDamage = eval(target1.increaseDamage) + damage;
        target2.increaseDamage = eval(target2.increaseDamage) + damage;
    } else {
        target1.increaseDamage = eval(target1.increaseDamage) + damage;
    }
}

const preventDamage = function (damage, target) {
    console.log('this is preventDamage');

    target.decreaseDamage = eval(target.decreaseDamage) + damage
    
}

const drawCard = function (target1, target2) {
    console.log('this is drawCard. target1: ', target1,);

    if ( target2 ) {
        target1.hand.push(target1.hero.cardDeck.pop());
        target2.hand.push(target2.hero.cardDeck.pop());
    } else {
        target1.hand.push(target1.hero.cardDeck.pop());
    }
}

const checkEndOfTheGame = function ( villain, player1, player2 ) {
    if ( villain.hp <= 0 ) {
        return false;
    } else if ( (player1.hp <= 0) && (player2.hp <= 0) )
        return false
}

const reflectOn = function (target) {
    target.reflectDamage = true;
}

const reflectOff = function (target) {
    target.reflectDamage = false;
}

module.exports = {
    createPlayer,
    createVillain,
    shuffleCardDeck,
    dealDamage,
    dealDamageBoth,
    dealDamageMaxHp,
    increaseMaxHp,
    increaseDamage, 
    preventDamage,
    restoreHp, 
    drawCard,
    checkEndOfTheGame,
    reflectOn,
    reflectOff
}