var score = 0;
var start = 0;
var c=0;
var nClick = 100;


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

		/*Time for Hungry
		timeClose = localStorage.getItem('closeTime');
		timeOpen = Math.floor(Date.now() / 1000);
		TimePassed = timeOpen - timeClose;
		TimePassed = parseInt(TimePassed / 60);
		hungryToMinum = parseInt(TimePassed / 20);
		pet.hungry = pet.hungry - hungryToMinum;
		pet.hungry++; */
		log.value = localStorage.getItem('log');

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

	for(i=0,i<10;i++) {

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
