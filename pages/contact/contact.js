//add.js
Page({
    data: {

    },

    onLoad: function(e) {

        var id = e.id;
        // console.log(id);
        if (id) {
            getData(id, this);
        } else {
            console.log("test")
            this.setData({
                id: Date.now(),
                txtStyle: "",
            })
        }

    },
    change(e) {
        var val = e.detail.value;
        console.log(val);
        this.setData({
            content: val
        })
    },
    cancel() {

        wx.navigateBack();
    },
    sure() {
        var re = /^\s*$/g;
        if (!this.data.content || re.test(this.data.content)) {
            wx.showToast({
                title: `请填写完整内容在提交`,
                image: '/images/appointment.png',
                icon: 'fail'

            })
            return false

        }
        this.setData({
            time: Date.now()
        })

        setvalue(this);
        // wx.navigateBack();
        wx.switchTab({
            url: '../list/list'
        })
    },
    getUserInfo: function(e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    }
})



function getData(id, page) {

    var arr = wx.getStorageSync('txt');

    if (arr.length) {
        arr.forEach((item) => {
            if (item.id == id) {
                page.setData({
                    id: item.id,
                    content: item.content
                })
            }
        })
    }

}


function setvalue(page) {

    var arr = wx.getStorageSync('txt');

    var data = [],
        flag = true;

    if (arr.length) {
        arr.forEach((item) => {

            if (item.id == page.data.id) {
                item.time = Date.now();
                item.content = page.data.content;
                flag = false;
            }
            data.push(item);
        })
    }

    if (flag) {

        data.push(page.data);
    }
    wx.setStorageSync('txt', data);
}