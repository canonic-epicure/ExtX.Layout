declare( 'Ext::ux::layout::Thumbnail', function (use,checkState,__PACKAGE__) {

	Ext.ux.layout.Thumbnail = Ext.extend(Ext.layout.ContainerLayout, {
	    
		thumbnailSelector : 'div.thumbnail',
			
        thumbnailWidth  : undefined,
        thumbnailHeight : undefined, 
		
		thumbnailsCount : undefined,
        
        scrollDirection : 'vertical', //horizontal
        
        columnNumCorrection : true,
        
        currentRawCap : undefined,
    	previosRawCap : undefined,
    	
    	disableSizing : false,
    	
    	extraCls: 'thumbnail',
    	
    	wheelCaptured : false,
    	
    	dynamicThumbnailSize : false,

		
    	constructor: function(config) {        
	        Ext.ux.layout.Thumbnail.superclass.constructor.call(this, config);
	        
	        this.previosRawCap = {
	        	cols : 0,
	        	rows : 0,
	        	count : 0
	        };
	    },
	    
	    
	    setContainer : function(ct){
	        Ext.ux.layout.Thumbnail.superclass.setContainer.call(this, ct);
	        
	        ct.addEvents('capacity');
	    },

	    // private
	    isValidParent : function(c, target){
	        return c.getEl().dom.parentNode == this.innerCt.dom;
	    },

		// private
	    onLayout : function(ct, target){

	    	if(!this.innerCt){
	            target.addClass('x-thumbnail-layout-ct');
	
	            // the innerCt prevents wrapping and shuffling while the container is resizing
	            this.innerCt = target.createChild({cls:'x-thumbnail-inner'});	            

	            this.innerCt.setStyle( { 'height' : '100%', width : '100%', position : 'relative' } );
	            
	            if (!this.wheelCaptured) {
	            	target.on('mousewheel', this.onMouseWheel, this);
	            	this.wheelCaptured = true;
	            }
	        }
	        this.renderAll(ct, this.innerCt);

	    	var innerCt = this.innerCt;
	    	
	    	if (!this.disableSizing) {
				if (this.scrollDirection == 'vertical') {
	                innerCt.setStyle( { 'overflow-y' : 'scroll', 'overflow-x' : 'hidden' } );
	            } else if (this.scrollDirection == 'horizontal') {
	                innerCt.setStyle( { 'overflow-x' : 'scroll', 'overflow-y' : 'hidden' } );
	            }
	    	}
            
            var thumbnails = ct.items.items;
			
			this.thumbnailsCount = thumbnails.length;
			
			if (!this.thumbnailsCount) return;
				
            for (var i = 0; i < this.thumbnailsCount; i++) {
            	if (thumbnails[i].items && thumbnails[i].items.items.length && !thumbnails[i].items.items[0].rendered) {
            		thumbnails[i].items.items[0].on('render', this.layout, this, { single : true });
            		break;
            	}
            }
            

            var targetWidth = innerCt.dom.clientWidth;
            var targetHeight = innerCt.dom.clientHeight;
            
            this.computeThumbnailSize(thumbnails, targetWidth, targetHeight);
            
            this.currentRawCap = this.getRawCapacity(innerCt);
            
            if (this.previosRawCap) {
                if (this.previosRawCap.count != this.currentRawCap.count) {
                    if ( ct.fireEvent('capacity',this.currentRawCap.count, this.previosRawCap.count) === false ) {
                    	this.previosRawCap = this.currentRawCap;
                    	return;
                    }
                }
            }
            
            this.previosRawCap = this.currentRawCap;
            
            
            //apply 
            var rawCap = this.currentRawCap;
            
            var rows, cols, i, j;
            
            if (this.scrollDirection == 'vertical') {
                cols = rawCap.cols;
                rows = this.getRowCol(null,cols);
                
                if ( (this.thumbnailsCount < cols) && this.columnNumCorrection ){
                    cols = this.thumbnailsCount;
                }
            } else if (this.scrollDirection == 'horizontal') {
                rows = rawCap.rows;
                cols = this.getRowCol(rows,null);
            }
            
            //applying stage
            for (i = 0; i < this.thumbnailsCount; i++) {
        		var thumb = thumbnails[i];
        		
        		var pos = this.getLeftTop(i, targetWidth, targetHeight, cols, rows);
        		
        		if (thumb instanceof Ext.Element) {
        			thumb.setLeftTop(pos.left, pos.top);
        		} else if (thumb instanceof Ext.BoxComponent) {
        			thumb.setPosition(pos.left, pos.top);
        		}
            }
	    },
	    
	    
	    computeThumbnailSize : function (thumbnails) {
            if (!this.dynamicThumbnailSize && this.thumbnailWidth && this.thumbnailHeight) return;
            
            var maxWidth = 0, maxHeight = 0;
            
            for (var i = 0; i < this.thumbnailsCount; i++) {
            	var width = thumbnails[i].getEl().getWidth();
            	var height = thumbnails[i].getEl().getHeight();
            	
            	if (width > maxWidth) maxWidth = width;
            	if (height > maxHeight) maxHeight = height;
            }
            
            this.thumbnailWidth = maxWidth;
            this.thumbnailHeight = maxHeight;
	    },
	    
	    
	    getLeftTop : function (i, width, height, colNum, rowNum) {
	    	var res = { left : 0, top : 0 };
	    	
	    	var row = Math.floor( i / colNum );
	    	var col = i % colNum;
	    	
	    	if (width > this.thumbnailWidth * colNum) {
	    		res.left = Math.round( (width / colNum) * col + (width / colNum - this.thumbnailWidth) / 2 );
	    	} else {
	    		res.left = Math.round( this.thumbnailWidth * col );
	    	}
	    	
	    	if (height > this.thumbnailHeight * rowNum) {
	    		res.top = Math.round( (height / rowNum) * row + (height / rowNum - this.thumbnailHeight) / 2 );
	    	} else {
	    		res.top = Math.round( this.thumbnailHeight * row );
	    	}
	    	
	    	return res;
	    },
		
        
        getRowCol : function (rows,cols) {
            if (rows) {
                return Math.ceil( this.thumbnailsCount / rows );
            };
            
            if (cols) {
                return Math.ceil( this.thumbnailsCount / cols );
            };
        },
        
		
		getRawCapacity : function (target) {
            var cap = {
                cols : Math.floor(target.dom.clientWidth / this.thumbnailWidth) || 1,
                rows : Math.floor(target.dom.clientHeight / this.thumbnailHeight) || 1
            };
            
            cap.count = cap.cols * cap.rows;
            
            return cap;
        },
        
        
        onMouseWheel : function (event, target, options) {
        	var delta = event.getWheelDelta();
        	
        	if (this.scrollDirection == 'horizontal') {
        		if ( this.innerCt.scroll( delta > 0 ? 'r' : 'l', 30) ) event.stopEvent();
        	}
        }
        
	
	}); //eof extend
	
	Ext.Container.LAYOUTS['thumbnail'] = Ext.ux.layout.Thumbnail;
    
}); //eof declare