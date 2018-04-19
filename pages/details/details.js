// pages/details/details.js
Page({
  data: {
    id: 0,
    title: '',
    source: '',
    time: '',
    readCount: '',
    contents: '',
    defaultImage: '/images/default.png'
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
        this.setNewsDetails(res)
     }
   })
  },
  
  setNewsDetails(res) {
    let result = res.data.result
    let arr = result.content
    let newsTime = new Date(result.date)
    let hour = newsTime.getHours()
    let minutes = newsTime.getMinutes()
    hour = hour < 10 ? '0' + hour : hour
    minutes = minutes < 10 ? '0' + minutes : minutes
    this.setData({
      title: result.title,
      source: result.source == '' ? '来源不明' : result.source,
      time: hour + ':' + minutes,
      readCount: result.readCount,
      contents: arr
    })
  }
})