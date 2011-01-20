StartTest(function(t) {
    
    t.plan(8)
    
    var async0 = t.beginAsync()
    
    use([ 'ExtX.Layout.RowFit', 'ExtX.Layout.NBSP' ], function () {

        Ext.onReady(function () {
        
            var cont = new Ext.Container({
                slots : true,
                
                style : 'padding : 10px',
                
                layout : 'rowfit',
                
                width : 1020,
                height : 520,
                
                layout : 'rowfit',
                
                items : [
                    {
                        xtype : 'nbsp',
                        slot : 'header',
                        
                        height : 100,
                        
                        style : 'margin : 10px; background-color : green'
                    },
                    {
                        xtype : 'nbsp',
                        slot : 'center',
                        
                        style : 'margin : 10px; background-color : yellow'
                    },
                    {
                        xtype : 'nbsp',
                        slot : 'footer',
                        
                        style : 'background-color : blue',
                        
                        height : 100
                    }
                ],
                
                renderTo : Ext.getBody()
            })
            
            //==================================================================================================================================================================================
            t.diag("Sanity")
            
            t.ok(cont && cont.el.dom, 'Wrapping container was instantiated and rendered')

            t.ok(cont.items.getCount() == 3, 'And it has 3 child components')
            
            
            //==================================================================================================================================================================================
            t.diag("Checking layout - left column")
            
            var headerEl   = cont.slots.header.getEl()
            var headerSize = headerEl.getViewSize()
            
            t.ok(headerSize.width == 980, 'header row was sized correctly - width')
            t.ok(headerSize.height == 100, 'header row was sized correctly - height')
            
            
            //==================================================================================================================================================================================
            t.diag("Checking layout - center column")
            
            var centerEl   = cont.slots.center.getEl()
            var centerSize = centerEl.getViewSize()
            
            t.ok(centerSize.width == 980, 'center row was sized correctly - width')
            t.ok(centerSize.height == 260, 'center row was sized correctly - height')
            
            //==================================================================================================================================================================================
            t.diag("Checking layout - right row")
            
            var footerEl   = cont.slots.footer.getEl()
            var footerSize = footerEl.getViewSize()
            
            t.ok(footerSize.width == 1000, 'footer row was sized correctly - width')
            t.ok(footerSize.height == 100, 'footer row was sized correctly - height')
            
            t.endAsync(async0)
        })
    
    })
    
    
})