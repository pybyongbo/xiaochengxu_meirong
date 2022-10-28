//预约表单页面 
var util = require('../../utils/util');
const app = getApp();
Page({
    data: {
        holderText: '请输入备注信息',
        showModalStatus: false,
        username: "",
        nickName:"",
        showBtn: true,
        tel: "",
        appointitem: "",
        comment: "",
        date: util.formatTime(new Date()).date,
        time: util.formatTime(new Date()).time,
        bookToastHidden: true,
        //预约项目
        catalogs: [{
                "catalogName": "纹绣项目",
                "select": 1
            },
            {
                "catalogName": "美甲项目",
                "select": 2
            },
            {
                "catalogName": "美瞳项目",
                "select": 3
            },
            {
                "catalogName": "护肤项目",
                "select": 4
            },
            {
                "catalogName": "眉形重塑",
                "select": 5
            },
            {
                "catalogName": "其他项目",
                "select": 6
            }
        ],
        catalogSelect: 0, //判断是否选中
    },

    onShow: function() {

        // console.log(app.globalData);
        // if (!getApp().globalData.userInfo) {

        //     wx.getSetting({
        //         success(res) {

        //             if (res.authSetting['scope.userInfo']) {
        //                 wx.authorize({
        //                     scope: 'scope.userInfo',
        //                 })
        //             }
        //             // console.log(res);
        //         }
        //     });
        // }


        // if (app.globalData.userInfo) {
        //     console.log(0);
        //     this.setData({
        //         userInfo: app.globalData.userInfo,
        //         hasUserInfo: true
        //     })
        // } else if (this.data.canIUse) {
        //     console.log(1);
        //     app.userInfoReadyCallback = res => {
        //         this.setData({
        //             userInfo: res.userInfo,
        //             hasUserInfo: true
        //         })
        //     }
        // } else {
        //     console.log(2);
        //     wx.getUserInfo({
        //         success: res => {
        //             app.globalData.userInfo = res.userInfo
        //             this.setData({
        //                 userInfo: res.userInfo,
        //                 hasUserInfo: true
        //             })
        //         }
        //     })
        // }
        console.log(app.globalData.userInfo);

        if (app.globalData.userInfo) {
            // showBtn
            this.setData({ //把选中值放入判断值
                showBtn: false,
                nickName:app.globalData.userInfo.nickName
            });
            console.log("11")
        } else {
            console.log("22");
        }

    },

    handleUserInfo(e) {
        let msg = e.detail.errMsg;
        console.log(e);
        if (msg === 'getUserInfo:ok') {
            let user = e.detail.userInfo;
            user.encryptedData = e.detail.encryptedData;
            user.iv = e.detail.iv;
            // util.setDataBase('islogin', true); //set 本地数据
            // util.login(user, this.handleLogin.bind(this))
            // util.setData({
            //     islogin: false
            // });
        } else {
            // util.setDataBase('islogin', false); //set 本地数据
            // this.setData({
            //     islogin: true
            // });
            // util.showModal('五色糖，申请获得您的公开信息（头像，昵称等）。授权后，您能体验到我们更完善的功能，谢谢您关注五色糖。', false, this);
        }
    },

    // 日期选择
    bindDateChange: function(e) {
        console.log('date picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            date: e.detail.value
        })
    },
    // 时间选择
    bindTimeChange: function(e) {
        console.log('time picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            time: e.detail.value
        })
    },
    powerDrawer: function(e) {
        var currentStatu = e.currentTarget.dataset.statu;
        this.util(currentStatu)
    },
    util: function(currentStatu) {
        /* 动画部分 */
        // 第1步：创建动画实例   
        var animation = wx.createAnimation({
            duration: 200, //动画时长  
            timingFunction: "linear", //线性  
            delay: 0 //0则不延迟  
        });

        // 第2步：这个动画实例赋给当前的动画实例  
        this.animation = animation;

        // 第3步：执行第一组动画：Y轴偏移240px后(盒子高度是240px)，停  
        animation.translateY(240).step();

        // 第4步：导出动画对象赋给数据对象储存  
        this.setData({
            animationData: animation.export()
        })

        // 第5步：设置定时器到指定时候后，执行第二组动画  
        setTimeout(function() {
            // 执行第二组动画：Y轴不偏移，停  
            animation.translateY(0).step()
                // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
            this.setData({
                animationData: animation
            })

            //关闭抽屉  
            if (currentStatu == "close") {
                this.setData({
                    showModalStatus: false,
                    holderText: '请输入备注信息'
                });
            }
        }.bind(this), 200)

        // 显示抽屉  
        if (currentStatu == "open") {
            this.setData({
                showModalStatus: true,
                holderText: ''
            });
        }
    },

    chooseCatalog: function(data) {
        var that = this;
        that.setData({ //把选中值放入判断值
            catalogSelect: data.currentTarget.dataset.select
        })
        console.log(data.currentTarget.dataset.select);

    },
    formSubmit: function(e) {
        console.log(e);
        var warn = ""; //弹框时提示的内容
        var flag = true; //判断信息输入是否完整
        //判断的顺序依次是：姓名-手机号-地址-具体地址-预约日期-预约时间-开荒面积
        if (e.detail.value.username == "") {
            warn = "请填写您的姓名！";
        } else if (e.detail.value.tel == "") {
            warn = "请填写您的手机号！";
        } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(e.detail.value.tel))) {
            warn = "手机号格式不正确";
        } else if (e.detail.value.appointitem == '') {
            warn = "请选择您的预约项目"
        } else if (e.detail.value.date == '预约日期') {
            warn = "请选择预约日期";
        } else if (e.detail.value.time == '时间') {
            warn = "请选择预约时间";
        } else {
            flag = false; //若必要信息都填写，则不用弹框，且页面可以进行跳转
            var that = this;
            //？后面跟的是需要传递到下一个页面的参数
            // wx.navigateTo({
            //      url: '../confirmForest/confirmForest?area=' + e.detail.value.area + '&tel=' + e.detail.value.tel + "&addre=" + that.data.addreRange[e.detail.value.addre] + "&door=" + e.detail.value.door
            // })

            console.log('form发生了submit事件，携带数据为：', e.detail.value);

            // wx.showToast({
            //     title: '预约成功',
            //     icon: 'success',
            //     duration: 2000,
            //     mask: true,  //是否显示透明蒙层，防止触摸穿透，默认：false
            //     success: function () { 
            //         wx.switchTab({
            //             url: '../list/list'
            //         })
            //     }, //接口调用成功的回调函数
            //     fail: function () { },  //接口调用失败的回调函数
            //     complete: function () { } //接口调用结束的回调函数
            // })

            var formData = e.detail.value;
            wx.request({
                url: 'https://zq.901web.com/index.php/Appointment/index',
                method: 'POST',
                header: {
                    // 'Content-Type': 'application/json' 
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: {
                    username: e.detail.value.username,
                    date: e.detail.value.date,
                    time: e.detail.value.time,
                    tel: e.detail.value.tel,
                    appointitem: this.data.catalogSelect,
                    comment: e.detail.value.comment
                },
                success: function(res) {
                    console.log(res.data);

                    if (res.data === 0) {
                        wx.showModal({
                            title: '预约提示',
                            content: '预约成功,稍后会有客服人员与您联系',
                            showCancel: false,
                            success: function() {
                                wx.switchTab({
                                    url: '../index/index'
                                });
                                // this.setData({
                                //     username: ""
                                // })
                            }
                        });

                        that.setData({
                            username: '',
                            tel: '',
                            catalogSelect: 0,
                            comment: ''
                        })


                    } else {

                        wx.showModal({
                            title: '预约提示',
                            content: '预约失败,请重新提交预约',
                            showCancel: false

                        })
                    }

                }
            })

        }
        //如果信息填写不完整，弹出输入框
        if (flag == true) {
            wx.showModal({
                title: '提示',
                content: warn
            })
        }

    }
})