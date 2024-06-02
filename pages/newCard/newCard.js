Page({
  data: {
    albumId: '',
    id: "",
    name: '',
    source: '',
    purchaseDate: '',
    points: '',
    price: '',
    remarks: '',
    image1: '',
    image2: '',
    windowHeight: 0
  },
  onReady: function() {  
    // 获取设备屏幕高度  
    this.setData({  
      windowHeight: wx.getSystemInfoSync().windowHeight  
    });  
  },  
  onLoad(options) {
    this.setData({
      albumId: options.id
    });
  },
  chooseImage1() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success: (res) => {
        this.setData({
          image1: res.tempFiles[0].tempFilePath
        });
      }
    });
  },
  chooseImage2() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success: (res) => {
        this.setData({
          image2: res.tempFiles[0].tempFilePath
        });
      }
    });
  },
  inputName(e) {
    this.setData({
      name: e.detail.value
    });
  },
  inputCharacter(e) {
    this.setData({
      character: e.detail.value
    });
  },
  inputSource(e) {
    this.setData({
      source: e.detail.value
    });
  },
  inputPurchaseDate(e) {
    const selectedDate = e.detail.value;
    this.setData({
      purchaseDate: selectedDate
    });
  },
  inputPoints(e) {
    this.setData({
      points: e.detail.value
    });
  },
  inputPrice(e) {
    this.setData({
      price: e.detail.value
    });
  },
  inputRemarks(e) {
    this.setData({
      remarks: e.detail.value
    });
  },
  createCard() {
    const app = getApp();
    const { albumId, id, name, source, purchaseDate, points, price, remarks, image1, image2} = this.data;
    const album = app.globalData.albums.find(a => a.id == albumId);
    const newCard = { id: Date.now(), name, source, purchaseDate, points, price, remarks, image1, image2 };
    album.cards.push(newCard);
    wx.getFileSystemManager().saveFile({
      tempFilePath: image1,
      success: (res) => {
        newCard.image1 = res.savedFilePath;
        
        if (image2) {
          wx.getFileSystemManager().saveFile({
            tempFilePath: image2,
            success: (res) => {
              newCard.image2 = res.savedFilePath;
              wx.navigateBack({
                delta: 1
              });
            }
          });
        } else {
          wx.navigateBack({
            delta: 1
          });
        }
      }
    });
  }
});
