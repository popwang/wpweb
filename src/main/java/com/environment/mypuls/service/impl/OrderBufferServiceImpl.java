package com.environment.mypuls.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.environment.mypuls.entity.TWpOrderBuffer;
import com.environment.mypuls.mapper.OrderBufferMapper;
import com.environment.mypuls.service.IOrderBufferService;

@Service
public class OrderBufferServiceImpl implements IOrderBufferService {

	@Autowired
	private OrderBufferMapper orderBufferMapper;
	
	@Override
	public void insertOrderBuffer(TWpOrderBuffer order) {
		orderBufferMapper.insert(order);
	}
}
