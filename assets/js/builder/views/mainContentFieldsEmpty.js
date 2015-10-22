define( [], function() {
	var view = Marionette.ItemView.extend({
		tagName: 'div',
		template: '#nf-tmpl-main-content-fields-empty',

		onBeforeDestroy: function() {
			jQuery( this.el ).droppable( 'destroy' );
		},

		onRender: function() {
			this.$el = this.$el.children();
			this.$el.unwrap();
			this.setElement( this.$el );
		},

		onShow: function() {
			jQuery( this.el ).droppable( {
				accept: function( draggable ) {
					if ( jQuery( draggable ).hasClass( 'nf-stage' ) || jQuery( draggable ).hasClass( 'nf-field-type-button' ) ) {
						return true;
					}
				},
				activeClass: 'nf-droppable-active',
				hoverClass: 'nf-droppable-hover',
				over: function( e, ui ) {
					ui.item = ui.draggable;
					nfRadio.channel( 'app' ).request( 'over:fieldsSortable', ui );
				},
				out: function( e, ui ) {
					ui.item = ui.draggable;
					nfRadio.channel( 'app' ).request( 'out:fieldsSortable', ui );
				},
				drop: function( e, ui ) {
					ui.item = ui.draggable;
					nfRadio.channel( 'app' ).request( 'receive:fieldsSortable', ui );
					var fieldCollection = nfRadio.channel( 'data' ).request( 'get:fieldCollection' );
					fieldCollection.trigger( 'reset', fieldCollection );
				},
			} );
		}
	});

	return view;
} );