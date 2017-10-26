function Animal(pics){
	// 地鼠的图片
	this.pics = pics;
	// 具体是哪个类型的地鼠或者是兔子要随机
	this.idx = parseInt(Math.random()*this.pics.length);
	// 具体的图片
	this.pic = this.pics[this.idx];
	// 每一个图片的元素在渲染的时候宽度不一致所以要分情况
	this.width = this.pic.width/5;
	// 初始化图片永远是0
	this.state =0;
	// 添加一个属性 延缓state的改变
	this.lifeNum = 0;
	// 有一个整体的生命周期 50
	this.wholeLife = 50;
	// 地鼠是否存活
	this.alive = true;
}
Animal.prototype = {
	constructor:Animal,
	// 长大方法
	growUp : function(){
		// 更改自己的lifeNum值 该值用于判定当前的state。而state决定使用的图片 体现在游戏中就是地鼠的当前状态
		this.lifeNum++;
		// 更新状态
		this.changeState(); 
	},
	changeState :function(){
		// 如果lifeNum小于10 使用第0 张图片
		if(this.lifeNum < 10){
		 	this.state = 0;
		}else if (this.lifeNum <20){// 小于20 使用第1张图片
			this.state = 1;
		}else {
			// 如果地鼠一直活着 则进行来回切换。
			if(this.alive){
				// 切换  如果对4取余并小于1 使用状态2 否则使用状态3 因为对4取余只有0、1、2、3四种可能性 所以如果小于等于1 有 0 1 符合。那么这两帧使用的是状态2 后两帧使用的是状态3
				// 这样不会每一帧都切换。是一种减少切换频率的方式 
		  	this.state = this.lifeNum % 4 <= 1 ?  2 : 3; 
			}else{
				// 如果已经死了 则更改状态为4  
				this.state = 4 ;
			}
		}
	},
	// 地鼠死亡
	goDie : function(){
		// 将alive标识改为false 
		this.alive = false;
		// 并将lifeNum更新为40 否则 将会从当前帧一直到40 才更换新的地鼠 
		this.lifeNum = 40;
	},
	// 重新初始化
	init:function(){ 
			// 具体是哪个类型的地鼠或者是兔子要随机
			this.idx = parseInt(Math.random()*this.pics.length);
			// 具体的图片
			this.pic = this.pics[this.idx];
			// 每一个图片的元素在渲染的时候宽度不一致所以要分情况
			this.width = this.pic.width/5;
			// 初始化图片永远是0
			this.state =0;
			// 添加一个属性 延缓state的改变
			this.lifeNum = 0;
			// 有一个整体的生命周期 50
			this.wholeLife = 50;
			// 地鼠是否存活
			this.alive = true;
	}

}