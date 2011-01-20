declare( 'Ext::ux::layout::Center', function (use,checkState,__PACKAGE__) {

	Ext.ux.layout.Center = Ext.extend(Ext.layout.ContainerLayout, {
	    
		childSelector : undefined,
		
		
	    setContainer : function(ct){
	        Ext.ux.layout.Thumbnail.superclass.setContainer.call(this, ct);
	        
	        ct.ownerCt.on('afterlayout', this.doLayout, this);
	    },
	    

	    doLayout : function () {
	    	var target = this.container.getLayoutTarget();
	    	
	    	target.addClass('x-center-layout-ct');
	    	
	    	var height = target.getHeight();
	    	
	    	var child;
	    	
	    	if (this.childSelector) {
	    		child = target.child(this.childSelector);
	    	}
	    	
	    	if (!child) {
	    		child = this.container.items.itemAt(0);
	    		if (child) child = child.getEl();
	    	}
	    	
	    	if (!child) return;
	    	
//	    	child.center(target);
	    	
	    	child.addClass('x-center-layout-child');
	    	child.applyStyles({
				top : (
					Math.round( (target.getHeight() - child.getHeight()) /2 ) 
				) + 'px',
				left : (
					Math.round( (target.getWidth() - child.getWidth()) /2 ) 
				) + 'px'
			});
	    }
	
	}); //eof extend
	
	Ext.Container.LAYOUTS['center'] = Ext.ux.layout.Center;
    
}); //eof declare