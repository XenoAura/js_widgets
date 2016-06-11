var rate_url = 'https://query.yahooapis.com/v1/public/yql?q=select+*+from+yahoo.finance.xchange+where+pair+=+%22USDRUB,EURRUB,AZNRUB%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=';
var oil_rate_url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quote%20where%20symbol%20in%20(%22BZN16.NYM%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback='

var old_usd_rate = null;
var old_eur_rate = null;
var weekend = false;
//INTERVAL //TODO запилить норм интервал и увеличивать его в выхи например
var myDate = new Date(); //сейчас

if(myDate.getDay() == 6 || myDate.getDay() == 0) weekend = true; //выходной или нет

function get_rate(){
    $.getJSON(rate_url, function( data ){
        values = data.query.results.rate;  
        var usd_rate = parseFloat(values[0].Rate);  //получаем значение валют
        var eur_rate = parseFloat(values[1].Rate);
        var oil_rate = 
        //usd_div_element.innerHTML = usd_rate;				//назначаем валюты в div
        $("#usd_element").text(usd_rate.toFixed(2));
        $("#eur_element").text(eur_rate.toFixed(2));

    	setTimeout(4000);
    	//TODO переписать по изменению контента
        if(old_usd_rate == null && weekend == false)  //если нет старого курса и не выходной
			{
			    old_usd_rate = usd_rate;	//оставляем предыдущее значение валют
			    old_eur_rate = eur_rate;
		} else if(weekend){     	//если выходной
			console.log('сегодня выходной, биржа не работает');
			//TODO увеличить интервал выполнения скрипта var INTERVAL
		} else {
				if(old_usd_rate <= usd_rate){
					//TODO переписать как у eur
					$("#usd_arrow").removeClass("fa-angle-down red-arrow").addClass("fa-angle-up green-arrow"); //классовая магия(нет)
				 } else {
				 	$("#usd_arrow").removeClass("fa-angle-up green-arrow").addClass("fa-angle-down red-arrow");
				 };	
				if(old_eur_rate < eur_rate){
					//$("#eur_arrow").addClass("fa-angle-up green-arrow").removeClass("fa-angle-down red-arrow");
					$("#eur_arrow").switchClass( "fa-angle-up green-arrow", "fa-angle-down red-arrow").animate({
					    left: [ "+=50", "swing" ],
					    opacity: [ 0.55, "linear" ]
					}, 1500 );
				 } else {
				 	//$("#eur_arrow").addClass("fa-angle-down red-arrow").removeClass("fa-angle-up green-arrow");
					$("#eur_arrow").switchClass( "fa-angle-down red-arrow", "fa-angle-up green-arrow").animate({
					    //left: [ "+=50", "swing" ],
					    opacity: [ 0.55, "linear" ]
					}, 1500 );

				 };
				 old_usd_rate = usd_rate;	//ОБНОВЛЯЕМ старое значение валют
			     old_eur_rate = eur_rate;
			};
        });
    };
//get_rate();
$(document).ready(function(){
	get_rate();
    setInterval(get_rate, 3000);  //TODO вместо цифр INTERVAL

    $( ".usd_element" ).change(function() {
  		alert( "Handler for .change() called." );
});

});
