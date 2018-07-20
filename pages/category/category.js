// pages/category/category.js
import Category from './category-model.js';
let category=new Category();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    transClassArr: ['tanslate0', 'tanslate1', 'tanslate2', 'tanslate3', 'tanslate4', 'tanslate5'],
    currentMenuIndex: 0,
    categoryTypeArr:[],
    categoryProducts:null,
    loadingHidden: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  _loadData:function(callback){
    let that = this;
    // 获取所有分类
    category.getCategoryType((res)=>{
      console.log('所有分类-categoryTypeArr：', res.data)
      that.setData({
        categoryTypeArr: res.data
      })
      // 一定要在回调里再进行获取分类
      // 因为在箭头函数中，所以that指向函数本身
      // 获得某种分类的商品
      category.getProductsByCategory(res.data[0].id, (data) => {
        var dataObj = {
          procucts: data,
          topImgUrl: res.data[0].img.url,
          title: res.data[0].name
        };
        that.setData({
          loadingHidden: true,
          categoryInfo0: dataObj
        });
        // callback && callback();
      });
    })
  },
  /*切换分类*/
  changeCategory:function(event){
    let index = category.getDataSet(event, 'index'),
      id = category.getDataSet(event, 'id')//获取data-set
    this.setData({
      currentMenuIndex: index
    });
    // 如果数据是第一次请求
    if(!this.isLoadedData(index)){
      let that=this;
      // 获得分类商品
      category.getProductsByCategory(id, (data) => {
        console.log('获得分类商品：',{
          index:index,
          id:id,
          data:data
        })
        that.setData(that.getDataObjForBind(index, data));
      });
    }
  },
  /*判断是否加载过数据*/
  isLoadedData: function (index) {
    if (this.data['categoryInfo' + index]) {
      return true;
    }
    return false;
  },
  // 更新分类商品数据
  getDataObjForBind: function (index, data) {
    var obj = {},
      arr = [0, 1, 2, 3, 4, 5],
      baseData = this.data.categoryTypeArr[index];
    for (var item in arr) {
      if (item == arr[index]) {
        obj['categoryInfo' + item] = {
          procucts: data,
          topImgUrl: baseData.img.url,
          title: baseData.name
        };

        return obj;
      }
    }
  },
  /*获取某类商品详情*/
  // getProductsByCategory: function (id, callback) {
  //   category.getProductsByCategory(id, (data) => {
  //     callback && callback(data);
  //   });
  // },
  /*跳转到商品详情*/
  onProductsItemTap: function (event) {
    var id = category.getDataSet(event, 'id');
    wx.navigateTo({
      url: '../product/product?id=' + id
    })
  },
})