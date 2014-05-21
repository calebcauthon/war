var GameOfWar = function() {
	var player_1_cards_in_hand = 26;
	var player_2_cards_in_hand = 26;

	return {
		player_1_cards: function() { return player_1_cards_in_hand; },
		player_2_cards: function() { return player_2_cards_in_hand; },
		flip_player_1_card: function() {
			player_1_cards_in_hand--;
			return player_1_cards_in_hand;
		},
		flip_player_2_card: function() {
			player_2_cards_in_hand--;
			return player_2_cards_in_hand;
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
