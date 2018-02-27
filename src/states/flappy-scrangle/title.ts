import * as Assets from '../../assets';
import { Keyboard } from 'phaser-ce';

const RADIAN = 6.283185;
const ONE_DEGREE_RADIANS = 0.01745329;

export default class FlappyTitle extends Phaser.State {
    

    private titleText: Phaser.Sprite = null;
    private startText: Phaser.Text = null;
    private startTextTimer: Phaser.TimerEvent;
    private sinTracker = 0;

    

    // This is any[] not string[] due to a limitation in TypeScript at the moment;
    // despite string enums working just fine, they are not officially supported so we trick the compiler into letting us do it anyway.
    private sfxLaserSounds: any[] = null;

    public create(): void {


        this.titleText = this.game.add.sprite(this.game.world.centerX -225, this.game.world.centerY - 350, Assets.Images.ImagesTitleText.getName());
        this.titleText.scale.setTo(0.5,0.5);

        this.startTextTimer = this.time.events.loop(500, this.flash, this);

        this.startText = this.game.add.text(this.game.world.centerX - 140,this.game.world.centerY + 100, 'Insert Coin(s) to play..', {
			font: '25px ' + Assets.GoogleWebFonts.VT323,
			boundsAlignV: 'middle',
			boundsAlignH: 'middle',
			fill: '#FFDF00'
		});
         this.stage.backgroundColor = '#000000';
    }
    flash(){
        if(this.startText.visible == true){
            this.startText.visible = false;
        }else{
            this.startText.visible = true;
        }
    }
    public update(): void {
        this.sinTracker = (this.sinTracker + (10 * ONE_DEGREE_RADIANS))  % RADIAN;

        if (
            this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) ||
            this.game.input.gamepad.pad1.isDown(Phaser.Gamepad.XBOX360_A)
        ) {
            this.game.state.start('flappyStory');
        }
        if (
            this.game.input.keyboard.isDown(Phaser.Keyboard.ESC) ||
            this.game.input.gamepad.pad1.isDown(Phaser.Gamepad.XBOX360_BACK)
        ) {
            this.game.state.start('title');
        }

    }
}
