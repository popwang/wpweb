package com.environment.mypuls.service.impl;

import com.environment.mypuls.entity.TWpData2;
import com.environment.mypuls.mapper.TWpData2Mapper;
import com.environment.mypuls.service.ITWpData2Service;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 这个表只存每个设备一条最新的数据，用于地图加载等频繁查询的场景 服务实现类
 * </p>
 *
 * @author niuchen
 * @since 2018-07-03
 */
@Service
public class TWpData2ServiceImpl extends ServiceImpl<TWpData2Mapper, TWpData2> implements ITWpData2Service {
	@Autowired
	private TWpData2Mapper tWpData2Mapper;
	
	@Override
	public TWpData2 selectTWpData2ByName(String name) {
		return tWpData2Mapper.selectByVEquipmentName(name);
	}
	
	@Override
	public List<TWpData2> selectAllData() {
		return tWpData2Mapper.selectAllData();
	}
	
	@Override
	public List<TWpData2> selectOnes(String name) {
		return tWpData2Mapper.selectOnes(name);
	}
	
}
