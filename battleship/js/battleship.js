"use strict";


var button = document.getElementById('fireButton');
var cell = document.getElementById('table');


var view = {
    displayMessage: function (msg) {
        var messageArea = document.getElementById('messageArea');
        messageArea.textContent = msg;
    },
    displayHit: function (location) {
        var cell = document.getElementById(location);
        cell.className = 'hit';
    },
    displayMiss: function (location) {
        var cell = document.getElementById(location);
        cell.className = 'miss';
    },
    displayClear: function (location) {
        var cell = document.getElementById(location);
        cell.className = '';
    },
    displayDamage: function (location) {
        var cell = document.getElementById(location);
        cell.className = 'damaged';
    }
}

var model = {
    boardSize: 7,
    numShips: 3,
    ships: [{   locations: [], hits: ['', '', '']   },
            {   locations: [], hits: ['', '', '']   },
            {   locations: [], hits: ['', '', '']   }],
    shipsSunk: 0,
    shipLength: 3,
    fire: function (guess) {
        for (var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i];
            var index = ship.locations.indexOf(guess);
            if (index >= 0) {
                ship.hits[index] = 'hit';
                view.displayHit(guess);
                view.displayMessage(' You HIT !');
                if (this.isSunk(ship)) {
                    this.shipsSunk++;
                    if (gameOverCheck()) {
                        view.displayMessage('You win !');
                        return true;
                    }
                    view.displayMessage('You sank battleship!');
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessage('You missed.');
        return false;
    },
    isSunk: function (ship) {
        for (var i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== 'hit') {
                return false;
            }
        }
        return true;
    },
    generateShip: function () {
        var randDirection = Math.floor(Math.random() * 2);
        var result = [];

        if (randDirection === 1) {      // horizontal        
            var randFirstNum = Math.floor(Math.random() * this.boardSize);
            var randSecondNum = Math.floor(Math.random() * (this.boardSize - this.shipLength));
            for (var i = 0; i < this.shipLength; i++) {
                result.push(randFirstNum + '' + (randSecondNum + i));
            }             
        } else {                        // vertical
            var randFirstNum = Math.floor(Math.random() * (this.boardSize - this.shipLength));
            var randSecondNum = Math.floor(Math.random() * this.boardSize);
            for (var i = 0; i < this.shipLength; i++) {
                result.push((randFirstNum + i) + '' + randSecondNum);
            }
        }
        return result;
    },
    generateShipLocations: function() { 
        for (var i = 0; i < this.numShips; i++) {
            do {
                var locations = this.generateShip();
            } while (this.collision(locations)) {
                this.ships[i].locations = locations;
            }
        }
    },
    collision: function (locations) {
        for (var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i];
            for (var j = 0; j < locations.length; j++) {
                if (ship.locations.indexOf(locations[j]) >= 0
                || ship.locations.indexOf(String(Number(locations[j]) - 1)) >= 0 
                || ship.locations.indexOf(String(Number(locations[j]) - 10)) >= 0 
                || ship.locations.indexOf(String(Number(locations[j]) + 1)) >= 0 
                || ship.locations.indexOf(String(Number(locations[j]) + 10)) >= 0) {
                    return true;
                }
            }
        }
        return false;
    }
}

function parseGuess(guess) {
    var alphabet = ['A','B', 'C', 'D', 'E', 'F', 'G'];

    if (guess == null || guess.length !== 2) {
        view.displayMessage('Please enter a valid letter and a number');
    } else {
        var firsChar = guess.charAt(0);
        var column = guess.charAt(1);
        var row = alphabet.indexOf(firsChar);

        if (isNaN(row) || isNaN(column)) {
            view.displayMessage('Please enter a valid letter and a number');
        } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
            view.displayMessage("That's off the board!");
        } else {
            return row + column;
        }        
    }
    return null;
}

// ----------------------------------------------------second field--------------------------------------------

var playerModel = {
    boardSize: 7,
    numShips: 3,
    ships: [{   locations: [], hits: ['', '', '']   },
            {   locations: [], hits: ['', '', '']   },
            {   locations: [], hits: ['', '', '']   }],
    shipsSunk: 0,
    shipLength: 3,
    fireGuesses: [],   
    hitted: [], 
    result: '',
    fire: function (guess) {
        if (this.fireGuesses.indexOf(guess) < 0) {
            this.fireGuesses.push(guess);
        }
        for (var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i];
            var index = ship.locations.indexOf(guess);
            if (index >= 0) {
                ship.hits[index] = 'hit';
                this.hitted.push(guess);
                view.displayDamage(guess);
                view.displayMessage('Your battleship is damaged !');
                if (this.isSunk(ship)) {
                    this.shipsSunk++;
                    if (this.shipsSunk == this.numShips) {
                        view.displayMessage('You lose !');
                        return true;
                    }
                    view.displayMessage('Your battleship was sunk!');
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessage('Computer missed.');
        return false;
    },
    isSunk: function (ship) {
        for (var i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== 'hit') {
                return false;
            }
        }
        return true;
    },
    generateShip: function () {
        var direction = Math.floor(Math.random() * 2);
        var row, col;
        var result = [];

        if (direction === 1) {      //horizontal
            row = Math.floor(Math.random() * this.boardSize);
            col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
            for (var i = 0; i < this.shipLength; i++) {
                result.push('1' + String(row) + String(col + i));
            }
        } else {                    //vertical
            row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
            col = Math.floor(Math.random() * this.boardSize);
            for (var i = 0; i < this.shipLength; i++) {
                result.push('1' + String(row + i) + String(col));
            }
        }
        return result;
    },
    showShips: function() {
        for (var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i].locations;
            for (var j = 0; j < this.shipLength; j++) {
                view.displayHit(ship[j]);
            }
        }
    },
    generateShipLocation: function () {
        for (var i = 0; i < this.numShips; i++) {
            do {
                var locations = this.generateShip();            
            } while (this.collision(locations)) {
                this.ships[i].locations = locations;
            }
        }
        this.showShips();
    },
    collision: function (locations) {
        for (var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i];
            for (var j = 0; j < locations.length; j++) {
                if (ship.locations.indexOf(locations[j]) >= 0 
                || ship.locations.indexOf(String(Number(locations[j]) - 1)) >= 0 
                || ship.locations.indexOf(String(Number(locations[j]) - 10)) >= 0 
                || ship.locations.indexOf(String(Number(locations[j]) + 1)) >= 0 
                || ship.locations.indexOf(String(Number(locations[j]) + 10)) >= 0) {
                    return true;
                }
            }
        }
        return false;
    },
    clearShips: function () {
        for (var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i].locations;
            for (var j = 0; j < this.shipLength; j++) {
                view.displayClear(ship[j]);
            }
            this.ships[i].locations = [];
        }
    },
    generateFire: function () {
        var row = Math.floor(Math.random() * this.boardSize);
        var col = Math.floor(Math.random() * this.boardSize);
        var result = '1' + '' + row + '' + col;
        return result;
    },
    generateFireLocation: function () {
        do {
            var location = this.generateFire();
        } while (this.coincidence(location)) {
            this.fireGuesses.push(location);
            return location;
        }
    },
    coincidence: function (location) {
        if (this.fireGuesses.indexOf(location) >= 0) {
            return true;
        }
        return false;
    },    
    randomFire: function () {
        var guess = this.generateFireLocation();
        if (this.fire(guess)) {
            this.result = guess;
            
            button.removeEventListener('click', timeDelay, false);
            cell.removeEventListener('click', timeDelay, false);
            
            button.addEventListener('click', timeDelayStepTwo, false);
            cell.addEventListener('click', timeDelayStepTwo, false);
        }
    },
    checkResult: function (result) {
        var result = String(result);
        var guesses = this.fireGuesses
        if ( guesses.indexOf(result) >= 0 
        || result.charAt(1) >= this.boardSize 
        || result.charAt(2) >= this.boardSize
        || result < 100 ) {
            return false;
        }
        return true;
    },
    generateNextStep: function () {
        var step = this.hitted[1] - this.hitted[0];

        if (this.checkResult(String(Number(this.hitted[1]) + step))) {
            this.result = String(Number(this.hitted[1]) + step);
        } else {
            this.result = String(Number(this.hitted[1]) - (step * 2));
        }
    },
    randomFireStepTwo: function () {

        var step, guess;
        step = Number(this.hitted[0]);        

        if(this.checkResult(step + 1)) {
            guess = step + 1;
        } else if(this.checkResult(step - 1)) {
            guess = step - 1;
        } else if(this.checkResult(step + 10)) {
            guess = step + 10;
        } else if(this.checkResult(step - 10)) {
            guess = step - 10;
        }

        this.result = String(guess);

        // --- if hitted
        if (this.fire(this.result)) {
            this.generateNextStep();
        } else {    // if --- missed 
            if (guess == step + 1) {
                if (this.checkResult(step - 1)) {
                    guess = step - 1;
                } else if (this.checkResult(step - 10)) {
                    guess = step - 10;
                } else if (this.checkResult(step + 10)) {
                    guess = step + 10;
                }
            } else if (guess == step - 1) {
                if (this.checkResult(step + 10)) {
                    guess = step + 10;
                } else {
                    guess = step - 10;
                }
            } else if (guess == step + 10) {
                guess = step - 10;
            }
            this.result = String(guess);
        }

        button.removeEventListener('click', timeDelayStepTwo, false);
        cell.removeEventListener('click', timeDelayStepTwo, false);
        button.addEventListener('click', timeDelayStepThree, false);
        cell.addEventListener('click', timeDelayStepThree, false)
    },
    randomFireStepThree: function () {

        if (this.fire(this.result)) {

            if (this.hitted.length == 3) {                
                this.hitted = [];      
                button.removeEventListener('click', timeDelayStepThree, false);
                cell.removeEventListener('click', timeDelayStepThree, false);
                button.addEventListener('click', timeDelay, false);
                cell.addEventListener('click', timeDelay, false);
            } else if ( this.hitted.length == 2) {                
                this.generateNextStep();
                button.removeEventListener('click', timeDelayStepThree, false);
                cell.removeEventListener('click', timeDelayStepThree, false);
                button.addEventListener('click', timeDelayStepFour, false)
                cell.addEventListener('click', timeDelayStepFour, false);
            }

        } else {
            if (this.hitted.length == 1) {

                var step, guess;
                step = Number(this.hitted[0]);
                
                if (this.result == step - 1) {
                    if (this.checkResult(step + 10)) {
                        guess = step + 10;
                    } else {
                        guess = step - 10;
                    }
                } else if (this.result == step + 10) {
                    guess = step - 10;
                }
                this.result = String(guess);
                button.removeEventListener('click', timeDelayStepThree, false);
                cell.removeEventListener('click', timeDelayStepThree, false);
                button.addEventListener('click', timeDelayStepFour, false)
                cell.addEventListener('click', timeDelayStepFour, false);

            } else if (this.hitted.length == 2) {
                this.generateNextStep();
            }
        }
        gameOverCheck();
    },
    randomFireStepFour: function () {

        if (this.fire(this.result)) {
            if (this.hitted.length == 3) {     
                this.hitted = [];                
                button.removeEventListener('click', timeDelayStepFour, false);
                cell.removeEventListener('click', timeDelayStepFour, false);
                button.addEventListener('click', timeDelay, false)
                cell.addEventListener('click', timeDelay, false);
            } else if (this.hitted.length != 3) {
                this.generateNextStep();
            }
        } else {
            if (this.hitted.length == 2) {
                this.generateNextStep();
            } else if (this.hitted.length == 1) {
                this.result = String(Number(this.hitted[0]) - 10);
            }

            button.removeEventListener('click', timeDelayStepFour, false);
            cell.removeEventListener('click', timeDelayStepFour, false);
            button.addEventListener('click', timeDelayStepThree, false)
            cell.addEventListener('click', timeDelayStepThree, false);
        }
        gameOverCheck();
    }
}

//--- functions -----------------------------------------------------------------------------------------------------------------------

function timeDelay() {
    setTimeout(function () {playerModel.randomFire()}, 700);
}

function timeDelayStepTwo() {
    setTimeout(function () {playerModel.randomFireStepTwo()}, 700);
}

function timeDelayStepThree() {
    setTimeout(function () {playerModel.randomFireStepThree()}, 700);
}

function timeDelayStepFour() {
    setTimeout(function () {playerModel.randomFireStepFour()}, 700);
}


function gameOverCheck() {
    if (playerModel.shipsSunk == playerModel.numShips || model.shipsSunk == model.numShips) {
        button.removeEventListener('click', handlerFireButton, false);
        button.removeEventListener('click', timeDelay, false);
        button.removeEventListener('click', timeDelayStepTwo, false);
        button.removeEventListener('click', timeDelayStepThree, false);
        button.removeEventListener('click', timeDelayStepFour, false);

        cell.removeEventListener('click', cellHandler, false);
        cell.removeEventListener('click', timeDelay, false);
        cell.removeEventListener('click', timeDelayStepTwo, false);
        cell.removeEventListener('click', timeDelayStepThree, false);
        cell.removeEventListener('click', timeDelayStepFour, false);
        return true;
    }
    return false;
}

function handlerFireButton() {
    var guessInput = document.getElementById('guessInput');
    var guess = guessInput.value.toUpperCase();
    var location = parseGuess(guess);

    if (parseGuess(guess)) {
        model.fire(location);
    }
    guessInput.value = '';    
}

function handlerKeyPress(e) {
    var fireButton = document.getElementById('fireButton');
    
    if (e.keyCode === 13) {
        fireButton.click();
        e.preventDefault();
        // return false;
    }
}

function cellHandler(e) {
    var id = e.target.id;
    model.fire(id);
}

function hideButton() {
    var button = document.getElementById('generateButton');
    button.parentNode.removeChild(button);

    var button = document.getElementById('fireButton');
    button.removeEventListener('click', hideButton, false);

    cell.removeEventListener('click', hideButton, false);
}

function init() {
    model.generateShipLocations();
    playerModel.generateShipLocation();

    var restartButton = document.getElementById('restart');
    var button = document.getElementById('fireButton');
    var guessInput = document.getElementById('guessInput'); 
    var generateButton = document.getElementById('generateButton');

    restartButton.onclick = function () { window.location.reload() };

    guessInput.onkeypress = handlerKeyPress;

    button.addEventListener('click', handlerFireButton, false);
    button.addEventListener('click', timeDelay, false);
    button.addEventListener('click', hideButton, false); 

    cell.addEventListener('click', cellHandler, false);
    cell.addEventListener('click', timeDelay, false);
    cell.addEventListener('click', hideButton, false);

    generateButton.addEventListener('click', function () {
                                            playerModel.clearShips()
                                            playerModel.generateShipLocation();
                                                    }, false);
}

window.onload = init;