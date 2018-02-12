import * as Assets from '../../../assets';

export class EnemyBullet extends Phaser.Sprite {
    private reverseFactor: number;

    private bulletWaveCounter: number = 0;
    private bulletTimeout: number = 0;
    constructor(game: Phaser.Game, x: number, y: number, reverse: boolean) {
        super(game, x, y, Assets.Spritesheets.SpritesheetsShip3232.getName(), 0);
        this.game = game;
        this.anchor.set(0.4);
        this.lifespan = 10000;
        this.reverseFactor = (reverse) ? -1 : 1;
        game.add.existing(this);
    }

    update() {
        this.bulletWaveCounter = (this.bulletWaveCounter + (0.08726646) % (Math.PI * 2));
        this.position.add(5 * this.reverseFactor * (Math.cos(this.bulletWaveCounter)), 50 * 0.08726646);
    }
}