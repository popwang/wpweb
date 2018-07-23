package com.environment.mypuls.entity;

import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableName;

import java.io.Serializable;

/**
 * <p>
 * 
 * </p>
 *
 * @author niuchen
 * @since 2017-10-25
 */
@TableName("t_equipment_data2")
public class TEquipmentData2 extends Model<TEquipmentData2> {

    private static final long serialVersionUID = 1L;

    /**
     * 设备编号
     */
	@TableField("v_equipment_name")
	private String vEquipmentName;
    /**
     * 传感器状态
     */
	private Double p001;
    /**
     * PM2.5
     */
	private Double p002;
    /**
     * pm10
     */
	private Double p003;
    /**
     * 风速
     */
	private Double p004;
    /**
     * 风向
     */
	private Double p005;
    /**
     * 温度
     */
	private Double p006;
    /**
     * 湿度
     */
	private Double p007;
    /**
     * 噪音
     */
	private Double p008;
    /**
     * pm100
     */
	private Double p009;
    /**
     * 气压
     */
	private Double p010;
    /**
     * 风级
     */
	private Double p011;
    /**
     * 保留4
     */
	private Double p012;
    /**
     * 保留5
     */
	private Double p013;
    /**
     * 经度
     */
	private Double p014;
    /**
     * 纬度
     */
	private Double p015;

	public String getP005name() {
		return p005name;
	}

	public void setP005name(String p005name) {
		this.p005name = p005name;
	}


	@TableField(exist = false)
	private String p005name;

    /**
     * 数据插入时间
     */
	@TableField("dtm_create")
	private String dtmCreate;


	public String getvEquipmentName() {
		return vEquipmentName;
	}

	public void setvEquipmentName(String vEquipmentName) {
		this.vEquipmentName = vEquipmentName;
	}

	public Double getP001() {
		return p001;
	}

	public void setP001(Double p001) {
		this.p001 = p001;
	}

	public Double getP002() {
		return p002;
	}

	public void setP002(Double p002) {
		this.p002 = p002;
	}

	public Double getP003() {
		return p003;
	}

	public void setP003(Double p003) {
		this.p003 = p003;
	}

	public Double getP004() {
		return p004;
	}

	public void setP004(Double p004) {
		this.p004 = p004;
	}

	public Double getP005() {
		return p005;
	}

	public void setP005(Double p005) {
		this.p005 = p005;
	}

	public Double getP006() {
		return p006;
	}

	public void setP006(Double p006) {
		this.p006 = p006;
	}

	public Double getP007() {
		return p007;
	}

	public void setP007(Double p007) {
		this.p007 = p007;
	}

	public Double getP008() {
		return p008;
	}

	public void setP008(Double p008) {
		this.p008 = p008;
	}

	public Double getP009() {
		return p009;
	}

	public void setP009(Double p009) {
		this.p009 = p009;
	}

	public Double getP010() {
		return p010;
	}

	public void setP010(Double p010) {
		this.p010 = p010;
	}

	public Double getP011() {
		return p011;
	}

	public void setP011(Double p011) {
		this.p011 = p011;
	}

	public Double getP012() {
		return p012;
	}

	public void setP012(Double p012) {
		this.p012 = p012;
	}

	public Double getP013() {
		return p013;
	}

	public void setP013(Double p013) {
		this.p013 = p013;
	}

	public Double getP014() {
		return p014;
	}

	public void setP014(Double p014) {
		this.p014 = p014;
	}

	public Double getP015() {
		return p015;
	}

	public void setP015(Double p015) {
		this.p015 = p015;
	}

	public String getDtmCreate() {
		return dtmCreate;
	}

	public void setDtmCreate(String dtmCreate) {
		this.dtmCreate = dtmCreate;
	}

	@Override
	protected Serializable pkVal() {
		return this.vEquipmentName;
	}

	@Override
	public String toString() {
		return "TEquipmentData{" +
			", vEquipmentName=" + vEquipmentName +
			", p001=" + p001 +
			", p002=" + p002 +
			", p003=" + p003 +
			", p004=" + p004 +
			", p005=" + p005 +
			", p006=" + p006 +
			", p007=" + p007 +
			", p008=" + p008 +
			", p009=" + p009 +
			", p010=" + p010 +
			", p011=" + p011 +
			", p012=" + p012 +
			", p013=" + p013 +
			", p014=" + p014 +
			", p015=" + p015 +
			", dtmCreate=" + dtmCreate +
			"}";
	}
}
