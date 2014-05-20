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
