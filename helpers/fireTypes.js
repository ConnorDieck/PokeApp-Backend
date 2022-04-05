const fireTypes = [
	{
		id        : 4,
		pokedexNo : 4,
		name      : "Charmander",
		url       : "https://pokeapi.co/api/v2/pokemon/4",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
		type1     : "Fire",
		type2     : null
	},
	{
		id        : 5,
		pokedexNo : 5,
		name      : "Charmeleon",
		url       : "https://pokeapi.co/api/v2/pokemon/5",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png",
		type1     : "Fire",
		type2     : null
	},
	{
		id        : 6,
		pokedexNo : 6,
		name      : "Charizard",
		url       : "https://pokeapi.co/api/v2/pokemon/6",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
		type1     : "Fire",
		type2     : "Flying"
	},
	{
		id        : 42,
		pokedexNo : 37,
		name      : "Vulpix",
		url       : "https://pokeapi.co/api/v2/pokemon/37",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/37.png",
		type1     : "Fire",
		type2     : null
	},
	{
		id        : 44,
		pokedexNo : 38,
		name      : "Ninetales",
		url       : "https://pokeapi.co/api/v2/pokemon/38",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/38.png",
		type1     : "Fire",
		type2     : null
	},
	{
		id        : 70,
		pokedexNo : 58,
		name      : "Growlithe",
		url       : "https://pokeapi.co/api/v2/pokemon/58",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/58.png",
		type1     : "Fire",
		type2     : null
	},
	{
		id        : 71,
		pokedexNo : 59,
		name      : "Arcanine",
		url       : "https://pokeapi.co/api/v2/pokemon/59",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/59.png",
		type1     : "Fire",
		type2     : null
	},
	{
		id        : 92,
		pokedexNo : 77,
		name      : "Ponyta",
		url       : "https://pokeapi.co/api/v2/pokemon/77",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/77.png",
		type1     : "Fire",
		type2     : null
	},
	{
		id        : 94,
		pokedexNo : 78,
		name      : "Rapidash",
		url       : "https://pokeapi.co/api/v2/pokemon/78",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/78.png",
		type1     : "Fire",
		type2     : null
	},
	{
		id        : 129,
		pokedexNo : 105,
		name      : "Alolan Marowak",
		url       : "https://pokeapi.co/api/v2/pokemon/10115/",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10115.png",
		type1     : "Fire",
		type2     : "Ghost"
	},
	{
		id        : 152,
		pokedexNo : 126,
		name      : "Magmar",
		url       : "https://pokeapi.co/api/v2/pokemon/126",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/126.png",
		type1     : "Fire",
		type2     : null
	},
	{
		id        : 162,
		pokedexNo : 136,
		name      : "Flareon",
		url       : "https://pokeapi.co/api/v2/pokemon/136",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/136.png",
		type1     : "Fire",
		type2     : null
	},
	{
		id        : 174,
		pokedexNo : 146,
		name      : "Moltres",
		url       : "https://pokeapi.co/api/v2/pokemon/146",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/146.png",
		type1     : "Fire",
		type2     : "Flying"
	},
	{
		id        : 184,
		pokedexNo : 155,
		name      : "Cyndaquil",
		url       : "https://pokeapi.co/api/v2/pokemon/155",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/155.png",
		type1     : "Fire",
		type2     : null
	},
	{
		id        : 185,
		pokedexNo : 156,
		name      : "Quilava",
		url       : "https://pokeapi.co/api/v2/pokemon/156",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/156.png",
		type1     : "Fire",
		type2     : null
	},
	{
		id        : 186,
		pokedexNo : 157,
		name      : "Typhlosion",
		url       : "https://pokeapi.co/api/v2/pokemon/157",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/157.png",
		type1     : "Fire",
		type2     : null
	},
	{
		id        : 248,
		pokedexNo : 218,
		name      : "Slugma",
		url       : "https://pokeapi.co/api/v2/pokemon/218",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/218.png",
		type1     : "Fire",
		type2     : null
	},
	{
		id        : 249,
		pokedexNo : 219,
		name      : "Magcargo",
		url       : "https://pokeapi.co/api/v2/pokemon/219",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/219.png",
		type1     : "Fire",
		type2     : "Rock"
	},
	{
		id        : 259,
		pokedexNo : 228,
		name      : "Houndour",
		url       : "https://pokeapi.co/api/v2/pokemon/228",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/228.png",
		type1     : "Dark",
		type2     : "Fire"
	},
	{
		id        : 260,
		pokedexNo : 229,
		name      : "Houndoom",
		url       : "https://pokeapi.co/api/v2/pokemon/229",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/229.png",
		type1     : "Dark",
		type2     : "Fire"
	},
	{
		id        : 271,
		pokedexNo : 240,
		name      : "Magby",
		url       : "https://pokeapi.co/api/v2/pokemon/240",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/240.png",
		type1     : "Fire",
		type2     : null
	},
	{
		id        : 275,
		pokedexNo : 244,
		name      : "Entei",
		url       : "https://pokeapi.co/api/v2/pokemon/244",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/244.png",
		type1     : "Fire",
		type2     : null
	},
	{
		id        : 281,
		pokedexNo : 250,
		name      : "Ho-Oh",
		url       : "https://pokeapi.co/api/v2/pokemon/250",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/250.png",
		type1     : "Fire",
		type2     : "Flying"
	},
	{
		id        : 286,
		pokedexNo : 255,
		name      : "Torchic",
		url       : "https://pokeapi.co/api/v2/pokemon/255",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/255.png",
		type1     : "Fire",
		type2     : null
	},
	{
		id        : 287,
		pokedexNo : 256,
		name      : "Combusken",
		url       : "https://pokeapi.co/api/v2/pokemon/256",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/256.png",
		type1     : "Fire",
		type2     : "Fighting"
	},
	{
		id        : 288,
		pokedexNo : 257,
		name      : "Blaziken",
		url       : "https://pokeapi.co/api/v2/pokemon/257",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/257.png",
		type1     : "Fire",
		type2     : "Fighting"
	},
	{
		id        : 355,
		pokedexNo : 322,
		name      : "Numel",
		url       : "https://pokeapi.co/api/v2/pokemon/322",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/322.png",
		type1     : "Fire",
		type2     : "Ground"
	},
	{
		id        : 356,
		pokedexNo : 323,
		name      : "Camerupt",
		url       : "https://pokeapi.co/api/v2/pokemon/323",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/323.png",
		type1     : "Fire",
		type2     : "Ground"
	},
	{
		id        : 357,
		pokedexNo : 324,
		name      : "Torkoal",
		url       : "https://pokeapi.co/api/v2/pokemon/324",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/324.png",
		type1     : "Fire",
		type2     : null
	},
	{
		id        : 423,
		pokedexNo : 390,
		name      : "Chimchar",
		url       : "https://pokeapi.co/api/v2/pokemon/390",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/390.png",
		type1     : "Fire",
		type2     : null
	},
	{
		id        : 424,
		pokedexNo : 391,
		name      : "Monferno",
		url       : "https://pokeapi.co/api/v2/pokemon/391",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/391.png",
		type1     : "Fire",
		type2     : "Fighting"
	},
	{
		id        : 425,
		pokedexNo : 392,
		name      : "Infernape",
		url       : "https://pokeapi.co/api/v2/pokemon/392",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/392.png",
		type1     : "Fire",
		type2     : "Fighting"
	},
	{
		id        : 502,
		pokedexNo : 467,
		name      : "Magmortar",
		url       : "https://pokeapi.co/api/v2/pokemon/467",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/467.png",
		type1     : "Fire",
		type2     : null
	},
	{
		id        : 515,
		pokedexNo : 479,
		name      : "Rotom Heat",
		url       : "https://pokeapi.co/api/v2/pokemon/10008",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10008.png",
		type1     : "Electric",
		type2     : "Fire"
	},
	{
		id        : 525,
		pokedexNo : 485,
		name      : "Heatran",
		url       : "https://pokeapi.co/api/v2/pokemon/485",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/485.png",
		type1     : "Fire",
		type2     : "Steel"
	},
	{
		id        : 534,
		pokedexNo : 494,
		name      : "Victini",
		url       : "https://pokeapi.co/api/v2/pokemon/494",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/494.png",
		type1     : "Psychic",
		type2     : "Fire"
	},
	{
		id        : 538,
		pokedexNo : 498,
		name      : "Tepig",
		url       : "https://pokeapi.co/api/v2/pokemon/498",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/498.png",
		type1     : "Fire",
		type2     : null
	},
	{
		id        : 539,
		pokedexNo : 499,
		name      : "Pignite",
		url       : "https://pokeapi.co/api/v2/pokemon/499",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/499.png",
		type1     : "Fire",
		type2     : "Fighting"
	},
	{
		id        : 540,
		pokedexNo : 500,
		name      : "Emboar",
		url       : "https://pokeapi.co/api/v2/pokemon/500",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/500.png",
		type1     : "Fire",
		type2     : "Fighting"
	},
	{
		id        : 553,
		pokedexNo : 513,
		name      : "Pansear",
		url       : "https://pokeapi.co/api/v2/pokemon/513",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/513.png",
		type1     : "Fire",
		type2     : null
	},
	{
		id        : 554,
		pokedexNo : 514,
		name      : "Simisear",
		url       : "https://pokeapi.co/api/v2/pokemon/514",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/514.png",
		type1     : "Fire",
		type2     : null
	},
	{
		id        : 594,
		pokedexNo : 554,
		name      : "Darumaka",
		url       : "https://pokeapi.co/api/v2/pokemon/554",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/554.png",
		type1     : "Fire",
		type2     : null
	},
	{
		id        : 596,
		pokedexNo : 555,
		name      : "Darmanitan",
		url       : "https://pokeapi.co/api/v2/pokemon/555",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/555.png",
		type1     : "Fire",
		type2     : null
	},
	{
		id        : 652,
		pokedexNo : 607,
		name      : "Litwick",
		url       : "https://pokeapi.co/api/v2/pokemon/607",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/607.png",
		type1     : "Ghost",
		type2     : "Fire"
	},
	{
		id        : 653,
		pokedexNo : 608,
		name      : "Lampent",
		url       : "https://pokeapi.co/api/v2/pokemon/608",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/608.png",
		type1     : "Ghost",
		type2     : "Fire"
	},
	{
		id        : 654,
		pokedexNo : 609,
		name      : "Chandelure",
		url       : "https://pokeapi.co/api/v2/pokemon/609",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/609.png",
		type1     : "Ghost",
		type2     : "Fire"
	},
	{
		id        : 677,
		pokedexNo : 631,
		name      : "Heatmor",
		url       : "https://pokeapi.co/api/v2/pokemon/631",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/631.png",
		type1     : "Fire",
		type2     : null
	},
	{
		id        : 682,
		pokedexNo : 636,
		name      : "Larvesta",
		url       : "https://pokeapi.co/api/v2/pokemon/636",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/636.png",
		type1     : "Bug",
		type2     : "Fire"
	},
	{
		id        : 683,
		pokedexNo : 637,
		name      : "Volcarona",
		url       : "https://pokeapi.co/api/v2/pokemon/637",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/637.png",
		type1     : "Bug",
		type2     : "Fire"
	},
	{
		id        : 689,
		pokedexNo : 643,
		name      : "Reshiram",
		url       : "https://pokeapi.co/api/v2/pokemon/643",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/643.png",
		type1     : "Dragon",
		type2     : "Fire"
	},
	{
		id        : 700,
		pokedexNo : 653,
		name      : "Fennekin",
		url       : "https://pokeapi.co/api/v2/pokemon/653",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/653.png",
		type1     : "Fire",
		type2     : null
	},
	{
		id        : 701,
		pokedexNo : 654,
		name      : "Braixen",
		url       : "https://pokeapi.co/api/v2/pokemon/654",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/654.png",
		type1     : "Fire",
		type2     : null
	},
	{
		id        : 702,
		pokedexNo : 655,
		name      : "Delphox",
		url       : "https://pokeapi.co/api/v2/pokemon/655",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/655.png",
		type1     : "Fire",
		type2     : "Psychic"
	},
	{
		id        : 709,
		pokedexNo : 662,
		name      : "Fletchinder",
		url       : "https://pokeapi.co/api/v2/pokemon/662",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/662.png",
		type1     : "Fire",
		type2     : "Flying"
	},
	{
		id        : 710,
		pokedexNo : 663,
		name      : "Talonflame",
		url       : "https://pokeapi.co/api/v2/pokemon/663",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/663.png",
		type1     : "Fire",
		type2     : "Flying"
	},
	{
		id        : 714,
		pokedexNo : 667,
		name      : "Litleo",
		url       : "https://pokeapi.co/api/v2/pokemon/667",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/667.png",
		type1     : "Fire",
		type2     : "Normal"
	},
	{
		id        : 715,
		pokedexNo : 668,
		name      : "Pyroar",
		url       : "https://pokeapi.co/api/v2/pokemon/668",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/668.png",
		type1     : "Fire",
		type2     : "Normal"
	},
	{
		id        : 769,
		pokedexNo : 721,
		name      : "Volcanion",
		url       : "https://pokeapi.co/api/v2/pokemon/721",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/721.png",
		type1     : "Fire",
		type2     : "Water"
	},
	{
		id        : 773,
		pokedexNo : 725,
		name      : "Litten",
		url       : "https://pokeapi.co/api/v2/pokemon/725",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/725.png",
		type1     : "Fire",
		type2     : null
	},
	{
		id        : 774,
		pokedexNo : 726,
		name      : "Torracat",
		url       : "https://pokeapi.co/api/v2/pokemon/726",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/726.png",
		type1     : "Fire",
		type2     : null
	},
	{
		id        : 775,
		pokedexNo : 727,
		name      : "Incineroar",
		url       : "https://pokeapi.co/api/v2/pokemon/727",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/727.png",
		type1     : "Fire",
		type2     : "Dark"
	},
	{
		id        : 789,
		pokedexNo : 741,
		name      : "Oricorio",
		url       : "https://pokeapi.co/api/v2/pokemon/741",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/741.png",
		type1     : "Fire",
		type2     : "Flying"
	},
	{
		id        : 805,
		pokedexNo : 757,
		name      : "Salandit",
		url       : "https://pokeapi.co/api/v2/pokemon/757",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/757.png",
		type1     : "Poison",
		type2     : "Fire"
	},
	{
		id        : 806,
		pokedexNo : 758,
		name      : "Salazzle",
		url       : "https://pokeapi.co/api/v2/pokemon/758",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/758.png",
		type1     : "Poison",
		type2     : "Fire"
	},
	{
		id        : 824,
		pokedexNo : 776,
		name      : "Turtonator",
		url       : "https://pokeapi.co/api/v2/pokemon/776",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/776.png",
		type1     : "Fire",
		type2     : "Dragon"
	},
	{
		id        : 854,
		pokedexNo : 806,
		name      : "Blacephalon",
		url       : "https://pokeapi.co/api/v2/pokemon/806",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/806.png",
		type1     : "Fire",
		type2     : "Ghost"
	},
	{
		id        : 861,
		pokedexNo : 813,
		name      : "Scorbunny",
		url       : "https://pokeapi.co/api/v2/pokemon/813",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/813.png",
		type1     : "Fire",
		type2     : null
	},
	{
		id        : 862,
		pokedexNo : 814,
		name      : "Raboot",
		url       : "https://pokeapi.co/api/v2/pokemon/814",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/814.png",
		type1     : "Fire",
		type2     : null
	},
	{
		id        : 863,
		pokedexNo : 815,
		name      : "Cinderace",
		url       : "https://pokeapi.co/api/v2/pokemon/815",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/815.png",
		type1     : "Fire",
		type2     : null
	},
	{
		id        : 886,
		pokedexNo : 838,
		name      : "Carkol",
		url       : "https://pokeapi.co/api/v2/pokemon/838",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/838.png",
		type1     : "Rock",
		type2     : "Fire"
	},
	{
		id        : 887,
		pokedexNo : 839,
		name      : "Coalossal",
		url       : "https://pokeapi.co/api/v2/pokemon/839",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/839.png",
		type1     : "Rock",
		type2     : "Fire"
	},
	{
		id        : 898,
		pokedexNo : 850,
		name      : "Sizzlipede",
		url       : "https://pokeapi.co/api/v2/pokemon/850",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/850.png",
		type1     : "Fire",
		type2     : "Bug"
	},
	{
		id        : 899,
		pokedexNo : 851,
		name      : "Centiskorch",
		url       : "https://pokeapi.co/api/v2/pokemon/851",
		sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/851.png",
		type1     : "Fire",
		type2     : "Bug"
	}
];

module.exports = fireTypes;
