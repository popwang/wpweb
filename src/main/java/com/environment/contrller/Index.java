package com.environment.contrller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.environment.mypuls.entity.TUserInfo;
import com.environment.mypuls.service.IUserService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@Scope("prototype")
@Api(value = "index", description = "系统入口")
public class Index extends BaseTOAction {
	
	@Autowired
	private IUserService user;
	
	@RequestMapping("/index.htm")
	@ApiOperation(value = "进入")
	public ModelAndView index(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("index");
		return mv;
	}

	@RequestMapping("/login.htm")
	@ApiOperation(value = "登陆")
	@ApiImplicitParams(value = {
			@ApiImplicitParam(paramType = "query", name = "userName", dataType = "String", required = true, value = "账号"),
			@ApiImplicitParam(paramType = "query", name = "password", dataType = "String", required = true, value = "密码") })
	@ResponseBody
	public Map<String,Object> login(String userName, String password, HttpServletRequest request, HttpServletResponse response) {
		
		Map<String,Object> map = new HashMap<String,Object>();
		List<TUserInfo> list = user.selectUserOnLogin(userName, password);
		
		if (list.size()>0) {
			request.getSession().setAttribute("_i_user_id", list.get(0).getiUserId());
			request.getSession().setAttribute("sys_user_key", list.get(0));
			map.put("msg", "ok");
		} else {
			map.put("msg", "error");
		}
		return map;
	}

	@RequestMapping("/main.htm")
	@ApiOperation(value = "进入工作页")
	public ModelAndView main() {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("main");
		return mv;
	}

	@RequestMapping("/quit.htm")
	@ApiOperation(value = "退出返回主页")
	public ModelAndView quit() {
		ModelAndView mv = new ModelAndView();
		request.getSession().removeAttribute("sys_user_key");
		mv.setViewName("index");
		return mv;
	}

	@RequestMapping("/baidumap/index.htm")
	@ApiOperation(value = "进入地图")
	public ModelAndView baidumapindex(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("/baidumap/baidumap");
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("basepath", this.getBasepath());

		mv.addAllObjects(map);
		return mv;
	}
	
	@RequestMapping("/baidumap/line.htm")
	@ApiOperation(value = "进入地图")
	public ModelAndView baidumapline(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("/baidumap/linemap");
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("basepath", this.getBasepath());

		mv.addAllObjects(map);
		return mv;
	}

	@RequestMapping("/eqdateselect/index.htm")
	@ApiOperation(value = "进入数据查询")
	public ModelAndView eqdateselect(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("/eqdateselect/eqdateselect");
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("basepath", this.getBasepath());
		mv.addAllObjects(map);
		return mv;
	}

	@RequestMapping("/workbench/index.htm")
	@ApiOperation(value = "进入工作台查询")
	public ModelAndView workbench(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("/workbench/workbench");
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("basepath", this.getBasepath());

		mv.addAllObjects(map);
		return mv;
	}
	
	@RequestMapping("/workbench/add.htm")
	@ApiOperation(value = "进入设备添加工作台")
	public ModelAndView add(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("/workbench/add");
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("basepath", this.getBasepath());
		mv.addAllObjects(map);
		return mv;
	}

}
