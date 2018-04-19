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
    newsCategories: ['国内','国际','财经','娱乐','军事','体育','其他'],
    lg_id: 0,
    lg_image: '',
    hot_news_title: '',
    hot_news_resource: '',
    hot_news_time: '',
    default_image: '/images/default.png',
    id: 0,
    title: '',
    sm_image: '',
    source: '',
    time: '',
    type: '',
    currentItem: '',
    currentCategory: '',
    newsList: []
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
        this.setNewsList(res)
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

  setNewsList(res) {
    let newsList = [] 
    let result = res.data.result  
    for (let i = 0; i < result.length; i++) {
      let newsTime = new Date(result[i].date)
      let hour = newsTime.getHours()
      let minutes = newsTime.getMinutes() 
      hour = hour < 10 ? '0' + hour : hour
      minutes = minutes < 10 ? '0' + minutes : minutes
      i == 0 ? this.setData({
        lg_id: result[i].id,
        lg_image: result[i].firstImage == '' ? this.data.default_image : result[i].firstImage,
        hot_news_title: result[i].title,
        hot_news_resource: result[i].source == '' ? '来源不明' : result[i].source,
        hot_news_time: hour + ':' + minutes
      }) : newsList.push({
        id: result[i].id,
        title: result[i].title,
        sm_image: result[i].firstImage == '' ? this.data.default_image : result[i].firstImage,
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
      type: categoryMap[category],
      currentCategory: category
    }),
    this.getNews()
  },
  
  onTapNews(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/details/details?id=' + id,
    })
  }
 })
