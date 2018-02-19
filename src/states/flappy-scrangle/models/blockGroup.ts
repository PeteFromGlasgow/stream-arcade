import * as Assets from '../../../assets';
import Player from './player';


const MOVEMENT_SPEED = -1.9;

export default class BlockGroup extends Phaser.Group {

    private candyCane: Phaser.Sprite = null;
    private lollipop: Phaser.Sprite = null;
    private refresher: Phaser.Sprite = null;
    private parmaviolet: Phaser.Sprite = null;

    private enemySimGroup: Phaser.Group = null;

    game: Phaser.Game = null;
    private blockCount: number = 0;
    
    constructor(game: Phaser.Game) {
        super(game);
        this.game = game;
        game.add.existing(this);
    }
    
    private performMovement(block: Phaser.Sprite) {
        block.position.add(MOVEMENT_SPEED,0);
    }

    update() {
        this.forEach(block => this.performMovement(block), this);
    }
}
