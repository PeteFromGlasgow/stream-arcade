import * as Assets from '../../assets';
import Player from './models/player';
import BlockGroup from './models/blockGroup';

const WORLD_BOUNDS_X = 0;
const WORLD_BOUNDS_Y = 0;
const WORLD_SPAWN_PADDING_HORIZONTAL = 0.3;
const WORLD_SPAWN_PADDING_TOP = 0.1;
const WORLD_SPAWN_PADDING_BOTTOM = 0.4;
const BLOCK_COUNT = 20;
const BLOCK_SPACING = 300;

export default class FlappyScrangle extends Phaser.State {

	private scoreText: Phaser.Text = null;
	private player: Player = null;
	private enemyBlockGroup: Phaser.Group = null;
	private blockCount: number = 0;
	private score: number = 0;

	public create(): void {
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.world.setBounds(WORLD_BOUNDS_X, WORLD_BOUNDS_Y, this.game.width, this.game.height);

		    
		this.player = new Player(this.game,60,200);
		this.enemyBlockGroup = new BlockGroup(this.game);
		this.scoreText = this.game.add.text(this.world.width - 100, 10, 'Score 0', {
			font: '18px ' + Assets.GoogleWebFonts.VT323,
			boundsAlignV: 'middle',
			boundsAlignH: 'middle',
			fill: '#FFFFFF'
		});
		
		this.generateLevel();
	}

	generateLevel() {
        
		const rightBounds = ((this.game.world.width + 100) * (1 - WORLD_SPAWN_PADDING_HORIZONTAL));
		const leftBounds = this.game.world.width * WORLD_SPAWN_PADDING_HORIZONTAL;
		const topBounds = this.game.world.height * WORLD_SPAWN_PADDING_TOP;
		const bottomBounds = this.game.world.height * (1 - WORLD_SPAWN_PADDING_BOTTOM);
		const spawnSpaceWidth = rightBounds - leftBounds;
		const spawnSpaceHeight = bottomBounds - topBounds;
		
		while(this.blockCount < BLOCK_COUNT){
			
			let topBrick = new Phaser.Sprite(this.game, (200 +(this.blockCount * BLOCK_SPACING) ),-10,Assets.Images.SpritesheetsSquirrel.getName(), 0);
			topBrick.scale.setTo(1,(12 * Math.random()));

			let bottomBrick = new Phaser.Sprite(this.game, (200 +(this.blockCount * BLOCK_SPACING) ),topBrick.bottom + 80,Assets.Images.SpritesheetsSquirrel.getName(), 0);

			bottomBrick.scale.setTo(1,((bottomBounds - (topBrick.bottom-80))/16));
			
			this.enemyBlockGroup.add(topBrick);
			this.enemyBlockGroup.add(bottomBrick);
			
			this.blockCount++;
		}
		
	
	
	}

	public update() {

		this.player.update();
		this.checkBlocks();
	}
	checkBlocks() {

	}

}
