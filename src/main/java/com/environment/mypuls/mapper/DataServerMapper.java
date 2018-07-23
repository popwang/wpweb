package com.environment.mypuls.mapper;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.environment.vo.EquipmentDataVo;

import java.util.List;
import java.util.Map;

/**
 * 
 * @author pactera
 *
 */
public interface DataServerMapper extends BaseMapper<EquipmentDataVo> {
	/**
	 * 数据接口查询方法
	 * @param map
	 * @return
	 */
	List<EquipmentDataVo> getEnvironmentData(Map<String,Object> map);
}