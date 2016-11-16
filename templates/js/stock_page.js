document.onLoad =	start();

var dat1;
var dat2;
	
function start(argument) {
	stock_name = document.getElementById('stock_name').innerHTML;
	urll = 'https://finance.google.com/finance/info?client=ig&q=NSE:' + stock_name
	change = '//'
	$.ajax({ 
		url:urll, 
		crossDomain:true,
	    dataType:'jsonp',
		headers:{'Access-Control-Allow-Origin':'*'},
		success:function( data ) {
			// data = data.replace(change,'');
			dat1 = data[0];
			console.log(data[0]);
			// var json = JSON.parse(data);
			// console.log(json);
	  		// document.body.innerHTML = json;
	  		alert( "Load was performed." );
			}
	});

	urlll = 'https://quote.cnbc.com/quote-html-webservice/quote.htm?output=jsonp&symbols=' + stock_name
	$.ajax({
		url:urlll,
		crossDomain:true,
	    dataType:'jsonp',
		headers:{'Access-Control-Allow-Origin':'*'}, 
		success: function(result) {
			dat2 = result['QuickQuoteResult']['QuickQuote']
			console.log(dat2);
			display_stock(dat1, dat2)
			// document.write('<img src=' + result + '>');
			// document.getElementById('imgaa').src = result;
		}
	});
};

function display_stock(dat1, dat2){
	urll = chart_url(20);
	// document.write('<img src=' + urll + '>');
	document.getElementById('imgaa').src = urll;
	console.log(document.getElementById('imgaa').src);
	document.getElementById('st_exchange').innerText = dat2['exchange'];
}

function chart_url(val){
	val = String(val);
	urll = 'http://charts.reuters.com/reuters/enhancements/chartapi/chart_api.asp?width=858&height=392&showLastClose=1&headerType=quote&symbol=' + stock_name + '.NS&duration=' + val + '&lowers=volume&headertype=name';
	return urll;
}