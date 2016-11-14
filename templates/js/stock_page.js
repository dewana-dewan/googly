document.onLoad =	start();

	
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
			console.log(result)
			// document.write('<img src=' + result + '>');
			// document.getElementById('imgaa').src = result;
		}
	});
	urll = 'http://charts.reuters.com/reuters/enhancements/chartapi/chart_api.asp?width=858&height=392&showLastClose=1&headerType=quote&symbol=' + stock_name + '&duration=20&lowers=volume&headertype=none'
	document.write('<img src=' + urll + '>');
};

function display_stock(st_data){
	elem = document.createElement('div');
	elem.className = 'stock_f_data';
	c1 = document.createElement('h2');
	c1.className = 'st_head'	
	c1.innerHTML = st_data[0]['t']
	c1 = document.createElement('h2');
	c1.className = 'st_head'	
	c1 = document.createElement('h2');
	c1.className = 'st_head'	


}