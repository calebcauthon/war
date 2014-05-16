
test( "player 1 has 26 cards to start", function() {
	var game = new GameOfWar();
	ok(game.player_1_cards == 26);
});

test( "player 2 has 26 cards to start", function() {
	var game = new GameOfWar();
	ok(game.player_2_cards == 26); 
});
