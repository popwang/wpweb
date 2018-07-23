package com.environment.mypuls.entity;

import java.io.Serializable;

import java.util.Date;
import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableName;

/**
 * <p>
 * 
 * </p>
 *
 * @author niuchen
 * @since 2018-07-03
 */
@TableName("t_equipment_project")
public class TEquipmentProject extends Model<TEquipmentProject> {

    private static final long serialVersionUID = 1L;

    /**
     * 设备名称
     */
	@TableField("v_equipment_name")
	private String vEquipmentName;
    /**
     * 项目名称
     */
	@TableField("v_project_name")
	private String vProjectName;
    /**
     * 后台服务地址
     */
	@TableField("v_url")
	private String vUrl;
    /**
     * 系统名称
     */
	@TableField("v_system")
	private String vSystem;
    /**
     * 添加时间
     */
	@TableField("dtm_add")
	private Date dtmAdd;
    /**
     * 系统ID
     */
	@TableField("i_system_id")
	private Integer iSystemId;


	public String getvEquipmentName() {
		return vEquipmentName;
	}

	public void setvEquipmentName(String vEquipmentName) {
		this.vEquipmentName = vEquipmentName;
	}

	public String getvProjectName() {
		return vProjectName;
	}

	public void setvProjectName(String vProjectName) {
		this.vProjectName = vProjectName;
	}

	public String getvUrl() {
		return vUrl;
	}

	public void setvUrl(String vUrl) {
		this.vUrl = vUrl;
	}

	public String getvSystem() {
		return vSystem;
	}

	public void setvSystem(String vSystem) {
		this.vSystem = vSystem;
	}

	public Date getDtmAdd() {
		return dtmAdd;
	}

	public void setDtmAdd(Date dtmAdd) {
		this.dtmAdd = dtmAdd;
	}

	public Integer getiSystemId() {
		return iSystemId;
	}

	public void setiSystemId(Integer iSystemId) {
		this.iSystemId = iSystemId;
	}

	@Override
	protected Serializable pkVal() {
		return this.iSystemId;
	}

	@Override
	public String toString() {
		return "TEquipmentProject{" +
			", vEquipmentName=" + vEquipmentName +
			", vProjectName=" + vProjectName +
			", vUrl=" + vUrl +
			", vSystem=" + vSystem +
			", dtmAdd=" + dtmAdd +
			", iSystemId=" + iSystemId +
			"}";
	}
}
