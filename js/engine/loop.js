var timeFPS,
    fps,
    drawFPS = true;
function animate() {
    // Request new frame if allowed
    if(Engine.allowRender) requestAnimFrame( animate );
    
    // Short vars
    var c = Engine.fullMap;
    var x = Engine.player.x;
    var y = Engine.player.y;
    
    
    // Walk keys
    Engine.walk(keyCodes.w, 1);
    Engine.walk(keyCodes.s, 3);
    Engine.walk(keyCodes.a, 0);
    Engine.walk(keyCodes.d, 2);
    
    
    // e = search wall, pick up item
    if(pressedKeys[keyCodes.e]){
        onAction(x,   y-1, 1);
        onAction(x,   y+1, 3);
        onAction(x+1, y, 2);
        onAction(x-1, y, 0);
        
        pressedKeys[keyCodes.e] = false;
        
        if(typeof Engine.fullMap[x][y].block_id.onActionOver === 'function') Engine.fullMap[x][y].block_id.onActionOver.bind(Engine.fullMap[x][y])();
        if(typeof Engine.fullMap[x][y].block_id.onUseOver === 'function') Engine.fullMap[x][y].block_id.onUseOver.bind(Engine.fullMap[x][y])();
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