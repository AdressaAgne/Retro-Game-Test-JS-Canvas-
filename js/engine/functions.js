function onAction(x, y, direction){
    
    if(direction !== Engine.facing) return;

    if(typeof Engine.fullMap[x][y].block_id.onAction !== 'function') return;
    
    Engine.fullMap[x][y].block_id.onAction.bind(Engine.fullMap[x, y])();
    Engine.fullMap[x][y].isSearched = true;
}

function onUse(x, y, direction){
    
    if(direction !== Engine.facing) return;
    
    if(Engine.invetory.length == 0) return;
    
    if(typeof MapObjects[Engine.invetory[Engine.selectedInvetorySlot].uuid].onUse !== 'undefined'){
        var id = Engine.invetory[Engine.selectedInvetorySlot].uuid;
        
        MapObjects[id].onUse.bind(Engine.fullMap[x][y])();  
    } 
}

function updatePosition(x, y, isOnSpot){
    if(typeof Engine.fullMap[x][y].block_id.onWalkOver === 'function' && isOnSpot){
        Engine.fullMap[x][y].block_id.onWalkOver.bind(Engine.fullMap[x][y])(); 
        
        
    } else if(typeof Engine.fullMap[x][y].block_id.onSolidHit === 'function' && !isOnSpot){
        Engine.fullMap[x][y].block_id.onSolidHit.bind(Engine.fullMap[x][y])(); 
    }
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function baseName(str){
   var base = new String(str).substring(str.lastIndexOf('/') + 1); 
    if(base.lastIndexOf(".") != -1)       
        base = base.substring(0, base.lastIndexOf("."));
   return base;
}
function rng(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}