Trello.Views.BoardsIndex = Backbone.View.extend({
	template: JST["boards/index"],
	
  initialize: function () {
    this.listenTo(this.collection, 'sync add', this.render);
		$('body').addClass('index');
  },
	
	events: {
		"submit #new-board": "newBoard",
		"click .delete": "here"
	},
	
	here: function (event) {
		var id = $(event.currentTarget).data('id');
		var board = this.collection.get(id);
		
		// this way sucks, fix it
		
		board.destroy({
			success: function () {
				Backbone.history.navigate('#', {trigger: true})
			}
		})
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