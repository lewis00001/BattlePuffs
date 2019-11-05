// selects and displays random background image for the .content section
$(document).ready(function () {

    // puff objects
    let puffs = {
        p1: {
            name: null,
            healthPoints: null,
            attackPower: null,
            counterAttack: null,
            selected: false,
            activeEnemy: false,
            wasDestroyed: false,
            image: ["<img class='d_img feefer puff' id='ci_1' src='assets/images/puffy_1.png'>"]
        },
        p2: {
            name: null,
            healthPoints: null,
            attackPower: null,
            counterAttack: null,
            selected: false,
            activeEnemy: false,
            wasDestroyed: false,
            image: ["<img class='d_img feefer puff' id='ci_2' src='assets/images/puffy_2.png'>"]
        },
        p3: {
            name: null,
            healthPoints: null,
            attackPower: null,
            counterAttack: null,
            selected: false,
            activeEnemy: false,
            wasDestroyed: false,
            image: ["<img class='d_img feefer puff' id='ci_3' src='assets/images/puffy_3.png'>"]
        },
        p4: {
            name: null,
            healthPoints: null,
            attackPower: null,
            counterAttack: null,
            selected: false,
            activeEnemy: false,
            wasDestroyed: false,
            image: ["<img class='d_img feefer puff' id='ci_4' src='assets/images/puffy_4.png'>"]
        }
    }

    var images = ['bg1.jpg', 'bg2.jpg', 'bg3.jpg', 'bg4.jpg'];
    $('.bg').css({
        'background-image': 'url(\"assets/images/' +
            images[Math.floor(Math.random() * images.length)] + '\")'
    });

    // assigns names and stats to all puffs
    loadStats();
    displayDestroyerSelections();

    // listen for start button click
    $("#startButton").click(function () {
        // play eClick sound
        $("audio#eClick")[0].play();
        // hide startButton
        $("#startButton").addClass("hidden");
        // unhide destroyerSelection
        $("#destroyerSelection").removeClass("hidden");
    });

    // name generator - returns random name
    function genName() {
        let first = ["Doom ", "Fire ", "Merciless ", "Thunderous ", "Wicked ", "Epic ", "Evil ", "Nuclear ",
            "Dark ", "Poison ", "Iron ", "Explosive ", "Hideous ", "Hellacious ", "Corrosive ",
            "Acid ", "Magma ", "Chronic ", "Unspeakable ", "Mysterious ", "Reckless "
        ];
        let second = ["Spitter", "Bash", "Fist", "Invasion", "Blast", "Night", "Ax", "Crusher", "Sting",
            "Spike", "Scream", "Riot", "Slice", "Tomb", "Sword", "Enslaver", "Titan", "Chomp",
            "Disaster", "Flood", "Hurricane", "Ninja"
        ];
        let n_1 = first[Math.floor(Math.random() * first.length)];
        let n_2 = second[Math.floor(Math.random() * second.length)];
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
            a[i].healthPoints = hpGen();
            a[i].attackPower = aPower();
            a[i].counterAttack = aPower();
        }
    }

    // displays the name and stats of the puffs
    function displayDestroyerSelections() {

        let a = [puffs.p1, puffs.p2, puffs.p3, puffs.p4];
        let c = ["#card_1", "#card_2", "#card_3", "#card_4"];
        let ci = ["#cardImg_1", "#cardImg_2", "#cardImg_3", "#cardImg_4", ]
        let sc = ["#statsCard_1", "#statsCard_2", "#statsCard_3", "#statsCard_4"];
        for (let i = 0; i < 4; i++) {
            $(c[i]).html(a[i].name);
            $(ci[i]).html(a[i].image[0]);
            $(sc[i]).html(
                "<p>Health Points </p><span class='statSpan'>" + a[i].healthPoints + "</span><br>" +
                "<p>Attack Power </p><span class='statSpan'>" + a[i].attackPower + "</span><br>" +
                "<p>Counter Attack </p><span class='statSpan'>" + a[i].counterAttack + "</span>"
            );
        }

        //listen for card click
        $(".feefer").click(function () {
            // play feefer sound
            $("audio#feefer")[0].play();
        }); 
    }

    // updates puff object with selection 
    $(".d_img").click(function () {
        var id = $(this).attr('id');
        switch (id) {
            case 'ci_1':
                puffs.p1.selected = true;
                break;
            case 'ci_2':
                puffs.p2.selected = true;
                break;
            case 'ci_3':
                puffs.p3.selected = true;
                break;
            case 'ci_4':
                puffs.p4.selected = true;
                break;
        }

        // sets up the battle screen 
        battleScreen();
    });

    function battleScreen() {
        // hide destroyerSelection screen
        $("#destroyerSelection").addClass("hidden");
        // unhide battleScreen
        $("#battleScreen").removeClass("hidden");

        // find & output selected puff
        let a = [puffs.p1, puffs.p2, puffs.p3, puffs.p4];
        for (let i = 0; i < 4; i++) {
            if ( a[i].selected === true ) {
                $("#pSelected").html(a[i].image);
                $(".puff").removeClass("d_img feefer");
                $(".puffInfo").html(
                    "<p>" + a[i].name + "</p><br><hr>" +
                    "<p>HP:</p><span class='statSpan'>" + a[i].healthPoints + "</span><br><br>" + 
                    "<p>AP:</p><span class='statSpan'>" + a[i].attackPower + "</span>"
                );
            }
        }
    }

});