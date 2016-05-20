//Uses the module pattern to wrap code into a single global
//variable or an immediately invoked function.
$(function() {
  'use strict';

  //When the page loads, the startup screen appears.
  //Lets a player add their name before the game starts
  $('body').html('<div class="screen screen-start" id="start"><header><label for="input">Your Name:</label><input type="text" id="input" placeholder="Chris"><h1>Tic Tac Toe</h1><a href="#" class="button start-game">Start game</a><a href="#" class="button play-computer">Play Computer</a></header></div>');

  //when the player clicks the start button the start
  //screen disappears, the board appears,
  //and the game begins
  function newGame(userFirstValue, userSecondValue) {
    $('.button').on('click', function() {
      //Name appears while the game is playing
      var userNameFirst;
      var userNameSecond;

      //checks if current player is playing for the first time
      //or wants to play another game
      if (userFirstValue !== undefined) {
        userNameFirst = userFirstValue;
      } else {
        //gets user name from start page
        userNameFirst = $('input[type="text"]').val();
      }

      //checks if current player is playing for the first time
      //or wants to play another game
      if (userSecondValue !== undefined) {
        userNameSecond = userSecondValue;
      } else {
        userNameSecond = '';
      }

      //adds board game
      $('body').html('<div class="board" id="board">' +
        '<header>' +
          '<h1>Tic Tac Toe</h1>' +
          '<ul><li class="players" id="player1"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-200.000000, -60.000000)" fill="#000000"><g transform="translate(200.000000, 60.000000)"><path d="M21 36.6L21 36.6C29.6 36.6 36.6 29.6 36.6 21 36.6 12.4 29.6 5.4 21 5.4 12.4 5.4 5.4 12.4 5.4 21 5.4 29.6 12.4 36.6 21 36.6L21 36.6ZM21 42L21 42C9.4 42 0 32.6 0 21 0 9.4 9.4 0 21 0 32.6 0 42 9.4 42 21 42 32.6 32.6 42 21 42L21 42Z"/></g></g></g></svg><span class="username1">' + userNameFirst + '</span></li>' +
          '<li class="players" id="player2"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="43" viewBox="0 0 42 43" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-718.000000, -60.000000)" fill="#000000"><g transform="translate(739.500000, 81.500000) rotate(-45.000000) translate(-739.500000, -81.500000) translate(712.000000, 54.000000)"><path d="M30 30.1L30 52.5C30 53.6 29.1 54.5 28 54.5L25.5 54.5C24.4 54.5 23.5 53.6 23.5 52.5L23.5 30.1 2 30.1C0.9 30.1 0 29.2 0 28.1L0 25.6C0 24.5 0.9 23.6 2 23.6L23.5 23.6 23.5 2.1C23.5 1 24.4 0.1 25.5 0.1L28 0.1C29.1 0.1 30 1 30 2.1L30 23.6 52.4 23.6C53.5 23.6 54.4 24.5 54.4 25.6L54.4 28.1C54.4 29.2 53.5 30.1 52.4 30.1L30 30.1Z"/></g></g></g></svg><span class="username2">' + userNameSecond + '</span></li></ul>' +
        '</header>' +
        '<ul class="boxes"><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li> <li class="box"></li></ul>' +
      '</div>');

      //starts game with user playing user
      if ($(this).hasClass('start-game') || userSecondValue === '') {
        togglePlayer();

      //starts game with user playing computer
      } else if ($(this).hasClass('play-computer') || userSecondValue === 'Computer') {
        playComputer();
      }

    });
  } //newGame()
  newGame();

  //Play alternates between X and O.
  //The current player is indicated at the top of the page

  //When the player clicks on an empty square, attach the
  //class box-filled-1 (for O) or box-filled-2 (for X)
  ///to the square.
  function togglePlayer() {
    //makes player 1 active
    $('#player1').addClass('active');
    activePlayer('player1');

    //on click of li
    $('.boxes li').on('click', function() {
      //Players can only click on empty squares.
      if ($(this).hasClass('box-filled-1') || $(this).hasClass('box-filled-2')) {
        return;
      }

      //creates toggle between players
      if ($('#player1').hasClass('active')) {
        $('#player1').removeClass('active');
        $('#player2').addClass('active');

        activePlayer('player2');
        $(this).addClass('box-filled-1');

        //checks to see if there was a tie or player 1 wins
        checkForTie();

      } else {
        $('#player2').removeClass('active');
        $('#player1').addClass('active');

        activePlayer('player1');
        $(this).addClass('box-filled-2');

        //checks to see if there was a tie or player 2 wins
        checkForTie();
      } //if statement

    });
  } //togglePlayer()

  //Play alternates between X & O where X is the Computer
  //& O is the user
  //The current player is indicated at the top of the page
  function playComputer() {
    $('span.username2').html('Computer');
    $('#player1').addClass('active');
    activePlayer('player1');

    $('.boxes li').on('click', function() {
      //Players can only click on empty squares.
      if ($(this).hasClass('box-filled-1') || $(this).hasClass('box-filled-2')) {
        return;
      }

      if ($('#player1').hasClass('active')) {
        $(this).addClass('box-filled-1');

        //checks to see if there was a tie or if a player wins
        checkForTie();
        //adds computer move after user clicks
        moveComputer();

      }//if statement

    });
  } //playComputer()

  //When the current player mouses over an empty square on the board, it's symbol the X or O should appear on the square.
  function activePlayer(player) {
    if (player === 'player1') {
      $('.boxes li').hover(function() {
        //Players can only hover on empty squares.
        if ($(this).hasClass('box-filled-1') || $(this).hasClass('box-filled-2')) {
          $(this).css('cursor', 'auto');
          return;
        }

        //adds background image on hover
        $(this).siblings().css('background-image', '');
        $(this).css('background-image', 'url(./img/o.svg)');
      });

    } else if (player === 'player2') {
      $('.boxes li').hover(function() {
        //Players can only hover on empty squares.
        if ($(this).hasClass('box-filled-1') || $(this).hasClass('box-filled-2')) {
          $(this).css('cursor', 'auto');
          return;
        }

        //adds background image on hover
        $(this).siblings().css('background-image', '');
        $(this).css('background-image', 'url(./img/x.svg)');
      });

    } //if statement
  } //activePlayer()

  //The game ends when one player has three of their symbols in a
  //row either horizontally, vertically or diagonally.
  function checkWin(className) {
    //checks all option to win
    if ($('.boxes li:first-child').hasClass(className) && $('.boxes li:nth-of-type(2)').hasClass(className) && $('.boxes li:nth-of-type(3)').hasClass(className) ||
      $('.boxes li:nth-of-type(4)').hasClass(className) && $('.boxes li:nth-of-type(5)').hasClass(className) && $('.boxes li:nth-of-type(6)').hasClass(className) ||
      $('.boxes li:nth-of-type(7)').hasClass(className) && $('.boxes li:nth-of-type(8)').hasClass(className) && $('.boxes li:nth-of-type(9)').hasClass(className) ||
      $('.boxes li:nth-of-type(1)').hasClass(className) && $('.boxes li:nth-of-type(5)').hasClass(className) && $('.boxes li:nth-of-type(9)').hasClass(className) ||
      $('.boxes li:nth-of-type(3)').hasClass(className) && $('.boxes li:nth-of-type(5)').hasClass(className) && $('.boxes li:nth-of-type(7)').hasClass(className) ||
      $('.boxes li:nth-of-type(1)').hasClass(className) && $('.boxes li:nth-of-type(4)').hasClass(className) && $('.boxes li:nth-of-type(7)').hasClass(className) ||
      $('.boxes li:nth-of-type(2)').hasClass(className) && $('.boxes li:nth-of-type(5)').hasClass(className) && $('.boxes li:nth-of-type(8)').hasClass(className) ||
      $('.boxes li:nth-of-type(3)').hasClass(className) && $('.boxes li:nth-of-type(6)').hasClass(className) && $('.boxes li:nth-of-type(9)').hasClass(className)) {

      var userFirstValue = $('.username1').text();
      var userSecondValue = $('.username2').text();

      //Adds programming so that when the game ends, the board
      //disappears and the game end screen appears.
      //The name is displayed for the winning player if there
      //is a name, otherwise it just says winner
      if (className === 'box-filled-1') {

        if (userFirstValue !== '') {
          $('body').html('<div class="screen screen-win screen-win-one" id="finish"><header><h1>Tic Tac Toe</h1><p class="message">' + userFirstValue + ' Wins!</p><a href="#" class="button">New game</a></header></div>');
        } else {
          $('body').html('<div class="screen screen-win screen-win-one" id="finish"><header><h1>Tic Tac Toe</h1><p class="message">Winner</p><a href="#" class="button">New game</a></header></div>');
        }

        //Adds programming so that when a player pushes the "New
        //Game" button, the board appears again, empty and a new
        //game begins.
        newGame(userFirstValue, userSecondValue);

      } else if (className === 'box-filled-2') {

        if (userSecondValue !== '') {
          $('body').html('<div class="screen screen-win screen-win-two" id="finish"><header><h1>Tic Tac Toe</h1><p class="message">' + userSecondValue + ' Wins!</p><a href="#" class="button">New game</a></header></div>');
        } else {
          $('body').html('<div class="screen screen-win screen-win-two" id="finish"><header><h1>Tic Tac Toe</h1><p class="message">Winner</p><a href="#" class="button">New game</a></header></div>');
        }

        //Adds programming so that when a player pushes the "New
        //Game" button, the board appears again, empty and a new
        //game begins.
        newGame(userFirstValue, userSecondValue);
      }

      return true;

    } else {

      return false;

    } //if statement
  } //checkWin()

  //If all of the squares are filled & no players have three in a row the game is a tie.
  function checkForTie() {
    var userFirstValue = $('.username1').text();
    var userSecondValue = $('.username2').text();

    if (checkWin('box-filled-1') === false && checkWin('box-filled-2') === false) {
      var tie = 0;
      //adds array with all li items
      var divArray = ['.boxes li:nth-of-type(1)', '.boxes li:nth-of-type(2)', '.boxes li:nth-of-type(3)', '.boxes li:nth-of-type(4)', '.boxes li:nth-of-type(5)', '.boxes li:nth-of-type(6)', '.boxes li:nth-of-type(7)', '.boxes li:nth-of-type(8)', '.boxes li:nth-of-type(9)'];

      //iterates through divArray
      for (var i = 0; i < divArray.length; i++) {
        //if all box is filled add 1 to tie
        if ($(divArray[i]).hasClass('box-filled-1') || $(divArray[i]).hasClass('box-filled-2')) {
          tie += 1;
        }
      }

      //if all boxes are filled display tie page
      if (tie === 9) {
        $('body').html('<div class="screen screen-win screen-win-tie" id="finish"><header><h1>Tic Tac Toe</h1><p class="message">It\'s a Tie!</p><a href="#" class="button">New game</a></header></div>');

        newGame(userFirstValue, userSecondValue);

      //if there is no tie yet...let game continue
      } else {
        checkWin('box-filled-1');
        checkWin('box-filled-2');
      }

    }//if statement
  } //checkForTie()

  //Adds programming to support playing against the computer.
  //Only one player plays, the other is controlled by your
  //programming.
  function moveComputer() {
    if (checkWin('box-filled-1') === false) {

      //creates random number between 1 & 9
      var random = Math.floor(Math.random() * 9);
      //finds appropriate li item
      var randomDiv = $('.boxes li').eq(random);

      //if the random result has either of the following classes
      //call this function again to get new random number
      if ($(randomDiv).hasClass('box-filled-1') || $(randomDiv).hasClass('box-filled-2')) {
        moveComputer();
      } else {
        //adds computer selection
        $(randomDiv).addClass('box-filled-2');
        //checks for tie or if computer wins
        checkForTie();
      }

    } //if statement
  } //playComputer()

});
