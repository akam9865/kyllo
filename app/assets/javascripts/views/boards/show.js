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
		var itemElements = this.$(".listShow");
		var collection = this.collection;
		
		itemElements.each(function(idx, el) {
			var listId = $(el).children('#list-title').data('list-id');
			
			var list = collection.get(listId);
			list.save({ord: idx});
		});
		
		collection.sort();
		
    var subviews = this.subviews("#lists");

    subviews.sort(function(subview1, subview2) {
      return subview1.model.get('ord') - subview2.model.get('ord');
    });
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
		this.$("#lists").sortable({ placeholder: 'droplist' });
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