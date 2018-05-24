/*
	客户端连接播控的代码
*/
var socket = null;
$(function(){
	setTimeout("linkSocket()",30);
	setTimeout("linkSocket()",35000);
});

// 连接操作
function linkSocket(){
	// 1.连接服务器
	socket = io.connect('http://localhost:1800'); // server ip
	var mName = "192.168.1.32"; // local ip
	socket.emit('newUser', mName);

	// 连接成功返回提示
	socket.on('open', function(json){
		console.log(json);
	});

	// 2.监听服务器端的命令
	var serverMsgName = "serverMsg"+mName;
	socket.on(serverMsgName, function(json){
		console.log(json);
		// 根据命令做执行对应的操作
		dealData(json);
	});

	// 3.断开连接
	socket.on('DisconnectReq', function(){
		socket.emit('disconnect');
	});
}

function btnClick(msg){
	console.log(msg);
	socket.emit("message",'192.168.1.11',msg);
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

};

$(function(){
	$(".btn li").on("click", function(){
		var index = $(this).index();
		$(".btn li").removeClass("currentLi");
		$(this).addClass("currentLi");

		closeWindow(_link[index]+".html");
		btnClick(index);

	});
});
