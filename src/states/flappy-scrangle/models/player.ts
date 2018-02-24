import * as Assets from '../../../assets';

export default class Player extends Phaser.Sprite {
    
    alive: boolean = true;

    constructor(game: Phaser.Game, x: number, y: number) {

        super(game, x, y, Assets.Images.SpritesheetsSquirrel.getName(), 0);
        this.scale.setTo(0.7,0.7);
       // this.anchor.set(0.4);
        this.anchor.setTo(-0.2, 0.5); 
        
        game.physics.arcade.enable(this);
        this.body.gravity.y = 1000; 
        
        game.add.existing(this);
    }

    private playerMovement() {

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {

            this.body.velocity.y = -300;
            var animation = this.game.add.tween(this);
            animation.to({angle: -10}, 50);
            animation.start(); 
        }
        if (this.angle < 5){
            this.angle += 1; 
        }

    }
    update() {
        this.playerMovement();
    }

}