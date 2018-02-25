import * as Assets from '../../../assets';
import Player from './player';
import Block from './block';

const MOVEMENT_SPEED = -1.9;

export default class BlockGroup extends Phaser.Group {


    game: Phaser.Game = null;
    private blockCount: number = 0;
    
    constructor(game: Phaser.Game) {
        super(game);
        this.game = game;
        game.add.existing(this);
    }
    
    private performMovement(block: Block) {
       
    }

    update() {
      
    }
}
