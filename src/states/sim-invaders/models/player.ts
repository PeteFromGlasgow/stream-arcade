import * as Assets from '../../../assets';

export class Player extends Phaser.Sprite {
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, Assets.Spritesheets.SpritesheetsShip3232.getName(), 0);
        this.game = game;
        this.anchor.set(0.4)
        this.smoothed = false
        game.add.existing(this);
    }


    update() {
        this.doPlayerMovement()
    }

    private playerBoundsCheck() {
        if (!(this.game.world.bounds.contains(this.x, this.y))) {
            if (this.x > this.game.world.bounds.width) {
                this.x = this.game.world.bounds.width;
            }

            if (this.x < this.game.world.bounds.x) {
                this.x = this.game.world.bounds.x;
            }

            if (this.y > this.game.world.bounds.height) {
                this.y = this.game.world.bounds.height;
            }

            if (this.y < this.game.world.bounds.y) {
                this.y = this.game.world.bounds.y;
            }
        }
    }

    private doPlayerMovement() {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.position.add(-4, 0);
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.position.add(4, 0);
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            this.position.add(0, -4);
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            this.position.add(0, 4);
        }

        this.playerBoundsCheck()
    }
}