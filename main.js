// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input');

const menu = {
    espresso: {
        water: 250,
        milk: 0,
        beans: 16,
        cost: 4
    },
    latte: {
        water: 350,
        milk: 75,
        beans: 20,
        cost: 7
    },
    cappuccino: {
        water: 200,
        milk: 100,
        beans: 12,
        cost: 6
    }
};

const coffee_types = {
    1: 'espresso',
    2: 'latte',
    3: 'cappuccino'
}

let supply = {
    water: 400,
    milk: 540,
    beans: 120,
    cups: 9,
    money: 550
};

function output_machine_state() {
    console.log(`\nThe coffee machine has:
${supply.water} ml of water
${supply.milk} ml of milk
${supply.beans} g of coffee beans
${supply.cups} disposable cups
$${supply.money} of money`)
}

function check_supply(coffee) {
    if (supply.water < menu[coffee].water) {
        console.log('Sorry, not enough water!');
        return false;
    } else if (supply.milk < menu[coffee].milk) {
        console.log('Sorry, not enough milk!');
        return false;
    } else if (supply.beans < menu[coffee].beans) {
        console.log('Sorry, not enough beans!');
        return false;
    }
    console.log('I have enough resources, making you a coffee');
    return true;
}

function buy() {
    let choice = input('\nWhat do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino,' +
        'back - to main menu:\n');
    if (choice === 'back') return;

    let coffee = coffee_types[choice];
    if (!check_supply(coffee)) return;

    supply.water -= menu[coffee].water;
    supply.milk -= menu[coffee].milk;
    supply.beans -= menu[coffee].beans;
    supply.cups--;
    supply.money += menu[coffee].cost;
}

function fill() {
    supply.water += Number(input('\nWrite how many ml of water you want to add:\n'));
    supply.milk += Number(input('Write how many ml of milk you want to add:\n'));
    supply.beans += Number(input('Write how many grans of coffee beans you want to add:\n'));
    supply.cups += Number(input('Write how many disposable coffee cups you want to add:\n'));
}

function take() {
    console.log(`I gave you $${supply.money}`);
    supply.money = 0;
}

function read_action() {
    let action = input('Write action (buy, fill, take, remaining, exit):\n');
    switch (action) {
        case 'buy':
            buy();
            break;
        case 'fill':
            fill();
            break;
        case 'take':
            take();
            break;
        case 'remaining':
            output_machine_state();
            break;
        case 'exit':
            run = false;
            return;
        default:
            console.log('Wrong option');
    }
    console.log();
}

let run = true;
function run_coffee_machine() {
    while (run) {
        read_action();
    }
}

run_coffee_machine();
