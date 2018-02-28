import * as Assets from '../assets';
import { ScoreService, Games } from '../services/ScoreService';
import { Keyboard } from 'phaser-ce';

const RADIAN = 6.283185;
const ONE_DEGREE_RADIANS = 0.01745329;

export default class Title extends Phaser.State {
    private googleFontText: Phaser.Text = null;
    private localFontText: Phaser.Text = null;
    private pixelateShader: Phaser.Filter = null;
    private bitmapFontText: Phaser.BitmapText = null;
    private blurXFilter: Phaser.Filter.BlurX = null;
    private blurYFilter: Phaser.Filter.BlurY = null;
    private sfxAudiosprite: Phaser.AudioSprite = null;
    private mummySpritesheet: Phaser.Sprite = null;
    private sinTracker = 0;
    private selected: string = 'simInvadersTitle';
    private flappySquare: Phaser.Sprite = null;
    private simInvadersSquare: Phaser.Sprite = null;
    private selectionText: Phaser.Text = null;
    private flappyText: Phaser.Sprite = null;
    private simInvadersText: Phaser.Sprite = null;


    // This is any[] not string[] due to a limitation in TypeScript at the moment;
    // despite string enums working just fine, they are not officially supported so we trick the compiler into letting us do it anyway.
    private sfxLaserSounds: any[] = null;

    public create(): void {
        this.game.sound.stopAll();
        this.googleFontText = this.game.add.text(this.game.world.centerX-30, this.game.world.centerY - 460, 'Stream Arcade', {
            font: '50px ' + Assets.GoogleWebFonts.VT323,
            fill: '#FFFFFF'
        });

        this.googleFontText.anchor.setTo(0.5);

        this.pixelateShader = new Phaser.Filter(this.game, null, this.game.cache.getShader(Assets.Shaders.ShadersPixelate.getName()));

       // this.googleFontText.filters = [this.pixelateShader];

        this.flappySquare = new Phaser.Sprite(this.game,this.game.world.centerX + 50,this.game.world.centerY - 256,Assets.Images.ImagesSquare.getName());
        this.simInvadersSquare = new Phaser.Sprite(this.game,this.game.world.centerX - 350,this.game.world.centerY - 256,Assets.Images.ImagesSquare.getName());

        this.flappySquare.tint = this.RGBtoHEX(94,104,119);
        this.simInvadersSquare.tint = this.RGBtoHEX(94,104,119);

        this.flappySquare.width = 256;
        this.flappySquare.height = 256;
        this.simInvadersSquare.width = 256;
        this.simInvadersSquare.height = 256;

        this.flappySquare.alpha = 0.5;
        this.simInvadersSquare.alpha = 1;

        this.game.add.existing(this.flappySquare);
        this.game.add.existing(this.simInvadersSquare);

        this.flappyText = this.game.add.sprite(this.flappySquare.position.x + 30, this.flappySquare.position.y + 50, Assets.Images.ImagesTitleText.getName());
        this.flappyText.scale.setTo(0.25,0.25);
        this.flappyText.alpha = 0.5;
        this.game.add.existing(this.flappyText);

        this.simInvadersText = this.game.add.sprite(this.simInvadersSquare.position.x + 30, this.simInvadersSquare.position.y + 50, Assets.Spritesheets.SpritesheetsSimInvaders800600.getName());
        this.simInvadersText.scale.setTo(0.25,0.25);
        this.simInvadersText.alpha = 1;
        this.game.add.existing(this.simInvadersText);

        this.selectionText = this.game.add.text(this.game.world.centerX - 150,this.game.world.centerY + 300, 'Use the arrow keys to choose.. ', {
			font: '25px ' + Assets.GoogleWebFonts.VT323,
			boundsAlignV: 'middle',
			boundsAlignH: 'middle',
			fill: '#FFFFFF'
		});

        this.stage.backgroundColor = '#000000';
        this.game.sound.play(Assets.Audio.AudioStreamArcadeFull.getName(), 1, true);

        this.game.input.gamepad.start();

    }

    public shutdown() {
        this.game.sound.stopAll()
    }

	RGBtoHEX(r,g,b) {
		return r << 16 | g << 8 | b;
    }
    
    public update(): void {
        this.sinTracker = (this.sinTracker + (10 * ONE_DEGREE_RADIANS))  % RADIAN;
        this.googleFontText.rotation = 0.2 * Math.sin(this.sinTracker);

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) ||
            this.game.input.gamepad.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) ||
            this.game.input.gamepad.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1
        ) {
            this.selected = 'simInvadersTitle';
            this.flappySquare.alpha = 0.5;
            this.flappyText.alpha = 0.5;
            this.simInvadersSquare.alpha = 1;
            this.simInvadersText.alpha = 1;
        }
        else if (
            this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) ||
            this.game.input.gamepad.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) ||
            this.game.input.gamepad.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1
        ) {
            this.selected = 'flappyTitle';
            this.flappySquare.alpha = 1;
            this.flappyText.alpha = 1;
            this.simInvadersSquare.alpha = 0.5;
            this.simInvadersText.alpha = 0.5;
        }
        else if(
            this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) ||
            this.game.input.gamepad.pad1.isDown(Phaser.Gamepad.XBOX360_A)
        ){
            this.game.state.start(this.selected);
        }
    }
}
