package com.environment.contrller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.environment.mypuls.mapper.DataServerMapper;
import com.environment.vo.EquipmentDataVo;
import com.google.common.collect.Lists;

@Controller
@RequestMapping("/server")
public class ServerController extends BaseTOAction {
	@Autowired
	private DataServerMapper dataServerMapper;
	
	@RequestMapping("/getEnvironmentData")
	@ResponseBody
	public Map<String,Object> getEnvironmentData(String devices){
		Map<String, Object> map = new HashMap<>();
		try{
			String[] tmp = devices.split(",");
			List<String> elist = Lists.newArrayList(tmp);
			map.put("elist", elist);
			List<EquipmentDataVo> list = this.dataServerMapper.getEnvironmentData(map);
			map.clear();
			map.put("msg", "success");
			map.put("datas", list);
		}catch(Exception e){
			e.printStackTrace();
			map.put("msg", "error");
			map.put("datas", e.getMessage());
		}
		return map;
	}
	
	@RequestMapping("/getEnvironmentData2")
	@ResponseBody
	public String getEnvironmentData2(String equipments){
		return "hello world";
	}
}
