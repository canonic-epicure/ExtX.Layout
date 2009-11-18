declare( 'Ext::ux::layout::ColumnFit', function (use,checkState,__PACKAGE__) {

	Ext.ux.layout.ColumnFit = Ext.extend(Ext.layout.ColumnLayout, {
	    
	    // private
	    onLayout : function(ct, target){
	        var cs = ct.items.items, len = cs.length, c, i;
	
	        if(!this.innerCt){
	            target.addClass('x-column-layout-ct');
	
	            // the innerCt prevents wrapping and shuffling while
	            // the container is resizing
	            this.innerCt = target.createChild({cls:'x-column-inner'});
	            this.innerCt.createChild({cls:'x-clear'});
	            this.innerCt.setStyle( { 'height' : '100%', width : '100%' } );
	        }
	        this.renderAll(ct, this.innerCt);
	
	        if (this.container.hidden) return;
	        
	        var size = target.getViewSize();
	
//	        if(size.width < 1 && size.height < 1){ // display none?
//	            return;
//	        }
	
	        var w = size.width - target.getPadding('lr') - this.scrollOffset,
	            h = size.height - target.getPadding('tb'),
	            pw = w;
	
	        for(i = 0; i < len; i++){
	            c = cs[i];
	            if(!c.columnWidth){
	                pw -= (c.getSize().width + c.getEl().getMargins('lr'));
	            }
	        }
	
	        pw = pw < 0 ? 0 : pw;
	
	        for(i = 0; i < len; i++){
	            c = cs[i];
	            if(c.columnWidth){
	                c.setWidth(Math.floor(c.columnWidth*pw) - c.getEl().getMargins('lr'));
	            }
	        }
	        
	        //defer for IE6
	        (function() {
		        var size = target.getViewSize();
		        var h = size.height - target.getPadding('tb');
		        
		        for(i = 0; i < len; i++){
		            c = cs[i];
		            
		            var heightValue = c.el.getStyle('height');
		            if ( heightValue != '100%' /*&& heightValue != 'auto'*/) c.setHeight(h - c.getEl().getMargins('tb'));
		        }
	        }).defer(1, this);
	        
	    }
	
	}); //eof extend
	Ext.Container.LAYOUTS['columnfit'] = Ext.ux.layout.ColumnFit;

}); //eof use
