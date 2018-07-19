// pages/product/product.js
import Product from './product-modle';
let product = new Product();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    product:null,
    countsArray:[1,2,3,4,5,6,7,8,9,10],
    productCount:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id=options.id;
    this.data.id=id;
    this._loadData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  _loadData:function(){
    let that = this;
    product.getDetailInfo(that.data.id, (res) => {
      console.log('商品详情：', res.data)
      let name=res.data.name;
      let index_name=name.indexOf(' ')
      let product_name=name.slice(0,index_name)//截取商品名称字符串
      that.setData({
        product: res.data
      })
      // 动态设置当前页面的标题
      product.setPageTitle(product_name)
    })
  },
  /*选择购买数目*/
  bindPickerChange:function(event){
    this.setData({
      productCount: this.data.countsArray[event.detail.value]
    })
  }
})