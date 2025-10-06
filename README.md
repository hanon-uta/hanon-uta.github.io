<div align="right">
  <p>
    <a href="README.md"><img src="https://img.shields.io/badge/日本語-🇯🇵-red?style=flat-square" alt="Japanese"></a>
    <a href="README_zh-CN.md"><img src="https://img.shields.io/badge/简体中文-🇨🇳-brightgreen?style=flat-square" alt="Chinese"></a>
  </p>
</div>

# 香鳴ハノン 歌枠アーカイブ

香鳴ハノンさん、暁月クララさん、鎖乙女がぶさんの3名のVTuberによるYouTube歌枠配信動画の検索ツールです。楽曲検索、お気に入り登録、統計表示などの機能を備え、ファンが聴きたい曲を素早く見つけるお手伝いをします。

## 特徴

- **複数VTuber対応**: 香鳴ハノンさんに加え、暁月クララさん、鎖乙女がぶさんの歌枠アーカイブを追加。新規コンテンツも随時追加中
- **精密検索**: 対象VTuberを選択後、曲名またはアーティスト名を入力すると即時に検索結果を表示。一致する名称の候補も表示
- **時間位置表示**: 各楽曲の動画内開始時間（分:秒）を正確に表示。手動でのシーク操作が不要
- **ワンクリック再生**: 検索結果をクリックすると、YouTubeの該当動画が指定時間から再生
- **楽曲お気に入り**: ログイン不要でハートアイコンからお気に入り登録可能（データは端末内に保存）。Googleアカウントでログインすると複数端末で同期
- **再生回数統計**: VTuber別の楽曲歌唱回数グラフを表示。よく歌われる曲が一目でわかる
- **動画内フィルタ**: 動画名をクリックすると、その配信内の全楽曲を素早くフィルタリング

## 開発のきっかけ

ある日、ハノンちゃんが歌った「ロマンスの神様」を聴きたくなりましたが、どの配信で歌ったか思い出せず、アーカイブを探すのに長時間かかってしまい。この経験から、すべてのファンが楽曲探しに時間を浪費しないよう、このツールの開発を思い立ちました。その後、要望に応じて暁月クララさん、鎖乙女がぶさんのデータを追加し、お気に入りや統計機能なども実装し、より実用的なツールへと進化させました。

## 機能説明

### 1. 歌枠動画コレクション
3名のVTuberのYouTube歌枠配信履歴を可能な限り網羅的に収録。作者の時間が許す限り手動で更新し、比較的新しい歌枠コンテンツもカバー。ファンが過去の歌唱を振り返れるよう配慮。

### 2. 精密検索システム
- 操作フロー: 画面上部で対象VTuber（香鳴ハノンさん/暁月クララさん/鎖乙女がぶさん）を選択後、検索ボックスに曲名またはアーティスト名を入力。入力途中から即時に検索結果を反映し、一致する楽曲/アーティスト名の候補を表示
- 検索結果は該当VTuberの可能な限り収集したアーカイブ内容をカバー。時間制限なし
- 各楽曲には動画内の正確な開始時間（分:秒）を記載。進捗バーの繰り返し操作が不要

### 3. シームレス再生体験
任意の楽曲項目をクリックすると、対応するYouTube動画が新しいタブで開き、その楽曲の開始時間点から自動再生。追加操作は不要。

### 4. 楽曲お気に入りと同期
- 気に入った楽曲を見つけたら、横のハートアイコンをクリックするだけでお気に入り登録。アカウントログインは不要（お気に入り内容は現在の端末にのみ保存）
- Googleアカウントでログインすると、お気に入り内容の複数端末同期が可能。同一アカウントでスマートフォン、PCのどちらからログインしても同じ内容を確認可能

### 5. 楽曲歌唱回数統計
VTuber別に「楽曲歌唱回数」グラフを個別生成。視覚的に各楽曲の歌唱回数を表示。そのVTuberがよく歌う楽曲の傾向を素早く把握可能。

### 6. 動画内楽曲フィルタリング
検索結果または歌枠リスト内で、任意の動画名をクリックすると、ページが自動的にその動画内の全楽曲をフィルタリングし、独立したリストを形成。単独の歌枠配信の全楽曲を完全に振り返るのに便利。

## オンラインデモ

プロジェクトはGitHub Pagesにデプロイ済み。インストール不要ですぐに利用可能。最新機能（お気に入り、統計、フィルタ）も同期して公開中：  
→ 新URL: [https://hanon-uta.github.io](https://hanon-uta.github.io)  
→ 旧URL: [https://kevinstrax.github.io/hanon-uta](https://kevinstrax.github.io/hanon-uta)（リダイレクト設定済み。アクセス後自動的に新URLへ転送）

## 旧版情報

現在閲覧中のページは新リポジトリに移行したバージョンです。旧リポジトリのREADMEは以下で閲覧可能です：
- 日本語: [https://github.com/kevinstrax/hanon-uta/blob/main/README.md](https://github.com/kevinstrax/hanon-uta/blob/main/README.md)
- 中文: [https://github.com/kevinstrax/hanon-uta/blob/main/README_zh-CN.md](https://github.com/kevinstrax/hanon-uta/blob/main/README_zh-CN.md)

## 技術スタック

- フロントエンド: Vue 3 + Vite
- デプロイ: GitHub Pages
- UIフレームワーク: Bootstrap 5.3.8
- 認証サービス: Google OAuth2
- AIコード生成: [DeepSeek Chat](https://www.deepseek.com)（コアコード及び以降の機能迭代の大部分をAI補助開発で実現。作者はバックエンド/サーバーサイド開発が主で、フロントエンド経験は限定的）

## 使い方

1. オンラインアドレス（新URLまたは旧URL、旧URLは自動転送）にアクセスし、画面上部で確認したいVTuber（香鳴ハノンさん/暁月クララさん/鎖乙女がぶさん）を選択。
2. 検索ボックスに対象の曲名またはアーティスト名を入力。入力途中から自動的に検索結果を反映し、一致する名称の候補を表示。
3. 結果から聴きたい楽曲を見つけ、項目をクリックするとYouTubeの対応時間点から再生。
4. 楽曲お気に入り: 楽曲横のハートアイコンをクリック。ログイン不要で保存可能。Googleアカウントでログインすると複数端末同期。
5. 統計確認: VTuber選択画面で「歌曲統計」をクリックし、歌唱回数グラフを表示。
6. 動画内楽曲フィルタ: 任意の動画名をクリックし、ページが自動的にその動画内の全楽曲を表示。

## ローカル実行（参考用）

インストール不要でオンライン版を利用可能。コードに興味がありローカル実行したい場合：
```bash
git clone https://github.com/hanon-uta/hanon-uta.github.io.git

cd hanon-uta

pnpm install
pnpm run dev
```
## 謝辞

本プロジェクトのデータは、以下のYouTubeユーザー様が投稿した歌枠のタイムスタンプ情報（香鳴ハノンさん、暁月クララさん、鎖乙女がぶさんの3名のVTuberの歌枠コンテンツを含む）を参考にさせていただきました：  
[@tk-taks1984](https://www.youtube.com/@tk-taks1984) 様、[@timestamp-nog](https://www.youtube.com/@timestamp-nog) 様、[@haruto-nog](https://www.youtube.com/@haruto-nog) 様、[@野上ハルト](https://www.youtube.com/@野上ハルト) 様、[@harut0_nog](https://www.youtube.com/@harut0_nog) 様、[@SaySay009](https://www.youtube.com/@SaySay009) 様、[@tomfukuとむふく](https://www.youtube.com/@tomfukutomofuku) 様、[@コイケン_koiken](https://www.youtube.com/@koiken_koiken) 様、[@remilia.s](https://www.youtube.com/@remilia.s) 様、[@ぽテさら](https://www.youtube.com/@potesara) 様、[@はこぴぴぴ](https://www.youtube.com/@hakopipipi) 様、[@Cyaegha](https://www.youtube.com/@Cyaegha) 様、[@PP-dy5nd](https://www.youtube.com/@PP-dy5nd) 様、[@hiyokoalex4074](https://www.youtube.com/@hiyokoalex4074) 様、[@atamorumoru](https://www.youtube.com/@atamorumoru) 様、[@とっきー-ycilysm](https://www.youtube.com/@tokki-ycilysm) 様、[@ke-suke_39](https://www.youtube.com/@ke-suke_39) 様、[@futianx1360](https://www.youtube.com/@futianx1360) 様、[@せきね-f7u](https://www.youtube.com/@sekine-f7u) 様、[@higeiwashi](https://www.youtube.com/@higeiwashi) 様、[@HorineSu](https://www.youtube.com/@HorineSu) 様、[@exl5eq28](https://www.youtube.com/@exl5eq28) 様

新規追加の暁月クララさん、鎖乙女がぶさん関連データについても、他のファンが自主的に整理したタイムスタンプ情報を補足参考にしました。これらの貴重なファン貢献がなければ、本プロジェクトはこれほど多くの歌枠コンテンツをカバーできませんでした。全ての貢献者に心より感謝申し上げます。

## 注意事項

- 本アプリケーションはファン自主制作の非公式ツールであり、香鳴ハノンさん、暁月クララさん、鎖乙女がぶさん及び所属団体とは一切関係ありません
- 全ての動画権利は原作者及びYouTubeプラットフォームに帰属し、本プロジェクトは索引サービスのみ提供。動画コンテンツ自体は一切保存しません
- データはユーザー投稿によるもので、可能な限り正確性を確認していますが、絶対的な保証は行いません
- データ誤り、機能問題の発見、または要望提案がある場合は、GitHub Issuesで報告を提出してください

## データ更新について

データは作者の時間が許す限り手動で更新。3名のVTuberの新規歌枠アーカイブと統計データをカバー。特定の歌枠収録リクエスト、誤りフィードバック、または新機能提案がある場合は、GitHub Issuesを通じて提出可能。

## 連絡先

問題報告や機能提案：
- GitHub Issues: [https://github.com/kevinstrax/hanon-uta/issues](https://github.com/kevinstrax/hanon-uta/issues)
- X(旧Twitter): [@dtkviolin](https://x.com/dtkviolin)

各VTuber公式アカウント：
- 香鳴ハノンさん: [YouTubeチャンネル](https://www.youtube.com/@kanaruhanon) | [Twitter](https://x.com/kanaruhanon)
- 暁月クララさん: [YouTubeチャンネル](https://www.youtube.com/@akatsukiclara) | [X(旧Twitter)](https://x.com/akatsukiclara)
- 鎖乙女がぶさん: [YouTubeチャンネル](https://www.youtube.com/@saotomegabu) | [X(旧Twitter)](https://x.com/saotomegabu)