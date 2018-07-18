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
}

export default Base