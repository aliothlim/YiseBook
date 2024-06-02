Page({
  data: {
    id: '',
    name: '',
    info: '',
    cover: '',
    windowHeight: 0
  },
  onReady: function() {  
    // 获取设备屏幕高度  
    this.setData({  
      windowHeight: wx.getSystemInfoSync().windowHeight  
    });  
  },
  onLoad(options) {
    const app = getApp();
    const album = app.globalData.albums.find(a => a.id == options.id);
    this.setData({
      id: album.id,
      cover: album.cover,
      name: album.name,
      info: album.info
    });
  },
  selectOpt(event) {
    const { cover } = this.data;
    wx.showActionSheet({
      itemList: ['查看大图', '修改图片'],
      success: (res) => {
        if (res.tapIndex === 0) {
          this.previewImage(cover);
        } else if (res.tapIndex === 1) {
          wx.chooseMedia({
            count: 1,
            mediaType: ['image'],
            sourceType: ['album', 'camera'],
            maxDuration: 30,
            camera: 'back',
            success: (res) => {
              this.setData({
                cover: res.tempFiles[0].tempFilePath
              });
            }
          });
        }
      }
    });
  },
  previewImage(currentUrl) {
    wx.previewImage({
      current: currentUrl,
      urls: [currentUrl]
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
  updateAlbum() {
    const app = getApp();
    const { id, cover, name, info } = this.data;
    const albumIndex = app.globalData.albums.findIndex(a => a.id == id);
    const oldCover = app.globalData.albums[albumIndex].cover;
    app.globalData.albums[albumIndex] = { id, cover, name, info, cards: app.globalData.albums[albumIndex].cards };
    if (cover !== oldCover) {
      wx.saveFile({
        tempFilePath: cover,
        success: (res) => {
          app.globalData.albums[albumIndex].cover = res.savedFilePath;
          wx.removeSavedFile({
            filePath: oldCover
          });
          wx.navigateBack({
            delta: 2
          });
        }
      });
    } else {
      wx.navigateBack({
        delta: 2
      });
    }
  },
  deleteAlbum() {
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这个卡册吗？',
      success: (res) => {
        if (res.confirm) {
          const app = getApp();
          const albumIndex = app.globalData.albums.findIndex(a => a.id == this.data.id);
          const [deletedAlbum] = app.globalData.albums.splice(albumIndex, 1);
          wx.removeSavedFile({
            filePath: deletedAlbum.cover
          });
          wx.navigateBack({
            delta: 2
          });
        }
      }
    });
  }
});
