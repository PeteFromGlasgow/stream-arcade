import * as Assets from '../../assets';
import { Keyboard } from 'phaser-ce';

const RADIAN = 6.283185;
const ONE_DEGREE_RADIANS = 0.01745329;

export default class FlappyStory extends Phaser.State {
    

    private titleText: Phaser.Sprite = null;
    private skipText: Phaser.Text = null;
    private skipTextTimer: Phaser.TimerEvent;
    private storyTimer: Phaser.TimerEvent;

    private storyText: string[] = ["There once was a squirrel called Scrangle.. ",
                                   "He spent many months blaspheming about FreeBSD and it's developers..",
                                   "Eventually the internet noticed, and an army of neckbeards assembled..",
                                   "They marched through his forest chanting as they went.",
                                   "They set fire to his nest, and all the trees, giving him no option but to flee..",
                                   "Join him now on his adventure to find a new home!"];
    private storySpriteText: Phaser.Text[];
    private storyTextCount = 0;
    // This is any[] not string[] due to a limitation in TypeScript at the moment;
    // despite string enums working just fine, they are not officially supported so we trick the compiler into letting us do it anyway.
    private sfxLaserSounds: any[] = null;

    public create(): void {


        this.titleText = this.game.add.sprite(this.game.world.centerX -310, this.game.world.centerY - 400, Assets.Images.ImagesFreebsd.getName());
        this.titleText.scale.setTo(0.5,0.5);

        this.skipTextTimer = this.time.events.loop(500, this.flash, this);
        this.storyTimer = this.time.events.loop(1500, this.showStory, this);

        this.storySpriteText = new Array<Phaser.Text>();

        for(let i = 0; i < this.storyText.length; i++){
            this.storySpriteText[i] = this.game.add.text(this.game.world.centerX - 300,((this.game.world.centerY - 300)+ (i*32)),this.storyText[i],{
                font: '25px ' + Assets.GoogleWebFonts.VT323,
                boundsAlignV: 'middle',
                boundsAlignH: 'middle',
                fill: '#FFFFFF'
            });
            this.storySpriteText[i].visible = false;
        }


        this.skipText = this.game.add.text(this.game.world.centerX - 140,this.game.world.centerY + 100, 'Push S to skip..', {
			font: '25px ' + Assets.GoogleWebFonts.VT323,
			boundsAlignV: 'middle',
			boundsAlignH: 'middle',
			fill: '#FFFFFF'
        });
        
        // this.stage.backgroundColor = '#269900';
    }
    showStory(){
        if(this.storyTextCount < this.storyText.length){
            this.storySpriteText[this.storyTextCount].visible = true;
            this.storyTextCount++;
        }
    }
    flash(){
        if(this.skipText.visible == true){
            this.skipText.visible = false;
        }else{
            this.skipText.visible = true;
        }
    }
    public update(): void {

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.S)) {
            this.game.state.start('flappyScrangle');
        }
    }
}
