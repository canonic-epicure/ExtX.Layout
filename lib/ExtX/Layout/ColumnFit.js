Class('ExtX.Layout.ColumnFit', {
    
    meta : JooseX.Bridge.Ext,
    
    isa : Ext.layout.ColumnLayout,
    
    methods : {
        
        onLayout : function (container, target) {
            
            if (!this.innerCt) {
                target.addClass('x-column-layout-ct')
                
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
            
            var percentageSum = 0
            
            var integerRegex        = /\d+/
            var percentageRegex     = /(\d+)\%/
            
            container.items.each(function (component) {
                var match = percentageRegex.exec(component.width)
                
                if (match) percentageSum += parseInt(match[1])
                
                if (integerRegex.test(component.width)) freeWidth -= component.getSize().width + component.getEl().getMargins('lr')
            })
            
    
            freeWidth = freeWidth < 0 ? 0 : freeWidth
            
            container.items.each(function (component) {
                var match = percentageRegex.exec(component.width)
                
                if (match) {
                    var percent = parseInt(match[1]) / percentageSum
                    
                    component.setWidth(Math.floor(percent * freeWidth) - component.getEl().getMargins('lr'))
                }
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
    },
    
    
    body : function () {
        Ext.Container.LAYOUTS['columnfit'] = ExtX.Layout.ColumnFit    
    }
})

	
