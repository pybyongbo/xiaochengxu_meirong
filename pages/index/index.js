//list.js
const util = require('../../utils/util.js')
const fileData = require('../../utils/data.js')
Page({
    data: {
        colors: ['red', 'orange', 'yellow', 'green', 'purple'],
        // banner 初始化
        banner_url: fileData.getBannerData(),
        indicatorDots: true,
        vertical: false,
        autoplay: true,
        interval: 3000,
        duration: 1000,
    },
    onLoad() {

        initData(this);

    },
    onShow() {

        initData(this);

    },

    edit(e) {
        console.log(e);
        var id = e.currentTarget.dataset.id;
        console.log(id);
        wx.navigateTo({
            url: '../add/add?id=' + id
        })
    },

    add() {

        // console.log('add====>');
        // wx.navigateTo({
        //     url: '../add/add'
        // })
        wx.switchTab({
            url: '../add/add'
        })
    },

    add2() {

        // console.log('add====>');
        wx.navigateTo({
            url: '../form/form'
        })

    },
    touchS: function(e) {

        if (e.touches.length === 1) {
            this.setData({
                //设置触摸起始点水平方向位置
                startX: e.touches[0].clientX
            })
        }
    },
    touchM: function(e) {
        if (e.touches.length == 1) {
            //水平移动时水平方向位置
            var moveX = e.touches[0].clientX;
            var disX = this.data.startX - moveX;

            var delBtnWidth = this.data.delBtnWidth;
            var txtStyle = "";
            if (disX == 0 || disX < 0) {
                txtStyle = "left:0px";
            } else if (disX > 0) {
                txtStyle = "left:-" + disX + "px";

                if (disX >= delBtnWidth) {
                    txtStyle = "left:-" + delBtnWidth + "px";
                }
            }
            //获取手指触摸的是哪一项
            var index = e.currentTarget.dataset.index;
            var list = this.data.lists;
            list[index].txtStyle = txtStyle;

            // console.log(e.currentTarget);
        }
    },
    touchE: function(e) {

        if (e.changedTouches.length == 1) {

            //手指移动结束后水平位置

            var endX = e.changedTouches[0].clientX;

            //触摸开始与结束，手指移动的距离

            var disX = this.data.startX - endX;

            var delBtnWidth = 120;

            //如果距离小于删除按钮的1/2，不显示删除按钮

            var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";

            //获取手指触摸的是哪一项

            var index = e.currentTarget.dataset.index;
            var list = this.data.lists;
            list[index].txtStyle = txtStyle;

            //更新列表的状态
            // var arr = wx.getStorageSync('txt');
            this.setData({

                lists: list

            });

        }

    },

    //点击删除按钮事件

    delItem: function(e) {

        //获取列表中要删除项的下标
        var index = e.currentTarget.dataset.index;
        var list = this.data.lists;
        //移除下标为index的项
        list.splice(index, 1);
        //更新列表的状态
        console.log(list);
        this.setData({

            lists: list

        });
        // initData(this);
    }
})

function initData(page) {

    var arr = wx.getStorageSync('txt');

    if (arr.length) {

        arr.forEach((item, i) => {
            var t = new Date(Number(item.time));
            item.time = util.formatTime(t);
        });

        page.setData({

            lists: arr

        })
    }

}