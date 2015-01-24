Trello.Views.BoardsIndex = Backbone.View.extend({
	template: JST["boards/index"],
	
  initialize: function () {
    this.listenTo(this.collection, 'sync add', this.render);
  },
	
	events: {
		"submit #new-board": "newBoard"
	},
	
	render: function () {
		var content = this.template({
			boards: this.collection
		});

		this.$el.html(content);
		
		return this;
	},
	
	newBoard: function (event) {
		event.preventDefault();
		var boardDetails = $(event.currentTarget).serializeJSON();
		
		Trello.Collections.boards.create(boardDetails);
	}
});