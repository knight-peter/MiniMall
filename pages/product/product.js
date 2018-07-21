// pages/product/product.js
import Product from './product-modle';
import Cart from '../cart/cart-modle'
let product = new Product();
let cart = new Cart();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    product:null,
    countsArray:[1,2,3,4,5,6,7,8,9,10],
    productCounts:1,
    tabs: ['商品详情', '产品参数', '售后保障'],
    currentTabsIndex:0,
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
        cartTotalCounts: cart.getCartTotalCounts(),//从缓存Storage中获取购物车商品总数目
        product: res.data
      })
      // 动态设置当前页面的标题
      product.setPageTitle(product_name)
    })
  },
  /*选择购买数目*/
  bindPickerChange:function(event){
    this.setData({
      productCounts: this.data.countsArray[event.detail.value]
    })
  },
  /*选项卡*/
  onTabsItemTap:function(event){
    let index=product.getDataSet(event,'index');//获取data-index的值
    this.setData({
      currentTabsIndex:index
    })
  },
  // 加入购物车
  /*添加到购物车*/
  onAddingToCartTap: function (events) {
    //防止快速点击
    if (this.data.isFly) {
      return;
    }
    this._flyToCartEffect(events);
    this.addToCart();
    // let counts=this.data.cartTotalCount+this.data.productCount;
    // this.setData({
    //   cartTotalCounts: cart.getCartTotalCounts()//从缓存Storage中获取购物车商品总数目
    // })
  },

  /*将商品数据添加到内存中*/
  addToCart: function () {
    var tempObj = {}, keys = ['id', 'name', 'main_img_url', 'price'];
    for (var key in this.data.product) {
      if (keys.indexOf(key) >= 0) {
        tempObj[key] = this.data.product[key];
      }
    }

    cart.add(tempObj, this.data.productCounts);
  },

  /*加入购物车动效*/
  _flyToCartEffect: function (events) {
    //获得当前点击的位置，距离可视区域左上角
    var touches = events.touches[0];
    var diff = {
      x: '25px',
      y: 25 - touches.clientY + 'px'
    },
      style = 'display: block;-webkit-transform:translate(' + diff.x + ',' + diff.y + ') rotate(350deg) scale(.35,.35)';  //移动距离
    this.setData({
      isFly: true,
      translateStyle: style
    });
    var that = this;
    setTimeout(() => {
      that.setData({
        isFly: false,
        translateStyle: '-webkit-transform: none;',  //恢复到最初状态
        isShake: true,
      });
      setTimeout(() => {

        var counts = that.data.cartTotalCounts + that.data.productCounts;
        that.setData({
          isShake: false,
          cartTotalCounts: counts
        });
      }, 200);
    }, 1000);
  },

  /*跳转到购物车*/
  onCartTap: function () {
    wx.switchTab({
      url: '/pages/cart/cart'
    });
  },
})