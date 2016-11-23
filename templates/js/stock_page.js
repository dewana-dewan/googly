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
	  		// alert( "Load was performed." );
			}
	});

	urlll = 'https://quote.cnbc.com/quote-html-webservice/quote.htm?output=jsonp&symbols=' + stock_name +'.NS'
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
	g_charts();
};

function display_stock(dat1, dat2){
	chart_url(20);
	// document.write('<img src=' + urll + '>');
	console.log(document.getElementById('imgaa').src);
	document.getElementById('st_exchange').innerText = dat2['exchange'];
	document.getElementById('f_name').innerText = dat2['onAirName'];
	document.getElementById('curr_price').innerText = dat2['last'];
	document.getElementById('stk_valu1').value = dat2['last'];
	document.getElementById('stk_valu2').value = dat2['last'];
	document.getElementById('high').innerText = dat2['high'];
	document.getElementById('low').innerText = dat2['low'];
	document.getElementById('changa').innerText = dat2['change'];

	
}

function display_profit(){
	try{
		pr_qty = parseInt(document.getElementById('pr_qty'));
		pr_cst = parseInt(document.getElementById('pr_cst'));
		tot_cst = pr_cst*pr_qty;
		new_cst = pr_qty*dat2['last'];
		profit = new_cst - tot_cst;
		document.getElementById('profit').innerText = toString(profit);
	}
	catch(err){

	}
}


function chart_url(val){
	val = String(val);
	urll = 'http://charts.reuters.com/reuters/enhancements/chartapi/chart_api.asp?width=858&height=392&showLastClose=0&headerType=quote&symbol=' + stock_name + '.NS&duration=' + val + '&lowers=volume&headertype=name';
	img = new Image();
	document.getElementById('imgaa').src = urll;
	img.onload = function(){
		document.getElementById('imgaa').style.opacity = 1;
	};
	img.src = urll;
	console.log('hi');
}

function g_charts(){
	arr = document.getElementsByClassName('chart_getter');
	for (var i = arr.length - 1; i >= 0; i--) {
		v = arr[i].value;
		arr[i].addEventListener("click",function(){
			v = this.value;
			document.getElementById('imgaa').style.opacity = 0;
			chart_url(v);
		});
	}
}