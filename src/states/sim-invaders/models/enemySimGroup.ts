import * as Assets from '../../../assets';
import {Sim} from './sim';

enum MovementStage {
    Down = 0,
    Left = 1,
    Right = 2
}

export const MOVEMENT_CHANGE_THRESHOLD_VERTICAL = 50;
export const MOVEMENT_CHANGE_THRESHOLD_HORIZONTAL = 300;
const MOVEMENT_SPEED = 0.5;

/**
 * This class exists to provide syncronised movement to the
 * enemy SIMs
 */
export class EnemySimGroup extends Phaser.Group {
    private updateStage: number = 0;
    private movementCounter: number = 0;
    private movementOrder = [MovementStage.Down, MovementStage.Left, MovementStage.Down, MovementStage.Right];

    constructor(game: Phaser.Game) {
        super(game);
        this.game = game;
        this.enableBody = true;
        game.add.existing(this);
    }

    private performMovement(sim: Sim) {
        if (this.movementOrder[this.updateStage] === MovementStage.Down) {
            sim.position.add(0, MOVEMENT_SPEED);
        }

        if (this.movementOrder[this.updateStage] === MovementStage.Left) {
            sim.position.add(-MOVEMENT_SPEED, 0);
        }

        if (this.movementOrder[this.updateStage] === MovementStage.Right) {
            sim.position.add(MOVEMENT_SPEED, 0);
        }

        this.movementCounter += MOVEMENT_SPEED;
        if (this.movementCounter > MOVEMENT_CHANGE_THRESHOLD_VERTICAL && this.movementOrder[this.updateStage] === MovementStage.Down) {
            this.updateStage = (this.updateStage + 1) % this.movementOrder.length;
            this.movementCounter = 0;
        } else if (this.movementCounter > MOVEMENT_CHANGE_THRESHOLD_HORIZONTAL && (this.movementOrder[this.updateStage] === MovementStage.Left || this.movementOrder[this.updateStage] === MovementStage.Right)) {
            this.updateStage = (this.updateStage + 1) % this.movementOrder.length;
            this.movementCounter = 0;
        }
    }

    update() {
        this.forEach(sim => this.performMovement(sim), this);
    }
}