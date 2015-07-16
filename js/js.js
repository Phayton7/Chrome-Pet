
var shop = new Array();
var item = new Array();
var tamer = "";
var pet = ({

	name : "Pet",
	health : 100,
    hungry : 50,
	toilet : 0,
	strenght : 1,
	agility : 1,
	weight : 5,
	exp : 0,
	money : 1500,
	happiness : 50,
	inventory : 0,
	level : 1
})

/* Object food */
function food(sName, sLessHungry, sPlusWeight, sHappiness, sPrice){

	this.name = sName,
	this.lessHungry = sLessHungry,
	this.plusWeight = sPlusWeight,
	this.plusHappiness = sHappiness,
	this.price = sPrice
}

/* Array shop */
shop[0] = new food("bread", "5", "5","0", "30");
shop[1] = new food("fruits", "6", "1","-5", "35");
shop[2] = new food("salad","7","1","-6", "40");
shop[3] = new food("chocolate", "6", "8","10","45");
shop[4] = new food("chips", "10", "11", "8", "55");
shop[5] = new food("spaghetti", "25", "20","0","85");
shop[6] = new food("fish", "23", "10","-8", "90");
shop[7] = new food("sushi", "21", "6","-9","90");
shop[8] = new food("chicken", "26", "23","5","125");
shop[9] = new food("hamburger", "30", "28","12", "135");

item[0] = new food("", "", "", "", "");
item[1] = new food("", "", "", "", "");
item[2] = new food("", "", "", "", "");
item[3] = new food("", "", "", "", "");
item[4] = new food("", "", "", "", "");
item[5] = new food("", "", "", "", "");
item[6] = new food("", "", "", "", "");
item[7] = new food("", "", "", "", "");
item[8] = new food("", "", "", "", "");
item[9] = new food("", "", "", "", "");

var select = "";
var select2 = "";

/* That function print the stats of the pet getting by id*/
function print() {

	document.getElementById('name').innerHTML = 'Name: ' + pet.name + '\n\n';
	document.getElementById('level').innerHTML = 'Level: ' + pet.level + '\n';
	document.getElementById('health').innerHTML = 'Health: ' + pet.health + '\n';
	document.getElementById('hungry').innerHTML = 'Hungry: ' + pet.hungry + '\n';
	document.getElementById('strenght').innerHTML =	'Strenght: ' + pet.strenght + '\n';
	document.getElementById('agility').innerHTML = 'Agility: ' + pet.agility + '\n';
	document.getElementById('weight').innerHTML = 'Weight: ' + pet.weight + '\n';
	document.getElementById('happiness').innerHTML = 'Happiness: ' + pet.happiness + '\n';
	document.getElementById('money').innerHTML = pet.money + '$\n';
}

/* Function that select the object (Graphic) */
function selectBuy(foodToBuy) {

	selectToBuy = document.getElementById(foodToBuy);
	selectToBuy.style.opacity = 1;
	selectToBuy.style.animation = "pulse 0.5s ease infinite";
	select = selectToBuy.getAttribute('name');
	for(i=0;i<10;i++) {

		Deselect = document.getElementById(shop[i].name);
		if(Deselect.getAttribute('value') != selectToBuy.getAttribute('value')) {

			Deselect.style.opacity = 0.4;
			Deselect.style.animation = 'none';
		}
	}
}

/* Function buy after selectBuy (Logic) */
function buy() {

	log = document.getElementById('log');
	foodToBuy = document.getElementById(select);
	style = foodToBuy.currentStyle || window.getComputedStyle(foodToBuy, false);
	imgFood = style.backgroundImage;
	emptySlotG = "";
	emptySlotL = "";


	// Search object to insert //
	
	IndexFood = -1;

	for(index2L=0;index2L<10 && IndexFood == -1;index2L++) {

		if(shop[index2L].name == select)
		{
			IndexFood = index2L;
		}
	}

	if(pet.inventory<10 && pet.money >= shop[IndexFood].price) {

		// Searching for the empty slot in the array  //
		
		if(pet.inventory == 0) {
			emptySlotL=0;
		} else {

			for(indexL=0;indexL<10 && emptySlotL=="";indexL++) {

				if(item[indexL].name == "") {

					emptySlotL=indexL;
				}
			}
		}

		// Searching for the empty slot (Graphic) //
		for(indexG=0;indexG<10 && emptySlotG=="";indexG++) {

			indexG2 = 'i'+indexG;
			slotInventory = document.getElementById(indexG2);
			if(slotInventory.getAttribute('name')=='plate') {

				emptySlotG = indexG2;
			}
		}

		

		// Insert object (Graphic) //
		slotToFill = document.getElementById(emptySlotG);
		slotToFill.style.backgroundImage = imgFood;
		slotToFill.setAttribute('name', foodToBuy.getAttribute('name'));
		slotToFill.setAttribute('value', emptySlotL);
		
		// Inser object in the array (Logic) //
		item[emptySlotL].name = shop[IndexFood].name;
		item[emptySlotL].lessHungry = shop[IndexFood].lessHungry;
		item[emptySlotL].plusWeight = shop[IndexFood].plusWeight;
		item[emptySlotL].plusHappiness = shop[IndexFood].plusHappiness;
		item[emptySlotL].price = shop[IndexFood].price;
		pet.money = pet.money - shop[IndexFood].price;

		name = item[emptySlotL].name;

		// Print the event in the Log //
		log.value = log.value + 'You bought ' + shop[IndexFood].name + ' added in your inventory.\n';
		log.value = log.value + 'Money spent: ' + shop[IndexFood].price + '$, money left: ' + pet.money + '$\n\n';
		

		pet.inventory++;

	} 

	if(pet.money < shop[IndexFood].price)
		log.value = log.value + 'No money left! \n\n';

	if(pet.inventory==10) 
		log.value = log.value + 'Inventory Full! \n\n';

}

/* Select the food (Graphic) */
function selectFeed(foodToFeed) {

	selectToFeed = document.getElementById(foodToFeed);
	if(selectToFeed.getAttribute('value') != -1) {

		selectToFeed.style.animation = "pulse 0.5s ease infinite";
		select2 = selectToFeed.getAttribute('id');
	
		for(i=0;i<10;i++) {

			Deselect = document.getElementById('i'+i);

			if(Deselect.getAttribute('id') != selectToFeed.getAttribute('id')) {

				Deselect.style.animation = 'none';
				name1 = Deselect.getAttribute('id');
				name2 = selectToFeed.getAttribute('id');
			}
		}
	}
}

/* Feed function that incrase the stats of the pet and more... */
function feed() {


	if(pet.hungry < 100 && select2 != "") {

		
		log = document.getElementById('log');
		toFeed = document.getElementById(select2);
		IndexDelete = toFeed.getAttribute('value');

		// Calcolo aggiutivo della FAME
		pet.hungry = parseInt(pet.hungry) + parseInt(item[IndexDelete].lessHungry);

		if(pet.hungry > 100) {
			pet.hungry = 100;
			log.value = log.value + pet.name + ": I'm FULL!\n";
		}

		// Calcolo aggiuntivo al PESO e alla FELICITA'
		pet.weight = parseInt(pet.weight) + parseInt(item[IndexDelete].plusWeight);
		pet.happiness = parseInt(pet.happiness) + parseInt(item[IndexDelete].plusHappiness);

		if(pet.happiness > 100) {
			pet.happiness = 100;
			log.value = log.value + pet.name + " is HAPPY!\n";
		}

		// Stampa tutto nel LOG
		log.value = log.value + 'Feeded with ' + item[IndexDelete].name + '\n';
		log.value = log.value + pet.name + ' Hungry incrased to ' + pet.hungry + '\n';
		log.value = log.value + pet.name + ' Weight incrased to ' + pet.weight + '\n';
		log.value = log.value + pet.name + ' Happiness incrased to ' + pet.happiness + '\n\n';

		// Eliminazione dell'oggetto dall'array parte logica //
		item[IndexDelete].name = "";
		item[IndexDelete].lessHungry = "";
		item[IndexDelete].plusWeight = "";
		item[IndexDelete].plusHappiness = "";
		item[IndexDelete].price = "";

		// Eliminazione dell'oggetto parte grafica 
		toFeed.style.backgroundImage = 'url(./css/image/plate.png)';
		toFeed.setAttribute('name', 'plate');
		toFeed.setAttribute('value', -1);
		toFeed.style.animation = 'none';
		pet.inventory = pet.inventory - 1;
	} else if(pet.hungry >= 100) { log.value = log.value + "I'm not hungry...\n"; }
	  else if(select2 == "") { log.value = log.value + "No food selected! Please select one\n"; }

	  print();
}

