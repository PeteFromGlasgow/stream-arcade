import * as Assets from '../../../assets';

export enum BulletType {
    Standard,
    Homing,
    Wave,
    Spread
}

const BULLET_SPEED = 3;

export class EnemyBullet extends Phaser.Sprite {
    private reverseFactor: number;
    private bulletType: BulletType = BulletType.Homing;
    private bulletAngle: number;

    private bulletWaveCounter: number = 0;
    private bulletTimeout: number = 0;
    constructor(game: Phaser.Game, x: number, y: number, reverse: boolean, player) {
        super(game, x, y, Assets.Spritesheets.SpritesheetsShip3232.getName(), 0);
        this.game = game;
        this.anchor.set(0.4);
        this.lifespan = 10000;
        this.reverseFactor = (reverse) ? -1 : 1;
        game.add.existing(this);
        this.bulletAngle = this.calculateInitialHomingAngle(player.x, player.y)
    }

    calculateInitialHomingAngle (playerX, playerY) {
        return Math.atan2((playerY - this.y), (playerX - this.x));
    }

    update() {
        if (this.bulletType === BulletType.Standard) {
            this.position.add(0, BULLET_SPEED);
        } else if (this.bulletType === BulletType.Homing) {
            this.position.add(Math.cos(this.bulletAngle) * BULLET_SPEED, Math.sin(this.bulletAngle) * BULLET_SPEED);
        } else if (this.bulletType === BulletType.Wave) {
            this.bulletWaveCounter = (this.bulletWaveCounter + (0.08726646) % (Math.PI * 2));
            this.position.add(5 * this.reverseFactor * (Math.cos(this.bulletWaveCounter)), 50 * 0.08726646);
        }
    }
}