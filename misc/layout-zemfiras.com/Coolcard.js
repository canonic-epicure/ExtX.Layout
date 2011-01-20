declare( 'Ext::ux::layout::Coolcard', function (use,checkState,__PACKAGE__) {

	Ext.ux.layout.Coolcard = Ext.extend(Ext.layout.CardLayout, {
	    
	    actionsQueue : undefined,
	    
	    constructor: function(config) {        
	        var outFx = {
	            method : 'raw',
	            anchor : 't',
	            
	            easing: 'easeOut',
	            duration: 0.6,
	            remove: false,
	            useDisplay: true
	        };
	        
	        var inFx = {
	            method : 'raw',
	            anchor : 'b',
	            
	            easing: 'easeOut',
	            duration: 0.8,
	            remove: false,
	            useDisplay: false
	        };
	        
	        this.actionsQueue = [];
	        
	        if (!config) config = {};
	        if (!config.outFx) config.outFx = {};
	        if (!config.inFx) config.inFx = {};
	        
	        Ext.applyIf(config.outFx,outFx);
	        Ext.applyIf(config.inFx,inFx);
	        
	        Ext.ux.layout.Coolcard.superclass.constructor.call(this, config);
	    },
	    
	    
	    setActiveItem: function(item,outFx,inFx){
	        if (!outFx) outFx = {};
	        if (!inFx) inFx = {};
	
	        var cfg = {};
	
	        cfg.item = item;        
	        cfg.outFx = Ext.applyIf(outFx,this.outFx);
	        cfg.inFx = Ext.applyIf(inFx,this.inFx);
	        
	        this.actionsQueue.push(cfg);
	        
	        if (this.actionsQueue.length == 1) {
	            this.setActiveItemInternal();
	        }
	    },
	    
	    processQueue : function(){
	        this.actionsQueue.shift();
	        if (this.actionsQueue.length > 0) {
	            this.setActiveItemInternal.defer(1,this);
	        }
	    },
	    
	    applyEffect : function (el,config) {
	        var params = [];
	        
	        if (config.method == 'raw') {
	            if (config.callback) {
	            	config.callback.call(config.scope);
	            }
	            return;
	        }
	        
	        if ( config.method == 'slideIn' || config.method == 'slideOut' || config.method == 'ghost') {
	            params.push(config.anchor);
	        }
	        params.push(config);
	        el[config.method].apply(el,params);
	    },
	    
	    setActiveItemInternal : function(){
	        var item = this.actionsQueue[0];
	        var outFx = item.outFx;
	        var inFx = item.inFx;
	        item = item.item;
	        
	        item = this.container.getComponent(item);
	        if ( this.activeItem != item ) {
	            
	            var ai = this.activeItem;
//	            var clipped_out = null;
//	            var clipped_in = null;
	
	            if(ai){
	                var aiIndex = this.container.items.indexOf(ai);
	                
//	                this.container.remove(ai,false);
	                this.container.items.remove(ai);
	                
//	                clipped_out = ai.getEl().select('div{overflow-y=scroll}',true);
//	                clipped_out.clip();
//	                
//	                clipped_in = item.getEl().select('div{overflow-y=scroll}',true);
//	                clipped_in.clip();
	
	                if (outFx.method != 'raw') {
	                
		                var outLayer = Ext.getBody().createChild({
			            	tag : 'div',
			            	cls : 'x-background-underlay'
			            });
			            
//			            outLayer.applyStyles({
//			            	'z-index' : 
//			            });
		                
		                outLayer.alignTo(ai.getEl(),'tl-tl');
		                outLayer.appendChild(ai.getEl());
		                
		                this.applyEffect(outLayer,outFx);
	                } else {
	                	ai.hide();
	                } 
	                
	            }
	            
	            this.activeItem = item;

	            item.show();

	            this.layout();
	            
	            if (item.doLayout) item.doLayout();
	            
	            inFx.scope = this;
                inFx.callback = function () {
                    
                    if (ai) {
                    	ai.hide();
                    	
//                    	this.container.add(ai);
                    	this.container.items.insert(aiIndex, ai);
                    	
//                    	this.container.getEl().appendChild(ai.getEl());
                    	if (outFx.method != 'raw') {
                    		this.container.getLayoutTarget().appendChild(ai.getEl());
                    		outLayer.remove();
                    	}
                    }
                    
                    this.processQueue();
                };
                
                this.applyEffect(item.getEl(),inFx);                
	            
	            
//	            if (alreadyPresent) {
//	                
//	                var cb = function () {
////	                    clipped_out.unclip();
////	                    clipped_in.unclip();
////	                    ai.hide();
//	                    this.container.add(ai);
//						
//						//нужно после unclip в частности для тумбнэйлов
////						if (item.doLayout) item.doLayout();
//	                    
//	                    ai.hide();
//	                    this.container.getEl().appendChild(ai.getEl());
//	                    
//	                    if (outFx.method != 'raw') outLayer.remove();
//	                    
//	                    this.processQueue();
//	                };
//	                
//	                inFx.scope = this;
//	                inFx.callback = cb;
//	                
//	                this.applyEffect(item.getEl(),inFx);                
//	                
//	            } else {
//	                this.processQueue();
//	            }
	        } else {
	            this.processQueue();
	        }
	        
	    },
	    

	    setContainer : function(ct){
	    	Ext.ux.layout.Coolcard.superclass.setContainer.call(this, ct);
	    	
	        ct.on('beforeadd', this.setupItem, this);
	    },
	    
	    
	    setupItem : function (cont, comp, index) {
	    	if (cont.items.items.length) {
	    		comp.hidden = true;
	    	}
	    },

	    
        onLayout : function(ct, target){
	        Ext.layout.FitLayout.superclass.onLayout.call(this, ct, target);
	        if(!this.container.collapsed){
	            var item = this.activeItem || ct.items.itemAt(0);
	            
	            if (item) {
		            var size = target.getViewSize();
		            size.width -= target.getPadding('lr') + item.getEl().getMargins('lr');
		            size.height -= target.getPadding('tb') + item.getEl().getMargins('tb');
		            
		            this.setItemSize(item, size);
	            }
	        }
	    }

	
	}); //eof extend
	Ext.Container.LAYOUTS['coolcard'] = Ext.ux.layout.Coolcard;

}); //eof use
