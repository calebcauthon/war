
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

test("player 2 can flip a card to start", function() {
	var game = new GameOfWar();
	game.flip_player_2_card();
	ok(game.player_2_cards() == 25);
});

test("cards can be added to a set of cards", function() {
	var hand = new Cards();
	hand.add_card({ suit: 'Clubs', rank: 'Ace' });
	ok(hand.count() == 1);
});

test("cards transfer to player 1", function() {
	var full_deck = new Cards();
	var player_1_cards = new Cards();

	full_deck.add_card({ suit: 'Diamonds', rank: 'Ace' });

	ok(player_1_cards.count() == 0);
	full_deck.deal(1, player_1_cards);
	ok(player_1_cards.count() == 1);	
	ok(full_deck.count() == 0);
});

test("creating a full deck creates 52 proper cards", function() {
	var full_deck = new FullDeckOfCards();	
	ok(full_deck.count() == 52)
});
