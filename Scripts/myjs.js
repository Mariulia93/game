window.addEventListener("load", start);

let points;
let timeLeft;
let lives;
let isSoundActive = true;
let goodsound = document.querySelector("#yummy");
let badsound = document.querySelector("#baddy");
let music = document.querySelector("#music");
let mlevelcomplete = document.querySelector("#music_level_complete");
let mgamelost = document.querySelector("#music_game_lost");

function start() {
    // console.log("start");
    //title screen

    document.querySelector("#game").classList.remove("hidden");
    document.querySelector("#title_screen").classList.remove("hidden");

    playMusic();
    document.querySelector("#music_button").addEventListener("click", pauseMusic);
    document.querySelector("#no_music_button").addEventListener("click", playMusic);

    document.querySelector("#sound_button").addEventListener("click", setSound);
    document.querySelector("#no_sound_button").addEventListener("click", setSound);



    document.querySelector("#play_button").addEventListener("click", startGame);
    //instructions screen
    document.querySelector("#how_to_play").addEventListener("click", gameInstructions);
    document.querySelector("#start_button").addEventListener("click", startGame);


    //try again - loss
    document.querySelector("#try_again_button1").addEventListener("click", startGame);

    //play again - win
    document.querySelector("#play_again_button2").addEventListener("click", startGame);


}

function gameInstructions() {
    // console.log("gameInstructions");
    //Hide title screen and show instruction

    document.querySelector("#title_screen").classList.add("hidden");
    document.querySelector("#instructions").classList.remove("hidden");

    document.querySelector("#game_background").classList.add("blur");
    document.querySelector("#a_container0").classList.add("blur");
    document.querySelector("#score_board").classList.add("blur");
    document.querySelector("#health_board").classList.add("blur");
    document.querySelector("#time_board").classList.add("blur");

    //animations needs to be stopped before adding the blur effect so that it works
}

function hideScreens() {
    //removing the title screen, instructions, game over, level comp
    document.querySelector("#title_screen").classList.add("hidden");
    document.querySelector("#instructions").classList.add("hidden");
    document.querySelector("#game_over").classList.add("hidden");
    document.querySelector("#level_complete").classList.add("hidden");
}

function addAnimatedClassesToApples() {
    //adding initial positions and movements
    document.querySelector("#a_container1").classList.add("position1");
    document.querySelector("#a_container1").classList.add("falling1");

    document.querySelector("#a_container2").classList.add("position2");
    document.querySelector("#a_container2").classList.add("falling2");

    document.querySelector("#a_container3").classList.add("position3");
    document.querySelector("#a_container3").classList.add("falling3");

    document.querySelector("#a_container4").classList.add("position4");
    document.querySelector("#a_container4").classList.add("falling4");

    document.querySelector("#a_container5").classList.add("position5");
    document.querySelector("#a_container5").classList.add("falling5");

    document.querySelector("#a_container6").classList.add("position6");
    document.querySelector("#a_container6").classList.add("falling6");
}

function startGame() {
    // console.log('lives', lives);
    // console.log('points', points);
    // console.log('timeLeft', timeLeft);

    lives = 3;
    points = 0;
    timeLeft = 31;
    hideScreens();
    addAnimatedClassesToApples();

    // remove blur when game starts
    document.querySelector("#game_background").classList.remove("blur");
    document.querySelector("#a_container0").classList.remove("blur");
    document.querySelector("#score_board").classList.remove("blur");
    document.querySelector("#health_board").classList.remove("blur");
    document.querySelector("#time_board").classList.remove("blur");
    //adding eventListeners (clicks)
    document.querySelector("#a_container1").addEventListener("click", clickGoodApple);
    document.querySelector("#a_container2").addEventListener("click", clickBadApple);
    document.querySelector("#a_container3").addEventListener("click", clickGoodApple2);
    document.querySelector("#a_container4").addEventListener("click", clickBadApple2);
    document.querySelector("#a_container5").addEventListener("click", clickGoodApple3);
    document.querySelector("#a_container6").addEventListener("click", clickBadApple3);

    //adding sounds
    document.querySelector("#a_container1").addEventListener("click", playSound);
    document.querySelector("#a_container2").addEventListener("click", playBadSound);
    document.querySelector("#a_container3").addEventListener("click", playSound);
    document.querySelector("#a_container4").addEventListener("click", playBadSound);
    document.querySelector("#a_container5").addEventListener("click", playSound);
    document.querySelector("#a_container6").addEventListener("click", playBadSound);
    // manage time during the game
    showTime();
}

function clickGoodApple() {
    // manage points
    points = points + 1;
    document.querySelector("#points").textContent = points;



    // play the sound
    // if switchMusic
    // document.querySelector("#idultau").play()
    playSound();


    if (points < 20) {

        // remove click listener so it cannot be clicked again
        document.querySelector("#a_container1").removeEventListener("click", clickGoodApple);

        // manage the animation of the clicked apple
        document.querySelector("#a_container1").classList.add("paused");
        document.querySelector("#a_sprite1").classList.toggle("scaled");
        document.querySelector("#a_sprite1").addEventListener("animationend", restart1);

    } else {
        gameOver();
    }
}

function clickGoodApple2() {
    // manage points
    points = points + 1;
    document.querySelector("#points").textContent = points;


    // play the sound
    // if switchMusic
    // document.querySelector("#idultau").play()
    playSound();


    if (points < 20) {

        // remove click listener so it cannot be clicked again
        document.querySelector("#a_container3").removeEventListener("click", clickGoodApple2);

        // manage the animation of the clicked apple
        document.querySelector("#a_container3").classList.add("paused");
        document.querySelector("#a_sprite3").classList.toggle("scaled");
        document.querySelector("#a_sprite3").addEventListener("animationend", restart3);

    } else {
        gameOver();
    }
}

function clickGoodApple3() {
    // manage points
    points = points + 1;
    document.querySelector("#points").textContent = points;

    //sound
    playSound();
    // play the sound
    // if switchMusic
    // document.querySelector("#idultau").play()

    if (points < 20) {

        // remove click listener so it cannot be clicked again
        document.querySelector("#a_container5").removeEventListener("click", clickGoodApple3);

        // manage the animation of the clicked apple
        document.querySelector("#a_container5").classList.add("paused");
        document.querySelector("#a_sprite5").classList.toggle("scaled");
        document.querySelector("#a_sprite5").addEventListener("animationend", restart5);

    } else {
        gameOver();
    }
}


function clickBadApple() {
    // removed click listener so it cannot be clicked again
    document.querySelector("#a_container2").removeEventListener("click", clickBadApple);

    //sound
    playBadSound();

    // manage the animation of the clicked apple
    document.querySelector("#a_container2").classList.add("paused");
    document.querySelector("#a_sprite2").classList.toggle("glow");
    document.querySelector("#a_sprite2").addEventListener("animationend", restart2);

    // manage lives
    subtractlife();
}

function clickBadApple2() {
    // removed click listener so it cannot be clicked again
    document.querySelector("#a_container4").removeEventListener("click", clickBadApple2);

    //sound
    playBadSound();

    // manage the animation of the clicked apple
    document.querySelector("#a_container4").classList.add("paused");
    document.querySelector("#a_sprite4").classList.toggle("glow");
    document.querySelector("#a_sprite4").addEventListener("animationend", restart4);

    // manage lives
    subtractlife();
}

function clickBadApple3() {
    // removed click listener so it cannot be clicked again
    document.querySelector("#a_container6").removeEventListener("click", clickBadApple3);

    //sound
    playBadSound();

    // manage the animation of the clicked apple
    document.querySelector("#a_container6").classList.add("paused");
    document.querySelector("#a_sprite6").classList.toggle("glow");
    document.querySelector("#a_sprite6").addEventListener("animationend", restart6);

    // manage lives
    subtractlife();
}

function playSound() {
    if (isSoundActive) {
        goodsound.play();
        goodsound.currentTime = 0;
    }

}

function playBadSound() {
    if (isSoundActive) {
        badsound.play();
        badsound.currentTime = 0;
    }
}

function setSound() {
    isSoundActive = !isSoundActive;
    if (isSoundActive) {
        document.querySelector("#sound_button").classList.remove("hidden");
        document.querySelector("#no_sound_button").classList.add("hidden");
    } else {
        document.querySelector("#sound_button").classList.add("hidden");
        document.querySelector("#no_sound_button").classList.remove("hidden");
    }
}
function playGameOverSound() {
    console.log("playGameOverSound")
    if (isSoundActive) { 
        mgamelost.play();
    }
}
function playLevelCompleteSound() {
    console.log("playLevelCompleteSound")
    if (isSoundActive) { 
        mlevelcomplete.play();
    }
}

function playMusic() {
    music.play();
    music.currentTime = 0;
    document.querySelector("#music_button").classList.remove("hidden");
    document.querySelector("#no_music_button").classList.add("hidden");

}

function pauseMusic() {
    music.pause();
    document.querySelector("#music_button").classList.add("hidden");
    document.querySelector("#no_music_button").classList.remove("hidden");
}


function subtractlife() {
    let targetHeartId = "#heart" + lives;
    //first decrement a life
    lives = lives - 1;
    document.querySelector(targetHeartId).classList.add("hidden");
    if (lives <= 0) {
        gameOver();
        playGameOverSound();
    }
}

function resetGame() {
    lives = 3;
    points = 0;

    document.querySelector("#heart1").classList.remove("hidden");
    document.querySelector("#heart2").classList.remove("hidden");
    document.querySelector("#heart3").classList.remove("hidden");

    document.querySelector("#points").textContent = points;
}

function restart1() {
    //console.log("restart1");
    document.querySelector("#a_container1").addEventListener("click", clickGoodApple);
    document.querySelector("#a_container1").classList = "";
    document.querySelector("#a_sprite1").classList = "";
    //to jump a frame
    document.querySelector("#a_container1").offsetHeight;

    //another random number
    let rndNumber2 = Math.floor(Math.random() * 9) + 1;
    //console.log("Randomly created number" + rndNumber2)
    document.querySelector("#a_container1").classList.add("falling" + rndNumber2);

    // random number
    let rndNumber = Math.floor(Math.random() * 14) + 1;
    //console.log("Randomly created number" + rndNumber);
    document.querySelector("#a_container1").classList.add("position" + rndNumber);

}

function restart2() {
    //console.log("restart2");
    document.querySelector("#a_container2").classList = "";
    document.querySelector("#a_sprite2").classList.toggle('glow');
    //to jump a frame
    document.querySelector("#a_container2").offsetHeight;

    //another random number
    let rndNumber2 = Math.floor(Math.random() * 9) + 1;
    //console.log("Randomly created number" + rndNumber2);
    document.querySelector("#a_container2").classList.add("falling" + rndNumber2);

    // random number
    let rndNumber = Math.floor(Math.random() * 14) + 1;
    //console.log("Randomly created number" + rndNumber);
    document.querySelector("#a_container2").classList.add("position" + rndNumber);
    document.querySelector("#a_container2").addEventListener("click", clickBadApple);

}

function restart3() {
    //console.log("restart3");
    document.querySelector("#a_container3").addEventListener("click", clickGoodApple2);
    document.querySelector("#a_container3").classList = "";
    document.querySelector("#a_sprite3").classList = "";
    //to jump a frame
    document.querySelector("#a_container3").offsetHeight;

    //another random number
    let rndNumber2 = Math.floor(Math.random() * 9) + 1;
    //console.log("Randomly created number" + rndNumber2)
    document.querySelector("#a_container3").classList.add("falling" + rndNumber2);

    // random number
    let rndNumber = Math.floor(Math.random() * 14) + 1;
    //console.log("Randomly created number" + rndNumber);
    document.querySelector("#a_container3").classList.add("position" + rndNumber);

}

function restart4() {
    //console.log("restart3");
    document.querySelector("#a_container4").classList = "";
    document.querySelector("#a_sprite4").classList.toggle('glow');
    //to jump a frame
    document.querySelector("#a_container4").offsetHeight;

    //another random number
    let rndNumber2 = Math.floor(Math.random() * 9) + 1;
    //console.log("Randomly created number" + rndNumber2);
    document.querySelector("#a_container4").classList.add("falling" + rndNumber2);

    // random number
    let rndNumber = Math.floor(Math.random() * 14) + 1;
    //console.log("Randomly created number" + rndNumber);
    document.querySelector("#a_container4").classList.add("position" + rndNumber);
    document.querySelector("#a_container4").addEventListener("click", clickBadApple2);

}

function restart5() {
    //console.log("restart5");
    document.querySelector("#a_container5").addEventListener("click", clickGoodApple3);
    document.querySelector("#a_container5").classList = "";
    document.querySelector("#a_sprite5").classList = "";
    //to jump a frame
    document.querySelector("#a_container5").offsetHeight;

    //another random number
    let rndNumber2 = Math.floor(Math.random() * 9) + 1;
    //console.log("Randomly created number" + rndNumber2)
    document.querySelector("#a_container5").classList.add("falling" + rndNumber2);

    // random number
    let rndNumber = Math.floor(Math.random() * 14) + 1;
    //console.log("Randomly created number" + rndNumber);
    document.querySelector("#a_container5").classList.add("position" + rndNumber);

}

function restart6() {
    console.log("restart6");
    document.querySelector("#a_container6").classList = "";
    document.querySelector("#a_sprite6").classList.toggle('glow');
    //to jump a frame
    document.querySelector("#a_container6").offsetHeight;

    //another random number
    let rndNumber2 = Math.floor(Math.random() * 9) + 1;
    //console.log("Randomly created number" + rndNumber2);
    document.querySelector("#a_container6").classList.add("falling" + rndNumber2);

    // random number
    let rndNumber = Math.floor(Math.random() * 14) + 1;
    //console.log("Randomly created number" + rndNumber);
    document.querySelector("#a_container6").classList.add("position" + rndNumber);
    document.querySelector("#a_container6").addEventListener("click", clickBadApple3);
}


function showTime() {
    //console.log("ShowTime");
    if (timeLeft >= 0) {
        timeLeft = timeLeft - 1;
        document.querySelector("#timeLeft").textContent = timeLeft;
        setTimeout(showTime, 1000);
    } else {
        gameOver();
    }
}

function gameOver() {
    // identify if win or loss
    if (lives <= 0 || timeLeft <= 0) {
        // implement loss behavior
        document.querySelector("#game_over").classList.remove("hidden");
        // mgamelost.pause();
    }
    if (points >= 20) {
        // implement win beahvior
        document.querySelector("#level_complete").classList.remove("hidden");
        playLevelCompleteSound();
    }

    // remove events from containers
    document.querySelector("#a_container1").removeEventListener("click", clickGoodApple);
    document.querySelector("#a_container2").removeEventListener("click", clickBadApple);
    document.querySelector("#a_container3").removeEventListener("click", clickGoodApple2);
    document.querySelector("#a_container4").removeEventListener("click", clickBadApple2);
    document.querySelector("#a_container5").removeEventListener("click", clickGoodApple3);
    document.querySelector("#a_container6").removeEventListener("click", clickBadApple3);
    // remove classes from containers
    document.querySelector("#a_container1").classList = "";
    document.querySelector("#a_container2").classList = "";
    document.querySelector("#a_container3").classList = "";
    document.querySelector("#a_container4").classList = "";
    document.querySelector("#a_container5").classList = "";
    document.querySelector("#a_container6").classList = "";
    //elephant container
    document.querySelector("#a_container0").classList = "";

    // document.querySelector("#a_sprite1").removeEventListener("animationend", restart1);
    // document.querySelector("#a_sprite2").removeEventListener("animationend", restart2);

    //stop sounds
    stopAllSounds();

    timeLeft = -1;
    resetGame();
}

function stopAllSounds() {

    goodsound.pause();
    goodsound.currentTime = 0;
    badsound.pause();
    badsound.currentTime = 0;
    music.pause();
    music.currentTime = 0;
    // mgamelost.pause();
    // mgamelost.currentTime=0;
    // mlevelcomplete.pause();
    // mlevelcomplete.currentTime=0;
}