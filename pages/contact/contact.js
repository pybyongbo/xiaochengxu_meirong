//contact.js

var bmap = require('../../utils/bmap-wx.min.js');
var wxMarkerData = [];

Page({
    data: {
        markers: [{
            longitude: "117.187499",
            latitude: "39.126306",
            id: 0,
            iconPath: '../../images/marker_red.png',
            iconTapPath: '../../images/marker_red.png'
        }],
        latitude: '',
        longitude: '',
        rgcData: {}
    },
    makertap: function(e) {
        var that = this;
        var id = e.markerId;
        that.showSearchInfo(wxMarkerData, id);
    },
    onLoad: function() {
        var that = this;
        // 新建百度地图对象 
        var BMap = new bmap.BMapWX({
            ak: '4d0be64a393aa984ca02f876f9098e5a'
        });
        var fail = function(data) {
            console.log(data)
        };
        var success = function(data) {
                wxMarkerData = data.wxMarkerData;
                that.setData({
                    // markers: wxMarkerData
                    markers: this.markers[0]

                });
                that.setData({
                    latitude: wxMarkerData[0].latitude
                });
                that.setData({
                    longitude: wxMarkerData[0].longitude
                });
            }
            // 发起regeocoding检索请求 
            // BMap.regeocoding({
            //     fail: fail,
            //     success: success,
            //     iconPath: '../../images/marker_red.png',
            //     iconTapPath: '../../images/marker_red.png'
            // });
    },
    showSearchInfo: function(data, i) {
        var that = this;
        console.log(data);
        return;
        // that.setData({
        //     rgcData: {
        //         address: '地址：' + data[i].address + '\n',
        //         desc: '描述：' + data[i].desc + '\n',
        //         business: '商圈：' + data[i].business
        //     }
        // });
    }

})