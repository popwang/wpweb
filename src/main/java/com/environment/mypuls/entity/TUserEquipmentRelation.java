package com.environment.mypuls.entity;

import java.io.Serializable;

import com.baomidou.mybatisplus.annotations.TableField;
import java.util.Date;
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
@TableName("t_user_equipment_relation")
public class TUserEquipmentRelation extends Model<TUserEquipmentRelation> {

    private static final long serialVersionUID = 1L;

    /**
     * 用户ID
     */
	@TableField("i_user_id")
	private Integer iUserId;
    /**
     * 设备ID
     */
	@TableField("i_equipment_id")
	private Integer iEquipmentId;
    /**
     * 创建时间
     */
	@TableField("dtm_create")
	private Date dtmCreate;


	public Integer getiUserId() {
		return iUserId;
	}

	public void setiUserId(Integer iUserId) {
		this.iUserId = iUserId;
	}

	public Integer getiEquipmentId() {
		return iEquipmentId;
	}

	public void setiEquipmentId(Integer iEquipmentId) {
		this.iEquipmentId = iEquipmentId;
	}

	public Date getDtmCreate() {
		return dtmCreate;
	}

	public void setDtmCreate(Date dtmCreate) {
		this.dtmCreate = dtmCreate;
	}

	@Override
	protected Serializable pkVal() {
		return this.iEquipmentId;
	}

	@Override
	public String toString() {
		return "TUserEquipmentRelation{" +
			", iUserId=" + iUserId +
			", iEquipmentId=" + iEquipmentId +
			", dtmCreate=" + dtmCreate +
			"}";
	}
}
