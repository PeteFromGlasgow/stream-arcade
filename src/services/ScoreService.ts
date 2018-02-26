
import * as request from 'superagent';
import * as jsSha from 'jssha'
interface UserInfo {
    id: string;
    name: string;
    secret: string;
}

const USER_INFO_KEY = 'userinfo';
const API_URI = 'http://peterkinnaird.eu:3000/'

export enum Games {
    FlappyScrangle = 1,
    SimInvaders = 2
}

export class ScoreService {
    private userInfo: UserInfo | null;
    private userCreated: boolean = true;

    constructor() {
        let userInfoString = window.localStorage.getItem(USER_INFO_KEY);
        if (!userInfoString) {
            this.userCreated = false;
        }

        this.userInfo = JSON.parse(userInfoString);
    }

    isUserCreated() {
        return this.userCreated;
    }

    private getSignature(score: number) {
        let sha = new jsSha('SHA-512', 'TEXT');
        sha.setHMACKey(this.userInfo.secret, 'HEX');
        sha.update(score + '');
        return sha.getHMAC('HEX');
    }

    async addScore(game: Games, score: number) {
        let signature = this.getSignature(score);

        let scoreResult = await request
            .post(API_URI + `users/${this.userInfo.id}/games/${game}/score`)
            .send({
                score,
                signature
            });
        return scoreResult.body;
    }

    async getScores(game: Games) {
        let scoreResult = await request
            .get(API_URI + `games/${game}/scores`)

        return scoreResult.body;
    }

    async createUser(name: string) {
        let user = await request
            .post(API_URI + 'users')
            .send({ name });

        window.localStorage.setItem(USER_INFO_KEY, JSON.stringify(user.body));
        this.userCreated = true;
        this.userInfo = user.body;
        return this.userInfo;
    }
}