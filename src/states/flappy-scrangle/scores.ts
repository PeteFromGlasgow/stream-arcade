import * as Assets from '../../assets';
import {ScoreService, Games} from '../../services/ScoreService';

export default class FlappyScoreboard extends Phaser.State {
    title: Phaser.Sprite;
    scoreText: Phaser.Text;
    scoreService: ScoreService;
    scoreList: Phaser.Group;

    score: number;
    name: string;

    public init(name?: string, score?: number) {
        this.score = score;
        this.name = name;
    }

    public create(): void {
        this.title = new Phaser.Sprite(this.game, this.game.world.centerX, 300, Assets.Images.ImagesTitleText.getName(), 0);
        this.title.scale.set(0.7)
        this.title.anchor.set(0.5);

        this.scoreText = new Phaser.Text(this.game, this.game.world.centerX - 10, this.game.world.height * 0.47 , 'Score', {
            font: '42px ' + Assets.GoogleWebFonts.VT323,
            boundsAlignV: 'middle',
            boundsAlignH: 'middle',
            fill: '#FFFFFF'
        });
        this.scoreText.anchor.set(0.5);
        this.game.add.existing(this.scoreText)
        this.scoreList = new Phaser.Group(this.game);
        this.game.add.existing(this.scoreList);
        this.game.add.existing(this.title);
        this.scoreService = new ScoreService();
        this.loadScores();
    }

    private createScoreList(scores: any[]) {
        let positionY = this.game.height * 0.5;
        scores.forEach(score => {
            let color = (this.name === score.name && this.score === score.score) ? '#FFFF33' : '#FFFFFF';
            let nameText = new Phaser.Text(this.game, this.game.width * 0.3, positionY , score.name, {
                font: '30px ' + Assets.GoogleWebFonts.VT323,
                boundsAlignV: 'middle',
                boundsAlignH: 'middle',
                fill: color
            });
            this.scoreList.add(nameText);

            let scoreText = new Phaser.Text(this.game, this.game.width * 0.7, positionY , score.score, {
                font: '30px ' + Assets.GoogleWebFonts.VT323,
                boundsAlignV: 'middle',
                boundsAlignH: 'middle',
                fill: color
            });
            scoreText.anchor.set(1, 0);
            this.scoreList.add(scoreText);
            this.stage.backgroundColor = '#000000';
            positionY += 30;
        })
    }
    private async loadScores() {
        try {
            let scores = await this.scoreService.getScores(Games.FlappyScrangle);
            this.createScoreList(scores);
        } catch (error) {
            console.log('Could not load scores');
        }

    }

    public update() {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.state.start('flappyTitle');
        }
    }
}