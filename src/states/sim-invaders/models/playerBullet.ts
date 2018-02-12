import * as Assets from '../../../assets';

export class PlayerBullet extends Phaser.Sprite {

    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, Assets.Spritesheets.SpritesheetsShip3232.getName(), 0);
        this.game = game;
        this.anchor.set(0.5);
        this.lifespan = 10000;
        game.physics.enable(this, Phaser.Physics.ARCADE);
        game.add.existing(this);
    }

    update() {
        this.position.add(0, -10);
    }
}