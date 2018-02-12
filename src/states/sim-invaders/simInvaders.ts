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
const STANDARD_SIM_KILL_SCORE = 100;

export default class SimInvaders extends Phaser.State {
    private sim: Sim;
    private lastBulletTime: number = 0;
    private simInvadersTitle: Phaser.Text = null;
    private insertCoinText: Phaser.Text = null;
    private pixelateShader: Phaser.Filter = null;
    private player: Player = null;
    private playerBulletGroup: Phaser.Group = null;
    private enemySimGroup: Phaser.Group = null;

    private score: number = 0;
    private lives: number = 3;

    public create(): void {
        this.playerBulletGroup = this.add.physicsGroup();
        this.enemySimGroup = this.add.physicsGroup();

        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.world.setBounds(WORLD_BOUNDS_X, WORLD_BOUNDS_Y, this.game.width, this.game.height);

        // this.simInvadersTitle = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 100, 'SIM\nInvaders', {
        //     font: '50px ' + Assets.GoogleWebFonts.VT323,
        //     boundsAlignV: 'middle',
        //     boundsAlignH: 'middle',
        //     fill: '#FFFFFF'
        // });

        // this.insertCoinText = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 100, 'Insert Coin', {
        //     font: '30px ' + Assets.GoogleWebFonts.VT323,
        //     fill: '#ffffff'
        // })
        // this.simInvadersTitle.anchor.setTo(0.5);
        // this.insertCoinText.anchor.setTo(0.5);

        this.player = new Player(this.game, 100, 100);
        this.sim = new Sim(this.game, this.game.world.centerX, this.game.world.top);
        this.enemySimGroup.add(this.sim);
        this.physics.enable(this.sim, Phaser.Physics.ARCADE);

        this.pixelateShader = new Phaser.Filter(this.game, null, this.game.cache.getShader(Assets.Shaders.ShadersPixelate.getName()));

        
    }

    private spawnBullet() {
        if ((Date.now() - BULLET_SPAWN_DELAY) > this.lastBulletTime) {
            let bullet = new PlayerBullet(this.game, this.player.x, this.player.y)
            this.physics.enable(bullet, Phaser.Physics.ARCADE);
            bullet.lifespan = BULLET_LIFESPAN;
            this.playerBulletGroup.add(bullet);
            this.lastBulletTime = Date.now();
        }
    }

    private handleAttackEnemySim(bullet: PlayerBullet, sim: Sim) {
        this.score += STANDARD_SIM_KILL_SCORE;
        bullet.destroy();
        sim.destroy();
    }

    public update() {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) this.spawnBullet();
        this.enemySimGroup.forEach(sim => sim.fire(), this);
        this.playerBulletGroup.forEach((item: Phaser.Text) => {
            item.position.add(0, -10);
        }, this);
        this.physics.arcade.collide(this.playerBulletGroup, this.enemySimGroup, (bullet: PlayerBullet, sim: Sim) => this.handleAttackEnemySim(bullet, sim));
    }
}