<?php
$page_title = "Frogger - Strona Główna";
$base_url_prefix = '';

require_once 'php/views/templates/header.php';
?>

    <link rel="stylesheet" href="css/style.css" />

    <section id="game" class="d-flex flex-column align-items-center pb-5 w-100">
        <h1 id="header" class="my-lg-5 my-sm-3">Frogger</h1>
        <div class="game-stats mb-3">
            <div class="stat">
                <p>Level</p>
                <p id="game-level">1</p>
            </div>
            <div class="stat">
                <p>Score</p>
                <p id="game-score">0</p>
            </div>
            <div class="stat">
                <p>Lives</p>
                <p id="game-lives">3</p>
            </div>
        </div>

        <div class="game-container">
            <canvas id="game-canvas" width="1024" height="768" tabindex="1"></canvas>
            <div id="game-canvas-error" class="d-none">Your screen width is too small to display the game, rotate the screen, or use bigger screen</div>
            <div class="control d-none" id="game-buttons">
                <button class="control__button" id="game-button-up">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 492 289.05"><path d="M226.8,109.33,7.86,328.27a27,27,0,0,0,0,38.07L24,382.46a27,27,0,0,0,38.06,0L245.9,198.61,430,382.67a27,27,0,0,0,38.07,0l16.11-16.13a27,27,0,0,0,0-38.06L265,109.33a27.16,27.16,0,0,0-38.2,0Z" transform="translate(0 -101.48)"/></svg>
                </button>
                <button class="control__button" id="game-button-right">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 289.05 492"><path d="M382.68,226.8,163.73,7.86a27,27,0,0,0-38.06,0L109.54,24a27,27,0,0,0,0,38.06L293.4,245.9,109.34,430a27,27,0,0,0,0,38.07l16.12,16.11a27,27,0,0,0,38.07,0L382.68,265a27.16,27.16,0,0,0,0-38.2Z" transform="translate(-101.48 0)"/></svg>
                </button>
                 <button class="control__button" id="game-button-left">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 289.05 492"><path d="M109.33,265.2,328.27,484.14a27,27,0,0,0,38.07,0L382.46,468a27,27,0,0,0,0-38.06L198.61,246.1,382.67,62a27,27,0,0,0,0-38.06L366.54,7.86a27,27,0,0,0-38.06,0L109.33,227a27.16,27.16,0,0,0,0,38.2Z" transform="translate(-101.48 0)"/></svg>
                </button>
                <button class="control__button" id="game-button-down">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 492 289.05"><path d="M265.2,382.68,484.14,163.73a27,27,0,0,0,0-38.06L468,109.54a27,27,0,0,0-38.06,0L246.1,293.4,62,109.34a27,27,0,0,0-38.06,0L7.86,125.46a27,27,0,0,0,0,38.07L227,382.68a27.16,27.16,0,0,0,38.2,0Z" transform="translate(0 -101.48)"/></svg></svg>
                </button>
              </div>
        </div>
    </section>
    <section id="game-history" class="p-5 bg-danger">
        <h1 class="text-center mb-5">History</h1>

        <p>The first game in the series was the 1981 arcade game Frogger, developed by Konami. The gameplay involves a
            frog trying to travel across roads and rivers of high traffic and danger. It was highly successful, being
            one of the first video game "smash hits," and "helped push the industry into the mainstream," according to
            PCMag. It was ported to many devices. A sequel, Frogger II: ThreeeDeep!, was released in 1984 for multiple
            consoles and computers.</p>

        <p>Frogger is also the name of a 1997 game for the PlayStation and Microsoft Windows. There was also a 1998
            Game.com version named Frogger. Another sequel, Frogger 2: Swampy's Revenge, was released in 2000 for the
            PlayStation, Game Boy Color, Microsoft Windows, and Dreamcast.</p>

        <p>The sixth generation of video game consoles, and sometimes Windows, were the platform for Frogger: The Great
            Quest in 2001, Frogger Beyond in 2002, Frogger's Adventures: The Rescue in 2003, Frogger: Ancient Shadow in
            2005, and Konami Kids Playground: Frogger Hop, Skip & Jumpin' Fun for the PlayStation 2 in 2007. The Game
            Boy Advance had four Frogger games: Frogger's Adventures: Temple of the Frog in 2001, Frogger Advance: The
            Great Quest in 2002, Frogger's Adventures 2: The Lost Wand in 2002, and Frogger's Journey: The Forgotten
            Relic in 2003. There were two mobile games during this time: Frogger in 2003, and Frogger Puzzle in 2005.
        </p>

        <p>The seventh generation of video game consoles saw the release of Frogger on the Xbox 360 in 2006, Frogger 2
            for the Xbox 360 in 2008, Frogger Returns in 2009, and Frogger: Hyper Arcade Edition for the Wii,
            PlayStation 3, Xbox 360, iOS, and Android in 2012. That generation of handhelds saw Frogger: Helmet Chaos in
            2005 and My Frogger Toy Trials in 2006. The J2ME platform saw Frogger Evolution in 2006 and Frogger Beats
            'n' Bounces in 2008. In 2007, Frogger Launch was released for Windows Mobile, and Frogger Hop Trivia was
            released as an arcade game.</p>

        <p>Starting in the 2010s, the majority of Frogger games were released for handheld or mobile devices. These
            included Frogger Inferno for iOS in 2010, Frogger for mobile devices in 2010, Frogger 3D for the Nintendo
            3DS in 2011, Frogger Decades for iOS in 2011, Frogger in Toy Town for Apple Arcade in 2019, and Frogger and
            the Rumbling Ruins for Apple Arcade in 2022. Frogger Pinball was released as a web game in 2011, Frogger's
            Crackout was released for the Windows Store in 2013, Frogger: Get Hoppin was a casino game released in 2017,
            and a new version of Frogger is being planned for the Intellivision Amico.</p>

        <p>In other media, in 1981, a Frogger board game and jigsaw puzzle were made. In 2020, in preparation for the
            40th anniversary of the series, Konami Cross Media announced a Frogger-themed card series and board game. In
            2021, NBCUniversal created a Frogger game show TV series for the Peacock streaming service, named as such.
        </p>

        <p>Frogger's enduring popularity is evident through its numerous adaptations and continued presence in popular
            culture.</p>


    </section>

<?php
require_once 'php/views/templates/footer.php';
?>