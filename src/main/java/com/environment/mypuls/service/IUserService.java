package com.environment.mypuls.service;

import com.baomidou.mybatisplus.service.IService;
import com.environment.mypuls.entity.TUserInfo;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author niuchen
 * @since 2017-10-25
 */
public interface IUserService extends IService<TUserInfo> {
	public List<TUserInfo> selectUserOnLogin(String userName,String password);
}
