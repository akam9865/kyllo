Trello.Views.ListShow = Backbone.CompositeView.extend({
	template: JST["lists/show"],
	
	className: "listShow",
	
	events: {
		"click span.list-delete": "destroy",
		"submit .new-card-form": "createCard",
		"sortstop": "saveOrds"
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
		this.$("#cards").sortable();
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