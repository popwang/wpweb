package com.environment.mypuls.entity;

import java.io.Serializable;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import java.util.Date;
import com.baomidou.mybatisplus.enums.IdType;
import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableName;

/**
 * <p>
 * 
 * </p>
 *
 * @author niuchen
 * @since 2017-10-25
 */
@TableName("t_user_info")
public class TUserInfo extends Model<TUserInfo> {

    private static final long serialVersionUID = 1L;

    /**
     * 用户id，自增长
     */
	@TableId(value="i_user_id", type= IdType.AUTO)
	private Integer iUserId;
    /**
     * 用户名
     */
	@TableField("v_user_name")
	private String vUserName;
    /**
     * 密码
     */
	@TableField("v_password")
	private String vPassword;
    /**
     * 创建时间
     */
	@TableField("dtm_create")
	private Date dtmCreate;
    /**
     * 是否管理员：0否1是
     */
	@TableField("i_admin")
	private Integer iAdmin;


	public Integer getiUserId() {
		return iUserId;
	}

	public void setiUserId(Integer iUserId) {
		this.iUserId = iUserId;
	}

	public String getvUserName() {
		return vUserName;
	}

	public void setvUserName(String vUserName) {
		this.vUserName = vUserName;
	}

	public String getvPassword() {
		return vPassword;
	}

	public void setvPassword(String vPassword) {
		this.vPassword = vPassword;
	}

	public Date getDtmCreate() {
		return dtmCreate;
	}

	public void setDtmCreate(Date dtmCreate) {
		this.dtmCreate = dtmCreate;
	}

	public Integer getiAdmin() {
		return iAdmin;
	}

	public void setiAdmin(Integer iAdmin) {
		this.iAdmin = iAdmin;
	}

	@Override
	protected Serializable pkVal() {
		return this.iUserId;
	}

	@Override
	public String toString() {
		return "TUserInfo{" +
			", iUserId=" + iUserId +
			", vUserName=" + vUserName +
			", vPassword=" + vPassword +
			", dtmCreate=" + dtmCreate +
			", iAdmin=" + iAdmin +
			"}";
	}
}
