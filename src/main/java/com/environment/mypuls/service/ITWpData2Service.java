package com.environment.mypuls.service;

import com.environment.mypuls.entity.TWpData2;

import java.io.Serializable;
import java.util.List;

import com.baomidou.mybatisplus.service.IService;

/**
 * <p>
 * 这个表只存每个设备一条最新的数据，用于地图加载等频繁查询的场景 服务类
 * </p>
 *
 * @author niuchen
 * @since 2018-07-03
 */
public interface ITWpData2Service extends IService<TWpData2> {
	 public TWpData2 selectTWpData2ByName(String name);
	 public List<TWpData2> selectAllData();
	 public List<TWpData2> selectOnes(String name);
}
