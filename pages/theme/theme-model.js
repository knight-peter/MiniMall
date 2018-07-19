import Base from '../../utils/base';

class Theme extends Base{
  constructor(){
    super();
  }

  /*获取主题下的商品列表*/
  /*对应主题的id号*/
  getProductsData(id,callback){
    let param={
      url:`theme/${id}`,
      sCallback(res){
        callback && callback(res);
      }
    }
    this.request(param)
  }
}

export default Theme