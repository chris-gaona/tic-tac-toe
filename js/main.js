$(function() {
  'use strict';

  //When the page loads, the startup screen appears.
  $('body').html('<div class="screen screen-start" id="start"><header><h1>Tic Tac Toe</h1><a href="#" class="button">Start game</a></header></div>');

  //when the player clicks the start button the start
  //screen disappears, the board appears,
  //and the game begins
  $('.button').on('click', function() {
    $('body').html('<div class="board" id="board">' +
      '<header>' +
        '<h1>Tic Tac Toe</h1>' +
        '<ul><li class="players" id="player1"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-200.000000, -60.000000)" fill="#000000"><g transform="translate(200.000000, 60.000000)"><path d="M21 36.6L21 36.6C29.6 36.6 36.6 29.6 36.6 21 36.6 12.4 29.6 5.4 21 5.4 12.4 5.4 5.4 12.4 5.4 21 5.4 29.6 12.4 36.6 21 36.6L21 36.6ZM21 42L21 42C9.4 42 0 32.6 0 21 0 9.4 9.4 0 21 0 32.6 0 42 9.4 42 21 42 32.6 32.6 42 21 42L21 42Z"/></g></g></g></svg></li><li class="players" id="player2"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="43" viewBox="0 0 42 43" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-718.000000, -60.000000)" fill="#000000"><g transform="translate(739.500000, 81.500000) rotate(-45.000000) translate(-739.500000, -81.500000) translate(712.000000, 54.000000)"><path d="M30 30.1L30 52.5C30 53.6 29.1 54.5 28 54.5L25.5 54.5C24.4 54.5 23.5 53.6 23.5 52.5L23.5 30.1 2 30.1C0.9 30.1 0 29.2 0 28.1L0 25.6C0 24.5 0.9 23.6 2 23.6L23.5 23.6 23.5 2.1C23.5 1 24.4 0.1 25.5 0.1L28 0.1C29.1 0.1 30 1 30 2.1L30 23.6 52.4 23.6C53.5 23.6 54.4 24.5 54.4 25.6L54.4 28.1C54.4 29.2 53.5 30.1 52.4 30.1L30 30.1Z"/></g></g></g></svg></li></ul>' +
      '</header>' +
      '<ul class="boxes"><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li> <li class="box"></li></ul>' +
    '</div>');

    togglePlayer();

  });

  //Play alternates between X and O.
  //The current player is indicated at the top of the page

  //When the player clicks on an empty square, attach the
  //class box-filled-1 (for O) or box-filled-2 (for X)
  ///to the square.
  function togglePlayer() {
    $('#player1').addClass('active');
    activePlayer('player1');

    $('.boxes li').on('click', function() {
      //Players can only click on empty squares.
      if ($(this).hasClass('box-filled-1') || $(this).hasClass('box-filled-2')) {
        return;
      }

      if ($('#player1').hasClass('active')) {
        $('#player1').removeClass('active');
        $('#player2').addClass('active');

        activePlayer('player2');
        $(this).addClass('box-filled-1');

        checkForTie();

      } else {
        $('#player2').removeClass('active');
        $('#player1').addClass('active');

        activePlayer('player1');
        $(this).addClass('box-filled-2');

        checkForTie();
      } //if statement

    });
  } //togglePlayer()

  //When the current player mouses over an empty square on the board, it's symbol the X or O should appear on the square.
  function activePlayer(player) {
    if (player === 'player1') {
      $('.boxes li').hover(function() {
        //Players can only click on empty squares.
        if ($(this).hasClass('box-filled-1') || $(this).hasClass('box-filled-2')) {
          $(this).css('cursor', 'auto');
          return;
        }

        $(this).siblings().css('background-image', '');
        $(this).css('background-image', 'url(./img/o.svg)');
      });

    } else if (player === 'player2') {
      $('.boxes li').hover(function() {
        //Players can only click on empty squares.
        if ($(this).hasClass('box-filled-1') || $(this).hasClass('box-filled-2')) {
          $(this).css('cursor', 'auto');
          return;
        }

        $(this).siblings().css('background-image', '');
        $(this).css('background-image', 'url(./img/x.svg)');
      });

    } //if statement
  } //activePlayer()

  //The game ends when one player has three of their symbols in a
  //row either horizontally, vertically or diagonally.
  function checkWin(className) {
    if ($('.boxes li:first-child').hasClass(className) && $('.boxes li:nth-of-type(2)').hasClass(className) && $('.boxes li:nth-of-type(3)').hasClass(className) ||
      $('.boxes li:nth-of-type(4)').hasClass(className) && $('.boxes li:nth-of-type(5)').hasClass(className) && $('.boxes li:nth-of-type(6)').hasClass(className) ||
      $('.boxes li:nth-of-type(7)').hasClass(className) && $('.boxes li:nth-of-type(8)').hasClass(className) && $('.boxes li:nth-of-type(9)').hasClass(className) ||
      $('.boxes li:nth-of-type(1)').hasClass(className) && $('.boxes li:nth-of-type(5)').hasClass(className) && $('.boxes li:nth-of-type(9)').hasClass(className) ||
      $('.boxes li:nth-of-type(3)').hasClass(className) && $('.boxes li:nth-of-type(5)').hasClass(className) && $('.boxes li:nth-of-type(7)').hasClass(className) ||
      $('.boxes li:nth-of-type(1)').hasClass(className) && $('.boxes li:nth-of-type(4)').hasClass(className) && $('.boxes li:nth-of-type(7)').hasClass(className) ||
      $('.boxes li:nth-of-type(2)').hasClass(className) && $('.boxes li:nth-of-type(5)').hasClass(className) && $('.boxes li:nth-of-type(8)').hasClass(className) ||
      $('.boxes li:nth-of-type(3)').hasClass(className) && $('.boxes li:nth-of-type(6)').hasClass(className) && $('.boxes li:nth-of-type(9)').hasClass(className)) {

      console.log(className + ' wins!');

      //Add programming so that when the game ends, the board disappears and the game end screen appears.
      if (className === 'box-filled-1') {
        $('body').html('<div class="screen screen-win screen-win-one" id="finish"><header><h1>Tic Tac Toe</h1><p class="message">Winner</p><a href="#" class="button">New game</a></header></div>');

      } else if (className === 'box-filled-2') {
        $('body').html('<div class="screen screen-win screen-win-two" id="finish"><header><h1>Tic Tac Toe</h1><p class="message">Winner</p><a href="#" class="button">New game</a></header></div>');
      }

      return true;

    } else {
      // console.log('nope!');

      return false;

    } //if statement
  } //checkWin()

  //If all of the squares are filled and no players have three in a row the game is a tie.
  function checkForTie() {
    if (checkWin('box-filled-1') === false && checkWin('box-filled-2') === false) {
      var tie = 0;
      var divArray = ['.boxes li:nth-of-type(1)', '.boxes li:nth-of-type(2)', '.boxes li:nth-of-type(3)', '.boxes li:nth-of-type(4)', '.boxes li:nth-of-type(5)', '.boxes li:nth-of-type(6)', '.boxes li:nth-of-type(7)', '.boxes li:nth-of-type(8)', '.boxes li:nth-of-type(9)'];

      for (var i = 0; i < divArray.length; i++) {
        if ($(divArray[i]).hasClass('box-filled-1') || $(divArray[i]).hasClass('box-filled-2')) {
          tie += 1;
        }
      }

      if (tie === 9) {
        $('body').html('<div class="screen screen-win screen-win-tie" id="finish"><header><h1>Tic Tac Toe</h1><p class="message">It\'s a Tie!</p><a href="#" class="button">New game</a></header></div>');

      } else {
        checkWin('box-filled-1');
        checkWin('box-filled-2');
      }

    }//if statement
  } //checkForTie()

});
