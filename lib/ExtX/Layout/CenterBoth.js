Class('ExtX.Layout.CenterBoth', {
    
    meta : JooseX.Bridge.Ext,
    
    isa : Ext.layout.ContainerLayout,
    
    has : {
        initialPass         : true
    },
    
    
    methods : {
        

        onLayout : function (ct, target) {
            this.SUPER(ct, target)
            
            if (this.initialPass) {
                this.initialPass = false
                
                target.addClass('x-center-layout-ct')
            }
            
            if (!ct.items.getCount()) return
            
            var childEl = ct.items.itemAt(0).getEl()
            

            childEl.addClass('x-center-layout-child')
            
            childEl.applyStyles({
                top : (
                    Math.round( (target.getHeight() - childEl.getHeight()) /2 ) 
                ) + 'px',
                left : (
                    Math.round( (target.getWidth() - childEl.getWidth()) /2 ) 
                ) + 'px'
            })
        }
        
    }
})


Ext.Container.LAYOUTS['center-both'] = ExtX.Layout.CenterBoth
