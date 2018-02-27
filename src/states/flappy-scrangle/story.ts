import * as Assets from '../../assets';
import { Keyboard } from 'phaser-ce';

const RADIAN = 6.283185;
const ONE_DEGREE_RADIANS = 0.01745329;

export default class FlappyStory extends Phaser.State {
    

    private titleText: Phaser.Sprite = null;
    private skipText: Phaser.Text = null;
    private skipTextTimer: Phaser.TimerEvent;
    private storyTimer: Phaser.TimerEvent;

    private skipped: boolean = false;

    
    
    
    private storyText: string[] = ["There once was a squirrel called Scrangle.. ",
                                   "He lived happily in a forest filled with trees and sugary treats. ",
                                   "One day he was asked to embark on a quest to rid the FreeBSD kernel of all of it's nasty bugs..",
                                   "This proved a great challenge to the apprentice nut cracker, and he found himself in fits of rage at FreeBSD..                                   ",
                                   "He took to the FreeBSD message boards and complained loudly whenever he could stirring up rage from the developers.",
                                   "He embarked on a mission to flood the FreeBSD source code with ASCII squirrels to show them once and for all who was boss.", 
                                   "One PC wasn't enough, so he recruited lots of other woodland creatures to help, and taught them how to use git.",
                                   "Soon enough, 80% of the source code was squirrels, and performance had slowed to a crawl.",
                                   "The neckbeards had had enough!",
                                   "They marched an army that stretched for miles deep into the forest, reverting any git commits they could find and setting fire to everything.",
                                   "Eventually they surrounded Scrangle a top the highest tree.",
                                   "In a flash, he took flight..",
                                   "",
                                   "Join him now on his adventure to find a new home!"];

    private storySpriteText: Phaser.Text[];
    private storyTextCount = 0;
    // This is any[] not string[] due to a limitation in TypeScript at the moment;
    // despite string enums working just fine, they are not officially supported so we trick the compiler into letting us do it anyway.
    private sfxLaserSounds: any[] = null;

    public create(): void {


        this.titleText = this.game.add.sprite(this.game.world.centerX -120, this.game.world.centerY + 250, Assets.Images.ImagesFreebsd.getName());
        this.titleText.scale.setTo(0.5,0.5);

        this.skipTextTimer = this.time.events.loop(500, this.flash, this);
        this.storyTimer = this.time.events.loop(2500, this.showStory, this);
        this.storyTimer.timer.start();
        this.storySpriteText = new Array<Phaser.Text>();
        this.storySpriteText[0] = this.game.add.text(this.game.world.centerX - 600,((this.game.world.centerY - 300)+ (0*38)),this.storyText[0],{
            font: '25px ' + Assets.GoogleWebFonts.VT323,
            boundsAlignV: 'middle',
            boundsAlignH: 'middle',
            fill: '#FFFFFF'
        });
        for(let i = 1; i < this.storyText.length; i++){
            this.storySpriteText[i] = this.game.add.text(this.game.world.centerX - 600,((this.game.world.centerY - 300)+ (i*38)),this.storyText[i],{
                font: '25px ' + Assets.GoogleWebFonts.VT323,
                boundsAlignV: 'middle',
                boundsAlignH: 'middle',
                fill: '#FFFFFF'
            });
            this.storySpriteText[i].visible = false;
        }


        this.skipText = this.game.add.text(this.game.world.centerX - 140,this.game.world.centerY + 350, 'Push S to skip..', {
			font: '25px ' + Assets.GoogleWebFonts.VT323,
			boundsAlignV: 'middle',
			boundsAlignH: 'middle',
			fill: '#FFFFFF'
        });
        
        this.game.sound.play(Assets.Audio.AudioFlappyScrangleStoryMusic.getName(), 0.2, false);
    }
    public shutdown() {
        this.game.sound.stopAll();
    }
    showStory(){
        if(this.storyTextCount < this.storyText.length){
            this.storySpriteText[this.storyTextCount].visible = true;
            this.storyTextCount++;
        }else{
            this.storyTextCount = 0;
            this.skipped = true;
            this.game.state.start('flappyScrangle');

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
        if(this.skipped){
            this.game.state.start('flappyScrangle');
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.S)) {
            this.skipped = true;
            this.game.state.start('flappyScrangle');
        }
    }
}
