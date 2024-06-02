// 在你的 Page 定义中  
Page({  
  data: {  
    albumId: "",
    cards: [],  
    nocardsMessage: '',
    windowHeight: 0,
  },onReady: function() {  
    // 获取设备屏幕高度  
    this.setData({  
      windowHeight: wx.getSystemInfoSync().windowHeight  
    });  
  },  
  onLoad: function (options) {  
    this.setData({  
      albumId: options.id
    });
    const app = getApp();  
    const cards = app.globalData.albums.find(a => a.id == options.id).cards || [];
  
    if (cards.length > 0) {  
      this.setData({  
        cards: cards,  
        nocardsMessage: '' // 如果有数据，则不显示消息  
      });  
    } else {  
      this.setData({  
        cards: [],  
        nocardsMessage: '还没有小卡，去添加⬇' // 如果没有数据，显示消息  
      });  
    }  
  },
  onShow: function (options) {
    const {albumId} = this.data;
    const app = getApp();  
    const cards = app.globalData.albums.find(a => a.id == albumId).cards || [];
  
    if (cards.length > 0) {  
      this.setData({  
        cards: cards,  
        nocardsMessage: '' // 如果有数据，则不显示消息  
      });  
    } else {  
      this.setData({  
        cards: [],  
        nocardsMessage: '还没有小卡，去添加⬇' // 如果没有数据，显示消息  
      });  
    } 
  },
  goTocard(e) {  
    const cardId = e.currentTarget.dataset.id;   
    wx.navigateTo({  
      url: `/pages/cardInfo/cardInfo?id=${cardId}&albumId=${this.data.albumId}`  
    });  
  },  
  goToAlbumInfo() {  
    wx.navigateTo({  
      url: `/pages/albumInfo/albumInfo?id=${this.data.albumId}`  
    });  
  },  
  goToNewcard() {  
    wx.navigateTo({  
      url: `/pages/newCard/newCard?id=${this.data.albumId}`  
    });  
  }
});