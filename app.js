//app.js
App({
    onLaunch: function() {
        // 展示本地存储能力

        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
                success: res => {
                    // 发送 res.code 到后台换取 openId, sessionKey, unionId
                    //AppId wx8c3919750c70ad32
                    //AppSecret(小程序密钥) 6957b65344fda5a59516406d74651e33
                    console.log(res.code);

                    if (res.code) {

                        //调用request请求api转换登录凭证　
                        wx.request({　　　　　　
                            url: 'https://api.weixin.qq.com/sns/jscode2session',
                            data: {　　　　　　　　　　　　　　　　
                                appid: 'wx8c3919750c70ad32', //小程序唯一标识
                                secret: '6957b65344fda5a59516406d74651e33', //小程序的 app secret
                                grant_type: 'authorization_code',
                                js_code: res.code　　　　　　
                            },
                            method: 'GET',
                            header: {
                                'content-type': 'application/json'
                            },

                            success: function(res) {　　　
                                // console.info("登录成功返回的openId：" + res.data.openid);　　　
                                console.log(res) //获取openid
                                    // this.globalData.openId = res.data.openid;　　　　　　
                            }　　　　
                        })

                    }
                }
            })
            // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res);
                                console.log(res);
                            }
                        }
                    })
                }
            }
        })
    },
    globalData: {
        userInfo: null
    }
})