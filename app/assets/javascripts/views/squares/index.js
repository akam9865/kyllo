Trello.Views.SquaresIndex = Backbone.CompositeView.extend({
	template: JST['squares/index'],
	
	initialize: function () {
		this.listenTo(this.collection, "sync", this.render)
	},
	
	renderSquares: function () {
		this.collection.each(this.addSquare.bind(this));
	},
	
	addSquare: function (square) {
		var show = new Trello.Views.SquareShow({
			model: square
		});
		
		this.addSubview("#squares", show);
	},
	
	render: function () {
		var content = this.template();
		this.$el.html(content);
		this.renderSquares();
		return this;
	}
	
});