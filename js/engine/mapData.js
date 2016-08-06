// onSolidHit; Walking into solid block
// onWalkOver: Enter ontop of block/item
// onRender: When block is rendered by game tic
// onRenderFull: When block is rendered by fps
// onAction: when player search a block infront of the facing direction
// onActionOver: Do action on the block player is stading on

// onUse
// onUseOver

// this.isSearched: if the player has used onAction on block

// Textures: 
// Animation use: anim : [ {x: 0, y: 0}, {etc..} ], non animation use: x : 0, y : 0

var MapObjects = {};

addItem('000000', {
    name        : 'wall',
    solid       : true,
    moveable    : false,
    alternative3D  : function(){
        return [ItemsList.wall_edge];
    },
    type        : 'block',
    x           : 1,
    y           : 0,
});

addItem('484848', {
    name        : 'wall_edge',
    solid       : true,
    moveable    : false,
    type        : 'block',
    x           : 2,
    y           : 0
});

addItem('3c3c3c', {
    name        : 'wall_below_edge',
    solid       : true,
    moveable    : false,
    type        : 'block',
    x           : 6,
    y           : 0
});

addItem('776022', {
    name        : 'door',
    solid       : false,
    moveable    : false,
    type        : 'block',
    x           : 3,
    y           : 0,
});

addItem('ffffff', {
    name        : 'dirt',
    solid       : false,
    moveable    : false,
    type        : 'block',
    x           : 0,
    y           : 0,
});

addItem('00ff00', {
    name        : 'chest',
    solid       : false,
    moveable    : true,
    type        : 'item',
    x           : 0,
    y           : 9,
    onWalkOver  : function(){
        Engine.loadNextMap('next');
    }
});

addItem('ff0000', {
    name        : 'player',
    solid       : false,
    moveable    : false,
    type        : 'player',
    facing      : [ 
        [{x:0,y:8},{x:1,y:8},{x:2,y:8}], // 0 Left
        [{x:0,y:6},{x:1,y:6},{x:2,y:6}], // 1 Up
        [{x:0,y:7},{x:1,y:7},{x:2,y:7}], // 2 Right
        [{x:0,y:5},{x:1,y:5},{x:2,y:5}], // 3 Down
    ]
});

addItem('00a000', {
    name        : 'hedge',
    solid       : true,
    moveable    : false,
    alternative3D : function(){
        return [ItemsList.hedge_edge, ItemsList.rose_hedge_edge]
    },
    type        : 'block',
    x           : 1,
    y           : 1,
});

addItem('009100', {
    name        : 'hedge_edge',
    solid       : true,
    moveable    : false,
    type        : 'block',
    x           : 2,
    y           : 1,
});

addItem('d500ff', {
    name        : 'rose_hedge_edge',
    solid       : true,
    moveable    : false,
    type        : 'block',
    x           : 4,
    y           : 1,
});

addItem('004f00', {
    name        : 'hedge_edge_door',
    solid       : false,
    moveable    : false,
    type        : 'block',
    x           : 3,
    y           : 1,
});

addItem('88293b', {
    name        : 'ruby',
    solid       : false,
    moveable    : false,
    type        : 'item',
    x           : 6,
    y           : 10,
    onWalkOver  : function(){
        Engine.money += 25;
        this.block_id = ItemsList.dirt;
    }
});

addItem('f9e000', {
    name        : 'gold_coin',
    solid       : false,
    moveable    : false,
    type        : 'item',
    anim        : [
        {x: 3, y: 10},
        {x: 3, y: 11},
        {x: 3, y: 12},
        {x: 3, y: 13},
        {x: 3, y: 12},
        {x: 3, y: 11},
    ],
    onWalkOver  : function(){
        Engine.money += 10;
        this.block_id = ItemsList.dirt;
    }
});

addItem('e5e5e5', {
    name        : 'silver_coin',
    solid       : false,
    moveable    : false,
    type        : 'item',
    anim        : [
        {x: 4, y: 10},
        {x: 4, y: 11},
        {x: 4, y: 12},
        {x: 4, y: 13},
        {x: 4, y: 12},
        {x: 4, y: 11},
    ],
    onWalkOver  : function(){
        Engine.money += 5;
        this.block_id = ItemsList.dirt;
    }
});

addItem('cd6e28', {
    name        : 'bronze_coin',
    solid       : false,
    moveable    : false,
    type        : 'item',
    onWalkOver  : function(){
        Engine.money++;
        this.block_id = ItemsList.dirt;
    },
    anim        : [
        {x: 5, y: 10},
        {x: 5, y: 11},
        {x: 5, y: 12},
        {x: 5, y: 13},
        {x: 5, y: 12},
        {x: 5, y: 11},
    ]
});

addItem('cd3f28', {
    name        : 'fire',
    solid       : true,
    moveable    : false,
    type        : 'item',
    anim        : [
        {x: 0, y: 15},
        {x: 1, y: 15},
        {x: 2, y: 15},
    ],
    onWalkOver  : function(){
        console.log('au')
    }
});

addItem('d13131', {
    name        : 'hp',
    solid       : false,
    moveable    : false,
    type        : 'item',
    x           : 0,
    y           : 11,
    onWalkOver  : function(){
        console.log('au')
    }
});

addItem('bada55', {
    name        : 'water_fall',
    solid       : true,
    moveable    : false,
    alternative3D : function(){
        return [ItemsList.water_fall_end];   
    },
    type        : 'block',
    anim        : [
        {x: 14, y: 0},
        {x: 14, y: 1},
    ]
});

addItem('98b244', {
    name        : 'water_fall_end',
    solid       : true,
    moveable    : false,
    type        : 'block',
    anim        : [
        {x: 15, y: 0},
        {x: 15, y: 1},
    ],
    onRender : function(){
        if(Engine.fullMap[this.x][this.y+1].block_id == ItemsList.dirt){
            Engine.fullMap[this.x][this.y+1].block_id = MapObjects['667731'];
        }
    }
});

addItem('667731', {
    name        : 'water',
    solid       : true,
    moveable    : false,
    type        : 'block',
    anim        : [
        {x: 1, y: 2},
        {x: 2, y: 2},
        {x: 3, y: 2},
        {x: 4, y: 2},
        {x: 5, y: 2},
    ],
});

addItem('ff6600', {
    name        : 'lava',
    solid       : true,
    moveable    : false,
    type        : 'block',
    anim        : [
        {x: 1, y: 3},
        {x: 2, y: 3},
        {x: 3, y: 3},
        {x: 4, y: 3},
        {x: 5, y: 3},
    ],
});

addItem('lava_steam', {
    name        : 'lava_steam',
    solid       : true,
    moveable    : false,
    type        : 'block',
    anim        : [
        {x: 9, y: 3},
        {x: 10, y: 3},
        {x: 11, y: 3},
    ],
    onRender : function(){
        if(this.animCount == 0) this.block_id = ItemsList.lava;
    }
});

addItem('steam', {
    name        : 'steam',
    solid       : false,
    moveable    : false,
    type        : 'item',
    anim        : [
        {x: 9, y: 2},
        {x: 10, y: 2},
        {x: 11, y: 2},
    ],
    onRender : function(){
        if(this.animCount == 0) this.block_id = ItemsList.dirt;
    }
});

addItem('2f91a6', {
    name        : 'Bucket',
    solid       : false,
    moveable    : false,
    type        : 'item',
    x           : 3,
    y           : 6,
    canPickUp   : true,
    onUse : function(){
        // Pick Up water
        changeOnUse(this, ItemsList.water, ItemsList.dirt, ItemsList.bucket_filled_water);
        changeOnUse(this, ItemsList.swomp, ItemsList.dirt, ItemsList.bucket_filled_swomp);
        removeOnUse(this, ItemsList.lava, ItemsList.fire);
        changeOnUse(this, ItemsList.swomp_2, ItemsList.dirt, ItemsList.bucket_filled_swomp);
        changeOnUse(this, ItemsList.swomp_3, ItemsList.dirt, ItemsList.bucket_filled_swomp);
    },
});

addItem('19454d', {
    name        : 'Bucket_Filled_Swomp',
    solid       : false,
    moveable    : false,
    type        : 'item',
    x           : 6,
    y           : 6,
    canPickUp   : true,
    onUse : function(){
        changeOnUse(this, ItemsList.dirt, ItemsList.swomp_2, ItemsList.bucket);
        changeOnUse(this, ItemsList.fire, ItemsList.dirt, ItemsList.bucket);
        changeOnUse(this, ItemsList.lava, ItemsList.dirt, ItemsList.bucket);
    },
});

addItem('7d9ca2', {
    name        : 'Iron_Bucket',
    solid       : false,
    moveable    : false,
    type        : 'item',
    x           : 3,
    y           : 5,
    canPickUp   : true,
    onUse : function(){

        changeOnUse(this, ItemsList.water, ItemsList.dirt, ItemsList.iron_bucket_water);
        changeOnUse(this, ItemsList.lava, ItemsList.dirt, ItemsList.iron_bucket_lava);
        changeOnUse(this, ItemsList.swomp, ItemsList.dirt, ItemsList.iron_bucket_swomp);
        changeOnUse(this, ItemsList.swomp_2, ItemsList.dirt, ItemsList.iron_bucket_swomp);
        changeOnUse(this, ItemsList.swomp_3, ItemsList.dirt, ItemsList.iron_bucket_swomp);

    },

});

addItem('6a868b', {
    name        : 'Iron_Bucket_Water',
    solid       : false,
    moveable    : false,
    type        : 'item',
    x           : 5,
    y           : 5,
    canPickUp   : true,
    onUse : function(){
        changeOnUse(this, ItemsList.dirt, ItemsList.water, ItemsList.iron_bucket);
        changeOnUse(this, ItemsList.fire, ItemsList.steam, ItemsList.iron_bucket);
        changeOnUse(this, ItemsList.lava, ItemsList.lava_steam, ItemsList.iron_bucket);

    },

});
addItem('556b6f', {
    name        : 'Iron_Bucket_Lava',
    solid       : false,
    moveable    : false,
    type        : 'item',
    x           : 4,
    y           : 5,
    canPickUp   : true,
    onUse : function(){
        changeOnUse(this, ItemsList.dirt, ItemsList.lava, ItemsList.iron_bucket);
        changeOnUse(this, ItemsList.swomp, ItemsList.dirt, ItemsList.iron_bucket);
        changeOnUse(this, ItemsList.water, ItemsList.dirt, ItemsList.iron_bucket);

    },
});
addItem('3e4f52', {
    name        : 'Iron_Bucket_Swomp',
    solid       : false,
    moveable    : false,
    type        : 'item',
    x           : 6,
    y           : 5,
    canPickUp   : true,
    onUse : function(){
        changeOnUse(this, ItemsList.dirt, ItemsList.swomp_2, ItemsList.iron_bucket);
        changeOnUse(this, ItemsList.fire, ItemsList.steam, ItemsList.iron_bucket);
        changeOnUse(this, ItemsList.lava, ItemsList.dirt, ItemsList.iron_bucket);

    },
});

addItem('256d7c', {
    name        : 'Bucket_Filled_Water',
    solid       : false,
    moveable    : false,
    type        : 'item',
    x           : 5,
    y           : 6,
    canPickUp   : true,
    onUse : function(){
        changeOnUse(this, ItemsList.dirt, ItemsList.water, ItemsList.bucket);
        changeOnUse(this, ItemsList.fire, ItemsList.steam, ItemsList.bucket);
        changeOnUse(this, ItemsList.lava, ItemsList.lava_steam, ItemsList.bucket);
    },
});
addItem('1e5661', {
    name        : 'Bucket Filled Lava',
    solid       : false,
    moveable    : false,
    type        : 'item',
    x           : 4,
    y           : 6,
    canPickUp   : true,
    onUse : function(){
        changeOnUse(this, ItemsList.water, ItemsList.dirt, ItemsList.bucket);
        changeOnUse(this, ItemsList.dirt, ItemsList.lava, ItemsList.bucket);
    },
});
addItem('eddfae', {
    name        : 'Key',
    solid       : false,
    moveable    : false,
    type        : 'item',
    x           : 6,
    y           : 9,
    canPickUp   : true,
    onUse : function(){
        removeOnUse(this, ItemsList.door_closed, ItemsList.door_open);
    },
});

addItem('745208', {
    name        : 'Door_Open',
    solid       : false,
    moveable    : false,
    type        : 'item',
    x           : 1,
    y           : 4,
});
addItem('513906', {
    name        : 'Door_Closed',
    solid       : true,
    moveable    : false,
    type        : 'item',
    x           : 0,
    y           : 4,
});
addItem('bb9983', {
    name        : 'lever_off',
    solid       : true,
    moveable    : false,
    type        : 'item',
    x           : 2,
    y           : 4,
    onAction    : function(){
        this.block_id = ItemsList.lever_on;
        if(Engine.doors.hasPower){
            for(var d = 0; d < Engine.doors.doors.length;d++){
                var door = Engine.doors.doors[d];
                Engine.fullMap[door.x][door.y].block_id = ItemsList.iron_door_closed;
            }
        
            Engine.fullMap[Engine.doors.doors[Engine.doors.selectedDoor].x][Engine.doors.doors[Engine.doors.selectedDoor].y].block_id = ItemsList.iron_door_open;
        }
    }
});
addItem('lever_on', {
    name        : 'lever_on',
    solid       : true,
    moveable    : false,
    type        : 'item',
    x           : 3,
    y           : 4,
    onAction    : function(){
        this.block_id = ItemsList.lever_off;
        if(Engine.doors.hasPower){
            for(var d = 0; d < Engine.doors.doors.length;d++){
                var door = Engine.doors.doors[d];
                Engine.fullMap[door.x][door.y].block_id = ItemsList.iron_door_closed;
            }
        }
    }
});

addItem('panel_off', {
    name        : 'panel_off',
    solid       : true,
    moveable    : false,
    type        : 'block',
    x           : 10,
    y           : 0,
    onRender    : function(){
        if(Engine.fullMap[this.x+1][this.y].block_id.isPowerSource){
            this.block_id = ItemsList.panel_1;
            Engine.doors.hasPower = true;
            Engine.doors.selectedDoor = 0;
        }
    }
});

addItem('05eb76', {
    name        : 'panel_1',
    solid       : true,
    moveable    : false,
    type        : 'block',
    x           : 11,
    y           : 0,
    onAction    : function(){
        if(Engine.fullMap[this.x+1][this.y].block_id.isPowerSource){
            this.block_id = ItemsList.panel_2;
            Engine.doors.selectedDoor = 1;
        }
    },
    onRender    : function(){
        if(!Engine.fullMap[this.x+1][this.y].block_id.isPowerSource){
            this.block_id = ItemsList.panel_off;
            Engine.doors.hasPower = false;
        }
    }
});
addItem('panel_2', {
    name        : 'panel_2',
    solid       : true,
    moveable    : false,
    type        : 'block',
    x           : 12,
    y           : 0,
    onAction    : function(){
        if(Engine.fullMap[this.x+1][this.y].block_id.isPowerSource){
            this.block_id = ItemsList.panel_3;
            Engine.doors.selectedDoor = 2;
        }
    },
    onRender    : function(){
        if(!Engine.fullMap[this.x+1][this.y].block_id.isPowerSource){
            this.block_id = ItemsList.panel_off;
            Engine.doors.hasPower = false;
        }
    }
});
addItem('panel_3', {
    name        : 'panel_3',
    solid       : true,
    moveable    : false,
    type        : 'block',
    x           : 13,
    y           : 0,
    onAction    : function(){
        if(Engine.fullMap[this.x+1][this.y].block_id.isPowerSource){
            this.block_id = ItemsList.panel_1;
            Engine.doors.selectedDoor = 0;
        }
    },
    onRender    : function(){
        if(!Engine.fullMap[this.x+1][this.y].block_id.isPowerSource){
            this.block_id = ItemsList.panel_off;
            Engine.doors.hasPower = false;
        }
    }
});

addItem('f0ca18', {
    name        : 'battery',
    solid       : false,
    moveable    : false,
    type        : 'item',
    isPowerSource : true,
    x           : 11,
    y           : 1,
    canPickUp   : true,
    onUse    : function(){
        if(this.block_id == ItemsList.dirt){
            Engine.removeSelectedInvetoryitem();
            this.block_id = ItemsList.battery;
        }
    }
});

addItem('2d2d2d', {
    name        : 'iron_door_closed',
    solid       : true,
    moveable    : false,
    type        : 'block',
    x           : 12,
    y           : 1,
});

addItem('iron_door_open', {
    name        : 'iron_door_open',
    solid       : false,
    moveable    : false,
    type        : 'block',
    x           : 13,
    y           : 1,
});

addItem('232e1d', {
    name        : 'Snake',
    drop        : function(){
        return ItemsList.key
    },
    solid       : true,
    moveable    : false,
    type        : 'creature',
    anim        : [
        {x: 7, y: 8},
        {x: 7, y: 8},
        {x: 7, y: 8},
        {x: 6, y: 8},
        {x: 5, y: 8},
        {x: 6, y: 8},
        {x: 7, y: 8},
        {x: 7, y: 8},
        {x: 7, y: 8},
    ],
    onRenderFull : function(){
        if(typeof this.hp === 'undefined') this.hp = 5;

        //console.log(i)
        Engine.drawFromSprite(MapObjects['healthBar'].anim[5-this.hp], this.x, this.y);
    }
});
addItem('808080', {
    name        : 'Boulder',
    solid       : true,
    moveable    : false,
    type        : 'item',
    x           : 1,
    y           : 10,
    onSolidHit  : function(){
        // 2 = x+1 d
        // 0 = x-1 a
        // 1 = y+1 s
        // 3 = y-1 w
        var x = this.x;
        var y = this.y;
        var dir = Engine.facing;
        if(dir == 0) --x;
        if(dir == 1) --y;
        if(dir == 2) ++x;
        if(dir == 3) ++y;

        // Make function for this shit

        if(Engine.fullMap[x][y].block_id == ItemsList.dirt){
            Engine.fullMap[x][y].block_id = this.block_id;
            this.block_id = ItemsList.dirt;
        }
        if(Engine.fullMap[x][y].block_id == ItemsList.water){
            Engine.fullMap[x][y].block_id = ItemsList.dirt;
            this.block_id = ItemsList.dirt;
        }


    }
});
addItem('healthBar', {
    name        : 'Health_Bar',
    solid       : false,
    moveable    : false,
    type        : 'item',
    anim        : [
        {x: 5, y: 7},
        {x: 6, y: 7},
        {x: 7, y: 7},
        {x: 8, y: 7},
        {x: 9, y: 7},
    ]
});

addItem('b60808', {
    name        : 'Mushroom',
    solid       : true,
    moveable    : false,
    type        : 'item',
    x           : 7,
    y           : 9,
    onUse       : function(){
        Engine.removeSelectedInvetoryitem();
    }
});

addItem('464268', {
    name        : 'Bat',
    solid       : true,
    moveable    : false,
    type        : 'creature',
    drop        : function(){
      return [ItemsList.gold_coin, ItemsList.silver_coin, ItemsList.bronze_coin];  
    },
    anim        : [
        {x: 8, y: 8},
        {x: 9, y: 8},
        {x: 10, y: 8},
        {x: 11, y: 8},
        {x: 12, y: 8},
        {x: 11, y: 8},
        {x: 10, y: 8},
        {x: 9, y: 8},

    ],
    onRender : function(){
        if(this.animCount == 0) Engine.moveRngBlock(this);
    },
    onRenderFull : function(){
        if(typeof this.hp === 'undefined') this.hp = 5;

        //console.log(i)
        Engine.drawFromSprite(MapObjects['healthBar'].anim[5-this.hp], this.x, this.y);
    }
});

addItem('a048dd', {
    name        : 'Dagger',
    solid       : false,
    moveable    : false,
    type        : 'item',
    x           : 3,
    y           : 9,
    canPickUp   : true,
    onUse : function(){
        if(this.block_id.type == 'creature'){
            this.hp--;

            if(this.hp <= 0){
                var drops = this.block_id.drop();
                this.block_id = drops[rng(0, drops.length-1)];
                resetAnimation(this.block_id);
            }
        }
        
        if(this.block_id == ItemsList.mushroom){
            if(Engine.addToInvetory(this.block_id)) this.block_id = ItemsList.dirt;
        }
        
    },
});

addItem('7d5112', {
    name        : 'swomp',
    solid       : false,
    moveable    : false,
    type        : 'block',
    alternative : function(){
        return [ItemsList.swomp_2, ItemsList.swomp_3];
    },
    anim        : [
        {x : 6, y: 2},
        {x : 7, y: 2},
        {x : 8, y: 2},
        {x : 7, y: 2},
    ]
});

addItem('swomp2', {
    name        : 'swomp_2',
    solid       : false,
    moveable    : false,
    type        : 'block',
    anim        : [
        {x : 6, y: 3},
        {x : 7, y: 3},
        {x : 8, y: 3},
        {x : 7, y: 3},
    ]
});

addItem('swomp', {
    name        : 'swomp_3',
    solid       : false,
    moveable    : false,
    type        : 'block',
    anim        : [
        {x : 6, y: 4},
        {x : 7, y: 4},
        {x : 8, y: 4},
        {x : 7, y: 4},
    ]
});

//changeOnUse(this, ItemsList.dirt, ItemsList.water, ItemsList.bucket);
function changeOnUse(b_id, b_use, b_replacement, i_replcement, callback){
    if(b_id.block_id != b_use) return;
        Engine.changeInvetoryItem(i_replcement);
        b_id.block_id = b_replacement;
        resetAnimation(b_id); // reset animation
    
        if(typeof callback == 'function'){
            callback.bind(b_id)();
        }
}

function removeOnUse(b_id, b_use, b_replacement){
    if(b_id.block_id != b_use) return;
        Engine.removeSelectedInvetoryitem();
        b_id.block_id = b_replacement;
        resetAnimation(b_id); // reset animation
}

function resetAnimation(block){
    block.animCount = 0;
}

function addItem(id, object){
    MapObjects[id] = object;
}

//Notes
//
//  2.
//  Make a Pokal, Pokal is end of level, Walk on it and level ends
//  Make End of Level Screen
//  Make load new map function
//  3. 
//  Make Fire hurt
//  Make Die Screen Function
//  
//  Fix up code... make it look good, add comments
//  Fix walking
//      Fix Boulder Rolling
