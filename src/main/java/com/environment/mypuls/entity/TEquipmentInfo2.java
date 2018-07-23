package com.environment.mypuls.entity;

import java.io.Serializable;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableName;
/**
 * @author niuchen
 * @since 2017-10-27
 */
@TableName("t_equipment_info2")
public class TEquipmentInfo2 extends Model<TEquipmentInfo2> {

    private static final long serialVersionUID = 1L;

    /**
     * 设备ID
     */
	@TableField("i_equipment_id")
	private Integer iEquipmentId;
    /**
     * 设备名称
     */
	@TableField("v_equipment_name")
	private String vEquipmentName;
    /**
     * 设备类型
     */
	@TableField("v_equipment_type")
	private String vEquipmentType;
    /**
     * 设备类型ID
     */
	@TableField("i_euiqpment_type_id")
	private Integer iEuiqpmentTypeId;
    /**
     * 设备验证码
     */
	@TableField("v_equipment_check_code")
	private String vEquipmentCheckCode;
    /**
     * 创建时间
     */
	@TableField("dtm_create")
	private String dtmCreate;
	
	/**
     * 公司名称
     */
	@TableField("v_company")
	private String vCompany;
    /**
     * 联系电话
     */
	@TableField("v_phone")
	private String vPhone;
    /**
     * 设备地址
     */
	@TableField("v_address")
	private String vAddress;
    /**
     * 经度
     */
	@TableField("n_longitude")
	private Double nLongitude;
    /**
     * 纬度
     */
	@TableField("n_latitude")
	private Double nLatitude;
    /**
     * 百度经度
     */
	@TableField("n_longitude_bd")
	private Double nLongitudeBd;
    /**
     * 百度纬度
     */
	@TableField("n_latitude_bd")
	private Double nLatitudeBd;

	/**
	 * 传感器状态
	 */
	@TableField(exist = false)
	private Double p001;
	/**
	 * PM2.5
	 */
	@TableField(exist = false)
	private Double p002;
	/**
	 * pm10
	 */
	@TableField(exist = false)
	private Double p003;
	/**
	 * 风速
	 */
	@TableField(exist = false)
	private Double p004;
	/**
	 * 风向
	 */
	@TableField(exist = false)
	private Double p005;
	/**
	 * 温度
	 */
	@TableField(exist = false)
	private Double p006;
	/**
	 * 湿度
	 */
	@TableField(exist = false)
	private Double p007;
	/**
	 * 噪音
	 */
	@TableField(exist = false)
	private Double p008;
	/**
	 * pm100
	 */
	@TableField(exist = false)
	private Double p009;
	/**
	 * 气压
	 */
	@TableField(exist = false)
	private Double p010;
	/**
	 * 风级
	 */
	@TableField(exist = false)
	private Double p011;
	/**
	 * 保留4
	 */
	@TableField(exist = false)
	private Double p012;
	/**
	 * 保留5
	 */
	@TableField(exist = false)
	private Double p013;
	/**
	 * 经度
	 */
	@TableField(exist = false)
	private Double p014;
	/**
	 * 纬度
	 */
	private Double p015;
	@TableField(exist = false)
	private String p005name;
	/**
	 * 数据插入时间
	 */
	@TableField(exist = false)
	private String pdtm_create;

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

	public String getP005name() {
		return p005name;
	}

	public void setP005name(String p005name) {
		this.p005name = p005name;
	}

	public String getPdtm_create() {
		return pdtm_create;
	}

	public void setPdtm_create(String pdtm_create) {
		this.pdtm_create = pdtm_create;
	}

	public Integer getiEquipmentId() {
		return iEquipmentId;
	}

	public void setiEquipmentId(Integer iEquipmentId) {
		this.iEquipmentId = iEquipmentId;
	}

	public String getvEquipmentName() {
		return vEquipmentName;
	}

	public void setvEquipmentName(String vEquipmentName) {
		this.vEquipmentName = vEquipmentName;
	}

	public String getvEquipmentType() {
		return vEquipmentType;
	}

	public void setvEquipmentType(String vEquipmentType) {
		this.vEquipmentType = vEquipmentType;
	}

	public Integer getiEuiqpmentTypeId() {
		return iEuiqpmentTypeId;
	}

	public void setiEuiqpmentTypeId(Integer iEuiqpmentTypeId) {
		this.iEuiqpmentTypeId = iEuiqpmentTypeId;
	}

	public String getvEquipmentCheckCode() {
		return vEquipmentCheckCode;
	}

	public void setvEquipmentCheckCode(String vEquipmentCheckCode) {
		this.vEquipmentCheckCode = vEquipmentCheckCode;
	}


	public String getvCompany() {
		return vCompany;
	}

	public void setvCompany(String vCompany) {
		this.vCompany = vCompany;
	}

	public String getvPhone() {
		return vPhone;
	}

	public void setvPhone(String vPhone) {
		this.vPhone = vPhone;
	}

	public String getvAddress() {
		return vAddress;
	}

	public void setvAddress(String vAddress) {
		this.vAddress = vAddress;
	}

	public Double getnLongitude() {
		return nLongitude;
	}

	public void setnLongitude(Double nLongitude) {
		this.nLongitude = nLongitude;
	}

	public Double getnLatitude() {
		return nLatitude;
	}

	public void setnLatitude(Double nLatitude) {
		this.nLatitude = nLatitude;
	}

	public Double getnLongitudeBd() {
		return nLongitudeBd;
	}

	public void setnLongitudeBd(Double nLongitudeBd) {
		this.nLongitudeBd = nLongitudeBd;
	}

	public Double getnLatitudeBd() {
		return nLatitudeBd;
	}

	public void setnLatitudeBd(Double nLatitudeBd) {
		this.nLatitudeBd = nLatitudeBd;
	}

	@Override
	protected Serializable pkVal() {
		return this.iEquipmentId;
	}
	
	public String getDtmCreate() {
		return dtmCreate;
	}

	public void setDtmCreate(String dtmCreate) {
		this.dtmCreate = dtmCreate;
	}

	@Override
	public String toString() {
		return "TEquipmentInfo2{" +
			", iEquipmentId=" + iEquipmentId +
			", vEquipmentName=" + vEquipmentName +
			", vEquipmentType=" + vEquipmentType +
			", iEuiqpmentTypeId=" + iEuiqpmentTypeId +
			", vEquipmentCheckCode=" + vEquipmentCheckCode +
			", dtmCreate=" + dtmCreate +
			", vCompany=" + vCompany +
			", vPhone=" + vPhone +
			", vAddress=" + vAddress +
			", nLongitude=" + nLongitude +
			", nLatitude=" + nLatitude +
			", nLongitudeBd=" + nLongitudeBd +
			", nLatitudeBd=" + nLatitudeBd +
			"}";
	}
}
