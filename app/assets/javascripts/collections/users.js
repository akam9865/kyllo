Trello.Collections.Users = Backbone.Collection.extend({
	url: "api/users"
});

Trello.Collections.users = new Trello.Collections.Users;