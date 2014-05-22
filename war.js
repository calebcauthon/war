var GameOfWar = function() {
	var starting_deck = new FullDeckOfCards();
	starting_deck.shuffle();
	
	var decks = [new Cards(), new Cards()];
	var scores = [0, 0];
	var current_cards = [false, false];

	var deck_index = 0;
	while(starting_deck.count() > 0) {
		starting_deck.deal(1, decks[deck_index]);
		deck_index++;

		if(!decks[deck_index])
			deck_index = 0;
	};
	
	var calculate_score = function() {
		if(current_cards[0] && current_cards[1]) {
			if(current_cards[0].value > current_cards[1].value)
				scores[0]++;
			else if(current_cards[0].value < current_cards[1].value)
				scores[1]++;

			current_cards = [false, false];
		} else {
			return;
		};
	};

	return {
		player_1_score: function() { return scores[0]; },
		player_2_score: function() { return scores[1]; },
		player_1_cards: function() { return decks[0].count(); },
		player_2_cards: function() { return decks[1].count(); },
		flip_player_1_card: function() {
			if(current_cards[0])
				return;

			var discard_deck = new Cards();
			decks[0].deal(1, discard_deck);
			
			current_cards[0] = discard_deck.peek_at_top_card(); 
			calculate_score();

			return current_cards[0];
		},
		flip_player_2_card: function() {
			if(current_cards[1])
				return;
			
			var discard_deck = new Cards();
			decks[1].deal(1, discard_deck);
			
			current_cards[1] = discard_deck.peek_at_top_card(); 
			var card = current_cards[1];

			calculate_score();

			return card;
		}
	};
};

var Card = function(details) {
	var rank_values = {};
	rank_values['Ace'] = 13;
	rank_values['King'] = 12;
	rank_values['Queen'] = 11;
	rank_values['Jack'] = 10;
	rank_values['Ten'] = 9;
	rank_values['Nine'] = 8;
	rank_values['Eight'] = 7;
	rank_values['Seven'] = 6;
	rank_values['Six'] = 5;
	rank_values['Five'] = 4;
	rank_values['Four'] = 3;
	rank_values['Three'] = 2;
	rank_values['Two'] = 1;

	var attributes = details;
	attributes.value = rank_values[details.rank];

	return attributes;
};

var Cards = function() {
	var cards = [];

	return {
		deal: function(number_of_cards, recipient_cards) {
			var top_card = cards.splice(0, 1);
			recipient_cards.add_card(top_card[0]);
		},
		add_card: function(card) {
			cards.push(card);	
		},	
		count: function() {
			return cards.length;
		},
		peek_at_top_card: function() {
			return cards[cards.length-1];
		},
		shuffle: function() {
			var shuffled_cards = [];
			while(cards.length > 0) {
				var random_number = Math.random();
				var max = cards.length;
				var index = Math.floor(random_number * max);
				var random_card = cards.splice(index, 1);
				shuffled_cards.push(random_card[0]);
			};
			cards = shuffled_cards;
		}
	};
};


var FullDeckOfCards = function() {	
	var self = Cards();
	
	var all_52_cards = [];
	var suits = ['Diamonds', 'Clubs', 'Hearts', 'Spades'];
	var ranks = [ 'Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King' ]; 
	for(var i = 0; i < suits.length; i++) {
		for(var j = 0; j < ranks.length; j++) {
			self.add_card(new Card({ suit: suits[i], rank: ranks[j] }));
		}
	};

	return self;
};

FullDeckOfCards.prototype = new Cards();

function WarController($scope) {
	var game;

	$scope.start_game = function() {
		game = new GameOfWar();
	};

	$scope.flip_player_1_card = function() {
		var card = game.flip_player_1_card();
		if(!card.suit)
			return;

		$scope.player_1_card = card.rank + " of " + card.suit; 
		return $scope.player_1_card; 			
	};

	$scope.flip_player_2_card = function() {
		var card = game.flip_player_2_card();
		
		if(!card.suit)
			return;
		$scope.player_2_card = card.rank + " of " + card.suit; 
		return $scope.player_2_card; 			
	};
	
	$scope.player_1_score = function() {
		return game.player_1_score();
	};

	$scope.player_2_score = function() {
		return game.player_2_score();
	};

	$scope.player_2_cards_remaining = function() {
		if(game && game.player_2_cards()) {
			return game.player_2_cards();
		} else
			return 0;
	};

	$scope.player_1_cards_remaining = function() {
		if(game && game.player_1_cards()) {
			return game.player_1_cards();
		} else
			return 0;
	};
};

