<template>
	<el-container class="container-out">
		<el-aside style="width: 220px">
			<el-menu
				style="height: 100%"
				default-active="1"
				@select="select"
				class="el-menu-vertical-demo"
				background-color="#545c64"
				text-color="#fff"
				active-text-color="#ffd04b"
			>
				<el-menu-item index="1">
					<img class="icon-pic" :src="pics.rocket" alt />
					<span slot="title">舆情动态</span>
				</el-menu-item>
				<el-menu-item index="2">
					<img class="icon-pic" :src="pics.trend" alt />
					<span slot="title">舆情分析</span>
				</el-menu-item>
			</el-menu>
		</el-aside>
		<el-container>
			<el-header>
				<div class="header">
					<i class="el-icon-bell"></i>
					<span>您好，{{userName}}</span>
					<div class="avatar" @click="$router.push('/customerList')">
						<i class="el-icon-user"></i>
					</div>
				</div>
			</el-header>
			<el-main class="main-container" style="padding: 0">
				<template v-if="menuActive === '1'">
					<div class="monitoring-scheme">
						检测方案
						<i class="el-icon-circle-plus"></i>
						<el-select class="monitoring-scheme-select" v-model="value" size="mini" placeholder="请选择">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</div>
					<div class="container-main">
						<div class="count">所有文字{{total}}条</div>
						<div class="news-list-wrapper">
							<el-scrollbar>
								<ul class="news-list">
									<li class="news-item" v-for="(item, index) in news" :key="index">
										<div class="checkbox-wrapper">
											<div class="inner">
												<el-checkbox v-model="item.checked"></el-checkbox>
												{{item.id}}
											</div>
										</div>
										<div class="news-title">
											<div class="inner">
												<strong class="title" @click="toDetail(item.link)">{{item.title}}</strong>
												<p class="time-source">{{item.publishdate}} {{item.sourcefrom}}</p>
												<p class="abstract" @click="toDetail(item.link)">
													<span>摘要：</span>
													{{item.content}}
												</p>
												<p class="keys">
													<span class="keys-item">
														<el-popover
															placement="top-start"
															width="200"
															trigger="hover"
															:content="item.keywords"
														>
															<span slot="reference">关键词</span>
														</el-popover>
													</span>
													<span class="keys-item">
														<el-popover
															placement="top-start"
															width="200"
															trigger="hover"
															:content="item.classify === 0 ? '消极': '积极'"
														>
															<span slot="reference">情感倾向</span>
														</el-popover>
													</span>
													<span class="keys-item">
														<el-popover
															placement="top-start"
															width="200"
															trigger="hover"
															:content="item.abstractextract"
														>
															<span slot="reference">事件信息</span>
														</el-popover>
													</span>
												</p>
											</div>
										</div>
									</li>
								</ul>
							</el-scrollbar>
						</div>
						<div class="pagination-wrapper">
							<el-pagination
								background
								@current-change="handleCurrentChange"
								@size-change="handleSizeChange"
								:page-sizes="[10, 20, 50, 100]"
								:current-page.sync="pagination.currentPage"
								:page-size="pagination.pageSize"
								layout="sizes, total, prev, pager, next"
								:total="pagination.total"
							></el-pagination>
						</div>
					</div>
				</template>
				<template v-if="menuActive === '2'">
					<el-scrollbar>
						<div class="charts-wrapper">
							<div id="myCharts"></div>
						</div>
						<div class="radio">
							<div class="ratio-inner">
								<div class="line-left">文章数量</div>
								<div class="line-bottom">
									<div class="dot">
										<div class="line" style="visibility: hidden;"></div>
										<span class="number">0</span>
									</div>
									<div class="dot">
										<div class="line"></div>
										<span class="number">140</span>
									</div>
									<div class="dot">
										<div class="line"></div>
										<span class="number">280</span>
									</div>
									<div class="dot">
										<div class="line"></div>
										<span class="number">420</span>
									</div>
									<div class="dot">
										<div class="line"></div>
										<span class="number">560</span>
									</div>
									<div class="dot">
										<div class="line"></div>
										<span class="number">700</span>
									</div>
								</div>
								<div class="radio-color">
									<div class="max"></div>
									<div class="middle"></div>
									<div class="mini"></div>
								</div>
							</div>
						</div>
					</el-scrollbar>
				</template>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
import axios from "axios";
import echarts from "echarts";
import { find } from "lodash";
export default {
	name: "Home",
	components: {},
	data() {
		return {
			pics: {
				rocket: require("@/assets/imgs/rocket.png"),
				trend: require("@/assets/imgs/trend.png")
			},
			value: "",
			total: 0,
			userName: sessionStorage.getItem("userName"),
			pagination: {
				total: 0,
				currentPage: 1,
				pageSize: 10
			},
			options: [
				{
					value: "1",
					label: "疫情"
				},
				{
					value: "2",
					label: "流感"
				}
			],
			newsPre: [],
			news: [],
			menuActive: "1"
		};
	},
	mounted() {
		this.getNewList();
	},
	methods: {
		getNewList() {
			axios
				.post(
					`${this.$apiOrigin}/data/Original/list?
				page=${this.pagination.currentPage}&rows=${this.pagination.pageSize}`
				)
				.then(res => {
					let myData = res.data;
					this.total = myData.total;
					this.pagination.total = myData.total;
					let listData = myData.rows;
					listData.forEach(o => {
						o.checked = false;
					});
					this.news = listData;
					// this.getKeywords(listData);
				})
				.catch(err => {});
		},
		getKeywords(dataPre) {
			axios
				.post(
					`${this.$apiOrigin}/yuqing/nlp?
				page=${this.pagination.currentPage}&rows=${this.pagination.pageSize}`
				)
				.then(res => {
					let data = res.data;
					dataPre.forEach((itemPre, index) => {
						let findItem = find(data, o => o.contentid === itemPre.id);
						if (findItem) {
							itemPre.keywords = findItem.keywords;
							itemPre.abstractextract = findItem.abstractextract;
							itemPre.classify = findItem.classify;
						}
					});
					console.log(dataPre);
					this.news = dataPre;
				})
				.catch(err => {
					// throw new Error(err.msg);
				});
		},
		toDetail: function(link) {
			window.location.href = link;
		},
		select: function(index) {
			this.menuActive = index;
			if (index === "2") {
				let _self = this;
				this.$nextTick(function() {
					_self.initMycharts();
				});
			}
		},
		handleCurrentChange(page) {
			console.log(page);
			this.pagination.currentPage = page;
			this.getNewList();
		},
		handleSizeChange(size) {
			console.log(size);
			this.pagination.currentPage = 1
			this.pagination.pageSize = size;
			this.getNewList();
		},
		initMycharts: function() {
			var myChart = echarts.init(document.getElementById("myCharts"));
			var option = {
				title: {
					text: "负面信息分布图",
					left: "center"
				},
				tooltip: {
					trigger: "item",
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				legend: {
					bottom: "bottom",
					data: ["微博", "新闻", "APP"]
				},
				series: [
					{
						name: "信息来源",
						type: "pie",
						radius: "55%",
						center: ["50%", "50%"],
						color: [
							"#4962fc",
							"#dd3ee5",
							"#12e78c",
							"#f4cb29",
							"#4b7cf3",
							"#fd9e06",
							"#fe8104",
							"#8cb39b",
							"#12e78c"
						],
						data: [
							{ value: Math.floor(618 * 0.3181), name: "微博" },
							{ value: Math.floor(618 * 0.2877), name: "新闻" },
							{ value: Math.floor(618 * 0.1027), name: "APP" },
							{ value: Math.floor(618 * 0.0205), name: "其它" },
							{ value: Math.floor(618 * 0.0627), name: "论坛" },
							{ value: Math.floor(618 * 0.0277), name: "自媒体" },
							{ value: Math.floor(618 * 0.0481), name: "头条" },
							{ value: Math.floor(618 * 0.0637), name: "微信" },
							{ value: Math.floor(618 * 0.0688), name: "博客" }
						],
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: "rgba(0, 0, 0, 0.5)"
							}
						}
					}
				]
			};
			myChart.setOption(option);
		}
	}
};
</script>
<style lang='scss'>
#app {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
}
.my-popover {
	width: 400px;
}
.container-out {
	position: relative;
	border: solid 1px #ddd;
	height: 100%;
}

.el-menu-vertical-demo .el-menu-item.is-active {
	background-color: #323541 !important;
}

.el-header {
	padding: 0 !important;
}

.header {
	height: 60px;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	border-bottom: solid 1px #ddd;
}

.header .el-icon-bell {
	font-size: 18px;
	margin-right: 20px;
}

.header .el-icon-user {
	font-size: 26px;
}

.header .avatar {
	display: flex;
	cursor: pointer;
	justify-content: center;
	align-items: center;
	width: 45px;
	height: 45px;
	border-radius: 50%;
	border: solid 1px #ddd;
	margin-left: 5px;
	margin-right: 20px;
}

.el-main {
	position: relative;
}

.monitoring-scheme {
	color: #4f4febd1;
	font-size: 14px;
	display: flex;
	align-items: center;
	margin-top: 10px;
	padding: 0 20px;
}

.monitoring-scheme-select {
	margin-left: 20px;
}

.main-container .el-scrollbar,
.main-container .el-scrollbar__view {
	height: 100%;
}

.main-container .el-scrollbar__wrap {
	overflow-x: hidden;
	overflow-y: scroll;
}

.icon-pic {
	width: 18px;
	height: 18px;
	margin-right: 5px;
}

.news-list-wrapper {
	width: calc(100% - 5px);
	position: absolute;
	top: 100px;
	bottom: 60px;
	overflow: hidden;
}

.container-main .count {
	height: 40px;
	line-height: 40px;
	padding: 0 10px;
	background: #e3e3efd1;
	margin-top: 10px;
	width: 100%;
	text-align: left;
}

.news-list .news-item {
	display: flex;
	border-bottom: solid 1px rgb(153, 152, 152);
}

.news-list .news-item .inner {
	padding: 20px 0;
}

.news-list .news-item .checkbox-wrapper {
	width: 60px;
	display: flex;
	justify-content: center;
	border-right: solid 1px rgb(153, 152, 152);
}

.news-list .news-item .news-title {
	flex: 1;
	padding-left: 20px;
}

.news-list .news-item .news-title .title {
	display: inline-block;
	margin-bottom: 5px;
	font-size: 18px;
	cursor: pointer;
}

.news-list .news-item .news-title .time-source {
	font-size: 14px;
	color: #323541;
}

.news-list .news-item .news-title .abstract {
	margin-top: 10px;
	cursor: pointer;
	text-align: left;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	span {
		font-weight: bold;
	}
}

.news-list .news-item .news-title .keys {
	display: flex;
	margin-top: 20px;
	font-size: 14px;
	color: #569ae7;
}

.news-list .news-item .news-title .keys .keys-item {
	margin-right: 80px;
	cursor: pointer;
}

.pagination-wrapper {
	position: absolute;
	bottom: 20px;
	width: calc(100% - 60px);
	text-align: right;
}

#myCharts {
	width: 100%;
	height: 450px;
	margin-top: 40px;
}

.radio {
	width: 100%;
	display: flex;
	justify-content: center;
	margin-top: 20px;
}

.ratio-inner {
	height: 130px;
	width: 500px;
	position: relative;
}

.line-left {
	position: absolute;
	height: 140px;
	left: -60px;
	bottom: -5px;
	border-right: solid 1px #2549f2;
	white-space: nowrap;
	color: #2549f2;
	line-height: 160px;
	font-size: 14px;
	width: 60px;
}

.line-bottom {
	position: absolute;
	height: 10px;
	left: -5px;
	bottom: -10px;
	border-top: solid 1px #2549f2;
	width: 110%;
}

.dot {
	position: absolute;
	top: 0;
	display: flex;
	flex-direction: column;
}

.dot:nth-of-type(1) {
	left: 5px;
}

.dot:nth-of-type(2) {
	left: 100px;
}

.dot:nth-of-type(3) {
	left: 200px;
}

.dot:nth-of-type(4) {
	left: 300px;
}

.dot:nth-of-type(5) {
	left: 400px;
}

.dot:nth-of-type(6) {
	left: 500px;
}

.dot .line {
	width: 10px;
	height: 5px;
	border-right: solid 1px #2549f2;
}

.dot .number {
	font-size: 14px;
	color: #2549f2;
	margin-top: 2px;
	margin-left: -5px;
}

.radio-color {
	display: flex;
	width: 100%;
	height: 100%;
}

.max {
	height: 100%;
	width: 159.9px;
	background-color: #4962fc;
}

.middle {
	height: 100%;
	width: 144px;
	background-color: #dd3ee5;
}

.mini {
	height: 100%;
	width: 51px;
	background-color: #12e78c;
}
</style>
