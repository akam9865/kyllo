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
		
		this.$rootEl.html(index.render().$el)
	},
	
	boardShow: function (id) {
		
	}
});