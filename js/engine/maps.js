var Maps = [
    {
        name: 'map_test',
        file: texture.testMap,
        next: 1,
        fog: 5,
        startLevel : 0,
        currentLevel : 0,
        // Map Stairs
        levels : [
            texture.map1,
            texture.map2,
        ],
        showOnSelector : true,
    },{
        name: 'map_1',
        file: texture.map_1,
        next: 2,
        fog: 5,
        showOnSelector : true,
    },{
        name: 'map_2',
        file: texture.map_2,
        next: 3,
        fog: 5,
        showOnSelector : true,
    },{
        name: 'map_3',
        file: texture.map_3,
        next: 4,
        fog: 5,
        showOnSelector : true,
    },{
        name: 'map_4',
        file: texture.map_4,
        next: 'menu',
        fog: 5,
        showOnSelector : true,
    },{
        name: 't_boomerang',
        file: texture.tutorial_boomerang,
        next: 6,
        fog: 5,
    },{
        name: 't_snake',
        file: texture.tutorial_bat,
        next: 7,
        fog: 5,
    },{
        name: 't_Panels',
        file: texture.tutorial_panel,
        next: 8,
        fog: 5,
    },{
        name: 't_TNT',
        file: texture.tutorial_tnt,
        next: 9,
        fog: 5,
    },{
        name: 't_tp',
        file: texture.tutorial_tp,
        next: 'menu',
        fog: 5,
    }
];