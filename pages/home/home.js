// pages/home/home.js
import Home from './home-model'
const home = new Home()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onLoad:function(){
    this._loadData();
  },
  _loadData:function(){
    let id = 1;
    let data = home.getBannerData(id,(res)=>{
      console.log('头部banner：',res)
    });
  },
  
})