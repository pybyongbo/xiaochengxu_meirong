/**
 * banner数据
 */
function getBannerData() {
    var arr = ['../../images/banner_01.png', '../../images/banner_02.png', '../../images/banner_03.png', '../../images/banner_04.png']
    return arr
}
/*
 * 首页 navnav 数据
 */
function getIndexNavData() {
    var arr = [{
            id: 1,
            icon: "../../images/nav_icon_01.png",
            title: "推荐"
        },
        {
            id: 2,
            icon: "../../images/nav_icon_02.png",
            title: "美甲"
        },
        {
            id: 3,
            icon: "../../images/nav_icon_03.png",
            title: "美容"
        },
        {
            id: 4,
            icon: "../../images/nav_icon_04.png",
            title: "美发"
        },
        {
            id: 5,
            icon: "../../images/nav_icon_05.png",
            title: "美睫"
        }
    ]
    return arr
}
/*
 * 首页 对应 标签 数据项
 */

/*
 * 对外暴露接口
 */
module.exports = {
    getBannerData: getBannerData

}