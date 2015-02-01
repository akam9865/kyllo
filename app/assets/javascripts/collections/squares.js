Trello.Collections.Squares = Backbone.Collection.extend({
	url: "api/squares",
	comparator: "id"
});

Trello.Collections.squares = new Trello.Collections.Squares;