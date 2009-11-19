Class('ExtX.Layout.NBSP', {
    
    isa : Ext.Container,
    
    xtype : 'nbsp',
    
    after : {
        
        onRender : function () {
            this.el.update('&nbsp;')
        }
    }
    
})

	
