package com.environment.mypuls.service.impl;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.environment.mypuls.entity.TUserInfo;
import com.environment.mypuls.mapper.UserMapper;
import com.environment.mypuls.service.IUserService;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author niuchen
 * @since 2017-10-25
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, TUserInfo> 
										implements IUserService {
	@Override
	public List<TUserInfo> selectUserOnLogin(String userName, String password) {
		return baseMapper.selectUserOnLogin(userName, password);
	}
}
