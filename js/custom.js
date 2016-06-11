var forecast = $('#week-forecast');
var params = $('#weather-params');
var temp = $('#temperature');
$(document).ready(function() {
    getWeather(setWeather);
    var i = 1000;
    forecast.children('li').each(function() {
        $(this).delay(i).queue(function() {
            $(this).addClass('active');
            $(this).dequeue();
        });
        i += 250;
    });

    var ii = 600;
    params.children('li').each(function() {
        $(this).delay(ii).queue(function() {
            $(this).addClass('active');
            $(this).dequeue();
        });
        ii += 200;
    });

    $(temp).delay(400).queue(function() {
        $(this).addClass('active');
        $(this).dequeue();
    });
});


function getWeather(callback) {
  $.simpleWeather({
    //location: 'Podolsk, Russia',
    woeid: '2122929',
    unit: 'f',
    success: function(weather) {
      //console.log('функция');
      //console.log(weather);
      callback(weather);
    },
    error: function(error) {
      console.log('weather data error');
      setTimeout(getWeather, 10000);
    }
  });
};

var weather_desc = {
    "tornado": "Торнадо",
    "tropical storm": "Тропическая буря",
    "hurricane": "Ураган",
    "severe thunderstorms": "Сильная гроза",
    "thunderstorms": "Гроза",
    "mixed rain and snow": "Дождь и снег",
    "mixed rain and sleet": "Дождь и мокрый снег",
    "mixed snow and sleet": "Снег и мокрый снег",
    "freezing drizzle": "Изморозь",
    "drizzle": "Изморось",
    "freezing rain": "Ледяной дождь",
    "showers": "Дождь",
    "showers": "Дождь",
    "snow flurries": "Ветер со снегом",
    "light snow showers": "Лёгкий снегопад",
    "blowing snow": "Метель",
    "snow": "Снег",
    "hail": "Град",
    "sleet": "Дождь со снегом",
    "dust": "Пыль",
    "foggy": "Туманность",
    "haze": "Мгла",
    "smoky": "Дымка",
    "blustery": "бушующий",
    "windy": "Ветренно",
    "cold": "Холодно",
    "cloudy": "Облачно",
    "mostly cloudy (night)": "в основном облачно (ночь)",
    "mostly cloudy (day)": "в основном облачно (день)",
    "partly cloudy (night)": "переменная облачность (ночь)",
    "partly cloudy (day)": "переменная облачность (день)",
    "clear (night)": "ясная ночь)",
    "sunny": "Солнечно",
    "fair (night)": "ярмарка (ночь)",
    "fair (day)": "ярмарка (день)",
    "mixed rain and hail": "смешанный дождь и град",
    "hot": "горячий",
    "isolated thunderstorms": "изолированные гроз",
    "scattered thunderstorms": "рассеянные грозы",
    "scattered thunderstorms": "рассеянные грозы",
    "scattered showers": "Моросящий дождь",
    "heavy snow": "снегопад",
    "scattered snow showers": "разбросанные снег",
    "heavy snow": "снегопад",
    "partly cloudy": "Переменная облачность",
    "thundershowers": "грозой",
    "snow showers": "Снегопады",
    "isolated thundershowers": "изолированные грозой",
    "not available": "недоступен"
} 

function setWeather(data) {
    moment.locale('ru');
    console.log(data);
    temp = data.temp;
    currently = data.currently;
    today_desc = weather_desc[currently.toLowerCase()];

    $("#temperature").text(parseInt((temp-32)*5/9));

    $(".weather-desc").html('<span>'+today_desc+'</span>'); 

    $(".thermometer").next().text(parseInt(data.pressure*0.750062) + 'мм');

    $("#humidity").text(data.humidity+' % влажности');

    $("#wind").text(data.wind.speed + ' м/c');

    // $("#icon").addClass('wi wi-yahoo-'+data.code);
    $("#icon-image").attr('src', data.image);

    $(".week-day").each(function(index) {
        var date = data.forecast[index].date;
        html = moment(date).format('D MMM') + '</br>';
        html += moment(date).format('ddd');
        $(this).html(html);
    });

    $('.week-forecast').find('i').each(function(index) {
        var forecast_code = data.forecast[index].code;
        $(this).addClass('wi wi-yahoo-'+forecast_code);
    });


    $(".week-day-temperature").each(function(index){
        var day_temp = data.forecast[index].high;
        $(this).text((parseInt((day_temp-32)*5/9)));
    })
};