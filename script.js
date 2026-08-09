/* =====================================================
   SIMUI RANI - FLOWER BOUQUET
   Complete JavaScript
===================================================== */


/* =====================================================
   GET HTML ELEMENTS
===================================================== */

const bouquet = document.getElementById("bouquet");
const openBtn = document.getElementById("openBtn");
const musicBtn = document.getElementById("musicBtn");


/* =====================================================
   BLOOM THE BOUQUET
===================================================== */

function bloomBouquet() {

    // Remove old animation
    bouquet.classList.remove("bloomed");

    // Force browser to reset the animation
    void bouquet.offsetWidth;

    // Start new blooming animation
    bouquet.classList.add("bloomed");

    // Create falling petals
    createPetals(45);

    // Create floating hearts
    createHearts(25);
}


/* =====================================================
   BLOOM BUTTON
===================================================== */

if (openBtn) {

    openBtn.addEventListener("click", function () {

        bloomBouquet();

    });

}


/* =====================================================
   CLICK THE BOUQUET TO BLOOM
===================================================== */

if (bouquet) {

    bouquet.addEventListener("click", function () {

        bloomBouquet();

    });

}


/* =====================================================
   FALLING PETALS
===================================================== */

function createPetals(amount = 20) {

    for (let i = 0; i < amount; i++) {

        const petal =
            document.createElement("div");

        petal.classList.add(
            "falling-petal"
        );


        /* Random horizontal position */

        petal.style.left =
            Math.random() * 100 + "vw";


        /* Random size */

        const size =
            8 + Math.random() * 14;

        petal.style.width =
            size + "px";

        petal.style.height =
            size * 1.6 + "px";


        /* Random falling speed */

        const duration =
            3 + Math.random() * 5;

        petal.style.animationDuration =
            duration + "s";


        /* Random starting delay */

        petal.style.animationDelay =
            Math.random() * 1.5 + "s";


        /* Random rotation */

        petal.style.transform =
            `rotate(${Math.random() * 360}deg)`;


        document.body.appendChild(petal);


        /* Remove after animation */

        setTimeout(function () {

            petal.remove();

        }, (duration + 2) * 1000);

    }

}


/* =====================================================
   FLOATING HEARTS
===================================================== */

function createHearts(amount = 10) {

    const hearts = [
        "❤️",
        "💕",
        "💗",
        "💖",
        "💓",
        "💞"
    ];


    for (let i = 0; i < amount; i++) {

        const heart =
            document.createElement("div");

        heart.classList.add(
            "floating-heart"
        );


        /* Random heart */

        heart.innerHTML =
            hearts[
                Math.floor(
                    Math.random() *
                    hearts.length
                )
            ];


        /* Random position */

        heart.style.left =
            (35 + Math.random() * 30) +
            "vw";

        heart.style.top =
            (45 + Math.random() * 20) +
            "vh";


        /* Random size */

        heart.style.fontSize =
            (16 + Math.random() * 18) +
            "px";


        /* Random animation speed */

        heart.style.animationDuration =
            (1.5 + Math.random() * 1.5) +
            "s";


        document.body.appendChild(heart);


        /* Remove after animation */

        setTimeout(function () {

            heart.remove();

        }, 3500);

    }

}


/* =====================================================
   CONTINUOUS FALLING PETALS
===================================================== */

setInterval(function () {

    createPetals(1);

}, 1800);


/* =====================================================
   MUSIC SYSTEM
===================================================== */

let audioContext = null;

let musicTimer = null;

let musicPlaying = false;


/* Romantic melody */

const melody = [

    523.25,
    587.33,
    659.25,
    783.99,

    659.25,
    587.33,
    523.25,

    659.25,
    783.99,
    880.00,
    783.99,

    659.25,
    587.33,
    523.25

];


/* =====================================================
   PLAY ONE NOTE
===================================================== */

function playNote(frequency) {

    /* Create audio context */

    if (!audioContext) {

        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();

    }


    /* Oscillator */

    const oscillator =
        audioContext.createOscillator();


    /* Volume */

    const gain =
        audioContext.createGain();


    /* Soft sound */

    oscillator.type = "sine";

    oscillator.frequency.value =
        frequency;


    /* Fade in */

    gain.gain.setValueAtTime(
        0.0001,
        audioContext.currentTime
    );


    gain.gain.exponentialRampToValueAtTime(
        0.12,
        audioContext.currentTime + 0.05
    );


    /* Fade out */

    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        audioContext.currentTime + 0.8
    );


    /* Connect */

    oscillator.connect(gain);

    gain.connect(
        audioContext.destination
    );


    /* Start */

    oscillator.start();


    /* Stop */

    oscillator.stop(
        audioContext.currentTime + 0.8
    );

}


/* =====================================================
   START MUSIC
===================================================== */

function startMusic() {

    let index = 0;


    /* Play first note */

    playNote(
        melody[index]
    );


    /* Continue melody */

    musicTimer =
        setInterval(function () {

            index++;

            /* Restart melody */

            if (
                index >=
                melody.length
            ) {

                index = 0;

            }


            playNote(
                melody[index]
            );


        }, 850);

}


/* =====================================================
   STOP MUSIC
===================================================== */

function stopMusic() {

    if (musicTimer) {

        clearInterval(
            musicTimer
        );

        musicTimer = null;

    }

}


/* =====================================================
   MUSIC BUTTON
===================================================== */

if (musicBtn) {

    musicBtn.addEventListener(
        "click",
        async function () {


            /* ==========================
               TURN MUSIC ON
            ========================== */

            if (!musicPlaying) {


                /* Create audio context */

                if (!audioContext) {

                    audioContext =
                        new (
                            window.AudioContext ||
                            window.webkitAudioContext
                        )();

                }


                /* Resume audio */

                if (
                    audioContext.state ===
                    "suspended"
                ) {

                    await audioContext.resume();

                }


                /* Start */

                startMusic();


                musicPlaying = true;


                musicBtn.innerHTML =
                    "🔇 Music Off";


            }


            /* ==========================
               TURN MUSIC OFF
            ========================== */

            else {

                stopMusic();

                musicPlaying = false;

                musicBtn.innerHTML =
                    "🎵 Music";

            }

        }
    );

}


/* =====================================================
   AUTOMATIC FIRST BLOOM
===================================================== */

window.addEventListener(
    "load",
    function () {


        /* Wait for page to load */

        setTimeout(function () {

            bloomBouquet();

        }, 1000);


        /* Initial petals */

        setTimeout(function () {

            createPetals(15);

        }, 1500);

    }
);


/* =====================================================
   EXTRA ROMANTIC HEART EFFECT
===================================================== */

setInterval(function () {

    const heart =
        document.createElement("div");

    heart.classList.add(
        "floating-heart"
    );


    heart.innerHTML = "♡";


    heart.style.left =
        Math.random() * 100 + "vw";


    heart.style.top =
        "90vh";


    heart.style.fontSize =
        (15 + Math.random() * 15) +
        "px";


    document.body.appendChild(
        heart
    );


    setTimeout(function () {

        heart.remove();

    }, 3000);


}, 3000);


/* =====================================================
   END
===================================================== */