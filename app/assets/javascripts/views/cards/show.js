Trello.Views.CardShow = Backbone.CompositeView.extend({
	
	template: JST['cards/show'],
	
	className: "cardShow",
	
	events: {
		"click": "showModal"
	},
	
	showModal: function () {

		this.modalView = this.modalView || 
			new Trello.Views.CardModal({ model: this.model });
			
		$('body').prepend(this.modalView.render().$el);
		this.modalView.delegateEvents();
	},
	
	render: function () {
		var content = this.template({
			card: this.model
		});
		
		this.$el.html(content);
		return this;
	}
});