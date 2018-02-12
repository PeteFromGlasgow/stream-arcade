import * as Assets from '../../assets';
import {Player} from './models/player';
import {Sim} from './models/sim';
import {PlayerBullet} from './models/playerBullet';


const RADIAN = 6.283185;
const ONE_DEGREE_RADIANS = 0.01745329;
const BULLET_LIFESPAN = 1000;
const BULLET_SPAWN_DELAY = 300;
const WORLD_BOUNDS_X = 0;
const WORLD_BOUNDS_Y = 0;

export default class SimInvaders extends Phaser.State {
    private sim: Sim;
    private lastBulletTime: number = 0;
    private simInvadersTitle: Phaser.Text = null;
    private insertCoinText: Phaser.Text = null;
    private pixelateShader: Phaser.Filter = null;
    private player: Player = null;
    private bulletGroup: Phaser.Group = null;

    public create(): void {
        this.bulletGroup = this.game.add.group();

        this.world.setBounds(WORLD_BOUNDS_X, WORLD_BOUNDS_Y, this.game.width, this.game.height);

        this.simInvadersTitle = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 100, 'SIM\nInvaders', {
            font: '50px ' + Assets.GoogleWebFonts.VT323,
            boundsAlignV: 'middle',
            boundsAlignH: 'middle',
            fill: '#FFFFFF'
        });

        this.insertCoinText = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 100, 'Insert Coin', {
            font: '30px ' + Assets.GoogleWebFonts.VT323,
            fill: '#ffffff'
        })
        this.simInvadersTitle.anchor.setTo(0.5);
        this.insertCoinText.anchor.setTo(0.5);

        this.player = new Player(this.game, 100, 100);
        this.sim = new Sim(this.game, this.game.world.centerX, this.game.world.top);

        this.pixelateShader = new Phaser.Filter(this.game, null, this.game.cache.getShader(Assets.Shaders.ShadersPixelate.getName()));

        // this.simInvadersTitle.filters = [this.pixelateShader];
    }

    private spawnBullet() {
        if ((Date.now() - BULLET_SPAWN_DELAY) > this.lastBulletTime) {
            let bullet = new PlayerBullet(this.game, this.player.x, this.player.y)
            bullet.lifespan = BULLET_LIFESPAN;
            this.bulletGroup.add(bullet);
            this.lastBulletTime = Date.now();
        }
    }

    public update() {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) this.spawnBullet();
        this.sim.fire();
        this.bulletGroup.forEach((item: Phaser.Text) => {
            item.position.add(0, -10);
        }, this);
    }
}