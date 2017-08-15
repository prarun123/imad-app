var button = document.getElementById('counter1');
var count = document.getElementById('count');
button.onclick = function () {
	var request = new XMLHttpRequest();

	request.onreadystatechange = function (){
		if (request.readyState === XMLHttpRequest.DONE ){
			if (request.status === 200) {
				var counter = request.responseText;
				count.innerHTML = counter.toString();
			}
		}
	};

	//request.open('GET','http://localhost/counter',true);
	request.open('GET','http://prarun123.imad.hasura-app.io/counter',true);
	request.send(null);
}


var sub = document.getElementById('sub');
var ul = document.getElementById('ul');
sub.onclick = function () {
	var request = new XMLHttpRequest();
	ul.innerHTML = '';
	request.onreadystatechange = function (){
		if (request.readyState === XMLHttpRequest.DONE ){
			if (request.status === 200) {
				var names = request.responseText;
				names = JSON.parse(names);
				for (var i=0; i<names.length; i++)
				ul.innerHTML += "<li>" + names[i] + "</li>";
			}
		}
	};
	var source1 = document.getElementById('source');
	var source = source1.value;
	// request.open('GET','http://localhost/get_name/'+ source,true);
	//request.open('GET','http://localhost/get_name/?name='+ source,true);
	request.open('GET','http://prarun123.imad.hasura-app.io/get_name/?name='+ source,true);
	request.send(null);
}




// console.log('Loaded!');

// alert ("javascript alert box");

// var element = document.getElementById('main-text');

// element.innerHTML = "New Text";

// var image = document.getElementById('madi');

// var marginL = 0;

// function move(){
// 	marginL = marginL + 10;
// 	image.style.marginLeft = marginL + 'px';
// }

// image.onclick = function () {
// 	// marginL = marginL + 10;
// 	// image.style.marginLeft = marginL + 'px';
// 	// console.log(image.style.marginLeft);
// 		var interval = setInterval(move, 50);
// }

