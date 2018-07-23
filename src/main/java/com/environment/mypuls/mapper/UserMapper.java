package com.environment.mypuls.mapper;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.environment.mypuls.entity.TUserInfo;

import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * <p>
  *  Mapper 接口
 * </p>
 *
 * @author niuchen
 * @since 2017-10-25
 */
public interface UserMapper extends BaseMapper<TUserInfo> {
	/**
	 * 登陆验证
	 * @return
	 */
	public List<TUserInfo> selectUserOnLogin(@Param("userName")String userName,@Param("password")String password);
    
}