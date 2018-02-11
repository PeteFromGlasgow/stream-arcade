
export default class Player extends Phaser.Sprite {
 
    constructor(game: Phaser.Game, x: number, y: number) {

        super(game, x, y, 'scrangle', 0);

        this.anchor.setTo(0.5, 0);
        this.game.load.image('scrangle', 'assets/spritesheets/squirrel.png');
        this.animations.add('walk', [0, 1, 2, 3, 4], 10, true);
        this.game.add.sprite(200, 200, 'scrangle');
        game.add.existing(this);
    }

    update() {

        this.body.velocity.x = 0;

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {

            this.body.velocity.y = 50;
            //this.animations.play('flap');

        }
        else {
            //this.animations.frame = 0;
            this.body.velocity.y = -80;
        }

    }

}