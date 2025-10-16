// src/types/song.d.ts
export interface Song {
    video_title: string;
    video_author: string;
    video_url: string;
    video_thumbnail_url: string;
    video_thumbnail_lqip_url: string;
    video_publish_date_ts: number;
    video_publish_date: string;
    video_id: string;
    video_offset_ts: number,
    song_id: string,
    song_title: string,
    song_origin_artist: string,
    song_start_time: string,
    tags: string[],
}