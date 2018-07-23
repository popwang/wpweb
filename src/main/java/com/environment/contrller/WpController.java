package com.environment.contrller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.environment.mypuls.entity.TWpData2;
import com.environment.mypuls.entity.TWpOrderBuffer;
import com.environment.mypuls.service.IOrderBufferService;
import com.environment.mypuls.service.ITWpData2Service;
import com.environment.utils.CommandUtil;

@Controller
@RequestMapping("/wp")
public class WpController {
	
	@Autowired
	private IOrderBufferService orderBufferService;
	
	@Autowired
	private ITWpData2Service wpData2Service;
	/**
	 * 根据操作保存指令
	 * @param command
	 * @param name
	 * @param status
	 * @param sets
	 * @return
	 */
	@RequestMapping("/command")
	@ResponseBody
	public Map<String,Object> offonHandler(String command,String name,String status,String sets){
		Map<String,Object> map = new HashMap<>();
		TWpOrderBuffer order = new TWpOrderBuffer();
		String cmd = CommandUtil.getCommand(command, name, status, sets);
		order.setiSendFlag(0);
		order.setvEquipmentName(name);
		order.setvOrderContent(cmd);
		orderBufferService.insertOrderBuffer(order);
		map.put("msg", "success");
		return map;
	}
	/**
	 * 查询设备的最新状态
	 * @param name
	 * @return
	 */
	@RequestMapping("/state")
	@ResponseBody
	public Map<String,Object> stateHandler(String name){
		Map<String,Object> map = new HashMap<>();
		TWpData2 data = wpData2Service.selectTWpData2ByName(name);
		map.put("status", data.getvMotorStatus());
		map.put("msg", "success");
		return map;
	}
	/**
	 * 查询所有设备最新信息
	 * @return
	 */
	@RequestMapping("/allData2")
	@ResponseBody
	public Map<String,Object> allData2Handler(){
		Map<String,Object> map = new HashMap<>();
		List<TWpData2> list = wpData2Service.selectAllData();
		map.put("list", list);
		map.put("msg", "success");
		return map;
	}
	
	/**
	 * 查询所有设备最新信息
	 * @return
	 */
	@RequestMapping("/oneDatas")
	@ResponseBody
	public Map<String,Object> oneData2Handler(String name){
		Map<String,Object> map = new HashMap<>();
		List<TWpData2> list = wpData2Service.selectOnes(name);
		map.put("list", list);
		map.put("msg", "success");
		return map;
	}
	
	
}
