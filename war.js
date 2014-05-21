var GameOfWar = function() {
	var starting_deck = new FullDeckOfCards();
	
	var decks = [new Cards(), new Cards()];
	
	var deck_index = 0;
	while(starting_deck.count() > 0) {
		starting_deck.deal(1, decks[deck_index]);
		deck_index++;

		if(!decks[deck_index])
			deck_index = 0;
	};
window.decks = decks;

	return {
		player_1_cards: function() { return decks[0].count(); },
		player_2_cards: function() { return decks[1].count(); },
		flip_player_1_card: function() {
			decks[0].deal(1, new Cards());
		},
		flip_player_2_card: function() {
			decks[1].deal(1, new Cards());
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
			recipient_cards.add_card(top_card);
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
				var random_card = cards.splice(Math.floor(Math.random() * (cards.length-1)), 1);
				shuffled_cards.push(random_card);
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
			self.add_card({ suit: suits[i], rank: ranks[j] });
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

	$scope.player_1_cards_remaining = function() {
		if(game && game.player_1_cards()) {
			return game.player_1_cards();
		} else
			return 0;
	};
};

