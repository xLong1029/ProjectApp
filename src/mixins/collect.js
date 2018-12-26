
/*
 * 功能 : 混入-资讯收藏设置
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2018-12-25
 * 版本 : version 1.0
 */

// Api方法
import Api from "api/news.js";
// 通用js
import { GetLocalS } from "common/important.js";

export default {
	data() {
		return {
            // 是否显示选择弹窗
            showSelectModel: false,
            // 分组列表加载
            listLoading: false,
            // 分组列表
            groupList: [],
            // 选择值索引
            selectIndex: -1,
            // 是否显示删除提示弹窗
            showDelComfir: false,
            // 是否显示新增分组弹窗
            showAddModel: false,
            // 新增分组名称
            groupName: '',
            // 是否已收藏
            isCollect: false,
            // 当前收藏的文章id
            newsId: 0,
            // 当前文章的收藏信息
            newsCont: {
                group:{
                    id: 0,
                    name: ''
                },
                isCollect: false
            },
        }
    },
    methods:{
        // 收藏文章
        collect(){
            // 判断是否已登录
            if(GetLocalS('project_token')) {
                // 已收藏
                if(this.newsCont.isCollect){
                    // 取消收藏
                    this.showDelComfir = true;
                    return true;
                }
                // 未收藏
                else{
                    this.showSelectModel = true;
                    this.getGroups();
                }                    
            }
            else this.showWarnModel('登录账户才可以收藏', 'warning');
        },
        // 保存收藏
        saveCollect(){
            if(this.newsCont.group.id == 0){
                this.showWarnModel('请选择分组', 'warning');
                return false;
            }

            Api.AddArticle({
                declareId: this.newsId,
                groupId: this.newsCont.group.id
            })
            .then(res => {
                if(res.code == 200) {
                    this.hideSelectModel();
                }
                else this.showWarnModel(res.msg, 'warning');
            })
            .catch(err => console.log(err))
        },
        // 取消收藏确认
        cancelCollect(){
            Api.DeleteArticle([this.newsId])
            .then(res => {
                this.pageLoading = false;
                if(res.code == 200){
                    this.hideDelModel();
                }
                else this.showWarnModel(res.msg, 'warning');
            })
            .catch(err => console.log(err))
        },
        // 关闭“取消收藏”弹窗
        hideDelModel(value){
            this.showDelComfir = value;
        },
        // 获取分组信息
        getGroups(){
            this.listLoading = true;
            Api.GetGroups()
            .then(res => {
                this.listLoading = false;
                if(res.code == 200){
                    this.groupList = res.data;
                }
                else{
                    this.showWarnModel(res.msg, 'warning');
                    this.showSelectModel = false;
                }
            })
            .catch(err => console.log(err))
        },
        // 关闭分组弹窗
        hideSelectModel(){
            this.showSelectModel = false;
            this.newsCont.group.id = 0;
            this.selectIndex = -1;
        },
        // 选择分组
        getGroupSelect(item, index){
            this.newsCont.group.id = item.id;
            this.selectIndex = index;
        },
        // 显示“新增分组”弹窗
        showAddGroup(){
            this.showAddModel = true;
            this.groupName = '';
        },
        // 关闭“新增分组”弹窗
        hideAddModel(value){
            this.showAddModel = value;
        },
        // 新增分组
        addGroup(){
            if(this.groupName == ''){
                this.showWarnModel('请输入分组名称', 'warning');
                return false;
            }

            Api.AddGroup(this.groupName)
            .then(res => {
                this.pageLoading = false;
                if(res.code == 200){
                    this.getGroups();
                    this.showAddModel = false;
                }
                else this.showWarnModel(res.msg, 'warning');
            })
            .catch(err => console.log(err))
        }
    }
}