import * as Assets from '../assets';
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

    

    // This is any[] not string[] due to a limitation in TypeScript at the moment;
    // despite string enums working just fine, they are not officially supported so we trick the compiler into letting us do it anyway.
    private sfxLaserSounds: any[] = null;

    public create(): void {
        this.googleFontText = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 100, 'Stream Arcade', {
            font: '50px ' + Assets.GoogleWebFonts.VT323,
            fill: '#FFFFFF'
        });
        this.googleFontText.anchor.setTo(0.5);

        this.pixelateShader = new Phaser.Filter(this.game, null, this.game.cache.getShader(Assets.Shaders.ShadersPixelate.getName()));

        this.googleFontText.filters = [this.pixelateShader];

        this.mummySpritesheet = this.game.add.sprite(this.game.world.centerX -200 , this.game.world.centerY + 175, Assets.Spritesheets.SpritesheetsMetalslugMummy374518.getName());
        this.mummySpritesheet.animations.add('walk');
        this.mummySpritesheet.animations.play('walk', 30, true);

        //this.game.sound.play(Assets.Audio.AudioMusic.getName(), 1, true);
    }

    public update(): void {
        this.sinTracker = (this.sinTracker + (10 * ONE_DEGREE_RADIANS))  % RADIAN;
        this.googleFontText.rotation = 0.2 * Math.sin(this.sinTracker);

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.S)) {
            this.game.state.start('simInvaders');
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.F)) {
            this.game.state.start('flappyTitle');
        }
    }
}
