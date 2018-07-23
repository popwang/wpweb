/**niuchen 201705 审批模板自定义表单的元素的提交对象**/

function tempobj() {
	var tempobj = new Object();
       tempobj.i_template_id=null;   //模板标示ID  1
	   tempobj.v_compent_order =null;   //组件顺序 1
	   tempobj.v_compent_id =null; //组件标示ID  1
	   tempobj.i_compent_type =null;  //组件类型 1
	   tempobj.v_compent_title =null;  //组件名称 1
	   tempobj.i_is_must =null;  //组件是否必填 1
	   tempobj.i_is_phone =null;  //是否必须拍照 1
	   tempobj.i_char_limit =null;  //输入字符限制  1
	   tempobj.i_apand_line =null;  //所占行数 1
	   tempobj.v_default_value =null;   //提醒（比如：必填项，或者长度为20个字节，用户点击文本框后该提醒会消失） 1
	//  tempobj.i_value_type =null;//组件使用值类型 2
	   tempobj.v_value_type =null;//组件使用值类型（ 日期时间格式 1  年月日 时分2  年月日	3  时分 1
	   tempobj.i_multiple_choices =null;//是否多选 1
//   	   tempobj.v_is_nust =null;  //组件是否必填   1
	   tempobj.v_is_phone =null; //是否拍照  2
	   tempobj.v_multiple_choices =null;//是否多选*  2
	   tempobj.combox_data=null;  //存储下拉框键集合的对象
	   return tempobj;
}
 		  
    	   
function is_changdu(attr_val){
	var err='';
 	if(attr_val==''){
		 err="长度必填!<br>";
		 return err;
	}
	else if(!/^[0-9]*$/.test(attr_val)){  
		  err="长度必须是数字!<br>";
		  return err;
	}  
 	return err;
}    

function is_biaoti(attr_val){
	var err='';
 	if(attr_val==''){
		 err+="标题必填!<br>";
		 return err;
	}
 	return err;
}
    	   /***提取表单后 初始化表单的元素的弹出框效果 传递图标选择的对象初始化使用**/
function initselcetdata( ){
		//  $("#navtab").delegate("#sourcetab", "click", function(e){
		    LPB.genSource();
		//  });
		   
		    $("#build").find("form").delegate(".component", "mousedown", function(md){
			  
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
		    //元素移动事件开始
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
		      });  //元素移动事件结束

		      //元素鼠标松开事件开始start 
		      $("body").delegate("#temp", "mouseup", function(mu){
		    	//  alert(1);
		        mu.preventDefault();
		       // alert(2);
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
		            } else {
		              $("#target .form-add").append($temp.append("\n\n\ \ \ \ ").html());
		            }
		          } else {
		            // no add
		            $("#target .component").css({"border-top" : "1px solid white", "border-bottom" : "none"});
		            tops = [];
		          }
		     //   alert(3);
		        //clean up & add popover
		        $target.css("background-color", "#fff");
		        $(document).undelegate("body", "mousemove");
		        $("body").undelegate("#temp","mouseup");
		        $("#target .component").popover({trigger: "manual"});
		     //   alert(4);
		        $temp.remove();
		        LPB.genSource();
		       // alert(5);
		      });//元素鼠标松开事件stop
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
 	 ICOinitfunction();//重置图标现在框的JS效果
}