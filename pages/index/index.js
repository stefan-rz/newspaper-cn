//index.js
const categoryMap = {
  '国内': 'gn',
  '国际': 'gj',
  '财经': 'cj',
  '娱乐': 'yl',
  '军事': 'js',
  '体育': 'ty',
  '其他': 'other'
}
Page({
  data: {
    newsCategories: ['国内','国际','财经','娱乐','军事','体育','其他']
  },
  onLoad() {
    this.setData({
      type: 'gn'
    })
    this.getNews()
  },
  getNews(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: this.data.type
      },
      success: res => {
        this.setHotNewsAndNewsList(res)
      },
      complete: () => {
        callback && callback()
      }
    })
  },

  onPullDownRefresh() {
    this.getNews(() => {
      wx.stopPullDownRefresh()
    })
  },

  setHotNewsAndNewsList(res) {
    let result = res.data.result
    let newsTime = new Date(result[0].date)
    let hour = newsTime.getHours()
    let minutes = newsTime.getMinutes()
    hour = hour < 10 ? '0' + hour : hour
    minutes = minutes < 10 ? '0' + minutes : minutes
    this.setData({
      lg_id: result[0].id,
      lg_image: result[0].firstImage,
      hot_news_title: result[0].title,
      hot_news_resource: result[0].source == '' ? '来源不明' : result[0].source,
      hot_news_time: hour + ':' + minutes
    }),
      this.setNewsList(result)
  },

  setNewsList(result) {
    let newsList = []
    
    for (let i = 1; i < result.length; i++) {
      let newsTime = new Date(result[i].date)
      let hour = newsTime.getHours()
      let minutes = newsTime.getMinutes() 
      hour = hour < 10 ? '0' + hour : hour
      minutes = minutes < 10 ? '0' + minutes : minutes
      newsList.push({
        id: result[i].id,
        title: result[i].title,
        sm_image: result[i].firstImage,
        source:result[i].source == '' ? '来源不明' : result[i].source,
        time: hour + ':' + minutes
      })
    }
    this.setData({
      newsList: newsList
    })
  },

  onTapCategory(e) {
    let category = e.currentTarget.dataset.category
    this.setData({
      type: categoryMap[category]
    }),
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: categoryMap[category]
      },
      success: res => {
        this.setHotNewsAndNewsList(res)
      }
    })
  },
  
  onTapNews(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/details/details?id=' + id,
    })
  }
 })
