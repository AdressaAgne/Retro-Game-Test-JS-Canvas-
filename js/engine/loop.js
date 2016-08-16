var timeFPS,
    fps,
    drawFPS = true;
function animate() {
    // Request new frame if allowed
    if(Engine.allowRender) requestAnimFrame( animate );
    Engine.ImageSmoothing(false);
    Engine.outputCtx.clearRect(0, 0, Engine.outputCanvas.width, Engine.outputCanvas.height);
    
    if(Engine.renderMenu) {
        
        if(pressedKeys[keyCodes.w]){
            if(Engine.menu.selectedButton > 0){
                Engine.menu.selectedButton--;
            } else {
                Engine.menu.selectedButton = Engine.menu.buttons.length-1;
            }
            pressedKeys[keyCodes.w] = false;
            Engine.dialogOpen = false;
        }
        
        if(pressedKeys[keyCodes.s]){
            if(Engine.menu.selectedButton < Engine.menu.buttons.length-1){
                Engine.menu.selectedButton++;
            } else {
                Engine.menu.selectedButton = 0;
            }
            
            pressedKeys[keyCodes.s] = false;
            Engine.dialogOpen = false;
        }
        
        if(pressedKeys[keyCodes.enter]){
            Engine.menu.buttons[Engine.menu.selectedButton].press();
            pressedKeys[keyCodes.enter] = false;
        }
        
        if(pressedKeys[keyCodes.esc]){
            Engine.dialogOpen = false;
        }
            
        Engine.RenderMenu();
        
        if(Engine.dialogOpen){
            Engine.drawDialog();
        }
        return;
    }
    
    if(Engine.renderMapSelector) {
        if(pressedKeys[keyCodes.esc]){
            Engine.renderMenu = true;
            Engine.renderMapSelector = false;
        }
        
        if(pressedKeys[keyCodes.w]){
            if(Engine.selectedMap > 0){
                Engine.selectedMap--;
            } else {
                Engine.selectedMap = Engine.selecableMaps-1;
            }
            
            pressedKeys[keyCodes.w] = false;
        }
        
        if(pressedKeys[keyCodes.s]){
            if(Engine.selectedMap < Engine.selecableMaps-1){
                Engine.selectedMap++;
            } else {
                Engine.selectedMap = 0;
            }
            
            pressedKeys[keyCodes.s] = false;
        }
        
        if(pressedKeys[keyCodes.enter]){
            Engine.wipeInvetory();
            Engine.LoadNewMap(Engine.selectedMap);
            Engine.renderMenu = false;
            Engine.renderMapSelector = false;
            pressedKeys[keyCodes.enter] = false;
        }
        
        Engine.RenderMapSelector();
        return;
    }
    
    // Short vars
    var c = Engine.fullMap;
    var cords = Engine.GetPlayerCords();
    var x = cords.x;
    var y = cords.y;
    
    // Walk keys
    Engine.walk(keyCodes.w, 1, Engine.walkingDist);
    Engine.walk(keyCodes.s, 3, Engine.walkingDist);
    Engine.walk(keyCodes.a, 0, Engine.walkingDist);
    Engine.walk(keyCodes.d, 2, Engine.walkingDist);
    
    
    // E = search wall, pick up item
    if(pressedKeys[keyCodes.e]){
        onAction(x,   y-1, 1);
        onAction(x,   y+1, 3);
        onAction(x+1, y, 2);
        onAction(x-1, y, 0);
        
        pressedKeys[keyCodes.e] = false;
        var bID = Engine.fullMap[x][y];
        
        //Trigger onActionOver and onActionUse
        if(typeof bID.block_id.onActionOver === 'function') bID.block_id.onActionOver.bind(bID)();
        if(typeof bID.block_id.onUseOver === 'function') bID.block_id.onUseOver.bind(bID)();
        
        // canPickUp function
        if(typeof bID.block_id.canPickUp !== 'undefiend'){
            if(bID.block_id.canPickUp) if(Engine.addToInvetory(bID.block_id)) bID.block_id = ItemsList.dirt;
        }
    }
    
    // Q = Use inventory Item
    if(pressedKeys[keyCodes.q]){
        onUse(x,   y-1, 1);
        onUse(x,   y+1, 3);
        onUse(x+1, y, 2);
        onUse(x-1, y, 0);
        pressedKeys[keyCodes.q] = false;
    }
    
    // Invetory Slot keys
    if(pressedKeys[keyCodes.n0]) Engine.selectedInvetorySlot = 9;
    
    for(var slot = 0; slot < 10; slot++){
        if(pressedKeys[keyCodes['n'+(slot+1)]]) Engine.selectedInvetorySlot = slot;
    }
    
    // Debugging
    if(pressedKeys[keyCodes.o]) {
        Engine.debug.showPlayerBox = !Engine.debug.showPlayerBox;
        pressedKeys[keyCodes.o] = false;
    }
    if(pressedKeys[keyCodes.i]) {
        Engine.debug.showPlayerCords = !Engine.debug.showPlayerCords;
        pressedKeys[keyCodes.i] = false;
    }
    
    // Render Game
    Engine.Render();
    
    // FPS calc
    var delta = (Date.now() - timeFPS)/1000;
    timeFPS = Date.now();
    fps = 1/delta;
   
    if(drawFPS) Engine.drawFPS(fps);
    Engine.DrawToScreen();
    if(Engine.debug.showPlayerCords){
        Engine.RenderText("#ffffff", "X: " + cords.x + "("+Engine.player.x.toFixed(1)+"), Y:" +cords.y + "("+Engine.player.y.toFixed(1)+")", 1 ,1);
    }
    //GUI Render
    Engine.RenderGUI();
    
    if(pressedKeys[keyCodes.esc]){
        Engine.renderMenu = true;
    }
    
    if(pressedKeys[keyCodes.r]){
        Engine.LoadNewMap(Engine.currentMapNr);
        Engine.wipeInvetory();
    }
    
    
}