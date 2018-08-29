
// * Saint Seiya RPG Game (https://github.com/vascojm82/saint-seiya-RPG-game)
// * Version: 1.0
// * Author: Jose M. Vasconcellos
// * Github: https://github.com/vascojm82
// * Free under the GNU license for non-comercial purposes

$(document).ready(function() {
  var maxRowLength = (Object.keys(warriors).length - 1) / 2,
    rowLength = 0,
    cardRow1 = $("#choice-container1"),
    cardRow2 = $("#choice-container2"),
    enemyRow1 = $("#enemies-available-container1"),
    enemyRow2 = $("#enemies-available-container2"),
    selectedWarrior = "",
    imageUrl = "./assets/Cid-2.jpg",
    soundtrack = false,
    characterSelected = 0,
    enemiesSelected = 0,
    defender = $("#defender"),
    defenderSelected = false,
    attackBtn = $(".attack-btn"),
    closeBtn = $(".close-button");

  //Close modal
  function closeModal(type) {
    $("#modal-container[title='" + type + "-modal']").addClass("out"); //Close a certain 'type' of Modal
    $("body").removeClass("modal-active");
    if($("body").hasClass('WON')){
      window.location.reload(true);
    }
    setTimeout(function() {
      $(".main-container").css("display", "block"); //Make the main container visible
      $("body").css("background-image", "url(" + imageUrl + ")");
      if($("body").hasClass('lose')){
        window.location.reload(true);
      }
    }, 1500);
  }
  /******************/

  //Open Intro Modal
  $("#modal-container[title='intro-modal']")
    .removeAttr("class")
    .addClass("one");
  $("body").addClass("modal-active");
  /******************/

  // On-click event listeners for Modal close button
  $("#modal-container[title='intro-modal']")
    .find(".close-btn")
    .click(function() {
      closeModal("intro");
    });
  $("#modal-container[title='winner-modal']")
    .find(".close-btn")
    .click(function(){
      closeModal('winner');
    });
  /*******************/

  //On-click event listener for loser Modal (Whole thing)
  $("#modal-container[title='loser-modal']")
    .click(function(){
      closeModal('loser');
    });
  /************************/

  //Populate characters and enemies containers with warrior cards
  $.each(warriors, function(key, value) {
    if (key != "path") {
      if (rowLength < maxRowLength) {
        cardRow1.append(
          '<div class="col-2 item item-' +
            rowLength +
            '"><div class="card character hvr-bounce-in"><h5>' +
            warriors[key].saint +
            '</h5><img class="card-img-top" src="' +
            warriors.path +
            warriors[key].file +
            '" alt="' +
            warriors[key].saint +
            '"><h5 class="health"><strong>Health: </strong>' +
            warriors[key].hp +
            '</h5><h5 class="power"><strong>Power: </strong>' +
            warriors[key].power +
            "</h5></div></div>"
        );
        enemyRow1.append(
          '<div class="col-2 item item-' +
            rowLength +
            '"><div class="card enemies hvr-bounce-in"><h5>' +
            warriors[key].saint +
            '</h5><img class="card-img-top" src="' +
            warriors.path +
            warriors[key].file +
            '" alt="' +
            warriors[key].saint +
            '"><h5 class="health"><strong>Health: </strong>' +
            warriors[key].hp +
            '</h5><h5 class="power"><strong>Power: </strong>' +
            warriors[key].power +
            "</h5></div></div>"
        );
        rowLength++;
      } else if (rowLength >= maxRowLength) {
        cardRow2.append(
          '<div class="col-2 item item-' +
            rowLength +
            '"><div class="card character hvr-bounce-in"><h5>' +
            warriors[key].saint +
            '</h5><img class="card-img-top" src="' +
            warriors.path +
            warriors[key].file +
            '" alt="' +
            warriors[key].saint +
            '"><h5 class="health"><strong>Health: </strong>' +
            warriors[key].hp +
            '</h5><h5 class="power"><strong>Power: </strong>' +
            warriors[key].power +
            "</h5></div></div>"
        );
        enemyRow2.append(
          '<div class="col-2 item item-' +
            rowLength +
            '"><div class="card enemies hvr-bounce-in"><h5>' +
            warriors[key].saint +
            '</h5><img class="card-img-top" src="' +
            warriors.path +
            warriors[key].file +
            '" alt="' +
            warriors[key].saint +
            '"><h5 class="health"><strong>Health: </strong>' +
            warriors[key].hp +
            '</h5><h5 class="power"><strong>Power: </strong>' +
            warriors[key].power +
            "</h5></div></div>"
        );
        rowLength++;
      }
    }
  });
  /***************************/

  var cardRow1Items = cardRow1.children(".item"),
    cardRow2Items = cardRow2.children(".item"),
    enemyRow1 = enemyRow1.children(".item"),
    enemyRow2 = enemyRow2.children(".item");

  //Display all warrior cards in the characters container
  cardRow1Items.css("display", "block");
  cardRow2Items.css("display", "block");

  cardRow1Items.on("click", function() {
    $this = this; //Javascript this
    JQthis = $(this); //JQuery this
    $this.className = $this.className.replace("selected", "");
    selectedWarrior = $this.className.slice(
      $this.className.search("item-"),
      $this.className.length
    );
	selectedWarrior = selectedWarrior.replace(' used', '');
    JQthis.children().css("border", "2px solid green");
    JQthis.addClass("selected");
    JQthis.addClass("used");
    cardRow1Items.not(".selected").css("display", "none");
    cardRow2Items.not(".selected").css("display", "none");
    $("#enemies-available-container1 ." + selectedWarrior).addClass("used");
    enemyRow1.not("." + selectedWarrior).css("display", "block");
    $(".defender").css("display", "none");
    enemyRow1.children().css({
      "background-color": "red",
      border: "2px solid black"
    });
    enemyRow2.css("display", "block");
    $(".defender").css("display", "none");
    enemyRow2.children().css({
      "background-color": "red",
      border: "2px solid black"
    });
    $(".subheading-enemies").css("display", "block");
  });
  cardRow2Items.on("click", function() {
    $this = this; //Javascript this
    JQthis = $(this); //JQuery this
    $this.className = $this.className.replace("selected", "");
    selectedWarrior = $this.className.slice(
      $this.className.search("item-"),
      $this.className.length
    );
	selectedWarrior = selectedWarrior.replace(' used', '');
    JQthis.children().css("border", "2px solid green");
    JQthis.addClass("selected");
    JQthis.addClass("used");
    cardRow2Items.not(".selected").css("display", "none");
    cardRow1Items.not(".selected").css("display", "none");
    enemyRow1.css("display", "block");
    $(".defender").css("display", "none");
    enemyRow1.children().css({
      "background-color": "red",
      border: "2px solid black"
    });
    enemyRow2.children().css({
      "background-color": "red",
      border: "2px solid black"
    });
    $("#enemies-available-container2 ." + selectedWarrior).addClass("used");
    enemyRow2.not("." + selectedWarrior).css("display", "block");
    $(".defender").css("display", "none");
    $(".subheading-enemies").css("display", "block");
  });

  enemyRow1.on("click", function() {
    $this = this; //Javascript this
    JQthis = $(this); //JQuery this
    if (!defenderSelected) {
      defender.append(JQthis.html());
      defender.children().css({
        "background-color": "black",
        color: "white",
        border: "2px solid white"
      });
      defenderSelected = true;
      JQthis.addClass("defender");
      JQthis.addClass("used");
      JQthis.css("display", "none");
      $(".subheading-attack").css("display", "block");
      $(".subheading-defender").css("display", "block");
    }
    $("#defender").mouseenter(function() {
      pickSoundObject.stop();
      pickSoundObject.play();
    });
  });

  enemyRow2.on("click", function() {
    $this = this; //Javascript this
    JQthis = $(this); //JQuery this
    if (!defenderSelected) {
      defender.append(JQthis.html());
      defender.children().css({
        "background-color": "black",
        color: "white",
        border: "2px solid white"
      });
      defenderSelected = true;
      JQthis.addClass("defender");
      JQthis.addClass("used");
      JQthis.css("display", "none");
      $(".subheading-attack").css("display", "block");
      $(".subheading-defender").css("display", "block");
    }
    $("#defender").mouseenter(function() {
      pickSoundObject.stop();
      pickSoundObject.play();
    });
  });

  var backgroundMusicObject = soundManager.createSound({
    url: "assets/burn_cosmo.mp3",
    autoLoad: true,
    autoPlay: true,
    loops: 100
  });

  backgroundMusicObject.stop();

  var pickSoundObject = soundManager.createSound({
    url: "assets/hover.wav",
    autoLoad: true,
    autoPlay: true
  });

  pickSoundObject.stop();

  var selectSoundObject = soundManager.createSound({
    url: "assets/Accept.mp3",
    autoLoad: true,
    autoPlay: true
  });

  selectSoundObject.stop();

  var superbSoundObject = soundManager.createSound({
    url: "assets/superb.mp3",
    autoLoad: true,
    autoPlay: true
  });

  superbSoundObject.stop();

  var excellentSoundObject = soundManager.createSound({
    url: "assets/excellent.mp3",
    autoLoad: true,
    autoPlay: true
  });

  excellentSoundObject.stop();

  var chooseSoundObject = soundManager.createSound({
    url: "assets/choose.mp3",
    autoLoad: true,
    autoPlay: true
  });

  chooseSoundObject.stop();

  var fightSoundObject = soundManager.createSound({
    url: "assets/fight.mp3",
    autoLoad: true,
    autoPlay: true
  });

  fightSoundObject.stop();

  var koSoundObject = soundManager.createSound({
    url: "assets/KO.wav",
    autoLoad: true,
    autoPlay: true
  });

  koSoundObject.stop();

  var youWinSoundObject = soundManager.createSound({
    url: "assets/you_win.wav",
    autoLoad: true,
    autoPlay: true
  });

  youWinSoundObject.stop();

  var victoryThemeSoundObject = soundManager.createSound({
    url: "assets/winner_theme.mp3",
    autoLoad: true,
    autoPlay: true
  });

  victoryThemeSoundObject.stop();

  var youLoseSoundObject = soundManager.createSound({
    url: "assets/you_lose.mp3",
    autoLoad: true,
    autoPlay: true
  });

  youLoseSoundObject.stop();

  var gameOverSoundObject = soundManager.createSound({
    url: "assets/game_over.wav",
    autoLoad: true,
    autoPlay: true
  });

  gameOverSoundObject.stop();

  $(".card").mouseenter(function() {
    pickSoundObject.stop();
    pickSoundObject.play();
  });

  $(".card.character").click(function() {
    if (characterSelected < 1) {
      selectSoundObject.stop();
      selectSoundObject.play();
      superbSoundObject.setVolume(50);
      superbSoundObject.stop();
      superbSoundObject.play();
      characterSelected++;
    }
  });

  $(".card.enemies").click(function() {
    if (enemiesSelected < 1) {
      selectSoundObject.stop();
      selectSoundObject.play();
      excellentSoundObject.setVolume(50);
      excellentSoundObject.stop();
      excellentSoundObject.play();
      enemiesSelected++;
    }
  });

  $(".attack-btn").click(function() {
    fightSoundObject.stop();
    fightSoundObject.play();
  });

  //Start background music
  var soundHandler = function() {
    backgroundMusicObject.stop();
    backgroundMusicObject.play();
    backgroundMusicObject.setVolume(30);
    setTimeout(function() {
      //Start 'Choose Your Fighter Announcement'
      chooseSoundObject.setVolume(100);
      chooseSoundObject.stop();
      chooseSoundObject.play();
    }, 400);
  };

  //Event handler for background music
  function watch(soundObjFlag, soundHandler) {
    function callback() {
      if (soundObjFlag === true) {
        soundHandler();
      }
    }
    return callback;
  }

  $(".intro-close-btn").click(function() {
    soundtrack = !soundtrack;
    setTimeout(watch(soundtrack, soundHandler), 1500);
  });

  attackBtn.click(function() {
    ($target = $("html")),
      (CPU_health = $("#defender .health")),
      (player_health = $(".selected .health")),
      (CPU_power = $("#defender .power")),
      (player_power = $(".selected .power")),
      (player = $(".selected")),
      (foe = $("#defender")),
      (player_stamina = parseInt(
        player_health
          .text()
          .substr(
            player_health.text().indexOf(" ") + 1,
            player_health.text().length
          )
      )),
      (player_attack_power = parseInt(
        player_power
          .text()
          .substr(
            player_power.text().indexOf(" ") + 1,
            player_power.text().length
          )
      )),
      (CPU_stamina = parseInt(
        CPU_health.text().substr(
          CPU_health.text().indexOf(" ") + 1,
          CPU_health.text().length
        )
      )),
      (CPU_attack_power = parseInt(
        CPU_power.text().substr(
          CPU_power.text().indexOf(" ") + 1,
          CPU_power.text().length
        )
      ));

    $("body").css("background-image", "url()");
    $target.removeClass("canvas");
    player_health.removeClass("hvr-buzz-out");
    CPU_health.removeClass("hvr-buzz-out");
    player_health.removeClass("no-damage-player");
    player_health.addClass("damage-player");
    CPU_health.removeClass("no-damage-CPU");
    CPU_health.addClass("damage-CPU");

    if (player_stamina > 0 && CPU_stamina > 0) {
      player_stamina = player_stamina - CPU_attack_power;
      CPU_stamina = CPU_stamina - player_attack_power;
      if (player_stamina < 1) {
        player_health.html("<strong>Health: </strong>0");
        CPU_health.html("<strong>Health: </strong>" + CPU_stamina);

        //Open loser Modal
        $("#modal-container[title='loser-modal']").removeAttr('class').addClass("seven");
        $('body').addClass('modal-active lose');
        backgroundMusicObject.stop();
        gameOverSoundObject.stop();
        gameOverSoundObject.play();
        setTimeout(function(){
          youLoseSoundObject.setVolume(100);
          youLoseSoundObject.stop();
          youLoseSoundObject.play();
        },1200);
      } else if (CPU_stamina < 1) {
        player_health.html("<strong>Health: </strong>" + player_stamina);
        CPU_health.html("<strong>Health: </strong>0");

        // Open Winner Modal
        $("#modal-container[title='winner-modal']").removeAttr('class').addClass("two");    //Open Winner Modal
        $('body').addClass('modal-active');

        //Update Winner Modal with defeated enemy naae and choose next if necessary
        $('.defeated-foe').html("<p>You have defeated </p>" + foe.children().find('h5')[0].firstChild.data);
        if($("#enemies-available-container1>DIV:not(.used)").length > 0 || $("#enemies-available-container2>DIV:not(.used)").length > 0){
          koSoundObject.stop();
          koSoundObject.play();
          $('.next-foe').html("<strong>Choose Your Next Opponent...</strong>");
          enemiesSelected--;
        }else{
          backgroundMusicObject.stop();
          victoryThemeSoundObject.stop();
          victoryThemeSoundObject.play();
          youWinSoundObject.stop();
          youWinSoundObject.play();
          $('.next-foe').html("");
          $('body').addClass("WON");
        }

        //Hidding Attack & Defender subheadings
        $('.subheading-attack').css("display", "none");
        $('.subheading-defender').css("display", "none");

        foe.html('');   //Removing defender from defender container

        defenderSelected = !defenderSelected;     //Allowing new defender to be chosen
      } else {
        player_attack_power += 30;
        player_power.html("<strong>Power: </strong>" + player_attack_power);
        player_health.html("<strong>Health: </strong>" + player_stamina);
        CPU_health.html("<strong>Health: </strong>" + CPU_stamina);
      }
    }

    setTimeout(function() {
      $target.addClass("canvas");
      player_health.addClass("hvr-buzz-out");
      CPU_health.addClass("hvr-buzz-out");
    }, 20);

    setTimeout(function() {
      $("body").css("background-image", "url(" + imageUrl + ")");
      player_health.removeClass("damage-player");
      player_health.addClass("no-damage-player");
      CPU_health.removeClass("damage-CPU");
      CPU_health.addClass("no-damage-CPU");
    }, 300);
  });
});
