$(document).ready(function () {

    // puff objects
    let puffs = {
        p1: {
            id: "id_1",
            name: null,
            healthPoints: null,
            attackPower: null,
            counterAttack: null,
            selected: false,
            activeEnemy: false,
            wasDestroyed: false,
            image: ["<img class='puff breath_1' id='ci_1' src='assets/images/puffy_1.png'>"]
        },
        p2: {
            id: "id_2",
            name: null,
            healthPoints: null,
            attackPower: null,
            counterAttack: null,
            selected: false,
            activeEnemy: false,
            wasDestroyed: false,
            image: ["<img class='puff breath_2' id='ci_2' src='assets/images/puffy_2.png'>"]
        },
        p3: {
            id: "id_3",
            name: null,
            healthPoints: null,
            attackPower: null,
            counterAttack: null,
            selected: false,
            activeEnemy: false,
            wasDestroyed: false,
            image: ["<img class='puff breath_3' id='ci_3' src='assets/images/puffy_3.png'>"]
        },
        p4: {
            id: "id_4",
            name: null,
            healthPoints: null,
            attackPower: null,
            counterAttack: null,
            selected: false,
            activeEnemy: false,
            wasDestroyed: false,
            image: ["<img class='puff breath_4' id='ci_4' src='assets/images/puffy_4.png'>"]
        }
    }

    // used with battle screen
    let activeEnemyWasDestroyed = true;

    // puff object shortcut
    let a = [puffs.p1, puffs.p2, puffs.p3, puffs.p4];

    // selects and displays random background image for the .content section
    var images = ['bg1.jpg', 'bg2.jpg', 'bg3.jpg', 'bg4.jpg'];
    $('.bg').css({
        'background-image': 'url(\"assets/images/' +
            images[Math.floor(Math.random() * images.length)] + '\")'
    });

    //********************************************************************//
    // start button (screen 1)
    //********************************************************************//

    // listen for start button click
    $("#startButton").click(function () {
        // play eClick sound
        $("audio#eClick")[0].play();
        // hide startButton
        $("#startButton").addClass("hidden");
        // unhide destroyerSelection
        $("#destroyerSelection").removeClass("hidden");
    });

    //********************************************************************//
    // destroyer selection (screen 2)
    //********************************************************************//

    // assigns names and stats to all puffs
    loadStats();
    displayDestroyerSelections();

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

        $(".puff").addClass("d_img feefer puffSize_1");

        //listen for card click
        $(".feefer").click(function () {
            // play feefer sound
            $("audio#feefer")[0].play();
        });
    }

    // updates puff object with selection from destroyerSelection screen
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

    //********************************************************************//
    // battle screen (screen 3)
    //********************************************************************//

    function battleScreen() {
        // hide destroyerSelection screen
        $("#destroyerSelection").addClass("hidden");
        // unhide battleScreen
        $("#battleScreen").removeClass("hidden");

        // find & output selected puff
        for (let i = 0; i < 4; i++) {
            if (a[i].selected === true) {
                $("#pSelected").html(a[i].image);
                $(".puff").removeClass("d_img feefer");
                $(".puffInfo").html(
                    "<p>" + a[i].name + "</p><br><hr>" +
                    "<p>HP:</p><span class='statSpan' id='selHp'>" + a[i].healthPoints + "</span><br><br>" +
                    "<p>AP:</p><span class='statSpan' id='selAp'>" + a[i].attackPower + "</span>"
                );
            }
        }
        // find & output enemy puffs
        for (let i = 0; i < 4; i++) {
            if (a[i].selected === false) {
                $(".pos_1").append(
                    "<div class='enemyPuff ePosition_1 flexbox' id='" + a[i].id + "'>" +
                    "<div class='battleCardImage'>" + a[i].image + "</div>" +
                    "<div class='battleD_stats'>" +
                    "<p class='statSmall'>" + a[i].name + "</p><br><hr>" +
                    "<p class='statSmall'>HP:</p><span class='statSpan statSmall'>" +
                    a[i].healthPoints + "</span><br><br>" +
                    "<p class='statSmall'>CA:</p><span class='statSpan statSmall'>" +
                    a[i].counterAttack + "</span>" +
                    "</div>" +
                    "</div>"
                );
                $(".puff").addClass("puffSize_2 d_img_2");
                $(".puff").removeClass("feefer breath_1 breath_2 breath_3 breath_4");
            }
        }


        // updates puff object with selection from ePosition_1 (enemy)
        $(".d_img_2").click(function () {
            if (activeEnemyWasDestroyed === true) {
                var id = $(this).attr('id');
                switch (id) {
                    case 'ci_1':
                        if (puffs.p1.selected === false) {
                            puffs.p1.activeEnemy = true;
                            $("#id_1").addClass("hidden");
                            // play feefer sound
                            $("audio#feefer")[0].play();
                            becomeActiveEnemy();
                        }
                        break;
                    case 'ci_2':
                        if (puffs.p2.selected === false) {
                            puffs.p2.activeEnemy = true;
                            $("#id_2").addClass("hidden");
                            // play feefer sound
                            $("audio#feefer")[0].play();
                            becomeActiveEnemy();
                        }
                        break;
                    case 'ci_3':
                        if (puffs.p3.selected === false) {
                            puffs.p3.activeEnemy = true;
                            $("#id_3").addClass("hidden");
                            // play feefer sound
                            $("audio#feefer")[0].play();
                            becomeActiveEnemy();
                        }
                        break;
                    case 'ci_4':
                        if (puffs.p4.selected === false) {
                            puffs.p4.activeEnemy = true;
                            $("#id_4").addClass("hidden");
                            // play feefer sound
                            $("audio#feefer")[0].play();
                            becomeActiveEnemy();
                        }
                        break;
                }
            }
        });
    }

    // moves selected enemy into position 
    function becomeActiveEnemy() {
        activeEnemyWasDestroyed = false;
        $("#chooseOpponetBanner").addClass("hidden");

        // find & output selected enemy puff
        for (let i = 0; i < 4; i++) {
            if (a[i].activeEnemy === true && a[i].wasDestroyed === false) {
                $("#activeEnemy").html(a[i].image);
                $(".e_battleD_stats").html(
                    "<p>" + a[i].name + "</p><br><hr>" +
                    "<p>HP:</p><span class='statSpan' id='eneHp'>" + a[i].healthPoints + "</span><br><br>" +
                    "<p>CA:</p><span class='statSpan'>" + a[i].counterAttack + "</span>"
                );
                $(".puff").addClass("d_img_2");
                $(".puff").removeClass("breath_1 breath_2 breath_3 breath_4");
            }
        }
        // show battle button
        $("#doBattleButtonDiv").removeClass("hidden");
    }

    // doBattle button functionality
    $("#doBattleButtonDiv").click(function () {
        $(".pos_2").addClass("attackLeft");
        $(".puffSelected").addClass("attackRight");
        // play smack sound
        // play sound time kicks in just before the animation is complete
        setTimeout(function () {
            $("audio#smack")[0].play();
            $(".pos_2").removeClass("attackLeft");
            $(".puffSelected").removeClass("attackRight");
            adjustPoints();
        }, 900);
    });

    function adjustPoints() {
        // setup variables
        let selectedPuff;
        let enemyPuff;
        // find battling puffs
        for (let i = 0; i < 4; i++) {
            if (a[i].selected === true) {
                selectedPuff = a[i];
            }
            if (a[i].activeEnemy === true && a[i].wasDestroyed === false) {
                enemyPuff = a[i];
            }
        }
        // adjust stats
        selectedPuff.healthPoints -= enemyPuff.counterAttack;
        enemyPuff.healthPoints -= selectedPuff.attackPower;
        selectedPuff.attackPower = calcAP_increase();
        // update UI with adjusted stats
        $("#selHp").html(selectedPuff.healthPoints);
        $("#selAp").html(selectedPuff.attackPower);
        $("#eneHp").html(enemyPuff.healthPoints);

        // checks for lost condition
        youLost();
        // checks for win condition
        youWon();

        // calcuates selected puff AP increase
        function calcAP_increase() {
            // departed from what was outlined in the homework
            // for better game play
            if (selectedPuff.attackPower <= 100) {
                selectedPuff.attackPower += Math.floor(selectedPuff.attackPower * 0.4);
                return selectedPuff.attackPower;
            } else {
                return selectedPuff.attackPower;
            }
        }
    }
    // checks for lost condition
    function youLost() {
        if (selectedPuff.healthPoints <= 0) {
            // hide battle button
            $("#doBattleButtonDiv").addClass("hidden");
            $(".youLost").removeClass("hidden");
            // restarts the game over by reloading the page
            $(".playAgain").click(function () {
                location.reload();
            });
        }
    }
    // checks for win condition 
    function youWon() {
        if (false) {
            console.log("you won");
        }
    }

    // end //
});