import * as Assets from '../../assets';

const RADIAN = 6.283185;
const ONE_DEGREE_RADIANS = 0.01745329;
const BULLET_LIFESPAN = 1000;
const BULLET_SPAWN_DELAY = 300;
const WORLD_BOUNDS_X = 0;
const WORLD_BOUNDS_Y = 0;


export default class SimInvaders extends Phaser.State {
    private lastBulletTime: number = 0;
    private simInvadersTitle: Phaser.Text = null;
    private insertCoinText: Phaser.Text = null;
    private pixelateShader: Phaser.Filter = null;

    private bulletGroup: Phaser.Group = null;

    // This is any[] not string[] due to a limitation in TypeScript at the moment;
    // despite string enums working just fine, they are not officially supported so we trick the compiler into letting us do it anyway.
    private sfxLaserSounds: any[] = null;

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

        this.pixelateShader = new Phaser.Filter(this.game, null, this.game.cache.getShader(Assets.Shaders.ShadersPixelate.getName()));

        // this.simInvadersTitle.filters = [this.pixelateShader];
    }

    private spawnBullet() {
        if ((Date.now() - BULLET_SPAWN_DELAY) > this.lastBulletTime) {
            let bullet = this.game.add.text(this.insertCoinText.x, this.insertCoinText.y, '#', {
                font: '30px ' + Assets.GoogleWebFonts.VT323,
                fill: '#ffffff'
            });
            bullet.lifespan = BULLET_LIFESPAN;
            this.bulletGroup.add(bullet);
            this.lastBulletTime = Date.now();
        }
    }

    private playerBoundsCheck() {
        if (!(this.world.bounds.contains(this.insertCoinText.x, this.insertCoinText.y))) {
            if (this.insertCoinText.x > this.world.bounds.width) {
                this.insertCoinText.x = this.world.bounds.width;
            }

            if (this.insertCoinText.x < this.world.bounds.x) {
                this.insertCoinText.x = this.world.bounds.x;
            }

            if (this.insertCoinText.y > this.world.bounds.height) {
                this.insertCoinText.y = this.world.bounds.height;
            }

            if (this.insertCoinText.y < this.world.bounds.y) {
                this.insertCoinText.y = this.world.bounds.y;
            }
        }
    }

    private doPlayerMovement() {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.insertCoinText.position.add(-4, 0);
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.insertCoinText.position.add(4, 0);
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            this.insertCoinText.position.add(0, -4);
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            this.insertCoinText.position.add(0, 4);
        }

        this.playerBoundsCheck()
    }

    public update() {
        this.doPlayerMovement();

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) this.spawnBullet();

        this.bulletGroup.forEach((item: Phaser.Text) => {
            item.position.add(0, -10);
        }, this);
    }
}