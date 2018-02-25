import * as Assets from '../../assets';
import {ScoreService, Games} from '../../services/ScoreService';

const KEY_DEBOUNCE = 100;

export default class SimInvadersNameInput extends Phaser.State {
    title: Phaser.Sprite;
    namePrompt: Phaser.Text;
    nameDisplay: Phaser.Text;
    name: string = '';
    nextBackspaceTime: number = Date.now();
    scoreService: ScoreService;
    score: number;

    public init(score) {
        this.score = score;
        console.log(score)
    }

    public create(): void {
        this.title = new Phaser.Sprite(this.game, this.game.world.centerX, 300, Assets.Spritesheets.SpritesheetsSimInvaders800600.getName(), 0);
        this.title.anchor.set(0.5);
        this.game.add.existing(this.title)

        this.scoreService = new ScoreService();

        this.namePrompt = new Phaser.Text(this.game, this.game.world.centerX - 10, this.game.world.height * 0.47 , 'What is your name?', {
            font: '42px ' + Assets.GoogleWebFonts.VT323,
            boundsAlignV: 'middle',
            boundsAlignH: 'middle',
            fill: '#FFFFFF'
        });

        this.nameDisplay = new Phaser.Text(this.game, this.game.world.centerX - 10, this.game.world.height * 0.53 , this.name, {
            font: '72px ' + Assets.GoogleWebFonts.VT323,
            boundsAlignV: 'middle',
            boundsAlignH: 'middle',
            fill: '#FFFFFF'
        });
        this.nameDisplay.anchor.set(0.5);
        this.game.add.existing(this.nameDisplay);

        
        this.namePrompt.anchor.set(0.5);
        this.game.add.existing(this.namePrompt);
        this.game.input.keyboard.onPressCallback = (code) => {
            if (/[A-Za-z0-9 _]/.test(code) && this.name.length < 10) {
                this.name += code;
            }
            this.updateName()
        }
    }


    private updateName () {
        this.nameDisplay.setText(this.name);
    }

    shutdown() {
        this.game.input.keyboard.onPressCallback = null;
    }


    public update() {
        

        if (this.game.input.keyboard.isDown((Phaser.Keyboard.BACKSPACE)) && Date.now() > this.nextBackspaceTime) {
            this.name = this.name.substring(0, this.name.length - 1)
            this.nextBackspaceTime = Date.now() + KEY_DEBOUNCE;
            this.updateName()
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
            this.nextBackspaceTime = Date.now() * 10;
            this.game.input.keyboard.onPressCallback = null;
            this.scoreService.createUser(this.name).then(() => {
                this.scoreService.addScore(Games.SimInvaders, this.score);
                this.game.state.start('simInvadersScoreboard');
            })
        }
    }
}