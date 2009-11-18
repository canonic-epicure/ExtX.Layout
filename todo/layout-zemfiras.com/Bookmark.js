declare( 'Ext::ux::layout::Bookmark', function (use,checkState,__PACKAGE__) {

	use('Ext::ux::layout::Thumbnail', function (){
		
		Ext.ux.layout.Bookmark = Ext.extend(Ext.ux.layout.Thumbnail, {
		    
		    scrollDirection : 'horizontal',
		    
		    bookmarkHeight : 26,
		    minBookmarkWidth : 52,
		    maxBookmarkWidth : 200,
			
		    
		    computeThumbnailSize : function (thumbnails, ctWidth, ctHeight) {
	            this.thumbnailHeight = this.bookmarkHeight;
	            
	            var thumbnailsCount = thumbnails.length;
	            
	            var rowNum = Math.floor(ctHeight / this.thumbnailHeight);
	            var colNum = Math.ceil(thumbnailsCount / rowNum);
	            
	            this.thumbnailWidth = Math.floor(ctWidth / colNum);
	            
	            if (this.thumbnailWidth < this.minBookmarkWidth) this.thumbnailWidth = this.minBookmarkWidth;
	            if (this.thumbnailWidth > this.maxBookmarkWidth) this.thumbnailWidth = this.maxBookmarkWidth;
	            
	            for (var i = 0; i < thumbnails.length; i++) {
	            	thumbnails[i].setSize(this.thumbnailWidth, this.thumbnailHeight);
	            }
		    },
		    
		    
		    getLeftTop : function (i, ctWidth, ctHeight, colNum, rowNum) {
		    	var res = { left : 0, top : 0 };
		    	
		    	var col = Math.floor( i / rowNum );
		    	var row = i % rowNum;
		    	
	    		res.left = Math.round( this.thumbnailWidth * col );
		    	
		    	if (ctHeight > this.thumbnailHeight * rowNum) {
		    		res.top = Math.round( (ctHeight / rowNum) * row + (ctHeight / rowNum - this.thumbnailHeight) / 2 );
		    	} else {
		    		res.top = Math.round( this.thumbnailHeight * row );
		    	}
		    	
		    	return res;
		    }
		
        
		}); //eof extend
		
		Ext.Container.LAYOUTS['bookmark'] = Ext.ux.layout.Bookmark;
		
	}); //eof use
	
}); //eof declare