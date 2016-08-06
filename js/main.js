// Making readable item list
var ItemsList = {};

//@codekit-prepend 'engine/mapData.js';

for (var item in MapObjects) {
    if (!MapObjects.hasOwnProperty(item)) continue;
    var id = MapObjects[item].name.toLowerCase();
    ItemsList[id] = MapObjects[item];   
    ItemsList[id].uuid = item;   
}

//@codekit-prepend 'engine/functions.js';

//@codekit-prepend 'engine/texture.js';



//@codekit-prepend 'engine/keyHandler.js';

//@codekit-prepend 'engine/loop.js';

//@codekit-prepend 'engine/engine.js';

//@codekit-prepend 'engine/maps.js';