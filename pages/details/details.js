// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0
  },

  onLoad(options) {
    this.setData({
      id: options.id
    })
    this.getNews()
  },

  getNews() {
    console.log(this.data.id)
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: this.data.id
      },
      success: res => {
        let result = res.data.result
        let arr = result.content
        this.setData({
          id: result.id,
          content: arr
      })
     }
   })
  }
})