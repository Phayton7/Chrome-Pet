function HideShow(quale) {  
  if(document.getElementById(quale).style.display == 'block')
    document.getElementById(quale).style.display = 'none';
  else
    document.getElementById(quale).style.display = 'block';
}


function date_time(id)
{
        date = new Date;
        year = date.getFullYear();
        month = date.getMonth();
        months = new Array('Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre');
        d = date.getDate();
        day = date.getDay();
        days = new Array('Domenica', 'Lunedi', 'Martedi', 'Mercoledi', 'Giovedi', 'Venerdi', 'Sabato');
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
        result = ''+days[day]+' '+d+' '+months[month]+' '+year+' '+h+':'+m+':'+s;
        document.getElementById(id).innerHTML = result;
        setTimeout('date_time("'+id+'");','1000');
        return true;
}

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