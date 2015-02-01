window.Trello = {
	Models: {},
	Collections: {},
	Views: {},
	Routers: {},
	initialize: function () {
    // new Trello.Routers.Router
		new Trello.Routers.SquaresRouter
    Backbone.history.start();
	}
};
