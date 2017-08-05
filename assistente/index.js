$(document).ready(function(){

	bem_vindo();

	$('.modal').modal();

	$('.btn').click(function() {
		gravar();
	});

});

function bem_vindo(){

	var fala = new SpeechSynthesisUtterance();
	fala.text = "kkk, iai men";
	fala.lang = "pt-BR";
	fala.rate = 1;
	speechSynthesis.speak(fala);

}

function initMap(){

		var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 20,
          mapTypeId: 'satellite'
        });
        var infoWindow = new google.maps.InfoWindow({map: map});

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Você');
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
      }

function gravar(){

	if(window.SpeechRecognition || window.webkitSpeechRecognition){

		var reconhecedor = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
		reconhecedor.lang = 'pt-BR';
		reconhecedor.interimResults = false;
		reconhecedor.maxAlternatives = 5;
		reconhecedor.start();

		reconhecedor.onresult = function(event) {
		    var fala = event.results[0][0].transcript;
		    var fala = fala.toLowerCase();
		    $('.collection').append('<li class="collection-item">'+fala+'</li>');

		    var comando = new acao(fala);

		};

	}
	else{
		$('.collection').append('<li class="collection-item">Reconhecedor não suportado</li>');
	}

}

function acao(comando){

	switch(comando){

		case 'abrir o facebook':
			facebook();
			break;

		case 'abrir youtube':
			youtube();
			break;

		case 'pesquisar no youtube':
			pyoutube();
			break;

		case 'color picker':
			colorp();
			break;

		case 'conversor rgb':
			rbg();
			break;

		case 'erro de programação':
			erro();	
			break;

		case 'meu ip':
			ip();
			break;	

		case 'minha localização':
			mlocaliza();
			break;

	}

}

function facebook(){
	window.open('https://www.facebook.com/');
}

function youtube(){
	window.open('https://www.youtube.com/');
}

function pyoutube(){
	var fala = new SpeechSynthesisUtterance();
	fala.text = "O que deseja procurar";
	fala.lang = "pt-BR";
	fala.rate = 1;
	speechSynthesis.speak(fala);

	procura = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
	procura.lang = 'pt-BR';
	procura.interimResults = false;
	procura.maxAlternatives = 1000;
	procura.start();

	procura.onresult = function(event) {
	    var pesquisa = event.results[0][0].transcript;
	    var pesquisa = pesquisa.toLowerCase();

	   	if(pesquisa == 'digitar'){
	    	pesquisa = prompt('Digite sua pesquisa', '');
	    }

	    window.open('https://www.youtube.com/results?search_query='+pesquisa+'&page=&utm_source=opensearch');
	};
}

function colorp(){
	window.open('http://www.flatuicolorpicker.com/');
}

function rgb(){
	window.open('https://www.webpagefx.com/web-design/hex-to-rgb/');
}

function erro(){
	var fala = new SpeechSynthesisUtterance();
	fala.text = "Qual o seu erro";
	fala.lang = "pt-BR";
	fala.rate = 1;
	speechSynthesis.speak(fala);

	procura = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
	procura.lang = 'pt-BR';
	procura.interimResults = false;
	procura.maxAlternatives = 1;
	procura.start();

	procura.onresult = function(event) {
	    var pesquisa = event.results[0][0].transcript;
	    var pesquisa = pesquisa.toLowerCase();

	    if(pesquisa == 'digitar'){
	    	pesquisa = prompt('Digite seu erro', '');
	    }

	    window.open('https://stackoverflow.com/search?q='+pesquisa);
	};
}

function ip(){
	$.get("http://ipinfo.io", function(dados){
		console.log(dados);
		$('.ipAdd').html('<b>IP: '+dados.ip+'</b>');
		$('.ipPais').text('País: '+dados.country);
		$('.ipRegiao').text('Estado: '+dados.region);
		$('.ipCidade').text('Cidade: '+dados.city);
		$('.ipProv').text('Provedor: '+dados.org);
	}, "jsonp");

	var modalA = $('<button id="moda" style="display:none" data-target="modal1" class="btn transparent modal-trigger"></button>').addClass('modal-trigger').attr('data-target', 'modal1');
	$('body').append(modalA);
	$('#moda').click();
}

function mlocaliza(){
	var modalB = $('<button id="modal" style="display:none" data-target="modal2" class="btn transparent modal-trigger"></button>').addClass('modal-trigger').attr('data-target', 'modal2');
	$('body').append(modalB);
	$('#modal').click();
}