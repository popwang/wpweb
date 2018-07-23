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
    /* 表单名称控件 form_name
    acc  是 class="component" 的DIV 
    e 是 class="leipiplugins" 的控件
    */
    LPB.plugins['form_name'] = function (active_component,leipiplugins) {
      var plugins = 'form_name',popover = $(".popover");
      //右弹form  初始化值
      $(popover).find("#orgvalue").val($(leipiplugins).val());
      //右弹form  取消控件
      $(popover).delegate(".btn-danger", "click", function(e){
          e.preventDefault();
          active_component.popover("hide");
      });
      //右弹form  确定控件
      $(popover).delegate(".btn-info", "click", function(e){
          e.preventDefault();//阻止元素发生默认的行为(例如,当点击提交按钮时阻止对表单的提交
          var inputs = $(popover).find("input");
          $.each(inputs, function(i,e){
              var attr_name = $(e).attr("id");//属性名称
              var attr_val = $("#"+attr_name).val();
              if(attr_name == 'orgvalue')
              {
                  $(leipiplugins).attr("value", attr_val);
                  active_component.find(".leipiplugins-orgvalue").text(attr_val);
              }
              active_component.popover("hide");
              LPB.genSource();//重置源代码
          });
      });

    }
})();
$(document).ready(function(){
  $("#navtab").delegate("#sourcetab", "click", function(e){
	 alert( "click");
     LPB.genSource();
  });
//全部的元素都有的事件 鼠标指针移动到元素按下
  $("form").delegate(".component", "mousedown", function(md){
	  
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
//会执行一次 异步执行
    var delayed = setTimeout(function(){

      if(type === "main"){
        $temp = $("<form class='form-horizontal span6' id='temp'></form>").append($this.clone());
      } else {
    	   
        if($this.attr("id") !== "legend"){
        //此次是按在元素身上,拖拽元素.
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

      $("body").delegate("#temp", "mouseup", function(mu){ //点击或者拖拽释放鼠标
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
            
              $($temp.html()).insertBefore(tops[0]);
            } else {//这个是从右边拖放发到左边form中
            	
               $("#target fieldset").append($temp.append("\n\n\ \ \ \ ").html());
              $("#target .component").popover({trigger: "manual"});
              //找到左边form框中的最后一个添加的组件
              var showprove =  $($("#target .component")[$("#target .component").length-1]);
            //能拿到属性-----------------------------------------------------------------------------
             /* alert(showprove.attr('data-content'));*/
              showprove.popover("show");
              //设置验证 数字的 和文本框长度
              $("#text_zyhs").numeral();
              $("#text_zfcd").numeral();
              $("#text_title").attr("maxlength",10);
              $("#text_tswz").attr("maxlength",20); 
              
              var leipiplugins = showprove.find(".leipiplugins"),plugins =$(leipiplugins).attr("leipiplugins");//leipiplugins="text"
              if(typeof(LPB.plugins[plugins]) =='function')
              {
                try{
                 //	alert(leipiplugins+" "+showprove);
                  LPB.plugins[plugins](showprove,leipiplugins);
                  }catch ( e ) {
                        alert('控件异常');
                  }
              }else
              {
                  alert("控件有误或不存在，请与我们联系！");
              }
              //alert($("#target .component").length);
             // $("#target .component").popover("show");
            }
          } else {
              //没有拖住到左边 no add
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
     
    //当松开鼠标按钮时，
    $(document).mouseup(function (e) {
     
      clearInterval(delayed); //取消执行
      //$(this).unbind(e);//牛琛源码追加  移除事件. 要不会一直重复执行
       return false;
    });
    //当鼠标从元素上移开时
    $(this).mouseout(function () {
       clearInterval(delayed);
      //$(this).unbind(e);//牛琛源码追加  移除事件. 要不会一直重复执行
      return false;
    });
  });

  //activate legend popover
  $("#target .component").popover({trigger: "manual"});
 
  //popover on click event  这个是元素的单击事件.
  $("#target").delegate(".component", "click", function(e){
     e.preventDefault();
    //$(".popover").hide();
    var active_component = $(this);
    active_component.popover({trigger: "manual"});//窗口独占 //牛琛源码追加   
    active_component.popover("show");
    $("#text_zyhs").numeral();
    $("#text_zfcd").numeral();
    //class="leipiplugins"
    var leipiplugins = active_component.find(".leipiplugins"),plugins =$(leipiplugins).attr("leipiplugins");//leipiplugins="text"
      //exec plugins
      if(typeof(LPB.plugins[plugins]) =='function')
      {
        try{
        	//调用方法
            LPB.plugins[plugins](active_component,leipiplugins);
          }catch ( e ) {
                alert('控件异常，请到 [雷劈网] 反馈或寻求帮助！');
          }
      }else
      {
          alert("控件有误或不存在，请与我们联系！");
      }
      
  });
});