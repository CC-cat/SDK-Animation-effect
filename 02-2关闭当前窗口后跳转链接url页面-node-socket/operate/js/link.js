
var flag = false;
var timeout = null;
var socket = null;

function lineServer()
{
	socket = io.connect('http://localhost:1800');
	// socket = io.connect('127.0.0.1:6000');
	var mName2 = "192.168.1.11";
	var serverMsgName = "serverMsg"+mName2;
	//连接后注册新用户
	socket.emit('newUser', mName2);

	//连接成功返回的提示
	 socket.on('open', function(json)
	{
		flag = true;
		console.log(json);
	});

	 /*页面逻辑-- 开始*/
 	 var serverMsgName = "serverMsg"+ mName2;
	 socket.on(serverMsgName, function(json)
	 {
	 	console.log(json);
 		// 根据命令做执行对应的操作
 		dealData(json);
	 });

	 /*页面逻辑-- 结束*/


	//断开
	socket.on('DisconnectReq', function() {
		 socket.emit('disconnect');
	});

	timeout = setTimeout(function(){
		if(flag){
			//连上了
			clearTimeout(timeout);
		}else{
			window.location.reload();
		}
	},5000);
}

$(function(){
	lineServer();
});


function btnClick(msg){
	console.log(msg);
	socket.emit("message",'192.168.1.32',msg);
}

function dealData(msg){
	//0代表返回待机页面
	console.log(msg);

	// 跳转页面
	if(!isNaN(msg)){
		_changeData(msg);

	};

};

var _link = ['web1','web2','index'];

var _changeData = function(msg){

	closeWindow(_link[msg]+".html");
};


var closeWindow = function(url){
 // window.open(url);
 window.opener=null;
 window.open(url,'_blank');
 window.close();

}

$(function(){
	$(".btn li").on("click", function(){
		var index = $(this).index();
		$(".btn li").removeClass("currentLi");
		$(this).addClass("currentLi");

		closeWindow(_link[index]+".html");
		btnClick(index);

	});
});
