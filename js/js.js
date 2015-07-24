
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
var nClick = 10;
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
shop[0] = new food("bread",     "5", "5", "0", "30");
shop[1] = new food("fruits",    "6", "1", "-5", "35");
shop[2] = new food("salad",     "7", "1", "-6", "40");
shop[3] = new food("chocolate", "6", "8", "10", "45");
shop[4] = new food("chips",     "10", "11", "8", "55");
shop[5] = new food("spaghetti", "25", "20", "0", "85");
shop[6] = new food("fish",      "23", "10", "-8", "90");
shop[7] = new food("sushi",     "21", "6", "-9", "90");
shop[8] = new food("chicken",   "26", "23", "5", "125");
shop[9] = new food("hamburger", "30", "28", "12", "135");

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

function onLoadFunction(){
	load();
	openTime();
	openApplicationDelay();
	welcome("date");
	printTime();
	decreaseStatInGame(); 
	decreaseStatOutGame();
	checkDeseaseInGame();
	checkDeseaseOutGame();
	getCurrentDay();
	print();
}

function onUnloadFunction(){
	closeTime();
	save();
}


function clearPetStat(){

	pet.name = "Pet"
	pet.health = 100;
	pet.hungry = 50;
	pet.weight = 5;
	pet.toilet = 0;
	pet.strenght = 1;
	pet.agility = 1;
	pet.exp = 0;
	pet.money = 1500;
	pet.level = 1;
	pet.happiness = 50;
	print();

	feedCounter = 0;
	trainingCounter = 0;
	checkFeedToday = 1;	 
	checkTrainingToday= 1; 
	currentday= "";
}

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


/* Function for saving all the data about the pet for the next use of the application */
function save() {
	/*pet stats*/
	localStorage.setItem('name', pet.name);
	localStorage.setItem('health', pet.health);
	localStorage.setItem('hungry', pet.hungry);
	localStorage.setItem('weight', pet.weight);
	localStorage.setItem('toilet', pet.toilet);
	localStorage.setItem('strenght', pet.strenght);
	localStorage.setItem('happiness', pet.happiness);
	localStorage.setItem('agility', pet.agility);
	localStorage.setItem('exp', pet.exp);
	localStorage.setItem('money', pet.money);
	localStorage.setItem('level', pet.level);

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
}


/* Function for loading all the data when the game starting */
function load (){

	/*pet stats*/
	pet.name = localStorage.getItem('name');
	pet.health = parseInt(localStorage.getItem('health'));
	pet.hungry = parseInt(localStorage.getItem('hungry'));
	pet.weight = parseInt(localStorage.getItem('weight'));
	pet.toilet = localStorage.getItem('toilet');
	pet.strenght = parseInt(localStorage.getItem('strenght'));
	pet.agility = parseInt(localStorage.getItem('agility'));
	pet.exp = parseInt(localStorage.getItem('exp'));
	pet.money = parseInt(localStorage.getItem('money'));
	pet.level =  parseInt(localStorage.getItem('level'));

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

	if(parseInt(pet.money) < parseInt(shop[IndexFood].price))
		log.value = log.value + 'No money left! \n\n' + 'money' + pet.money + '\n prezzo item : ' + shop[IndexFood].price;

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

	checkFeed();
	if(pet.hungry < 100 && select2 != "" && checkFeedToday == 1) {

		log = document.getElementById('log');
		toFeed = document.getElementById(select2);
		IndexDelete = toFeed.getAttribute('value');

		// Calcolo aggiutivo della FAME
		pet.hungry = parseInt(pet.hungry) + parseInt(item[IndexDelete].lessHungry);
		feedCounter++;


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
		select2 = "";

		// Eliminazione dell'oggetto parte grafica 
		toFeed.style.backgroundImage = 'url(./css/image/plate.png)';
		toFeed.setAttribute('name', 'plate');
		toFeed.setAttribute('value', -1);
		toFeed.style.animation = 'none';
		pet.inventory = pet.inventory - 1;
	} else if(pet.hungry >= 100) { log.value = log.value + "I'm not hungry...\n"; }
	  else if(select2 == "") { log.value = log.value + "No food selected! Please select one\n"; }
	  else if(checkFeedToday == 0 && select2 != "") { log.value = log.value + "I ate too much today. Try tomorrow. \n"; }
	  print();
}


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

/* Function for the Welcome at the start of the game*/
function welcome(data) {

    log = document.getElementById('log');
    log.value = log.value + 'WELCOME!\n\n'
    window.onload = date_time('date');
}


/* Hide and show function */
function HideShow(quale) {  
  if(document.getElementById(quale).style.display == 'block')
    document.getElementById(quale).style.display = 'none';
  else
    document.getElementById(quale).style.display = 'block';
}


/* Data&Time generator function */
function date_time(id){
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
        setTimeout('date_time("'+id+'");','60000');
}


/* Time checker for background change */
function checkTime(hour){

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


    if(hour > 5 && hour < 16) {

        gameWindow.style.backgroundImage = 'url("./css/bg//background1.gif")';
        gameWindow.style.border = '5px solid #9adacc';
        body.style.backgroundImage = 'url(./css/bg//background.1.jpg")"';
        statistics.style.border = '2px solid #9adacc';
        statistics.style.background = 'white';
        stats.style.color = '#17C654';
        date.style.color = '#17C654';
        date.style.border = '2px solid #9adacc';
        date.style.background = 'white';
        money.style.border = '2px solid #9adacc';
        money.style.background = 'white';
        log.style.border = '2px solid #9adacc';
        log.style.background = '#9adacc';
        log.style.color = '#379336';
        log2.style.color = '#17C654';
        quest.style.border = '2px solid #9adacc';
        quest.style.backgroundColor = 'white';
        for(i=0;i<9;i++)
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
        for(i=0;i<9;i++)
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
        for(i=0;i<9;i++)
            stat[i].style.color = 'white';
    }
}


/*Function for focus the window that the user clicked */
function setFocus(id1,id2){

    div1 = document.getElementById(id1);
    div2 = document.getElementById(id2);

    div1.style.zIndex = 2;
    div2.style.zIndex = 1;
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

/*Gym-function that start a counter until the training is finished.*/
function TimeCount() {

		if(start == 1 && score < nClick) {

			sec=sec+1;
			t=setTimeout("TimeCount()",1000);
			document.getElementById('time').innerHTML = 'Second: ' + sec;
		}
}

/*Gym-function to restart the variables and let training again.*/
function reset() {

	start = 0;
	sec=0;
	score=0;

	document.getElementById('time').innerHTML = 'Second: ' + sec;
	document.getElementById('score').innerHTML = 'Score: -';
	document.getElementById('gymButton').style.display = 'block';
	document.getElementById('clickButton').style.display = 'none';
}

/*Gym-function that check if you can do another training today. */
function Start() {
	checkTraining();
	if(checkTrainingToday == 1 || desease != 0){

		start = 1;
		sec=0;
		score=0;
		document.getElementById('gymButton').style.display = 'none';
		document.getElementById('clickButton').style.display = 'block';
	}
	else if (checkTrainingToday == 0) {log.value = log.value + 'You trained too much today. Try tomorrow. \n\n'; }
	else if (desease == 0) {log.value = log.value + "You are sick. you can't work out. \n\n"; }	
}

/*Gym-function that increase the counter on click and upgrade the stat.*/
function RapidClick() {

	if(start == 1 && score < nClick)
	{
		score++;
		document.getElementById('score').innerHTML = 'Score: ' + score;

		if (score == nClick){

			if(sec < 7){

				log.value = log.value + 'Are you cheating?!? Training failed. \n\n';
				trainingCounter++;
				start=0;
			}

			if(sec == 7 || sec ==8){

				log.value = log.value + 'Perfect!!! Agility +3. \n\n';
				pet.agility = parseInt(pet.agility) + 3;
				trainingCounter++;
				start=0;
			}

			if(sec == 9 || sec ==10){

				log.value = log.value + 'Well done! Agility +2. \n\n';
				pet.agility = parseInt(pet.agility) + 2;
				trainingCounter++;
				start=0;
			}

			if(sec == 11 || sec ==12){

				log.value = log.value + 'Good. Agility +1. \n\n';
				pet.agility = parseInt(pet.agility) + 1;
				trainingCounter++;
				start=0;
			}

			if(sec > 12){

				log.value = log.value + 'Training Failed. Do it quickly next time. \n\n';
				trainingCounter++;
				start=0;
			}
		}
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

function decreaseStatInGame(){	
	interval_0 = setInterval(controlDesease, 1000);
	interval_1 = setInterval(critState, 1000*45*s);
	interval_2 = setInterval(mediumState, 1000*90*s);
	interval_3 = setInterval(modarateState, 1000*180*s);
	
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

/*Time-function that decrease stat at the opening of the application based on the minutes passed by the closure*/
function decreaseStatOutGame(){
	s = 60;
	if (desease == 0)
	s = 45;

	for (i=1; i<=delay; i++){

		if (i%(20*s) == 0){
			pet.hungry -- ;		
		}

		if (i%(45*s) == 0){

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


		if (i%(90*s) == 0){

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

		if (i%(180*s) == 0){

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
					log.value = log.value + 'Desease Value ' + desease + '\n\n' ;
				}	
			}

			if (i%(45*s) == 0){

				if(pet.health >=10 && pet.health<25)
					desease = Math.floor((Math.random() * 10) );
					log.value = log.value + 'Desease Value ' + desease + '\n\n' ;
			}

			if (i%(60*s) == 0){

				if(pet.health >=25 && pet.health<50)
					desease = Math.floor((Math.random() * 10) );
					log.value = log.value + 'Desease Value ' + desease + '\n\n' ;
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


