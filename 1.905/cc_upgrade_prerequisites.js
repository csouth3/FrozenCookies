FrozenCookies.preferenceValues = {
  autoBuy: {
    hint: 'Automatically buy the most efficient building when you\'ve met its cost',
    display: ["Autobuy OFF","Autobuy ON"],
    default: 0
  },
  autoGC: {
    hint: 'Automatically click Golden Cookies when they appear',
    display: ["Autoclick GC OFF", "Autoclick GC ON"],
    default: 0
  },
  autoWrinkler: {
    hint: 'Automatically pop wrinklers efficiently (as fast as possible before you have all halloween cookies, then wait until a purchase)',
    display: ['Autopop Wrinklers OFF', 'Autopop Wrinklers ON'],
    default: 0
  },
  autoReindeer: {
    hint: 'Automatically click reindeer',
    display: ['Autoclick Reindeer OFF', 'Autoclick Reindeer ON'],
    default: 0
  },
  autoClick: {
    hint: 'Click the large cookie.',
    display: ['Autoclick OFF', 'Autoclick ON'],
    default: 0,
    extras: '<a class="option" id="cookieClickSpeed" onclick="updateSpeed(\'cookieClickSpeed\');">${cookieClickSpeed} clicks/sec</a>'
  },
  autoFrenzy: {
    hint: 'Click the large cookie during Clicking Frenzies.',
    display: ['Autofrenzy OFF', 'Autofrenzy ON'],
    default: 0,
    extras: '<a class="option" id="frenzyClickSpeed" onclick="updateSpeed(\'frenzyClickSpeed\');">${frenzyClickSpeed} clicks/sec</a>'
  },
  autoBlacklistOff: {
    hint: 'Automatically turns off a blacklist once the goal for that blacklist is achieved',
    display: ['Auto Blacklist OFF', 'Auto Blacklist ON'],
    default: 0
  },
  blacklist: {
    hint: 'Blacklist purchases from the efficiency calculations',
    display: ['No Blacklist', 'Speedrun Blacklist', 'Hardcore Blacklist', 'Grandmapocalypse Mode', 'No Buildings', 'Building Achievement Blacklist'],
    default: 0
  },
  autoUpdateBuildingAchievementBlacklist: {
	  hint: 'Automatically adds buildings to the Building Achievement Blacklist once the target amount of that building is achieved (otherwise this blacklist must be set manually in javascript)',
	  display: ['Auto Update Building Achievement Blacklist OFF', 'Auto Update Building Achievement Blacklist ON'],
	  default: 0
  },
  blacklistAllUpgradesInBuildingAchievementBlacklist: {
    hint: 'Set whether the Building Achievement Blacklist option purchases upgrades or not',
    display: ['Allow all upgrade purchases', 'Blacklist all upgrades'],
    default: 0
  },
/*  timeTravelMethod: {
    hint: 'Time travel is unstable. This determines how time travel works. If you\'re unsure, don\'t touch this.',
    display: ['Time Travel DISABLED'],//,'Purchases by Estimated Effective CPS','Purchases by Simulated Real Time','Heavenly Chips by Estimated Effective CPS','Heavenly Chips by Simulated Real Time'],
    default: 0,
    extras: '<a class="option" id="timeTravelPurchases" onclick="updateTimeTravelAmount();">Set Time Travel Amount</a>'
  },*/
  pastemode: {
    hint: 'Always autobuy the least efficient purchase. This is a stupid idea, you should never turn this on.',
    display: ['Pastemode OFF','Pastemode ON'],
    default: 0
  },
  simulatedGCPercent: {
    hint: 'What percentage of Golden Cookies should be assumed as "clicked" for GC efficiency calculations (100% recommended)',
    display: ["0%","100%"],
    default: 1
  },
  logging: {
    hint: 'Display detailed logs in the javascript console.',
    display: ['Logging OFF', 'Logging ON'],
    default: 1
  },
  trackStats: {
    hint: 'Track your CPS/HC earned over time during a single session to enable graphing. This may end up being *extremely* memory-intensive.',
    display: ['Tracking OFF', 'Every 60s', 'Every 30m', 'Every 1h', 'Every 24h', 'On upgrades', 'Smart Timing'],
    default: 0,
    extras: '<a class="option" id="viewStats" onclick="viewStatGraphs();">View Stat Graphs</a>'
  },
  numberDisplay: {
    hint: 'Change how numbers are shortened',
    display: ["Raw Numbers","Full Word (million, billion)","Initials (M, B)","SI Units (M, G, T)", "Scientific Notation (x10Â¹Â²)"],
    default: 1
  }
};

// Reuse built-in info for creating at least some of the list. Will add more as I figure it out.
function tieredUpgradeBuilder() {
  return _.flatten(Game.ObjectsById.map(function(o){return o.tieredUpgrades})).map(function(u){
    var builds = Game.ObjectsById.map(function(){return 0});
    builds[u.buildingTie.id] = Game.Tiers[u.tier].unlock;
    return {id: u.id, upgrades: [], buildings: builds};
  });
}

var upgradeJson = _.union(tieredUpgradeBuilder(), [
  {id: 0, buildings: [1,0,0,0,0,0,0,0,0,0,0,0,0,0], upgrades: []},
  {id: 1, buildings: [1,0,0,0,0,0,0,0,0,0,0,0,0,0], upgrades: []},
  {id: 2, buildings: [10,0,0,0,0,0,0,0,0,0,0,0,0,0], upgrades: []},
  {id: 3, buildings: [20,0,0,0,0,0,0,0,0,0,0,0,0,0], upgrades: []},
  {id: 4, buildings: [40,0,0,0,0,0,0,0,0,0,0,0,0,0], upgrades: []},
  {id: 5, buildings: [80,0,0,0,0,0,0,0,0,0,0,0,0,0], upgrades: []},
  {id: 6, buildings: [120,0,0,0,0,0,0,0,0,0,0,0,0,0], upgrades: []},
  {id: 43, buildings: [160,0,0,0,0,0,0,0,0,0,0,0,0,0], upgrades: []},
  {id: 82, buildings: [200,0,0,0,0,0,0,0,0,0,0,0,0,0], upgrades: []},
  {id: 109, buildings: [240,0,0,0,0,0,0,0,0,0,0,0,0,0], upgrades: []},
  {id: 188, buildings: [280,0,0,0,0,0,0,0,0,0,0,0,0,0], upgrades: []},
  {id: 189, buildings: [320,0,0,0,0,0,0,0,0,0,0,0,0,0], upgrades: []},
  
  {id: 57, buildings: [0,1,15,0,0,0,0,0,0,0,0,0,0,0], upgrades: []},
  {id: 58, buildings: [0,1,0,15,0,0,0,0,0,0,0,0,0,0], upgrades: []},
  {id: 59, buildings: [0,1,0,0,15,0,0,0,0,0,0,0,0,0], upgrades: []},
  {id: 60, buildings: [0,1,0,0,0,15,0,0,0,0,0,0,0,0], upgrades: []},
  {id: 61, buildings: [0,1,0,0,0,0,15,0,0,0,0,0,0,0], upgrades: []},
  {id: 62, buildings: [0,1,0,0,0,0,0,15,0,0,0,0,0,0], upgrades: []},
  {id: 63, buildings: [0,1,0,0,0,0,0,0,15,0,0,0,0,0], upgrades: []},
  {id: 103, buildings: [0,1,0,0,0,0,0,0,0,15,0,0,0,0], upgrades: []},
  {id: 180, buildings: [0,1,0,0,0,0,0,0,0,0,15,0,0,0], upgrades: []},
  {id: 250, buildings: [0,1,0,0,0,0,0,0,0,0,0,15,0,0], upgrades: []},
  {id: 251, buildings: [0,1,0,0,0,0,0,0,0,0,0,0,15,0], upgrades: []},
  {id: 252, buildings: [0,1,0,0,0,0,0,0,0,0,0,0,0,15], upgrades: []},
  
  {id: 64, buildings: [0,6,0,0,0,0,0,0,0,0,0], upgrades: [57,58,59,60,61,62,63]},
  
  {id: 65, buildings: [], upgrades: [64]},
  {id: 66, buildings: [], upgrades: [65]},
  {id: 67, buildings: [], upgrades: [66]},
  {id: 68, buildings: [], upgrades: [67]},
  {id: 69, buildings: [], upgrades: [68]},
  {id: 70, buildings: [], upgrades: [69]},
  {id: 71, buildings: [], upgrades: [70]},
  {id: 72, buildings: [], upgrades: [71]},
  {id: 73, buildings: [], upgrades: [72]},
  {id: 74, buildings: [], upgrades: [73]},
  {id: 75, buildings: [], upgrades: [73]},
  {id: 84, buildings: [], upgrades: [73]},
  {id: 85, buildings: [], upgrades: [73]},
  
  {id: 130, buildings: [], upgrades: [129]},
  {id: 131, buildings: [], upgrades: [130]},
  {id: 132, buildings: [], upgrades: [131]},
  {id: 133, buildings: [], upgrades: [132]},
  
  {id: 152, buildings: [], upgrades: [182]},
  {id: 153, buildings: [], upgrades: [152], santa: 1},
  {id: 154, buildings: [], upgrades: [152], santa: 1},
  {id: 155, buildings: [], upgrades: [152], santa: 1},
  {id: 156, buildings: [], upgrades: [152], santa: 1},
  {id: 157, buildings: [], upgrades: [152], santa: 1},
  {id: 158, buildings: [], upgrades: [152], santa: 1},
  {id: 159, buildings: [], upgrades: [152], santa: 1},
  {id: 160, buildings: [], upgrades: [152], santa: 1},
  {id: 161, buildings: [], upgrades: [152], santa: 1},
  {id: 162, buildings: [], upgrades: [152], santa: 1},
  {id: 163, buildings: [], upgrades: [152], santa: 1},
  {id: 164, buildings: [], upgrades: [152], santa: 1},
  {id: 165, buildings: [], upgrades: [152], santa: 1},
  {id: 166, buildings: [], upgrades: [152], santa: 1},
  {id: 168, buildings: [], upgrades: [152], santa: 14},
  
  {id: 182, buildings: [], upgrades: [181]},
  {id: 183, buildings: [], upgrades: [181]},
  {id: 184, buildings: [], upgrades: [181]},
  
  {id: 134, buildings: [], upgrades: [69,183], wrinklers: 1},
  {id: 135, buildings: [], upgrades: [69,183], wrinklers: 1},
  {id: 136, buildings: [], upgrades: [69,183], wrinklers: 1},
  {id: 137, buildings: [], upgrades: [69,183], wrinklers: 1},
  {id: 138, buildings: [], upgrades: [69,183], wrinklers: 1},
  {id: 139, buildings: [], upgrades: [69,183], wrinklers: 1},
  {id: 140, buildings: [], upgrades: [69,183], wrinklers: 1},
  
  {id: 143, buildings: [], upgrades: [182]},
  {id: 144, buildings: [], upgrades: [182]},
  {id: 145, buildings: [], upgrades: [182]},
  {id: 146, buildings: [], upgrades: [182]},
  {id: 147, buildings: [], upgrades: [182]},
  {id: 148, buildings: [], upgrades: [182]},
  {id: 149, buildings: [], upgrades: [182]},
  
  {id: 169, buildings: [], upgrades: [184]},
  {id: 170, buildings: [], upgrades: [169,184]},
  {id: 171, buildings: [], upgrades: [170,184]},
  {id: 172, buildings: [], upgrades: [171,184]},
  {id: 173, buildings: [], upgrades: [172,184]},
  {id: 174, buildings: [], upgrades: [173,184]},
  
  {id: 210, buildings: [], upgrades: [209]},
  {id: 211, buildings: [], upgrades: [209]},
  {id: 212, buildings: [], upgrades: [209]},
  {id: 213, buildings: [], upgrades: [209]},
  {id: 214, buildings: [], upgrades: [209]},
  {id: 215, buildings: [], upgrades: [209]},
  {id: 216, buildings: [], upgrades: [209]},
  {id: 217, buildings: [], upgrades: [209]},
  {id: 218, buildings: [], upgrades: [209]},
  {id: 219, buildings: [], upgrades: [209]},
  {id: 220, buildings: [], upgrades: [209]},
  {id: 221, buildings: [], upgrades: [209]},
  {id: 222, buildings: [], upgrades: [209]},
  {id: 223, buildings: [], upgrades: [209]},
  {id: 224, buildings: [], upgrades: [209]},
  {id: 225, buildings: [], upgrades: [209]},
  {id: 226, buildings: [], upgrades: [209]},
  {id: 227, buildings: [], upgrades: [209]},
  {id: 228, buildings: [], upgrades: [209]},
  {id: 229, buildings: [], upgrades: [209]}
]);

var blacklist = [
  {
    upgrades: [],
    buildings: []
  },
  {
    upgrades: [129,130,131,132,133],
    buildings: []
  },
  {
    upgrades: true,
    buildings: []
  },
  {
    upgrades: [71, 72, 73, 74, 84, 85],
    buildings: []
  },
  {
    upgrades: [],
    buildings: true
  },
  {
	  upgrades: [183, 184, 185, 209],
	  buildings: []
  }
];

var halloweenCookies = [134,135,136,137,138,139,140];
var christmasCookies = [143,144,145,146,147,148,149];
var holidayCookies = {
  halloween: [134,135,136,137,138,139,140],
  christmas: [143,144,145,146,147,148,149],
  valentines: [169,170,171,172,173,174],
  easter: [210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229]
}

var cookieInfo = {
  clot:        {odds: [0,0.10386789477947,0.19565417350258,0.279830557040944],                   overlaps:['clot']},
  frenzy:      {odds: [0.475438636303817,0.330397784579005,0.17665214624519,0],                  overlaps:['frenzy']},
  blood:       {odds: [0,0.021118483342717,0.042826537084539,0.065166067095688],                 overlaps:['blood']},
  chain:       {odds: [0.004445863757111,0.025152456647178,0.046465712706818,0.068600124409242], overlaps:['chain']},
  ruin:        {odds: [0,0.059020277260868,0.111661484235184,0.171880882712373],                 overlaps:['ruin', 'frenzyRuin', 'clotRuin']},
  frenzyRuin:  {odds: [0,0.031491314174174,0.033674609798233,0],                                 overlaps:[]},
  clotRuin:    {odds: [0,0.013356303344429,0.050318079469162,0.107949674328571],                 overlaps:[]},
  lucky:       {odds: [0.070071731013916,0.113288563286977,0.146693408687535,0.171634249195106], overlaps:['lucky', 'frenzyLucky', 'clotLucky']},
  frenzyLucky: {odds: [0.405366905290347,0.219293086015375,0.083880131161928,0],                 overlaps:[]},
  clotLucky:   {odds: [0,0.046715208884435,0.081736878830784,0.107949674328571],                 overlaps:[]},
  click:       {odds: [0.022561043069409,0.020309670016808,0.019242724580528,0.019177860550822], overlaps:['click', 'frenzyClick', 'clotClick']},
  frenzyClick: {odds: [0.022115820565423,0.012720131151967,0.005384749977878,0],                 overlaps:[]},
  clotClick:   {odds: [0,0.001307530606642,0.005809363719639,0.007810910338684],                 overlaps:[]},
  blah:        {odds: [0,0,0,0],                                                                 overlaps:['blah']}
};

function generateProbabilities(upgradeMult, minBase, maxMult) {
  var cumProb = [];
  var remainingProbability = 1;
  var minTime = minBase * upgradeMult;
  var maxTime = maxMult * minTime;
  var spanTime = maxTime - minTime;
  for (var i=0; i<maxTime; i++) {
    var thisFrame = remainingProbability * Math.pow(Math.max(0,(i-minTime)/spanTime),5);
    remainingProbability -= thisFrame;
    cumProb.push(1 - remainingProbability);
  }
  return cumProb;
}

function combine(a) {
  var fn = function(n, src, got, all) {
    if (n == 0) {
      if (got.length > 0) {
        all[all.length] = got;
      }
      return;
    }
    for (var j = 0; j < src.length; j++) {
      fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
    }
    return;
  }
  var all = [];
  for (var i=0; i < a.length; i++) {
    fn(i, a, [], all);
  }
  all.push(a);
  return all;
}

var cumulativeProbabilityList = {
  golden : _.uniq(combine([0.95, 0.5, 0.5, 0.95, 0.95, 0.95, 0.98]).map(function(arr){return arr.reduce(function(r,i){return r*i},1)})).reduce(function(r,x) {
    r[x] = generateProbabilities(x, 5 * 60 * Game.fps, 3);
    return r;
  }, {}),
  reindeer : [1, 0.5].reduce(function(r,x) {
    r[x] = generateProbabilities(x, 3 * 60 * Game.fps, 2);
    return r;
  }, {})
};
