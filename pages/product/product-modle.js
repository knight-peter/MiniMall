import Base from '../../utils/base';

class Product extends Base{
  constructor(){
    super();
  }
  getDetailInfo(id,callback){
    let param={
      url:`product/${id}`,
      sCallback(res){
        callback && callback(res)
      }
    }
    this.request(param)
  }
}

export default Product