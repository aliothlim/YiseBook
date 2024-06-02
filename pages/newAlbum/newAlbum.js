Page({
  data: {
    name: '',
    info: '',
    cover: '',
    windowHeight: 0,
  },onReady: function() {  
    // 获取设备屏幕高度  
    this.setData({  
      windowHeight: wx.getSystemInfoSync().windowHeight  
    });  
  }, 
  chooseImage() {
    wx.chooseImage({
      count: 1,
      success: (res) => {
        this.setData({
          cover: res.tempFilePaths[0]
        });
      }
    });
  },
  inputName(e) {
    this.setData({
      name: e.detail.value
    });
  },
  inputinfo(e) {
    this.setData({
      info: e.detail.value
    });
  },
  createAlbum() {
    const app = getApp();
    const { name, info, cover } = this.data;
    const newAlbum = { id: Date.now(), name, info, cover, cards: [] };
    app.addAlbum(newAlbum);
    wx.saveFile({
      tempFilePath: cover,
      success: (res) => {
        newAlbum.cover = res.savedFilePath;
        wx.navigateBack({
          delta: 1
        });
      }
    });
  }
});
