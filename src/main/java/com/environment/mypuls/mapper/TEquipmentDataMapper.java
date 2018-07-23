package com.environment.mypuls.mapper;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.environment.mypuls.entity.TEquipmentData;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 存量数据查询Mapper接口
 * </p>
 *
 * @author niuchen
 * @since 2017-10-25
 */
public interface TEquipmentDataMapper extends BaseMapper<TEquipmentData> {
	/**
	 * 分页查询历史数据
	 * @param map
	 * @return
	 */
	List<TEquipmentData> selectEquipmentData(Map<String,Object> map);
	/**
	 * 为柱状图查询最近的5条数据
	 * @param map
	 * @return
	 */
	List<TEquipmentData> selectEquipmentData4Chart(Map<String,Object> map);
}