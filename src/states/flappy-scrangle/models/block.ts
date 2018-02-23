import * as Assets from '../../../assets';

export default class Block extends Phaser.Sprite {
 
    constructor(game: Phaser.Game, x: number, y: number) {

        super(game, x, y,Assets.Images.ImagesWhiteBlock.getName(),0);

//        this.anchor.set(0.4);
        
        game.physics.arcade.enable(this);
        
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
        this.body.velocity.x = -200;

        game.add.existing(this);
    }
    update() {
      
    }

}