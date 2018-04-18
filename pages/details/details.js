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
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: this.data.id
      },
      success: res => {
        let result = res.data.result
        console.log(result)
        let arr = result.content
        let newsTime = new Date(result.date)
        let hour = newsTime.getHours()
        let minutes = newsTime.getMinutes()
        hour = hour < 10 ? '0' + hour : hour
        minutes = minutes < 10 ? '0' + minutes : minutes
        this.setData({
          firstImage:result.firstImage,
          title: result.title,
          source: result.source == '' ? '来源不明' : result.source,
          time: hour + ':' + minutes,
          readCount: result.readCount,
          contents: arr
      })
     }
   })
  }
})