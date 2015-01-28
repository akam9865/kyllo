Trello.Views.BoardShow = Backbone.CompositeView.extend({
	template: JST["boards/show"],
	
	initialize: function () {
		this.collection = this.model.lists();
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.collection, "add", this.addList);
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
	
	renderNewForm: function () {
		
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