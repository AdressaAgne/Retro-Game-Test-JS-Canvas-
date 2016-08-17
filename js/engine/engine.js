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
    version : 'Alpha 0.1',
    
///////////////////////////////////
//      VARIABLES
///////////////////////////////////    
    
    canvas                  : null,
    ctx                     : null,
    outputCanvas            : document.getElementById('game'),
    outputCtx               : null,
    allowRender             : true,
    CurrentMap              : null,
    currentMapNr            : 0,
    fullMap                 : {},
    startMap                : 0,
// n * .5 of a block                
    fog                     : 10, 
    facing                  : 3,

// basically game tic 3 = 20tics/s,  10 = 6tics/s
    count                   : 0,
    animCount               : {},
    maxCount                : 8, 
    
    debug                   : {
        showPlayerBox     : false,  
        showPlayerCords   : false,  
    },
    
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
    
    doors                   : {
        selectedDoor  : 0,
        doors         : [],
        hasPower      : false,
    },
    
    teleporters             : {
        blue          : {x : null, y : null},
        red           : {c : null, y : null},
    },
    
    gui                     : {
        height      : (3 * 64), 
        width       : 0
    },
    
    Items           : {},
    
    renderBlowAnim  : {},
    
    dialogOpen      : false,
    dialogTitle     : '',
    dialogText      : '',
    renderMapSelector : false,
    selectedMap     : 0,
    selecableMaps   : 0,
    renderMenu      : true,
    menu            : {
        selectedButton  : 0,
        buttons         : [
            { 
                text : 'Play/Continue Game',
                press   : function(){
                    Engine.renderMenu = false;
                }
            },
            { 
                text : 'How To Play',
                press   : function(){
                    Engine.RenderDialog('How to play', 'w : Up\na : Left\ns : Down\nd : Right\ne : Pick up item / Do action on block\nr : Restart Map\nq : Use selected inventory item\n0-9 : Inventory Select\nesc : Back To Menu');
                }
            },
            { 
                text : 'Map Selctor',
                press   : function(){
                    Engine.renderMapSelector = true;
                    Engine.renderMenu = false;
                }
            },
            { 
                text : 'Tutorial',
                press   : function(){
                    
                    Engine.LoadNewMap(5);
                    Engine.renderMenu = false;
                }
            },
            { 
                text : 'Credits',
                press   : function(){
                   Engine.RenderDialog('Credits', 'Code :\nAgne Ødegaard\nArt :\nAgne Ødegaard\nKjetil Flå Gjersvold');
                }
            },
        ],
    },
    
///////////////////////////////////
//      BASE FUNCTIONS
///////////////////////////////////

    Render : function(file){        
        // Clear screen for redrawing
        Engine.ctx.clearRect(0, 0, (this.CurrentMap.width * 64), (this.CurrentMap.height * 64));

        var renderAbow = [];
        
        for (var x in this.fullMap) {
            if (!this.fullMap.hasOwnProperty(x)) continue;
            
            for (var y in this.fullMap[x]) {
                if (!this.fullMap[x].hasOwnProperty(y)) continue;
                
                var item = this.fullMap[x][y];

                if(typeof item.block_id == 'undefined'){
                    console.error("Could not render block :", item);
                    this.allowRender = false;
                }
                
                if(item.block_id.type == 'player' || item.block_id.type == 'item' || item.block_id.type == 'creature') this.drawFromSprite(ItemsList.dirt, item.x, item.y);
                
                if(item.block_id.renderAbow){
                    renderAbow.push(item);
                    continue;
                }
                
                this.renderBlock(item);

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
        
        for(var item in renderAbow){
            this.renderBlock(renderAbow[item]);
        }
        
        // Fog Render
        this.RenderFog();
        
        this.count = this.count >= this.maxCount ? 0 : this.count+1;
    },
    
    renderBlock : function(item){
        // Animated Block    
        if(typeof item.block_id.renderBelow !== 'undefined'){
            if(typeof this.renderBlowAnim[item.x+'-'+item.y] === 'undefined'){
                this.renderBlowAnim[item.x+'-'+item.y] = {
                    x : item.x,
                    y : item.y,
                    block_id : item.block_id.renderBelow(),
                }
            }
            this.renderBlock(this.renderBlowAnim[item.x+'-'+item.y]);
        }
        
        if(typeof item.block_id.anim !== 'undefined'){ 
            
            if(typeof item.animCount == 'undefined') item.animCount = rng(0, item.block_id.anim.length-1);
            this.drawFromAnimSprite(item.block_id.anim[item.animCount], item.x, item.y);

            if(this.count == 0){
                ++item.animCount;
                if(item.animCount >= item.block_id.anim.length){
                    item.animCount = 0;
                }
            }
            
        // Static Block
        } else { 
            this.drawFromSprite(item.block_id, item.x, item.y);
        }
    },
    
    renderBlockGui : function(block, x, y){
        // Animated Block
        if(typeof block.anim !== 'undefined'){ 
            if(typeof this.animCount[block.name] == 'undefined') this.animCount[block.name] = rng(0, block.anim.length-1);
            this.drawFromAnimSpriteGui(block.anim[this.animCount[block.name]], x, y);

            if(this.count == 0){
                ++this.animCount[block.name];
                if(this.animCount[block.name] >= block.anim.length){
                    this.animCount[block.name] = 0;
                }
            }
        } else { 
            this.drawFromAnimSpriteGui(block, x, y);
        }
    },
    
    ImageSmoothing : function(bool){
        this.ctx.mozImageSmoothingEnabled = bool;
        this.ctx.webkitImageSmoothingEnabled = bool;
        this.ctx.msImageSmoothingEnabled = bool;
        this.ctx.imageSmoothingEnabled = bool;
        
        this.outputCtx.mozImageSmoothingEnabled = bool;
        this.outputCtx.webkitImageSmoothingEnabled = bool;
        this.outputCtx.msImageSmoothingEnabled = bool;
        this.outputCtx.imageSmoothingEnabled = bool;
    },
    
    // Open a map, returns array[x][y]
    Open : function(Map, fog){   
        this.allowRender = false;
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.width = Map.width;
        canvas.height = Map.height;
        this.canvas.width = (Map.width * 64) ;
        this.canvas.height = (Map.height * 64);
        this.outputCanvas.height = this.canvas.height + this.gui.height;
        this.outputCanvas.width = this.canvas.width + this.gui.width;
        
        ctx.drawImage(Map, 0, 0);
        
        this.doors.doors = [];
        
        var mapData = {
            width : Map.width,
            height : Map.height,
        };
        
        for(var x = 0; x < Map.width; x++){
            this.fullMap[x] = {};
            for(var y = 0; y < Map.height; y++){
                var rgb = ctx.getImageData(x, y, 1, 1).data;
                var color = rgbToHex(rgb[0], rgb[1], rgb[2]);
                var block = (typeof MapObjects[color] !== 'undefined') ? MapObjects[color] : MapObjects['error']
                var d = {'x' : x,
                         'y' : y,
                         'block_id' : block,
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
                            this.fullMap[x][y+1].block_id.type == 'item' ||
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
                
                if(bID.block_id == ItemsList.iron_door_closed){
                    this.doors.doors.push(bID);
                }
                
                if(bID.block_id == ItemsList.tp_red){
                    this.teleporters.red.x = bID.x;
                    this.teleporters.red.y = bID.y;
                }
                if(bID.block_id == ItemsList.tp_blue){
                    this.teleporters.blue.x = bID.x;
                    this.teleporters.blue.y = bID.y;
                }
                
            }
        }
        
        
        this.allowRender = true;
        return mapData;
    },
    
    DrawToScreen : function(){
        this.ImageSmoothing(false);
        
        this.outputCtx.fillStyle = 'black';
        this.outputCtx.fillRect(0, 0, this.outputCanvas.width, this.outputCanvas.height);
        
        var width = this.canvas.width;
        var height = this.canvas.height;
        
        var m = 64;
        var fov = (this.fog-1) * m;
        var scale = 2;
        var start_x = (this.player.x * m) - (fov) + 32;
        var start_y = (this.player.y * m) - (fov) + 32;
        var end_x   = (fov*4 + 32);
        var end_y   = (fov*4 + 32);
        
        if(start_x <= 0) start_x = 0;
        if(start_y <= 0) start_y = 0;
        
//        if(start_x >= width/4 + 112) start_x = width/4 + 112;
//        if(start_y >= height/4 + 112) start_y = height/4 + 112;
        
        if(start_x >= width - (fov * 2) - 16) start_x = width - (fov * 2) - 16;
        if(start_y >= height - (fov * 2) - 16) start_y = height - (fov * 2) - 16;

        var pos_x = 0;
        var pos_y = 0;
        
        this.outputCtx.drawImage(this.canvas, start_x, start_y, end_x, end_y, pos_x, pos_y, width * scale, height * scale);
    },
    // texture loading
    init : function(){
        // setting base settings before map
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.outputCtx = this.outputCanvas.getContext('2d');
        
        this.canvas.width = (16 * 64);
        this.canvas.height = (16 * 64);
        this.outputCanvas.width = this.canvas.width + 256;
        this.outputCanvas.height = this.canvas.height + 256;
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
                    this.CurrentMap = this.Open(Maps[this.startMap].file, Maps[this.startMap].fog);
                    // Calling Game Loop
                    
                    for (var maps in Maps) {
                        if(Maps[maps].showOnSelector) this.selecableMaps++;
                    }
                    
                    this.startGame();
                } 
            }.bind(this);
        }
    },
    startGame : function(){
        animate();
    }
}
///////////////////////////////////
//      RENDER FUNCTIONS
///////////////////////////////////

Engine.RenderFog = function(){
//    var w = this.CurrentMap.width;
//    var h = this.CurrentMap.height;
//    var x = this.player.x;
//    var y = this.player.y;
//    var fog = this.fog / 2;
//
//    this.ctx.clearRect(0, 0, (w - (w - x) - fog) * 64, (h * 64));
//    this.ctx.clearRect(0, 0, w * 64, (h - (h - y) - fog) * 64);
//    this.ctx.clearRect(0, (h - (h - y - fog - 1)) * 64, w * 64, h * 64);
//    this.ctx.clearRect((w - (w - x - fog - 1)) * 64, 0, w * 64, h * 64);
}

// Render Graphical User Interface / Full Inventory Screen
Engine.RenderGUI = function(){
    // Bronze: 1, Silver: 5, Gold: 10, Ruby: 25
    var x = 1.5* 64;
    var y = 16.25*64;
    var s = this.selectedInvetorySlot;
    this.drawDialogFrame(1, 15, 13, 2);
    var coin = ItemsList.bronze_coin;
    if(this.money >= 25) coin = ItemsList.silver_coin;
    if(this.money >= 100) coin = ItemsList.gold_coin;
    
    this.renderBlockGui(coin, 1.5, 15.2);
    this.RenderText('#f8f8f8', this.money, 2.5, 15.85);
    
    
    
    var slots = 10;
    for(var i = 0; i < slots; i++){ // texture, start x, start y, end x, end y, pos x, pos y, end size x, end size, y, 
        this.outputCtx.drawImage(texture.gui, 0, 3*16, 21, 21, x + i * 21*4 + (i * -2), y + 4, 94, 84);
    }

    this.outputCtx.drawImage(texture.gui, 21, 3*16, 23, 23, x + (s * 92) + (s * -9.5), y, 92, 92);
    
    for(var i = 0; i < this.invetory.length; i++){
        this.renderBlockGui(this.invetory[i], 1.7 + (i*1.285), 16.45);
    }
    
}


// Render player
Engine.RenderPlayer = function(){
     var cords = this.GetPlayerCords();
    if(this.debug.showPlayerBox){
        this.drawFromSprite(ItemsList.test, cords.x, cords.y);
    }
    
    this.drawPlayer(this.player.x, this.player.y);
}
    
Engine.RenderStill = function(colorCode){
      
    if(typeof MapObjects[colorCode].anim[0] !== 'undefined') return MapObjects[colorCode].anim[0];

    return MapObjects[colorCode];

}
Engine.RenderText = function(color, text, x, y){
    this.outputCtx.fillStyle = color;
    this.outputCtx.font = "34px Verdana";
    this.outputCtx.fillText(text, x * 64, y * 64);
}
Engine.RenderTextPixels = function(color, text, x, y){
    this.outputCtx.fillStyle = color;
    this.outputCtx.font = "34px Verdana";
    this.outputCtx.fillText(text, x, y);
}
Engine.RenderRect = function(color, x, y, w, h){
    this.outputCtx.fillStyle = color;
    this.outputCtx.fillRect(x, y, w, h);
}

Engine.RenderMenu = function(){
    this.RenderMenuBackgroud();
    for(var i = 0; i < this.menu.buttons.length; i++){
        this.drawMenuButton(530 + (i*24*4), (i == this.menu.selectedButton), this.menu.buttons[i].text);
    }
    
    this.RenderText("#f8f8f8", this.version, 1, 18);
    
}

Engine.RenderMenuBackgroud = function(){
    this.drawFromTexture(texture.menu, 0, 0, 16, 19, 0, 0, 64);
    this.drawFromTexture(texture.gui, 0, 8, 16, 16, 0, 0, 64);
}

Engine.RenderMapSelector = function(){
    this.RenderMenuBackgroud();
    this.dialogText = '';
    this.dialogTitle = 'Map Selector';
    this.drawDialog(8, Maps.length+.5);
    
    var x = 190;
    var y = 600;

    var pos_x = 0;
    var pos_y = 0;
    var offset_x = 270;
    for(var i = 0; i < Maps.length; i++){ // texture, start x, start y, end x, end y, pos x, pos y, end size x, end size, y, 
        if(!Maps[i].showOnSelector) continue;
        if(pos_y == 8) {
            pos_x++;
            pos_y = 0;
        }
        this.outputCtx.drawImage(Maps[i].file, 0, 0, 16, 16,x + pos_x * offset_x, y + pos_y * 68, 64, 64);
        
        if(this.selectedMap == i){
            this.RenderTextPixels("#fbdb00", Maps[i].name, x + pos_x * offset_x + 80 , y + pos_y * 68 + 48);
        } else {
            this.RenderTextPixels("#f8f8f8", Maps[i].name, x + pos_x * offset_x + 80 , y + pos_y * 68 + 48);    
        }
        pos_y++;
    }
}

Engine.RenderDialog = function(title, text){
    this.dialogText = text;
    this.dialogTitle = title;
    this.dialogOpen = !this.dialogOpen;
}

///////////////////////////////////
//      DRAW FUNCTIONS
///////////////////////////////////


Engine.drawDialogFrame = function(x, y, w, h){
    this.drawFromTexture(texture.gui, 0, 5, 1, 1, x, y, 64); // top left
    
    this.drawFromTexture(texture.gui, 0, 7, 1, 1, x, y+h, 64); // bottom left
    
    this.drawFromTexture(texture.gui, 2, 5, 1, 1, x+w, y, 64); // top right
    
    this.drawFromTexture(texture.gui, 2, 7, 1, 1, x+w, y+h, 64); // bottom right
    
    for(var i = 1; i < w; i++){
        for(var j = 1; j < h; j++){
            this.drawFromTexture(texture.gui, 1, 6, 1, 1, x + i, y + j, 64); // bottom right
        }
    }
    
    for(var i = 1; i < h; i++){
        this.drawFromTexture(texture.gui, 0, 6, 1, 1, x    , y + i, 64); // bottom right
        this.drawFromTexture(texture.gui, 2, 6, 1, 1, x + w, y + i, 64); // bottom right
    }
    for(var i = 1; i < w; i++){
        this.drawFromTexture(texture.gui, 1, 5, 1, 1, x + i, y, 64); // bottom right
        this.drawFromTexture(texture.gui, 1, 7, 1, 1, x + i, y + h, 64); // bottom right
    }
}
Engine.drawDialog = function(y, h){
    var text = Engine.dialogText.split('\n');
    if(typeof y == 'undefined') var y = 4;
    if(typeof h == 'undefined') var h = 1+text.length;
    var x = 2.5
    var w = 10;
    this.drawDialogFrame(x, y, w, h);
    this.RenderText("#f8f8f8", Engine.dialogTitle, x+.5, y+1);

    for(var i = 0; i < text.length; i++){
        this.RenderText("#f8f8f8", text[i], x+.5, y+2+i);    
    }
    
}

// Draw the FPS counter
Engine.drawFPS = function(){  
    this.RenderText("#f8f8f8", parseInt(fps), 25, 50)
}

// Draw Loading Screen
Engine.drawLoading = function(text){
    this.outputCtx.clearRect(0, 0, 16 * 64, 16 * 64);
    this.RenderText("#f8f8f8", text, 25, 50)
    console.info(text);
}

// Draw Menu Screen
Engine.drawMenuButton = function(y, selected, text){
    var button_size_x = 194;
    var button_size_y = 23;
    var StartPosY = selected == true ? 3 * 16 + 23 : 3 * 16;
    var StartPosX = 256 - button_size_x;
    var x = (256 - button_size_x) / 2 * 4;
    this.outputCtx.drawImage(texture.gui, StartPosX, StartPosY, button_size_x, button_size_y, x, y, button_size_x*4, button_size_y*4);
    
    this.RenderTextPixels('#f8f8f8', text, x + (button_size_x/2), y+(button_size_y*2.5));
}

// Draw Death Screen
Engine.drawDeathScrenn = function(){
    //todo
}



Engine.drawPlayer = function(x, y){
    var id = MapObjects['ff0000'];
    if(typeof this.player.animCount == 'undefined') this.player.animCount = 0;

    if(this.player.animCount >= id.facing[this.facing].length) this.player.animCount = 0;
    if(this.player.isWalking){
        this.ctx.drawImage(texture.sprite, id.facing[this.facing][this.player.animCount].x * 16, id.facing[this.facing][this.player.animCount].y * 16, 16, 16, x * 64, y * 64, 64, 64);    
    } else {
        this.ctx.drawImage(texture.sprite, id.facing[this.facing][this.player.animCount].x * 16, id.facing[this.facing][this.player.animCount].y * 16, 16, 16, x * 64, y * 64, 64, 64);
    }

    if(this.count == 0) this.player.animCount++;
}

Engine.drawFromSprite = function(id, x, y){        
    this.ctx.drawImage(texture.sprite, id.x * 16, id.y * 16, 16, 16, x * 64, y * 64, 64, 64);
}

Engine.drawFromTexture = function(t, sx, sy, w, h, x, y, scale){        
    this.outputCtx.drawImage(t, sx * 16, sy * 16, w * 16, h * 16, x * 64, y * 64, w * scale, h * scale);
}

Engine.drawFromAnimSprite = function(cords, x, y){
    if(typeof cords == 'undefined') return;
    this.ctx.drawImage(texture.sprite, cords.x * 16, cords.y * 16, 16, 16, x * 64, y * 64, 64, 64);
}

Engine.drawFromAnimSpriteGui = function(cords, x, y){
    if(typeof cords == 'undefined') return;
    this.outputCtx.drawImage(texture.sprite, cords.x * 16, cords.y * 16, 16, 16, x * 64, y * 64, 64, 64);
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

    var cords = this.getNewCords(x, y, dir);
    x = cords.x;
    y = cords.y;

    var newItem = this.fullMap[x][y];

    if(newItem.block_id.solid) return;
    
    if(typeof newItem.block_id == 'undefined') return;
    
    if(newItem.block_id !== MapObjects['ffffff']) return;
}

Engine.getNewCords = function(x, y, dir){
    
    if(dir == 0) --x;
    if(dir == 1) --y;
    if(dir == 2) ++x;
    if(dir == 3) ++y;
    
    return {x : x, y : y};
}

Engine.swapDirection = function(dir){
    if(dir == 0) return 2;
    if(dir == 1) return 3;
    if(dir == 2) return 0;
    if(dir == 3) return 1;
}

Engine.loadNextMap = function(){
    this.wipeInvetory();
    if(this.currentMapNr == 'menu'){
        this.renderMenu = true;
        this.currentMapNr = 0;
        return null;
    }
    this.fog = Maps[this.currentMapNr].fog; // Set map Fog
    this.LoadNewMap(Maps[this.currentMapNr].next);
}

Engine.wipeInvetory = function(){
    this.invetory = []; // Empty Inventory for new map
}

Engine.MapGoLevelDown = function(){
    if(Maps[this.currentMapNr].levels.length >= 0) return false;
    this.LoadNewMap(Maps[this.currentMapNr].levels[Maps[this.currentMapNr].currentLevel-1]);
}

//Go one level down on map
Engine.MapGoLevelUp = function(){
    if(Maps[this.currentMapNr].levels.length <= 0) return false;
    this.LoadNewMap(Maps[this.currentMapNr].levels[Maps[this.currentMapNr].currentLevel+1]);
}

// Load a new map
Engine.LoadNewMap = function(map){
    this.currentMapNr = map;
    this.CurrentMap = this.Open(Maps[map].file);
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
    this.walkDir(dir, dist);
} 

Engine.walkDir = function(dir, dist){
    
    var cords = this.GetPlayerCords();
    var x = Number(this.player.x);
    var y = Number(this.player.y);
    
    var canWalk = true;
    
    if(dir == 0){ // a
        
        --cords.x; 
        x -= dist;
    }
    if(dir == 1){ // w

        --cords.y;
        y -= dist;
    }
    if(dir == 2){ // d

        ++cords.x;
        x += dist;
    }
    if(dir == 3){ // s
        cords.y = Math.floor(cords.y);
        ++cords.y;
        y += dist;
        
    }
    
    if(this.fullMap[cords.x][cords.y].block_id.solid) canWalk = false;
    
    var mWalk = dist * 2;
    if(!canWalk && (cords.y - 1 > y) && dir == 3){
        canWalk = true;
    }
    if(!canWalk && (cords.y + .7 < y + mWalk) && dir == 1){

        canWalk = true;
    }
    if(!canWalk && (cords.x - .5 > x + mWalk) && dir == 2){

        canWalk = true;
    }
    if(!canWalk && (cords.x + .5 < x - mWalk) && dir == 0){

        canWalk = true;
    }
    
    //console.log("x: ", cords.x, "y: ", cords.y);
    
    if(canWalk){
        if(dir == 0 || dir == 2) this.player.x = x;
        if(dir == 1 || dir == 3) this.player.y = y;
        this.player.isWalking = true;
        updatePosition(this.GetPlayerCords().x, this.GetPlayerCords().y, true);
        
    }
    
    this.player.isWalking = false;
    updatePosition(this.GetPlayerCords().x, this.GetPlayerCords().y, true);
}


function isInt(i){
    return (Number(i) === i) && (i % 1 === 0);
}

Engine.GetPlayerCords = function(){
    var x = Math.round(this.player.x);
    var y = Math.ceil(this.player.y);
    return {x: x, y: y};
}
Engine.GetPlayerCordsFloor = function(){
    var x = Math.floor(this.player.x);
    var y = Math.floor(this.player.y);
    return {x: x, y: y};
}
Engine.GetPlayerCordsCeil = function(){
    var x = Math.ceil(this.player.x);
    var y = Math.ceil(this.player.y);
    return {x: x, y: y};
}

// Add item to inventory
Engine.addToInvetory = function(block_id){
    if(this.invetory.length >= 10) return false;
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