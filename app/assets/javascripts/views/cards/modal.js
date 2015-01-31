Trello.Views.CardModal = Backbone.CompositeView.extend({
	template: JST["cards/modal"],
	
	events: {
		"click #close": "dismiss",
		"click #overlay": "dismiss"
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