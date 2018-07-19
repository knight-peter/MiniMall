import Config from './config'

class Base{
  constructor(){
    this.baseRequestUrl =Config.restUrl
  }

  request(params){
    let url = this.baseRequestUrl + params.url;
    wx.request({
      url: url,
      data: params.data,
      method: params.type||'GET',
      header:{
        'content-type':'application/json',
        'token':wx.getStorageSync('token')
      },
      success:function(res){
        params.sCallback && params.sCallback(res)
      },
      fail:function(err){
        console.log('错误：',err)
      }
    })
  }
  /* 获得元素上绑定的值 */
  getDataSet(event, key) {
    return event.currentTarget.dataset[key]
  }
  /*动态设置当前页面的标题*/
  setPageTitle(title) {
    wx.setNavigationBarTitle({
      title: title,
    });
  }
}

export default Base