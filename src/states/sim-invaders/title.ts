import * as Assets from '../../assets';

export default class SimInvadersTitle extends Phaser.State {
    title: Phaser.Sprite;

    public create(): void {
        this.title = new Phaser.Sprite(this.game, this.game.world.centerX, 300, Assets.Spritesheets.SpritesheetsSimInvaders800600.getName(), 0);
        this.title.anchor.set(0.5);
        this.game.add.existing(this.title);
    }

    public update() {
    }
}