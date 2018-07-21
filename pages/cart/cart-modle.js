import Base from '../../utils/base';
/*
* 购物车数据存放在本地，
* 当用户选中某些商品下单购买时，会从缓存中删除该数据，更新缓存
* 当用用户全部购买时，直接删除整个缓存
*
*/
class Cart extends Base{
  constructor(){
    super();
    this._storageKeyName='cart';
  }
  /*
  * 加入到购物车
  * 如果之前没有样的商品，则直接添加一条新的记录， 数量为 counts
  * 如果有，则只将相应数量 + counts
  * @params:
  * item - {obj} 商品对象,
  * counts - {int} 商品数目,
  * */
  add(item, counts){
    let cartData = this.getCartDataFromLocal();
    let isHasInfo = this._isHasThatOne(item.id,cartData);
    if (isHasInfo.index === -1){
      item.counts=counts;
      item.selectStatus=true;//设置选中状态
      cartData.push(item)//添加新商品到购物车数据
    }else{
      cartData[isHasInfo.index].counts += counts;
    }
    wx.setStorageSync(this._storageKeyName, cartData);
  }
  /*
  * 从缓存中读取购物车数据
  * param
  * flag - {bool} 是否过滤掉不下单的商品
  */
  getCartDataFromLocal(){
    let res = wx.getStorageSync(this._storageKeyName);
    if(!res){
      res=[]
    }
    return res;
  }
  /*
  *获得购物车商品总数目,包括分类和不分类
  * param:
  * flag - {bool} 是否区分选中和不选中
  * return
  * counts1 - {int} 不分类
  * counts2 -{int} 分类
  */
  getCartTotalCounts(flag){
    let data = this.getCartDataFromLocal();
    let counts=0;

    for(let i=0;i<data.length;i++){
      if(flag){
        if(data[i].selectStatus){
          counts += data[i].counts;
        }
      }
      
    }
    return counts;
  }
  /*购物车中是否已经存在该商品*/
  _isHasThatOne(id,arr){
    let item,
    result = {index:-1};
    for(let i=0;i<arr.length;i++){
      item=arr[i];
      if(item.id==id){
        result={
          index:i,
          data:item
        };
        break;
      }
    }
    return result;
  }
}

export default Cart;