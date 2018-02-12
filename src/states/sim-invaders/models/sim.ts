import * as Assets from '../../../assets';
import {EnemyBullet} from './enemyBullet';

const BULLET_SPAWN_DELAY = 150;
export class Sim extends Phaser.Sprite {
    private lastBulletTime: number = 0;
    private bulletDirectionFlip = false;


    private shipMovementCounter: number = 0;
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, Assets.Spritesheets.SpritesheetsShip3232.getName(), 0);
        this.game = game;
        this.anchor.set(0.4)
        game.add.existing(this);
    }

    update() {
        //this.shipMovementCounter = (this.shipMovementCounter + 0.08726646) % 6.283185;
        //this.position.add(3 * Math.sin(this.shipMovementCounter), 2 * 0.08726646);
    }

    fire() {
        if ((Date.now() - BULLET_SPAWN_DELAY) > this.lastBulletTime) {
            this.bulletDirectionFlip = !this.bulletDirectionFlip
            new EnemyBullet(this.game, this.centerX, this.centerY, this.bulletDirectionFlip);
            this.lastBulletTime = Date.now()
        }
    }
}