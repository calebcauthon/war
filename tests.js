
test("player 1 has 26 cards to start", function() {
	var game = new GameOfWar();
	ok(game.player_1_cards() == 26);
});

test("player 2 has 26 cards to start", function() {
	var game = new GameOfWar();
	ok(game.player_2_cards() == 26); 
});

test("player 1 can flip a card to start", function() {
	var game = new GameOfWar();
	game.flip_player_1_card();
	ok(game.player_1_cards() == 25);
});

test("player 2 cant flip a card to start", function() {
	var game = new GameOfWar();
	game.flip_player_2_card();
	ok(game.player_2_cards() == 26);
});
