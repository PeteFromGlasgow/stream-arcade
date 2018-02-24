import * as Assets from '../../assets';
import Player from './models/player';
import Block from './models/block';
import BlockGroup from './models/blockGroup';

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
	private player: Player = null;
	private blocks: Phaser.Group = null;
	private blockCount: number = 0;
	private score: number = 0;
	private timer: Phaser.TimerEvent;
	private colours: number[][] = [[255, 0, 0],[226, 87, 30],[255, 127, 0],[255, 255, 0],[ 0, 255, 0],[150, 191, 51],[0, 0, 255],[75, 0, 130],[139, 0, 255],[255, 255, 255]];
	
	public create(): void {
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.world.setBounds(WORLD_BOUNDS_X, WORLD_BOUNDS_Y, this.game.width, this.game.height);

		    
		this.player = new Player(this.game,300,200);
		this.blocks = new BlockGroup(this.game);
		this.scoreText = this.game.add.text(this.world.width - 100, 10, 'Score: 0', {
			font: '18px ' + Assets.GoogleWebFonts.VT323,
			boundsAlignV: 'middle',
			boundsAlignH: 'middle',
			fill: '#FFFFFF'
		});
		this.stage.backgroundColor = '#99FFFF';
		this.timer = this.time.events.loop(1500, this.makeBlockPair, this); 
	}

	RGBtoHEX(r,g,b) {
		return r << 16 | g << 8 | b;
	}
	makeBlock(x,y, colour) {

		let block = new Block(this.game, x,y);
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
			
			var hole = Math.floor(Math.random() * 11) + 2;


			for (var i = 0; i < 15; i++){
				if (i != hole && i != hole + 1){ 
					this.makeBlock(800, i * 32 + 10,colour);
				}
			}  
		this.score++;
	}
	hitBlock() {
    	if (this.player.alive == false){
			return;
		}

    // Set the alive property of the bird to false
    this.player.alive = false;
    this.time.events.remove(this.timer);
    this.blocks.forEach(function(p){
        	p.body.velocity.x = 0;
    	}, this);
	}
	public update() {
		
		this.player.update();
		this.physics.arcade.overlap(
			this.player, this.blocks, this.hitBlock, null, this);  
		this.scoreText.text = "Score: " + this.score;
	}

}
