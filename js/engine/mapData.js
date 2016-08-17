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
    drops       : function(){
        return  [ItemsList.bronze_coin, ItemsList.silver_coin, ItemsList.gold_coin];
    },
    x           : 0,
    y           : 9,
    onWalkOver  : function(){
        var drops = this.block_id.drops();
        changeBlock(this, drops[rng(0, drops.length-1)]);
    }
});
addItem('f2e064', {
    name        : 'finish',
    solid       : false,
    moveable    : true,
    type        : 'item',
    x           : 3,
    y           : 8,
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
        changeBlock(this, ItemsList.dirt);
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
        changeBlock(this, ItemsList.dirt);
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
        changeBlock(this, ItemsList.dirt);
    }
});

addItem('cd6e28', {
    name        : 'bronze_coin',
    solid       : false,
    moveable    : false,
    type        : 'item',
    onWalkOver  : function(){
        Engine.money++;
        changeBlock(this, ItemsList.dirt);
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
});

addItem('d13131', {
    name        : 'hp',
    solid       : false,
    moveable    : false,
    type        : 'item',
    x           : 0,
    y           : 11,
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
            Engine.fullMap[this.x][this.y+1].block_id = ItemsList.water;
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
        if(this.animCount == 0) changeBlock(this, ItemsList.lava);
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
        if(this.animCount == 0) changeBlock(this, ItemsList.dirt);
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
        changeBlock(this, ItemsList.lever_on);
        if(Engine.doors.hasPower){
            for(var d = 0; d < Engine.doors.doors.length;d++){
                var door = Engine.doors.doors[d];
                if(Engine.fullMap[door.x][door.y].block_id == ItemsList.iron_door_open){
                    changeBlock(Engine.fullMap[door.x][door.y], ItemsList.iron_door_closed);
                }
            }
            changeBlock(Engine.fullMap[Engine.doors.doors[Engine.doors.selectedDoor].x][Engine.doors.doors[Engine.doors.selectedDoor].y], ItemsList.iron_door_open);
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
        changeBlock(this, ItemsList.lever_off);
        for(var d = 0; d < Engine.doors.doors.length;d++){
            var door = Engine.doors.doors[d];
            if(Engine.fullMap[door.x][door.y].block_id == ItemsList.iron_door_open){
                changeBlock(Engine.fullMap[door.x][door.y], ItemsList.iron_door_closed);
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
            Engine.doors.hasPower = true;
            changeBlock(this, ItemsList.panel_1);
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
            changeBlock(this, ItemsList.panel_2);
            Engine.doors.selectedDoor = 1;
        }
    },
    onRender    : function(){
        if(!Engine.fullMap[this.x+1][this.y].block_id.isPowerSource){
            changeBlock(this, ItemsList.panel_off);
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
            changeBlock(this, ItemsList.panel_3);
            Engine.doors.selectedDoor = 2;
        }
    },
    onRender    : function(){
        if(!Engine.fullMap[this.x+1][this.y].block_id.isPowerSource){
            changeBlock(this, ItemsList.panel_off);
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
            changeBlock(this, ItemsList.panel_1);
            Engine.doors.selectedDoor = 0;
        }
    },
    onRender    : function(){
        if(!Engine.fullMap[this.x+1][this.y].block_id.isPowerSource){
            changeBlock(this, ItemsList.panel_off);
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
            changeBlock(this, ItemsList.battery);
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
        return [ItemsList.key]
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
        Engine.drawFromSprite(ItemsList.health_bar.anim[5-this.hp], this.x, this.y);
    }
});
addItem('808080', {
    name        : 'Boulder',
    solid       : true,
    moveable    : false,
    type        : 'item',
    x           : 1,
    y           : 10,
    onAction  : function(){
        
        var cords = Engine.getNewCords(this.x, this.y, Engine.facing);

        if(Engine.fullMap[cords.x][cords.y].block_id == ItemsList.dirt){
            swapBlocks(this, Engine.fullMap[cords.x][cords.y]);
        }
        if(Engine.fullMap[cords.x][cords.y].block_id == ItemsList.water){
            changeBlock(Engine.fullMap[cords.x][cords.y], ItemsList.dirt);
            changeBlock(this, ItemsList.dirt);
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
        Engine.drawFromSprite(ItemsList.health_bar.anim[5-this.hp], this.x, this.y);
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
                changeBlock(this, drops[rng(0, drops.length-1)]);
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

addItem('test', {
    name        : 'test',
    solid       : false,
    moveable    : false,
    type        : 'block',
    x           : 11,
    y           : 15,
});

// -> cracked dirt ->  quick sand -> teleporter -> collector

addItem('ecc40b', {
    name        : 'touch',
    solid       : false,
    moveable    : false,
    type        : 'item',
    canPickUp   : true,
    anim        : [
        {x : 7, y: 10},
        {x : 7, y: 11},
        {x : 7, y: 12},
    ],
    onUse       : function(){
        changeOnUse(this, ItemsList.tnt, ItemsList.tnt_prime, ItemsList.touch);
    }
});

addItem('boom', {
    name        : 'explotion',
    solid       : false,
    moveable    : false,
    type        : 'item',
    anim        : [
        {x : 9, y: 4},
        {x : 10, y: 4},
        {x : 11, y: 4},
    ],
    onRender : function(){
        if(this.animCount == 0) this.block_id = ItemsList.dirt;
    }
});

addItem('tnt_boom', {
    name        : 'tnt_explotion',
    solid       : false,
    moveable    : false,
    type        : 'item',
    anim        : [
        {x : 9, y: 4},
        {x : 10, y: 4},
        {x : 11, y: 4},
    ],
    onRender : function(){
        if(this.animCount == 0) this.block_id = ItemsList.dirt;
        
        var canDestroy = [ItemsList.hedge, ItemsList.hedge_edge, ItemsList.rose_hedge_edge];
        for(var i = 0; i < canDestroy.length; i++){
            
            blockDirectionLoop(this, function(){
                var item = canDestroy[i];
                if(this.block_id == item) changeBlock(this, ItemsList.dirt); 
            });
        }
        
    }
});

addItem('3c3e3f', {
    name        : 'belt_right',
    solid       : false,
    moveable    : false,
    type        : 'item',
    anim        : [
        {x : 10, y: 15},
        {x : 9, y: 15},
        {x : 8, y: 15},
    ],
    onRender : function(){
        if(this.x == Engine.GetPlayerCords().x && this.y == Engine.GetPlayerCords().y){
            Engine.walkDir(2, Engine.walkingDist);
        }
    }
});
addItem('2b3033', {
    name        : 'belt_left',
    solid       : false,
    moveable    : false,
    type        : 'item',
    anim        : [
        {x : 8, y: 15},
        {x : 9, y: 15},
        {x : 10, y: 15},
    ],
    onRender : function(){
        if(this.x == Engine.GetPlayerCords().x && this.y == Engine.GetPlayerCords().y){
            Engine.walkDir(0, Engine.walkingDist);
        }
    }
});

addItem('a3250c', {
    name        : 'tnt',
    solid       : false,
    moveable    : false,
    type        : 'item',
    canPickUp   : true,
    x           : 15,
    y           : 12,
    onUse       : function(){
        removeOnUse(this, ItemsList.dirt, ItemsList.tnt);
    }
});
addItem('tnt_prime', {
    name        : 'tnt_prime',
    solid       : false,
    moveable    : false,
    type        : 'item',
    anim        : [
        {x : 15, y: 11},
        {x : 14, y: 11},
        {x : 13, y: 11},
        {x : 12, y: 11},
    ],
    onRender : function(){
        if(this.animCount == 0) changeBlock(this, ItemsList.tnt_explotion)
    }
});



///////////////////////////////////
////     COLLECTOR             ////
///////////////////////////////////


addItem('d0cbbe', {
    name        : 'collector_stage_1',
    solid       : true,
    moveable    : false,
    type        : 'item',
    x           : 11,
    y           : 14
});

addItem('collector_stage_2', {
    name        : 'collector_stage_2',
    solid       : true,
    moveable    : false,
    type        : 'item',
    x           : 12,
    y           : 14,
});
addItem('collector_stage_3', {
    name        : 'collector_stage_3',
    solid       : true,
    moveable    : false,
    type        : 'item',
    x           : 13,
    y           : 14,
});
addItem('collector_stage_4', {
    name        : 'collector_stage_4',
    solid       : true,
    moveable    : false,
    type        : 'item',
    x           : 14,
    y           : 14,
});
addItem('collector_stage_5', {
    name        : 'collector_stage_5',
    solid       : true,
    moveable    : false,
    type        : 'item',
    anim        : [
        {x : 11, y: 13},
        {x : 12, y: 13},
        {x : 13, y: 13},
        {x : 14, y: 13},
        {x : 15, y: 13},
        {x : 14, y: 13},
        {x : 13, y: 13},
        {x : 12, y: 13},
    ]       
});
addItem('f5c009', {
    name        : 'gold_box',
    solid       : false,
    moveable    : false,
    type        : 'item',
    canPickUp   : true,
    x           : 0,
    y           : 12,
    onUse       : function(){
        removeOnUse(this, ItemsList.dirt, ItemsList.gold_box);
        removeOnUse(this, ItemsList.collector_stage_4, ItemsList.collector_stage_5);
        removeOnUse(this, ItemsList.collector_stage_3, ItemsList.collector_stage_4);
        removeOnUse(this, ItemsList.collector_stage_2, ItemsList.collector_stage_3);
        removeOnUse(this, ItemsList.collector_stage_1, ItemsList.collector_stage_2); 
         
    }
});

addItem('70674d', {
    name        : 'sand',
    solid       : false,
    moveable    : false,
    type        : 'block',
    anim        : [
        {x : 13, y: 2},
        {x : 14, y: 2},
        {x : 15, y: 2},
        {x : 14, y: 2},
    ]       
});


///////////////////////////////////
////     BOOMERANG             ////
///////////////////////////////////
 

addItem('boomerang_prime', {
    name        : 'boomerang_prime',
    solid       : true,
    moveable    : false,
    type        : 'item',
    anim        : [
        {x : 13, y: 3},
        {x : 13, y: 4},
        {x : 12, y: 4},
        {x : 12, y: 3},
    ], 
    onRender    : function(){
        setTimeout(function(){
       
        var cords = Engine.getNewCords(this.x, this.y, this.dir);
        
        var x = cords.x;
        var y = cords.y;    
            
        var block = Engine.fullMap[x][y];
        if(block.block_id == ItemsList.dirt){
            
            block.block_id = ItemsList.boomerang_prime;
            block.animCount = this.animCount;
            block.dir = this.dir;
            block.l = this.l;
            block.l++;

            
            if(this.l > 2){                
                block.dir = Engine.swapDirection(block.dir);
                block.l = 0;
            }
            
            changeBlock(this, ItemsList.dirt);
            
            if(x == Engine.GetPlayerCords().x && y == Engine.GetPlayerCords().y){
                changeBlock(block, ItemsList.dirt);
                Engine.addToInvetory(ItemsList.boomerang);
            }
            
        } else {
            
            if(block.block_id.type == 'creature'){
                block.hp--;
                if(block.hp <= 0){
                    var drops = block.block_id.drop();
                    changeBlock(block, drops[rng(0, drops.length-1)]);
                    resetAnimation(block.block_id);
                }
            }
            changeBlock(this, ItemsList.boomerang);
        }
        
        delete this.dir; 
        delete this.l; 
        
        }.bind(this), 0);
    }
});
addItem('825c2c', {
    name        : 'boomerang',
    solid       : false,
    moveable    : false,
    type        : 'item',
    canPickUp   : true,
    x : 13,
    y: 3,
    onUse       : function(){
        if(typeof this.dir == 'undefined') this.dir = Engine.facing;
        if(typeof this.l == 'undefined') this.l = 1;
        removeOnUse(this, ItemsList.dirt, ItemsList.boomerang_prime);
    }
});


///////////////////////////////////
////     Teleporter            ////
///////////////////////////////////

addItem('9d5353', {
    name        : 'tp_red',
    solid       : false,
    moveable    : false,
    type        : 'item',
    renderAbow   : true,
    x : 8,
    y : 5,
    onActionOver     : function(){
        Engine.player.x = Engine.teleporters.blue.x;
        Engine.player.y = Engine.teleporters.blue.y;
    }
});
addItem('53799d', {
    name        : 'tp_blue',
    solid       : false,
    moveable    : false,
    type        : 'item',
    renderAbow   : true,
    x : 7,
    y : 5,
    onActionOver     : function(){
        Engine.player.x = Engine.teleporters.red.x;
        Engine.player.y = Engine.teleporters.red.y;
    }
});


addItem('error', {
    name        : 'error',
    solid       : false,
    moveable    : false,
    type        : 'item',
    x : 6,
    y : 15,
});

function changeBlock(b_id, b_replacement, callback){
    b_id.block_id = b_replacement;
    resetAnimation(b_id); // reset animation

    if(typeof callback == 'function'){
        callback.bind(b_id)();
    }
}

function swapBlocks(a, b, callback){
    b.block_id = [a.block_id, a.block_id = b.block_id][0];
}

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
function blockDirectionLoop(block, callback){
    if(typeof callback !== 'function') return;
    for(var i = 0; i < 4; i++){
        var cords = Engine.getNewCords(block.x, block.y, i);
        callback.bind(Engine.fullMap[cords.x][cords.y])();
    }
}