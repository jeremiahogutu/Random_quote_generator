$(document).ready(function(){

	/*Global variable*/
	var quote; 
	var author; 
	  var colors = ['red', 'blue', 'green', 'grey', 'pink', 'purple', 'yellow','orange'],
    color;

	function getNewQuote() {
		/*json request*/
		$.ajax({
			url: 'https://api.forismatic.com/api/1.0/',
			jsonp: 'jsonp',
			dataType: 'jsonp',
			data: {
				method: 'getQuote',
				lang: 'en',
				format: 'jsonp'
			},
			success: function(response) {
				quote = response.quoteText;
				author = response.quoteAuthor;
				$('#quote').text(quote);
				if (author) {
					$('#author').text('by -'+ author);
				} else {
					$('#author').text('- unknown');
				}
			}
		});
	}
	getNewQuote();

	$('.get-quote').on('click', function(event){
		event.preventDefault();/*prevents page from jummping up everytime you reload*/
		var randColor;
	    do {
	      randColor = colors[Math.floor(Math.random() * colors.length)];
	    } while (color == randColor);
	    $('body').css('background-color', randColor);
	    color = randColor;
		getNewQuote();
	});

	$('.share-quote').on('click', function(event){
		event.preventDefault();
		window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(quote + ' -- author') )
	})
})