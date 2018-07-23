// pages/cart/cart.js
import Cart from './cart-modle.js';
let cart = new Cart();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden: false,
    selectedCounts: 0, //总的商品数
    selectedTypeCounts: 0, //总的商品类型数
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
  onHide:function(){
    cart.execSetStorageSync(this.data.cartData);
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
  },
  /*勾选商品*/
  toggleSelect:function(event){
    let id=cart.getDataSet(event,'id'),
      status=cart.getDataSet(event,'status'),
      index = this._getProductIndexById(id);//获取勾选商品的下标
    
    this.data.cartData[index].selectStatus = !status;//将勾选商品的勾选状态selectStatus修改成相反值
    this._resetCartData();
  },
  /*重新计算总金额和商品总数*/
  _resetCartData:function(){
    let newData = this._calcTotalAccountAndCounts(this.data.cartData);
    this.setData({
      account:newData.account,
      selectedCounts:newData.selectedCounts,
      selectedTypeCounts:newData.selectedTypeCounts,
      cartData:this.data.cartData
    })
  },
  /*全选*/
  toggleSelectAll:function(event){
    let status=cart.getDataSet(event,'status')=='true';//因为获取到的是字符串，所以需要做一个逻辑判断，来获得真正的true或者false
    let data=this.data.cartData,
    len =data.length;
    for(let i=0;i<len;i++){
      data[i].selectStatus = !status;//将商品勾选状态selectStatus修改成相反值
    }
    this._resetCartData();
  },
  /*根据商品id得到 商品所在下标*/
  _getProductIndexById:function(id){
    let data=this.data.cartData,
    len=data.length;
    for(let i=0;i<len;i++){
      if(data[i].id==id){
        return i;
      }
    }
  },
  /*修改商品数量*/
  changeCounts:function(event){
    let id=cart.getDataSet(event,'id'),
    type = cart.getDataSet(event,'type'),
    index = this._getProductIndexById(id),
    counts=1;

    if(type==='add'){
      cart.addCounts(id);
    }else{
      counts=-1;
      cart.cutCounts(id);
    }

    this.data.cartData[index].counts += counts;
    this._resetCartData();
  },
  /*删除商品*/
  delete:function(event){
    let that=this;
    let id= cart.getDataSet(event,'id'),
    index = this._getProductIndexById(id);

    wx.showModal({
      title: '提示',
      content: '确定要删除该商品吗？',
      success: function (res) {
        if (res.confirm) {
          that.data.cartData.splice(index, 1);//删除某一项商品
          that._resetCartData();
          cart.delete(id);
        }else if(res.cancel){
          console.log('用户点击取消')
        }
      }
    })
    
  }
})