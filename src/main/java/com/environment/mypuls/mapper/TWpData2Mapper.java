package com.environment.mypuls.mapper;

import com.environment.mypuls.entity.TWpData2;

import java.util.List;

import com.baomidou.mybatisplus.mapper.BaseMapper;

/**
 * <p>
  * 这个表只存每个设备一条最新的数据，用于地图加载等频繁查询的场景 Mapper 接口
 * </p>
 *
 * @author niuchen
 * @since 2018-07-03
 */
public interface TWpData2Mapper extends BaseMapper<TWpData2> {
	TWpData2 selectByVEquipmentName(String name);
	List<TWpData2> selectAllData();
	/**
	 * 查询一个设备近期10条的数据轨迹
	 * @return
	 */
	List<TWpData2> selectOnes(String name);
}