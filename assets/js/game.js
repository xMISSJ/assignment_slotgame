// Initiate the Phaser framework.
const game = new Phaser.Game(750, 450, Phaser.AUTO, '', { preload: preload, create: create, update, update });

// Load the game assets before the game starts.
function preload() {
    game.load.image('Background', 'assets/bg.jpg');
    game.load.image('Background_Coins', 'assets/bg-coins.png');
    game.load.image('Background_Overlay', 'assets/dark-bg-overlay.png');
    game.load.image('Big_Win', 'assets/big-win.png');
    game.load.image('Coin_Animation', 'assets/coin-animation.png');
    game.load.image('Mouse_Hand', 'assets/mousehand.png');
    game.load.image('Huge_Win', 'assets/huge-win.png');
    game.load.image('Install_Button', 'assets/install-btn.png');
    game.load.image('Lines_Number', 'assets/lines-number.png');
    game.load.image('Numbers_Top', 'assets/number-button.png');
    game.load.image('Reel_Background', 'assets/reel-bg.png');
    game.load.image('Reel_Overlay', 'assets/reel-overlay.png');
    game.load.image('Slotmachine', 'assets/slotmachine-transparant.png');
    game.load.image('Slots_Bar', 'assets/slots-bar.png');
    game.load.image('Slots_Bar_Lighter', 'assets/slots-bar-lighter.png');
    game.load.image('Slots_Crown', 'assets/slots-crown.png');
    game.load.image('Slots_Diamond', 'assets/slots-diamond.png');
    game.load.image('Slots_Diamond_Lighter', 'assets/slots-diamond-lighter.png');
    game.load.image('Slots_Lemon', 'assets/slots-lemon.png');
    game.load.image('Slots_Watermelon', 'assets/slots-watermelon.png');
    game.load.image('Slots_Seven', 'assets/slots-7.png');
    game.load.image('Slots_Ten', 'assets/slots-10.png');
    game.load.image('Spin_Button', 'assets/spin-btn.png');
    game.load.image('Spin_Button_Lighter', 'assets/spin-btn-glow.png');
    game.load.image('Start_Spinning', 'assets/start-spinning.png');
    game.load.image('Top_Bars_Glow', 'assets/top-bars-glow.png');
    game.load.image('Top_Diamond_Glow', 'assets/top-diamond-glow.png');
    game.load.image('Total_Bet_Number', 'assets/total-bet-number.png');

    game.load.spritesheet('Numbers_Spritesheet', 'assets/red-numbers-sprite.png', 11, 22, 11);
}

var sprite;
var slotmachine;
var slotValues, counter;
var slotsSeven, slotsTen, slotsBar, slotsDiamond, slotsLemon, slotsWatermelon, slotsCrown;
var speed, maxUp, maxDown, upDownTimer;
var spinButton, spinButtonGlow, spinStart, mouseHand;
var reelBackground1, reelBackground2, reelBackground3, reelBackground4;
var reelOverlay1, reelOverlay2, reelOverlay3, reelOverlay4;
var linesNumber, totalBetNumber;

// Executed after everything is loaded.
function create() {

    speed = 15;
    maxUp = 320;
    maxDown = 325;

    // Physics System.
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.image(0, 0, 'Background');

    slotmachine = game.add.image(155, 12, 'Slotmachine');

    // Adds the reel background.
    reelBackground1 = game.add.image(200, 167, 'Reel_Background');
    reelBackground2 = game.add.image(0, 0, 'Reel_Background').alignTo(reelBackground1, Phaser.RIGHT_CENTER, -18);
    reelBackground3 = game.add.image(0, 0, 'Reel_Background').alignTo(reelBackground2, Phaser.RIGHT_CENTER, -17);
    reelBackground4 = game.add.image(0, 0, 'Reel_Background').alignTo(reelBackground3, Phaser.RIGHT_CENTER, -13);

    // Adds images of the slots.
    slotsCrown = game.add.image(207, -6, 'Slots_Crown')
    slotsSeven = game.add.image(0, 0, 'Slots_Seven').alignTo(slotsCrown, Phaser.BOTTOM_CENTER, 0, -27);
    slotsTen = game.add.image(0, 0, 'Slots_Ten').alignTo(slotsSeven, Phaser.BOTTOM_CENTER, 0, -27);
    slotsBar = game.add.image(0, 0, 'Slots_Bar').alignTo(slotsTen, Phaser.BOTTOM_CENTER, 0, -27);
    slotsWatermelon = game.add.image(0, 0, 'Slots_Watermelon').alignTo(slotsBar, Phaser.BOTTOM_CENTER, 0, -27);
    slotsLemon = game.add.image(0, 0, 'Slots_Lemon').alignTo(slotsWatermelon, Phaser.BOTTOM_CENTER, 0, -27);
    slotsDiamond = game.add.image(0, 0, 'Slots_Diamond').alignTo(slotsLemon, Phaser.BOTTOM_CENTER, 0, -27);

    // Adds the greyish reel overlay.
    reelOverlay1 = game.add.image(205.3, 172, 'Reel_Overlay');
    reelOverlay2 = game.add.image(0, 0, 'Reel_Overlay').alignTo(reelOverlay1, Phaser.RIGHT_CENTER, 0);
    reelOverlay3 = game.add.image(0, 0, 'Reel_Overlay').alignTo(reelOverlay2, Phaser.RIGHT_CENTER, 1);
    reelOverlay4 = game.add.image(0, 0, 'Reel_Overlay').alignTo(reelOverlay3, Phaser.RIGHT_CENTER, 5);

    linesNumber = game.add.image(198, 388, 'Lines_Number');
    totalBetNumber = game.add.image(241.5, 388, 'Total_Bet_Number');

    spinButton = game.add.button(481, 366, 'Spin_Button', actionOnUp, this, 2, 1, 0);
    spinButton.onInputOut.add(actionOnOut, this);

    spinButtonGlow = game.add.image(481, 366, 'Spin_Button_Lighter');
    spinButtonGlow.visible = false;

    spinStart = game.add.sprite(460, 320, 'Start_Spinning');
    spinStart.visible = true;

    // Enables the Physics System for spinStart.
    game.physics.enable(spinStart, Phaser.Physics.ARCARDE);

    // Takes the first sprite from the spritesheet.
    sprite = game.add.sprite(376.5, 388, 'Numbers_Spritesheet');
    sprite.frame = 0;

    mouseHand = game.add.image(545, 390, 'Mouse_Hand');
    mouseHand.visible = true;

    // Scales images down.
    slotmachine.scale.setTo(0.62, 0.62);

    // Reel backgrounds.
    reelBackground1.scale.setTo(0.59, 0.59);
    reelBackground2.scale.setTo(0.59, 0.59);
    reelBackground3.scale.setTo(0.59, 0.59);
    reelBackground4.scale.setTo(0.59, 0.59);

    // Slots images.
    slotsBar.scale.setTo(0.6, 0.6);
    slotsCrown.scale.setTo(0.6, 0.6);
    slotsDiamond.scale.setTo(0.6, 0.6);
    slotsLemon.scale.setTo(0.6, 0.6);
    slotsSeven.scale.setTo(0.6, 0.6);
    slotsTen.scale.setTo(0.6, 0.6);
    slotsWatermelon.scale.setTo(0.6, 0.6);

    // Reel overlays.
    reelOverlay1.scale.setTo(0.5898, 0.5898);
    reelOverlay2.scale.setTo(0.5898, 0.5898);
    reelOverlay3.scale.setTo(0.5898, 0.5898);
    reelOverlay4.scale.setTo(0.5898, 0.5898);

    linesNumber.scale.setTo(0.7, 0.7);
    totalBetNumber.scale.setTo(0.7, 0.7);
    sprite.scale.setTo(0.7, 0.7);

    spinButton.scale.setTo(0.611, 0.611);
    spinButtonGlow.scale.setTo(0.611, 0.611);
    spinStart.scale.setTo(0.6, 0.6);

    mouseHand.scale.setTo(0.6, 0.6);
}
// Executed per frame.
function update() {
    if (spinStart.body.position.y <= maxUp) {
        spinStart.body.velocity.y = speed;
    }
    else if (spinStart.body.position.y >= maxDown) {
        spinStart.body.velocity.y = -speed;
    }
}

function actionOnUp(onClick) {
    if (onClick) {
        spinButtonGlow.visible = !spinButtonGlow.visible;
    } 
    if (spinButtonGlow.visible){
        spinStart.visible = false;
        mouseHand.visible = false;
    }
}

function actionOnOut() {
    spinStart.visible = false;
}