Trello.Views.ListShow = Backbone.CompositeView.extend({
	template: JST["lists/show"],
	
	className: "listShow",
	
	events: {
		"click span.list-delete": "destroy",
		"submit .new-card-form": "createCard",
		"sortstop": "saveOrds",
		"sortreceive": "receiveCard",
		"sortremove": "removeCard"
		// "sortstart": "test"
	},
	
	test: function (event) {
	},
	
	saveOrds: function (event) {
		var itemElements = this.$(".cardShow");
		var collection = this.collection;
		
		itemElements.each(function(idx, el) {
			var cardId = $(el).children('.card-details').data('card-id');
			
			var card = collection.get(cardId);
			card.save({ord: idx});
		});
		
		collection.sort();
	},
	
  receiveCard: function(event, ui) {
    var $cardDisplay = ui.item;
		var cardId = $cardDisplay.children().data('card-id');
    var newOrd = $cardDisplay.index();
		

    var cardClone = new Trello.Models.Card({
      id: cardId,
      list_id: this.model.id,
      ord: newOrd
    });


    cardClone.save();
    this.collection.add(cardClone, {silent: true});
    this.saveCards(event);
  },
	
  removeCard: function(event, ui) {
    var $cardDisplay = ui.item,
        cardId = $cardDisplay.children().data('card-id'),
        cards = this.model.cards(),
        cardToRemove = cards.get(cardId),
        cardSubviews = this.subviews('.list-cards');
    cards.remove(cardToRemove);

    var subviewToRemove = _.findWhere(cardSubviews, {model: cardToRemove});
    cardSubviews.splice(cardSubviews.indexOf(subviewToRemove), 1);
  },
	
  saveCards: function(event) {
    event.stopPropagation();
    this.saveOrds();
  },
	
	createCard: function (event) {
		event.preventDefault();
		var cardDetails = $(event.currentTarget).serializeJSON();
		cardDetails['card']['list_id'] = this.model.id;

		this.collection.create(cardDetails, {wait: true})
		
		$('input.card-title-input').val('');
		$('input.card-title-input#' + this.model.id).focus();
	},
	
	addCard: function (card) {
		var cardShow = new Trello.Views.CardShow({
			model: card
		});
		this.addSubview("#cards", cardShow);
	},
	
	renderCards: function () {
		this.collection.each(this.addCard.bind(this));
		this.$(".list-cards").sortable({ connectWith: ".list-cards", placeholder: "drophere" });
	},
	
	destroy: function (event) {
		this.model.destroy();
	},
	
	initialize: function () {
		this.collection = this.model.cards();
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.collection, "add", this.addCard);
	},
	
	render: function () {
		var content = this.template({ list: this.model });
		this.$el.html(content);
		this.renderCards();
		return this;
	}
});