var score = 0;
var start = 0;
var c=0;
var t;
var nClick = 100;



function TimeCount() {

		if(start == 1 && score < nClick) {

			c=c+1;
			t=setTimeout("TimeCount()",1000);
			document.getElementById('time').innerHTML = 'Second: ' + c;
		}
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
	document.getElementById('gymButton').style.display = 'none';
	document.getElementById('clickButton').style.display = 'block';
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

