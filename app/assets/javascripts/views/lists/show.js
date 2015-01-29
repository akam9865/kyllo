Trello.Views.ListShow = Backbone.CompositeView.extend({
	template: JST["lists/show"],
	
	className: "listShow",
	
	events: {
		"click span.list-delete": "destroy",
		"submit .new-card-form": "createCard"
	},
	
	createCard: function (event) {
		event.preventDefault();
		alert()
	},
	
	destroy: function (event) {
		this.model.destroy();
	},
	
	initialize: function () {
		this.listenTo(this.model, "sync", this.render);
	},
	
	render: function () {
		var content = this.template({ list: this.model });
		this.$el.html(content);
		return this;
	}
});