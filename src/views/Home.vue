<template>
	<el-row class="container">
		<el-col :span="24" class="header">
			<el-col :span="18">
				<div class="logo" :class="{'collapse':menuCollapsed}">
					<img src="../../static/img/index_logo.png"/>
				</div>
				<div class="tools" @click="changeMenu">
					<img src="../../static/img/abeam_home.png"/>
				</div>
				<div class="first_nav">
					<el-breadcrumb separator="/" class="breadcrumb-inner">
						<el-breadcrumb-item>
							首页
						</el-breadcrumb-item>
						<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
							{{ item.name }}
						</el-breadcrumb-item>
					</el-breadcrumb>
				</div>
			</el-col>
			<el-col :span="5" class="userinfo">
				<el-dropdown>
					<span class="el-dropdown-link userinfo-inner">{{sysUserName}} <img :src="sysUserAvatar" /> </span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>我的消息</el-dropdown-item>
						<el-dropdown-item>设置</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				<el-dropdown>
					<span class="el-dropdown-link notice"><i class="fa fa-bell"></i></span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>1</el-dropdown-item>
						<el-dropdown-item>2</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">1</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				<span class="el-dropdown-link logout"><i class="fa fa-power-off"></i></span>
			</el-col>
		</el-col>
		<el-col :span="24" class="main">
			<aside class="cover_textColor">
				<!--导航菜单-->
				<el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" @select="handleSelect"
					 unique-opened router :collapse="menuCollapsed"
					 background-color="#545c64"
					text-color="#fff"
					active-text-color="#ffd04b"
					 >
					<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
						<el-submenu :index="index+''" v-if="!item.leaf" :key="index">
							<template slot="title">
								<i :class="item.iconCls"></i>
								<span slot="title">{{item.name}}</span>
							</template>
							<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden"><i :class="child.iconCls"></i> {{child.name}}</el-menu-item>
						</el-submenu>
					    
						<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path" :key="index"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
					</template>
				</el-menu>
			</aside>
			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-row>
					<el-col :span="24" class="breadcrumb-container">
						<div class="tagWrapper" ref="tagWrapper">
							<div ref="tagContent">
								<el-tag
								class="page-tags"
								:key="tag.name"
								v-for="(tag,index) in pageTags"
								:class="{'active':tag.isActive}"
								:closable="tag.closable"
								:disable-transitions="false"
								@close="tagClose(tag)"
								>
								<el-dropdown size="small" :show-timeout='500'>
									<span v-on:click="goTagPage(tag)" class="no-outline">
										<i class="fa fa-circle"></i> {{tag.name}}
									</span>
									<el-dropdown-menu slot="dropdown">
										<el-dropdown-item v-if="index>0" v-on:click.native="tagsDropdown(tag,'0')">关闭本页</el-dropdown-item>
										<el-dropdown-item v-if="index>0" v-on:click.native="tagsDropdown(tag,'1')">关闭左侧</el-dropdown-item>
										<el-dropdown-item v-if="index>0" v-on:click.native="tagsDropdown(tag,'2')">关闭右侧</el-dropdown-item>
										<el-dropdown-item v-on:click.native="tagsDropdown(tag,'3')">关闭所有</el-dropdown-item>
									</el-dropdown-menu>
								</el-dropdown>
								
								</el-tag>
							</div>
						</div>
						<div class="tagNext" v-show="showNext" @click="tagNext">
							<i class="el-icon-d-arrow-right"></i>
						</div> 
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<keep-alive :exclude="cachePage.exclude"><!--:include="cachePage.include" -->
								<router-view></router-view>
							</keep-alive>
						</transition>
						<!-- <transition name="fade" mode="out-in">
							<router-view v-if="!$route.meta.keepAlive"></router-view>
						</transition> -->
					</el-col>
					</el-row>
				</div>
			</section>
		</el-col>
	</el-row>
</template>

<script>
import { mapGetters,mapState } from 'vuex'
import BScroll from 'better-scroll'
	export default {
		data() {
			return {
				sysUserName: '',
				sysUserAvatar: 'http://www.18183.com/uploads/allimg/140616/61-140616111040.jpg',
				showNext:false,
			}
		},
		computed: {
			...mapState({
				menuCollapsed: state => state.menuCollapsed,
				pageTags: state => state.pageTags,
				cachePage: state => state.cachePage,
			}) 
		},
		watch:{
			pageTags:function(){
				this.tagBScroll()
			}
		},
		mounted(){
			this.tagBScroll()
			this.$refs.tagContent.oncontextmenu=(e)=>{
				window.event.returnValue=false;  
        		return false;  
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			handleOpen() {
				//console.log('handleopen');
			},
			handleClose() {
				//console.log('handleclose');
			},
			handleSelect: function (a, b) {
			},
			//点击标签页
			goTagPage(tag){
				this.$router.push(tag.url)
			},
			//标签页操作（关闭标签，自动跳转前一页）
			tagClose(tag){
				let index=this.pageTags.indexOf(tag)
				this.$store.dispatch('deletePageTags',index)
				this.$store.dispatch('excludeCachePage',[tag.component])
			},
			//标签页的下拉操作
			tagsDropdown(tag,type){
				if(type=='0'){
					this.tagClose(tag)
				}else if(type=='1'){
					let tags=JSON.parse(JSON.stringify(this.pageTags))
					let index=tags.findIndex(function(item, index, arr) {  
						return item.url == tag.url;  
					})
					let delTags=tags.slice(1,index)
					let excludeCachePage=this.getExcludeCachePage(delTags)
					let newTags=tags.slice(index)
					this.$store.dispatch('updatePageTags',newTags)
					this.$store.dispatch('excludeCachePage',excludeCachePage)
				}else if(type=='2'){
					let tags=JSON.parse(JSON.stringify(this.pageTags))
					let index=tags.findIndex(function(item, index, arr) {  
						return item.url == tag.url;  
					})
					let newTags=tags.slice(0,index+1)
					let delTags=tags.slice(index+1)
					let excludeCachePage=this.getExcludeCachePage(delTags)
					this.$store.dispatch('updatePageTags',newTags)
					this.$store.dispatch('excludeCachePage',excludeCachePage)
				}else if(type=='3'){
					this.$store.dispatch('updatePageTags',[])
				}
			},
			//计算需所有需要在下一次排除keep-alive缓存的component
			getExcludeCachePage(delTags){
				let excludeCachePage=[]
				delTags.forEach((item)=>{
					excludeCachePage.push(item.component)
				})
				return excludeCachePage
			},
			//退出登录
			logout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					sessionStorage.removeItem('user');
					_this.$router.push('/login');
				}).catch(() => {

				});
			},
			//初始化标签页tag滚动
			tagBScroll(){
				this.$nextTick(() => {
					let tags=this.$refs.tagContent.children
					let width=0
					if(tags.length<1){
						return false
					}
					for(let i=0;i<tags.length;i++){
						width=width+tags[i].offsetWidth
					}
					width=width+(tags.length*10)
					if(width>this.$refs.tagWrapper.offsetWidth){
						this.showNext=true
					}else{
						this.showNext=false
					}
					this.$refs.tagContent.style.width=width+'px'
					this.scroll = new BScroll(this.$refs.tagWrapper, {
						scrollX:true,
						bounce:true
					})
				})
			},
			//标签页向左滑动
			tagNext(){
				this.scroll.scrollBy(-100,0,300)
			},
			//左侧菜单展开关闭
			changeMenu(){
				this.$store.dispatch('changeMenu',!this.menuCollapsed)
			},
			
		},
	}

</script>

<style scoped lang='scss'>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 210px;
  }	
  .el-menu-vertical-demo{
	  min-height: 100%;
  }
	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
	}
	.header {
		height: 60px;
		line-height: 60px;
		background-color: #ffffff;
		box-shadow: 2px 4px 8px 1px 
			rgba(73, 80, 96, 0.16);
	}
	.userinfo {
		text-align: right;
		padding-right: 35px;
		float: right;
		.el-dropdown{
				vertical-align: middle;
				text-align: center
			}
	}	
	.userinfo-inner {
		cursor: pointer;
		color:#333333;
	}
	.userinfo-inner img {
		width: 40px;
		height: 40px;
		border-radius: 20px;
		margin: 10px 10px 10px 10px;
		float: left;
	}
	.notice,.logout{
		margin: 0 10px;
		cursor: pointer;
	}
	.logo {
		height:60px;
		width: 210px;
		font-size: 22px;
		box-shadow: 2px 4px 8px 1px 
		rgba(73, 80, 96, 0.16);
		float: left;
		overflow: hidden;
		transition: width 0.3s ease-in-out;
	}
	.logo.collapse{
		width: 64px
	}	
	.logo img {
		width: 190px;
		float: left;
		margin: 10px 10px 10px 15px;
	}
	.tools{
		padding: 0px 23px;
		width:22px;
		height: 60px;
		line-height: 60px;
		cursor: pointer;
		float: left;
	}
	.tools img{
		margin-top: 22px;
	}
	.first_nav{
		float: left;
	}
	.first_nav div{
		float: left;
		height: 60px;
		font-size: 14px;
		color: #495060;
		line-height: 60px;
		margin-left: 10px;
	}
	.main {
		display: flex;
		position: absolute;
		top: 60px;
		bottom: 0px;
		overflow: hidden;
	}
	.main aside {
		
	}
	// .el-menu{
	// 	height: 100%;
	// 	background-color: #495060;
	// }
	.el-menu li{
		color: #c9cbd0;
	}
	.el-menu-item:hover{
		background-color: #363e4f;
		color: #fff;
	}
	.el-submenu__title i {
        color: #c9cbd0;
	}
	.is-active{
		color: #fff!important;
	}
	.content-container {
		flex:1;
		overflow-y: scroll;
		padding: 10px;
		
	}
	.content-wrapper {
		//background-color: #fff;
		box-sizing: border-box;
		margin-top: 10px
	}

	.breadcrumb-container{
		display: flex;
		.page-tags{
			cursor: pointer;
			background-color:#fff;
			color:#48576a;
			padding: 5px 12px;
			line-height: 22px ;
			height: 34px;
			margin: 0 3px;
			.fa{
				color: #e2e2e2
			}
			&.active{
				.fa{
					color:#408fc5
				}
			}
			
		}
		.tagWrapper{
			flex: 1;
			white-space: nowrap;
			overflow: hidden;
		}
		.tagNext{
			width: 50px;
			text-align: center;
			line-height: 34px;
			background: #fff;
			cursor: pointer;
			border-left: 1px solid #eee;
			&:hover{
				background-color:#f9f9f9 
			}
		}
	}
	
</style>