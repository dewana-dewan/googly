document.onLoad =	start();

var dat1;
var dat2;

function start(argument) {
	var stock_name = 'ONGC.NS|ACC.NS|TCS.NS|TATASTEEL|TECHM'
	urlll = 'https://quote.cnbc.com/quote-html-webservice/quote.htm?output=jsonp&symbols=' + stock_name 
	$.ajax({
		url:urlll,
		crossDomain:true,
	    dataType:'jsonp',
		headers:{'Access-Control-Allow-Origin':'*'}, 
		success: function(result) {
			console.log(result);
			dat2 = result['QuickQuoteResult']['QuickQuote']
			console.log(dat2);
			add_full_packet();	
		}
	});

}

function add_full_packet(){
	tmp1 = document.createElement('div');
	console.log(dat2.length)
	to_add = document.getElementById('hot-stocks')
	for (var i = dat2.length - 1; i >= 0; i--) {
		to_add.appendChild(create_packet(dat2[i]));
		console.log(tmp1)
	}	
}

function create_packet(obja){
	tmp1 = document.createElement('div');
	tmp2 = document.createElement('div');
	tmp3 = document.createElement('div');
	tmp2.innerHTML = obja['onAirName'];
	tmp3.innerHTML = obja['shortName'] +" "+ obja['change_pct'];
	tmp1.appendChild(tmp2);
	tmp1.appendChild(tmp3);
	return tmp1;
}