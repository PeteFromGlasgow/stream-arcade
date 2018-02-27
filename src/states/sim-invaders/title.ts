import * as Assets from '../../assets';

export default class SimInvadersTitle extends Phaser.State {
    private debounceTime: number;
    private title: Phaser.Sprite;
    private startText: Phaser.Text = null;
    private startTextTimer: Phaser.TimerEvent;

    public create(): void {
        this.title = new Phaser.Sprite(this.game, this.game.world.centerX, 300, Assets.Spritesheets.SpritesheetsSimInvaders800600.getName(), 0);
        this.title.anchor.set(0.5);
        this.game.add.existing(this.title);
        this.startTextTimer = this.time.events.loop(500, () => this.startText.visible = !this.startText.visible, this);
        this.debounceTime = Date.now() + 1000;

        this.startText = this.game.add.text(this.game.world.centerX - 140,this.game.world.centerY + 100, 'Insert Coin(s) to play..', {
            font: '25px ' + Assets.GoogleWebFonts.VT323,
            boundsAlignV: 'middle',
            boundsAlignH: 'middle',
            fill: '#FF0000'
        });
        this.game.sound.play(Assets.Audio.AudioSimInvadersTitle.getName(), 0.5, true);
    }

    public update() {
        if ((this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) ||
            this.game.input.gamepad.pad1.isDown(Phaser.Gamepad.XBOX360_A)) && Date.now() > this.debounceTime
        ) {
            this.game.state.start('simInvaders');
        }
        if ((
                this.game.input.keyboard.isDown(Phaser.Keyboard.ESC) ||
                this.game.input.gamepad.pad1.isDown(Phaser.Gamepad.XBOX360_B) ||
                this.game.input.gamepad.pad1.isDown(Phaser.Gamepad.XBOX360_BACK)
            ) && Date.now() > this.debounceTime) {
            this.game.state.start('title');
        }
        if ((
            this.game.input.keyboard.isDown(Phaser.Keyboard.S)  ||
            this.game.input.gamepad.pad1.isDown(Phaser.Gamepad.XBOX360_X)) && Date.now() > this.debounceTime
        ) {
            this.game.state.start('simInvadersScoreboard');
        }
    }

    public shutdown() {
        this.game.sound.stopAll()
    }
}