import * as Assets from '../../assets';
import Player from './models/player';
import Block from './models/block';
import BlockGroup from './models/blockGroup';
import { Sprite } from 'phaser-ce';

const WORLD_BOUNDS_X = 0;
const WORLD_BOUNDS_Y = 0;
const WORLD_SPAWN_PADDING_HORIZONTAL = 0;
const WORLD_SPAWN_PADDING_TOP = 0.1;
const WORLD_SPAWN_PADDING_BOTTOM = 0.4;
const BLOCK_COUNT = 20;
const BLOCK_SPACING = 300;
const MAX_COLOURS = 200;

export default class FlappyScrangle extends Phaser.State {

	private scoreText: Phaser.Text = null;
	private quitText: Phaser.Text = null;
	private player: Player = null;
	private blocks: Phaser.Group = null;
	private blockCount: number = 0;
	private score: number = 0;
	private timer: Phaser.TimerEvent;
	private background: Phaser.Sprite;
	private scanlineFilter: Phaser.Filter;

	private colours: number[][] = [[255, 0, 0],[226, 87, 30],[255, 127, 0],[255, 255, 0],[ 0, 255, 0],[150, 191, 51],[0, 0, 255],[75, 0, 130],[139, 0, 255],[255, 255, 255]];
	
	public create(): void {

		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.world.setBounds(WORLD_BOUNDS_X, WORLD_BOUNDS_Y, this.game.width, this.game.height);

		this.background = new Phaser.Sprite(this.game,0,0);
		
		this.background.width = 1920;
		this.background.height = 1080;
		this.game.add.existing(this.background);

		this.player = new Player(this.game,300,200);
		this.blocks = new BlockGroup(this.game);
		this.quitText = this.game.add.text(this.world.centerX + 700, 10, 'Esc to Quit', {
			font: '40px ' + Assets.GoogleWebFonts.VT323,
			boundsAlignV: 'middle',
			boundsAlignH: 'middle',
			fill: '#FFFFFF'
		});
		this.scoreText = this.game.add.text(this.world.centerX - 50, 10, 'Score: 0', {
			font: '40px ' + Assets.GoogleWebFonts.VT323,
			boundsAlignV: 'middle',
			boundsAlignH: 'middle',
			fill: '#FFFFFF'
		});

		// this.stage.backgroundColor = '#99FFFF';
		this.stage.backgroundColor = '#269900';
		this.timer = this.time.events.loop(2500, this.makeBlockPair, this); 
		// new Phaser.Filter(this.game, null, this.game.cache.getShader(Assets.Shaders.ShadersPixelate.getName()));

        this.scanlineFilter =  new Phaser.Filter(this.game, null, this.game.cache.getShader(Assets.Shaders.ShadersWave.getName()));
		this.background.filters = [this.scanlineFilter];
		this.game.sound.play(Assets.Audio.AudioFlappygame.getName(),1.3,true);
	}

	RGBtoHEX(r,g,b) {
		return r << 16 | g << 8 | b;
	}

	makeBlock(x,y, colour, index) {

		let block = new Block(this.game, x,y, index,-300);
		block.tint = colour;
		this.blocks.add(block);
		this.blockCount++;
	}

	makeBlockPair() {

		const rightBounds = (this.world.width * (1 - WORLD_SPAWN_PADDING_HORIZONTAL));
        const leftBounds = this.world.width * WORLD_SPAWN_PADDING_HORIZONTAL;
        const topBounds = this.world.height * WORLD_SPAWN_PADDING_TOP;
		const bottomBounds = this.world.height * (1 - WORLD_SPAWN_PADDING_BOTTOM);

		let colour = this.RGBtoHEX(this.colours[this.blockCount%this.colours.length][0],
			this.colours[this.blockCount%this.colours.length][1],
			this.colours[this.blockCount%this.colours.length][2]);
			
			var hole = Math.floor(Math.random() * 25) + 2;

			let index = 3;

			for (var i = 0; i < 42; i++){
				

				if (i != hole && i != hole + 1 && i != hole +2 && i != hole +3 && i != hole +4 && i != hole +5){ 
					if(i == hole -1){
						index = 1;
					}
					else if(i == hole + 6){
						index =0;
					}
					else{
						index = 2;
					}
					this.makeBlock(1890, i * 32,colour,index);
				}
			}  
		this.score++;
	}

	hitBlock() {
    	if (this.player.alive == false){
			return;
		}
    	this.player.alive = false;
    	this.time.events.remove(this.timer);
    	this.blocks.forEach(function(p){
        	p.body.velocity.x = 0;
		}, this);
	}

	public update() {
    	if ( ! this.player.alive) {
			this.game.state.start('flappyScrangle');
			this.game.state.start('flappyNameInput', true, false, this.score);
			this.game.sound.play(Assets.Audio.AudioGameover.getName(),0.3, false);
			this.score = 0;
			this.blockCount = 0;
		}

		if( this.game.input.keyboard.isDown(Phaser.Keyboard.ESC)){
			this.game.state.start('flappyTitle');
		}

		this.scanlineFilter.update();
		this.player.update();
		this.physics.arcade.overlap(
		this.player, this.blocks, this.hitBlock, null, this); 

			if(this.player.alive == false){
				this.time.events.remove(this.timer);
				this.blocks.forEach(function(p){
					p.body.velocity.x = 0;
				}, this);
			}
		
		this.scoreText.text = "Score: " + this.score;
	}

}
