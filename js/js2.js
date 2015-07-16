
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
function date_time(id)
{
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

function setFocus(id1,id2) {

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