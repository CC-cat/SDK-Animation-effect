监听用户是否在当前窗口浏览

document.addEventListener("visibilitychange",function(){

        if(document.visibilityState=="visible"){
        console.log("欢迎回来！")

        //do something

        //继续视频播放
        }
        if(document.visibilityState=="hidden"){
        console.log("不要走！")

        setTimeout(function(){
            window.open("http://localhost/show/index.html","_blank");
            window.close();
        },3000);

        //do something else

        //暂停视频播放
        }

    });
