var rate_url = 'https://query.yahooapis.com/v1/public/yql?q=select+*+from+yahoo.finance.xchange+where+pair+=+%22USDRUB,EURRUB,AZNRUB%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=';
var oil_rate_url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quote%20where%20symbol%20in%20(%22BZN16.NYM%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback='

var old_usd_rate = null;
var old_eur_rate = null;
var weekend = false;
//INTERVAL //TODO запилить норм интервал и увеличивать его в выхи например
var myDate = new Date(); //сейчас

if(myDate.getDay() == 6 || myDate.getDay() == 0) weekend = true; //выходной или нет

function getval(){
    $.getJSON(rate_url, function( data ){
        values = data.query.results.rate;  
        var usd_rate = parseFloat(values[0].Rate);  //получаем значение валют
        var eur_rate = parseFloat(values[1].Rate);
        var oil_rate = 
        //usd_div_element.innerHTML = usd_rate;				//назначаем валюты в div
        $("#usd_element").text(usd_rate.toFixed(2));
        $("#eur_element").text(eur_rate.toFixed(2));

    	setTimeout(4000);
        if(old_usd_rate == null && weekend == false)  //если нет старого курса и не выходной
			{
			    old_usd_rate = usd_rate;	//оставляем предыдущее значение валют
			    old_eur_rate = eur_rate;
		} else if(weekend){     	//если выходной
			console.log('сегодня выходной, биржа не работает');
			//TODO увеличить интервал выполнения скрипта var INTERVAL
		} else {
				if(old_usd_rate <= usd_rate){
					$("#usd_arrow").removeClass("fa-angle-down red-arrow").addClass("fa-angle-up green-arrow"); //классовая магия(нет)
				 } else {
				 	$("#usd_arrow").removeClass("fa-angle-up green-arrow").addClass("fa-angle-down red-arrow");
				 };	
				if(old_eur_rate < eur_rate){
					$("#eur_arrow").addClass("fa-angle-up green-arrow").removeClass("fa-angle-down red-arrow");
				 } else {
				 	$("#eur_arrow").addClass("fa-angle-down red-arrow").removeClass("fa-angle-up green-arrow");
				 };
				 old_usd_rate = usd_rate;	//ОБНОВЛЯЕМ старое значение валют
			     old_eur_rate = eur_rate;
			};
        });
    };
//getval();
$(document).ready(function(){
	getval();
    setInterval(getval, 3000);  //TODO вместо цифр INTERVAL
});
