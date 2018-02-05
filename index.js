Array.prototype.shuffle = function() {
    var input = this;
    for (var i = input.length-1; i >=0; i--) {
    	var randomIndex = Math.floor(Math.random()*(i+1)); 
   		var itemAtIndex = input[randomIndex]; 
        input[randomIndex] = input[i]; 
        input[i] = itemAtIndex;
    }
    return input;
}

var input = document.getElementById('input')
var start_game = document.getElementById('start_game')
var try_letter = document.getElementById('try_letter')
var hangman = document.getElementById('hangman')
var initial_hint = document.getElementById('initial_hint')
var lives_left = document.getElementById('lives_left')
var extra_Hint = document.getElementById('extra_Hint')
var another_hint = document.getElementById('another_hint')
var get_hint = document.getElementById('get_hint')
var the_word = document.getElementById('the_word')
var array_of_words = ['LOVE','HATE','DUMMY','GENIOUS','AMERICA','OBAMA']
var initial_hints = ['Makes babies', 'Starts wars','Used for test in crashing cars','Albert Einstien was one','A popular Country','A great president']
var extra_hint_array = ['Brings two people together', 'Something haters do all the time', 'If your not smart, your...','if your playing this, you probably live here','44th president']
var selector = [0,1,2,3,4,5]
var display_array = ['_']
var chosen_word_array = []
var found = []
var verified_letter
var sequence = -1
var lives = 6
var box_tracker = []
var hangman_counter = 0
var picture_array_hangman = ['url(images/hangman1.jpg)','url(images/hangman2.jpg)','url(images/hangman3.jpg)','url(images/hangman4.jpg)','url(images/hangman5.jpg)','url(images/hangman6.jpg)']

//initial randomize
selector.shuffle()

start_game.addEventListener('click', function(){//once he press the button, start
	starting_game(input.value)//the game
})

try_letter.addEventListener('click', function(){//once he press the button, start
	playing_game(input.value)//the game
})

get_hint.addEventListener('click', function () {
	another_hint.innerHTML = extra_hint_array[selector[sequence]]
})

function starting_game (input) {
	sequence++
	if (box_tracker != 0){
		for (var i = box_tracker.length - 1; i >= 0; i--) {
			box_tracker["letter" + i].remove()
		}
	}
	// //start by converting his input to UPPERCASE and array format
	var letter = input.toUpperCase().split("")
	//pick a word
	chosen_word_array = array_of_words[selector[sequence]].split("")
	initial_hint.innerHTML = initial_hints[selector[sequence]]
	//increment sequence so the next time it's used, we get a different word
	
	for (var i = 0; i < chosen_word_array.length; i++){//loop to create stuff
		display_array[i] = '_'//make array as long as the word chosen
		var new_div = document.createElement('div')//create element stuff
		new_div.style.border = '2px solid black'
		new_div.style.width = '10%'
		new_div.style.height = '60%'
		new_div.style.display = "inline-block"
		new_div.style.textAlign = "center"
		new_div.style.margin = "20px"
		new_div.id = 'letter' + i//setting unique id to hopefully target each one
		new_div.setAttribute('class', 'box_tracker')
		var display_letter = document.createTextNode(display_array[i])
		the_word.appendChild(new_div)
		new_div.appendChild(display_letter) 
	}
	box_tracker = document.getElementsByClassName('box_tracker')

	if(check_valid_input(letter) != true){
		alert('You done goofed, try again with valid input')
		return
	}

	else{playing_game(letter)}
}

function playing_game(input){
	var letter = input.toUpperCase().split("")
	if(check_valid_input(letter) != true){
		alert('You done goofed, try again with valid input')
		return
	}

	else{
		playing(verified_letter)
		if (lives == 0){alert("Done goofed")}
		if (display_array.includes('_') == false){
			alert('Good Job, press start to start another game')
		}
	}
	if (sequence == selector.length-1){
			selector.shuffle()
			sequence = 0
		}
}

function check_valid_input(letter){
	var capital_letters = 90
	if (letter.length > 1){
		return false
	}
	while (capital_letters >= 65){
		if (letter[0].charCodeAt(0) == capital_letters){
			verified_letter = letter[0]
			return true
		}
		else{capital_letters--}
	}
	return false
}

function randomize() {
	selector.shuffle()
}

function playing(letter) {

	if(check_valid_input(letter) == true){
		for (var i = 0; i < chosen_word_array.length; i++){//finds all the letters locations
				if (verified_letter == chosen_word_array[i]){
					if (verified_letter != display_array[i]){
						found.push(i)
					}
				}
			}

			if (found.length == 0){
				lives--
				lives_left.innerHTML = lives
				hangman.style.backgroundImage = picture_array_hangman[hangman_counter]
				hangman_counter++
				if (lives == 2){
					var answer = prompt('Would you like to get another hint? type Y/N').toUpperCase()
					if (answer == 'Y') {
						extra_Hint.style.display = "inline-block"
						found = []
						return
					}
				}
				if (lives!= 0){
				alert('try again, enter a letter')
				}
			}
			else{
				for (var i = found.length - 1; i >= 0; i--) {
					var found_letter = document.getElementById('letter' + found[i])
					found_letter.innerHTML = input.value.toUpperCase()
					display_array[found[i]] = input.value.toUpperCase()
				}
				if (display_array.includes('_') == false){
					return
				}
				alert('Great job, enter another letter')
			}
			found = []
		}
	
//end of game if
	}