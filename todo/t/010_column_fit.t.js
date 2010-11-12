StartTest(function(t) {
    
    t.plan(8)
    
    var async0 = t.beginAsync()
    
    use([ 'ExtX.Layout.ColumnFit', 'ExtX.Layout.NBSP' ], function () {

        Ext.onReady(function () {
        
            var cont = new Ext.Container({
                slots : true,
                
                width   : 1020,
                height  : 520,
                
                style : 'padding : 10px',
                
                layout : 'columnfit',
                
                items : [
                    {
                        xtype : 'nbsp',
                        slot : 'left',
                        
                        width : 100,
                        height : 50,
                        
                        style : 'margin : 10px; background-color : green'
                    },
                    {
                        xtype : 'nbsp',
                        slot : 'center',
                        
                        style : 'background-color : yellow',
                        
                        width : '100%',
                        height : 50
                    },
                    {
                        xtype : 'nbsp',
                        slot : 'right',
                        
                        style : 'background-color : blue',
                        
                        width : 100,
                        height : '100%'
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
            
            var leftEl   = cont.slots.left.getEl()
            var leftSize = leftEl.getViewSize()
            
            t.ok(leftSize.width == 100, 'left column was sized correctly - width')
            t.ok(leftSize.height == 480, 'left column was sized correctly - height')
            
//            t.ok(leftEl.getLeft() == 20, 'left column was positioned correctly - left')
//            t.ok(leftEl.getTop() == 20, 'left column was positioned correctly - top')

            
            //==================================================================================================================================================================================
            t.diag("Checking layout - center column")
            
            var centerEl   = cont.slots.center.getEl()
            var centerSize = centerEl.getViewSize()
            
            t.ok(centerSize.width == 780, 'center column was sized correctly - width')
            t.ok(centerSize.height == 500, 'center column was sized correctly - height')
            
//            t.ok(centerEl.getLeft() == 130, 'center column was positioned correctly - left')
//            t.ok(centerEl.getTop() == 10, 'center column was positioned correctly - top')
            
            //==================================================================================================================================================================================
            t.diag("Checking layout - right column")
            
            var rightEl   = cont.slots.right.getEl()
            var rightSize = rightEl.getViewSize()
            
            t.ok(rightSize.width == 100, 'right column was sized correctly - width')
            t.ok(rightSize.height == 500, 'right column was sized correctly - height')
            
            t.endAsync(async0)
        })
    
    })
    
    
})