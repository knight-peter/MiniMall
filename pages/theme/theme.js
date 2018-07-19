// pages/theme/theme.js
import Theme from './theme-model';
let theme= new Theme();//实例化 主题列表对象

Page({

  /**
   * 页面的初始数据
   */
  data: {
    themeInfo:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    let name = options.name;
    this.data.id=id;
    this.data.name=name;
    this._loadData();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  
  
  _loadData:function(){
    let that=this;
    theme.getProductsData(that.data.id,(res)=>{
      console.log('主题页面：',res.data)
      that.setData({
        themeInfo: res.data
      })
      // 动态设置当前页面的标题
      theme.setPageTitle(res.data.description)
    })
  },
  /* 页面跳转 */
  onProductsItemTap: function (event) {
    var id = theme.getDataSet(event, 'id')
    wx.navigateTo({
      url: `../product/product?id=${id}`
    })
  },
})