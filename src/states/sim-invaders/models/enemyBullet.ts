import * as Assets from '../../../assets';

export enum BulletType {
    Standard,
    Homing,
    Wave,
    Spread
}

const BULLET_SPEED = 5;

export class EnemyBullet extends Phaser.Sprite {
    private reverseFactor: number;
    private bulletType: BulletType = BulletType.Homing;
    private bulletAngle: number;

    private bulletWaveCounter: number = 0;
    private bulletTimeout: number = 0;
    constructor(game: Phaser.Game, x: number, y: number, reverse: boolean, player, type: BulletType = BulletType.Standard) {
        super(game, x, y, Assets.Spritesheets.SpritesheetsSimbullet884.getName(), 0);

        this.animations.add('pulse', [0, 1, 2, 3], 5, true);
        this.play('pulse');

        this.bulletType = type;

        this.game = game;
        this.anchor.set(0.4);
        this.lifespan = 10000;
        this.reverseFactor = (reverse) ? -1 : 1;
        game.add.existing(this);
        game.physics.enable(this, Phaser.Physics.ARCADE);
        if (type === BulletType.Homing) {
            this.bulletAngle = this.calculateInitialHomingAngle(player.x, player.y)
        } else if (type === BulletType.Spread) {
            this.bulletAngle = this.game.rnd.angle();
        }
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
        } else if (this.bulletType === BulletType.Spread) {
            this.position.add(Math.cos(this.bulletAngle) * BULLET_SPEED, Math.sin(this.bulletAngle) * BULLET_SPEED);
        }
    }
}