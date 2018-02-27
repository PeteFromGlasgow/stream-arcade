/* AUTO GENERATED FILE. DO NOT MODIFY. YOU WILL LOSE YOUR CHANGES ON BUILD. */

export namespace Images {
    export class ImagesBackgroundTemplate {
        static getName(): string { return 'background_template'; }

        static getPNG(): string { return require('assets/images/background_template.png'); }
    }
    export class ImagesFreebsd {
        static getName(): string { return 'freebsd'; }

        static getPNG(): string { return require('assets/images/freebsd.png'); }
    }
    export class ImagesSquare {
        static getName(): string { return 'square'; }

        static getPNG(): string { return require('assets/images/square.png'); }
    }
    export class ImagesTitleText {
        static getName(): string { return 'title_text'; }

        static getPNG(): string { return require('assets/images/title_text.png'); }
    }
    export class ImagesWhiteBlockBorderedBottom {
        static getName(): string { return 'white_block_bordered_bottom'; }

        static getPNG(): string { return require('assets/images/white_block_bordered_bottom.png'); }
    }
    export class ImagesWhiteBlockBorderedMiddle {
        static getName(): string { return 'white_block_bordered_middle'; }

        static getPNG(): string { return require('assets/images/white_block_bordered_middle.png'); }
    }
    export class ImagesWhiteBlockBorderedTop {
        static getName(): string { return 'white_block_bordered_top'; }

        static getPNG(): string { return require('assets/images/white_block_bordered_top.png'); }
    }
    export class SpritesheetsSquirrel {
        static getName(): string { return 'squirrel'; }

        static getPNG(): string { return require('assets/spritesheets/squirrel.png'); }
    }
}

export namespace Spritesheets {
    export class SpritesheetsMetalslugMummy374518 {
        static getName(): string { return 'metalslug_mummy.[37,45,18,0,0]'; }

        static getPNG(): string { return require('assets/spritesheets/metalslug_mummy.[37,45,18,0,0].png'); }
        static getFrameWidth(): number { return 37; }
        static getFrameHeight(): number { return 45; }
        static getFrameMax(): number { return 18; }
        static getMargin(): number { return 0; }
        static getSpacing(): number { return 0; }
    }
    export class SpritesheetsPlayerBullet3232 {
        static getName(): string { return 'PlayerBullet.[32,32,0,0,0]'; }

        static getPNG(): string { return require('assets/spritesheets/PlayerBullet.[32,32,0,0,0].png'); }
        static getFrameWidth(): number { return 32; }
        static getFrameHeight(): number { return 32; }
        static getFrameMax(): number { return 0; }
        static getMargin(): number { return 0; }
        static getSpacing(): number { return 0; }
    }
    export class SpritesheetsShip3232 {
        static getName(): string { return 'ship.[32,32,0,0,0]'; }

        static getPNG(): string { return require('assets/spritesheets/ship.[32,32,0,0,0].png'); }
        static getFrameWidth(): number { return 32; }
        static getFrameHeight(): number { return 32; }
        static getFrameMax(): number { return 0; }
        static getMargin(): number { return 0; }
        static getSpacing(): number { return 0; }
    }
    export class SpritesheetsSimInvaders800600 {
        static getName(): string { return 'sim_invaders.[800,600,0,0,0]'; }

        static getPNG(): string { return require('assets/spritesheets/sim_invaders.[800,600,0,0,0].png'); }
        static getFrameWidth(): number { return 800; }
        static getFrameHeight(): number { return 600; }
        static getFrameMax(): number { return 0; }
        static getMargin(): number { return 0; }
        static getSpacing(): number { return 0; }
    }
    export class SpritesheetsSim646472 {
        static getName(): string { return 'sim.[64,64,72,0,0]'; }

        static getPNG(): string { return require('assets/spritesheets/sim.[64,64,72,0,0].png'); }
        static getFrameWidth(): number { return 64; }
        static getFrameHeight(): number { return 64; }
        static getFrameMax(): number { return 72; }
        static getMargin(): number { return 0; }
        static getSpacing(): number { return 0; }
    }
    export class SpritesheetsSimbullet884 {
        static getName(): string { return 'simbullet.[8,8,4,0,0]'; }

        static getPNG(): string { return require('assets/spritesheets/simbullet.[8,8,4,0,0].png'); }
        static getFrameWidth(): number { return 8; }
        static getFrameHeight(): number { return 8; }
        static getFrameMax(): number { return 4; }
        static getMargin(): number { return 0; }
        static getSpacing(): number { return 0; }
    }
    export class SpritesheetsSpritesheet64648 {
        static getName(): string { return 'spritesheet.[64,64,8,0,0]'; }

        static getPNG(): string { return require('assets/spritesheets/spritesheet.[64,64,8,0,0].png'); }
        static getFrameWidth(): number { return 64; }
        static getFrameHeight(): number { return 64; }
        static getFrameMax(): number { return 8; }
        static getMargin(): number { return 0; }
        static getSpacing(): number { return 0; }
    }
}

export namespace Atlases {
    enum AtlasesPreloadSpritesArrayFrames {
        PreloadBar = <any>'preload_bar.png',
        PreloadFrame = <any>'preload_frame.png',
    }
    export class AtlasesPreloadSpritesArray {
        static getName(): string { return 'preload_sprites_array'; }

        static getJSONArray(): string { return require('assets/atlases/preload_sprites_array.json'); }

        static getPNG(): string { return require('assets/atlases/preload_sprites_array.png'); }

        static Frames = AtlasesPreloadSpritesArrayFrames;
    }
    enum AtlasesPreloadSpritesHashFrames {
        PreloadBar = <any>'preload_bar.png',
        PreloadFrame = <any>'preload_frame.png',
    }
    export class AtlasesPreloadSpritesHash {
        static getName(): string { return 'preload_sprites_hash'; }

        static getJSONHash(): string { return require('assets/atlases/preload_sprites_hash.json'); }

        static getPNG(): string { return require('assets/atlases/preload_sprites_hash.png'); }

        static Frames = AtlasesPreloadSpritesHashFrames;
    }
    enum AtlasesPreloadSpritesXmlFrames {
        PreloadBar = <any>'preload_bar.png',
        PreloadFrame = <any>'preload_frame.png',
    }
    export class AtlasesPreloadSpritesXml {
        static getName(): string { return 'preload_sprites_xml'; }

        static getPNG(): string { return require('assets/atlases/preload_sprites_xml.png'); }

        static getXML(): string { return require('assets/atlases/preload_sprites_xml.xml'); }

        static Frames = AtlasesPreloadSpritesXmlFrames;
    }
}

export namespace Audio {
    export class AudioMusic {
        static getName(): string { return 'music'; }

        static getMP3(): string { return require('assets/audio/music.mp3'); }
    }
    export class AudioSimInvadersGame {
        static getName(): string { return 'SimInvadersGame'; }

        static getMP3(): string { return require('assets/audio/SimInvadersGame.mp3'); }
    }
    export class AudioSimInvadersTitle {
        static getName(): string { return 'SimInvadersTitle'; }

        static getWAV(): string { return require('assets/audio/SimInvadersTitle.wav'); }
    }
    export class AudioStreamArcadeFull {
        static getName(): string { return 'StreamArcadeFull'; }

        static getMP3(): string { return require('assets/audio/StreamArcadeFull.mp3'); }
    }
}

export namespace Audiosprites {
    enum AudiospritesSfxSprites {
        Laser1 = <any>'laser1',
        Laser2 = <any>'laser2',
        Laser3 = <any>'laser3',
        Laser4 = <any>'laser4',
        Laser5 = <any>'laser5',
        Laser6 = <any>'laser6',
        Laser7 = <any>'laser7',
        Laser8 = <any>'laser8',
        Laser9 = <any>'laser9',
    }
    export class AudiospritesSfx {
        static getName(): string { return 'sfx'; }

        static getAC3(): string { return require('assets/audiosprites/sfx.ac3'); }
        static getJSON(): string { return require('assets/audiosprites/sfx.json'); }
        static getM4A(): string { return require('assets/audiosprites/sfx.m4a'); }
        static getMP3(): string { return require('assets/audiosprites/sfx.mp3'); }
        static getOGG(): string { return require('assets/audiosprites/sfx.ogg'); }

        static Sprites = AudiospritesSfxSprites;
    }
}

export namespace GoogleWebFonts {
    export const VT323: string = 'VT323';
}

export namespace CustomWebFonts {
    export class Fonts2DumbWebfont {
        static getName(): string { return '2Dumb-webfont'; }

        static getFamily(): string { return '2dumbregular'; }

        static getCSS(): string { return require('!file-loader?name=assets/fonts/[name].[ext]!assets/fonts/2Dumb-webfont.css'); }
        static getEOT(): string { return require('!file-loader?name=assets/fonts/[name].[ext]!assets/fonts/2Dumb-webfont.eot'); }
        static getSVG(): string { return require('!file-loader?name=assets/fonts/[name].[ext]!assets/fonts/2Dumb-webfont.svg'); }
        static getTTF(): string { return require('!file-loader?name=assets/fonts/[name].[ext]!assets/fonts/2Dumb-webfont.ttf'); }
        static getWOFF(): string { return require('!file-loader?name=assets/fonts/[name].[ext]!assets/fonts/2Dumb-webfont.woff'); }
    }
}

export namespace BitmapFonts {
    export class FontsFontFnt {
        static getName(): string { return 'font_fnt'; }

        static getFNT(): string { return require('assets/fonts/font_fnt.fnt'); }
        static getPNG(): string { return require('assets/fonts/font_fnt.png'); }
    }
    export class FontsFontXml {
        static getName(): string { return 'font_xml'; }

        static getPNG(): string { return require('assets/fonts/font_xml.png'); }
        static getXML(): string { return require('assets/fonts/font_xml.xml'); }
    }
}

export namespace JSON {
    class IExistSoTypeScriptWillNotComplainAboutAnEmptyNamespace {}
}

export namespace XML {
    class IExistSoTypeScriptWillNotComplainAboutAnEmptyNamespace {}
}

export namespace Text {
    class IExistSoTypeScriptWillNotComplainAboutAnEmptyNamespace {}
}

export namespace Scripts {
    export class ScriptsBlurX {
        static getName(): string { return 'BlurX'; }

        static getJS(): string { return require('assets/scripts/BlurX.js'); }
    }
    export class ScriptsBlurY {
        static getName(): string { return 'BlurY'; }

        static getJS(): string { return require('assets/scripts/BlurY.js'); }
    }
}
export namespace Shaders {
    export class ShadersBacteria {
        static getName(): string { return 'bacteria'; }

        static getFRAG(): string { return require('assets/shaders/bacteria.frag'); }
    }
    export class ShadersPixelate {
        static getName(): string { return 'pixelate'; }

        static getFRAG(): string { return require('assets/shaders/pixelate.frag'); }
    }
    export class ShadersWave {
        static getName(): string { return 'wave'; }

        static getFRAG(): string { return require('assets/shaders/wave.frag'); }
    }
}
export namespace Misc {
    export class SpritesheetsShip374518 {
        static getName(): string { return 'ship.[37,45,18,0,0]'; }

        static getFile(): string { return require('assets/spritesheets/ship.[37,45,18,0,0].png~'); }
    }
}
