'use strict';

// Setting up Request Animation Frame
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame    ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function (callback, element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

// Game Engine
var Engine = {
    
///////////////////////////////////
//      VARIABLES
///////////////////////////////////    
    
    canvas                  : document.getElementById('game'),
    ctx                     : document.getElementById('game').getContext('2d'),
    allowRender             : true,
    CurrentMap              : null,
    currentMapNr            : 0,
    fullMap                 : {},
    startMap                : 0,
// n * .5 of a block                
    fog                     : 4, 
    facing                  : 3,

// basically game tic 3 = 20tics/s,  10 = 6tics/s
    count                   : 0,
    maxCount                : 10, 
    
    invetory                : [],
    money                   : 0,
    selectedInvetorySlot    : 0,
    player                  : {
        animCount   : 0,
        x           : 0,
        y           : 0,
        isWalking   : false,
    },
    walkingDist             : .1,
    
    gui                     : {
        height      : (3 * 64), 
        width       : 0
    },
    
    Items           : {},
    
///////////////////////////////////
//      BASE FUNCTIONS
///////////////////////////////////

    Render : function(file){
        var data = this.CurrentMap;
        
        // Clear screen for redrawing
        Engine.ctx.clearRect(0, 0, (this.CurrentMap.width * 64), (this.CurrentMap.height * 64));

        this.ImageSmoothing(false);
        
        for (var x in this.fullMap) {
            if (!this.fullMap.hasOwnProperty(x)) continue;
            
            for (var y in this.fullMap[x]) {
                var item = this.fullMap[x][y];

                if(typeof item.block_id == 'undefined'){
                    console.log(item)
                    this.allowRender = false;
                }
                    if(item.block_id.type == 'player' || item.block_id.type == 'item' || item.block_id.type == 'creature') this.drawFromSprite(MapObjects['ffffff'], item.x, item.y);
                    
                    
                    if(typeof item.block_id.anim !== 'undefined'){

                        if(typeof item.animCount == 'undefined') item.animCount = rng(0, item.block_id.anim.length-3);
                        this.drawFromAnimSprite(item.block_id.anim[item.animCount], item.x, item.y);
                        
                        if(this.count == 0){
                            ++item.animCount;
                            if(item.animCount >= item.block_id.anim.length){
                                item.animCount = 0;
                            }
                        }
                        
                    } else {
                        this.drawFromSprite(item.block_id, item.x, item.y);
                        this.drawFromSprite(item.block_id, item.x, item.y);
                    }
                    
                    // Triggers every tic
                    if(typeof item.block_id.onRender == 'function'){ 
                       if(this.count == 0) item.block_id.onRender.bind(item)();
                    }
                    
                    //Triggers every frame
                    if(typeof item.block_id.onRenderFull == 'function'){
                       item.block_id.onRenderFull.bind(item)();
                    }
                    
            } // End Y axis
        } // End X axis
        
        //Player Render
        this.RenderPlayer(item);
        
        // Fog Render
        this.RenderFog();
        
        //GUI Render
        this.RenderGUI();
        
        this.count = this.count >= this.maxCount ? 0 : this.count+1;
    },
    
    ImageSmoothing : function(bool){
        this.ctx.mozImageSmoothingEnabled = bool;
        this.ctx.webkitImageSmoothingEnabled = bool;
        this.ctx.msImageSmoothingEnabled = bool;
        this.ctx.imageSmoothingEnabled = bool;
    },
    
    // Open a map, returns array[x][y]
    Open : function(Map){   
        this.allowRender = false;
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.width = Map.width;
        canvas.height = Map.height;
        this.canvas.width = (Map.width * 64) + this.gui.width;
        this.canvas.height = (Map.height * 64) + this.gui.height;
        ctx.drawImage(Map, 0, 0);
        
        var mapData = {
            width : Map.width,
            height : Map.height,
        };
        
        for(var x = 0; x < Map.width; x++){
            this.fullMap[x] = {};
            for(var y = 0; y < Map.height; y++){
                var rgb = ctx.getImageData(x, y, 1, 1).data;
                var color = rgbToHex(rgb[0], rgb[1], rgb[2]);
                var d = {'x' : x,
                         'y' : y,
                         'block_id' : MapObjects[color],
                         'color' : color
                        };
                if(color == 'ff0000') {
                    this.player.x = x;
                    this.player.y = y;
                    
                    var d = {'x' : x,
                         'y' : y,
                         'block_id' : MapObjects['ffffff'],
                         'color' : color
                        };
                    
                }
                
                this.fullMap[x][y] = d;
            }
        }
        // Switching blocks so its nicer
        for(var x = 0; x < Map.width; x++){
            for(var y = 0; y < Map.height; y++){
                var bID = this.fullMap[x][y];

                if(typeof bID.block_id.alternative3D !== 'undefined'){ // if block has alternative as edge
                    if(typeof this.fullMap[x][y+1] !== 'undefined'){ // if its not end of map
                        
                         if(this.fullMap[x][y+1].block_id.solid == false  || 
                            this.fullMap[x][y+1].block_id.name == 'water' ||
                            this.fullMap[x][y+1].block_id.name == 'lava') {
                            
                            this.fullMap[x][y].block_id = bID.block_id.alternative3D()[rng(0, bID.block_id.alternative3D().length-1)];   
                         }
                        
                    }
                } 
                
                if(typeof bID.block_id.alternative !== 'undefined'){ // if block has alternative
                    var blocks = bID.block_id.alternative();
                    blocks.push(bID.block_id);
                    bID.block_id = blocks[rng(0, blocks.length - 1)];
                } 
                
                
            }
        }
        
        
        this.allowRender = true;
        return mapData;
    },
    
    // texture loading
    init : function(){
        // setting base settings before map
        this.canvas.width = (16 * 64);
        this.canvas.height = (16 * 64);
        this.drawLoading('Loading... 0%');
        
        var t = Object.keys(texture).length;
        var i = 0;
        
        
        // Loading Textures
        for (var key in texture) {
            if (!texture.hasOwnProperty(key)) continue;
            var src = texture[key];
            
            // All textures links gets replaces with a Image() of the texture
            texture[key] = new Image();
            texture[key].src = src;
            
            // waiting for textures to load inn
            texture[key].onload = function(key) {
                i++;
                this.drawLoading('Loading... ' + parseInt(i / t * 100) + '% ('+key+')');
                if(i === t) {
                    this.fog = Maps[this.startMap].fog;
                    this.CurrentMap = this.Open(Maps[this.startMap].file);
                    // Calling Game Loop
                    animate();
                } 
            }.bind(this);
        }
    },
}
///////////////////////////////////
//      RENDER FUNCTIONS
///////////////////////////////////

Engine.RenderFog = function(){
    var w = this.CurrentMap.width;
    var h = this.CurrentMap.height;
    var x = this.player.x;
    var y = this.player.y;
    var fog = this.fog / 2;

    this.ctx.clearRect(0, 0, (w - (w - x) - fog) * 64, (h * 64));
    this.ctx.clearRect(0, 0, w * 64, (h - (h - y) - fog) * 64);
    this.ctx.clearRect(0, (h - (h - y - fog - 1)) * 64, w * 64, h * 64);
    this.ctx.clearRect((w - (w - x - fog - 1)) * 64, 0, w * 64, h * 64);
}

// Render Graphical User Interface / Full Inventory Screen
Engine.RenderGUI = function(){
    // Bronze: 1, Silver: 5, Gold: 10, Ruby: 25
    this.ctx.drawImage(texture.gui, 0, 0, 16*16, 3*16, 0 * 64, 16 * 64, 16*64, 3*64);

    this.drawFromSprite(this.RenderStill('cd6e28'), .5, 16.5);
    this.drawFromSprite(MapObjects['d13131'], (this.CurrentMap.width - 1.5), 16.5);
    this.drawFromSprite(MapObjects['d13131'], (this.CurrentMap.width - 2.5), 16.5);
    this.drawFromSprite(MapObjects['d13131'], (this.CurrentMap.width - 3.5), 16.5);
    
    this.RenderText('#f8f8f8', this.money, 1.5, 17.15);
    
    var slots = 10;
    for(var i = 0; i < slots; i++){ // texture, start x, start y, end x, end y, pos x, pos y, end size x, end size, y, 
        this.ctx.drawImage(texture.gui, 0, 3*16, 21, 21, 24 + i * 21*4 + (i * -4), 17.5*64 + 4, 94, 84);
    }

     this.ctx.drawImage(texture.gui, 21, 3*16, 23, 23, 19 + (this.selectedInvetorySlot * 92) + (this.selectedInvetorySlot * -11), 17.5*64, 92, 92);

    for(var i = 0; i < this.invetory.length; i++){ 
        this.drawToInventory(this.invetory[i], i);
    }
}

// Render player
Engine.RenderPlayer = function(){
    this.drawPlayer(this.player.x, this.player.y);
}
    
Engine.RenderStill = function(colorCode){
      
    if(typeof MapObjects[colorCode].anim[0] !== 'undefined') return MapObjects[colorCode].anim[0];

    return MapObjects[colorCode];

}
Engine.RenderText = function(color, text, x, y){
    this.ctx.fillStyle = color;
    this.ctx.font = "34px Verdana";
    this.ctx.fillText(text, x * 64, y * 64);
}


///////////////////////////////////
//      DRAW FUNCTIONS
///////////////////////////////////

// Draw the FPS counter
Engine.drawFPS = function(){  
    this.RenderText("#f8f8f8", parseInt(fps), 25, 50)
}

// Draw Loading Screen
Engine.drawLoading = function(text){
    this.ctx.clearRect(0, 0, 16 * 64, 16 * 64);
    this.RenderText("#f8f8f8", text, 25, 50)
    console.info(text);
}

// Draw Menu Screen
Engine.drawMenu = function(){
    //todo
}

// Draw Death Screen
Engine.drawDeathScrenn = function(){
    //todo
}

Engine.drawToInventory = function(id, slot){
    this.ctx.drawImage(texture.sprite, id.x * 16, id.y * 16, 16, 16, 34 + slot * 84 - (slot*4), 18 * 64 - 20, 64, 64);
}

Engine.drawPlayer = function(x, y){
    var id = MapObjects['ff0000'];
    if(typeof this.player.animCount == 'undefined') this.player.animCount = 0;

    if(this.player.animCount >= id.facing[this.facing].length) this.player.animCount = 0;
    if(this.player.isWalking){
        this.ctx.drawImage(texture.sprite, id.facing[this.facing][this.player.animCount].x * 16, id.facing[this.facing][this.player.animCount].y * 16, 16, 16, x * 64, y * 64 - 16, 64, 64);    
    } else {
        this.ctx.drawImage(texture.sprite, id.facing[this.facing][this.player.animCount].x * 16, id.facing[this.facing][this.player.animCount].y * 16, 16, 16, x * 64, y * 64 - 16, 64, 64);
    }

    if(this.count == 0) this.player.animCount++;
}

Engine.drawFromSprite = function(id, x, y){        
    this.ctx.drawImage(texture.sprite, id.x * 16, id.y * 16, 16, 16, x * 64, y * 64, 64, 64);
}

Engine.drawFromAnimSprite = function(cords, x, y){     
    this.ctx.drawImage(texture.sprite, cords.x * 16, cords.y * 16, 16, 16, x * 64, y * 64, 64, 64);
}

///////////////////////////////////
//      MAP FUNCTIONS
///////////////////////////////////


Engine.moveRngBlock = function(item){
    this.moveBlockDirection(item, rng(0,3));
}

Engine.moveBlockDirection = function(item, dir){
    var x = item.x;
    var y = item.y;

    if(dir == 0) --x;
    if(dir == 1) --y;
    if(dir == 2) ++x;
    if(dir == 3) ++y;

    var newItem = this.fullMap[x][y];

    if(newItem.block_id.solid) return;
    
    if(typeof newItem.block_id == 'undefined') return;
    
    if(newItem.block_id !== MapObjects['ffffff']) return;
    
    this.switchBlock(item, newItem);
    
}

Engine.switchBlock = function(block, newBlock){
    
}

//Go one level up on map

Engine.loadNextMap = function(){
    this.currentMapNr = Maps[this.currentMapNr].next;
    this.fog = Maps[this.currentMapNr].fog; // Set map Fog
    this.invetory = []; // Empty Inventory for new map
    this.LoadNewMap(Maps[this.currentMapNr].file);
}

Engine.MapGoLevelDown = function(){
    if(Maps[this.currentMapNr].levels.length >= 0) return false;
    this.currentMapNr = Maps[this.currentMapNr].levels[Maps[this.currentMapNr].currentLevel-1];
    this.LoadNewMap(Maps[this.currentMapNr]);
}

//Go one level down on map
Engine.MapGoLevelUp = function(){
    if(Maps[this.currentMapNr].levels.length <= Maps[this.currentMapNr].levels.length) return false;
    
    this.currentMapNr = Maps[this.currentMapNr].levels[Maps[this.currentMapNr].currentLevel+1];
    
    this.LoadNewMap(Maps[this.currentMapNr]);
}

// Load a new map
Engine.LoadNewMap = function(map){
    this.CurrentMap = this.Open(map);
}


///////////////////////////////////
//      Player/Inventory FUNCTIONS
///////////////////////////////////

// Move player 1 step in a direction
// Should make a smooth movement...
Engine.walk = function(keyCode, dir, dist){
    if(!pressedKeys[keyCode]) return;
    
    if(this.facing !== dir){
        this.facing = dir;
        return;
    }
    
    var cords = this.GetPlayerCords();
    var x = cords.x;
    var y = cords.y;
    
    if(dir == 0) --x;
    if(dir == 1) --y;
    if(dir == 2) ++x;
    if(dir == 3) ++y;

    
    if(!this.fullMap[x][y].block_id.solid && this.count == 0){
        if(dir == 0 || dir == 2) this.player.x = x;
        if(dir == 1 || dir == 3) this.player.y = y;
        this.player.isWalking = true;
        updatePosition(x, y, true);
        return;
    } 
    this.player.isWalking = false;
    updatePosition(x, y, false);
} 

Engine.GetPlayerCords = function(){
    var x = Math.floor(this.player.x);
    var y = Math.floor(this.player.y);
    return {x: x, y: y};
}

// Add item to inventory
Engine.addToInvetory = function(block_id){
    if(this.invetory.length > 10) return false;
    this.invetory.push(block_id);
    return true;
}

// Change selected item in invetory
Engine.changeInvetoryItem = function(block_id){
    if(typeof this.invetory[this.selectedInvetorySlot] === 'undefined') return false;
    this.invetory[this.selectedInvetorySlot] = block_id;
    return true;
}

// Remove Select item from invetory
Engine.removeSelectedInvetoryitem = function(){
    this.invetory.splice(this.selectedInvetorySlot, 1);
}



///////////////////////////////////
//      RUN INIT
///////////////////////////////////

Engine.init();