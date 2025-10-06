<div align="right">
  <p>
    <a href="README.md"><img src="https://img.shields.io/badge/日本語-🇯🇵-red?style=flat-square" alt="Japanese"></a>
    <a href="README_zh-CN.md"><img src="https://img.shields.io/badge/简体中文-🇨🇳-brightgreen?style=flat-square" alt="Chinese"></a>
  </p>
</div>

# 香鳴ハノン 歌回存档

香鳴ハノン、暁月クララ、鎖乙女がぶ三位虚拟偶像的YouTube歌回直播视频检索工具，支持歌曲搜索、收藏、统计等功能，帮助粉丝快速定位想听的曲目。


## 特点
- 多虚拟偶像覆盖：在香鳴ハノン基础上，新增暁月クララ、鎖乙女がぶ的歌回存档，持续补充新内容
- 精准检索：需先选择目标虚拟偶像再搜索，输入歌曲名/艺术家名时自动响应结果，并显示匹配的名称提示
- 时间点标注：精确显示每首歌曲在视频中的开始时间（分:秒），无需手动查找
- 一键跳转：点击结果可直接在YouTube打开视频并从指定时间点播放
- 歌曲收藏：无需登录即可通过爱心图标收藏（仅本地保存），登录Google账号可实现多设备同步
- 频次统计：为每位虚拟偶像提供歌曲演唱频次图表，直观展示常唱曲目
- 视频过滤：点击视频名称可快速筛选出该视频内的所有歌曲，方便回顾单场歌回


## 开发初衷
某天想找ハノンちゃん唱的《ロマンスの神》，却记不清具体直播场次，翻找存档花了很多时间。于是萌生了做这个工具的想法——希望能让粉丝不用再为找一首歌浪费时间。后续根据需求扩充了暁月クララ、鎖乙女がぶ的资料，并加了收藏、统计等功能，让工具更实用。


## 功能说明
### 1. 歌回视频收集
尽可能完整收录三位虚拟偶像的YouTube歌回直播历史存档，会在本人有时间时手动更新，覆盖较新的歌回内容，方便粉丝回溯过往演唱。

### 2. 精准搜索系统
- 操作流程：先在顶部选择目标虚拟偶像（香鳴ハノン/暁月クララ/鎖乙女がぶ），再在搜索框输入歌曲名或艺术家名，输入过程中自动响应搜索结果，同时显示匹配的歌曲/艺术家名称提示
- 搜索结果覆盖该虚拟偶像尽可能收集到的存档内容，无时间限制
- 每首歌曲均标注在视频中的准确开始时间（分:秒），避免反复拖动进度条

### 3. 无缝播放体验
点击任意歌曲条目，将自动在新标签页打开对应的YouTube视频，并直接从该歌曲的开始时间点播放，无需额外操作。

### 4. 歌曲收藏与同步
- 找到喜欢的歌曲后，点击旁侧爱心图标即可收藏，无需登录账号（收藏内容仅保存在当前设备）
- 登录Google账号可实现收藏内容多设备同步，同一账号在手机、电脑上登录都能看到

### 5. 歌曲频次统计
为每位虚拟偶像单独生成“歌曲演唱频次”图表，用可视化方式展示各歌曲的演唱次数，能快速了解该虚拟偶像常唱的曲目类型。

### 6. 视频内歌曲过滤
在搜索结果或歌回列表中，点击任意视频的名称，页面会自动筛选出该视频内的所有歌曲并形成独立列表，方便完整回顾单场歌回的所有曲目。


## 在线演示

项目已部署至GitHub Pages，无需安装即可直接使用。最新功能（收藏、统计、筛选）也已同步发布：  
→ 新URL: [https://hanon-uta.github.io](https://hanon-uta.github.io)  
→ 旧URL: [https://kevinstrax.github.io/hanon-uta](https://kevinstrax.github.io/hanon-uta)（已设置重定向，访问后自动跳转至新URL）

## 旧版信息

当前浏览的页面是已迁移至新仓库的版本。旧仓库的README可通过以下链接查看：
- 日语: [https://github.com/kevinstrax/hanon-uta/blob/main/README.md](https://github.com/kevinstrax/hanon-uta/blob/main/README.md)
- 中文: [https://github.com/kevinstrax/hanon-uta/blob/main/README_zh-CN.md](https://github.com/kevinstrax/hanon-uta/blob/main/README_zh-CN.md)


## 技术栈
- 前端: Vue 3 + Vite
- 部署: GitHub Pages
- UI框架: Bootstrap 5.3.8
- 认证服务: Google OAuth2
- AI代码生成: [DeepSeek Chat](https://www.deepseek.com)（核心代码及后续功能迭代均大部分借助AI辅助开发，作者以后端服务端开发为主，前端经验有限）


## 使用方法
1. 访问在线地址（新地址或旧地址均可，旧地址会自动跳转），在顶部选择需要查看的虚拟偶像（香鳴ハノン/暁月クララ/鎖乙女がぶ）
2. 在搜索框输入目标歌曲名或艺术家名，输入过程中会自动响应搜索结果并显示匹配的名称提示
3. 从结果中找到想收听的歌曲，点击条目即可跳转至YouTube对应时间点播放
4. 收藏歌曲：点击歌曲旁爱心图标，无需登录即可保存；登录Google账号可实现多设备同步
5. 查看统计：在虚拟偶像选择界面点击“歌曲统计”，查看演唱频次图表
6. 过滤视频歌曲：点击任意视频名称，页面自动展示该视频内的所有歌曲


## 本地运行（仅供参考）
无需安装即可使用在线版本，若对代码感兴趣想本地运行：
```bash
git clone https://github.com/hanon-uta/hanon-uta.github.io.git

cd hanon-uta

pnpm install
pnpm run dev
```

## 致谢
本项目的数据参考了包括但不限于以下YouTube用户整理的歌回时间轴信息（涵盖香鳴ハノン、暁月クララ、鎖乙女がぶ三位虚拟偶像的歌回内容）：  
[@tk-taks1984](https://www.youtube.com/@tk-taks1984)、[@timestamp-nog](https://www.youtube.com/@timestamp-nog)、[@haruto-nog](https://www.youtube.com/@haruto-nog)、[@野上ハルト](https://www.youtube.com/@野上ハルト)、[@harut0_nog](https://www.youtube.com/@harut0_nog)、[@SaySay009](https://www.youtube.com/@SaySay009)、[@tomfukuとむふく](https://www.youtube.com/@tomfukutomofuku)、[@コイケン_koiken](https://www.youtube.com/@koiken_koiken)、[@remilia.s](https://www.youtube.com/@remilia.s)、[@ぽテさら](https://www.youtube.com/@potesara)、[@はこぴぴぴ](https://www.youtube.com/@hakopipipi)、[@Cyaegha](https://www.youtube.com/@Cyaegha)、[@PP-dy5nd](https://www.youtube.com/@PP-dy5nd)、[@hiyokoalex4074](https://www.youtube.com/@hiyokoalex4074)、[@atamorumoru](https://www.youtube.com/@atamorumoru)、[@とっきー-ycilysm](https://www.youtube.com/@tokki-ycilysm)、[@ke-suke_39](https://www.youtube.com/@ke-suke_39)、[@futianx1360](https://www.youtube.com/@futianx1360)、[@せきね-f7u](https://www.youtube.com/@sekine-f7u)、[@higeiwashi](https://www.youtube.com/@higeiwashi)、[@HorineSu](https://www.youtube.com/@HorineSu)、[@exl5eq28](https://www.youtube.com/@exl5eq28)

新增的暁月クララ、鎖乙女がぶ相关数据，也补充参考了其他粉丝自发整理的时间轴信息。没有这些宝贵的粉丝贡献，本项目无法覆盖这么多歌回内容，在此衷心感谢所有贡献者。


## 注意事项
- 本应用是粉丝自制的非官方工具，与香鳴ハノン、暁月クララ、鎖乙女がぶ及其所属团体均无关联
- 所有视频权利归属原作者及YouTube平台，本项目仅提供索引服务，不存储任何视频内容
- 数据来源于用户投稿，虽尽量核对准确性，但不做绝对担保
- 如发现数据错误、功能问题或有需求建议，请在GitHub Issues提交报告


## 数据更新说明
数据会在本人有时间时手动更新，涵盖三位虚拟偶像的新歌回存档与统计数据。如需请求特定歌回收录、反馈错误，或建议新增功能，可通过GitHub Issues提交。


## 联系
问题反馈或功能建议：
- GitHub Issues: [https://github.com/kevinstrax/hanon-uta/issues](https://github.com/kevinstrax/hanon-uta/issues)
- X(旧Twitter): [@dtkviolin](https://x.com/dtkviolin)

各虚拟偶像官方账号：
- 香鳴ハノン: [YouTube频道](https://www.youtube.com/@kanaruhanon) | [Twitter](https://x.com/kanaruhanon)
- 暁月クララ: [YouTube频道](https://www.youtube.com/@akatsukiclara) | [X(旧Twitter)](https://x.com/akatsukiclara)
- 鎖乙女がぶ: [YouTube频道](https://www.youtube.com/@saotomegabu) | [X(旧Twitter)](https://x.com/saotomegabu)