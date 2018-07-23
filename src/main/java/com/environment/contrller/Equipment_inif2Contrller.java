package com.environment.contrller;

import com.environment.mypuls.entity.TEquipmentInfo2;
import com.environment.mypuls.service.ITEquipmentInfo2Service;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 设备信息处理action
 * 设备信息包括设备基础信息和最新的一条设备数据
 * @author Administrator
 *
 */
@Controller
@RequestMapping("Equipment_info2")
@Api(value = "Equipmentinfo2Contrller", description = "设备数据")
public class Equipment_inif2Contrller extends BaseTOAction {
	@Autowired
	ITEquipmentInfo2Service itEquipmentInfoService;

	@RequestMapping("getEquipmentinfo2.htm")
	@ResponseBody
	@ApiOperation(value = "返回设备数据")
	public Map<String,Object> getEquipmentinfo2(String v_equipment_name) {
		Map<String,Object> map = new HashMap<String,Object>();
		String i_user_id = this.request.getSession().getAttribute("_i_user_id").toString();
		if (v_equipment_name != null && !"".equals(v_equipment_name)) {
			map.put("v_equipment_name", v_equipment_name);
		}
		if (i_user_id != null && !"".equals(i_user_id)) {
			map.put("i_user_id", i_user_id);
		}
		List<TEquipmentInfo2> telsit = itEquipmentInfoService.getTEquipmentInfo(map);
		map.clear();
		map.put("list", telsit);
		map.put("msg", "true");
		System.out.println(map);
		return map;
	}
	
	@RequestMapping("updateEquipmentinfo2.htm")
	@ResponseBody
	@ApiOperation(value = "更新设备数据")
	public Map<String,Object> updateEquipmentinfo2(String v_equipment_name) {
		Map<String,Object> map = new HashMap<String,Object>();
		
		String eid = this.request.getParameter("eid");
		String v_address = this.request.getParameter("v_address");
		String v_company = this.request.getParameter("v_company");
		String v_phone = this.request.getParameter("v_phone");
		
		if (eid != null && !"".equals(eid)) {
			map.put("eid", eid);
			map.put("v_address", v_address);
			map.put("v_company", v_company);
			map.put("v_phone", v_phone);
			itEquipmentInfoService.updateTEquipmentInfo2(map);
			itEquipmentInfoService.updateTEquipmentInfo(map);
			map.clear();
			map.put("msg", "true");
		}else{
			map.put("msg", "false");
		}
		return map;
	}

}
