
var shop = new Array();
var item = new Array();
/*Variables used to limit */
var currentDay;
var changeDay;
var feedCounter = 0;
var trainingCounter = 0;
var checkFeedToday = 1;
var checkTrainingToday= 1; 

/*Gym check status Variables*/
var score = 0;
var start = 0;
var sec=0;
var t;
var nClick = 100;
var nTraining=0;
var myVar;

/* Variables for the time when the application is close.*/
var timeStart; 
var timeClose;
var delay;

/* Variables for a possible Pet's desease. */
var desease = 1; 
var interval_1;
var interval_2;
var interval_3;
var interval_4;


var pet = ({

	name : 'pet',
	std : 1,
	grownPoint: 0,
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

function NewGame() {
	document.getElementById('buttonStart').style.animation = 'bounceOut 0.5s forwards';
	document.getElementById('buttonLoad').style.animation = 'bounceOut 0.5s forwards';

	setTimeout(function () {
		document.getElementById('buttonConfirm').style.display = 'block';
		document.getElementById('inputName').style.display = 'block';
		document.getElementById('buttonConfirm').style.animation = 'bounceIn 0.5s forwards';
		document.getElementById('inputName').style.animation = 'bounceIn 0.5s forwards';
	}, 1000)
} 

function confirmName() {

	if(document.getElementById('inputName').value != "")
	{
		document.getElementById('Logo').style.animation = 'bounceOut 1s forwards';
		setTimeout(function (){
			pet.name = document.getElementById('inputName').value;
			document.getElementById('window').style.display = 'block';
			document.getElementById('window').style.animation = 'bounceIn 0.5s forwards';
			document.getElementById('Logo1').style.display = 'block';
			document.getElementById('Logo1').style.animation = 'bounceIn 1s forwards';
			document.getElementById('Logo2').style.display = 'block';
			document.getElementById('Logo2').style.animation = 'bounceIn 1.2s forwards';
			document.getElementById('buttonConfirm').style.display = 'none';
			document.getElementById('inputName').style.display = 'none';
		}, 1000)
		introduction();
	}
	else
	{
		alert('No name inserted');	
	}
	welcome("date");
	openTime();
	openApplicationDelay();
	decreaseStatInGame(); 
	decreaseStatOutGame();
	checkDeseaseInGame();
	checkDeseaseOutGame();
	getCurrentDay();
	print();

}

function LoadGame() {

	welcome("date");
	load();
	openTime();
	openApplicationDelay();
	decreaseStatInGame(); 
	decreaseStatOutGame();
	checkDeseaseInGame();
	checkDeseaseOutGame();
	getCurrentDay();
	evolutionControl();
	print();
}

function welcome(data) {

    window.onload = date_time('date');
    window.onbeforeunload = function(event)
    {
        return 'I dati di gioco verranno salvati AUTOMATICAMENTE'
    };
}

function introduction() {

    canvas = document.getElementById('canvas');
    canvas.style.display = 'block';
    canvas.style.animation = 'darker 2s forwards';
    setTimeout(function () {canvas.style.animation = 'lighter 2s forwards';}, 3000);
    setTimeout(function () {canvas.style.display = 'none';}, 5000);
}

function TimeStamp() {

	var TimeStamp = Math.floor(Date.now() / 1000);
	TimeStamp = TimeStamp / 60;
	TimeStamp = TimeStamp / 60;
	return TimeStamp;
}

/* That function print the stats of the pet getting by id*/
function print() {

	
	if(pet.health < 50) {
		document.getElementById('health').style.color = '#FF4136'
	}else { document.getElementById('health').style.color = '#3D9970';}

	if(pet.hungry < 40) {
		document.getElementById('hungry').style.color = '#FF4136';
	}else { document.getElementById('hungry').style.color = '#3D9970';}

	if(pet.happiness < 40) {
		document.getElementById('happiness').style.color = '#FF4136';
	}else { document.getElementById('happiness').style.color = '#3D9970';}

	document.getElementById('name').innerHTML = 'Name: ' + pet.name + '\n\n';
	document.getElementById('grownPoint').innerHTML = 'GPoint: ' + pet.grownPoint + '\n\n';
	document.getElementById('health').innerHTML = 'Health: ' + pet.health + '\n';
	document.getElementById('hungry').innerHTML = 'Hungry: ' + pet.hungry + '\n';
	document.getElementById('strenght').innerHTML =	'Strenght: ' + pet.strenght + '\n';
	document.getElementById('agility').innerHTML = 'Agility: ' + pet.agility + '\n';
	document.getElementById('weight').innerHTML = 'Weight: ' + pet.weight + 'g\n';
	document.getElementById('happiness').innerHTML = 'Happiness: ' + pet.happiness + '\n';
	document.getElementById('money').innerHTML = pet.money + '$\n';

	setTimeout('print()', 1000);
}

/* Function that select the object (Graphic) */
function selectBuy(foodToBuy) {

	selectToBuy = document.getElementById(foodToBuy);
	selectToBuy.style.opacity = 1;
	selectToBuy.style.animation = "pulse 0.5s ease infinite";
	select = selectToBuy.getAttribute('name');
	log = document.getElementById('log');

	for(index2L=0;index2L<10;index2L++) {

		if(shop[index2L].name == select)
		{
			log.value = log.value + 'Food: ' + shop[index2L].name +'\n';
			log.value = log.value + 'Hungry: ' + shop[index2L].lessHungry +'\n';
			log.value = log.value + 'Calories: +' + shop[index2L].plusWeight +'g\n';
			log.value = log.value + 'Happiness: ' + shop[index2L].plusHappiness +'\n';
			log.value = log.value + 'Price: ' + shop[index2L].price +'\n';
		}
	}
	for(i=0;i<10;i++) {

		Deselect = document.getElementById(shop[i].name);
		if(Deselect.getAttribute('value') != selectToBuy.getAttribute('value')) {

			Deselect.style.opacity = 0.4;
			Deselect.style.animation = 'none';
		}
	}
	ScrollBottom();
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

	ScrollBottom();

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

	message = document.getElementById('message');
	balloon = document.getElementsByClassName('speech-bubble');

	print();
	if(pet.hungry < 100 && select2 != "") {

		
		log = document.getElementById('log');
		toFeed = document.getElementById(select2);
		IndexDelete = toFeed.getAttribute('value');

		// Calcolo aggiutivo della FAME
		pet.hungry = parseInt(pet.hungry) + parseInt(item[IndexDelete].lessHungry);

		if(pet.hungry >= 100) {
			pet.hungry = 100;
			log.value = log.value + pet.name + ": I'm FULL!\n";
			message.innerHTML = "I'm full...!";
			balloon[0].style.animation = 'appear 2s forwards';
			setTimeout(function () {balloon[0].style.animation = 'disappear 2s forwards';}, 4000)
			
			print();
		}

		// Calcolo aggiuntivo al PESO e alla FELICITA'
		pet.weight = parseInt(pet.weight) + parseInt(item[IndexDelete].plusWeight);
		pet.happiness = parseInt(pet.happiness) + parseInt(item[IndexDelete].plusHappiness);

		if(pet.happiness >= 100) {
			pet.happiness = 100;
			log.value = log.value + pet.name + " is HAPPY!\n";
			message.innerHTML = "Thank you!";
			balloon[0].style.animation = 'appear 2s forwards';
			setTimeout(function () {balloon[0].style.animation = 'disappear 2s forwards';}, 4000)
		}

		// Stampa tutto nel LOG
		log.value = log.value + 'Feeded with ' + item[IndexDelete].name + '\n';
		log.value = log.value + pet.name + ' Hungry incrased/decreased to ' + pet.hungry + '\n';
		log.value = log.value + pet.name + ' Weight incrased/decreased to ' + pet.weight + '\n';
		log.value = log.value + pet.name + ' Happiness incrased/decreased to ' + pet.happiness + '\n\n';

		if(item[IndexDelete].name == "fish" || item[IndexDelete].name == "sushi") {
			growUp(20);
			log.value = log.value + pet.name + " +20 GPoint\n"
		} else if(item[IndexDelete].name == "bread" || item[IndexDelete].name == "fruits" || item[IndexDelete].name == "salad") {
			growUp(5);
			log.value = log.value + pet.name + " +5 GPoint\n"
		} else if(item[IndexDelete].name == "chocolate" || item[IndexDelete].name == "chips" || item[IndexDelete].name == "spaghetti") {
			growUp(10);
			log.value = log.value + pet.name + " +10 GPoint\n"
		} else {
			growUp(15);
			log.value = log.value + pet.name + " +15 GPoint\n"
		}

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
	}
	else if(pet.hungry >= 100) {
		log.value = log.value + "I'm not hungry...\n"; 
		message.innerHTML = "I'm not hungry...";
		balloon[0].style.animation = 'appear 2s forwards';
		setTimeout(function () {balloon[0].style.animation = 'disappear 2s forwards';}, 4000)
	}
	else if(select2 == "")
		log.value = log.value + "No food selected! Please select one\n"; 

	ScrollBottom();
	print();
}


function ScrollBottom() {

	log = document.getElementById('log');
   	log.scrollTop = log.scrollHeight;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* Hide and show function */
function HideShow(quale) {  
    if(document.getElementById(quale).style.display == 'block') {
        document.getElementById(quale).style.animation = 'bounceOut 0.5s forwards'
        setTimeout(function(){ document.getElementById(quale).style.display = 'none'; }, 600)
    }
    else
    {
       document.getElementById(quale).style.display = 'block';
       document.getElementById(quale).style.animation = 'bounceIn 0.5s forwards';
    }
}

/* Data&Time generator function */
function date_time(id) {
        date = new Date;
        year = date.getFullYear();
        month = date.getMonth();
        months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
        d = date.getDate();
        day = date.getDay();
        days = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
        h = date.getHours();
        if(h<10)
        {
                h = "0"+h;
        }
        m = date.getMinutes();
        if(m<10)
        {
                m = "0"+m;
        }
        s = date.getSeconds();
        if(s<10)
        {
                s = "0"+s;
        }
        result = ''+days[day]+' '+months[month]+' '+d+' - '+h+':'+m;
        checkTime(h);
        document.getElementById(id).innerHTML = result;

        setTimeout(function() { growUp(1); }, 60000);
        print();

        setTimeout('date_time("'+id+'");', 20000);
}

/* Time checker for background change */
function checkTime(hour) {

    gameWindow = document.getElementById('window');
    body = document.body;
    statistics = document.getElementById('statistics');
    stats = document.getElementById('stats');
    date = document.getElementById('date');
    money = document.getElementById('moneyLog');
    log = document.getElementById('log')
    log2 = document.getElementById('logtxt');
    quest = document.getElementById('quest');
    stat = document.getElementsByClassName('stat');


    if(hour > 5 && hour <= 16) {

        gameWindow.style.backgroundImage = 'url("./css/bg//background1.gif")';
        gameWindow.style.border = '5px solid #9adacc';
        body.style.backgroundImage = 'url(./css/bg//background.1.jpg")"';
        statistics.style.border = '2px solid #9adacc';
        statistics.style.background = 'white';
        stats.style.color = '#2ECC40';
        date.style.color = '#17C654';
        date.style.border = '2px solid #9adacc';
        date.style.background = 'white';
        money.style.border = '2px solid #9adacc';
        money.style.background = 'white';
        log.style.border = '2px solid #9adacc';
        log.style.background = '#9adacc';
        log.style.color = '#379336';
        log2.style.color = '#2ECC40';
        quest.style.border = '2px solid #9adacc';
        quest.style.backgroundColor = 'white';
        for(i=0;i<8;i++)
            stat[i].style.color = 'blue';
    }

    if(hour > 16 && hour < 19) {


        gameWindow.style.backgroundImage = 'url("./css/bg//background2.gif")';
        gameWindow.style.border = '5px solid #F29600';
        body.style.backgroundImage = 'url("./css/bg//background2.jpg")';
        statistics.style.border = '2px solid #28ae31';
        statistics.style.background = '#A4F69F';
        stats.style.color = '#28ae31';
        date.style.color = '#17C654';
        date.style.border = '2px solid #28ae31';
        date.style.background = '#A4F69F';
        money.style.border = '2px solid #28ae31';
        money.style.background = '#A4F69F';
        log.style.border = '2px solid #28ae31';
        log.style.background = '#71E06C';
        log.style.color = 'green';
        log2.style.color = '#28ae31';
        quest.style.border = '2px solid #28ae31';
        quest.style.background = '#71E06C';
        for(i=0;i<8;i++)
            stat[i].style.color = 'orange';
    }

    if((hour>19 && hour<23)||(hour > 0 && hour < 5)) {

        gameWindow.style.backgroundImage = 'url("./css/bg/background3.gif")';
        gameWindow.style.border = '5px solid #091769';
        body.style.backgroundImage = 'url("./css/bg/background3.jpg")';
        statistics.style.border = '2px solid #091769';
        statistics.style.background = '#485AFF';
        stats.style.color = '#78769D';
        date.style.color = 'white';
        date.style.border = '2px solid #091769';
        date.style.background = '#485AFF';
        money.style.border = '2px solid #2A39BA';
        money.style.background = '#485AFF';
        log.style.border = '2px solid #091769';
        log.style.background = '#1626BA';
        log.style.color = 'white';
        log2.style.color = '#78769D';
        quest.style.border = '2px solid #091769';
        quest.style.background = '#1626BA';
        for(i=0;i<8;i++)
            stat[i].style.color = 'white';
    }
}

function setFocus(id1,id2) {

    div1 = document.getElementById(id1);
    div2 = document.getElementById(id2);

    div1.style.zIndex = 2;
    div2.style.zIndex = 1;
} 


function growUp(howMuch) {

    pet.grownPoint = pet.grownPoint + howMuch;
    evolutionControl();
    print();
}

function evolutionControl() {

    if(pet.grownPoint >= 150 && pet.std == 1) {

        pet.std = 2;
        petAge = document.getElementById('pet');
        petAge.style.animation = 'flash 1s forwards';
        setTimeout(function() {
            petAge.style.backgroundImage = "url(./css/pet/petGrown.png)";
            petAge.style.animation = 'playEvo 1s steps(2) infinite';
            petAge.style.top = '350px';
            petAge.style.width = '132px';
            petAge.style.height = '124px';
        }, 800);
        print();
    }
}


/* Both draggable function */
$(function () {
        $("#shopWindow").draggable({
                               handle: "#drag1"
                });
});

$(function () {
        $("#Inventory").draggable({
                               handle: "#drag2"
                });
});

$(function () {
        $("#Gym").draggable({
                               handle: "#drag3"
                });
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// GYM
function TimeCount() {

		log = document.getElementById('log');

		if(start == 1 && score < nClick) {

			c=c+1;
			t=setTimeout("TimeCount()",1000);
			document.getElementById('time').innerHTML = 'Second: ' + c;
		}
		else
		{
			pet.weight = pet.weight - c/2;
			pet.money = pet.money + (c*3);
			log.value = log.value + "Earn " + c*3 + "$!\n\n"
			if(pet.weight<0) {
				pet.weight = 0.1;
				log.value = log.value + "Weight can't be decreased more...\n\n"
			} else {log.value = log.value + "Weight decreased by " + c/2 + '\n'; }
			if(c<10) {
				growUp(15);
				log.value = log.value + pet.name + " +15 GPoint\n"
			}
			if(c>=10 && c<15) {
				growUp(10);
				log.value = log.value + pet.name + " +10 GPoint\n"
			}
			if(c>=15) {
				growUp(5);
				pet.grownPoint = pet.grownPoint + 5;
				log.value = log.value + pet.name + " +5 GPoint\n"
			}
		}
		ScrollBottom();
		print();
}

function reset() {

	start = 0;
	c=0;
	score=0;

	document.getElementById('time').innerHTML = 'Second: ' + c;
	document.getElementById('score').innerHTML = 'Score: -';
	document.getElementById('gymButton').style.display = 'block';
	document.getElementById('clickButton').style.display = 'none';
}


function Start() {

	start = 1;
	c=0;
	score=0;
	log = document.getElementById('log');

	if(pet.hungry > 40)
	{
		document.getElementById('gymButton').style.display = 'none';
		document.getElementById('clickButton').style.display = 'block';
		pet.hungry = pet.hungry - 10;
		log.value = log.value + 'Hungry decreased by 10\n\n';
		print()
	} else {log.value = log.value + "You can't train without eating\n\n "; return false;}
}

function RapidClick() {

	if(score > nClick-1) {
		score = nClick-1;

	}

	if(start == 0)
		start = 1;

	if(start == 1)
	{
		score++;
		document.getElementById('score').innerHTML = 'Score: ' + score;
	}
}


// Poop 
function poop() {

	log = document.getElementById('log');

	var n = Math.floor((Math.random() * 100) + 0);
	if(n%2 == 0) {
		pet.toilet = 1;
		document.getElementById('poop').style.display = 'block';
		document.getElementById('poop').style.animation = 'bounceIn 0.5s forwards';
		log.value = log.value + pet.name + ' did the poo\n\n';
	}

	setTimeout('poop()', 5000);
}


function clean() {
	log = document.getElementById('log');

	if(pet.toilet == 1) {
		pet.toilet = 0;
		document.getElementById('poop').style.animation = 'bounceOut 0.5s forwards';
		log.value = log.value + 'Cleaned!\n\n';
		setTimeout(function() { document.getElementById('poop').style.display = 'none';}, 1000);
	} else { log.value = log.value + 'Nothing to clean\n\n'}
}


//Save and Load
function save() {

	var timeStamp = Math.floor(Date.now() / 1000);

	localStorage.setItem('name', pet.name);
	localStorage.setItem('GPoint', pet.grownPoint);
	localStorage.setItem('health', pet.health);
	localStorage.setItem('hungry', pet.hungry);
	localStorage.setItem('weight', pet.weight);
	localStorage.setItem('toilet', pet.toilet);
	localStorage.setItem('strenght', pet.strenght);
	localStorage.setItem('happiness', pet.happiness);
	localStorage.setItem('agility', pet.agility);
	localStorage.setItem('exp', pet.exp);
	localStorage.setItem('money', pet.money);
	localStorage.setItem('inventory', pet.inventory);
	localStorage.setItem('timeClose', TimeStamp());
	localStorage.setItem('log', document.getElementById('log').value);
	localStorage.setItem('closeTime', timeStamp)

	/*day-limits variables*/
	localStorage.setItem('currentDay', currentDay);
	localStorage.setItem('feedCounter', feedCounter);
	localStorage.setItem('checkFeedToday', checkFeedToday);
	localStorage.setItem('trainingCounter', trainingCounter);
	localStorage.setItem('checkTrainingToday', checkTrainingToday);

    /*day change check variables*/
   	localStorage.setItem('timeStart', timeStart);
	localStorage.setItem('timeClose', timeClose);
	localStorage.setItem('delay', delay);

	/*pet desease status variable*/
	localStorage.setItem('desease', desease);

	saveItem();
}

function saveItem() {


	for(i=0;i<10;i++) {

		localStorage.setItem('itemName'+i, item[i].name);
		localStorage.setItem('itemLessHungry'+i, item[i].lessHungry);
		localStorage.setItem('itemPlusWeight'+i, item[i].plusWeight);
		localStorage.setItem('itemPlusHappiness'+i, item[i].plusHappiness);
		localStorage.setItem('itemPlusPrice'+i, item[i].itemPlusPrice);
	}

	for(i=0;i<10;i++) {
		slotToSave = document.getElementById('i'+i);
		localStorage.setItem('slotName'+i, slotToSave.getAttribute('name'));
		localStorage.setItem('slotValue'+i, slotToSave.getAttribute('value'));
		alert('name:' + localStorage.getItem('slotName'+i) + '  value: ' + localStorage.getItem('slotValue'+i));
	}
}


function load(){

	pet.name = localStorage.getItem('name');
	if (pet.name != "undefined" || pet.name != "null" ) {

		log = document.getElementById('log');
		pet.grownPoint = parseInt(localStorage.getItem('GPoint'));
		pet.health = parseInt(localStorage.getItem('health'));
		pet.hungry = parseInt(localStorage.getItem('hungry'));
		pet.weight = parseInt(localStorage.getItem('weight'));
		pet.toilet = localStorage.getItem('toilet');
		pet.strenght = parseInt(localStorage.getItem('strenght'));
		pet.agility = parseInt(localStorage.getItem('agility'));
		pet.exp = parseInt(localStorage.getItem('exp'));
		pet.money = parseInt(localStorage.getItem('money'));
		loadItem();
		log.value = localStorage.getItem('log');

		/*day-limits variables*/
		currentDay = localStorage.getItem('currentDay');
		feedCounter = localStorage.getItem('feedCounter');
		checkFeedToday = localStorage.getItem('checkFeedToday');
		trainingCounter = localStorage.getItem('trainingCounter');
		checkTrainingToday = localStorage.getItem('checkTrainingToday');

		/*day change check variables*/
		timeStart = localStorage.getItem('timeStart');
		timeClose = localStorage.getItem('timeClose');
		delay = localStorage.getItem('delay');

		/*pet desease status variable*/
		desease = parseInt(localStorage.getItem('desease'));
		print();

		document.getElementById('window').style.display = 'block';
		document.getElementById('window').style.animation = 'bounceIn 0.5s forwards';
		document.getElementById('welcome').innerHTML = 'WELCOME BACK';
		document.getElementById('welcome').style.left = '360px';
		document.getElementById('Logo').style.animation = 'bounceOut 1s forwards';
		document.getElementById('Logo1').style.display = 'block';
		document.getElementById('Logo1').style.animation = 'bounceIn 1s forwards';
		document.getElementById('Logo2').style.display = 'block';
		document.getElementById('Logo2').style.animation = 'bounceIn 1.2s forwards';
		document.getElementById('buttonStart').style.animation = 'bounceOut 0.5s forwards'
		document.getElementById('buttonLoad').style.animation = 'bounceOut 0.5s forwards'
		setTimeout(function () {
			document.getElementById('Logo').style.display = 'none';
			document.getElementById('buttonStart').style.display = 'none';
			document.getElementById('buttonLoad').style.display = 'none';
		}, 1000);
		introduction();

	} else { alert('No save data');}
}

function loadItem() {

	pet.inventory = localStorage.getItem('inventory');

	for(i=0;i<10;i++) {

		item[i].name = localStorage.getItem('itemName'+i);
		item[i].lessHungry = localStorage.getItem('itemLessHungry'+i);
		item[i].plusWeight = localStorage.getItem('itemPlusWeight'+i);
		item[i].plusHappiness = localStorage.getItem('itemPlusHappiness'+i);
		item[i].itemPlusPrice = localStorage.getItem('itemPlusPrice'+i);
	}

	for(i=0;i<10;i++) {

		slotToLoad = document.getElementById('i'+i)
		if(slotToLoad.setAttribute('name', localStorage.getItem('slotName'+i)) == 'plate')
		slotToLoad.setAttribute('name', localStorage.getItem('slotName'+i));
		slotToLoad.setAttribute('value', localStorage.getItem('slotValue'+i));
		slotToLoad.style.backgroundImage = "url('./css/image/"+slotToLoad.getAttribute('name')+".png')";
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

/*Function that check if the pet ate 3 times today.*/
function checkFeed(){

	if (feedCounter == 3)
		checkFeedToday = 0;
	else checkFeedToday = 1;
}


/*Function that check if the pet trained 3 times today.*/
function checkTraining(){

	if (trainingCounter == 3)
		checkTrainingToday = 0;
	else checkTrainingToday = 1;
}


/* function for getting the current day to know when changed.*/
function getCurrentDay(){
	
	if (currentDay != days[day]){

			useFunctionCheck = 1;
			
			feedCounter = 0;
			trainingCounter = 0;
			checkFeedToday = 1;
			checkTrainingToday= 1; 
	}
	else { 
		useFunctionCheck = 0;

	}
	
	if (useFunctionCheck == 1){

		currentDay = days[day];
		useFunctionCheck = 0 ;
	}
}

/*Time-function that get the time when the application is closed.*/
function closeTime(){
    timeClose = Date.now();
}

/*Time-function that get the time when the application is opened.*/
function openTime(){
	timeStart = Date.now();
}

/*Time-function that return the minutes delay between open/closed time.*/
function openApplicationDelay(){

	delay = timeStart - timeClose;
	delay = Math.round(delay/1000);
}


function printTime(){
	log = document.getElementById('log');
	log.value= log.value + 'Close Time : ' + timeClose + '\n\n'; 
	log.value= log.value + 'Start Time : ' + timeStart + '\n\n'; 
	log.value= log.value + 'Minutes after the application is closed : '+ Math.round(delay/60) + '\n\n'; 
}

/*
	interval_0 = setInterval(controlDesease, 1000);
	interval_1 = setInterval(critState, 10*45*s);
	interval_2 = setInterval(mediumState, 10*90*s);
	interval_3 = setInterval(modarateState, 10*180*s);
	*/

function decreaseStatInGame(){	
	s=60;
	interval_0 = setInterval(controlDesease,  6000);
	interval_1 = setInterval(critState,  6000);
	interval_2 = setInterval(mediumState,  6000);
	interval_3 = setInterval(modarateState,  6000);
	
	function controlDesease(){
	if (desease == 0)
		s = 45;
	else { s = 60; }
	}


	function critState(){
		if (pet.weight> 100){
				pet.hungry--;
				pet.happiness --;
				pet.health -- ;
			}

			if (pet.hungry< 10){
				pet.health -- ;
				pet.happiness -- ;
			}

			if (pet.happiness<10){
				pet.health -- ;
			}
	}	

	function mediumState(){	

			if (pet.weight>=75 && pet.weight<100){
				pet.hungry--;
				pet.happiness --;
				pet.health -- ;
			}

			if (pet.hungry<= 10 && pet.hungry<25){
				pet.health -- ;
				pet.happiness -- ;	
			}

			if (pet.happiness<=10 && pet.happiness<25){
				pet.health -- ;
			}
			print();
	}

	function modarateState(){
			if (pet.weight>=50 && pet.weight<75){
				pet.happiness --;
			}

			if (pet.hungry<= 25 && pet.hungry<50){
				pet.health --;
			}

			if (pet.happiness<=25 && pet.happiness<50){
				pet.health -- ;
			}

			if (pet.happiness>75){
				pet.health ++ ;
			}
	}

	}
}

/*Time-function that decrease stat at the opening of the application based on the minutes passed by the closure*/
function decreaseStatOutGame(){
	s = 60;
	if (desease == 0)
	s = 45;

	for (i=1; i<=delay/60; i++){

		if (i%(20*s/60) == 0){
			pet.hungry -- ;		
		}

		if (i%(45*s/60) == 0){

			if (pet.weight> 100){
				pet.hungry--;
				pet.happiness --;
				pet.health -- ;
			}

			if (pet.hungry< 10){
				pet.health -- ;
				pet.happiness -- ;
			}

			if (pet.happiness<10){
				pet.health -- ;
			}

		}


		if (i%(90*s/60) == 0){

			if (pet.weight>=75 && pet.weight<100){
				pet.hungry--;
				pet.happiness --;
				pet.health -- ;
			}

			if (pet.hungry<= 10 && pet.hungry<25){
				pet.health -- ;
				pet.happiness -- ;	
			}

			if (pet.happiness<=10 && pet.happiness<25){
				pet.health -- ;
			}

		}

		if (i%(180*s/60) == 0){

			if (pet.weight>=50 && pet.weight<75){
				pet.happiness --;
			}

			if (pet.hungry<= 25 && pet.hungry<50){
				pet.health --;

			}

			if (pet.happiness<=25 && pet.happiness<50){
				pet.health -- ;
			}

			if (pet.happiness>75){
				pet.health ++ ;
			}

		}	print();
	}
}

function checkDeseaseInGame(){
	s = 60;
	setTimeout(startCycle, 1000);
	function startCycle(){
		if(pet.health<10)
			interval_4 = setInterval(checkDesease, 10*30);

		if(pet.health >=10 && pet.health<25)
			interval_4 = setInterval(checkDesease, 1000*45*s);

		if(pet.health >=25 && pet.health<50)
			interval_4 = setInterval(checkDesease, 1000*60*s);
	}

	function checkDesease(){
		desease = Math.floor((Math.random() * 10) );

		if(desease == 0){
			clearInterval(interval_4);	
		}

	}
}

function checkDeseaseOutGame(){
	s = 60;
	log = document.getElementById('log');

    for (i=1; i<delay; i++){

    	if (desease != 0){

			if (i%(30*s) == 0){

				if(pet.health<10){
					desease = Math.floor((Math.random() * 10) );

				}	
			}

			if (i%(45*s) == 0){

				if(pet.health >=10 && pet.health<25)
					desease = Math.floor((Math.random() * 10) );
			}

			if (i%(60*s) == 0){

				if(pet.health >=25 && pet.health<50)
					desease = Math.floor((Math.random() * 10) );
			}
		}
	}
	if (desease == 0)
		log.value = log.value + 'Oh no! Pet get sick.\n\n' ;
}

function heal(){
	point = pet.health;
	cost = 250+50-point;
	if (desease == 0 && pet.money >= cost){
		desease = 1;
		pet.health = 50;
		pet.money = pet.money - cost;
		log.value = log.value + 'Pet is healed.\nYou payed' + cost + '$. \n\n';
		checkDeseaseInGame();
		print();
	}
	else if (desease == 1) { log.value = log.value + "Pet don't need to get healed.\n\n" ; }
	else if (pet.money < cost) { log.value = log.value + "You can't afford this heal.\n\n" ; }
}
 