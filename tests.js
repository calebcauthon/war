
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

test("cards are dealt from the top", function() {
	var small_deck = new Cards();
	small_deck.add_card({ suit: 'Diamonds', rank: 'Ten' });
	small_deck.add_card({ suit: 'Clubs', rank: 'Six' });
	
	var other_cards = new Cards();
	small_deck.deal(1, other_cards);

	ok(small_deck.peek_at_top_card().suit == 'Clubs');
});

test("cards get shuffled", function() {
	var small_deck = new Cards();
	small_deck.add_card({ suit: 'Diamonds', rank: 'Seven' });
	small_deck.add_card({ suit: 'Spades', rank: 'Ten' });
	small_deck.add_card({ suit: 'Clubs', rank: 'Nine' });

	ok(small_deck.peek_at_top_card().suit == 'Clubs');
	ok(small_deck.peek_at_top_card().rank == 'Nine');
	ok(small_deck.count() == 3);

	small_deck.shuffle();

	ok(small_deck.peek_at_top_card().suit != 'Clubs');
	ok(small_deck.peek_at_top_card().rank != 'Nine');
	ok(small_deck.count() == 3);
});

test("aces beat kings", function() {
	var ace = new Card({ suit: 'Spades', rank: 'Ace' });
	var king = new Card({ suit: 'Diamonds', rank: 'King' });

	ok(ace.value > king.value);
});

test("kings beat queens, and so on..", function() {
	var king = new Card({ rank: 'King' });
	var queen = new Card({ rank: 'Queen' });
	var jack = new Card({ rank: 'Jack' });
	var ten = new Card({ rank: 'Ten' });
	var nine = new Card({ rank: 'Nine' });
	var eight = new Card({ rank: 'Eight' });
	var seven = new Card({ rank: 'Seven' });
	var six = new Card({ rank: 'Six' });
	var five = new Card({ rank: 'Five' });
	var four = new Card({ rank: 'Four' });
	var three = new Card({ rank: 'Three' });
	var two = new Card({ rank: 'Two' });

	ok(king.value > queen.value);
	ok(queen.value > jack.value);
	ok(jack.value > ten.value);
	ok(ten.value > nine.value);
	ok(nine.value > eight.value);
	ok(eight.value > seven.value);
	ok(seven.value > six.value);
	ok(six.value > five.value);
	ok(five.value > four.value);
	ok(four.value > three.value);
	ok(three.value > two.value);
});
