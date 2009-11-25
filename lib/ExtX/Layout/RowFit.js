Class('ExtX.Layout.RowFit', {
    
    meta : JooseX.Bridge.Ext,
    
    isa : Ext.layout.ContainerLayout,
    
    has : {
        initialPass : true
    },
    
    
    methods : {
        
        onLayout : function (container, target) {
            if (this.initialPass) {
                this.initialPass = false
                
                target.createChild({ cls : 'x-clear'})
            }
            
            this.renderAll(container, target)
            
            if (!this.container.isVisible()) return
            
            var size = target.getViewSize()
            
            
            var height  = size.height - target.getPadding('tb')
            
            var freeHeight = height
            
            var integerRegex        = /^\d+$/
            var percentageRegex     = /^(\d+)\%$/
            var noHeightGiven       = 0
            
            
            container.items.each(function (component) {
                if (integerRegex.test(component.height)) freeHeight -= component.getSize().height + component.getEl().getMargins('tb')
                
                if (!component.height) noHeightGiven++
            })
            
    
            freeHeight = freeHeight < 0 ? 0 : freeHeight
            
            var allocatedHeight = 0
            
            container.items.each(function (component) {
                var match = percentageRegex.exec(component.height)
                
                if (match) {
                    var percent = parseInt(match[1]) / 100
                    
                    var componentHeight = Math.floor(percent * freeHeight) - component.getEl().getMargins('tb')
                    
                    component.setHeight(componentHeight)
                    
                    allocatedHeight += componentHeight
                }
            })
            
            freeHeight -= allocatedHeight
            
            container.items.each(function (component) {
                if (!component.height) component.setHeight(Math.floor(freeHeight / noHeightGiven) - component.getEl().getMargins('tb'))
            })
        },
        
        
        isValidParent : function (c, target){
            return target && c.getDomPositionEl().parent().hasClass('x-rowfit-layout-row')
        },
        
        
        //adds a wrapping 'div' element for each child component, to prevent margins collapse
        renderItem : function (component, position, target) {
            if (!component.rendered) {
                if (typeof position == 'number') position = target.dom.childNodes[position]
    
                var box = document.createElement('div')
                var extBox = Ext.get(box).addClass('x-rowfit-layout-row')
                
                target.dom.insertBefore(box, position || null)
                
                this.SUPER(component, null, extBox)
            } else
                this.SUPERARG(arguments)
        }
        
    }
})


Ext.Container.LAYOUTS['rowfit'] = ExtX.Layout.RowFit