declare('Ext::ux::layout::Slide', function (){

	Ext.ux.layout.Slide = Ext.extend(Ext.layout.FitLayout, {
	    
	    deferredRender : false,
	    
	    renderHidden : false,
	    easing: 'none',
	    duration: .5,
	    opacity: 1,
		activeItemNo : 0,
		
		
	    setContainer : function(ct){
	        Ext.ux.layout.Slide.superclass.setContainer.call(this, ct);
	        
	        ct.addEvents('activeitemchanged');
	    },


	    onLayout : function (ct, target) {
			Ext.ux.layout.Slide.superclass.onLayout.call(this, ct, target);
			
			if (ct.items.getCount() && !this.activeItem) {
				this.activeItem = ct.items.itemAt(0);
			}
		},
	    
	    
	    setActiveItem : function(itemInt){
	        if (typeof(itemInt) == 'string') { 
	        	itemInt = this.container.items.keys.indexOf(itemInt); 
	        } else if (typeof(itemInt) == 'object') { 
	        	itemInt = this.container.items.items.indexOf(itemInt); 
	        }
	        
	        var item = this.container.getComponent(itemInt);
	        
	        if (this.activeItem != item) {
	        	
	            if (this.activeItem) {
	            	
	                if(item && (!item.rendered || !this.isValidParent(item, this.container))){
	                    this.renderItem(item, itemInt, this.container.getLayoutTarget()); item.show();
	                }
	                var s = [this.container.body.getX() - this.container.body.getWidth(), this.container.body.getX() + this.container.body.getWidth()];
	                this.activeItem.el.shift({ duration: this.duration, easing: this.easing, opacity: this.opacity, x:(this.activeItemNo < itemInt ? s[0] : s[1] )});
	                item.el.setY(this.container.body.getY());
	                item.el.setX((this.activeItemNo < itemInt ? s[1] : s[0] ));
	                item.el.shift({ duration: this.duration, easing: this.easing, opacity: 1, x:this.container.body.getX()});
	            }
	            
	            this.activeItemNo = itemInt;
	            this.activeItem = item;
	            this.layout();
	            this.container.fireEvent('activeitemchanged', this.activeItem);
	        }
	    },
	
	    
	    renderAll : function(ct, target){
	        if(this.deferredRender){
	            this.renderItem(this.activeItem, undefined, target);
	        }else{
	            Ext.ux.layout.Slide.superclass.renderAll.call(this, ct, target);
	        }
	    }
	    
	}); //eof extend
	
	Ext.Container.LAYOUTS['slide'] = Ext.ux.layout.Slide; 

}); //eof declare 
