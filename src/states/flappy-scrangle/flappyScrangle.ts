import * as Assets from '../../assets';
import Player from './models/player';

export default class FlappyScrangle extends Phaser.State {
	player: Player;

	public create(): void {
		this.player = new Player(this.game,50,50);
	}
	public update() {
        this.player.update();
	}
}
