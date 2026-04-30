// src/config/constants.ts
export const DEFAULT_PAGE_SIZE: number = 10;

export const SITE_BRAND : string = '香鳴ハノン';
export const SITE_SUFFIX : string = 'チャンネル歌枠検索（非公式）';
export const SITE_DESC : string = 'さんの過去の歌枠から、ライブ配信内の楽曲を瞬時に検索。' +
    '曲名やアーティスト名を入力するだけで、該当箇所にワンクリックで移動できる非公式ツール。';

export const VTUBERS  = {

    SAOTOME_GABU: {
        name: 'Gabu',
        name_ja: '鎖乙女がぶ',
        mark: '🐺🩰',
        favicon: '/favicon2.png',
        uri: '/saotomegabu',
        cover: 'https://img.youtube.com/vi/nMmWVciVOgk/maxresdefault.jpg',
        color: '#be7cf0',
    },
    KANARU_HANON: {
        name: 'Hanon',
        name_ja: '香鳴ハノン',
        mark: '🎀🎶',
        favicon: '/favicon.png',
        uri: '/',
        cover: 'https://img.youtube.com/vi/V8gg1yrTzsw/maxresdefault.jpg',
        color: '#3eaed8',
    },
    AKATSUKI_CLARA: {
        name: 'Clara',
        name_ja: '暁月クララ',
        mark: '🎠💛',
        favicon: '/favicon3.png',
        uri: '/akatsukiclara',
        cover: 'https://img.youtube.com/vi/iavuOMwYjpg/maxresdefault.jpg',
        color: '#e07008',
    },
    TOKIWA_KANAME: {
        name: 'Kaname',
        name_ja: '常磐カナメ',
        mark: '🌺🌸',
        favicon: '/kaname.jpg',
        uri: '/tokiwakaname',
        cover: 'https://img.youtube.com/vi/xqNkizTgB-E/maxresdefault.jpg',
        color: '#02a836',
    },

} as const;

type Vtubers = typeof VTUBERS;
export type VtuberKeys = keyof Vtubers; // "KANARU_HANON" | "SAOTOME_GABU" | ...
export type VtuberValues = Vtubers[VtuberKeys]['name']; // "hanon" | "Gabu" | "Clara"

export const VTUBER_KEYS: string[] = Object.entries(VTUBERS).map(([key, _]) => key)
export const VTUBER_URIS: string[] = Object.entries(VTUBERS).map(([_, value]) => value.uri)

export const VTUBER_NAME_TO_JA: Record<VtuberValues, string> = Object.values(VTUBERS).reduce((acc, vtuber) => {
    acc[vtuber.name as VtuberValues] = vtuber.name_ja;
    return acc;
}, {} as Record<VtuberValues, string>);


