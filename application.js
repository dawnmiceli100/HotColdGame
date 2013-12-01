
$(document).ready(function() {

	//Generate a random number between 1 and 100
	var randomNumber = Math.floor(Math.random() * 101);

	var hotTop = 0;
	var hotBottom = 0;
	var warmTop = 0;
	var warmBottom = 0;
	setTempRanges();
	
	var guess = '';
	var guessArray = [];
	var guessResult = '';

	var guessString = '';
	//set focus to guess entry field
	$('#userGuess').focus();
	
	$('#submit').click(function() {
		guess = jQuery.trim($('#userGuess').val());
	
		validateGuess();
		hideMessages();
		$('#userGuess').focus();
	
		$('#guessList').html('Previous guesses: ' + guessString);
		$('#userGuess').val('');

		switch (guessResult) {
			case 'winner':
				$('#questionMark').html(randomNumber);
				$('#questionMark').css('color', 'red');
				$('#winnerMessage').removeClass('hidden');
				//disable guess field
				$('#userGuess').prop('disabled', true);
				break;
			case 'hot':
				$('#questionMark').css('color', 'red');
				$('#hotMessage').removeClass('hidden');
				break;
			case 'cold':
				$('#questionMark').css('color', 'blue');
				$('#coldMessage').removeClass('hidden');
				break;
			case 'warm':
				$('#questionMark').css('color', '#FF6666');
				$('#warmMessage').removeClass('hidden');
				break;
			default: // invalid
				$('#errorMessage').removeClass('hidden');	
		}
	});	

	$('#userGuess').keydown(function (e) {
		if (e.keyCode == 13) {
			$('#submit').click();	
		};	
	});	

	$('#newGame').click(function() {
		startNewGame();
	});		

	function setTempRanges () {
		// Hot Range (+ or - 5 from random number)
		if ((randomNumber + 5) > 100) {
			hotTop = 100;
		} else {
			hotTop = randomNumber + 5;
		};

		if ((randomNumber - 5) < 0) {
			hotBottom = 0;
		} else {
			hotBottom = randomNumber - 5;
		};

		// Warm Range (+ or - 5 of hot ranges)
		if ((hotTop + 5) > 100) {
			warmTop = 100;
		} else {
			warmTop = hotTop + 5;
		};

		if ((hotBottom - 5) < 0) {
			warmBottom = 0;
		} else {
			warmBottom = hotBottom - 5;
		};
	};

	function validateGuess () {
		if ((guess == '') || (isNaN(guess)) || (guess < 1) || (guess > 100)) {	
			return guessResult = 'invalid';	
		};
//		guessArray.push(guess);

		if (guessString == '') {
			guessString = guessString + guess;	
		} else {
			guessString = guessString + ', ' + guess;
		};
	
		guessResult = categorizeGuess();
		return guessResult;

	};

	function categorizeGuess() {
		if (guess == randomNumber) {
			return 'winner';
		};	

		if (guess <= hotTop && guess >= hotBottom) {
			return 'hot';
		};

		if(guess <= warmTop && guess >= warmBottom) {
			return 'warm';
		};
		//if (guess > warmTop || guess < warmBottom) {
		return 'cold';
	};

	function hideMessages () {
		$('#errorMessage').addClass('hidden');
		$('#winnerMessage').addClass('hidden');
		$('#hotMessage').addClass('hidden');
		$('#coldMessage').addClass('hidden');
		$('#warmMessage').addClass('hidden');
	};

	function startNewGame () {
		//Generate a random number between 1 and 100
		randomNumber = Math.floor(Math.random() * 101);
	
		setTempRanges();

		guess = '';
	//	guessArray = [];
		guessResult = '';
	
		guessString = '';
		hideMessages();
		$('#guessList').html('');
		$('#questionMark').html('?');
		$('#questionMark').css('color', 'black');
		//set focus to guess entry field
		$('#userGuess').prop('disabled', false);
		$('#userGuess').focus();
	};
		
});

	



