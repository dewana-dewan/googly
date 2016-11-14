document.onLoad(){
	start();
}
	
function start(argument) {
	stock_name = document.getElementById('stock_name').innerHTML;
	urll = 'http://finance.google.com/finance/info?client=ig&q=NSE:' + stock_name
	$.get( urll, function( data ) {
		data = data.replace('//','');
		var json = JSON.parse(data);
		console.log(json);
	  	document.body.innerHTML = json;
	  	alert( "Load was performed." );
	});
};

function display_stock(st_data){

}