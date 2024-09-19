/* BASE STATS */
let xp = 0;
let level = 1;
let health = 100;
let maxHealth = 100;
let gold = 50;
let bag = 2;
let fullBag = 3;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];


/* this help js find and edit things on the html file */

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
const backpack = document.querySelector("#relic");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const levelText = document.querySelector("#levelText");
const healthText = document.querySelector("#healthText");
const maxHealthText = document.querySelector("#maxHealthText");
const goldText = document.querySelector("#goldText");
const bagText = document.querySelector("#bagText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth"); // had to call it monsterHealthText because we already declared monsterHealth? //

/* below we are creating objects / key: value / */

const weapons = [
    {
      name: "stick",
      power: 5,
    }, {
      name: "rusty dagger",
      power: 20,
    }, {
      name: "Mallet",
      power: 45,
    }, {
      name: "sword",
      power: 100,
    }, {
        name: "spear",
        power: 150,
    }, {
        name: "claymore",
        power: 250,
    }
]



const locations = [{
    name: "home",
    "button text": [ "Shop", "Dungeon", "Fight Dragon", "Rest"],
    "button functions": [shop, dungeon, fightDragon, rest],
    text: "You walked into the woods. ahead stood your old wood cabin, as you stepped inside sounds of the rain colliding with the window could be hear soon followed the sound of an undefeated foe, the hydra surrounded the outskirts of your home.",
  }, {
    name: "shop",
    "button text": [ "Buy 10  Max Health (45 gold)", "Buy weapon (120 gold)", "Buy Potion (25 gold)", "Go back Home"],
    "button functions": [buyHealth, buyWeapon, buyPotion, goHome],
    text: "You entered the shop, outside an old rotten sign read Warrior Supplies For Dummies. The cashier was an orc, his thick green skin resembled the grass in the spring and his teeth sharp blades.",
  }, {
    name: "dungeon",
    "button text": ["Fight Toxic Slime", "Fight Humanoid Beast", "Go back Home"],
    "button functions": [fightSlime, fightBeast, goHome],
    text: "You enter the Dungeon. You see some creatures.",
  }, {
    name: "fight",
    "button text": ["Attack", "Dodge", "Use Potion", "Run"],
    "button functions": [attack, dodge, usePotion, goHome],
    text: "You are fighting a ",
  }, {
    name: "kill slime",
    "button text": ["Go back Home", "Loot Chest?", "Go back Home"],
    "button functions": [goHome, chestOrMimic, easterEgg],
    text: "The Slime Girl screams out \"WHY ARE YOU DOING THIS! BOOP!\" as it dies. You searched slime puddle for her lifesavings.",
  }, {
    name: "kill beast",
    "button text": ["Go back Home", "Loot Chest?", "Go back Home"],
    "button functions": [goHome, chestOrMimic, easterEgg],
    text: "The Beastly Woman hisses out \"Why me, I just wanted to be strong enough to defend my village!\" as it dies. You gain experience points and collect the creature lifesavings.",
  }, {
    name: "Kill Mimic",
    "button text": ["Go back Home", "Go back Home", "Go back Home"],
    "button functions": [goHome, goHome, goHome],
    text: "The Mimic panic and screams out \"NO! MY #S!\" you see its still trying to protect its gold as it dies. You gain experience points and move the Mimic off the pile of gold then collect the Mimic's  lifesavings.",
  }, {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;",
  }, {
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You defeat the Hydra! YOU MONSTER! &#x1F389;"
  }, {
     name: "easteregg",
    "button text": ["2", "8", "Go Back Home?"],
    "button functions": [pickTwo, pickEight, goHome],
     text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!",
  }, {
    name: "Chest",
   "button text": ["Fight Toxic Slime", "Fight Humanoid Beast", "Go Back Home"],
   "button functions": [fightSlime, fightBeast, goHome],
    text: "Looks like we can go deeper"
  }
];



const monsters = [
    {
      name: "Toxic Slime",
      level: 2,
      health: 15,
    }, {
      name: "Humanoid Snake Beast",
      level: 8,
      health: 60,
    }, {
      name: "Sangrine Magic Hydra",
      level: 20,
      health: 3000,
    }, {
      name: "Mimic",
      level: 18,
      health: 300,
    }
];
/*const lootTables = [
  {
    item: "Mimic's Tongue",
    chance: .05,
    itemDecription: "A mimic tongue",
    stat: `${4*exp}`,
  },
]*/

/* initialize buttons */

button1.onclick = shop;
button2.onclick = dungeon;
button3.onclick = fightDragon;
button4.onclick = buyPotion;

/* FUNCTIONS */

function update(location) {
    monsterStats.style.display = "none";
    button4.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button4.innerText = location["button text"][3];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    button4.onclick = location["button functions"][3];
    text.innerHTML = location.text; 
}

backpack.addEventListener("click", openbackpack);

function openbackpack() {
  const tm = document.createElement("div");
  tm.innerHTML = 
   `<div id="openbackpack">
      <h2>Backpack</h2>
      <div id="backpackItems"></div>
      <button id="close-backpack">Close</button>
    </div>`;
    
    document.body.appendChild(tm);
    const closeBackpack = tm.querySelector("#close-backpack");
    closeBackpack.onclick = () => {
          document.body.removeChild(tm);
        };
}


function levelUp() {
  let xpLevel = xp - 15 * level;
  let nextLevel = 15 * level - xp;
  if (xp >= 15 * level) {
    level++;
    xp = xpLevel;
    maxHealth += 10;
    health = maxHealth;
    levelText.innerText = level;
    healthText.innerText = health;
    xpText.innerText = xp;
    maxHealthText.innerText = maxHealth;
    text.innerText += " You leveled up to level " + level + "! ";
  } else {
    text.innerText += " You need " + nextLevel + " xp to level up! ";
  }
}

function goHome() {
    update(locations[0]);
    slimeImage.style.display = "none";
    beastImage.style.display = "none";
    hydraImage.style.display = "none";
    mimicImage.style.display = "none";
    button4.style.display = "block";
  // you can excape double quotes and quote someting inside a double quote like this "Hello \"World!\"" 
}

function rest() {
  update(locations[0]);
  health = maxHealth;
  healthText.innerText = health;
}

function shop() {
    update(locations[1]);
    button4.style.display = "inline-block";
    if (currentWeapon < weapons.length - 1) {
       
   } else {
       text.innerText = "You looked around for a new weapon but none of them are better than you current weapon. You look sad and looked away while realizing that the game is about to end.";
       button2.innerText = "Sell weapon for 15 gold";
       button2.onclick = sellWeapon;
   }
    //console.log("Heading to Shop.");
}

function dungeon() {
    update(locations[2])
    //console.log("Heading to Dungeon.");
}

function buyHealth() {
    if (gold >= 45) {
      gold -= 45;
      health += 10;
      maxHealth += 10;
      goldText.innerText = gold;
      healthText.innerText = health;
      maxHealthText.innerText = maxHealth;
    } else {
        text.innerText = "ShopKeeper: HEY ARE YOU TRYING TO ROB ME! THAT NOT ENOUGH GOLD!";
    }
}

function buyWeapon() {
    if (currentWeapon < weapons.length - 1) {
       if (gold >= 120) {
           gold -= 120;
           currentWeapon++;
           goldText.innerText = gold;
           let newWeapon = weapons[currentWeapon].name;
           text.innerText = "You now have a " + newWeapon + ".";
           inventory.push(newWeapon);
           text.innerText += " In your inventory you have: " + inventory;
        } else {
           text.innerText = "ShopKeeper: HEY ARE YOU TRYING TO ROB ME! MAKING WEAPONS ISNT CHEAP YOU KNOW! Come back when you have enough gold!";
      }
    } else {
        text.innerText = "You looked around for a new weapon but none of them are better than you current weapon. You look sad and looked away while realizing that the game is about to end.";
        button2.innerText = "Sell weapon for 15 gold";
        button2.onclick = sellWeapon;
    }
}

function buyPotion() {
  if (gold >= 25) {
    if (bag < fullBag) {
      gold -= 25;
      bag++;
      goldText.innerText = gold;
      bagText.innerText = bag;
    } else {
      text.innerText = "Your bag seems to be full."
    }
  } else {
    text.innerText = "ShopKeeper: HEY ARE YOU TRYING TO ROB ME! THAT NOT ENOUGH GOLD!";
  }
}
function usePotion() {
  if (bag > 0) {
    if ( health < maxHealth) {
      bag--;
      bagText.innerText = bag;
     if (health + 25 <= maxHealth) {
      health += 25;
      healthText.innerText = health;
    } else {
      health = maxHealth;
      healthText.innerText = health;
    }
    text.innerText = "You reached in your bag and pull out a potion and healed for 25 health.";
    } else {
      text.innerText = "You are already at full health.";
    }
  } else {
    text.innerText = "You don't have any potions in your bag.";
  }
}

function sellWeapon() {
    if (inventory.length > 1) {
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "You sold a " + currentWeapon + ".";
        text.innerText += " You looked inside your backpack you have: " + inventory;
    } else {
        text.innerText = "I don't think you should your only weapon.";
    }
}

function fightSlime() {
    fighting = 0;
    slimeImage.style.display = "block";
    fight();
}

function fightBeast() {
    fighting = 1;
    beastImage.style.display = "block";
    fight();
}

function fightDragon() {
    fighting = 2;
    hydraImage.style.display = "block";
    fight();
    //console.log("Heading to fight 'Sangrine Magic Hydra'.");
} 

function fightMimic() {
  fighting = 3;
  text.innerText = "The Chest comes alive and said \"YOU HAVE GOLD! GIVE IT TO ME!\" and leaps at you";
  mimicImage.style.display = "block";
  fight();
}
 
function fight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block"; // this stops the css rule tthat hide the monsters stats
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsters[fighting].health;
  text.innerText += " " + monsters[fighting].name + ".";
  button4.style.display = "inline-block";
}

function attack() {
    if (isMonsterHit()) {
        monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * level) + 1;
        text.innerText = " You attack it with your " + weapons[currentWeapon].name + ".";
    } else {
        text.innerText += " You miss.";
      }
     if (monsterHealth > 0) {
    health -= getMonsterAttackValue(monsters[fighting].level);
    text.innerText = "The " + monsters[fighting].name + " attacks.";
       } 
    if (health <= 0) {
       lose();
      } else if (monsterHealth <= 0) {
        if (fighting <= 1) {
        defeatMonster();
      } else if (fighting === 2){
        winGame();
      } else { 
        defeatMimic();
      }
    }
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
      if (Math.random() <= .1 && currentWeapon > 0) {
        text.innerText += " Your " + inventory.pop() + " breaks.";
        currentWeapon--;
      }
}

function isMonsterHit() {
    return Math.random() > .2 || health < 20;
}

function getMonsterAttackValue(level) {
    const hit = (level * 5) - (Math.floor(Math.random() * level));
    // ternary operator it works like an if/else operator but its harder for me to understand 
    return hit > 0 ? hit : 0; 
}

function dodge() {
    text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

function defeatMonster() {
  let addGold = 0;
  let addXp = 0;
    addGold += Math.floor(monsters[fighting].level * 6.7);
    gold += addGold;
    addXp += monsters[fighting].level;
    xp += addXp;
    goldText.innerText = gold;
    xpText.innerText = xp;
    slimeImage.style.display = "none";
    beastImage.style.display = "none";
    hydraImage.style.display = "none";
    mimicImage.style.display = "none";
    if (fighting <= 0) {
      update(locations[4]);
    } else if (fighting <= 1) {
    update(locations[5]);
    } else if (fighting <= 2) {
      winGame();
    }
    text.innerText += " You found " + addGold + " gold ";
    text.innerText += " and gained " + addXp + " xp! ";
    levelUp();
}
function chestOrMimic() {
  if (Math.random() <= .25) {
    fightMimic();
  } else{
    chestLoot();
  }
}

function defeatMimic() {
  let addGold = 0;
  let addXp = 0;
  update(locations[6]);
  addGold += Math.floor(monsters[fighting].level * 20);
  gold += addGold;
  addXp += Math.floor(monsters[fighting].level * 15);
  xp += addXp;
  goldText.innerText = gold;
  text.innerText += " You found " + addGold + " gold ";
  xpText.innerText = xp;
  text.innerText += " and gained " + addXp + " xp! ";
  mimicImage.style.display = "none";
  levelUp();
}
function chestLoot() {
  let addGold = 0;
  addGold += Math.floor(Math.random() * 251);
  update(locations[10]);
  text.innerText = " You see a chest and open it. ";
  text.innerText += " You found " + addGold + " gold! ";
  gold += addGold;
  goldText.innerText = gold;
  text.innerText += " Looks like there are more creatures. ";
}

function lose() {
    update(locations[7]);
    slimeImage.style.display = "none";
    beastImage.style.display = "none";
    hydraImage.style.display = "none";
    mimicImage.style.display = "none";
}

function restart() {
    xp = 0;
    health = 100;
    maxHealth = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    level = 1;
    bag = 0;
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    levelText.innerText = level;
    bagText.innerText = bag;
    goHome();
}

function winGame() {
    update(locations[8]);
}

function easterEgg() {
    update(locations[9]);
}

function pickTwo() {
    pick(2)
}

function pickEight() {
    pick(8)
}

function pick(guess) {
    const numbers = [];
    while (numbers.length < 10) {
      numbers.push(Math.floor(Math.random() * 11));
    }
    text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
    for (let i = 0; i < 10; i++) {
      text.innerText += numbers[i] + "\n"; 
    }
    if (numbers.includes(guess)) {
      text.innerText += "Right! You win 20 gold!";
      gold += 20;
      goldText.innerText = gold;
    } else {
      text.innerText += "Wrong! You lose 10 health!";
      health -= 10;
      healthText.innerText = health;
      if (health <= 0) {
        lose()
      }
    }
}
