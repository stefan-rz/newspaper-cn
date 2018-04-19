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
    lgId: 0,
    lgImage: '',
    hotNewsTitle: '',
    hotNewsResource: '',
    hotNewsTime: '',
    defaultImage: '/images/default.png',
    id: 0,
    title: '',
    smImage: '',
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
        lgId: result[i].id,
        lgImage: (result[i].firstImage == '' || result[i].source == undefined) ? this.data.defaultImage : result[i].firstImage,
        hotNewsTitle: result[i].title,
        hotNewsResource: (result[i].source == '' || result[i].source == undefined) ? '来源不明' : result[i].source,
        hotNewsTime: hour + ':' + minutes
      }) : newsList.push({
        id: result[i].id,
        title: result[i].title,
        smImage: (result[i].firstImage == '' || result[i].source == undefined) ? this.data.defaultImage : result[i].firstImage,
        source: (result[i].source == '' || result[i].source == undefined) ? '来源不明' : result[i].source,
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
