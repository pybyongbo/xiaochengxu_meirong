//list.js
const util = require('../../utils/util.js')
const fileData = require('../../utils/data.js')
Page({
    data: {

        getproData: fileData.getproData(),
        itemId: '',
        detailObj: {}
    },

    onLoad(option) {

        let nowId = option.id;
        this.setData({
            itemId: parseInt(nowId)
        })

        this.initData(this.data.itemId);

    },
    initData(id) {

        let itemInfo = this.data.getproData.find(item => item.id === id);
        this.setData({
            detailObj: itemInfo
        })

    }

})