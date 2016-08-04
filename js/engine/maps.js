var Maps = [
    {
        name: 'level 1',
        file: texture.map1,
        next: 1,
        fog: 10,
        startLevel : 0,
        currentLevel : 0,
        
        // Map Stairs
        levels : [
            texture.map1,
            texture.map2,
        ]
    },{
        name: 'level 2',
        file: texture.map2,
        next: 2,
        fog: 8,
    },{
        name: 'level 3',
        file: texture.map3,
        next: 0,
        fog: 6,
    }
];