package com.environment.contrller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

/**
 * niuchen 201705 action的常用方法类 包括,服务器地址 权限dao
 * 
 ***/
@Scope("prototype")
public class BaseTOAction {
	@Autowired
	public HttpServletRequest request;

 	@RequestMapping("/exportTag")
	@ResponseBody
	public Map<String,Object> exportTag(HttpServletRequest request){
 		Map<String,Object> params=new HashMap<String,Object>();
 		params.put("exportTag",  request.getSession().getAttribute("exportTag"));
   		return params;
	}

	// 返回服务器路径
	public String getBasepath() {
		String basepath = this.request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
				+ request.getContextPath() + "/";
		return basepath;
	}
}
