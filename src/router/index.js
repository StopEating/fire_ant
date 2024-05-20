import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/components/index.vue'
import indexchangepassword from '@/components/indexchangepassword'
import menu from '@/components/menu.vue'
import show from '@/components/show.vue'
import manager from "@/components/manager.vue";
import trainarticle from "@/components/trainarticle.vue"
import sciencearticle from "@/components/sciencearticle.vue"
import recentarticle from "@/components/recentarticle.vue"
import addtrainarticle from "@/components/addtrainarticle.vue"
import addsciencearticle from "@/components/addsciencearticle.vue"
import data from "@/components/data.vue"
import science from "@/components/science.vue"
import check from "@/components/check.vue"
import newtest from "@/components/newtest.vue"
import setstyle from "@/components/setstyle.vue"
import imagesmanage from "@/components/imagesmanage.vue"
import edits from "@/components/edits.vue"
import adds from "@/components/adds.vue"
import getarticle from "@/components/getarticle.vue"
import getsciencevideo from "@/components/getsciencevideo.vue"
import getsciencearticle from "@/components/getsciencearticle.vue"
import loadvideo from "@/components/loadvideo.vue"
import loadarticle from "@/components/loadarticle.vue"
import questions from "@/components/questions.vue"
import addsingle from "@/components/addsingle.vue"
import addmulty from "@/components/addmulty.vue"
import addjudge from "@/components/addjudge.vue"
import editarticle from "@/components/editarticle.vue"
import editsciencevideo from "@/components/editsciencevideo.vue"
import editsingle from "@/components/editsingle.vue"
import editmulty from "@/components/editmulty.vue"
import editjudge from "@/components/editjudge.vue"
import getdetail from "@/components/getdetail.vue"
import updatastyle from "@/components/updatastyle.vue"
import changepersonalpassword from "@/components/changepersonalpassword.vue"
import topicdataanalysis from "@/components/topicdataanalysis.vue"
import statisticaldetails from "@/components/statisticaldetails.vue"
import statistics from "@/components/statistics.vue"
import dataplatform from "@/components/dataplatform.vue"
Vue.use(Router)

const VueRouterPush = Router.prototype.push
Router.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: 'index',
    },
    {
      path: '/index',
      name: 'index',
      component: index,
    },
    {
      path: '/indexchangepassword',
      name: '修改密码',
      component: indexchangepassword
    },
    {
      path: '/statistics',
      name: '统计详情',
      component: statistics
    },
    // {
    //   path: '/',
    //   redirect: "/indexmenu"
    // },
    {
      path: '/indexmenu',
      name: '首页',
      component: dataplatform
    },
    {
      path: '/menu',
      name: '首页面',
      component: menu,
      children: [
        {
          path: 'show',
          name: '首页',
          component: show
        },
        {
          path: '/menu',
          redirect: "imagesmanage"
        },
        {
          path: 'manager',
          name: '管理员中心',
          component: manager,
          children: [
            {
              path: 'adds',
              name: '添加管理员',
              component: adds
            }, {
              path: 'edits',
              name: '修改管理员密码',
              component: edits
            },
          ]
        }, {
          path: 'changepersonalpassword',
          name: '修改密码',
          component: changepersonalpassword
        },
        {
          path: 'trainarticle',
          name: '培训咨讯',
          component: trainarticle
        }, {
          path: 'addtrainarticle',
          name: '上传培训资讯',
          component: addtrainarticle
        },
        {
          path: 'sciencearticle',
          name: '科普咨讯',
          component: sciencearticle
        }, {
          path: 'addsciencearticle',
          name: '上传科普资讯',
          component: addsciencearticle
        }, {
          path: 'recentarticle',
          name: '近期资讯',
          component: recentarticle,
          children: [

          ]
        }, {
          path: 'editarticle',
          name: '修改文章',
          component: editarticle
        }, {
          path: 'data',
          name: '蚁情上传数据',
          component: data
        }, {
          path: 'science',
          name: '科普视频文章',
          component: science
        }, {
          path: 'check',
          name: '科普活动管理',
          component: check,
          children: [

          ]
        }, {
          path: 'updatastyle',
          name: '修改考试活动',
          component: updatastyle
        }, {
          path: 'newtest',
          name: '新建题目',
          component: newtest,
          children: [
            {
              path: 'addsingle',
              name: '上传单选题',
              component: addsingle
            }, {
              path: 'addmulty',
              name: '上传多选题',
              component: addmulty
            }, {
              path: 'addjudge',
              name: '上传判断题',
              component: addjudge
            }
          ]
        },

        {
          path: 'editjudge',
          name: '修改判断题',
          component: editjudge
        }, {
          path: 'editsingle',
          name: '修改单选题',
          component: editsingle
        }, {
          path: 'editmulty',
          name: '修改多选题',
          component: editmulty
        }, {
          path: 'setstyle',
          name: '设置试卷样式',
          component: setstyle
        }, {
          path: 'topicdataanalysis',
          name: '题目数据分析',
          component: topicdataanalysis
        }, {
          path: 'statisticaldetails',
          name: '统计详情',
          component: statisticaldetails
        }, {
          path: 'imagesmanage',
          name: '轮播图管理',
          component: imagesmanage
        }, {
          path: 'edits',
          name: '修改管理员密码',
          component: edits
        }, {
          path: 'getarticle',
          name: '查看文章',
          component: getarticle
        }, {
          path: 'getsciencevideo',
          name: '查看科普视频',
          component: getsciencevideo
        },
        {
          path: 'getsciencearticle',
          name: '查看科普文章',
          component: getsciencearticle
        }, {
          path: 'loadvideo',
          name: '上传科普视频',
          component: loadvideo
        }, {
          path: 'editsciencevideo',
          name: '修改科普视频',
          component: editsciencevideo
        }, {
          path: 'loadarticle',
          name: '上传科普文章',
          component: loadarticle
        }, {
          path: 'questions',
          name: '题库管理',
          component: questions
        }, {
          path: 'getdetail',
          name: '查看考试排名',
          component: getdetail
        },
      ]
    }
  ]
})
