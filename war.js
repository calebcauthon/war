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
		add_card: function(card) {
			cards.push(card);	
		},	
		count: function() {
			return cards.length;
		}
	};
};
