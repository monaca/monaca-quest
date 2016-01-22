var fs = require("fs");
var path = require("path");

JSON_FILES = ['Actors', 'Animations', 'CommonEvents', 'Enemies', 'Items', 'MapInfos', 'Skills', 'System', 'Tilesets', 'Troops', 'Weapons'];

var slice = Array.prototype.slice;

var readAssets = function(json) {
  return {
    animations: readAnimations(json),
    animationIds: readAnimationIds(json),
    battlebacks1: readBattleBacks1(json),
    battlebacks2: readBattleBacks2(json),
    characters: readCharacters(json),
    enemies: readEnemies(json),
    faces: readFaces(json),
    parallaxes: readParallaxes(json),
    pictures: readPictures(json),
    sv_actors: readSvActors(json),
    sv_enemies: readSvEnemies(json),
    tilesets: readTilesets(json),
    tilesetIds: readTilesetIds(json),
    videos: readVideos(json),
    bgm: readBgm(json),
    bgs: readBgs(json),
    me: readMe(json),
    se: readSe(json),
    titles1: [json.System.title1Name],
    titles2: [json.System.title2Name]
  };
};

var searchCommand = function() {
  var codes, commonCommands, idx, json, key, mapCommands, troopCommands, value;
  json = arguments[0], codes = 2 <= arguments.length ? slice.call(arguments, 1) : [];
  commonCommands = (function() {
    var i, ref, results;
    results = [];
    for (idx = i = 0, ref = codes.length / 2; 0 <= ref ? i < ref : i > ref; idx = 0 <= ref ? ++i : --i) {
      results.push(search(json, "CommonEvents[].list[?code==`" + codes[idx * 2] + "`].parameters[" + codes[idx * 2 + 1] + "][]"));
    }
    return results;
  })();
  troopCommands = (function() {
    var i, ref, results;
    results = [];
    for (idx = i = 0, ref = codes.length / 2; 0 <= ref ? i < ref : i > ref; idx = 0 <= ref ? ++i : --i) {
      results.push(search(json, "Troops[*].pages[*].list[*][][][] | [?code==`" + codes[idx * 2] + "`].parameters[" + codes[idx * 2 + 1] + "]"));
    }
    return results;
  })();
  mapCommands = (function() {
    var ref, results;
    ref = json.maps;
    results = [];
    for (key in ref) {
      value = ref[key];
      results.push((function() {
        var i, ref1, results1;
        results1 = [];
        for (idx = i = 0, ref1 = codes.length / 2; 0 <= ref1 ? i < ref1 : i > ref1; idx = 0 <= ref1 ? ++i : --i) {
          results1.push(search(value, "events[*].pages[*].list[*][][][] | [?code==`" + codes[idx * 2] + "`].parameters[" + codes[idx * 2 + 1] + "]"));
        }
        return results1;
      })());
    }
    return results;
  })();
  return _.flatten(commonCommands.concat(_.flatten(mapCommands), troopCommands));
};

var ids2array = function(ids) {
  var i, id, len, result;
  result = [];
  for (i = 0, len = ids.length; i < len; i++) {
    id = ids[i];
    if (id !== null) {
      result[id.id] = id;
    }
  }
  return result;
};

var readVideos = function(json) {
  return searchCommand(json, 261, 0);
};

var readAnimations = function(json) {
  return ids2array(json.Animations);
};

var readAnimationIds = function(json) {
  var commandIds, itemIds, skillIds, weaponIds;
  commandIds = searchCommand(json, 212, 1, 337, 1);
  itemIds = search(json, 'Items[*].animationId');
  skillIds = search(json, 'Skills[*].animationId');
  weaponIds = search(json, 'Weapons[*].animationId');
  return commandIds.concat(itemIds, skillIds, weaponIds);
};

var readBattleBacks1 = function(json) {
  var commandBack1, mapBack1;
  commandBack1 = searchCommand(json, 283, 0);
  mapBack1 = search(json, 'maps.*.battleback1Name');
  return commandBack1.concat(mapBack1);
};

var readBattleBacks2 = function(json) {
  var commandBack2, mapBack2;
  commandBack2 = searchCommand(json, 283, 1);
  mapBack2 = search(json, 'maps.*.battleback2Name');
  return commandBack2.concat(mapBack2);
};

var readCharacters = function(json) {
  var actors, maps, vehicles;
  actors = search(json, 'Actors[*].characterName');
  maps = search(json, 'maps.*.events[*].pages[*].image.characterName[][]');
  vehicles = [json.System.ship.characterName, json.System.airship.characterName, json.System.boat.characterName];
  return actors.concat(vehicles, maps);
};

var readEnemies = function(json) {
  if (!json.System.optSideView) {
    return search(json, 'Enemies[*].battlerName');
  } else {
    return [];
  }
};

var readFaces = function(json) {
  var faceActors, faceCommands;
  faceActors = search(json, 'Actors[*].faceName');
  faceCommands = searchCommand(json, 322, 3, 101, 0);
  return faceActors.concat(faceCommands);
};

var readParallaxes = function(json) {
  return searchCommand(json, 284, 0);
};

var readPictures = function(json) {
  return searchCommand(json, 231, 1);
};

var readSvActors = function(json) {
  if (json.System.optSideView) {
    return search(json, 'Actors[*].battlerName');
  } else {
    return [];
  }
};

var readSvEnemies = function(json) {
  if (json.System.optSideView) {
    return search(json, 'Enemies[*].battlerName');
  } else {
    return [];
  }
};

var readTilesets = function(json) {
  return ids2array(json.Tilesets);
};

var readTilesetIds = function(json) {
  var eventTileset, mapTileset;
  mapTileset = search(json, 'maps.*.tilesetId');
  eventTileset = searchCommand(json, 282, 0);
  return mapTileset.concat(eventTileset);
};

var readBgm = function(json) {
  var commandBgm, mapBgm, sys;
  mapBgm = search(json, 'maps.*.bgm');
  commandBgm = searchCommand(json, 132, 0, 140, 1, 241, 0);
  sys = json.System;
  commandBgm.push(sys.airship.bgm, sys.boat.bgm, sys.ship.bgm, sys.battleBgm, sys.titleBgm);
  return commandBgm.concat(mapBgm);
};

var readBgs = function(json) {
  var commandBgs, mapBgs;
  commandBgs = searchCommand(json, 245, 0);
  mapBgs = search(json, 'maps.*.bgs');
  return commandBgs.concat(mapBgs);
};

var readSe = function(json) {
  var commandSe;
  commandSe = searchCommand(json, 250, 0);
  return commandSe.concat(json.System.sounds);
};

var readMe = function(json) {
  var commandMe, sys;
  commandMe = searchCommand(json, 133, 0, 139, 0, 249, 0);
  sys = json.System;
  commandMe.push(sys.defeatMe, sys.victoryMe, sys.gameoverMe);
  return commandMe;
};

var readJson = function(home, name) {
  return JSON.parse(fs.readFileSync(home + '/data/' + name + '.json'));
};

var readJsons = function(home, files) {
  var file, i, j, len, len1, mapInfo, ref, result;
  result = {
    maps: {}
  };
  for (i = 0, len = files.length; i < len; i++) {
    file = files[i];
    result[file] = readJson(home, file);
  }
  ref = result.MapInfos;
  for (j = 0, len1 = ref.length; j < len1; j++) {
    mapInfo = ref[j];
    if (mapInfo !== null) {
      result.maps[mapInfo.id] = readJson(home, "MAP" + String('000' + mapInfo.id).slice(-3));
    }
  }
  console.log(result.maps[1]);
  return result;
};

var resolveAssets = function(assets) {
  var animations, audio, i, len, ref, resolveAnimations, resolveAudio, resolveTilesets, resolved, tilesets;
  resolveAnimations = function(assets) {
    var a, i, id, len, ref, results;
    ref = assets.animationIds;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      id = ref[i];
      a = assets.animations[id];
      if (id > 0) {
        results.push([a.animation1Name, a.animation2Name]);
      } else {
        results.push(void 0);
      }
    }
    return results;
  };
  resolveTilesets = function(assets) {
    var i, id, len, ref, results;
    ref = assets.tilesetIds;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      id = ref[i];
      if (id > 0) {
        results.push(assets.tilesets[id].tilesetNames);
      } else {
        results.push(void 0);
      }
    }
    return results;
  };
  resolveAudio = function(audioArray) {
    var a, i, len, results;
    results = [];
    for (i = 0, len = audioArray.length; i < len; i++) {
      a = audioArray[i];
      results.push(a.name);
    }
    return results;
  };
  animations = _.flatten(_.compact(resolveAnimations(assets)));
  tilesets = _.flatten(_.compact(resolveTilesets(assets)));
  resolved = _.clone(assets);
  resolved.animations = animations;
  resolved.tilesets = tilesets;
  delete resolved.tilesetIds;
  delete resolved.animationIds;
  ref = ['bgm', 'bgs', 'me', 'se'];
  for (i = 0, len = ref.length; i < len; i++) {
    audio = ref[i];
    resolved[audio] = resolveAudio(assets[audio]);
  }
  return resolved;
};


var makeUniqueAssets = function(assets) {
  var asset, key, result;
  result = {};
  for (key in assets) {
    asset = assets[key];
    result[key] = _.compact(_.uniq(asset));
  }
  return result;
};

var resolveFiles = function(home, assets) {
  var asset, assetName, audio, fileName, resolveAudio, resolveFile, resolveImage, resolveTilesets, resolved;
  resolveFile = function(filePath, name, extensions) {
    var extension, file, i, len, resolved;
    resolved = [];
    for (i = 0, len = extensions.length; i < len; i++) {
      extension = extensions[i];
      file = path.join(filePath, name + extension);
      if (fs.existsSync(file)) {
        resolved.push(file);
      }
    }
    return resolved;
  };
  resolveImage = function(path, name) {
    return resolveFile(path, name, ['.png', '.jpg', '.webm', '.mp4']);
  };
  resolveAudio = function(path, name) {
    return resolveFile(path, name, ['.ogg', '.m4a']);
  };
  resolveTilesets = function(path, name) {
    return resolveFile(path, name, ['.png', '.txt']);
  };
  audio = ['bgm', 'bgs', 'me', 'se'];
  resolved = (function() {
    var results;
    results = [];
    for (assetName in assets) {
      asset = assets[assetName];
      results.push((function() {
        var i, len, results1;
        results1 = [];
        for (i = 0, len = asset.length; i < len; i++) {
          fileName = asset[i];
          if (_.contains(audio, assetName)) {
            results1.push(resolveAudio(path.join(home, 'audio', assetName), fileName));
          } else if (assetName === 'tilesets') {
            results1.push(resolveTilesets(path.join(home, 'img', assetName), fileName));
          } else {
            results1.push(resolveImage(path.join(home, 'img', assetName), fileName));
          }
        }
        return results1;
      })());
    }
    return results;
  })();
  return _.flattenDeep(resolved);
};

var enumAllAssets = function(home) {
  return _.flattenDeep(enumFilesRecur(home));
};

enumIncludeFiles = function(home) {
  var dir, files, includes;
  includes = ['data', 'fonts', 'icon', 'js', path.join('img', 'system')];
  files = (function() {
    var i, len, results;
    results = [];
    for (i = 0, len = includes.length; i < len; i++) {
      dir = includes[i];
      results.push(enumFilesRecur(path.join(home, dir)));
    }
    return results;
  })();
  files.push(path.join(home, 'index.html'));
  return _.flattenDeep(files);
};

excludeAssets = function(all, included) {
  return _.reject(all, function(asset) {
    return _.some(included, function(incl) {
      return incl.toLowerCase() === asset.toLowerCase();
    });
  });
};

module.exports = {
  read: function(home) {
    var allFiles, assets, excludeFiles, files, forceIncludeFiles, includeFiles, json, resolvedAssets, uniqueAssets;
    json = readJsons(home, JSON_FILES);
    assets = readAssets(json);
    resolvedAssets = resolveAssets(assets);
    uniqueAssets = makeUniqueAssets(resolvedAssets);
    files = resolveFiles(home, uniqueAssets);
    allFiles = enumAllAssets(home);
    forceIncludeFiles = enumIncludeFiles(home);
    includeFiles = files.concat(forceIncludeFiles);
    excludeFiles = excludeAssets(allFiles, includeFiles);
    return [includeFiles, excludeFiles];
  }
};

