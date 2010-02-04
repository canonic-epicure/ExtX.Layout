Class('ExtX.Layout.CenterHorizontally', {
    
    meta : JooseX.Bridge.Ext,
    
    isa : Ext.layout.ContainerLayout,
    
    has : {
        targetCls       : 'x-center-h-layout-ct',
        
        extraCls        : 'x-center-h-layout-child'
    }
    
})


Ext.Container.LAYOUTS['centerh']                = ExtX.Layout.CenterHorizontally
Ext.Container.LAYOUTS['center-h']               = ExtX.Layout.CenterHorizontally
Ext.Container.LAYOUTS['center-horizontally']    = ExtX.Layout.CenterHorizontally
