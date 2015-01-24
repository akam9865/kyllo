Trello.Collections.Boards = Backbone.Collection.extend({
	url: "api/boards"
});

Trello.Collections.boards = new Trello.Collections.Boards;