/*
牛琛20170721  修改
 @Name: layui WebIM 1.0.0
 @Author：贤心
 @Date: 2014-04-25
 @Blog: http://sentsin.com

 */

;!function(win, undefined){

var config = {
    msgurl: 'mailbox.html?msg=',
    chatlogurl: 'mailbox.html?user=',
    aniTime: 200,
    right: -232,
    api: {
       // friend: 'szwqbts/js/plugins/layer/layim/friend.json', //好友列表接口
    	 friend: 'innerbookaction/searchFriend_dep.htm', //好友列表接口
        //group: 'szwqbts/js/plugins/layer/layim/group.json', //群组列表接口
      //  chatlog: 'js/plugins/layer/layim/data/chatlog.json', //聊天记录接口
       // groups: 'js/plugins/layer/layim/data/groups.json', //群组成员接口
    	 selectuser: 'innerbookaction/searchUserNmaeLogoUser.htm', //好友列表接口
        sendurl: '' //发送消息接口
    },
    user: { //当前用户信息
        name: '游客',
        face: 'http://orheaidcn.bkt.clouddn.com/a1.jpg'
    },

    //自动回复内置文案，也可动态读取数据库配置
    autoReplay: [
        '您好，我现在有事不在，一会再和您联系。',
        '你没发错吧？',
        '洗澡中，请勿打扰，偷窥请购票，个体四十，团体八折，订票电话：一般人我不告诉他！',
        '你好，我是主人的美女秘书，有什么事就跟我说吧，等他回来我会转告他的。',
        '我正在拉磨，没法招呼您，因为我们家毛驴去动物保护协会把我告了，说我剥夺它休产假的权利。',
        '<（@￣︶￣@）>',
        '你要和我说话？你真的要和我说话？你确定自己想说吗？你一定非说不可吗？那你说吧，这是自动回复。',
        '主人正在开机自检，键盘鼠标看好机会出去凉快去了，我是他的电冰箱，我打字比较慢，你慢慢说，别急……',
        '(*^__^*) 嘻嘻，是贤心吗？'
    ],


    chating: {},
    hosts: (function(){
        var dk = location.href.match(/\:\d+/);
        dk = dk ? dk[0] : '';
        return 'http://' + document.domain + dk + '/';
    })(),
    json: function(url, data, callback, error){
        return $.ajax({
            type: 'POST',
            url: url,
            data: data,
            dataType: 'json',
            success: callback,
            error: error
        });
    },
    stopMP: function(e){
        e ? e.stopPropagation() : e.cancelBubble = true;
    }
}, dom = [$(window), $(document), $('html'), $('body')], xxim = {};

//主界面tab
xxim.tabs = function(index){
    var node = xxim.node;
    node.tabs.eq(index).addClass('xxim_tabnow').siblings().removeClass('xxim_tabnow');
    node.list.eq(index).show().siblings('.xxim_list').hide();
    if(node.list.eq(index).find('li').length === 0){
         xxim.getDates(index);
    }
};

//节点
xxim.renode = function(){
    var node = xxim.node = {
        tabs: $('#xxim_tabs>span'),
        list: $('.xxim_list'),//搜索结果的全部list
//        online: $('.xxim_online'),//收缩按钮组 下的在线隐身, 已经注释<li class="xxim_online" id="xxim_online">
//        setonline: $('.xxim_setonline'),//收缩按钮组 下的在线隐身 中的div'<div class="xxim_setonline">'
//        onlinetex: $('#xxim_onlinetex'),///收缩按钮组 下的在线隐身 中的div中的在线的 <span id="xxim_onlinetex">
        xximon: $('#xxim_on'), //收缩按钮组 下 收缩按钮 是侧滑的按钮<li id="xxim_on" class="xxim_icon xxim_on fa fa-ellipsis-v"></li>'
        layimFooter: $('#xxim_bottom'),//收缩按钮组<ul class="xxim_bottom" id="xxim_bottom">
        xximHide: $('#xxim_hide'),//收缩按钮组 下 收缩按钮 是最下发的按钮<li class="xxim_hide" id="xxim_hide
        xximSearch: $('#xxim_searchkey'), //搜索框
        searchMian: $('#xxim_searchmain'),//搜索结果的展示层
        closeSearch: $('#xxim_closesearch'),// 关闭搜索按钮
        layimMin: $('#layim_min')//聊天窗口
    };
};


//主界面缩放
xxim.expend = function(){
    var node = xxim.node;
    if(xxim.layimNode.attr('state') !== '1'){
        xxim.layimNode.stop().animate({right: config.right}, config.aniTime, function(){
            node.xximon.addClass('xxim_off');
            try{
                localStorage.layimState = 1;
            }catch(e){}
            xxim.layimNode.attr({state: 1});
          //  node.layimFooter.addClass('xxim_expend').stop().animate({marginLeft: config.right}, config.aniTime/2);//收缩按钮组
          node.xximHide.addClass('xxim_show');//收缩按钮添加样式xxim_show
        });
    } else {
        xxim.layimNode.stop().animate({right: 1}, config.aniTime, function(){
            node.xximon.removeClass('xxim_off');
            try{
                localStorage.layimState = 2;
            }catch(e){alert(e)}
            xxim.layimNode.removeAttr('state');
           // node.layimFooter.removeClass('xxim_expend');
          node.xximHide.removeClass('xxim_show');//收缩按钮移除样式xxim_show
        });
        node.layimFooter.stop().animate({marginLeft: 0}, config.aniTime);
    }
};
//nc添加 用于给最外层的按钮附上收缩效果
if($("#small-chat")!=null){
 $("#small-chat").on('click',xxim.expend);
}
//初始化窗口格局
xxim.layinit = function(){
    var node = xxim.node;

    //主界面
    try{
        /*
        if(!localStorage.layimState){
            config.aniTime = 0;
            localStorage.layimState = 1;
        }
        */
        if(localStorage.layimState === '1'){
            xxim.layimNode.attr({state: 1}).css({right: config.right});
            node.xximon.addClass('xxim_off');
           // node.layimFooter.addClass('xxim_expend').css({marginLeft: config.right});
            node.xximHide.addClass('xxim_show');//收缩按钮添加样式xxim_show
        }
    }catch(e){
         layer.msg(e.message, 5, -1);
    }
};
//生成用户展示html
xxim.userhtml=function(param){
	  var i_user_id	=param.data.i_user_id;	// userid 自增长
	  	var v_login_name	=param.data.v_login_name;	// 登陆用户名
	   	var v_real_name	=param.data.v_real_name;	// 真实姓名
	  	var v_user_type	=param.data.v_user_type;	// 角色类型
	  	var v_type_name	=param.data.v_type_name;	// 角色名称
	  	var v_photo_path=param.data.v_photo_path;  //用户头像路径
	  	var  v_user_qq=param.data.v_user_qq;//QQ号
	  	var  v_user_wx =param.data.v_user_wx;//微信号
	  	var  v_user_sex=param.data.v_user_sex;//性别
	  	var v_user_tel=param.data.v_user_tel;//电话
	    	var i_department_id	=param.data.i_department_id;// 归属属部门编号
	   	var v_system_name	=param.data.v_system_name;	 // 部门名称
	  	var v_user_no=param.data.v_user_no;	     // 用户编号，目前采集客户手机号(新加)	
	  	var v_dept_id=param.data.v_dept_id;//部门编号
	   	var	v_position	 =param.data.v_position;	 // 级别
	  	var v_positio	 =param.data.v_positio;	     // 级别名称
	  	var t_roles =param.data.t_roles;			 //	角色组字符串
	  	var i_admin_tag=param.data.i_admin_tag;       //是否为超级管理员(1:是  2:否)
	    if(v_user_sex==null||"null"==v_user_sex||""==v_user_sex){v_user_sex="空";
	    }else{
	    	if(v_user_sex==1){v_user_sex='男';}else if(v_user_sex==2){v_user_sex='女';}else{v_user_sex='错误';}
	    } 
	    if(v_user_tel==null||"null"==v_user_tel){v_user_tel="空";}
	    if(v_user_wx==null||"null"==v_user_wx){v_user_wx="空";}
	    if(v_user_qq==null||"null"==v_user_qq){v_user_qq="空";}
	    var userhtml=''
	        +'      <p>姓名:'+v_real_name+'</p>'
	        +'      <p>部门:'+v_system_name+'</p>'
	        +'      <p>性别:'+v_user_sex+'</p>'
	        +'      <p>角色:'+v_type_name+'</p>'
	        +'      <p>级别:'+v_positio+'</p>'
	        +'      <p>电话:'+v_user_tel+'</p>'
	        +'      <p>QQ:'+v_user_qq+'</p>'
	        +'      <p>微信:'+v_user_wx+'</p>'
	        +'';
	    return userhtml;
}
//聊天窗口
xxim.popchat = function(param){

    var node = xxim.node, log = {};
//打开成功调用方法
    log.success = function(layero){
       // layer.setMove();
         xxim.chatbox = layero.find('#layim_chatbox');//窗体内容的最外层DIV
        log.chatlist = xxim.chatbox.find('.layim_chatmore>ul');// 用户信息div <div class="layim_chatmore" id="layim_chatmore">'

        log.chatlist.html('<li data-id="'+ param.id +'" type="'+ param.type +'"  id="layim_user'+ param.type + param.id +'"><span>'+ param.name +'</span><em>×</em></li>')
        xxim.tabchat(param, xxim.chatbox);

        //最小化聊天窗
        xxim.chatbox.find('.layer_setmin').on('click', function(){
         
            var indexs = layero.attr('times');
            layero.hide();
            node.layimMin.text(xxim.nowchat.name).show();
            //2017nc添加给隐藏的窗体父单击事件.  点击可以展开.
            node.layimMin.on('click', function(){
                 $(this).hide();
                layero.show();
             });

        });

        //关闭窗口
        xxim.chatbox.find('.layim_close').on('click', function(){
            var indexs = layero.attr('times');
            layer.close(indexs);
            xxim.chatbox = null;
            config.chating = {};
            config.chatings = 0;
        });

        //关闭某个聊天
        log.chatlist.on('mouseenter', 'li', function(){
            $(this).find('em').show();
        }).on('mouseleave', 'li', function(){
            $(this).find('em').hide();
        });
        log.chatlist.on('click', 'li em', function(e){
        //	alert("li em");
            var parents = $(this).parent(), dataType = parents.attr('type');
            var dataId = parents.attr('data-id'), index = parents.index();
            var chatlist = log.chatlist.find('li'), indexs;

            config.stopMP(e);

            delete config.chating[dataType + dataId];
            config.chatings--;

            parents.remove();
            $('#layim_area'+ dataType + dataId).remove();
//            if(dataType === 'group'){
//                $('#layim_group'+ dataType + dataId).remove();
//            }

            if(parents.hasClass('layim_chatnow')){
                if(index === config.chatings){
                    indexs = index - 1;
                } else {
                    indexs = index + 1;
                }
                xxim.tabchat(config.chating[chatlist.eq(indexs).attr('type') + chatlist.eq(indexs).attr('data-id')]);
            }

            if(log.chatlist.find('li').length === 1){
                log.chatlist.parent().hide();
            }
        });

        //聊天选项卡
        log.chatlist.on('click', 'li', function(){
        
            var othis = $(this), dataType = othis.attr('type'), dataId = othis.attr('data-id');
            xxim.tabchat(config.chating[dataType + dataId]);
           // log.chatarea = xxim.chatbox.find('#layim_chatarea');
            // log.chatarea.html(log.userhtml);
        });

        //发送热键切换
        log.sendType = $('#layim_sendtype'), log.sendTypes = log.sendType.find('span');
        $('#layim_enter').on('click', function(e){
            config.stopMP(e);
            log.sendType.show();
        });
        log.sendTypes.on('click', function(){
            log.sendTypes.find('i').text('')
            $(this).find('i').text('√');
        });

        //xxim.transmit();
    };

    log.userhtml=xxim.userhtml(param);
    log.html = '<div class="layim_chatbox " id="layim_chatbox">'
            +'<h6>'
            +'<span class="layim_move"></span>'
         //   +'    <a href="'+ param.url +'" class="layim_face" target="_blank"><img src="'+ param.face +'" ></a>'
         //   +'    <a href="'+ param.url +'" class="layim_names" target="_blank">'+ param.name +'</a>'
            +'   <div class="layim_face" style="width:40px;height:40px;">  <img  style="width:40px;height:40px;" src="'+ param.face +'" /></div> '
            +'  <div class="layim_names"> '+ param.name +'</div>'
            +'    <span class="layim_rightbtn">'
            +'        <i class="layer_setmin">—</i>'
            +'        <i class="layim_close">&times;</i>'
            +'    </span>'
            +'</h6>'
            +'<div class="layim_chatmore" id="layim_chatmore">'
            +'    <ul class="layim_chatlist"></ul>'
            +'</div>'
            +'<div class="layim_groups" id="layim_groups"></div>'
            
            +'<div id="layim_chatarea" class="layim_chat">'
            +log.userhtml
            +'</div>'
//            +'<div class="layim_chat">'
//            +'    <div class="layim_chatarea" id="layim_chatarea">'
//            +'        <ul class="layim_chatview layim_chatthis"  id="layim_area'+ param.type + param.id +'"></ul>'
//            +'    </div>'
//            +'    <div class="layim_tool">'
//            +'        <i class="layim_addface fa fa-meh-o" title="发送表情"></i>'
//            +'        <a href="javascript:;"><i class="layim_addimage fa fa-picture-o" title="上传图片"></i></a>'
//            +'        <a href="javascript:;"><i class="layim_addfile fa fa-paperclip" title="上传附件"></i></a>'
//            +'        <a href="" target="_blank" class="layim_seechatlog"><i class="fa fa-comment-o"></i>聊天记录</a>'
//            +'    </div>'
//            +'    <textarea class="layim_write" id="layim_write"></textarea>'
//            +'    <div class="layim_send">'
//            +'        <div class="layim_sendbtn" id="layim_sendbtn">发送<span class="layim_enter" id="layim_enter"><em class="layim_zero"></em></span></div>'
//            +'        <div class="layim_sendtype" id="layim_sendtype">'
//            +'            <span><i>√</i>按Enter键发送</span>'
//            +'            <span><i></i>按Ctrl+Enter键发送</span>'
//            +'        </div>'
//            +'    </div>'
//            +'</div>'
            +'</div>';

    if(config.chatings < 1){
     
        layer.open({
            type: 1,
           // border: [0],
            id:"msglayer",
            title: false,
          //  shade: [0],
            area: ['430px', '282px'],
            move: '.layim_chatbox .layim_move',
            moveType: 1,
            closeBtn: false,
            offset: [(($(window).height() - 493)/2)+'px', ''],
            content:log.html,
            success: function(layero){
            //	alert(layero);
             	// 最后显示所有的属性 
                 log.success(layero);
             }
        })
    } else {
    	 
        log.chatmore = xxim.chatbox.find('#layim_chatmore');
        log.chatarea = xxim.chatbox.find('#layim_chatarea');
        log.chatarea.html(log.userhtml);
        
        log.chatmore.show();

        log.chatmore.find('ul>li').removeClass('layim_chatnow');
        log.chatmore.find('ul').append('<li data-id="'+ param.id +'" type="'+ param.type +'" id="layim_user'+ param.type + param.id +'" class="layim_chatnow"><span>'+ param.name +'</span><em>×</em></li>');

      //  log.chatarea.find('.layim_chatview').removeClass('layim_chatthis');
       // log.chatarea.append('<ul class="layim_chatview layim_chatthis" id="layim_area'+ param.type + param.id +'"></ul>');

        xxim.tabchat(param);
    }
 
    //群组
    log.chatgroup = xxim.chatbox.find('#layim_groups');
//    if(param.type === 'group'){
//        log.chatgroup.find('ul').removeClass('layim_groupthis');
//        log.chatgroup.append('<ul class="layim_groupthis" id="layim_group'+ param.type + param.id +'"></ul>');
//        xxim.getGroups(param);
//    }
    //点击群员切换聊天窗
    log.chatgroup.on('click', 'ul>li', function(){
        xxim.popchatbox($(this));
    });
};

//定位到某个聊天队列
xxim.tabchat = function(param){
    var node = xxim.node, log = {}, keys = param.type + param.id;
    xxim.nowchat = param;

    xxim.chatbox.find('#layim_user'+ keys).addClass('layim_chatnow').siblings().removeClass('layim_chatnow');
//    xxim.chatbox.find('#layim_area'+ keys).addClass('layim_chatthis').siblings().removeClass('layim_chatthis');
//    xxim.chatbox.find('#layim_group'+ keys).addClass('layim_groupthis').siblings().removeClass('layim_groupthis');

    xxim.chatbox.find('.layim_face>img').attr('src', param.face);
    xxim.chatbox.find('.layim_face, .layim_names').attr('href', param.href);
    xxim.chatbox.find('.layim_names').text(param.name);
     xxim.chatbox.find('.layim_seechatlog').attr('href', config.chatlogurl + param.id);
     
     log.chatarea = xxim.chatbox.find('#layim_chatarea');
     log.userhtml=xxim.userhtml(param);
     log.chatarea.html(log.userhtml);
   
//    log.groups = xxim.chatbox.find('.layim_groups');
//    if(param.type === 'group'){
//        log.groups.show();
//    } else {
//        log.groups.hide();
//    }

//    $('#layim_write').focus();

};

//弹出聊天窗
xxim.popchatbox = function(othis){
	//3.$.ajax拼接url的异步请求
	var yz=$.ajax({  
	     type:'post',  
	     url:'innerbookaction/searchUserIdFriend_dep.htm?i_user_id='+othis.attr('data-id'),  
	     data:{},  
	     cache:false,  
	     dataType:'json',  
	     success:function(data){  
	          if( data.status =="1" ) 
	          {  	
	        	  if(data.data==null){
	        		  return alert("没有请求到用户信息");
	        	  }
	
	        	    var node = xxim.node, dataId = othis.attr('data-id'),
 	        	     param = {
	        	    	data:data.data,
	        	          id: dataId, 
	        	        type: othis.attr('type'),
	        	        name: othis.find('.xxim_onename').text(),  //用户名
	        	        face: othis.find('.xxim_oneface').attr('src'),  //用户头像
	        	        //href: 'profile.html?user=' + dataId //用户主页
	        	    }, key = param.type + dataId;
 
	        	    if(!config.chating[key]){
	        	        xxim.popchat(param);
	        	      //  alert(config.chatings);
	        	        config.chatings++;
 	        	    } else {
 	        	    	alert(111);
 	        	        xxim.tabchat(param);
	        	    }
	        	    config.chating[key] = param;

	        	    var chatbox = $('#layim_chatbox');
	        	    if(chatbox[0]){
	        	        node.layimMin.hide();
	        	        //chatbox.parents('.xubox_layer').show();
	        	    }
 	           }  else{
 	        	  return alert("请求用户信息错误!");
 	           }
	      },  
	      error:function(){alert("请求用户信息异常!");}  
	}); 
	
 
};

//请求群员
//xxim.getGroups = function(param){
//    var keys = param.type + param.id, str = '',
//    groupss = xxim.chatbox.find('#layim_group'+ keys);
//    groupss.addClass('loading');
//    config.json(config.api.groups, {}, function(datas){
//        if(datas.status === 1){
//            var ii = 0, lens = datas.data.length;
//            if(lens > 0){
//                for(; ii < lens; ii++){
//                    str += '<li data-id="'+ datas.data[ii].id +'" type="one"><img src="'+ datas.data[ii].face +'" class="xxim_oneface"><span class="xxim_onename">'+ datas.data[ii].name +'</span></li>';
//                }
//            } else {
//                str = '<li class="layim_errors">没有群员</li>';
//            }
//
//        } else {
//            str = '<li class="layim_errors">'+ datas.msg +'</li>';
//        }
//        groupss.removeClass('loading');
//        groupss.html(str);
//    }, function(){
//        groupss.removeClass('loading');
//        groupss.html('<li class="layim_errors">请求异常</li>');
//    });
//};

//消息传输
//xxim.transmit = function(){
//    var node = xxim.node, log = {};
//    node.sendbtn = $('#layim_sendbtn');
//    node.imwrite = $('#layim_write');
//
//    //发送
//    log.send = function(){
//        var data = {
//            content: node.imwrite.val(),
//            id: xxim.nowchat.id,
//            sign_key: '', //密匙
//            _: +new Date
//        };
//
//        if(data.content.replace(/\s/g, '') === ''){
//            layer.tips('说点啥呗！', '#layim_write', 2);
//            node.imwrite.focus();
//        } else {
//            //此处皆为模拟
//            var keys = xxim.nowchat.type + xxim.nowchat.id;
//
//            //聊天模版
//            log.html = function(param, type){
//                return '<li class="'+ (type === 'me' ? 'layim_chateme' : '') +'">'
//                    +'<div class="layim_chatuser">'
//                        + function(){
//                            if(type === 'me'){
//                                return '<span class="layim_chattime">'+ param.time +'</span>'
//                                       +'<span class="layim_chatname">'+ param.name +'</span>'
//                                       +'<img src="'+ param.face +'" >';
//                            } else {
//                                return '<img src="'+ param.face +'" >'
//                                       +'<span class="layim_chatname">'+ param.name +'</span>'
//                                       +'<span class="layim_chattime">'+ param.time +'</span>';
//                            }
//                        }()
//                    +'</div>'
//                    +'<div class="layim_chatsay">'+ param.content +'<em class="layim_zero"></em></div>'
//                +'</li>';
//            };
//
//            log.imarea = xxim.chatbox.find('#layim_area'+ keys);
//
//            log.imarea.append(log.html({
//                time: '2014-04-26 0:37',
//                name: config.user.name,
//                face: config.user.face,
//                content: data.content
//            }, 'me'));
//            node.imwrite.val('').focus();
//            log.imarea.scrollTop(log.imarea[0].scrollHeight);
//
//            setTimeout(function(){
//                log.imarea.append(log.html({
//                    time: '2014-04-26 0:38',
//                    name: xxim.nowchat.name,
//                    face: xxim.nowchat.face,
//                    content: config.autoReplay[(Math.random()*config.autoReplay.length) | 0]
//                }));
//                log.imarea.scrollTop(log.imarea[0].scrollHeight);
//            }, 500);
//
//            /*
//            that.json(config.api.sendurl, data, function(datas){
//
//            });
//            */
//        }
//
//    };
//    node.sendbtn.on('click', log.send);
//
//    node.imwrite.keyup(function(e){
//        if(e.keyCode === 13){
//            log.send();
//        }
//    });
//};
//用于计算性别展示不同图标
xxim.faceURL=function(v_user_sex){
	var face="";
	//根据性别展示不同的图片
	if(v_user_sex==null){ face="szwqbts/js/plugins/layer/layim/face.jpg";
	}else{
		if(v_user_sex==1){face="szwqbts/js/plugins/layer/layim/1.jpg";
		}else if(v_user_sex==2){face="szwqbts/js/plugins/layer/layim/2.jpg";
		}else{ face="szwqbts/js/plugins/layer/layim/face.jpg";}
	}
	return face;
}


//事件
xxim.event = function(){
    var node = xxim.node;

    //主界面tab
    node.tabs.eq(0).addClass('xxim_tabnow');
    node.tabs.on('click', function(){
        var othis = $(this), index = othis.index();
        xxim.tabs(index);
    });

    //列表展收
    node.list.on('click', 'h5', function(){
        var othis = $(this), chat = othis.siblings('.xxim_chatlist'), parentss = othis.find("i");
        if(parentss.hasClass('fa-caret-down')){
            chat.hide();
            parentss.attr('class','fa fa-caret-right');
        } else {
            chat.show();
            parentss.attr('class','fa fa-caret-down');
        }
    });

    //设置在线隐身
//    node.online.on('click', function(e){
//        config.stopMP(e);
//        node.setonline.show();
//    });
//    node.setonline.find('span').on('click', function(e){
//        var index = $(this).index();
//        config.stopMP(e);
//        if(index === 0){
//            node.onlinetex.html('在线');
//            node.online.removeClass('xxim_offline');
//        } else if(index === 1) {
//            node.onlinetex.html('隐身');
//            node.online.addClass('xxim_offline');
//        }
//        node.setonline.hide();
//    });

    node.xximon.on('click', xxim.expend);
    node.xximHide.on('click', xxim.expend);//收缩按钮单击事件

    //搜索
    node.xximSearch.keyup(function(){
        var val = $(this).val().replace(/\s/g, '');
        if(val !== ''){
            node.searchMian.show();
            node.closeSearch.show();
            //此处的搜索ajax参考xxim.getDates
			  node.list.eq(3).html('<li>  <div class="spiner-example">'
                       + ' <div class="sk-spinner sk-spinner-fading-circle">' 
                      + ' <div class="sk-circle1 sk-circle"></div>' 
                      + ' <div class="sk-circle2 sk-circle"></div>' 
                      + ' <div class="sk-circle3 sk-circle"></div>'  
                      + ' <div class="sk-circle4 sk-circle"></div>' 
                      + ' <div class="sk-circle5 sk-circle"></div>' 
                      + ' <div class="sk-circle6 sk-circle"></div>' 
                      + '  <div class="sk-circle7 sk-circle"></div>' 
                      + '  <div class="sk-circle8 sk-circle"></div>' 
                      + ' <div class="sk-circle9 sk-circle"></div>' 
                      + '<div class="sk-circle10 sk-circle"></div>' 
                      + ' <div class="sk-circle11 sk-circle"></div>' 
                      + '<div class="sk-circle12 sk-circle"></div>' 
                      + ' </div>' 
                      + ' </div></li>');
          
			  
			  config.json(config.api.selectuser+"?v_real_name="+val, {}, function(datas){
             	  if(datas.status === 1){
             		  var item=datas.data,str = '';
             		 
             		  if(item==null||item.length==0){
             			  node.list.eq(3).html('<li class="xxim_errormsg">没有符合条件的结果</li>');
             		  }else{
                      str += '<li data-id="'+ 1 +'" class="xxim_parentnode">'
                      +'<h5><i class="fa fa-caret-right"></i><span class="xxim_parentname">'+ val
                      +'</span><em class="xxim_nums">（'+ item.length +'）</em></h5>'
                      +'<ul class="xxim_chatlist">';
                       for(var j = 0; j < item.length; j++){
	                      	if(item[j].face==null){
	                      		item[j].face=xxim.faceURL(item[j].v_user_sex);
	                      	}        
                           str += '<li data-id="'+ item[j].i_user_id 
                            +'"class="xxim_childnode" type="one"><img src="'+ item[j].face +'" class="xxim_oneface"><span class="xxim_onename">'+ item[j].v_real_name +'</span></li>';
                      }
                       str += '</ul></li>';
             		  }
                       
                       node.list.eq(3).html(str)
             	  }else{
             		 node.list.eq(3).html('<li class="xxim_errormsg">查询异常!</li>');
             	  }
                      
            });
            
        } else {
            node.searchMian.hide();
            node.closeSearch.hide();
        }
    });
    node.closeSearch.on('click', function(){
        $(this).hide();
        node.searchMian.hide();
        node.xximSearch.val('').focus();
    });

    //弹出聊天窗
    config.chatings = 0;
    node.list.on('click', '.xxim_childnode', function(){
        var othis = $(this);
        xxim.popchatbox(othis);
    });

//    //点击最小化栏
//    node.layimMin.on('click', function(){
//    	alert(22222);
//        $(this).show();
//       $('#layim_chatbox').parents('.xubox_layer').show();
//    });


    //document事件
    dom[1].on('click', function(){
        //node.setonline.hide();
        $('#layim_sendtype').hide();
    });
};

//请求列表数据
xxim.getDates = function(index){

    var api = [config.api.friend, config.api.group, config.api.chatlog],
        node = xxim.node, myf = node.list.eq(index);
    myf.addClass('loading');
    config.json(api[index], {}, function(datas){
        if(datas.status === 1){
            var i = 0, myflen = datas.data.length, str = '', item;
            if(myflen > 1){
                if(index !== 2){
                    for(; i < myflen; i++){
                    	
                        str += '<li data-id="'+ datas.data[i].id +'" class="xxim_parentnode">'
                            +'<h5><i class="fa fa-caret-right"></i><span class="xxim_parentname">'+ datas.data[i].name 
                            +'</span><em class="xxim_nums">（'+ datas.data[i].item.length +'）</em></h5>'
                            +'<ul class="xxim_chatlist">';
                        item = datas.data[i].item;
                        if(item!=null){
                        for(var j = 0; j < item.length; j++){
                        	if(item[j].face==null){
                        		item[j].face=xxim.faceURL(item[j].v_user_sex);
                        	}        
                             str += '<li data-id="'+ item[j].id 
                              +'"class="xxim_childnode" type="'+ (index === 0 ? 'one' : 'group') +'"><img src="'+ item[j].face +'" class="xxim_oneface"><span class="xxim_onename">'+ item[j].name +'</span></li>';
                        }
                        }
                        str += '</ul></li>';
                    }
                } else {
                	alert("第二个");
                     str += '<li class="xxim_liston">'
                        +'<ul class="xxim_chatlist">';
                    for(; i < myflen; i++){
                        str += '<li data-id="'+ datas.data[i].id +'" class="xxim_childnode" type="one"><img src="'+ datas.data[i].face +'"  class="xxim_oneface"><span  class="xxim_onename">'+ datas.data[i].name +'</span><em class="xxim_time">'+ datas.data[i].time +'</em></li>';
                    }
                    str += '</ul></li>';
                }
                myf.html(str);
            } else {
                myf.html('<li class="xxim_errormsg">没有任何数据</li>');
            }
            myf.removeClass('loading');
        } else {
            myf.html('<li class="xxim_errormsg">'+ datas.msg +'</li>');
        }
    }, function(){
        myf.html('<li class="xxim_errormsg">请求失败</li>');
        myf.removeClass('loading');
    });
};

//渲染骨架
xxim.view = (function(){
    var xximNode = xxim.layimNode = $('<div id="xximmm" class="xxim_main">'
            +'<div class="xxim_top" id="xxim_top">'
            +'  <div class="xxim_search"><i class="fa fa-search"></i><input id="xxim_searchkey" /><span id="xxim_closesearch">×</span></div>'
            +'  <div class="xxim_tabs" id="xxim_tabs">'
            +'<span class="xxim_tabgroup" title="同事"><i class="fa fa-users"></i></span>'
//            +'<span class="xxim_tabfriend" title="部门"><i class="fa fa-user"></i></span>'
       
//            +' <span class="xxim_latechat"  title="最近聊天"><i class="fa fa-users"></i></span>'
            +' </div>'
            +'  <ul class="xxim_list" style="display:block"></ul>'
            +'  <ul class="xxim_list"></ul>'
            +'  <ul class="xxim_list"></ul>'
            +'  <ul class="xxim_list xxim_searchmain" id="xxim_searchmain"></ul>'
            +'</div>'
            +'<ul class="xxim_bottom" id="xxim_bottom">'
//            +'<li class="xxim_online" id="xxim_online">'
//                +'<i class="xxim_nowstate fa fa-check-circle"></i><span id="xxim_onlinetex">在线</span>'
//                +'<div class="xxim_setonline">'
//                    +'<span><i class="fa fa-check-circle"></i>在线</span>'
//                    +'<span class="xxim_setoffline"><i class="fa fa-check-circle"></i>隐身</span>'
//                +'</div>'
//            +'</li>'
//            +'<li class="xxim_mymsg" id="xxim_mymsg" title="我的私信"><i class="fa fa-comment"></i><a href="'+ config.msgurl +'" target="_blank"></a></li>'
//            +'<li class="xxim_seter" id="xxim_seter" title="设置">'
//                +'<i class="fa fa-gear"></i>'
//                +'<div>'
//
//                +'</div>'
//            +'</li>'
            +'<li class="xxim_hide" id="xxim_hide" title="通讯录"><i class="fa fa-exchange"></i></li>'
            +'<li id="xxim_on" class="xxim_icon xxim_on fa fa-ellipsis-v"></li>'
            +'<div class="layim_min" id="layim_min"></div>'
        +'</ul>'
    +'</div>');
    dom[3].append(xximNode);

    xxim.renode();
    xxim.getDates(0);
    xxim.event();
    xxim.layinit();
}());

}(window);

