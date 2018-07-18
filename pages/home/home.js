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
    let that=this
    let id = 1;
    // 获得首页顶部banner数据
    home.getBannerData(id,(res)=>{
      console.log('头部banner：',res)
      that.setData({
        bannerArr: res.items,
      });
    });
    // 获取精品主题数据
    home.getThemeData((res)=>{
      console.log('获取精品主题数据:',res)
      that.setData({
        themeArr:res.data
      })
    })
    /* 获取最新单品 */
    home.getProductorData((res)=>{
      console.log('获取最新单品：',res)
      that.setData({
        productsArr:res.data
      })
      // callback && callback()
    })
  },
  
})