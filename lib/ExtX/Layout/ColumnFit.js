Class('ExtX.Layout.ColumnFit', {
    
    isa : Ext.layout.ColumnLayout,
    
    
    has : {
        extraCls    : 'x-columnfit-column'
    },
    
    
    methods : {
        
        onLayout : function (container, target) {
            
            if (!this.innerCt) {
                target.addClass('x-columnfit-layout-ct')
                
                // the innerCt prevents wrapping and shuffling while the container is resizing
                this.innerCt = target.createChild({ cls : 'x-columnfit-inner' })
                
                this.innerCt.createChild({ cls : 'x-clear'})
            }
            
            this.renderAll(container, this.innerCt)
            
            if (!this.container.isVisible()) return
            
            
            var size = target.getViewSize()
            
            
            var width   = size.width - target.getPadding('lr') - this.scrollOffset
            var height  = size.height - target.getPadding('tb')
            var freeWidth = width
            
            var noWidthGiven = 0
            
            var integerRegex        = /\d+$/
            var percentageRegex     = /(\d+)\%/
            
            container.items.each(function (component) {
                if (integerRegex.test(component.width)) freeWidth -= component.getSize().width + component.getEl().getMargins('lr')
                
                if (!component.width) noWidthGiven++
            })
            
    
            freeWidth = freeWidth < 0 ? 0 : freeWidth
            
            var allocatedWidth = 0
            
            container.items.each(function (component) {
                var match = percentageRegex.exec(component.width)
                
                if (match) {
                    var percent = parseInt(match[1]) / 100
                    
                    var componentWidth = Math.floor(percent * freeWidth) - component.getEl().getMargins('lr')
                    
                    component.setWidth(componentWidth)
                    
                    allocatedWidth += componentWidth
                }
            })
            
            freeWidth -= allocatedWidth
            
            container.items.each(function (component) {
                if (!component.width) component.setWidth(Math.floor(freeWidth / noWidthGiven) - component.getEl().getMargins('lr'))
            })
            
            
            var cont = function() {
                var size = target.getViewSize()
                var height = size.height - target.getPadding('tb')
                
                container.items.each(function (component) {
                    var heightByStyle = component.el.getStyle('height')
                    
                    if (heightByStyle != '100%') component.setHeight(height - component.getEl().getMargins('tb'))
                })
            }
            
            if (Ext.isIE6)
                cont.defer(1)
            else
                cont()
        }
    }
})

	
Ext.Container.LAYOUTS['columnfit'] = ExtX.Layout.ColumnFit