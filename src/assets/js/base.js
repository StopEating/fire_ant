import * as echarts from 'echarts';

$(function () {
    sessionStorage.setItem('create', 1)
    function fnW(str) {
        var num;
        str >= 10 ? num = str : num = "0" + str;
        return num;
    }

    //中国地图开始
    // var china_map = echarts.init(document.getElementById("china_map"), 'macarons');
    var china_map = echarts.init(document.getElementById("china_map"), 'infographic');
    // var china_map = echarts.init(document.getElementById("china_map"), 'shine');


    function random() {
        return Math.round(Math.random() * 500);
    }
    $.ajax({
        url: "http://106.55.103.200:8088/fire_ant_project/statistics/dataStatistics",
        type: "GET",
        success: function (res) {

            let readdata = [res.message.browse.trainArticleNumber, res.message.browse.trainScienceNumber, res.message.browse.scienceArticleNumber, res.message.browse.videoNumber]
            let totaldata = [res.message.browse.trainArticleData, res.message.browse.trainScienceArticleData, res.message.browse.scienceArticleData, res.message.browse.scienceVideoData];
            // tatal.push()
            var mydata = [];
            for (var i = 0; i < res.message.userDataProvince.length; i++) {
                let name = res.message.userDataProvince[i].province;
                let value = res.message.userDataProvince[i].userData;
                mydata[i] = { name: name, value: value }
            }
            function getNewList() {
                mydata.forEach((item, index) => {
                    let isAutonomy = item.name.search('自治区') != -1
                    if (isAutonomy) {
                        item.name = item.name.search('内') != -1 ? item.name.substr(0, 3) : item.name.substr(0, 2)
                    } else {
                        item.name = item.name.match(/(\S*)(省|市|特别行政区)/)[1];
                    }
                });
            }
            getNewList()
            //中国地图
            var option = {
                //backgroundColor: '#FFFFFF',
                title: {
                    text: '用户分布',
                    textStyle: { color: '#fff' },
                    //subtext: '纯属虚构',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    textStyle: { color: 'black' },
                },
                visualMap: {
                    show: false,
                    x: 'left',
                    y: 'bottom',
                    layoutCenter: ['30%', '30%'],
                    color: ['#8b0000', '#b22222', '#a52a2a', '#ffa07a']
                },
                series: [{
                    name: '用户分布',
                    type: 'map',
                    mapType: 'china',
                    roam: true,
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    data: mydata
                }]
            };
            china_map.setOption(option);
            //中国地图结束
            //获取当前时间
            var timer = setInterval(function () {
                var date = new Date();
                var year = date.getFullYear(); //当前年份
                var month = date.getMonth(); //当前月份
                var data = date.getDate(); //天
                var hours = date.getHours(); //小时
                var minute = date.getMinutes(); //分
                var second = date.getSeconds(); //秒
                var day = date.getDay(); //获取当前星期几 
                var ampm = hours < 12 ? 'am' : 'pm';
                $('#time').html(fnW(hours) + ":" + fnW(minute) + ":" + fnW(second));
                $('#date').html('<span>' + year + '/' + (month + 1) + '/' + data + '</span><span>' + ampm + '</span><span>周' + day + '</span>')

            }, 1000)


            //蚁情高发省份
            $.ajax({
                url: 'http://106.55.103.200:8088/fire_ant_project/statistics/getAntDataAnalysis',
                type: 'get',
                success: function (res) {
                    let province = [];
                    let provincedata = [];
                    for (var i = 0; i < 5; i++) {
                        province.push(res.message.antProvinceRank[i].province);
                        provincedata.push(res.message.antProvinceRank[i].antData)
                    }
                    var pie_fanzui = echarts.init(document.getElementById("pie_fanzui"), 'infographic');
                    option = {
                        //  backgroundColor: '#00265f',
                        tooltip: {
                            trigger: "axis",
                            axisPointer: {
                                type: "shadow",
                            },
                        },
                        grid: {
                            left: "5%",
                            top: "10px",
                            right: "10%",
                            bottom: "2%",
                            containLabel: true,
                        },
                        yAxis: [
                            {
                                type: "category",
                                data: province.reverse(),
                                axisLine: {
                                    show: true,
                                    lineStyle: {
                                        color: "rgba(255,255,255,.1)",
                                        width: 1,
                                        type: "solid",
                                    },
                                },
                                axisTick: {
                                    show: false,
                                },
                                axisLabel: {
                                    show: true,
                                    splitNumber: 15,
                                    textStyle: {
                                        color: "rgba(255,255,255,.6)",
                                        fontSize: "12",
                                    },
                                },
                            },
                        ],
                        xAxis: [
                            {
                                type: "value",
                                axisLabel: {
                                    interval: 0,
                                    //formatter: '{value} %'
                                    show: true,
                                    textStyle: {
                                        color: "rgba(255,255,255,.6)",
                                        fontSize: "12",
                                    },
                                },
                                axisTick: {
                                    show: false,
                                },
                                axisLine: {
                                    show: true,
                                    lineStyle: {
                                        color: "rgba(255,255,255,.1	)",
                                        width: 1,
                                        type: "solid",
                                    },
                                },
                                splitLine: {
                                    lineStyle: {
                                        color: "rgba(255,255,255,.1)",
                                    },
                                },
                            },
                        ],
                        series: [
                            {
                                type: "bar",
                                data: provincedata.reverse(),
                                barWidth: "35%", //柱子宽度
                                // barGap: 1, //柱子之间间距
                                itemStyle: {
                                    normal: {
                                        color: "#2f89cf",
                                        opacity: 1,
                                        barBorderRadius: 5,
                                    },
                                },
                            },
                        ],
                    };
                    ;
                    pie_fanzui.setOption(option);
                    //----------------------蚁情高发省份end---------------


                },
                error: function (error) {
                    console.log(error)
                }
            })


            //数量以及阅读量
            //var pie_age =echarts.init(document.getElementById("pie_age"),'macarons'); 

            var pie_age = echarts.init(document.getElementById("pie_age"), 'infographic');
            //var pie_age =echarts.init(document.getElementById("pie_age"),'shine'); 
            option = {
                title: {
                    subtext: "阅读量",
                    textStyle: {
                        color: "rgba(255,255,255,.6)", //字体颜色
                    },
                    subtextStyle: {
                        color: "rgba(255,255,255,.6)", //字体颜色
                    },
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow",
                    },
                },

                calculable: true,
                xAxis: [
                    {
                        axisLine: {
                            show: true, //y轴线消失
                        },
                        type: "category",
                        data: ['培训资讯文章', '科普资讯文章', '科普文章', '科普视频'],
                        axisLabel: {
                            interval: 0,
                            show: true,
                            textStyle: {
                                color: "rgba(255,255,255,.6)",
                            },
                        },
                    },
                ],
                yAxis: [
                    {
                        splitLine: {
                            show: false,
                        },
                        axisLine: {
                            show: true, //y轴线消失
                        },
                        type: "value",
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: "rgba(255,255,255,.6)",
                            },
                        },
                    },
                ],
                series: [
                    {
                        name: "阅读量",
                        type: "bar",
                        data: readdata,
                        color: ["#027825"],
                    },
                ],
            };
            pie_age.setOption(option);
            //----------------------数量以及阅读量end---------------




            // 文章
            $.ajax({
                url: 'http://106.55.103.200:8088/fire_ant_project/statistics/getHotContent',
                type: 'get',
                success: function (res) {
                    let hot = [];
                    let hotdata = [];
                    let date = [];
                    let trainArticle = [];
                    let scienceTrainArticle = [];
                    let scienceArticle = [];
                    let video = []
                    for (var i = 0; i < 10; i++) {
                        hot.push(res.message.hotCover[i].title);
                        hotdata.push(res.message.hotCover[i].readNumber)
                    }
                    //    阅读量统计
                    for (var i = 0; i < res.message.readDays.length; i++) {
                        date.push(res.message.readDays[i].date.substr(5,))
                        trainArticle.push(res.message.readDays[i].readData.trainArticle)
                        scienceTrainArticle.push(res.message.readDays[i].readData.scienceTrainArticle)
                        scienceArticle.push(res.message.readDays[i].readData.scienceArticle)
                        video.push(res.message.readDays[i].readData.video)
                    }
                    //=========热点文章开始=======================line_time
                    // var qufenbu_data = echarts.init(document.getElementById("line_time"), 'infographic');

                    // option = {
                    //     title: {
                    //         subtext: "数量",
                    //         textStyle: {
                    //             color: "#fff", //字体颜色
                    //         },
                    //         subtextStyle: {
                    //             color: "#fff", //字体颜色
                    //         },
                    //     },
                    //     tooltip: {
                    //         trigger: "axis",
                    //         textStyle: {
                    //             color: "#fff", //字体颜色
                    //             lineHeight: 80
                    //         },
                    //         position: function (pos, params, dom, rect, size) {// 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                    //             var obj = { top: 60 };
                    //             obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                    //             return obj;
                    //         },
                    //         extraCssText: 'max-width:300px; white-space:pre-wrap;',
                    //         lineHeight: '100'
                    //     },

                    //     calculable: true,
                    //     yAxis: [
                    //         {
                    //             axisLine: {
                    //                 show: true, //y轴线消失
                    //             },
                    //             type: "category",
                    //             data: hot,
                    //             axisLabel: {
                    //                 show: true,
                    //                 textStyle: {
                    //                     color: "#fff",
                    //                 },
                    //                 formatter: function (value) {
                    //                     if (value.length > 4) {
                    //                         return `${value.slice(0, 3)}...`
                    //                     }
                    //                     return value
                    //                 },

                    //             },
                    //         },
                    //     ],
                    //     xAxis: [
                    //         {
                    //             splitLine: {
                    //                 show: false,
                    //             },
                    //             axisLine: {
                    //                 show: true, //y轴线消失
                    //             },
                    //             type: "value",
                    //             axisLabel: {
                    //                 show: true,
                    //                 textStyle: {
                    //                     color: "#fff",
                    //                 },
                    //             },
                    //         },
                    //     ],
                    //     series: [
                    //         {
                    //             name: "阅读量",
                    //             type: "bar",
                    //             data: hotdata,
                    //             color: ["#e9d921"],
                    //         },
                    //     ],
                    // };
                    // qufenbu_data.setOption(option);
                    //=========热点文章结束=======================

                    // 热点文章
                    var qufenbu_data = document.getElementById("line_time");
                    let str = ''
                    for (var i = 0; i < 10; i++) {
                        let srcs = "../images/click.png"
                        str += '<p style="margin-left:5px;cursor:pointer" class="' + hot[i] + '"><i style="margin-right:5px;margin-left:5px">' + (i + 1) + '.</i > ' + hot[i].substr(0, 15) + '...' + '<span style="float:right;color:#d4e8ff;font-size:10px">' + hotdata[i] + '</span ></p > '

                    }
                    qufenbu_data.innerHTML = str
                    //===================近三十天阅读量统计=======================
                    var line_time = echarts.init(document.getElementById("qufenbu_data"), 'macarons');
                    option = {
                        tooltip: {
                            trigger: "axis",
                            axisPointer: {
                                lineStyle: {
                                    color: "rgba(255,255,255,.6)",
                                },
                                type: "shadow",
                            },

                        },
                        legend: {
                            top: "0%",
                            data: ["培训资讯", '科普资讯', '科普文章', '科普视频'],
                            textStyle: {
                                color: "rgba(255,255,255,.5)",
                                fontSize: "12",
                            },
                        },
                        grid: {
                            left: "10",
                            top: "30",
                            right: "10",
                            bottom: "10",
                            containLabel: true,
                        },

                        xAxis: [
                            {
                                type: "category",
                                boundaryGap: false,
                                axisLabel: {
                                    textStyle: {
                                        color: "rgba(255,255,255,.6)",
                                        fontSize: 10,
                                    },
                                    interval: 1,
                                    rotate: 60
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: "rgba(255,255,255,.2)",
                                    },
                                },

                                data: date,
                            },
                            {
                                axisPointer: { show: false },
                                axisLine: { show: false },
                                position: "bottom",
                                offset: 20,
                            },
                        ],

                        yAxis: [
                            {
                                type: "value",
                                axisTick: { show: false },
                                axisLine: {
                                    lineStyle: {
                                        color: "rgba(255,255,255,.1)",
                                    },
                                },
                                axisLabel: {
                                    textStyle: {
                                        color: "rgba(255,255,255,.6)",
                                        fontSize: 12,
                                    },
                                },

                                splitLine: {
                                    lineStyle: {
                                        color: "rgba(255,255,255,.1)",
                                    },
                                },
                            },
                        ],

                        series: [
                            {
                                name: "培训资讯",
                                type: "line",
                                smooth: true,
                                symbol: "circle",
                                symbolSize: 5,
                                showSymbol: false,
                                lineStyle: {
                                    normal: {
                                        color: "#027825",
                                        width: 2,
                                    },
                                },
                                areaStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(
                                            0,
                                            0,
                                            0,
                                            1,
                                            [
                                                {
                                                    offset: 0,
                                                    color: "rgba(1, 132, 213, 0.4)",
                                                },
                                                {
                                                    offset: 0.8,
                                                    color: "rgba(1, 132, 213, 0.1)",
                                                },
                                            ],
                                            false
                                        ),
                                        shadowColor: "rgba(0, 0, 0, 0.1)",
                                    },
                                },
                                itemStyle: {
                                    normal: {
                                        color: "#027825",
                                        borderColor: "rgba(221, 220, 107, .1)",
                                        borderWidth: 12,
                                    },
                                },
                                data: trainArticle,
                            },
                            {
                                name: "科普资讯",
                                type: "line",
                                smooth: true,
                                symbol: "circle",
                                symbolSize: 5,
                                showSymbol: false,
                                lineStyle: {
                                    normal: {
                                        color: "#e9d921",
                                        width: 2,
                                    },
                                },
                                areaStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(
                                            0,
                                            0,
                                            0,
                                            1,
                                            [
                                                {
                                                    offset: 0,
                                                    color: "rgba(1, 132, 213, 0.4)",
                                                },
                                                {
                                                    offset: 0.8,
                                                    color: "rgba(1, 132, 213, 0.1)",
                                                },
                                            ],
                                            false
                                        ),
                                        shadowColor: "rgba(0, 0, 0, 0.1)",
                                    },
                                },
                                itemStyle: {
                                    normal: {
                                        color: "#e9d921",
                                        borderColor: "rgba(221, 220, 107, .1)",
                                        borderWidth: 12,
                                    },
                                },
                                data: scienceTrainArticle,
                            },
                            {
                                name: "科普文章",
                                type: "line",
                                smooth: true,
                                symbol: "circle",
                                symbolSize: 5,
                                showSymbol: false,
                                lineStyle: {
                                    normal: {
                                        color: "#0184d5",
                                        width: 2,
                                    },
                                },
                                areaStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(
                                            0,
                                            0,
                                            0,
                                            1,
                                            [
                                                {
                                                    offset: 0,
                                                    color: "rgba(1, 132, 213, 0.4)",
                                                },
                                                {
                                                    offset: 0.8,
                                                    color: "rgba(1, 132, 213, 0.1)",
                                                },
                                            ],
                                            false
                                        ),
                                        shadowColor: "rgba(0, 0, 0, 0.1)",
                                    },
                                },
                                itemStyle: {
                                    normal: {
                                        color: "#0184d5",
                                        borderColor: "rgba(221, 220, 107, .1)",
                                        borderWidth: 12,
                                    },
                                },
                                data: scienceArticle,
                            },
                            {
                                name: "科普视频",
                                type: "line",
                                smooth: true,
                                symbol: "circle",
                                symbolSize: 5,
                                showSymbol: false,
                                lineStyle: {
                                    normal: {
                                        color: "#bc483e",
                                        width: 2,
                                    },
                                },
                                areaStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(
                                            0,
                                            0,
                                            0,
                                            1,
                                            [
                                                {
                                                    offset: 0,
                                                    color: "rgba(1, 132, 213, 0.4)",
                                                },
                                                {
                                                    offset: 0.8,
                                                    color: "rgba(1, 132, 213, 0.1)",
                                                },
                                            ],
                                            false
                                        ),
                                        shadowColor: "rgba(0, 0, 0, 0.1)",
                                    },
                                },
                                itemStyle: {
                                    normal: {
                                        color: "#bc483e",
                                        borderColor: "rgba(221, 220, 107, .1)",
                                        borderWidth: 12,
                                    },
                                },
                                data: video,
                            },
                        ],
                    };
                    //===================近三十天阅读量统计end=======================

                    line_time.setOption(option);

                },
                error: function (error) {
                    console.log(error)
                }
            })




            //时间选择器
            var startV = '';
            var endV = '';
            laydate.skin('danlan');
            var startTime = {
                elem: '#startTime',
                format: 'YYYY-MM-DD',
                min: '1997-01-01', //设定最小日期为当前日期
                max: laydate.now(), //最大日期
                istime: true,
                istoday: true,
                fixed: false,
                choose: function (datas) {
                    startV = datas;
                    endTime.min = datas; //开始日选好后，重置结束日的最小日期
                }
            };
            var endTime = {
                elem: '#endTime',
                format: 'YYYY-MM-DD',
                min: laydate.now(),
                max: laydate.now(),
                istime: true,
                istoday: true,
                fixed: false,
                choose: function (datas) {
                    //        startTime.max = datas; //结束日选好后，重置开始日的最大日期
                    endV = datas;
                }
            };

            laydate(startTime);
            laydate(endTime);

            //时间选择器
            var startVs = '';
            var endVs = '';
            laydate.skin('danlan');
            var startTimes = {
                elem: '#startTimes',
                format: 'YYYY-MM-DD',
                min: '1997-01-01', //设定最小日期为当前日期
                max: '2099-06-16', //最大日期
                istime: true,
                istoday: true,
                fixed: false,
                choose: function (datas) {
                    startVs = datas;
                    endTimes.min = datas; //开始日选好后，重置结束日的最小日期
                    setQgData($('#barTypes').parent().parent(), 1);
                }
            };
            var endTimes = {
                elem: '#endTimes',
                format: 'YYYY-MM-DD',
                min: laydate.now(),
                max: laydate.now(),
                istime: true,
                istoday: true,
                fixed: false,
                choose: function (datas) {
                    //        startTime.max = datas; //结束日选好后，重置开始日的最大日期
                    endVs = datas;
                    setQgData($('#barTypes').parent().parent(), 1);
                }
            };

            laydate(startTimes);
            laydate(endTimes);




            更改日期插件的样式
            function dateCss() {
                var arr = $('#laydate_box').attr('style').split(';');
                var cssStr =
                    'position:absolute;right:0;';
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].indexOf('top') != -1) {
                        cssStr += arr[i];
                    }
                }

                $('#laydate_box').attr('style', cssStr);
            }


            var workDate;
            var time = {
                elem: '#times',
                format: 'YYYY-MM-DD',
                min: laydate.now(),
                max: laydate.now() + 30,
                istime: true,
                istoday: true,
                fixed: false,
                choose: function (datas) {
                    //        startTime.max = datas; //结束日选好后，重置开始日的最大日期
                    workDate = datas;
                }
            };

            laydate(time);



        },
        error: function (res) {
            console.log(res)
        },
    });









})