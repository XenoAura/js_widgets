$(document).ready(function() {  
  getWeather(); //Get the initial weather.
  setInterval(getWeather, 600000); //Update the weather every 10 minutes.
});

function getWeather() {
  $.simpleWeather({
    //location: 'Podolsk, Russia',
    woeid: '2122929',
    unit: 'c',
    success: function(weather) {
      //onsole.log(weather);
      html = '<i class="wi wi-yahoo-'+weather.code+'"></i> '+weather.temp;
      html += '<i class="wi wi-celsius"></i>'
      //html += '<li class="currently">'+weather.currently+'</li>';
      //html += '<i class="wi wind">'+weather.wind.direction+' '+weather.wind.speed+' '+weather.units.speed+'</li></ul>';
      weather_data = weather;
      $("#weather").html(html);
      return weather;
    },
    error: function(error) {
      console.log('weather data error');
      setTimeout(getWeather, 10000);
    }
  });
};
