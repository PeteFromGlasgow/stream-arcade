import * as Assets from '../../../assets';

export default class Player extends Phaser.Sprite {
    
    alive: boolean = true;

    private quotes: string[] = ['Fuck FreeBSD..',
    ,'It\'s just a blip..',
    'Mkdir!','It\'s not service impacting..',
    'I only test things in production..',
    'Counting is broken again..',
    'Fuck MellyCount..',
    'We are Building.',
    'rm -rf /var/db..',
    'shutdown -p now',
    'Oh look, it\'s broken again™'];

    private timer: Phaser.TimerEvent;
    private quoteLabel: Phaser.Text;
    private textRotation: number = 0;

    constructor(game: Phaser.Game, x: number, y: number) {

        super(game, x, y, Assets.Images.SpritesheetsSquirrel.getName(), 0);
        this.scale.setTo(0.7,0.7);

        this.anchor.setTo(-0.2, 0.5); 
        
        game.physics.arcade.enable(this);
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
        this.events.onOutOfBounds.add(this.isDead, this);
        this.body.gravity.y = 1000; 
        this.timer = this.timer = this.game.time.events.loop(1500, this.spawnText, this);

        game.add.existing(this);
    }
    private isDead (){
        this.alive = false;
    }
    private playerMovement() {

        if(this.alive == false){
            return;
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {

            this.body.velocity.y = -270;
            var animation = this.game.add.tween(this);
            animation.to({angle: -10}, 50);
            animation.start(); 
        }
        if (this.angle < 5){
            this.angle += 1; 
        }
    }

    spawnText() {
        this.quoteLabel = this.game.add.text(this.position.x - 20, this.position.y, this.quotes[this.game.rnd.between(0,this.quotes.length+1)], {font: '18px ' + Assets.GoogleWebFonts.VT323,
                                                                                       boundsAlignV: 'middle',
                                                                                       boundsAlignH: 'middle',
                                                                                       fill: '#FFFFFF'});
        this.quoteLabel.anchor.setTo(0.5, 0);
        this.quoteLabel.align = 'center';
        
        //this.quoteLabel.lifespan = 9000;

        let angle = 45;
        if(this.textRotation == 0){
            angle = 45;
            this.textRotation = 1;
        }
        else if(this.textRotation == 1){
            angle = -45;
            this.textRotation = 0;
        }
        this.game.add.tween(this.quoteLabel).to({y: 0}, 3000, Phaser.Easing.Linear.None, true);
        this.game.add.tween(this.quoteLabel).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
        this.game.add.tween(this.quoteLabel).to( { angle: angle }, 2000, Phaser.Easing.Linear.None, true);
    }

    update() {
        this.playerMovement();

        if(this.alive == false){
            this.game.time.events.remove(this.timer);
        }
    }

}