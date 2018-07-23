package com.environment.contrller;

import au.com.bytecode.opencsv.CSVWriter;
import com.environment.mypuls.entity.TEquipmentData;
import com.environment.mypuls.entity.TEquipmentInfo2;
import com.environment.mypuls.mapper.TEquipmentDataMapper;
import com.environment.mypuls.service.ITEquipmentInfo2Service;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 设备历史数据处理action
 * @author Administrator
 */
@Controller
@RequestMapping("Equipment_data")
@Api(value = "Equipment_dataContrller", description = "设备数据")
public class Equipment_dataContrller extends BaseTOAction {
	@Autowired
	ITEquipmentInfo2Service itEquipmentInfoService;
	@Autowired
	TEquipmentDataMapper TEquipmentDataMapper;

	@RequestMapping("selectEquipmentData4Chart.htm")
	@ResponseBody
	@ApiOperation(value = "返回设备数据")
	public Map<String,Object> selectEquipmentData4Chart(String vEquipmentName, Integer shu) {
		Map<String,Object> map = new HashMap<String,Object>();
		if (vEquipmentName != null && !"".equals(vEquipmentName)) {
			map.put("v_equipment_name", vEquipmentName);
		} else {
			map.put("msg", "设备名称空");
			return map;
		}
		List<TEquipmentInfo2> telist = itEquipmentInfoService.getTEquipmentInfo(map);
		if (telist.size() < 1) {
			map.put("msg", "不存在的设备名称");
			return map;
		} else {
			map.put("objdata", telist.get(0));
		}
		List<TEquipmentData> chartlist = TEquipmentDataMapper.selectEquipmentData4Chart(map);
		map.put("objlist", chartlist);
		map.put("msg", "true");
		return map;
	}

	@RequestMapping("selectEquipmentData.htm")
	@ResponseBody
	@ApiOperation(value = "设备历史数据 分页")
	public Map<String,Object> selectEquipmentData(int offset, int limit, String date,String equipmentname, HttpServletRequest request,
			HttpServletResponse response) {
		System.out.println(offset + " " + limit + "  " + date);
		Integer pageNum = (offset / limit) + 1;
		Integer pageSize = limit;// 每页显示的数量
		String[] datezu = date.split(" - ");
		Map<String,Object> params = new HashMap<String,Object>();
		params.put("start", datezu[0].replaceAll("/", "-")+ " 00:00:00");
		params.put("end", datezu[1].replaceAll("/", "-")+ " 23:59:59");
		params.put("equipmentname", equipmentname);
		Page<?> page = PageHelper.startPage(pageNum, pageSize, true);

		List<TEquipmentData> te = TEquipmentDataMapper.selectEquipmentData(params);
		PageHelper.clearPage();
		params.clear();
		params.put("rows", te);
		params.put("total", page.getTotal());
		return params;
	}

	@RequestMapping("exportEquipmentData.htm")
	@ApiOperation(value = "设备历史数据 导出")
	public void exportEquipmentData(String date, HttpServletRequest request, HttpServletResponse response) {
		CSVWriter csv = null;
		HttpSession session = request.getSession();
		try {
			// 如果正在导出中 就终止,防止重复导出
			if (session.getAttribute("exportTag") != null) {
				response.setContentType("text/html;charset=UTF-8");
				response.getWriter().write("<script>alert('已经有一个文件下载正在进行中,未保证您的下载速度,请结束后在点击新的下载.')</script>");
				return;
			}
			Date date2 = new Date(System.currentTimeMillis());
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
			String times = sdf.format(date2);
			session.setAttribute("exportTag", 1);// 开始导出
			String filename = "数据" + times + ".csv";// 设置下载时客户端Excel的名称
			response.reset();
			response.setCharacterEncoding("UTF-8");
			filename = new String(filename.getBytes("UTF-8"), "ISO-8859-1");
			response.setContentType("application/octet-stream;charset=GBK");
			response.setHeader("Content-Disposition", "attachment;Filename=" + filename);

			csv = new CSVWriter(response.getWriter());
			String table[] = new String[] { "设备编号", "传感器状态", "PM2.5", "PM10", "风速", "风向", "温度", "湿度", "噪音", "PM100",
					"气压", "风级", "预留", "预留", "纬度", "经度", "数据插入时间" };

			csv.writeNext(table);
			csv.flush();
			String[] datezu = date.split(" - ");
			Map<String,Object> params = new HashMap<String,Object>();
			params.put("start", datezu[0].replaceAll("/", "-")+" 00:00:00");
			params.put("end", datezu[1].replaceAll("/", "-")+ " 23:59:59");
			List<TEquipmentData> te = TEquipmentDataMapper.selectEquipmentData(params);
			int i = 0;
			for (TEquipmentData eq : te) {
				request.getSession().setAttribute("exportTag", i++);
				String eqstr[] = new String[] { eq.getvEquipmentName(), eq.getP001().toString(),
						eq.getP002().toString(), eq.getP003().toString(), eq.getP004().toString(), eq.getP005name(),
						eq.getP006().toString(), eq.getP007().toString(), eq.getP008().toString(),
						eq.getP009().toString(), eq.getP010().toString(), eq.getP011().toString(),
						eq.getP012().toString(), eq.getP013().toString(), eq.getP014().toString(),
						eq.getP015().toString(), eq.getDtmCreate() };
				csv.writeNext(eqstr);
			}
			csv.flush();
			session.removeAttribute("exportTag");
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			session.removeAttribute("exportTag");
			if (csv != null) {
				try {
					csv.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
}
