let express = require('express')
let urlUtil = require('url')
let app = express()
app.use(express.static('web')).listen(8000, () => {
    console.log('服务在8000端口开启')
})
const createData = (page, pageSize) => {
    let list = []
    for (let index = 0; index < pageSize; index++) {
        list.push({
            "id": index * page + 1,
            "publishdate": "2020-05-16 18:07:00",
            "content": "人民网北京5月16日电 （朱紫阳）自2010年起，公安部将每年的5月15日确定为全国公安机关打击和防范经济犯罪宣传日，组织各地公安机关开展面向大众、形式多样的宣传活动。今年5月15日，是第11个宣传日。\n鉴于当前疫情防控工作实际，今年“5.15”宣传日活动以互联网、融媒体、短视频宣传为主。天津市公安局与天津市金融局制作了“2020年度‘5.15’天津市公安局打击和防范经济犯罪宣传日”特别节目，于5月15日晚在天津电视台和网络媒体同步推出。\n今年宣传日活动天津市公安局继续突出“与民同心，为您守护”主题，重点围绕假币、银行卡、非法集资、传销、商贸以及私募、证券等领域社会危害严重、社会公众广为关注的经济犯罪活动，介绍犯罪形势特点，剖析典型案例，传授防骗知识，推动社会各界共同参与打击和防范经济犯罪工作。\n同时，各级经侦部门加强与新闻媒体沟通配合，在市、区两级新闻媒体平台、公安官方新媒体平台同时推送防范经济犯罪宣传稿件和宣传视频，并结合“万名民警进百万家”活动，在窗口单位和重点路段、商业区户外、楼宇LED宣传屏，以及地铁、公交、出租车等公共交通设施的流媒体滚动播放防范宣传视频、标语口号等内容，形成立体宣传的格局。\n为持续扩大宣传效果，在开展“5.15”宣传日活动的基础上，公安部经侦局于今年开始组织开展“5.15”全国公安机关打击和防范经济犯罪宣传季活动，时间为5月15日至8月15日。公安经侦部门将集中推送防范经济犯罪视频、打击经济犯罪典型案例等，通过分析讲解，提升广大人民群众的防范意识和能力，推动社会各界共同参与打击和防范经济犯罪工作。\n2019年以来，天津公安经侦部门通过开展打击非法集资、“猎狐”“云端”三大攻坚战，集中警力侦办涉及围绕民生围绕百姓生活的各类经济案件，累计破案2000余起，抓获犯罪嫌疑人3000余名，挽回经济损失近450亿元，确保了天津市经济秩序和社会大局稳定。\n",
            "sourcefrom": "人民网-法治频道",
            "keywords": "[经济, 宣传, 活动, 防范, 犯罪, 宣传日, 日, 社会, 公安, 打击, 媒体, 今年, 天津市, 视频, 开展, 经侦]",
            "abstractextract": "[全国公安机关打击和防范经济犯罪宣传季活动]",
            "classify": 0,
            "title": "天津公安机关启动“5.15”打击和防范经济犯罪宣传季",
            "link": "http://legal.people.com.cn/n1/2020/0516/c42510-31711792.html"
        })
    }
    return list

}
app.post('/data/Original/list', (req, res) => {
    let urlObj = urlUtil.parse(req.url, true)
    console.log(urlObj)
    let page = +urlObj.query.page
    let pageSize = +urlObj.query.rows
    res.send({
        "total": 300,
        "rows": createData(page, pageSize)
    })
})