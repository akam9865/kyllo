Trello.Views.BoardShow = Backbone.CompositeView.extend({
	template: JST["boards/show"],
	
	initialize: function () {
		this.collection = this.model.lists();
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.collection, "remove", this.render);
		this.listenTo(this.collection, "add", this.addList);
		$('body').removeClass('index');
	},
	
	events: {
		"submit .new-list-form": "createList",
		"click .add-list.idle": "removeIdle",
		"click div.cancel": "addIdle",
		"sortstop": "saveOrds"
	},
	
	saveOrds: function (event) {
		var itemElements = this.$(".cardShow");
		
		console.log(itemElements)
	},
	
	removeIdle: function () {
		$('.add-list').removeClass('idle');
		$('.add-list').addClass('active');
		$('input.list-name-input').focus();
	},
	
	addIdle: function () {
		$('.add-list').removeClass('active');
		$('.add-list').addClass('idle');
	},
	
	createList: function (event) {
		event.preventDefault();
		var boardDetails = $(event.currentTarget).serializeJSON();
		boardDetails['list']['board_id'] = this.model.id;

		this.collection.create(boardDetails, {wait: true});
		$('input.list-name-input').val('');
		$('input.list-name-input').focus();
	},
	
	addList: function (list) {
		var listShow = new Trello.Views.ListShow({
			model: list
		});
		this.addSubview("#lists", listShow);
	},
	
	renderLists: function () {
		this.model.lists().each(this.addList.bind(this));
		this.$("#lists").sortable();
	},
	
	render: function () {
		var content = this.template({
			board: this.model
		});
		
		this.$el.html(content);
		this.renderLists();
		
		return this;
	}
});