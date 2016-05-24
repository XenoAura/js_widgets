var get_weather = 'http://api.openweathermap.org/data/2.5/weather?q=Podolsk,ru&lang=ru&units=metric';

function get_weather(){

    $.getJSON(get_weather, function( data ){
        values = data;
        temp = values.main.temp;
        desc = data.weather[0].description;
        console.log(desc);
        $("#weather").text = parseFloat(temp).toFixed(1)+'&deg, '+desc;
        });
    }

$(document).ready(function(){
	get_weather()
});