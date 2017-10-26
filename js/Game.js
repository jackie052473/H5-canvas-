// 游戏类
function Game(ctx,bg,animal,logo,ui,hammer){
	// canvas刷子
	this.ctx = ctx;
	// 背景图片
	this.bg = bg;
	// 要绘制的动物对象
	this.animal = animal;
	// logo图片
	this.logo = logo;
	// ui图片
	this.ui = ui;
	// 定义游戏开始标志
	this.flag = false;
	// 定义游戏开始后的计算帧数
	this.game_frame = 0;
	// 锤子
	this.hammer = hammer;
	// 定义锤子的时间 
	this.hammer_num = 0;
	// 定义洞的位置
	this.positionArr = [
		{
			x:90,
			y:48
		},
		{
			x:10,
			y:110
		},
		{
			x:90,
			y:110
		},
		{
			x:170,
			y:110
		},
		{
			x:90,
			y:178
		}
	];
	// 定义地鼠出现的位置索引
	this.idx = parseInt(Math.random()*	this.positionArr.length);
	// 定义定时器
	this.timer = null;
	// 定义是否渲染锤子
	this.rendHammerLock =false;
	// 定义锤子的位置
	this.hammerPosition ={
		x:0,
		y:0
	}
	this.init();
}
// 方法写在原型上
Game.prototype = {
	constructor:Game,
	// 初始化方法
	init:function(){
		// 开始的时候不能直接运行游戏而是先欢迎界面
		this.main();
		// 绑定事件
		this.bindEvent();
	},
	// 渲染背景
	rendBG : function(){
		this.ctx.drawImage(this.bg,0,0);
	},
	// 清屏
	clear:function(){ 
		this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
	},
	// 渲染地鼠方法
	rendAnimal:function(){
		// 要截取图片 每一个图片有一个宽度 
		this.ctx.drawImage(this.animal.pic,
			this.animal.state*this.animal.width,// 根据当前状态决定绘制哪个地鼠
			0,// 绘制的图片y位置 因为是水平的 永远是0 
			this.animal.width, // 要截取的图片宽度 一个地鼠的宽度
			60,// 高度。 定值 因为三张图片都是60像素高
			this.positionArr[this.idx].x, //使用已经定好的canvas上的洞位置x
			this.positionArr[this.idx].y, //使用已经定好的canvas上的洞位置y
			60,// 以60的定值绘制到canvas上 因为一个兔子的宽度是72 所以不能使用this.animal.width
			60 //定值 与高度等同
			);
	},
	// 启动
	start : function(){
		// 保存this
		var me = this;
		// 更改游戏开始标志
		this.flag = true;
		this.timer = setInterval(function(){
			// 更新游戏的帧（这个帧是游戏开始的时候才有)
			me.game_frame ++;
			// 清屏
			me.clear();
			// 渲染背景
			me.rendBG();
			// 渲染动物 
			me.rendAnimal();
			// 渲染锤子
			console.log(me.hammer_num)
			if(me.game_frame%2){ // 每两帧生长一次 也是一种延缓频率的方式
				me.animal.growUp(); 
				if(me.rendHammerLock){
					me.hammer_num++;
					// 同时要判断 前5帧渲染锤子 后5帧渲染星星
					me.rendHammer(me.hammer_num>5?false:true,me.hammerPosition.x,me.hammerPosition.y);
					if(me.hammer_num>10){
						me.rendHammerLock=false;
						me.hammer_num=0;
					}
				}
			}  
			// 在生长方法中判断如果已经this.lifeNum超过this.wholeLife 则重新初始化
			if(me.animal.lifeNum>=me.animal.wholeLife){
				me.animal.init();
				me.idx = parseInt(Math.random() *	me.positionArr.length);
			}
		},20)
	},
	// 主界面
	main:function(){
		this.rendBG();
		this.rendLogo();
		this.rendStartText();
	},
	// 渲染logo
	rendLogo:function(){
		this.ctx.drawImage(this.logo,0,0);
	},
	// 开始游戏
	rendStartText:function(){
		this.ctx.drawImage(this.ui,0,0,60,16,(240-60)/2,180,60,16);
	},
	// 按下回车之后开始游戏
	bindEvent:function(){
		var me = this;
		document.onkeydown = function(e){
			if(!me.flag  && e.keyCode === 13){
				me.start();
			}else if(me.flag && e.keyCode===37 || e.keyCode===38 || e.keyCode === 39 || e.keyCode===40 || e.keyCode=== 32){
				// 如果游戏已经开始并且按下的是方向键 开始判定
				me.check(e.keyCode);
				// 打开渲染锤子的开关
				me.rendHammerLock = true; 
			}
		}
	},
	// 检测方法
	check :function(keyCode){
		if(keyCode === 37 && this.idx === 1){
			// 地鼠死亡	
			this.animal.goDie();
		}else if(keyCode === 38 && this.idx ===0){
			// 地鼠死亡
			this.animal.goDie();
		}else if (keyCode === 39 && this.idx === 3){
			// 地鼠死亡
			this.animal.goDie();
		}else if(keyCode === 40 && this.idx === 4){
			// 地鼠死亡
			this.animal.goDie();
		}else if(keyCode === 32 && this.idx === 2){
			// 地鼠死亡
			this.animal.goDie();
		} 
		// 会得到keyCode值 
		if(keyCode === 37){
			this.hammerPosition = this.positionArr[1];
		}else if(keyCode === 38){
			this.hammerPosition = this.positionArr[0];
		}else if(keyCode === 39){
			this.hammerPosition = this.positionArr[3];
		}else if(keyCode === 40){
			this.hammerPosition = this.positionArr[4];
		}else if(keyCode === 32){
			this.hammerPosition = this.positionArr[2];
		}

	},
	// 渲染锤子
	rendHammer:function(boolean,x,y){
		// 渲染锤子的时候要分情况。
		this.ctx.drawImage(this.hammer,boolean?0:87,0,87,60,x,y,87,60);
	}
}