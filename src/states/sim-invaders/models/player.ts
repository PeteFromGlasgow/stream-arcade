import * as Assets from '../../../assets';


const PLAYER_SPEED = 10;
export class Player extends Phaser.Sprite {
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, Assets.Spritesheets.SpritesheetsSpritesheet64648.getName(), 5);
        this.animations.add('stationary', [5]);
        this.animations.add('death', [0, 1, 2, 3, 4], 10);
        this.game = game;
        this.anchor.set(0.5);
        this.smoothed = false;
        game.physics.enable(this, Phaser.Physics.ARCADE);
        game.add.existing(this);
    }

    update() {
        this.doPlayerMovement();
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
            this.position.add(-PLAYER_SPEED, 0);
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.position.add(PLAYER_SPEED, 0);
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            this.position.add(0, -PLAYER_SPEED);
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            this.position.add(0, PLAYER_SPEED);
        }

        this.playerBoundsCheck();
    }
}