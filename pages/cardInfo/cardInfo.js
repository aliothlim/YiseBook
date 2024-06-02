Page({
  data: {
    id: '',
    albumId: '',
    name: '',
    source: '',
    purchaseDate: '',
    points: '',
    price: '',
    remarks: '',
    image1: '',
    image2: '',
    windowHeight: 0,
  },onReady: function() {  
    // 获取设备屏幕高度  
    this.setData({  
      windowHeight: wx.getSystemInfoSync().windowHeight  
    });  
  },
  onLoad(options) {
    const app = getApp();
    const card = app.globalData.albums.flatMap(a => a.cards).find(c => c.id == options.id);
    this.setData({
      id: card.id,
      albumId: options.albumId,
      name: card.name,
      source: card.source,
      purchaseDate: card.purchaseDate,
      points: card.points,
      price: card.price,
      remarks: card.remarks,
      image1: card.image1,
      image2: card.image2,
    });
  },
  selectOpt1(event) {
    const { image1 } = this.data;
    wx.showActionSheet({
      itemList: ['查看大图', '修改图片'],
      success: (res) => {
        if (res.tapIndex === 0) {
          this.previewImage(image1);
        } else if (res.tapIndex === 1) {
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
        }
      }
    });
  },
  selectOpt2(event) {
    const { image2 } = this.data;
    wx.showActionSheet({
      itemList: ['查看大图', '修改图片'],
      success: (res) => {
        if (res.tapIndex === 0) {
          this.previewImage(image2);
        } else if (res.tapIndex === 1) {
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
  updateCard() {
    const app = getApp();
    const { albumId, id, name, source, purchaseDate, points, price, remarks, image1, image2 } = this.data;
    const album = app.globalData.albums.find(a => a.id == albumId);
    const cardIndex = album.cards.findIndex(c => c.id == id);
    album.cards[cardIndex] = { id, name, source, purchaseDate, points, price, remarks, image1, image2 };
    wx.navigateBack({
      delta: 1
    });
  },
  deleteCard() {
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这张小卡吗？',
      success: (res) => {
        if (res.confirm) {
          const app = getApp();
          const album = app.globalData.albums.find(a => a.id == this.data.albumId);
          const cardIndex = album.cards.findIndex(c => c.id == this.data.id);
          const [deletedCard] = album.cards.splice(cardIndex, 1);
          wx.navigateBack({
            delta: 1
          });
        }
      }
    });
  }
});
