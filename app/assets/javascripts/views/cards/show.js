Trello.Views.CardShow = Backbone.CompositeView.extend({
	
	template: JST['cards/show'],
	
	className: "cardShow",
	
	render: function () {
		var content = this.template({
			card: this.model
		});
		
		this.$el.html(content);
		return this;
	}
});