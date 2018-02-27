import * as Assets from '../../../assets';

export default class Player extends Phaser.Sprite {
    
    alive: boolean = true;

    private quotes: string[] = [
    'FreeBSD sucks balls',
    'It\'s just a blip',
    'mkdir',
    'It\'s not service impacting',
    'I only test things in production',
    'Oh look, counting is broken again',
    'Fuck MellyCount',
    'We are Building',
    'rm -rf /var/db',
    'shutdown -p now',
    'shit on a fuck',
    'wert',
    'dert',
    'There\'s no way this will break anything',
    'I think we just need to punch it in the face',
    'Sideways fist',
    'Stream if you want to go faster',
    'It\'s not moist, it\'s dripping!',
    'You\'re not a circus midget.',
    'Why\'s it not fucking dead yet.'
    ];

    private timer: Phaser.TimerEvent;
    private quoteLabel: Phaser.Text;
    private textRotation: number = 0;
    private quoteCount: number = 0;
    constructor(game: Phaser.Game, x: number, y: number) {

        super(game, x, y, Assets.Images.SpritesheetsSquirrel.getName(), 0);
        this.scale.setTo(0.7,0.7);

        this.anchor.setTo(-0.2, 0.5); 
        
        game.physics.arcade.enable(this);
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
        this.events.onOutOfBounds.add(this.isDead, this);
        this.body.gravity.y = 1100; 
        this.timer = this.timer = this.game.time.events.loop(1500, this.spawnText, this);
        this.quotes = this.shuffle(this.quotes);
        game.add.existing(this);
    }
    private isDead (){
        this.alive = false;
    }
    private playerMovement() {

        if(this.alive == false){
            return;
        }

        if (
            this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) ||
            this.game.input.gamepad.pad1.isDown(Phaser.Gamepad.XBOX360_A)
        ) {

            this.body.velocity.y = -390;
            var animation = this.game.add.tween(this);
            animation.to({angle: -10}, 50);
            animation.start(); 
        }
        if (this.angle < 5){
            this.angle += 1; 
        }
    }
    shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
    spawnText() {
        if(this.quoteCount > this.quotes.length)
            this.quoteCount = 0;

        this.quoteLabel = this.game.add.text(this.position.x - 20, this.position.y, this.quotes[this.quoteCount], {font: '25px ' + Assets.GoogleWebFonts.VT323,
                                                                                       boundsAlignV: 'middle',
                                                                                       boundsAlignH: 'middle',
                                                                                       fill: '#FFFFFF'});
        this.quoteLabel.anchor.setTo(0.5, 0);
        this.quoteLabel.align = 'center';
        
        //this.quoteLabel.lifespan = 9000;

        let angle = 45;
        if(this.textRotation == 0){
            angle = 60;
            this.textRotation = 1;
        }
        else if(this.textRotation == 1){
            angle = -60;
            this.textRotation = 0;
        }
        this.game.add.tween(this.quoteLabel).to({y: 0}, 3000, Phaser.Easing.Linear.None, true);
        this.game.add.tween(this.quoteLabel).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
        this.game.add.tween(this.quoteLabel).to( { angle: angle }, 2000, Phaser.Easing.Linear.None, true);
        this.quoteCount++
    }

    update() {
        this.playerMovement();

        if(this.alive == false){
            this.game.time.events.remove(this.timer);
        }
    }

}