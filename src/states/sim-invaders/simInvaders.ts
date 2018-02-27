import * as Assets from '../../assets';
import {Player} from './models/player';
import {Sim, SimType} from './models/sim';
import {EnemySimGroup, MOVEMENT_CHANGE_THRESHOLD_HORIZONTAL} from './models/enemySimGroup';
import {PlayerBullet} from './models/playerBullet';
import { EnemyBullet } from './models/enemyBullet';


const RADIAN = 6.283185;
const ONE_DEGREE_RADIANS = 0.01745329;
const BULLET_LIFESPAN = 1000;
const BULLET_SPAWN_DELAY = 300;
const WORLD_BOUNDS_X = 0;
const WORLD_BOUNDS_Y = 0;
const STANDARD_SIM_KILL_SCORE = 100;

const WORLD_SPAWN_PADDING_HORIZONTAL = 0.3;
const WORLD_SPAWN_PADDING_TOP = 0.1;
const WORLD_SPAWN_PADDING_BOTTOM = 0.4;

const ENEMY_COUNT_HORIZONTAL = 6;
const ENEMY_COUNT_VERTICAL = 5;

const WAVE_ALLOWED_SIM_TABLES = [
    [],
    [SimType.Purple],
    [SimType.Purple, SimType.Red],
    [SimType.Green, SimType.Red],
    [SimType.Green, SimType.Red, SimType.Purple],
    [SimType.Purple, SimType.Blue],
    [SimType.Blue, SimType.Purple, SimType.Green, SimType.Red]
];
const WAVE_ENEMY_COUNT_TABLE = [
    {horizontal: 0, vertical: 0},
    {horizontal: 6, vertical: 5},
    {horizontal: 6, vertical: 5},
    {horizontal: 6, vertical: 5},
    {horizontal: 6, vertical: 5},
    {horizontal: 6, vertical: 3},
    {horizontal: 6, vertical: 6},
];
const ESIM_ENABLE_WAVE = 7;


export default class SimInvaders extends Phaser.State {
    private lastBulletTime: number = 0;
    private scoreTitle: Phaser.Text = null;
    private livesText: Phaser.Text = null;
    private insertCoinText: Phaser.Text = null;
    private pixelateShader: Phaser.Filter = null;
    private player: Player = null;
    private playerBulletGroup: Phaser.Group = null;
    private enemySimGroup: Phaser.Group = null;
    private enemyBulletGroup: Phaser.Group = null;

    private score: number;
    private lives: number;
    private wave: number;
    private newWaveQueued = false;

    private pauseDebounce: number = 0;

    public create(): void {
        this.playerBulletGroup = this.add.physicsGroup();
        this.enemyBulletGroup = this.add.physicsGroup();
        this.enemySimGroup = new EnemySimGroup(this.game);
        this.score = 100;
        this.lives = 3;
        this.wave = 1;

        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.world.setBounds(WORLD_BOUNDS_X, WORLD_BOUNDS_Y, this.game.width, this.game.height);

        this.scoreTitle = this.game.add.text(this.world.width - 100, 10, 'Score 0', {
            font: '24px ' + Assets.GoogleWebFonts.VT323,
            boundsAlignV: 'middle',
            boundsAlignH: 'middle',
            fill: '#FFFFFF'
        });
        this.scoreTitle.anchor.set(1, 0);

        this.livesText = this.game.add.text(100, 10, `Lives ${this.lives}`, {
            font: '24px ' + Assets.GoogleWebFonts.VT323,
            boundsAlignV: 'middle',
            boundsAlignH: 'middle',
            fill: '#FFFFFF'
        });
        this.livesText.anchor.set(0, 0);

        this.newWaveQueued = true;
        this.displayWave().then(() => {
            this.setupEnemySims();
            this.newWaveQueued = false;
        });

        this.player = new Player(this.game, this.game.width * 0.5, this.game.height * 0.9);
        this.pixelateShader = new Phaser.Filter(this.game, null, this.game.cache.getShader(Assets.Shaders.ShadersPixelate.getName()));
        this.game.sound.play(Assets.Audio.AudioSimInvadersGame.getName(), 1, true);
    }

    public shutdown() {
        this.game.sound.stopAll();
    }

    private getCurrentWaveSimTypeTable() {
        if (this.wave >= WAVE_ALLOWED_SIM_TABLES.length) {
            return WAVE_ALLOWED_SIM_TABLES[WAVE_ALLOWED_SIM_TABLES.length - 1]
        }
        return WAVE_ALLOWED_SIM_TABLES[this.wave];
    }

    private getRandomSimTypeForWave() {
        let waveTable = this.getCurrentWaveSimTypeTable()
        return waveTable[this.game.rnd.between(0, waveTable.length - 1)];
    }

    private getCurrentWaveEnemyCount() {
        if (this.wave >= WAVE_ENEMY_COUNT_TABLE.length) {
            return WAVE_ENEMY_COUNT_TABLE[WAVE_ENEMY_COUNT_TABLE.length - 1]
        }
        return WAVE_ENEMY_COUNT_TABLE[this.wave];
    }

    private setupEnemySims () {
        const rightBounds = (this.world.width * (1 - WORLD_SPAWN_PADDING_HORIZONTAL));
        const leftBounds = this.world.width * WORLD_SPAWN_PADDING_HORIZONTAL;
        const topBounds = this.world.height * WORLD_SPAWN_PADDING_TOP;
        const bottomBounds = this.world.height * (1 - WORLD_SPAWN_PADDING_BOTTOM);
        const spawnSpaceWidth = rightBounds - leftBounds;
        const spawnSpaceHeight = bottomBounds - topBounds;
        const enemyCounts = this.getCurrentWaveEnemyCount();
        for (let spawnX = leftBounds; spawnX < rightBounds; spawnX += (spawnSpaceWidth / (enemyCounts.horizontal - 1))) {
            for (let spawnY = topBounds; spawnY < bottomBounds; spawnY += spawnSpaceHeight / (enemyCounts.vertical - 1)) {
                let sim = new Sim(this.game, spawnX, spawnY, this.player, this.getRandomSimTypeForWave(), this.wave > ESIM_ENABLE_WAVE);
                this.enemySimGroup.add(sim);
            }
        }
    }

    private spawnBullet() {
        if ((Date.now() - BULLET_SPAWN_DELAY) > this.lastBulletTime) {
            let bullet = new PlayerBullet(this.game, this.player.x, this.player.y);
            this.physics.enable(bullet, Phaser.Physics.ARCADE);
            bullet.lifespan = BULLET_LIFESPAN;
            this.playerBulletGroup.add(bullet);
            this.lastBulletTime = Date.now();
        }
    }

    private updateScoreText() {
        this.scoreTitle.setText(`Score ${this.score}`);
    }

    private handleAttackEnemySim(bullet: PlayerBullet, sim: Sim) {
        this.score += STANDARD_SIM_KILL_SCORE;
        this.updateScoreText();
        sim.die();
        this.playerBulletGroup.remove(bullet);
        sim.events.onKilled.addOnce(() => {
            this.enemySimGroup.remove(sim);
        })
    }

    private async displayWave() {
        return new Promise((resolve, reject) => {
            let text = this.add.text(this.world.centerX, this.world.centerY, `Wave ${this.wave}`, {
                font: '36px ' + Assets.GoogleWebFonts.VT323,
                boundsAlignV: 'middle',
                boundsAlignH: 'middle',
                fill: '#FFFFFF'
            });

            text.anchor.set(0.5, 0.5);
            text.lifespan = 3000;
            text.events.onKilled.add(() => {
                resolve();
            });
        });

    }

    private resetGame() {
        this.enemySimGroup.killAll();
        this.enemySimGroup.removeAll();
        this.enemyBulletGroup.killAll();
        this.enemyBulletGroup.removeAll();
        this.newWaveQueued = true;
        this.displayWave().then(() => {
            this.setupEnemySims();
            this.newWaveQueued = false;
        });
    }

    private handlePlayerDeath(player: Player, bullet: EnemyBullet) {
        this.resetGame();

        player.play('death').onComplete.addOnce(() => {
            this.lives--;
            if (this.lives <= 0) {
                this.game.state.start('simInvadersNameInput', true, false, this.score);
            }
            this.livesText.setText(`Lives ${this.lives}`);
            player.position.set(this.game.width * 0.5, this.game.height * 0.9)
            player.play('stationary');
        })
    }

    public pauseUpdate () {
        if (
            (this.game.input.keyboard.isDown(Phaser.Keyboard.ESC)) && Date.now() > this.pauseDebounce
        ) {
            this.game.paused = false;
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
            this.game.paused = false;
            this.game.state.start('simInvadersTitle');
        }
    }

    public update() {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || this.game.input.gamepad.pad1.isDown(Phaser.Gamepad.XBOX360_A)) this.spawnBullet();

        if (
            (this.game.input.keyboard.isDown(Phaser.Keyboard.ESC) ||
            this.game.input.gamepad.pad1.isDown(Phaser.Gamepad.XBOX360_START)) &&  Date.now() > this.pauseDebounce
        ) {
            this.pauseDebounce = Date.now() + 1000;
            this.game.paused = true;
        }
        this.enemySimGroup.forEach((sim) => {
            let bullet = sim.fire();
            if (bullet) {
                this.enemyBulletGroup.add(bullet);
            }
        }, this);
        this.playerBulletGroup.forEach((item: Phaser.Text) => {
            item.position.add(0, -10);
        }, this);
        if (this.enemySimGroup.length === 0 && !this.newWaveQueued) {
            this.newWaveQueued = true;
            this.wave++;
            this.resetGame()
        }

        this.physics.arcade.collide(
            this.playerBulletGroup,
            this.enemySimGroup,
            (bullet: PlayerBullet, sim: Sim) => this.handleAttackEnemySim(bullet, sim),
            (bullet, sim: Sim) => !sim.isDead
        );


        this.physics.arcade.collide(this.player, this.enemyBulletGroup, (player, bullet) => this.handlePlayerDeath(player, bullet));
    }
}