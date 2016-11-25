document.onLoad =	start();

var dat1;
var dat2;

function start(argument) {
	var stock_name = 'ONGC.NS|ACC.NS|TCS.NS|TATASTEEL|TECHM|INFY|RELIANCE'
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
		
			$('.hot-stocks').slick({
          	infinite: true,
  		  	slidesToShow: 5,
  		  	slidesToScroll: 3,
  		  	autoplay: true,
  		  	arrows: false,
      		});
      		var table = document.getElementById("mytable");
			var tbod = table.getElementsByTagName("tbody");
			var trow = tbod[0].getElementsByTagName("tr");
			for (var i = trow.length - 1; i >= 0; i--) {
				var tdata = trow[i].getElementsByTagName("td");
				tdata[4].innerHTML = parseFloat(tdata[2].innerHTML) * parseInt(tdata[1].innerHTML);
				tdata[3].innerHTML = dat2[i]['last'];
			}	
		}
	});


}


function add_full_packet(){
	tmp1 = document.createElement('div');
	console.log(dat2.length)
	to_add = document.getElementsByClassName('hot-stocks')[0];
	for (var i = dat2.length - 1; i >= 0; i--) {
		to_add.appendChild(create_packet(dat2[i]));
		console.log(tmp1)
	}	
}

function create_packet(obja){
	tmp0 = document.createElement('a');
	tmp0.href = "stock_info?sname=" + obja['symbol']
	tmp0.className = "clink-link"
	tmp1 = document.createElement('div');
	tmp2 = document.createElement('div');
	tmp2.className = "company-name";
	tmp3 = document.createElement('span');
	tmp3.className = "curr-price";
	tmp4 = document.createElement('span');
	tmp4.className = "change";
	tmp2.innerHTML = obja['onAirName'];
	tmp3.innerHTML = "₹" + obja['last'];
	if(parseFloat(obja['change_pct']) < 0) {
		tmp1.className = "company-minus";
		tmp4.innerHTML = "▼" + obja['change_pct'];
	}
	else {
		tmp1.className = "company-plus";
		tmp4.innerHTML = "▲" + obja['change_pct'];
	}
	tmp1.appendChild(tmp0);
	tmp0.appendChild(tmp2);
	tmp0.appendChild(tmp3);
	tmp0.appendChild(tmp4);
	return tmp1;
}
$(document).ready(function(){
      
    });