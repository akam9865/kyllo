window.Trello = {
	Models: {},
	Collections: {},
	Views: {},
	Routers: {},
	initialize: function () {
    new Trello.Routers.Router
    Backbone.history.start();
	}
};
