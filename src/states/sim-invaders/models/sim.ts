import * as Assets from '../../../assets';
import {EnemyBullet, BulletType} from './enemyBullet';
import { Timer } from 'phaser-ce';

const BULLET_SPAWN_DELAY = 7000;
const BULLET_AMOUNT = 10;
const BULLET_SPAWN_REPEATER_GAP = 250;
const ESIM_DOWNLOAD_DELAY = 15000;
const ESIM_ANIMATION_TIME = 3000;

const SIM_DEATH_FRAMERATE = 30;
export enum SimType {
    Purple = 'purple',
    Green = 'green',
    Red = 'red',
    Blue = 'blue'
}
const SIM_TYPE_ARRAY = [SimType.Purple, SimType.Green, SimType.Red, SimType.Blue];
export class Sim extends Phaser.Sprite {
    private nextBulletTime: number = 0;
    private bulletDirectionFlip = false;
    private player;
    private isESim = false;
    public isDead = false;
    private simType: SimType;
    private repeaterGap: number = BULLET_AMOUNT * BULLET_SPAWN_REPEATER_GAP;
    private repeaterCount = 0;
    private nextRepeaterTime = 0;

    private shipMovementCounter: number = 0;

    constructor(game: Phaser.Game, x: number, y: number, player, simType: SimType = SimType.Red, isESim = false) {
        super(game, x, y, Assets.Spritesheets.SpritesheetsSim646472.getName(), 0);
        this.game = game;
        this.player = player;
        this.anchor.set(0.4);
        this.animations.add('purple_static', [46]);
        this.animations.add('purple_charge', this.range(0, 7), 10, true);
        this.animations.add('green_static', [8]);
        this.animations.add('green_charge', this.range(8, 15), 10, true);
        this.animations.add('red_static', [17]);
        this.animations.add('red_charge', this.range(17, 25), 10, true);
        this.animations.add('blue_static', [26]);
        this.animations.add('blue_charge', this.range(26, 34), 10, true);
        this.animations.add('esim_download', this.range(35, 46), 18, true)
        this.animations.add('purple_death', this.range(46, 51), SIM_DEATH_FRAMERATE, false)
        this.animations.add('green_death', this.range(52, 57), SIM_DEATH_FRAMERATE, false)
        this.animations.add('red_death', this.range(58, 63), SIM_DEATH_FRAMERATE, false)
        this.animations.add('blue_death', this.range(64, 69), SIM_DEATH_FRAMERATE, false)

        this.isESim = isESim
        this.simType = simType;
        this.play(this.simType + '_static');
        game.add.existing(this);
        game.physics.enable(this, Phaser.Physics.ARCADE);

        if (this.isESim) {
            let esimTransitionTimer = new Timer(this.game);
            esimTransitionTimer.loop(ESIM_DOWNLOAD_DELAY,  () => this.doESimTransformation())
            esimTransitionTimer.start();
            this.game.time.add(esimTransitionTimer);
        }
    }

    private range(start: number, end: number, previous = []) {
        if (start === end) {
            return previous.concat([end]);
        }
        return previous.concat([start], this.range(start + 1, end));
    }

    private doESimTransformation() {
        /* If we don't do this we cancel the death animation and the
           SIM becomes invincible */
        if (this.isDead) return;

        this.play('esim_download');
        let esimRandomPickTimer = new Timer(this.game, true);
        esimRandomPickTimer.add(ESIM_ANIMATION_TIME, () => {
            let choice = this.game.rnd.between(0, 3);
            this.simType = SIM_TYPE_ARRAY[choice];
            if (this.isDead) return;
            this.play(`${this.simType}_charge`);
        })
        esimRandomPickTimer.start()
        this.game.time.add(esimRandomPickTimer)
    }

    update() {
        // this.shipMovementCounter = (this.shipMovementCounter + 0.08726646) % 6.283185;
        // this.position.add(3 * Math.sin(this.shipMovementCounter), 2 * 0.08726646);
    }

    die() {
        this.play(`${this.simType}_death`, SIM_DEATH_FRAMERATE, false, true);
        this.isDead = true;
    }

    private getBulletType () {
        switch (this.simType) {
            case SimType.Purple:
                return BulletType.Standard;
            case SimType.Red:
                return BulletType.Wave;
            case SimType.Green:
                return BulletType.Homing;
            case SimType.Blue:
                return BulletType.Spread;
        }
    }

    fire() {
        if (this.isDead) {
            return;
        }

        if (Date.now() > this.nextBulletTime && this.repeaterCount === 0) {
            this.repeaterCount = BULLET_AMOUNT;
            this.nextRepeaterTime = Date.now() + BULLET_SPAWN_REPEATER_GAP;
        }
        if (Date.now() > this.nextRepeaterTime && this.repeaterCount > 0) {
            this.repeaterCount--;
            this.nextRepeaterTime = Date.now() + BULLET_SPAWN_REPEATER_GAP;
            this.bulletDirectionFlip = !this.bulletDirectionFlip;
            let bullet = new EnemyBullet(this.game, this.centerX, this.centerY, this.bulletDirectionFlip, this.player, this.getBulletType());
            this.nextBulletTime = Date.now() + BULLET_SPAWN_DELAY;
            return bullet;
        }
        return;
    }
}