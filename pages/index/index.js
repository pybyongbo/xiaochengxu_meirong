//list.js
const util = require('../../utils/util.js')
const fileData = require('../../utils/data.js')
Page({
    data: {
        colors: ['red', 'orange', 'yellow', 'green', 'purple'],
        // banner 初始化
        banner_url: fileData.getBannerData(),
        getcaseData: fileData.getcaseData(),
        getproData: fileData.getproData(),
        indicatorDots: true,
        vertical: false,
        autoplay: true,
        interval: 3000,
        duration: 1000,
        phonecall: '15802277512',
        showContact: false,
        flag: true
    },
    // 跳转至详情页
    navigateDetail: function(e) {
        wx.navigateTo({
            url: '../detail/detail?id=' + e.currentTarget.dataset.aid
        })
    },
    onPageScroll: function(e) {

        if (e.scrollTop > 300) {
            this.setData({
                showContact: true
            })
        } else {
            this.setData({
                showContact: false
            })
        }
    },
    phonecallevent() {
        wx.makePhoneCall({
            phoneNumber: this.data.phonecall
        })
    },
    showwechat() {
        this.show();
    },
    // 遮罩层显示   
    show: function() {
        this.setData({
            flag: false
        })
    },
    // 遮罩层隐藏
    conceal: function() {
        this.setData({
            flag: true
        })
    },
})