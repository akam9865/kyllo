Trello.Views.CardModal = Backbone.CompositeView.extend({
	template: JST["cards/modal"],
	
	initialize: function () {
		this.listenTo(this.model, "sync", this.render);
	},
	
	events: {
		"click #close": "dismiss",
		"click #overlay": "dismiss",
		"submit .descrip-form": "saveDescription"
	},
	
	saveDescription: function (event) {
		event.preventDefault();
		var details = $(event.currentTarget).serializeJSON();
		
		this.model.save(details);
	},
	
	dismiss: function (event) {
		event.preventDefault();
		this.remove();
	},
	
	render: function () {
		var content = this.template({
			card: this.model
		});

		this.$el.html(content);
		return this;
	}
	
});