Trello.Routers.SquaresRouter = Backbone.Router.extend({
	initialize: function () {
		this.$rootEl = $("#main");
	},
	
	routes: {
		'': "squaresIndex"
	},
	
	squaresIndex: function () {
		var squares = Trello.Collections.squares;
		squares.fetch();
		var index = new Trello.Views.SquaresIndex({
			collection: squares
		});
		
		this._swapView(index);
	},
	
  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});