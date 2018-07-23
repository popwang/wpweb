package com.environment.mypuls.entity;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableName;

@TableName("t_wp_order_buffer")
public class TWpOrderBuffer {
	@TableField("i_id")
	private Integer iId;
	@TableField("v_equipment_name")
	private String vEquipmentName;
	@TableField("v_order_content")
	private String vOrderContent;
	@TableField("i_send_flag")
	private Integer iSendFlag;
	@TableField("dtm_create")
	private String dtmCreate;
	
	public Integer getiId() {
		return iId;
	}
	public void setiId(Integer iId) {
		this.iId = iId;
	}
	public String getvEquipmentName() {
		return vEquipmentName;
	}
	public void setvEquipmentName(String vEquipmentName) {
		this.vEquipmentName = vEquipmentName;
	}
	public String getvOrderContent() {
		return vOrderContent;
	}
	public void setvOrderContent(String vOrderContent) {
		this.vOrderContent = vOrderContent;
	}
	
	public Integer getiSendFlag() {
		return iSendFlag;
	}
	public void setiSendFlag(Integer iSendFlag) {
		this.iSendFlag = iSendFlag;
	}
	public String getDtmCreate() {
		return dtmCreate;
	}
	public void setDtmCreate(String dtmCreate) {
		this.dtmCreate = dtmCreate;
	}
}
