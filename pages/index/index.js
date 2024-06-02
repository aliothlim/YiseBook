// 在你的 Page 定义中  
Page({  
  data: {  
    albums: [],  
    noAlbumsMessage: '', // 初始时不显示消息  
    windowHeight: 0,
  },onReady: function() {  
    // 获取设备屏幕高度  
    this.setData({  
      windowHeight: wx.getSystemInfoSync().windowHeight  
    });  
  }, 
  onLoad() {  
    const app = getApp();  
    const albums = app.globalData.albums || []; // 确保 albums 总是数组  
  
    if (albums.length > 0) {  
      this.setData({  
        albums: albums,  
        noAlbumsMessage: '' // 如果有数据，则不显示消息  
      });  
    } else {  
      this.setData({  
        albums: [],  
        noAlbumsMessage: '还没有卡册，去创建⬇' // 如果没有数据，显示消息  
      });  
    }  
  },
  onShow: function () {
    const app = getApp();  
    const albums = app.globalData.albums || []; // 确保 albums 总是数组  
  
    if (albums.length > 0) {  
      this.setData({  
        albums: albums,  
        noAlbumsMessage: '' // 如果有数据，则不显示消息  
      });  
    } else {  
      this.setData({  
        albums: [],  
        noAlbumsMessage: '还没有卡册，去创建⬇' // 如果没有数据，显示消息  
      });  
    }  
  },
  goToAlbum(e) {  
    const albumId = e.currentTarget.dataset.id;
    wx.navigateTo({  
      url: `/pages/album/album?id=${albumId}`  
    });  
  },  
  goToNewAlbum() {  
    wx.navigateTo({  
      url: '/pages/newAlbum/newAlbum'  
    });  
  }
});