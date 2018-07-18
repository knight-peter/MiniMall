import Base from '../../utils/base'

class Home extends Base {
  constructor() {
    super()
  }
  /*banner图片信息*/
  getBannerData(id,callback) {
    var params ={
      url: `banner/${id}`,
      sCallback(res){
        callback && callback(res.data)
      }
    }
    this.request(params);
  }
  /*首页主题*/
  getThemeData(callback){
    var params={
      url:`theme?ids=1,2,3`,
      sCallback(data){
        callback && callback(data)
      }
    }
    this.request(params)
  }
  /*首页部分商品*/
  getProductorData(callback){
    var params={
      url: 'product/recent',
      sCallback(res){
        callback && callback(res)
      }
    }
    this.request(params)
  }
}

export default Home