package com.environment.mypuls.mapper;

import com.environment.mypuls.entity.TEquipmentInfo2;
import com.baomidou.mybatisplus.mapper.BaseMapper;

import java.util.List;
import java.util.Map;

/**
 * <p>
  *  设备信息操作Mapper 接口
 * </p>
 *
 * @author niuchen
 * @since 2017-10-27
 */
public interface TEquipmentInfo2Mapper extends BaseMapper<TEquipmentInfo2> {
    /**
     * 查询设备信息,关联查询设备对应的最新一条数据
     * @param map
     * @return
     */
	List<TEquipmentInfo2> getTEquipmentInfo2(Map<String,Object> map);
    /**
     * 更新info2表，新系统用这个表
     * @param map
     * @return
     */
	int updateTEquipmentInfo2(Map<String,Object> map);
    /**
     * 更新info表，老系统用这个表
     * @param map
     * @return
     */
	int updateTEquipmentInfo(Map<String,Object> map);
}