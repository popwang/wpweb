//对textarea 长度进行验证
jQuery.fn.checkLength = function(parameters) {
defaults = {
min:0,
max:2000
}
jQuery.extend(defaults, parameters);
// 当前textarea 的值
var taValue = $(this).val();
var len = taValue.length;
if (len >= defaults.max) {
$(this).parent().append(showLengthError("最大不能超过2000个字符")).show();
window.setTimeout(function() {
$(".lenError").hide();
}, 5000);
return false;
} else if (len <= defaults.min) {
$(this).parent().append(showLengthError("不能低于1个字符"));
window.setTimeout(function() {
$(".lenError").hide();
}, 5000);
return false;
} else {
return true;
}
//todo: 当键盘输入在正确范围的时候，消除提示
} 

function showLengthError(max) { 
	return '<label id="notice_form_title-error" class="error" for="notice_form_title">'+max+'</label>';
	
}

