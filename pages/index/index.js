let app = getApp()
Page({
    data: {},
    toGo() {
        wx.redirectTo({
            url: '../game/game'
        });
    },
    onLoad() {
        wx.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: '#222222',
        })
    },
    getUserInfo(e) {
        console.log(e)
        wx.setStorageSync("userInfo", JSON.parse(e.detail.rawData))
        this.toGo()
    },
    onShow() {},
});