var timeFPS,
    fps,
    drawFPS = true;
function animate() {
    // Request new frame if allowed
    if(Engine.allowRender) requestAnimFrame( animate );
    
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
    
    if(!pressedKeys[keyCodes.w] && !pressedKeys[keyCodes.s] &&  !pressedKeys[keyCodes.a] &&  !pressedKeys[keyCodes.d]){
        //Engine.player.isWalking = false;
    }
    
    if(!Engine.player.isWalking){
        Engine.player.x = Math.round(Engine.player.x);
        Engine.player.y = Math.round(Engine.player.y);
    }
    
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
    
    // Render Game
    Engine.Render();
    
    // FPS calc
    var delta = (Date.now() - timeFPS)/1000;
    timeFPS = Date.now();
    fps = 1/delta;
   
    if(drawFPS) Engine.drawFPS(fps);
}