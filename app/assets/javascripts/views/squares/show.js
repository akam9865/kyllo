Trello.Views.SquareShow = Backbone.CompositeView.extend({
	template: JST['squares/show'],
	
	events: {
		"click .available": "chooseSquare"
	},
	
	chooseSquare: function (event) {
		this.model.save();
	},
	
	className: "square",
	
	initialize: function () {
	},
	
	render: function () {
		var content = this.template({
			square: this.model
		});
		this.$el.html(content);
		return this;
	}
	
});