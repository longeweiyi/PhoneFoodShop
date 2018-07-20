<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
  *{margin: 0; padding: 0;}
  body {font-size: 14px;font-family: "微软雅黑";color: #333;
  }
  ul, ol, dl {list-style: none;}
  a {text-decoration: none;}
  .ft-l {float: left;}
  .ft-r {float: right;}
  .cl-b {clear: both;}
  .mint-swipe-item img {width: 100%;height: 100%;vertical-align: top;}
  .loadAll{text-align: center;padding: 10px 0}
  .loadMore{display: block;width: 36px;height: 36px;margin: 0 auto;background: url(assets/images/common/loadMore.gif) no-repeat center center;background-size: 100%}
  img[lazy=loading] {width: 100%;height: 100%;background: url(assets/images/common/loading.gif) no-repeat center center;background-size: 100%}
</style>
