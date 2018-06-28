class Home {
  constructor() {}
  getBannerData(id) {
    wx.request({
      url: `http://www.xcs.com/api/v1/banner/${id}`,
      method: 'GET',
      success: function (res) {
        return res;
      }
    })
  }
}

export {Home}