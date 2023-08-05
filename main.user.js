// ==UserScript==
// @name        DTF-User Block
// @namespace   https://github.com/TentacleTenticals/
// @match       https://dtf.ru/*
// @grant       none
// @version     1.0
// @author      Tentacle Tenticals
// @description Скрипт для показа и получения аватарок и фонов пользователей
// @homepage    https://github.com/TentacleTenticals/DTF-Get-your-avatar1
// @updateURL   https://github.com/TentacleTenticals/DTF-Get-your-avatar1/raw/master/main.user.js
// @downloadURL https://github.com/TentacleTenticals/DTF-Get-your-avatar1/raw/master/main.user.js
//
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/libs/splitCls/classes.js
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/libs/settings/css/dtfCore.js
// @license MIT
// ==/UserScript==
/* jshint esversion:8 */

(() => {
  let css = (cfg) => {
    return `
  .scrollLite::-webkit-scrollbar-thumb {
    background-color: rgb(189 164 164);
  }
  .scrollLite::-webkit-scrollbar {
    width: 2px;
  }

  .feedsContainer .content-header {
    height: 50px;
    padding: 18px 0 0 5px !important;
  }

  .cont {
    display: flex;
  }
  .video-cont {
    display: inline-flex;
    position: relative;
    margin: auto;
    max-width: ${cfg.feeds.attachments.video.size.width}px;
    max-height: ${cfg.feeds.attachments.video.size.height}px;
    box-shadow: 0px 0px 3px 1px rgb(0 0 0);
    z-index: 10;
    cursor: pointer;
  }
  .video-cont video {
    max-width: inherit;
    max-height: inherit;
    margin: auto;
  }

  .video-cont.playing .mediaStarter {
    display: none;
  }

  .mediaStarter {
    display: flex;
    width: 100%;
    height: 100%;
    background-color: rgb(0 0 0 / 40%);
    position: absolute;
    /* justify-content: center; */
    align-items: center;
    z-index: 10;
    cursor: pointer;
  }
  .mediaStarter .btn {
    display: flex;
    background-color: rgb(255 255 255);
    margin: 0 auto;
    height: 50%;
    max-height: 50px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    position: absolute;
    left: 0;
    right: 0;
    /* top: calc(50% - 50% / 2); */
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 4px 0px rgb(0 0 0);
    z-index: 1;
    /* cursor: pointer; */
  }
  .mediaStarter .btn img {
    width: 35%;
    margin: 0px 0px 0px 10%;
  }
  .video-cont:hover .mediaStarter .btn {
    background-color: rgb(255 0 0);
  }

  .updown {
    display: none;
  }
  .dtf-feedsContainer .feed__item {
    position: relative;
    border-radius: unset;
    box-shadow: 0 0 3px 0px rgb(0,0,0);
  }
  .feed__item.l-island-round .content-header-author__avatar {
    border-radius: 50%;
  }
  .dtf-feedsContainer {
    display: flex;
    flex-direction: column;
    gap: 20px 0;
    margin: 1px 0 0 0;
  }
  .dtf-feedsContainer .feed__chunk {
    display: flex;
    flex-direction: column;
    gap: 20px 0;
  }
  .feedsList {
    display: flex;
    gap: 20px 0;
    flex-direction: column;
  }

  .widget {
    display: flex;
    position: fixed;
    top: 60px;
    gap: 0 0;
    flex-shrink: 0;
    flex-wrap: wrap;
    flex-direction: row;
    z-index: 20;
  }

  .widget .wList {
    display: flex;
    max-width: 248px;
    flex-direction: column;
  }

  .widgetPanel {
    background-color: rgb(0,0,0);
    color: rgb(255,255,255);
    padding: 4px 0 0 0;
    border-radius: 2px;
  }
  .widgetPanel .header {
    display: flex;
    text-align: center;
    font-size: 12px;
    cursor: pointer;
    justify-content: center;
  }
  .widgetPanel .list {
    display: none;
  }
  .widgetPanel:hover .list {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    padding: 4px;
  }

  .widgetPanel .w-btn {
    display: flex;
    background-color: rgb(50,50,50);
    aspect-ratio: 1/1;
    margin: auto;
    padding: 2px;
    border-radius: 2px;
    box-shadow: 0 0 4px 0px rgb(255,255,255);
    align-items: center;
  }

  .widgetPanel .w-btn.active {
    box-shadow: inset 0 0 6px 0px rgb(140 192 231);
  }

  .widget .w-item {
    display: flex;
    flex-direction: column;
    background-color: rgb(53 53 53);
    color: rgb(255,255,255);
    padding: 2px;
  }
  .widget .w-item>.header {
    background-color: rgb(107 63 82);
    color: rgb(255 255 255);
    margin-bottom: 5px;
    padding: 0 2px 0 2px;
    font-size: 12px;
    text-align: center;
    cursor: pointer;
  }

  .widget .w-item .list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 7px 8px;
    max-height: 90px;
    padding: 3px 2px 2px 2px;
    overflow: auto;
  }
  .widget .w-item .list.scrollLite {
    background-color: rgb(189 164 164);
  }
  .widget .w-item .list.scrollLite {
    width: 2px;
  }

  .w-btn {
    cursor: pointer;
  }

  .w-item.hidden {
    display: none;
  }

  .wl-tagList .tags .header {
    background-color: rgb(0,0,0);
    color: rgb(255 255 255);
    padding: 3px 2px 3px 2px;
    font-size: 12px;
    text-align: center;
  }

  .dtf-menu {
    display: flex;
    flex-direction: column;
    background-color: rgb(0 0 0);
    position: absolute;
    top: 40px;
    margin: 10px 0 0 0;
    padding: 5px;
    border-radius: 2px;
    outline: none;
    z-index: 100;
    box-shadow: 0 0 4px 0px rgb(0 0 0);
  }
  .dtf-menu .header {
    background-color: rgb(88 44 78);
    color: rgb(255 255 255);
  }

  .dtf-menu .list {
    display: flex;
    flex-direction: column;
    margin: 6px 0 0 0;
    gap: 5px 0;
  }

  .dtf-menu .list .button {
    background-color: rgb(44 44 44);
    color: rgb(255 255 255);
    font-size: 14px;
    outline: none;
    cursor: pointer;
  }
  .dtf-menu .list button:hover {
    filter: brightness(1.3);
  }

  .dtf-menuButton {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .dtf-menuButton .menuList {
    display: none;
    position: absolute;
    margin: 0px 0px 0px -5px;
  }
  .dtf-menuButton:hover .menuList,
  .dtf-menuButton .menuList:hover {
    background: rgb(208 165 233);
    width: max-content;
    height: max-content;
    padding: 3px;
    display: flex;
    flex-direction: row;
    gap: 5px 5px;
    box-shadow: 0px 0px 2px 1px rgb(0 0 0);
    z-index: 10;
  }

  .feed__item.l-island-round:is(.favoriteSubsite, .favoriteTopicsAuthor, .favoriteBlogsAuthor, .ignoredSubsite, .ignoredAuthor, .blockedSubsite, .blockedAuthor) .content-header::after {
    display: flex;
    position: absolute;
    top: -3px;
    left: 1px;
    font-size: 11px;
    font-weight: 600;
    color: rgb(0 0 0);
    align-items: center;
  }

  .feed__item.l-island-round:is(.watched, .planToRead, .onHold)::before {
    display: flex;
    position: absolute;
    width: 100%;
    margin-top: 4px;
    font-size: 11px;
    font-weight: 600;
    color: rgb(0 0 0);
    justify-content: center;
  }

  .feed__item.l-island-round:is(.favoriteTopicsAuthor, .favoriteBlogsAuthor, .favoriteSubsite) .content-header {
    position: relative;
    box-shadow: 0 0 0px 3px rgb(213 132 183), 0 0 4px 2px rgb(0,0,0);
  }

  .feed__item.l-island-round.favoriteTopicsAuthor .content-header::after {
    content: '💘 Автор статей';
  }
  .feed__item.l-island-round.favoriteBlogsAuthor .content-header::after {
    content: '💘 Автор блогов';
  }
  .feed__item.l-island-round.favoriteSubsite .content-header::after {
    content: '💘 Подсайт';
  }
  .feed__item.l-island-round.favoriteTopicsAuthor.favoriteSubsite .content-header::after {
    content: '💘 Подсайт и автор статей';
  }
  .feed__item.l-island-round.favoriteBlogsAuthor.favoriteSubsite .content-header::after {
    content: '💘 Подсайт и автор блогов';
  }

  .feed__item.l-island-round.watched::before {
    content: '✔️ ПРОСМОТРЕНО';
  }
  .feed__item.l-island-round.planToRead::before {
    content: '📚 ПРОЧТУ ПОЗЖЕ';
  }
  .feed__item.l-island-round.onHold::before {
    content: '📖 ЧИТАЮ';
  }

  .comment:is(.favorite, .ignored, .blocked) .comment__avatar {
    position: relative;
    border-radius: 50%;
  }
  .comment:is(.favorite, .ignored, .blocked) .comment__avatar::after {
    display: flex;
    position: absolute;
    top: -20%;
    left: -20%;
    font-size: 12px;
    min-width: 0;
    min-height: 0;
    aspect-ratio: 1/1;
    background-color: rgb(255 255 255 / 0.7);
    color: rgb(255,255,255);
    border-radius: 50%;
    box-shadow: 0 0 3px 0px rgb(0,0,0);
    align-items: center;
  }

  .comment.ignored .comment__avatar {
    box-shadow: 0 0 0px 3px rgb(177 69 25), 0 0 4px 2px rgb(0,0,0);
  }
  .comment.ignored .comment__avatar::after {
    content: '💢';
  }
  .comment.favorite .comment__avatar {
    box-shadow: 0 0 0px 3px rgb(213 132 183), 0 0 4px 2px rgb(0,0,0);
  }
  .comment.favorite .comment__avatar::after {
    content: '💘';
  }

  .comment.ignored .comment__text {
    filter: blur(9px);
  }
  .comment.ignored .comment__attaches {
    filter: blur(9px);
    opacity: 0.2;
  }
  .comment.ignored :is(.comment__text, .comment__attaches):hover {
    filter: none;
    opacity: 1;
  }

  .comment.blocked {
    position: relative;
    backdrop-filter: brightness(0.1);
    filter: brightness(0.1);
  }
  .comment.blocked::after {
    display: block;
    position: absolute;
    content: 'Blocked';
    width: 100%;
    height: 100%;
    background-color: rgb(0,0,0);
    color: rgb(255,255,255);
    text-align: center;
    z-index: 1;
  }
  .comment.blocked:hover::after {
    backdrop-filter: none;
    filter: none;
  }

  .usercard {
    display: flex;
    flex-direction: column;
    background-color: rgb(0,0,0);
    color: rgb(255,255,255);
    position: fixed;
    width: 500px;
    aspect-ratio: 1/0.5;
    box-shadow: 0 0 1px 1px rgb(0,0,0);
    z-index: 20;
  }

  .dtf-fyiWindow .header {
    display: flex;
    flex-direction: column;
    text-align: center;
    color: rgb(255, 255, 255);
    background-color: rgb(54 43 43);
    border-radius: 2px;
    padding: 2px;
    margin: 1px 1px 5px 1px;
    box-shadow: inset 0px 0px 2px 0px rgb(173 171 171);
    cursor: pointer;
  }
  .dtf-fyiWindow .header .label {
    font-size: 13px;
    font-family: 'Chakra Petch', sans-serif;
    letter-spacing: 0.5px;
    text-align: center;
  }
  .dtf-fyiWindow .header .label::before {
    display: inline-block;
    content: '';
    color: black;
    top: -4px;
    left: -10px;
    width: 20%;
    height: 1px;
    position: relative;
    box-shadow: 0px 0px 1px 1px rgb(185 0 87);
  }
  .dtf-fyiWindow .header .label::after {
    display: inline-block;
    content: '';
    color: black;
    top: -4px;
    right: -10px;
    width: 20%;
    height: 1px;
    position: relative;
    box-shadow: 0px 0px 1px 1px rgb(185 0 87);
  }

  .usercard .list {
    display: flex;
    flex-direction: column;
    position: relative;
    background-color: rgb(0,0,0, 0.8);
    padding: 5px;
  }
  .usercard .list .subList {
    display: flex;
  }

  .usercard .list .colList {
    display: flex;
    flex-direction: row;
  }
  .usercard .list .colList.space {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .usercard .list .subList.hor {
    flex-direction: row;
  }
  .usercard .list .subList.ver {
    flex-direction: column;
  }

  .usercard .list .off {
    opacity: 0.3;
  }

  .usercard .mask {
    display: flex;
    background-color: rgb(0,0,0);
    width: 140px;
    aspect-ratio: 1/1;
    overflow: hidden;
  }
  .usercard .mask .img {
    width: inherit;
    margin: auto;
  }
  .usercard .mask.avatar {
    flex-shrink: 0;
    box-shadow: 0 0 2px 1px rgb(131 131 131);
  }
  .mask.avatar:focus {
    position: absolute;
    width: unset;
    max-width: 100%;
    z-index: 20;
  }

  .usercard .mask.cover {
    position: absolute;
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    top: 0;
    left: 0;
  }

  .tGap-5 {
    row-gap: 5px;
  }
  .tGap-10 {
    row-gap: 10px;
  }
  .tGap-15 {
    row-gap: 15px;
  }
  .tGap-20 {
    row-gap: 20px;
  }

  .lGap-5 {
    column-gap: 5px;
  }
  .lGap-10 {
    column-gap: 10px;
  }
  .lGap-15 {
    column-gap: 15px;
  }
  .lGap-20 {
    column-gap: 20px;
  }

  .tMar-5 {
    margin-top: 5px;
  }
  .tMar-10 {
    margin-top: 10px;
  }
  .tMar-15 {
    margin-top: 15px;
  }
  .tMar-20 {
    margin-top: 20px;
  }

  .fullWidth {
    width: 100%;
  }

  .positive {
    color: rgb(68 211 146);
    font-weight: 600;
  }
  .negative {
    color: rgb(217 81 123);
    font-weight: 600;
  }

  .dark {
    background-color: rgb(0,0,0);
    color: rgb(255,255,255);
  }
  .light {
    background-color: rgb(255,255,255);
    color: rgb(0,0,0);
  }

  .usercard .list .btn {
    width: max-content;
    color: rgb(255,255,255);
    padding: 3px;
    cursor: pointer;
  }
  .usercard .list .btn:hover {
    filter: sepia(0.5);
  }

  .manyText {
    min-width: 0;
    font-size: 13px;
    word-break: break-word;
    overflow: auto;
  }

  .ras {
    display: block;
    width: 100%;
    background-color: rgb(121,76,95);
    color: rgb(255,255,255);
    margin: 6px 0 0 0;
    text-align: center;
    font-size: 11px;
  }

  .menuList .button:is(.favorite, .ignored, .blocked) {
    filter: brightness(3.0);
  }

  .dtf-feedsContainer .feed__item {
    box-shadow: 0 0 1px 1px rgb(0,0,0);
  }

  .feed__item.l-island-round.tagHide {
    display: none;
  }

  .tagBtn {
    display: flex;
    background-color: rgb(0 0 0);
    color: rgb(255,255,255);
    width: max-content;
    padding: 1px 2px 1px 0;
    border-radius: 2px;
    box-shadow: inset 0 0 5px 0px rgb(255 255 255);
    cursor: pointer;
  }
  .tagBtn:hover {
    filter: brightness(1.1);
  }

  .tagBtn.active {
    background-color: rgb(193 193 193);
    color: rgb(255 255 255);
  }
  .tagBtn.active .name {
    color: rgb(0 0 0);
  }

  .tagBtn .info {
    display: flex;
    gap: 0 3px;
    align-items: center;
  }
  .tagBtn .info .num {
    display: flex;
    background-color: rgb(0,0,0);
    color: rgb(255,255,255);
    padding: 0 2px 0 2px;
    font-size: 13px;
    align-items: center;
    border-radius: 2px;
  }
  .tagBtn .info .name {
    font-size: 13px;
    line-height: 0;
  }

  .tagBtn.topic {
    order: 1;
  }
  .tagBtn.blog {
    order: 2;
  }
  .tagBtn.topic-edt {
    order: 3;
  }`;
  };

  let mainCfg = {
    'working mode': 'tags',
    'filters': {
      'comments': {
        'text': {
          'nothing': 'collapse',
          'some': 'collapse',
          'active': true,
          'words active': true,
          'words': []
        }
      },
      'feeds': {
        'blogs': {
          'title': {
            'nothing': 'collapse',
            'some': 'collapse',
            'active': true,
            'words active': true,
            'words': []
          },
          'text': {
            'nothing': 'collapse',
            'some': 'collapse',
            'active': true,
            'words active': true,
            'words': []
          }
        },
        'topics': {
          'title': {
            'nothing': 'collapse',
            'some': 'collapse',
            'active': true,
            'words active': true,
            'words': []
          },
          'text': {
            'nothing': 'collapse',
            'some': 'collapse',
            'active': true,
            'words active': true,
            'words': []
          }
        }
      }
    },
    'feeds': {
      'attachments': {
        'video': {
          'replace': true,
          'autoplay': false,
          'sound': false,
          'volume': 40,
          'size': {
            'width': 300,
            'height': 150
          }
        }
      }
    },
    'usercard': {
      'avatar': {
        'search': {
          'list': [// Список поисковиков.
            {url:'http://saucenao.com/search.php?db=999&url=', name:'Saucenao', use:true},
            {url:'https://www.bing.com/images/search?view=detailv2&iss=sbi&FORM=SBIHMP&sbisrc=UrlPaste&q=imgurl:', name:'Bing', use:true},
            {url:'https://www.google.com/searchbyimage?sbisrc=4chanx&safe=off&image_url=', name:'Google', use:true},
            {url:'https://lens.google.com/uploadbyurl?url=', name:'Google Lens', use:true},
            {url:'https://yandex.ru/images/search?rdrnd=296405&rpt=imageview&url=', name:'Yandex', use:true},
            {url:'http://tineye.com/search/?url=', name:'TinEye', use:true},
            {url:'http://iqdb.org/?url=', name:'IQDB', use:true}
          ]
        }
      }
    },
    'script data': {
      'users': [],
      'subsites': [],
      'feeds': []
    }
  };

  let obs = {},
    widget;
  // window.addEventListener('load', run);
  // let data = {
  //   'users': [],
  //   'subsites': []
  // };

  function getPageType(url){
    if(!url){
      console.log('[GetPageType] error - no url');
      return;
    }
    url.replace(/https:\/\/dtf\.ru\/([^]+)/, (d, text) => {
      let arr = text.split('/');

      if(arr[0] && arr[0].match(/^popular$/)){
        if(!arr[1]) {
          // console.log('Popular');
          url = {type: 'popular'};
        }
      }

      if(arr[0] && arr[0].match(/^new$/)){
        if(!arr[1]) {
          // console.log('Popular');
          url = {type: 'new'};
        }
      }

      if(arr[0] && arr[0].match(/^my$/)){
        if(arr[1] && arr[1].match(/^new$/)) {
          // console.log('Popular');
          url = {type: 'my new'};
        }
      }

      if(arr[0] && arr[0].match(/^bookmarks$/)){
        if(!arr[1]) {
          // console.log('Bookmarks');
          url = {type: 'bookmarks'};
        }
      }

      if(arr[0] && arr[0].match(/^u$/)){
        if(arr[1] && !arr[2]) {
          // console.log('User');
          url = {type: 'user page', name: arr[1]};
        }else
        if(arr[1] && arr[2]) {
          // console.log('User blog');
          url = {type: 'topic'};
        }
      }
      if(arr[0] && arr[0].match(/^s$/)){
        if(arr[1] && !arr[2]) {
          // console.log('Subsite');
          url = {type: 'subsite', name: arr[1]};
        }else
        if(arr[1] && arr[2]) {
          // console.log('Subsite topic');
          url = {type: 'topic'};
        }
      }
      if(arr[0] && !arr[0].match(/^(u|s)$/)){
        if(arr[0] && !arr[1]) {
          // console.log('DTF subsite');
          url = {type: 'subsite', name: arr[0]};
        }else
        if(arr[0] && arr[1]) {
          // console.log('DTF subsite Topic');
          url = {type: 'topic'};
        }
      }
    })
    return url;
  }

  class Widget{
    main(){
      const widget = document.querySelector(`#widget`);
      if(!widget){
        this.main=new El().Div({
          path: document.body,
          cName: 'widget',
          id: 'widget',
          rtn: true
        });
        this.panel=new El().Div({
          path: this.main,
          cName: 'widgetPanel',
          rtn: true
        });
        new El().Div({
          path: this.panel,
          cName: 'header',
          text: '🗄\uFE0E'
        });
        this.list=new El().Div({
          path: this.panel,
          cName: 'list'
        });

        new El().Div({
          path: this.main,
          cName: 'wList'
        });

        return this.main;
      }else
      return document.querySelector(`#widget`);
    }
  }

  function videoReplace(path, video){
    if(video.getAttribute('data-andropov-type') === 'video' && video.getAttribute('data-video-service') === 'default'){
      // console.log('VIDEO', path.parentNode);
      // if(!path.parentNode || path.parentNode === 'null') return;
      let pp;
      path.parentNode ? pp = path.parentNode : pp = path;
      console.log('VIDEO', pp);
      let main=new El().Div({
        path: pp,
        cName: 'cont',
        rtn: []
      });
      let c=new El().Div({
        path: main,
        cName: 'video-cont',
        rtn: [],
        onclick: (e) => {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          if(c.lastChild.paused) c.lastChild.play();
          else c.lastChild.pause();
        }
      });
      let starter=new El().Div({
        path: c,
        cName: 'mediaStarter',
        rtn: []
      });
      let prev=new El().Div({
        path: starter,
        cName: 'btn',
        rtn: []
      });
      new El().Image({
        path: prev,
        url: 'https://github.com/TentacleTenticals/dtf-markdown/raw/main/libs/Play.svg'
      });
      new El().Video({
        path: c,
        url: video.getAttribute('data-video-mp4'),
        poster: video.getAttribute('data-video-thumbnail'),
        loop: true,
        muted: true,
        onplay: (e) => {
          e.target.parentNode.classList.toggle('playing');
        },
        onpause: (e) => {
          e.target.parentNode.classList.toggle('playing');
        },
        onended: (e) => {
          e.target.parentNode.classList.toggle('playing');
        }
      });
      // path.replaceChildren(main);
      path.remove();
    }
  }

  class Feeds{
    main(){
      if(!document.querySelector(`div[id=page_wrapper] .feed div[id='dtf-feedsContainer']`)){
        this.main=new El().Div({
          path: document.querySelector(`div[id=page_wrapper] .feed .feed__container`),
          addBefore: document.querySelector(`div[id=page_wrapper] .feed .feed__container`).children[0],
          cName: 'dtf-feedsContainer',
          id: 'dtf-feedsContainer',
          rtn: true
        });
        this.list=new El().Div({
          path: this.main,
          cName: 'feedsList'
        });

        return this.main;
      }else
      return this.main=document.querySelector(`div[id=page_wrapper] .feed div[id='dtf-feedsContainer']`);
    }
    widgetItem(path){
      this.p = widget.querySelector(`#w-subList`);
      if(!this.p){
        this.main=new El().Div({
          path: path.children[0].children[1],
          cName: 'w-btn',
          id: 'w-subList',
          text: '🏷️',
          onclick: () => {
            this.op.classList.toggle('hidden');
            this.main.classList.toggle('active');
          },
          rtn: true
        });

        this.op=new El().Div({
          path: path.children[1],
          cName: 'wl-tagList w-item hidden',
          rtn: true
        });
        new El().Div({
          path: this.op,
          cName: 'header',
          text: 'Лист подсайтов',
          onclick: () => {
            this.op.classList.toggle('hidden');
            this.main.classList.toggle('active');
          }
        });
        this.tagList=new El().Div({
          path: this.op,
          cName: 'tags',
          rtn: true
        });
        this.typeList=new El().Div({
          path: this.tagList,
          rtn: true
        });
        new El().Div({
          path: this.typeList,
          cName: 'header',
          text: 'Типы'
        });
        new El().Div({
          path: this.typeList,
          cName: 'list'
        });
        this.subList=new El().Div({
          path: this.tagList,
          rtn: true
        });
        new El().Div({
          path: this.subList,
          cName: 'header',
          text: 'Подсайты'
        });
        new El().Div({
          path: this.subList,
          cName: 'list'
        });
        this.authorList=new El().Div({
          path: this.tagList,
          rtn: true
        });
        new El().Div({
          path: this.authorList,
          cName: 'header',
          text: 'Авторы'
        });
        new El().Div({
          path: this.authorList,
          cName: 'list'
        });
      }else{
        widget.children[1].querySelector(`.wl-tagList`).children[1].children[0].children[1].replaceChildren();
        widget.children[1].querySelector(`.wl-tagList`).children[1].children[1].children[1].replaceChildren();
        widget.children[1].querySelector(`.wl-tagList`).children[1].children[2].children[1].replaceChildren();
      }
    }
    tagButton(path, id, name, attr, check){
      const tag = path.querySelector(`div[tag-id='${id}']`);
      if(tag) return tag;
      else{
        const main=new El().Div({
          path: path,
          cName: `tagBtn${isNaN(attr) && ` ${id}`}`,
          attr: ['tag-id', id],
          rtn: true,
          onclick: () => {
            // if(check, getPageType(document.location.href).type.match(/subsite|user page/)) return console.log(`You cannot hide ${type} feeds on ${type} page!`);
            for(let i = 0, arr = document.querySelectorAll(`div[id=page_wrapper] .feed .feed__container .feed__item`), length = arr.length; i < length; i++){
              if(arr[i].getAttribute(attr) === id) arr[i].classList.toggle('tagHide');
            }
            main.classList.toggle('active');
          }
        });
        const info=new El().Div({
          path: main,
          cName: 'info',
          rtn: true
        });
        const num=new El().Div({
          path: info,
          cName: 'num',
          text: '0'
        });
        const tagName=new El().Div({
          path: info,
          cName: 'name',
          text: (() => {
            if(!name.match(/topic|blog/)) return name;
            else
            if(name === 'topic') return 'Статьи';
            else
            if(name === 'topic-edt') return 'Статьи от редакции';
            else
            if(name === 'blog') return 'Блоги';
          })()
        });

        return main;
      }
    }
  }

  function checkComments(){
    for(let i = 0, arr = document.querySelectorAll('.comment'), length = arr.length; i < length; i++){
      const t = mainCfg['script data'].users.find(el => el.id === arr[i].getAttribute('data-user_id'));
      if(!t) continue;
      t.rules.comments.favorite ? arr[i].classList.add('favorite') : arr[i].classList.remove('favorite');
      t.rules.comments.ignored ? arr[i].classList.add('ignored') : arr[i].classList.remove('ignored');
    }
  }
  function checkFeeds(target, fullCheck){
    function getInfo(target){
      let filter = /https:\/\/dtf\.ru\/(u\/|s\/|[^/]{2,})(\d*)-{0,1}([^]*)/gm;
      let o;
      target.replace(filter, (d, type, id, username) => {
        if(type.match(/u\//) && id && username){
          console.log('User');
          o = {author:username, authorType:'User', authorID:id};
        }else
        if(type.match(/s\//) && !id && username){
          console.log('Official subsite');
          o = {author:username, authorType:'Official subsite', authorID:username};
        }
        if(type.match(/s\//) && id && username){
          console.log('User subsite');
          o = {author:username, authorType:'User subsite', authorID:id};
        }else
        if(!type.match(/u\/|s\//) && !id && !username){
          console.log('DTF subsite');
          o = {author:type, authorType:'DTF subsite', authorID:type};
        }
      })
      return o;
    }
    let num = 0,
      filter = {},
      location = getPageType(document.location.href),
      mainFeed;

    console.log('Checking feeds...');
    mainFeed = new Feeds().main();

    if(!target){
      target = !fullCheck ? document.querySelector(`div[id=page_wrapper] .feed .feed__container .feed__chunk:not(.checked)`) : document.querySelectorAll(`div[id=page_wrapper] .feed .feed__container .feed__item`);
    }

    function check(u, type, item, who){
      const teq = type.charAt(0).toUpperCase() + type.slice(1);
      u.rules[type].favorite ? item.classList.add(`favorite${teq + who}`) : item.classList.remove(`favorite${teq + who}`);
      u.rules[type].ignored ? item.classList.add(`ignored${teq + who}`) : item.classList.remove(`ignored${teq + who}`);
      u.rules[type].blocked ? item.classList.add(`blocked${teq + who}`) : item.classList.remove(`blocked${teq + who}`);
    }
    // if(!target && !target.children.length > 0) return;
    // console.log('Target', target);
    if(target){
      for(let i = 0, arr = !fullCheck ? target.children : target, length = arr.length; i < length; i++){
        const control = arr[i].querySelector(`.content-header__item--controls`).children[0],
          att = {},
          action = {},
          tag = {},
          header = arr[i].querySelector(`.content-header__info`),
          container = arr[i].querySelector(`.content-container`),
          u = mainCfg['script data'].users.find(el => el.id === control.getAttribute('data-user-id')),
          s = mainCfg['script data'].subsites.find(el => el.id === control.getAttribute('data-subsite-id')),
          t = mainCfg['script data'].feeds.find(el => el.id === control.getAttribute('data-content-id'));
        // console.log('u', u);
        // console.log('s', s);
        console.log('t', t);

        if(container) for(let c = 0, cn = container.children, len = cn.length; c < len; c++){
          // console.log(arr[i])
          if(!cn[c].className) continue;
          if(cn[c].className.match('content-title')) att.title = cn[c].textContent.trim();
          if(cn[c].className.match('content-title') && cn[c].children[0]) att.editorial = true;
          if(cn[c].className.match('l-island-a') && cn[c].children[0] && cn[c].children[0].tagName === 'P') att.text = cn[c].children[0].textContent.trim();
          if(cn[c].className.match('figure-image') && cn[c].querySelector(`.andropov_video`)) att.video = {path:cn[c], video:cn[c].querySelector(`.andropov_video`)};
        }

        arr[i].setAttribute('sID', control.getAttribute('data-subsite-id'));
        arr[i].setAttribute('uID', control.getAttribute('data-user-id'));
        // if(att.editorial) arr[i].setAttribute('author', 'editorial');

        // control.getAttribute('data-subsite-id') === control.getAttribute('data-user-id') ? arr[i].setAttribute('type', 'blog') : (!att.editorial ? arr[i].setAttribute('type', 'topic') : arr[i].setAttribute('type', 'topic ✔️'));

        if(control.getAttribute('data-subsite-id') !== control.getAttribute('data-user-id')){
          // TOPIC
          arr[i].classList.add('topic');
          !att.editorial ? arr[i].setAttribute('type', 'topic') : arr[i].setAttribute('type', 'topic-edt');

          if(mainCfg['working mode'] === 'tags'){
            tag.typelist = new Feeds().tagButton(widget.children[1].querySelector(`.wl-tagList`).children[1].children[0].children[1], arr[i].getAttribute('type'), arr[i].getAttribute('type'), 'type', true);
            tag.typelist.children[0].children[0].textContent = ++tag.typelist.children[0].children[0].textContent;
            if(tag.typelist.className.match('active')) arr[i].classList.add('tagHide');
            tag.sublist = new Feeds().tagButton(widget.children[1].querySelector(`.wl-tagList`).children[1].children[1].children[1], control.getAttribute('data-subsite-id'), control.getAttribute('data-subsite-name'), 'sID', true);
            tag.sublist.children[0].children[0].textContent = ++tag.sublist.children[0].children[0].textContent;
            if(tag.sublist.className.match('active')) arr[i].classList.add('tagHide');
            tag.author = new Feeds().tagButton(widget.children[1].querySelector(`.wl-tagList`).children[1].children[2].children[1], control.getAttribute('data-user-id'), control.getAttribute('data-author-name'), 'uID');
            tag.author.children[0].children[0].textContent = ++tag.author.children[0].children[0].textContent;
            if(tag.author.className.match('active')) arr[i].classList.add('tagHide');
          }
          if(u){
            check(u, 'topics', arr[i], 'Author');
            // u.rules.topics.favorite ? arr[i].classList.add('favoriteAuthor') : arr[i].classList.remove('favoriteAuthor');
            // u.rules.topics.ignored ? arr[i].classList.add('ignoredAuthor') : arr[i].classList.remove('ignoredAuthor');
            // u.rules.topics.blocked ? arr[i].classList.add('blockedAuthor') : arr[i].classList.remove('blockedAuthor');
          }
          if(s){
            check(s, 'topics', arr[i], 'Subsite');
            // s.rules.topics.favorite ? arr[i].classList.add('favoriteSubsite') : arr[i].classList.remove('favoriteSubsite');
            // s.rules.topics.ignored ? arr[i].classList.add('ignoredSubsite') : arr[i].classList.remove('ignoredSubsite');
            // s.rules.topics.blocked ? arr[i].classList.add('blockedSubsite') : arr[i].classList.remove('blockedSubsite');
          }
          if(t){
            t.rules.watched ? arr[i].classList.add('watched') : arr[i].classList.remove('watched');
            t.rules.planToRead ? arr[i].classList.add('planToRead') : arr[i].classList.remove('planToRead');
            t.rules.onHold ? arr[i].classList.add('onHold') : arr[i].classList.remove('onHold');
          }

          // console.log('Container', container);

          if(container){
            if(att.video) videoReplace(att.video.path, att.video.video);
            if(mainCfg.filters.feeds.topics.title.active){
              // console.log(1);
              // if(!att.title) console.log('No title');
              if(att.title){
                if(filter.title && att.title.match(filter.title)) action.collapse + arr[i].classList.add('blocked', 'title');
              }else mainCfg.filters.feeds.topics.title.nothing === 'collapse' ? action.collapse + arr[i].classList.add('blocked', 'noTitle') : action.delete;
            }
            if(mainCfg.filters.feeds.topics.text.active){
              if(att.text){
                if(mainCfg.filters.feeds.topics.text.active && filter.text && att.text.match(filter.text)) action.collapse + arr[i].classList.add('blocked', 'text');
              }else mainCfg.filters.feeds.topics.text.nothing === 'collapse' ? action.collapse + arr[i].classList.add('blocked', 'noText') : action.delete;
              // if(att.video) videoReplace(att.video.path, att.video.video);
            }

            // if(arr[i].className) '';
          }
          if(action.collapse) arr[i].classList.add('collapsed');
        }else
        if(control.getAttribute('data-subsite-id') === control.getAttribute('data-user-id')){
          // BLOG
          arr[i].setAttribute('type', 'blog');
        }

        // mainFeed.appendChild(arr[i]);
      }
      if(!fullCheck){
        target.classList.add('checked');
        mainFeed.children[0].appendChild(target);
      }
    }
    // mainFeed.appendChild(target);
  }
  function obsFeeds(mode){
    new El().Obs({
      obs: obs,
      target: document.querySelector(`.feed .feed__container`),
      check: true,
      search: /feed__container/,
      name: 'feeds',
      mode: mode,
      cfg: {attributes: false, childList: true, subtree: false, characterData: false},
      func: (item) => {
        // console.log('OBS ', item);
        if(!item.className) return;
        if(item.className.match(/feed__chunk(?! checked)/)){
          checkFeeds(item);
        }
      }
    });
  }
  class UserMenu{
    getUser(id){
      return fetch(`https://api.dtf.ru/v2.31/subsite?id=${id}`, {
      headers: {
        'accept': 'application/json'
      }
      }).then(r => r.json().then(rr => rr.result));
    }
    getTime(d){
      let t = new Date(d);
      return `${t.getFullYear()}/${t.getMonth()+1 < 10 ? `0${t.getMonth()+1}` : t.getMonth()+1}/${t.getDate() < 10 ? `0${t.getDate()}` : t.getDate()} ${t.getHours() < 10 ? `0${t.getHours()}` : t.getHours()}:${t.getMinutes() < 10 ? `0${t.getMinutes()}` : t.getMinutes()}:${t.getSeconds() < 10 ? `0${t.getSeconds()}` : t.getSeconds()}`
    };
    add({id, name, type, r, key}){
      return new Promise((result, error) => {
        if(type.match(/users|subsites/)){
          let obj;
          if(type === 'users') obj = {
            id: id,
            name: name,
            rules:{
              topics:{
                favorite: false,
                ignored: false,
                blocked: false
              },
              blogs:{
                favorite: false,
                ignored: false,
                blocked: false
              },
              comments:{
                favorite: false,
                ignored: false,
                blocked: false
              }
            }
          }
          else
          if(type === 'subsites') obj = {
            id: id,
            name: name,
            rules:{
              topics:{
                favorite: false,
                ignored: false,
                blocked: false
              },
              comments:{
                favorite: false,
                ignored: false,
                blocked: false
              }
            }
          }
          obj.rules[r][key] ? obj.rules[r][key] = false : obj.rules[r][key] = true;
          mainCfg['script data'][type].push(obj);
          result('ok');
        }else{
          this.getFeed(id).then(res => {
            const obj = {
              id: id,
              info: {
                aID: res.author.id,
                aName: res.author.name,
                title: res.title,
                text: undefined,
                attachments: res.blocks.length > 0 ? (res.blocks[1] ? [res.blocks[0], res.blocks[1]] : [res.blocks[0]]) : ''
              },
              rules:{
                planToRead: false,
                onHold: false,
                favorite: false,
                ignored: false,
                blocked: false
              }
            }
            obj.rules[key] ? obj.rules[key] = false : obj.rules[key] = true;
            mainCfg['script data'].feeds.push(obj);
            result('ok');
            // checkFeeds(false, true);
          });
        }
      });
    }
    update(item, r, key){
      if(r) item.rules[r][key] ? item.rules[r][key] = false : item.rules[r][key] = true;
      else{
        item.rules[key] ? item.rules[key] = false : item.rules[key] = true;
      }
      return item;
    }
    getValue(item, type, r, key){
      return [type][item].rules[r][key];
    }
    findOrAdd({id, name, type, r, key}){
      return new Promise((res, err) => {
        const user = mainCfg['script data'][type].findIndex(e => e.id === id);
        if(user !== -1){
          this.update(mainCfg['script data'][user], r, key);
          res('ok');
        }else
          this.add({id:id, name:name, type:type, r:r, key:key}).then(isp => {
            if(isp) res('ok');
          });
      })
    }
    getFeed(id){
      return fetch(`https://api.dtf.ru/v2.31/content?id=${id}`, {
        headers: {
          'accept': 'application/json'
        }
      }).then(r => r.json().then(rr => rr.result));
    }
    rs(path, text){
      new El().Div({
        path: path,
        cName: 'ras',
        text: text
      });
    }
    build({t, uID, sID, fID, uName, sName, type}){
      if(document.getElementById('dtf-userMenu')) return;
      this.user=mainCfg['script data'].users.find(el => el.id === uID);
      this.subsite=mainCfg['script data'].subsites.find(el => el.id === sID);
      this.feeds=mainCfg['script data'].feeds.find(el => el.id === fID);
      this.main=new El().Div({
        path: document.body,
        cName: `dtf-menu`,
        id: 'dtf-userMenu',
        tab: -1,
        style: `
        top: ${t.getBoundingClientRect().top + (window.scrollY||window.scrollHeight||0) + t.getBoundingClientRect().height}px;
        left: ${t.getBoundingClientRect().left}px`,
        rtn: [],
        onblur: () => {
          setTimeout(() => {
            this.main.remove();
          }, 100);
        }
      });

      this.header=new El().Div({
        path: this.main,
        cName: 'header',
        text: 'Меню управления',
        onclick: () => {
          this.main.remove();
        }
      });

      this.list=new El().Div({
        path: this.main,
        cName: 'list',
        rtn: []
      });

      new El().Button({
        path: this.list,
        cName: 'button',
        text: 'О пользователе',
        onclick: () => {
          this.getUser(uID).then(res => {
            this.userCard(t, res);
            console.log('User profile', res);
          });
        }
      });
      if(type === 'topic') new El().Button({
        path: this.list,
        cName: 'button',
        text: 'О подсайте',
        onclick: () => {
          this.getUser(sID).then(res => {
            this.userCard(t, res);
            console.log('Subsite profile', res);
          });
        }
      });

      this.rs(this.list, 'Пользователь');
      this.MenuButton({
        path: this.list,
        cName: 'dark',
        text: 'Статьи',
        title: 'Управление статьями',
        buttons: (path) => {
          new El().Button({
            path: path,
            cName: (this.author && this.author.rules.topics.favorite) ? 'button favorite' : 'button',
            text: '💘',
            onclick: () => {
              this.findOrAdd({id:uID, name:uName, type:'users', r:'topics', key:'favorite'}).then(res => {
                if(res) checkFeeds(false, true);
                console.log('User', mainCfg['script data']);
              });
            }
          });
          new El().Button({
            path: path,
            cName: 'button',
            text: '💢',
            onclick: () => {
              this.findOrAdd({id:uID, name:uName, type:'users', r:'topics', key:'ignored'}).then(res => {
                if(res) checkFeeds(false, true);
                console.log('User', mainCfg['script data']);
              });
            }
          });
          new El().Button({
            path: path,
            cName: 'button',
            text: '🚫',
            onclick: () => {
              this.findOrAdd({id:uID, name:uName, type:'users', r:'topics', key:'blocked'}).then(res => {
                if(res) checkFeeds(false, true);
                console.log('User', mainCfg['script data']);
              });
            }
          });
        }
      });
      this.MenuButton({
        path: this.list,
        cName: 'dark',
        text: 'Блоги',
        title: 'Управление блогами',
        buttons: (path) => {
          new El().Button({
            path: path,
            cName: 'button',
            text: '💘',
            onclick: () => {
              this.findOrAdd({id:uID, name:uName, type:'users', r:'topics', key:'favorite'});
              console.log(mainCfg['script data']);
            }
          });
          new El().Button({
            path: path,
            cName: 'button',
            text: '💢',
            onclick: () => {
              this.findOrAdd({id:uID, name:uName, type:'users', r:'topics', key:'ignored'});
              console.log(mainCfg['script data']);
            }
          });
          new El().Button({
            path: path,
            cName: 'button',
            text: '🚫',
            onclick: () => {
              this.findOrAdd({id:uID, name:uName, type:'users', r:'topics', key:'blocked'});
              console.log(mainCfg['script data']);
            }
          });
        }
      });
      this.MenuButton({
        path: this.list,
        cName: 'dark',
        text: 'Комментарии',
        title: 'Управление комментариями',
        buttons: (path) => {
          new El().Button({
            path: path,
            cName: this.user && this.user.rules.comments.favorite ? 'button favorite' : 'button',
            text: '💘',
            onclick: () => {
              this.findOrAdd({id:uID, name:uName, type:'users', r:'comments', key:'favorite'});
              console.log(mainCfg['script data']);
            }
          });
          new El().Button({
            path: path,
            cName: this.user && this.user.rules.comments.ignored ? 'button ignored' : 'button',
            text: '💢',
            onclick: () => {
              this.findOrAdd({id:uID, name:uName, type:'users', r:'comments', key:'ignored'});
              console.log(mainCfg['script data']);
            }
          });
          new El().Button({
            path: path,
            cName: this.user && this.user.rules.comments.blocked ? 'button blocked' : 'button',
            text: '🚫',
            onclick: () => {
              this.findOrAdd({id:uID, name:uName, type:'users', r:'comments', key:'blocked'});
              console.log(mainCfg['script data']);
            }
          });
        }
      });

      if(type === 'topic'){
        this.rs(this.list, 'Подсайт');
        this.MenuButton({
          path: this.list,
          cName: 'dark',
          text: 'Статьи',
          title: 'Управление статьями',
          buttons: (path) => {
            new El().Button({
              path: path,
              cName: (this.subsite && this.subsite.rules.topics.favorite) ? 'button favorite' : 'button',
              text: '💘',
              onclick: () => {
                this.findOrAdd({id:sID, name:sName, type:'subsites', r:'topics', key:'favorite'});
                checkFeeds(false, true);
                console.log('Subsite', data);
              }
            });
            new El().Button({
              path: path,
              cName: 'button',
              text: '💢',
              onclick: () => {
                this.findOrAdd({id:sID, name:sName, type:'subsites', r:'topics', key:'ignored'});
                console.log(mainCfg['script data']);
              }
            });
            new El().Button({
              path: path,
              cName: 'button',
              text: '🚫',
              onclick: () => {
                this.findOrAdd({id:sID, name:sName, type:'subsites', r:'topics', key:'blocked'});
                console.log(mainCfg['script data']);
              }
            });
          }
        });
        this.MenuButton({
          path: this.list,
          cName: 'dark',
          text: 'Блоги',
          title: 'Управление блогами',
          buttons: (path) => {
            new El().Button({
              path: path,
              cName: 'button',
              text: '💘',
              onclick: () => {
                this.findOrAdd({id:uID, name:sName, type:'subsites', r:'topics', key:'favorite'});
                console.log(mainCfg['script data']);
              }
            });
            new El().Button({
              path: path,
              cName: 'button',
              text: '💢',
              onclick: () => {
                this.findOrAdd({id:uID, name:sName, type:'subsites', r:'topics', key:'ignored'});
                console.log(mainCfg['script data']);
              }
            });
            new El().Button({
              path: path,
              cName: 'button',
              text: '🚫',
              onclick: () => {
                this.findOrAdd({id:uID, name:sName, type:'subsites', r:'topics', key:'blocked'});
                console.log(mainCfg['script data']);
              }
            });
          }
        });
        this.MenuButton({
          path: this.list,
          cName: 'dark',
          text: 'Комментарии',
          title: 'Управление комментариями',
          buttons: (path) => {
            new El().Button({
              path: path,
              cName: this.subsite && this.subsite.rules.comments.favorite ? 'button favorite' : 'button',
              text: '💘',
              onclick: () => {
                this.findOrAdd({id:uID, name:sName, type:'subsites', r:'comments', key:'favorite'});
                checkComments();
                console.log(mainCfg['script data']);
              }
            });
            new El().Button({
              path: path,
              cName: 'button',
              text: '💢',
              onclick: () => {
                this.findOrAdd({id:uID, name:sName, type:'subsites', r:'comments', key:'ignored'});
                t.parentNode.classList.toggle('ignored');
                console.log(mainCfg['script data']);
              }
            });
            new El().Button({
              path: path,
              cName: 'button',
              text: '🚫',
              onclick: () => {
                this.findOrAdd({id:uID, name:sName, type:'subsites', r:'comments', key:'blocked'});
                t.parentNode.classList.toggle('blocked');
                console.log(mainCfg['script data']);
              }
            });
          }
        });
        this.rs(this.list, 'Фид');
        this.MenuButton({
          path: this.list,
          cName: 'dark',
          text: 'Фид',
          title: 'Управление фидом',
          buttons: (path) => {
            new El().Button({
              path: path,
              cName: (this.author && this.author.rules.watched) ? 'button watched' : 'button',
              text: '✔️',
              onclick: () => {
                this.findOrAdd({id:fID, type:'feeds', key:'watched'}).then(res => {
                  if(res) checkFeeds(false, true);
                  console.log('Feeds', mainCfg['script data'].feeds);
                });
                // checkFeeds(false, true);
              }
            });
            new El().Button({
              path: path,
              cName: (this.feeds && this.feeds.rules.planToRead) ? 'button planToRead' : 'button',
              text: '📚',
              onclick: () => {
                this.findOrAdd({id:fID, type:'feeds', key:'planToRead'}).then(res => {
                  if(res) checkFeeds(false, true);
                  console.log('Feeds', mainCfg['script data'].feeds);
                });
              }
            });
            new El().Button({
              path: path,
              cName: (this.author && this.author.rules.onHold) ? 'button onHold' : 'button',
              text: '📖',
              onclick: () => {
                this.findOrAdd(fID, false, 'feeds', false, 'onHold');
                checkFeeds(false, true);
                console.log('Feeds', mainCfg['script data'].feeds);
              }
            });
            new El().Button({
              path: path,
              cName: 'button',
              text: '💢',
              onclick: () => {
                this.findOrAdd(fID, false, 'feeds', 'topics', 'ignored');
                console.log(mainCfg['script data']);
              }
            });
            new El().Button({
              path: path,
              cName: 'button',
              text: '🚫',
              onclick: () => {
                this.findOrAdd(fID, false, 'feeds', 'topics', 'blocked');
                console.log(mainCfg['script data']);
              }
            });
          }
        });
      }
      this.main.focus();
    }
    MenuButton({path, cName, text, title, buttons}){
      let main=document.createElement('div');
      main.className=`dtf-menuButton${cName ? ` ${cName}` : ''}`;
      main.textContent=text;
      if(title) main.title=title;
      path.appendChild(main);

      let list=document.createElement('div');
      list.className='menuList';
      main.appendChild(list);

      buttons(list);
    }
    userCard(t, user){
      const main=new El().Div({
        path: document.body,
        cName: 'dtf-fyiWindow usercard',
        style: `
        top: ${t.getBoundingClientRect().top}px;
        left: ${t.getBoundingClientRect().left}px;`,
        onblur: () => {
          setTimeout(() => {
            main.remove();
          }, 400);
        },
        tab: -1,
        rtn: true
      });
      const header=new El().Div({
        path: main,
        cName: 'header',
        rtn: true,
        onclick: () => {
          main.remove();
        }
      });
      new El().Div({
        path: header,
        cName: 'label',
        text: 'USER CARD'
      });

      const list=new El().Div({
        path: main,
        cName: 'list lGap-10 tGap-5',
        rtn: true
      });

      const maskCover=new El().Div({
        path: list,
        cName: 'mask cover',
        rtn: true
      });
      if(user.subsite.cover && user.subsite.cover.data.type !== 'gif'){
        new El().Image({
          path: maskCover,
          cName: 'img',
          url: `https://leonardo.osnova.io/${user.subsite.cover.data.uuid}`
        });
      }

      const sub1=new El().Div({
        path: list,
        cName: 'colList lGap-5',
        rtn: true
      });
      const mask=new El().Div({
        path: sub1,
        cName: 'mask avatar',
        tab: '-1',
        rtn: true,
        onclick: (e) => {
          if(e.button === 2) e.preventDefault();
        },
        onRclick: (e) => {
          e.preventDefault();
          this.avatarMenu(e.target, user.subsite.avatar && user.subsite.avatar.data.uuid);
        }
      });
      if(user.subsite.avatar){
        user.subsite.avatar.data.type !== 'gif' ? new El().Image({
          path: mask,
          cName: 'img',
          url: `https://leonardo.osnova.io/${user.subsite.avatar.data.uuid}`
        }) :
        new El().Video({
          path: mask,
          cName: 'img',
          url: `https://leonardo.osnova.io/${user.subsite.avatar.data.uuid}`,
          onclick: (e) => {
            e.play();
          }
        });
      }
      const c1=new El().Div({
        path: sub1,
        cName: 'subList ver tGap-5 fullWidth',
        rtn: true
      });
      new El().Div({
        path: c1,
        title: 'Никнейм',
        text: `📛\uFE0E ${user.subsite.name}`
      });
      new El().Div({
        path: c1,
        title: 'Аккаунт создан',
        text: `📅 ${this.getTime(user.subsite.created * 1000)}`
      });
      new El().Div({
        path: c1,
        cName: user.subsite.rating > 0 ? 'positive' : 'negative',
        title: 'Рейтинг',
        text: `📊 ${user.subsite.rating||'-'}`
      });
      new El().Div({
        path: c1,
        cName: 'manyText scrollLite',
        title: 'Описание',
        text: `📔\uFE0E ${user.subsite.description||''}`
      });
      new El().Button({
        path: c1,
        cName: 'btn',
        title: 'Ссылка на профиль',
        text: `Профиль 🔗\uFE0E`,
        onclick: () => {
          window.open(user.subsite.url, '_blank');
        }
      });

      const sub2=new El().Div({
        path: list,
        cName: 'colList',
        rtn: true
      });

      const c3=new El().Div({
        path: sub2,
        cName: 'subList hor lGap-5',
        rtn: true
      });
      new El().Div({
        path: c3,
        title: user.subsite.isOnline ? 'Онлайн' : 'Оффлайн',
        cName: !user.subsite.isOnline && 'off',
        text: '📶\uFE0E'
      });
      new El().Div({
        path: c3,
        title: user.subsite.isPlus && 'Плюс',
        cName: !user.subsite.isPlus && 'off',
        text: '➕\uFE0E'
      });
      new El().Div({
        path: c3,
        title: user.subsite.isPro && 'Про',
        cName: !user.subsite.isPro && 'off',
        text: '💼\uFE0E'
      });
      new El().Div({
        path: c3,
        title: user.subsite.isVerified && 'Подтверждён',
        cName: !user.subsite.isVerified && 'off',
        text: '✔️\uFE0E'
      });

      const sub3=new El().Div({
        path: list,
        cName: 'colList',
        rtn: true
      });

      const c4=new El().Div({
        path: sub3,
        cName: 'subList ver tMar-10 tGap-5',
        rtn: true
      });
      new El().Div({
        path: c4,
        title: 'Комментариев',
        text: `📜\uFE0E ${user.subsite.counters.comments}`
      });
      new El().Div({
        path: c4,
        title: 'Статей',
        text: `📰\uFE0E ${user.subsite.counters.entries}`
      });
      new El().Div({
        path: c4,
        title: 'Подписчиков',
        text: `🔭\uFE0E ${user.subsite.counters.subscribers}`
      });
      new El().Div({
        path: c4,
        title: 'Подписок',
        text: `📬\uFE0E ${user.subsite.counters.subscriptions}`
      });

      this.main.focus();
    }
    avatarMenu(t, aUrl){
      if(document.getElementById('dtf-userMenu')) return;
      const main=new El().Div({
        path: document.body,
        cName: `dtf-menu`,
        id: 'dtf-userMenu',
        tab: -1,
        style: `
        top: ${t.getBoundingClientRect().top + (window.scrollY||window.scrollHeight||0) + t.getBoundingClientRect().height}px;
        left: ${t.getBoundingClientRect().left}px`,
        rtn: [],
        onblur: () => {
          setTimeout(() => {
            main.remove();
          }, 100);
        }
      });

      new El().Div({
        path: main,
        cName: 'header',
        text: 'Меню аватарки',
        onclick: () => {
          main.remove();
        }
      });

      const list=new El().Div({
        path: main,
        cName: 'list',
        rtn: []
      });

      new El().Button({
        path: list,
        cName: 'button',
        text: 'Ссылка на аватарку',
        onclick: () => {
          window.open(`https://leonardo.osnova.io/${aUrl}`, '_blank');
        }
      });
      new El().Button({
        path: list,
        cName: 'button',
        text: 'Копировать ссылку на аватарку',
        onclick: () => {
          navigator.clipboard.writeText(`https://leonardo.osnova.io/${aUrl}`);
        }
      });
      this.rs(list, 'Поиск сурса');
      mainCfg.usercard.avatar.search.list.forEach(e => {
        if(e.use) new El().Button({
          path: list,
          cName: 'button',
          text: e.name,
          onclick: () => {
            window.open(`${e.url}https://leonardo.osnova.io/${aUrl}`, '_blank');
            // document.activeElement.blur();
          }
        });
      })
      main.focus();
    }
  }

  new El().Css('DTF-User Block', css(mainCfg));
  new El().Css('DTF-core', dtfCoreCSS, true);

  document.body.oncontextmenu = (e) => {
    if(!e.target.className) return;
    if(!e.button === 2) return;
    if(e.target.className === 'comment__author'){
      e.preventDefault();
      e.stopImmediatePropagation();
      new UserMenu().build({t: e.target, uID: e.target.closest('.comment').getAttribute('data-user_id'), uName: e.target.textContent.trim(), type: 'comment'});
    }else
    if(e.target.className === 'content-header-author__name'){
      e.preventDefault();
      e.stopImmediatePropagation();
      const control = e.target.closest('.content-header').querySelector(`.content-header__item--controls`).children[0];
      new UserMenu().build({t: e.target, uID: control.getAttribute('data-user-id'), sID: control.getAttribute('data-subsite-id'), fID: control.getAttribute('data-content-id'), uName: e.target.textContent.trim(), sName: control.getAttribute('data-subsite-name'), type: 'topic'});
    }
  }

  function run(){
    widget=new Widget().main();
    new Feeds().widgetItem(widget);
    if(getPageType(document.location.href).type && getPageType(document.location.href).type.match(/popular|^new$|^my new$|bookmarks|subsite|userpage|topic/)){
      checkFeeds();
      !obs.feeds ? obsFeeds('start') : obsFeeds('restart');
    }
  }

  new El().onPageLoad(() => {
    run();
  });


})();
