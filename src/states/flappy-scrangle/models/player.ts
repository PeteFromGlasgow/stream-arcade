import * as Assets from '../../../assets';

export default class Player extends Phaser.Sprite {
 
    constructor(game: Phaser.Game, x: number, y: number) {

        super(game, x, y, Assets.Images.SpritesheetsSquirrel.getName(), 0);
        this.anchor.set(0.4);
        game.add.existing(this);
    }
    private boundsCheck() {
        if (this.y > this.game.world.bounds.height) {
            this.y = this.game.world.bounds.height;
        }

        if (this.y < this.game.world.bounds.y) {
            this.y = this.game.world.bounds.y;
        }
    }
    private playerMovement() {
        this.boundsCheck();

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {

            this.position.add(0, -2);
        }
        else {
            this.position.add(0, 2.5);
        }

    }
    update() {
        this.playerMovement();
    }

}