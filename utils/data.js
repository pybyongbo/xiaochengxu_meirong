/**
 * banner数据
 */
function getBannerData() {
    var arr = ['../../images/banner_01.png', '../../images/banner_02.png', '../../images/banner_03.png', '../../images/banner_04.png']
    return arr
}

/*
 * 首页 成功案例数据
 */
function getcaseData() {
    var arr = [{
            caseId: 1,
            desc: '椭圆形指甲,美美滴',
            imgUrl: "../../images/case_1.png"
        },
        {
            caseId: 2,
            desc: '圆形指甲,美美滴',
            imgUrl: "../../images/case_2.png"
        },
        {
            caseId: 3,
            desc: '方形指甲,这里填写案例描述',
            imgUrl: "../../images/case_3.png"
        },
        {
            caseId: 4,
            desc: '方圆形指甲,这里填写案例描述',
            imgUrl: "../../images/case_4.png"
        }
    ]
    return arr
}
/*
 * 首页 产品展示 数据
 */
function getproData() {
    var arr = [{
            id: 1,
            imgUrl: "../../images/pro_lbzx.png",
            title: "脸部整形"
        },
        {
            id: 2,
            imgUrl: "../../images/pro_mrzxwk.png",
            title: "美容整形外科"
        },
        // {
        //     id: 3,
        //     imgUrl: "../../images/pro_wm.png",
        //     title: "纹眉项目"
        // },
        {
            id: 3,
            imgUrl: "../../images/pro_pc.png",
            title: "漂唇项目"

        },
        {
            id: 4,
            imgUrl: "../../images/pro_wx.png",
            title: "纹绣项目"
        },
        {
            id: 5,
            imgUrl: "../../images/pro_jjmm.png",
            title: "嫁接眉毛"
        },
        {
            id: 6,
            imgUrl: "../../images/pro_wyx.png",
            title: "纹眼线"
        }
        // , {
        //     id: 8,
        //     imgUrl: "../../images/pro_mf.png",
        //     title: "毛发整形"
        // }
    ]
    return arr
}


/*
 * 对外暴露接口
 */
module.exports = {
    getBannerData: getBannerData,
    getcaseData: getcaseData,
    getproData: getproData

}