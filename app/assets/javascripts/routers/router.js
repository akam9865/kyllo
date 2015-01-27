Trello.Routers.Router = Backbone.Router.extend({
	initialize: function () {
		this.$rootEl = $("#main");
	},
	
	routes: {
		'': 'boardsIndex',
		'boards/:id': 'boardShow'
	},
	
	boardsIndex: function () {
		Trello.Collections.boards.fetch();

		var index = new Trello.Views.BoardsIndex({
			collection: Trello.Collections.boards
		});
		
		this._swapView(index);
	},
	
	boardShow: function (id) {
		var board = new Trello.Models.Board({ id: id });
		board.fetch();

		var show = new Trello.Views.BoardShow({
			model: board
		});
		
		this._swapView(show);
	},
	
  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});