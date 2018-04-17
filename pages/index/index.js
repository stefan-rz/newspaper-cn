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
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: 'gn'
      },
      success: res => {
        let result = res.data.result
        let newsTime = new Date(result[0].date)
        this.setData({
          lg_image: result[0].firstImage,
          sm_image: result[1].firstImage,
          hot_news_title: result[0].title,
          hot_news_resource: result[0].source == '' ? '来源不明' : result[0].source,
          hot_news_time: newsTime.getHours() + ':' + newsTime.getMinutes()
        }),
        this.setNewsList(result)
        console.log(result)
      }
    })
  },
  setNewsList(result) {
    let newsList = []
    let newsTime
    for (let i = 1; i < result.length; i++) {
      newsTime = new Date(result[i].date)
      newsList.push({
        title: result[i].title,
        sm_image: result[i].firstImage,
        source:result[i].source == '' ? '来源不明' : result[i].source,
        time: newsTime.getHours() + ':' + newsTime.getMinutes()
      })
    }
    this.setData({
      newsList: newsList
    })
  },

  onTapCategory(e) {
    var category = e.currentTarget.dataset.category;
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: categoryMap[category]
      },
      success: res => {
        let result = res.data.result
        let newsTime = new Date(result[0].date)
        this.setData({
          lg_image: result[0].firstImage,
          sm_image: result[1].firstImage,
          hot_news_title: result[0].title,
          hot_news_resource: result[0].source == '' ? '来源不明' : result[0].source,
          hot_news_time: newsTime.getHours() + ':' + newsTime.getMinutes()
        }),
          this.setNewsList(result)
        console.log(result)
      }
    })
  }
 })
