Class('ExtX.Layout.RowFit', {
    
    meta : JooseX.Bridge.Ext,
    
    isa : Ext.layout.ContainerLayout,
    
    methods : {
        
        onLayout : function (container, target) {
            
            this.renderAll(container, this.innerCt)
            
            if (!this.container.isVisible()) return
            
            var size = target.getViewSize()
            
            
            var height  = size.height - target.getPadding('tb')
            
            var freeHeight = height
            
            var integerRegex        = /^\d+$/
            var percentageRegex     = /^(\d+)\%$/
            var noHeightGiven       = 0
            
            
            container.items.each(function (component) {
                if (integerRegex.test(component.height)) freeHeight -= component.getSize().width + component.getEl().getMargins('tb')
                
                if (!component.height) noHeightGiven++
            })
            
    
            freeHeight = freeHeight < 0 ? 0 : freeHeight
            
            container.items.each(function (component) {
                var match = percentageRegex.exec(component.height)
                
                if (match) {
                    var percent = parseInt(match[1]) / 100
                    
                    var componentHeight = Math.floor(percent * freeHeight) - component.getEl().getMargins('tb')
                    
                    component.setHeight(componentHeight)
                    
                    freeHeight -= componentHeight
                }
            })
            
            container.items.each(function (component) {
                if (!component.height) component.setHeight(Math.floor(freeHeight / noHeightGiven))
            })
        }
    },
    
    
    body : function () {
        Ext.Container.LAYOUTS['rowfit'] = ExtX.Layout.RowFit    
    }
})

    
