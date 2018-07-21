// pages/cart/cart.js
import Cart from './cart-modle.js';
let cart = new Cart();

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onload')
  },

  /**
   * 生命周期函数--监听页面显示,切换页面时显示
   */
  onShow: function () {
    let cartData=cart.getCartDataFromLocal();
    //let countsInfo=cart.getCartTotalCounts(true);//获取被勾选的商品数
    let cal = this._calcTotalAccountAndCounts(cartData);

    this.setData({
      selectedCounts: cal.selectedCounts,
      selectedTypeCounts: cal.selectedTypeCounts,
      account:cal.account,
      cartData:cartData,
    })
  },
  /*计算总价*/
  _calcTotalAccountAndCounts:function(data){
    let len =data.length,
    account=0,//需要计算的总价格，但是要注意排除掉未选中的商品
    selectedCounts=0,//购买商品的总个数
    selectedTypeCounts=0;//购买商品种类的总数
    let multiple=100;//倍数

    for(let i = 0; i<len; i++){
      // 避免浮点数计算精度问题，把浮点数转换成整数计算
      if(data[i].selectStatus){
        account += data[i].counts*multiple*Number(data[i].price)*multiple;
        selectedCounts += data[i].counts;
        selectedTypeCounts++;
      }
    }

    return {
      selectedCounts:selectedCounts,
      selectedTypeCounts:selectedTypeCounts,
      account:account/(multiple*multiple)
    }
  }
  
})