CREATE TABLE IF NOT EXISTS items (
    name TEXT PRIMARY KEY,
    url VARCHAR(36),
    category VARCHAR(16)
);
INSERT INTO items (name, url, category)
VALUES
    ('occa-berry','https://pokeapi.co/api/v2/item/161/','type-protection'),
    ('passho-berry','https://pokeapi.co/api/v2/item/162/','type-protection'),
    ('wacan-berry','https://pokeapi.co/api/v2/item/163/','type-protection'),
    ('rindo-berry','https://pokeapi.co/api/v2/item/164/','type-protection'),
    ('yache-berry','https://pokeapi.co/api/v2/item/165/','type-protection'),
    ('chople-berry','https://pokeapi.co/api/v2/item/166/','type-protection'),
    ('kebia-berry','https://pokeapi.co/api/v2/item/167/','type-protection'),
    ('shuca-berry','https://pokeapi.co/api/v2/item/168/','type-protection'),
    ('coba-berry','https://pokeapi.co/api/v2/item/169/','type-protection'),
    ('payapa-berry','https://pokeapi.co/api/v2/item/170/','type-protection'),
    ('tanga-berry','https://pokeapi.co/api/v2/item/171/','type-protection'),
    ('charti-berry','https://pokeapi.co/api/v2/item/172/','type-protection'),
    ('kasib-berry','https://pokeapi.co/api/v2/item/173/','type-protection'),
    ('haban-berry','https://pokeapi.co/api/v2/item/174/','type-protection'),
    ('colbur-berry','https://pokeapi.co/api/v2/item/175/','type-protection'),
    ('babiri-berry','https://pokeapi.co/api/v2/item/176/','type-protection'),
    ('chilan-berry','https://pokeapi.co/api/v2/item/177/','type-protection'),
    ('roseli-berry','https://pokeapi.co/api/v2/item/723/','type-protection'),
    ('bright-powder','https://pokeapi.co/api/v2/item/190/','held-items'),
    ('white-herb','https://pokeapi.co/api/v2/item/191/','held-items'),
    ('quick-claw','https://pokeapi.co/api/v2/item/194/','held-items'),
    ('mental-herb','https://pokeapi.co/api/v2/item/196/','held-items'),
    ('kings-rock','https://pokeapi.co/api/v2/item/198/','held-items'),
    ('smoke-ball','https://pokeapi.co/api/v2/item/205/','held-items'),
    ('focus-band','https://pokeapi.co/api/v2/item/207/','held-items'),
    ('scope-lens','https://pokeapi.co/api/v2/item/209/','held-items'),
    ('leftovers','https://pokeapi.co/api/v2/item/211/','held-items'),
    ('shell-bell','https://pokeapi.co/api/v2/item/230/','held-items'),
    ('lax-incense','https://pokeapi.co/api/v2/item/232/','held-items'),
    ('wide-lens','https://pokeapi.co/api/v2/item/242/','held-items'),
    ('muscle-band','https://pokeapi.co/api/v2/item/243/','held-items'),
    ('wise-glasses','https://pokeapi.co/api/v2/item/244/','held-items'),
    ('expert-belt','https://pokeapi.co/api/v2/item/245/','held-items'),
    ('light-clay','https://pokeapi.co/api/v2/item/246/','held-items'),
    ('life-orb','https://pokeapi.co/api/v2/item/247/','held-items'),
    ('power-herb','https://pokeapi.co/api/v2/item/248/','held-items'),
    ('focus-sash','https://pokeapi.co/api/v2/item/252/','held-items'),
    ('zoom-lens','https://pokeapi.co/api/v2/item/253/','held-items'),
    ('metronome','https://pokeapi.co/api/v2/item/254/','held-items'),
    ('destiny-knot','https://pokeapi.co/api/v2/item/257/','held-items'),
    ('black-sludge','https://pokeapi.co/api/v2/item/258/','held-items'),
    ('icy-rock','https://pokeapi.co/api/v2/item/259/','held-items'),
    ('smooth-rock','https://pokeapi.co/api/v2/item/260/','held-items'),
    ('heat-rock','https://pokeapi.co/api/v2/item/261/','held-items'),
    ('damp-rock','https://pokeapi.co/api/v2/item/262/','held-items'),
    ('grip-claw','https://pokeapi.co/api/v2/item/263/','held-items'),
    ('shed-shell','https://pokeapi.co/api/v2/item/272/','held-items'),
    ('big-root','https://pokeapi.co/api/v2/item/273/','held-items'),
    ('razor-claw','https://pokeapi.co/api/v2/item/303/','held-items'),
    ('razor-fang','https://pokeapi.co/api/v2/item/304/','held-items'),
    ('eviolite','https://pokeapi.co/api/v2/item/581/','held-items'),
    ('float-stone','https://pokeapi.co/api/v2/item/582/','held-items'),
    ('rocky-helmet','https://pokeapi.co/api/v2/item/583/','held-items'),
    ('air-balloon','https://pokeapi.co/api/v2/item/584/','held-items'),
    ('red-card','https://pokeapi.co/api/v2/item/585/','held-items'),
    ('ring-target','https://pokeapi.co/api/v2/item/586/','held-items'),
    ('binding-band','https://pokeapi.co/api/v2/item/587/','held-items'),
    ('absorb-bulb','https://pokeapi.co/api/v2/item/588/','held-items'),
    ('cell-battery','https://pokeapi.co/api/v2/item/589/','held-items'),
    ('eject-button','https://pokeapi.co/api/v2/item/590/','held-items'),
    ('pass-orb','https://pokeapi.co/api/v2/item/616/','held-items'),
    ('weakness-policy','https://pokeapi.co/api/v2/item/682/','held-items'),
    ('assault-vest','https://pokeapi.co/api/v2/item/683/','held-items'),
    ('luminous-moss','https://pokeapi.co/api/v2/item/688/','held-items'),
    ('snowball','https://pokeapi.co/api/v2/item/689/','held-items'),
    ('safety-goggles','https://pokeapi.co/api/v2/item/690/','held-items'),
    ('adrenaline-orb','https://pokeapi.co/api/v2/item/883/','held-items'),
    ('terrain-extender','https://pokeapi.co/api/v2/item/896/','held-items'),
    ('protective-pads','https://pokeapi.co/api/v2/item/897/','held-items'),
    ('electric-seed','https://pokeapi.co/api/v2/item/898/','held-items'),
    ('psychic-seed','https://pokeapi.co/api/v2/item/899/','held-items'),
    ('misty-seed','https://pokeapi.co/api/v2/item/900/','held-items'),
    ('grassy-seed','https://pokeapi.co/api/v2/item/901/','held-items'),
    ('throat-spray','https://pokeapi.co/api/v2/item/1176/','held-items'),
    ('eject-pack','https://pokeapi.co/api/v2/item/1177/','held-items'),
    ('heavy-duty-boots','https://pokeapi.co/api/v2/item/1178/','held-items'),
    ('blunder-policy','https://pokeapi.co/api/v2/item/1179/','held-items'),
    ('room-service','https://pokeapi.co/api/v2/item/1180/','held-items'),
    ('utility-umbrella','https://pokeapi.co/api/v2/item/1181/','held-items'),
    ('choice-band','https://pokeapi.co/api/v2/item/197/','choice'),
    ('choice-scarf','https://pokeapi.co/api/v2/item/264/','choice'),
    ('choice-specs','https://pokeapi.co/api/v2/item/274/','choice'),
    ('toxic-orb','https://pokeapi.co/api/v2/item/249/','bad-held-items'),
    ('flame-orb','https://pokeapi.co/api/v2/item/250/','bad-held-items'),
    ('iron-ball','https://pokeapi.co/api/v2/item/255/','bad-held-items'),
    ('lagging-tail','https://pokeapi.co/api/v2/item/256/','bad-held-items'),
    ('sticky-barb','https://pokeapi.co/api/v2/item/265/','bad-held-items'),
    ('full-incense','https://pokeapi.co/api/v2/item/293/','bad-held-items'),
    ('flame-plate','https://pokeapi.co/api/v2/item/275/','plates'),
    ('splash-plate','https://pokeapi.co/api/v2/item/276/','plates'),
    ('zap-plate','https://pokeapi.co/api/v2/item/277/','plates'),
    ('meadow-plate','https://pokeapi.co/api/v2/item/278/','plates'),
    ('icicle-plate','https://pokeapi.co/api/v2/item/279/','plates'),
    ('fist-plate','https://pokeapi.co/api/v2/item/280/','plates'),
    ('toxic-plate','https://pokeapi.co/api/v2/item/281/','plates'),
    ('earth-plate','https://pokeapi.co/api/v2/item/282/','plates'),
    ('sky-plate','https://pokeapi.co/api/v2/item/283/','plates'),
    ('mind-plate','https://pokeapi.co/api/v2/item/284/','plates'),
    ('insect-plate','https://pokeapi.co/api/v2/item/285/','plates'),
    ('stone-plate','https://pokeapi.co/api/v2/item/286/','plates'),
    ('spooky-plate','https://pokeapi.co/api/v2/item/287/','plates'),
    ('draco-plate','https://pokeapi.co/api/v2/item/288/','plates'),
    ('dread-plate','https://pokeapi.co/api/v2/item/289/','plates'),
    ('iron-plate','https://pokeapi.co/api/v2/item/290/','plates'),
    ('pixie-plate','https://pokeapi.co/api/v2/item/684/','plates'),
    ('adamant-orb','https://pokeapi.co/api/v2/item/112/','species-specific'),
    ('lustrous-orb','https://pokeapi.co/api/v2/item/113/','species-specific'),
    ('soul-dew','https://pokeapi.co/api/v2/item/202/','species-specific'),
    ('deep-sea-tooth','https://pokeapi.co/api/v2/item/203/','species-specific'),
    ('deep-sea-scale','https://pokeapi.co/api/v2/item/204/','species-specific'),
    ('light-ball','https://pokeapi.co/api/v2/item/213/','species-specific'),
    ('lucky-punch','https://pokeapi.co/api/v2/item/233/','species-specific'),
    ('metal-powder','https://pokeapi.co/api/v2/item/234/','species-specific'),
    ('thick-club','https://pokeapi.co/api/v2/item/235/','species-specific'),
    ('stick','https://pokeapi.co/api/v2/item/236/','species-specific'),
    ('quick-powder','https://pokeapi.co/api/v2/item/251/','species-specific'),
    ('griseous-orb','https://pokeapi.co/api/v2/item/442/','species-specific'),
    ('douse-drive','https://pokeapi.co/api/v2/item/563/','species-specific'),
    ('shock-drive','https://pokeapi.co/api/v2/item/564/','species-specific'),
    ('burn-drive','https://pokeapi.co/api/v2/item/565/','species-specific'),
    ('chill-drive','https://pokeapi.co/api/v2/item/566/','species-specific'),
    ('red-nectar','https://pokeapi.co/api/v2/item/889/','species-specific'),
    ('yellow-nectar','https://pokeapi.co/api/v2/item/890/','species-specific'),
    ('pink-nectar','https://pokeapi.co/api/v2/item/891/','species-specific'),
    ('purple-nectar','https://pokeapi.co/api/v2/item/892/','species-specific'),
    ('rusted-sword','https://pokeapi.co/api/v2/item/1161/','species-specific'),
    ('rusted-shield','https://pokeapi.co/api/v2/item/1162/','species-specific'),
    ('gengarite','https://pokeapi.co/api/v2/item/695/','mega-stones'),
    ('gardevoirite','https://pokeapi.co/api/v2/item/696/','mega-stones'),
    ('ampharosite','https://pokeapi.co/api/v2/item/697/','mega-stones'),
    ('venusaurite','https://pokeapi.co/api/v2/item/698/','mega-stones'),
    ('charizardite-x','https://pokeapi.co/api/v2/item/699/','mega-stones'),
    ('blastoisinite','https://pokeapi.co/api/v2/item/700/','mega-stones'),
    ('mewtwonite-x','https://pokeapi.co/api/v2/item/701/','mega-stones'),
    ('mewtwonite-y','https://pokeapi.co/api/v2/item/702/','mega-stones'),
    ('blazikenite','https://pokeapi.co/api/v2/item/703/','mega-stones'),
    ('medichamite','https://pokeapi.co/api/v2/item/704/','mega-stones'),
    ('houndoominite','https://pokeapi.co/api/v2/item/705/','mega-stones'),
    ('aggronite','https://pokeapi.co/api/v2/item/706/','mega-stones'),
    ('banettite','https://pokeapi.co/api/v2/item/707/','mega-stones'),
    ('tyranitarite','https://pokeapi.co/api/v2/item/708/','mega-stones'),
    ('scizorite','https://pokeapi.co/api/v2/item/709/','mega-stones'),
    ('pinsirite','https://pokeapi.co/api/v2/item/710/','mega-stones'),
    ('aerodactylite','https://pokeapi.co/api/v2/item/711/','mega-stones'),
    ('lucarionite','https://pokeapi.co/api/v2/item/712/','mega-stones'),
    ('abomasite','https://pokeapi.co/api/v2/item/713/','mega-stones'),
    ('kangaskhanite','https://pokeapi.co/api/v2/item/714/','mega-stones'),
    ('gyaradosite','https://pokeapi.co/api/v2/item/715/','mega-stones'),
    ('absolite','https://pokeapi.co/api/v2/item/716/','mega-stones'),
    ('charizardite-y','https://pokeapi.co/api/v2/item/717/','mega-stones'),
    ('alakazite','https://pokeapi.co/api/v2/item/718/','mega-stones'),
    ('heracronite','https://pokeapi.co/api/v2/item/719/','mega-stones'),
    ('mawilite','https://pokeapi.co/api/v2/item/720/','mega-stones'),
    ('manectite','https://pokeapi.co/api/v2/item/721/','mega-stones'),
    ('garchompite','https://pokeapi.co/api/v2/item/722/','mega-stones'),
    ('latiasite','https://pokeapi.co/api/v2/item/760/','mega-stones'),
    ('latiosite','https://pokeapi.co/api/v2/item/761/','mega-stones'),
    ('swampertite','https://pokeapi.co/api/v2/item/793/','mega-stones'),
    ('sceptilite','https://pokeapi.co/api/v2/item/794/','mega-stones'),
    ('sablenite','https://pokeapi.co/api/v2/item/795/','mega-stones'),
    ('altarianite','https://pokeapi.co/api/v2/item/796/','mega-stones'),
    ('galladite','https://pokeapi.co/api/v2/item/797/','mega-stones'),
    ('audinite','https://pokeapi.co/api/v2/item/798/','mega-stones'),
    ('metagrossite','https://pokeapi.co/api/v2/item/799/','mega-stones'),
    ('sharpedonite','https://pokeapi.co/api/v2/item/800/','mega-stones'),
    ('slowbronite','https://pokeapi.co/api/v2/item/801/','mega-stones'),
    ('steelixite','https://pokeapi.co/api/v2/item/802/','mega-stones'),
    ('pidgeotite','https://pokeapi.co/api/v2/item/803/','mega-stones'),
    ('glalitite','https://pokeapi.co/api/v2/item/804/','mega-stones'),
    ('diancite','https://pokeapi.co/api/v2/item/805/','mega-stones'),
    ('cameruptite','https://pokeapi.co/api/v2/item/808/','mega-stones'),
    ('lopunnite','https://pokeapi.co/api/v2/item/809/','mega-stones'),
    ('salamencite','https://pokeapi.co/api/v2/item/810/','mega-stones'),
    ('beedrillite','https://pokeapi.co/api/v2/item/811/','mega-stones'),
    ('normalium-z--held','https://pokeapi.co/api/v2/item/817/','z-crystals'),
    ('firium-z--held','https://pokeapi.co/api/v2/item/818/','z-crystals'),
    ('waterium-z--held','https://pokeapi.co/api/v2/item/819/','z-crystals'),
    ('electrium-z--held','https://pokeapi.co/api/v2/item/820/','z-crystals'),
    ('grassium-z--held','https://pokeapi.co/api/v2/item/821/','z-crystals'),
    ('icium-z--held','https://pokeapi.co/api/v2/item/822/','z-crystals'),
    ('fightinium-z--held','https://pokeapi.co/api/v2/item/823/','z-crystals'),
    ('poisonium-z--held','https://pokeapi.co/api/v2/item/824/','z-crystals'),
    ('groundium-z--held','https://pokeapi.co/api/v2/item/825/','z-crystals'),
    ('flyinium-z--held','https://pokeapi.co/api/v2/item/826/','z-crystals'),
    ('psychium-z--held','https://pokeapi.co/api/v2/item/827/','z-crystals'),
    ('buginium-z--held','https://pokeapi.co/api/v2/item/828/','z-crystals'),
    ('rockium-z--held','https://pokeapi.co/api/v2/item/829/','z-crystals'),
    ('ghostium-z--held','https://pokeapi.co/api/v2/item/830/','z-crystals'),
    ('dragonium-z--held','https://pokeapi.co/api/v2/item/831/','z-crystals'),
    ('darkinium-z--held','https://pokeapi.co/api/v2/item/832/','z-crystals'),
    ('steelium-z--held','https://pokeapi.co/api/v2/item/833/','z-crystals'),
    ('fairium-z--held','https://pokeapi.co/api/v2/item/834/','z-crystals'),
    ('pikanium-z--held','https://pokeapi.co/api/v2/item/835/','z-crystals'),
    ('decidium-z--held','https://pokeapi.co/api/v2/item/839/','z-crystals'),
    ('incinium-z--held','https://pokeapi.co/api/v2/item/840/','z-crystals'),
    ('primarium-z--held','https://pokeapi.co/api/v2/item/841/','z-crystals'),
    ('tapunium-z--held','https://pokeapi.co/api/v2/item/842/','z-crystals'),
    ('marshadium-z--held','https://pokeapi.co/api/v2/item/843/','z-crystals'),
    ('aloraichium-z--held','https://pokeapi.co/api/v2/item/844/','z-crystals'),
    ('snorlium-z--held','https://pokeapi.co/api/v2/item/845/','z-crystals'),
    ('eevium-z--held','https://pokeapi.co/api/v2/item/846/','z-crystals'),
    ('mewnium-z--held','https://pokeapi.co/api/v2/item/847/','z-crystals'),
    ('pikashunium-z--held','https://pokeapi.co/api/v2/item/877/','z-crystals');
