/**niuchen 201705 审批模板自定义表单的核心方法  初始化界面   编写提交交互**/
(function(){
  var LPB = window.LPB = window.LPB || {plugins:[],
   genSource:function(){
	 
      var $temptxt = $("<div>").html($("#build").html());
      
      //scrubbbbbbb
      $($temptxt).find(".component").attr({"title": null,
        "data-original-title":null,
        "data-type": null,
        "data-content": null,
        "rel": null,
        "trigger":null,
        "style": null});
      $($temptxt).find(".valtype").attr("data-valtype", null).removeClass("valtype");
      $($temptxt).find(".component").removeClass("component");
      $($temptxt).find("form").attr({"id":  null, "style": null});
      $("#source").val($temptxt.html().replace(/\n\ \ \ \ \ \ \ \ \ \ \ \ /g,"\n"));
    }

  };
    /** 表单名称控件 form_name
    acc  是 class="component" 的DIV  这个是拖拽出元素的
    e 是 class="leipiplugins" 的控件  这个是弹出框的
 
    LPB.plugins['form_name'] = function (active_component,leipiplugins) {
      var plugins = 'form_name',popover = $(".popover");
      //右弹form  初始化值
      $(popover).find("#orgvalue").val($(leipiplugins).val());
      $(popover).find("#miaoshu").val(  $("#form_miaoshu").val());
      //右弹form  取消控件
      $(popover).delegate(".btn-danger", "click", function(e){
          e.preventDefault();
          active_component.popover("hide");
      });
      //右弹form  确定控件
      $(popover).delegate(".btn-info", "click", function(e){
          e.preventDefault();//阻止元素发生默认的行为(例如,当点击提交按钮时阻止对表单的提交
          var inputs = $(popover).find("input");
         var err="";
          $.each(inputs, function(i,e){
              var attr_name = $(e).attr("id");//属性名称
              var attr_val = $("#"+attr_name).val();
             
              if(attr_name == 'orgvalue')
              {
            	  if(attr_val==''){err="表单名必填!";};
                  $(leipiplugins).attr("value", attr_val);
                  active_component.find(".leipiplugins-orgvalue").text(attr_val);
              }
              else  if(attr_name == 'miaoshu')
              {
                   $("#form_miaoshu").attr("value", attr_val);
                  active_component.find(".leipiplugins-miaoshu").text(attr_val);
              }
           });
          if(err!=''){
              layer.alert(err, {icon: 6});
              return;
            }
          active_component.popover("hide");
          LPB.genSource();//重置源代码
      });
    }   已经增加了表单图标. 不在使用弹出层了 提交的时候直接验证**/
    
    /**查询数据并赋值按钮**/
    $("#selectdatabutton").click(function(){
    	 $.post("/szwq/approval/select_demplateB.htm",null,
     			 function(result){
      	     alert(result);
      	    var obj = jQuery.parseJSON(result);  
      	  alert("标题:"+obj.i_template_title+"  备注:"+obj.v_remark+"   图标:"+obj.i_template_display);
      	 
      	    var elementarray=obj.elementarray;
      	  //  alert(obj.elementarray);
      	    
      	  var formhtml=obj.formhtml;
      	 alert(formhtml);
     	$("#build").html(formhtml);
     	  //activate legend popover
     	initselcetdata();
      	//$("#build2").html(formhtml)
      	/****
      	    for(var i=0;i<elementarray.length;i++){
      	    	var element=elementarray[i];
      	    	 alert( "类型:"+element.elementtype+ "  元素名:"+element.title+
        				 " 是否必填:"+element.form_bt+"  提示内容:"+element.form_tishi+ 
        				 " 日期格式"+element.v_value_type+ "  长度"+element.form_cd+
        				 "  是否拍照:"+element.form_pz);
           	//  var element=tempobj();//创建一个空元素
            	element.i_template_id;   //模板标示ID  1
            	element.v_compent_order;   //组件顺序 1
            	element.v_compent_id; //组件标示ID  1
            	element.i_compent_type;  //组件类型 1
            	element.v_compent_title;  //组件名称 1
            	element.i_is_must;  //组件是否必填 1
            	element.i_is_phone;  //是否必须拍照 1
            	element.i_char_limit;  //输入字符限制  1 拍照张数限制使用
            //	element.i_apand_line =null;  //所占行数 1
            	element.v_default_value;   //提醒（比如：必填项，或者长度为20个字节，用户点击文本框后该提醒会消失） 1
    	 	    element.v_value_type;//组件使用值类型（ 日期时间格式 1  年月日 时分2  年月日	3  时分 1
    	 	   // element.i_multiple_choices =null;//是否多选 1
    	 	 //  element.v_is_nust =null;  //组件是否必填   1
    	 	  //  element.v_is_phone =null; //是否拍照  2
      	 	
         		 if(elementtype==5){ //如果是下拉框
         			 if(multiple=="multiple"){
         				  element.v_multiple_choices =1;//多选*   
         			 }else{
         				 element.v_multiple_choices =0;//单选*   
         			 }
//         			combox_data	 multiple="multiple"
//         			[{"v_compent_id":479,"i_templete_id":"50201","v_display_value":"1","v_real_value":"2"},{"v_compent_id"
//         			:479,"i_templete_id":"50201","v_display_value":"3","v_real_value":"4"}]
         			element.combox_data=new Array();  //存储下拉框键集合的对象
         			 var $select=$(e).find("option");
         			 $.each($select, function(i,e2){
         				element.combox_data.push($(e2).val());//存储下拉框的数据
          			 });
         		 } 
      	    }***/
     	  });
    });
    /**提交按钮**/
    $("#tijiaobutton").click(function(){
//    	$.get("demo_test.asp",function(data,status){
//    	    alert("Data: " + data + "\nStatus: " + status);
//    	  });
//    	 layer.open({
//    		  type: 1,
//    		  area: ['600px', '360px'],
//    		  shadeClose: true, //点击遮罩关闭
//    		  content: '\<\div style="padding:20px;">'+$("#build").html()+'\<\/div>'
//    		  });
    	 alert($("#build").html());
    	 
//    	 var inputs= $("#build").find(".control-group");
//    	// alert(inputs)
//    	 $.each(inputs, function(i,e){
//    		 alert( $(e).attr("type"));
//    		 
//    	   });
    	
    	

//    	template_type	
//    	{"i_template_id":"50191","i_template_title":"测试模板2","v_remark":"藐视113","v_create_user":"企业管理员","i_create_user"
//    	:"1","i_template_display":"16"}
    	    /**
    	 //封装模板基础信息
         var tempobject = {
      		//   i_template_id:templeteId, //模板ID
      		   i_template_title:moban_name,   //模板名称
      		   v_remark:moban_miaoshu,    //模板描述
      		   v_create_user:"22",    //添加人
      		   i_create_user:1,   //添加人ID
      		   i_template_display:16      //图标
         };**/
    	  alert("表单名称:"+$("#form_name").val()+"  表单描述:"+$("#form_miaoshu").val());
    	  var moban_name=$("#form_name").val();//模板名字
    	  var moban_miaoshu=$("#form_miaoshu").val();//模板描述
    	  var $result = $("#build").find("[name='leipiNewField']");
    	 if(moban_name==""||moban_name==null){
     		 layer.alert("请填写表单名称!", {icon: 6});
     		$("#form_name").focus();
    		 return;
    	 }
 
      	 var elementarray = new Array();
       
    	  if($result.length<1){
    		  layer.alert("表单需要配置至少一个元素!", {icon: 6});
    		  return;
    	  }
    	  var combox_data=new Object();
    	  var shuxu=0;
       	 $.each($result, function(i,e){
  //目前审批模块定义的元素类型
  //单行文本框 1 多行文本框2  数字文本框3  日期组件4   下拉框5   图片6    联系人7	定位8    日期区间9
       		shuxu++;
       		var elementtype=$(e).attr("elementtype");//类型
       		var title=$(e).attr("title");//元素名
       		var form_bt=$(e).attr("form_bt");//是否必填
       		var form_tishi=$(e).attr("form_tishi");//提示内容
       		var v_value_type=$(e).attr("v_value_type");//日期格式
       		var form_cd=$(e).attr("form_cd");//长度
        	var form_pz=$(e).attr("form_pz");//是否拍照:
     		 alert( "类型:"+$(e).attr("elementtype")+ "  元素名:"+$(e).attr("title")+
    				 " 是否必填:"+$(e).attr("form_bt")+"  提示内容:"+$(e).attr("form_tishi")+ 
    				 " 日期格式"+$(e).attr("v_value_type")+ "  长度"+$(e).attr("form_cd")+
    				 "  是否拍照:"+$(e).attr("form_pz"));
       	  var element=tempobj();//创建一个空元素
        //	element.i_template_id=null;   //模板标示ID  1
        	element.v_compent_order =shuxu;   //组件顺序 1
        //	element.v_compent_id =null; //组件标示ID  1
        	element.i_compent_type =elementtype;  //组件类型 1
        	element.v_compent_title =title;  //组件名称 1
        	element.i_is_must =form_bt;  //组件是否必填 1
        	element.i_is_phone =form_pz;  //是否必须拍照 1
        	element.i_char_limit =form_cd;  //输入字符限制  1 拍照张数限制使用
        //	element.i_apand_line =null;  //所占行数 1
        	element.v_default_value =form_tishi;   //提醒（比如：必填项，或者长度为20个字节，用户点击文本框后该提醒会消失） 1
	 	//   element.i_value_type =select;//组件使用值类型 2
	 	    element.v_value_type =v_value_type;//组件使用值类型（ 日期时间格式 1  年月日 时分2  年月日	3  时分 1
	 	   // element.i_multiple_choices =null;//是否多选 1
	 	 //  element.v_is_nust =null;  //组件是否必填   1
	 	  //  element.v_is_phone =null; //是否拍照  2
	 	 
 	 	
     		 if($(e).attr("elementtype")==5){ //如果是下拉框
     			 if($(e).attr("multiple")=="multiple"){
     				  element.v_multiple_choices =1;//多选*   
     			 }else{
     				 element.v_multiple_choices =0;//单选*   
     			 }
//     			combox_data	 multiple="multiple"
//     			[{"v_compent_id":479,"i_templete_id":"50201","v_display_value":"1","v_real_value":"2"},{"v_compent_id"
//     			:479,"i_templete_id":"50201","v_display_value":"3","v_real_value":"4"}]
     			element.combox_data=new Array();  //存储下拉框键集合的对象
     			 var $select=$(e).find("option");
     			 $.each($select, function(i,e2){
     				element.combox_data.push($(e2).val());//存储下拉框的数据
      			 });
     		 } 
     		  elementarray.push(element);
//    	       	template_compents	
//    	    	[{"i_template_id":"50191","v_compent_order":1,"i_compent_type":1,"v_compent_title":"标题","i_is_must":1
//    	    	,"i_char_limit":3,"i_apand_line":2,"v_default_value":"示文字","v_is_nust":"是"}]
         
     		 
     		 /***
    		 var tempobj = new Object();
   		   tempobj.i_template_id=templeteId;   //模板标示ID
  		   tempobj.v_compent_order = appstore.getAt(k).get('v_compent_order');   //组件顺序
  		   tempobj.v_compent_id = appstore.getAt(k).get('v_compent_id'); //组件标示ID
  		   tempobj.i_compent_type = appstore.getAt(k).get('i_compent_type');  //组件类型
      	   tempobj.v_compent_title =appstore.getAt(k).get('v_compent_title');  //组件名称
      	   tempobj.i_is_must =appstore.getAt(k).get('i_is_must');  //组件是否必填
      	   tempobj.i_is_phone =appstore.getAt(k).get('i_is_phone');  //是否必须拍照
      	   tempobj.i_char_limit =appstore.getAt(k).get('i_char_limit');  //输入字符限制
      	   tempobj.i_apand_line =appstore.getAt(k).get('i_apand_line');  //所占行数
      	   tempobj.v_default_value =appstore.getAt(k).get('v_default_value');   //提醒（比如：必填项，或者长度为20个字节，用户点击文本框后该提醒会消失）
      	   tempobj.i_value_type =appstore.getAt(k).get('i_value_type');//组件使用值类型
      	   tempobj.v_value_type =appstore.getAt(k).get('v_value_type');//组件使用值类型（ 日期时间格式 1  年月日 时分2  年月日	3  时分
      	   tempobj.i_multiple_choices =appstore.getAt(k).get('i_multiple_choices');//是否多选
      	   tempobj.v_is_nust =appstore.getAt(k).get('v_is_nust');  //组件是否必填
      	   tempobj.v_is_phone =appstore.getAt(k).get('v_is_phone'); //是否拍照
      	   tempobj.v_multiple_choices =appstore.getAt(k).get('v_multiple_choices');//是否多选***/
});
      	 var tempobject = {
    	      		//   i_template_id:templeteId, //模板ID
    	      		   i_template_title:moban_name,   //模板名称
    	      		   v_remark:moban_miaoshu,    //模板描述
    	      		 //  v_create_user:"22",    //添加人
    	      		 //  i_create_user:1,   //添加人ID
    	      		   i_template_display:16,      //图标
    	      		   elementarray:JSON.stringify(elementarray) , //存储模板中的元素对象
    	      		   formhtml:$("#build").html()
    	         };
         	 $.post("/szwq/approval/adddemplateB.htm",tempobject,
         			 function(result){
         	    $("span").html(result);
         	  });
         	return;
   	});
    
    
    
})();
$(document).ready(function(){
	 //jquery icon初始化
//	 $('#myselect').fontIconPicker({
//	 theme: 'fip-bootstrap',//四种主题风格：fip-grey, fip-darkgrey, fip-bootstrap, fip-inverted
//	  source:    ['icon-heart', 'icon-search', 'icon-user', 'icon-tag', 'icon-help'],
//	 emptyIcon: true,//是否显示空
//	 emptyIconValue: "none",//空值
//	 iconsPerPage: 30, //每页显示图标的个数，默认20
//	 hasSearch: false,//是否显示搜索框，默认true
// 	 }); 
	 
  $("#navtab").delegate("#sourcetab", "click", function(e){
    LPB.genSource();
  });
  $("form").delegate(".component", "mousedown", function(md){//鼠标指针移动到元素上方
	  
    $(".popover").remove();

    md.preventDefault();
    var tops = [];
    var mouseX = md.pageX;
    var mouseY = md.pageY;
    var $temp;
    var timeout;
    var $this = $(this);
    var delays = {
      main: 0,
      form: 120
    }
    var type;

    if($this.parent().parent().parent().parent().attr("id") === "components"){
      type = "main";
    } else {
      type = "form";
    }

    var delayed = setTimeout(function(){
    	 
      if(type === "main"){
        $temp = $("<form class='form-horizontal span6' id='temp'></form>").append($this.clone());
      } else {
        if($this.attr("id") !== "legend"){
          $temp = $("<form class='form-horizontal span6' id='temp'></form>").append($this);
        }else{//此处是牛琛添加  如果是标题的拖拽  就终止  否则会报错.
        	return; 
        }
      }
     
      $("body").append($temp);

      $temp.css({"position" : "absolute",
                 "top"      : mouseY - ($temp.height()/2) + "px",
                 "left"     : mouseX - ($temp.width()/2) + "px",
                 "opacity"  : "0.9"}).show()

      var half_box_height = ($temp.height()/2);
      var half_box_width = ($temp.width()/2);
      var $target = $("#target");
      var tar_pos = $target.position();
      var $target_component = $("#target .component");

      $(document).delegate("body", "mousemove", function(mm){

        var mm_mouseX = mm.pageX;
        var mm_mouseY = mm.pageY;

        $temp.css({"top"      : mm_mouseY - half_box_height + "px",
          "left"      : mm_mouseX - half_box_width  + "px"});

        if ( mm_mouseX > tar_pos.left &&
          mm_mouseX < tar_pos.left + $target.width() + $temp.width()/2 &&
          mm_mouseY > tar_pos.top &&
          mm_mouseY < tar_pos.top + $target.height() + $temp.height()/2
          ){
            $("#target").css("background-color", "#fafdff");
            $target_component.css({"border-top" : "1px solid white", "border-bottom" : "none"});
            tops = $.grep($target_component, function(e){
              return ($(e).position().top -  mm_mouseY + half_box_height > 0 && $(e).attr("id") !== "legend");
            });
            if (tops.length > 0){
              $(tops[0]).css("border-top", "1px solid #22aaff");
            } else{
              if($target_component.length > 0){
                $($target_component[$target_component.length - 1]).css("border-bottom", "1px solid #22aaff");
              }
            }
          } else{
            $("#target").css("background-color", "#fff");
            $target_component.css({"border-top" : "1px solid white", "border-bottom" : "none"});
            $target.css("background-color", "#fff");
          }
      });

      $("body").delegate("#temp", "mouseup", function(mu){
        mu.preventDefault();

        var mu_mouseX = mu.pageX;
        var mu_mouseY = mu.pageY;
        var tar_pos = $target.position();

        $("#target .component").css({"border-top" : "1px solid white", "border-bottom" : "none"});

        // acting only if mouse is in right place
        if (mu_mouseX + half_box_width > tar_pos.left &&
          mu_mouseX - half_box_width < tar_pos.left + $target.width() &&
          mu_mouseY + half_box_height > tar_pos.top &&
          mu_mouseY - half_box_height < tar_pos.top + $target.height()
          ){
            $temp.attr("style", null);
            // where to add

            if(tops.length > 0){
            //	alert(tops.length);
              $($temp.html()).insertBefore(tops[0]);
            } else {
            //	alert(2);
              $("#target .form-add").append($temp.append("\n\n\ \ \ \ ").html());
            }

          } else {
            // no add
            $("#target .component").css({"border-top" : "1px solid white", "border-bottom" : "none"});
            tops = [];
          }

        //clean up & add popover
        $target.css("background-color", "#fff");
        $(document).undelegate("body", "mousemove");
        $("body").undelegate("#temp","mouseup");
        $("#target .component").popover({trigger: "manual"});
        $temp.remove();
        LPB.genSource();
      });
    }, delays[type]);
 
    $(document).mouseup(function () {
       clearInterval(delayed);
      return false;
    });
    $(this).mouseout(function () {
      clearInterval(delayed);
      return false;
    });
  });

  //activate legend popover
  $("#target .component").popover({trigger: "manual"});
  //popover on click event
  $("#target").delegate(".component", "click", function(e){
    e.preventDefault();
    //$(".popover").hide();
    var active_component = $(this);
    active_component.popover("show");
    //class="leipiplugins"
    var leipiplugins = active_component.find(".leipiplugins"),
    plugins =$(leipiplugins).attr("leipiplugins");//leipiplugins="text"
 
      //exec plugins
      if(typeof(LPB.plugins[plugins]) =='function')
      {
        try{
            LPB.plugins[plugins](active_component,leipiplugins);
          }catch ( e ) {
                alert('控件异常'+e);
          }
      }else
      {
          alert("控件有误或不存在，请与我们联系！");
      }

  });
});