/**
 * Created by Administrator on 2016/5/18.
 */
function sendUserMessage(username,userMessage,messageisTrue){
    name = username;
    message=userMessage;
    istrue = messageisTrue;
}

//function setMessage(){
//
//}
$(document).ready(function () {
    var URL="ws://120.27.120.124:8080/websocket/chat/"+name+"/beginGame";
    var webSocket=null;
    if('WebSocket' in window) {
        webSocket=new WebSocket(URL);
    }else {
        alert("浏览器版本太低，不支持游戏，请升级浏览器后进行游戏！");
    }
    //获取服务器发送的信息
    //webSocket.onmessage= function (event) {
    //    if(istrue){
    //        if(event.data.charAt(0)=="1"){
    //            $("#showUsername").val(event.data.substring(1,event.data.length));
    //        }else{
    //            setMessageInnerHTML(event.data);
    //        }
    //    }else{
    //        setMessageInnerHTML(event.data);
    //    }
    //}

    webSocket.onmessage=function (event){
        if(istrue){
            if(event.data.charAt(0)=="1"){
                $("#showUsername").val(event.data.substring(1,event.data.length));
            }else{
                setMessageInnerHTML(event.data);
            }
        }else{
            setMessageInnerHTML(event.data);
        }
    }
    window.onbeforeunload= function () {
        webSocket.close();
    }
    $("#disconnect").click(function(){
        if(WebSocket.OPEN){
            webSocket.close();
        }
    });
    $("#submit").click(function(){

        webSocket.send(message);
    });
    //function sendUserMessage1(message){
    //    webSocket.send(message);
    //}
    //function setMessageInnerHTML(innerHTML){
    //    document.getElementById("messages").innerHTML+=innerHTML+"</br>";
    //}
    function setMessageInnerHTML(sendsmessage){
        //创建一个标签里面显示字体
        var mychat = $("<li></li>")
        mychat.append(sendsmessage);
        mychat.addClass("role");
        $("#convo").append(mychat);
    }
})
