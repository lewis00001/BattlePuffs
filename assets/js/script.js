// selects and displays random background image for the .content section
$(document).ready(function() {

    console.log( puffs );

    var images = ['bg1.jpg', 'bg2.jpg', 'bg3.jpg', 'bg4.jpg'];
    $('.bg').css({'background-image': 'url(\"assets/images/' + 
        images[Math.floor(Math.random() * images.length)] + '\")'});
    
    // assigns names and stats to all puffs
    loadStats();
    displayDestroyerSelections();
});

// puff objects
let puffs = {
    p1 : {
        name          : null,
        healthPoints  : null,
        attackPower   : null,
        counterAttack : null,
        image         : ["<img class='select_d' src='assets/images/puffy_1.png'>"]
    },
    p2 : {
        name          : null,
        healthPoints  : null,
        attackPower   : null,
        counterAttack : null,
        image         : ["url('assets/images/puffy_2.png')"]
    },
    p3 : {
        name          : null,
        healthPoints  : null,
        attackPower   : null,
        counterAttack : null,
        image         : ["url('assets/images/puffy_3.png')"]
    },
    p4 : {
        name          : null,
        healthPoints  : null,
        attackPower   : null,
        counterAttack : null,
        image         : ["url('assets/images/puffy_4.png')"]
    }
}

// name generator - returns random name
function genName() {
    let first  = ["Doom ", "Fire ", "Merciless ", "Thunderous ", "Wicked ", "Epic ", "Evil ", "Nuclear ",
                  "Dark ", "Poison ", "Iron ", "Explosive ", "Hideous ", "Hellacious ", "Corrosive ",
                  "Acid ", "Magma ", "Chronic ", "Unspeakable ", "Mysterious ", "Reckless "];
    let second = ["Spitter", "Bash", "Fist", "Invasion", "Blast", "Night", "Ax", "Crusher", "Sting",
                  "Spike", "Scream", "Riot", "Slice", "Tomb", "Sword", "Enslaver", "Titan", "Chomp",
                  "Disaster", "Flood", "Hurricane", "Ninja"];
    let n_1 = first  [Math.floor (Math.random() * first.length)  ];
    let n_2 = second [Math.floor (Math.random() * second.length) ];
    return n_1 + n_2;
}

// hp generator - returns random hp + 20;
function hpGen() {
    let base = 20;
    let rand = Math.floor(Math.random() * 80);
    return base + rand;
}

// attack and counter attack power generator - returns random attack power
function aPower() {
    let base = 5;
    let rand = Math.floor(Math.random() * 15);
    return base + rand;
}

// loads stats into each puff object
function loadStats() {
    let a = [puffs.p1, puffs.p2, puffs.p3, puffs.p4];
    for (let i = 0; i < 4; i++) {
        a[i].name = genName();
        a[i].healthPoints  = hpGen();
        a[i].attackPower   = aPower();
        a[i].counterAttack = aPower();
    }
}

// displays the name and stats of the puffs
function displayDestroyerSelections() {

    let a  = [puffs.p1, puffs.p2, puffs.p3, puffs.p4];
    let c  = ["#card_1", "#card_2", "#card_3", "#card_4"];
    let sc = ["#statsCard_1", "#statsCard_2", "#statsCard_3", "#statsCard_4"];
    for (let i = 0; i < 4; i++) {
        $(c[i]).html(a[i].name);
        $(sc[i]).html(
            "<p>Health Points </p><span class='statSpan'>"  + a[i].healthPoints   + "</span><br>" + 
            "<p>Attack Power </p><span class='statSpan'>"   + a[i].attackPower    + "</span><br>" +  
            "<p>Counter Attack </p><span class='statSpan'>" + a[i].counterAttack  + "</span>"
        );
    }
}