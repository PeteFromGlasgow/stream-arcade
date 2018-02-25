import * as Assets from '../../../assets';

export default class Block extends Phaser.Sprite {

                                  
    constructor(game: Phaser.Game, x: number, y: number, index: number) {

        let textures: string[] = [Assets.Images.ImagesWhiteBlockBorderedTop.getName(),
                                  Assets.Images.ImagesWhiteBlockBorderedBottom.getName(),
                                  Assets.Images.ImagesWhiteBlockBorderedMiddle.getName()];

        super(game, x, y,textures[index],0);
        this.scale.setTo(2,2);
        game.physics.arcade.enable(this);

        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
        this.body.velocity.x = -300;

        game.add.existing(this);
    }
    update() {
      
    }

}