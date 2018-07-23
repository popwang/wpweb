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
@TableName("t_wp_data")
public class TWpData extends Model<TWpData> {

    private static final long serialVersionUID = 1L;

    /**
     * 设备名称
     */
	@TableField("v_equipment_name")
	private String vEquipmentName;
    /**
     * 电机工作状态，10个电机，1运行，0停止
     */
	@TableField("v_motor_status")
	private String vMotorStatus;
    /**
     * 电机温度，10个电机，每个电机2位标识
     */
	@TableField("v_motor_temp")
	private String vMotorTemp;
    /**
     * 电机转速，10个电机，每个电机2位标识
     */
	@TableField("v_motor_speed")
	private String vMotorSpeed;
    /**
     * 经度
     */
	@TableField("d_longitude")
	private Double dLongitude;
    /**
     * 纬度
     */
	@TableField("d_latitude")
	private Double dLatitude;
    /**
     * 数据插入时间
     */
	@TableField("dtm_create")
	private Date dtmCreate;
    /**
     * 工作模式，1手动模式，2远程模式，3定时模式，4其他
     */
	@TableField("i_work_model")
	private Integer iWorkModel;
    /**
     * 工作状态，1有水，2缺水，3缺相，4其他
     */
	@TableField("i_work_status")
	private Integer iWorkStatus;


	public String getvEquipmentName() {
		return vEquipmentName;
	}

	public void setvEquipmentName(String vEquipmentName) {
		this.vEquipmentName = vEquipmentName;
	}

	public String getvMotorStatus() {
		return vMotorStatus;
	}

	public void setvMotorStatus(String vMotorStatus) {
		this.vMotorStatus = vMotorStatus;
	}

	public String getvMotorTemp() {
		return vMotorTemp;
	}

	public void setvMotorTemp(String vMotorTemp) {
		this.vMotorTemp = vMotorTemp;
	}

	public String getvMotorSpeed() {
		return vMotorSpeed;
	}

	public void setvMotorSpeed(String vMotorSpeed) {
		this.vMotorSpeed = vMotorSpeed;
	}

	public Double getdLongitude() {
		return dLongitude;
	}

	public void setdLongitude(Double dLongitude) {
		this.dLongitude = dLongitude;
	}

	public Double getdLatitude() {
		return dLatitude;
	}

	public void setdLatitude(Double dLatitude) {
		this.dLatitude = dLatitude;
	}

	public Date getDtmCreate() {
		return dtmCreate;
	}

	public void setDtmCreate(Date dtmCreate) {
		this.dtmCreate = dtmCreate;
	}

	public Integer getiWorkModel() {
		return iWorkModel;
	}

	public void setiWorkModel(Integer iWorkModel) {
		this.iWorkModel = iWorkModel;
	}

	public Integer getiWorkStatus() {
		return iWorkStatus;
	}

	public void setiWorkStatus(Integer iWorkStatus) {
		this.iWorkStatus = iWorkStatus;
	}


	@Override
	public String toString() {
		return "TWpData{" +
			", vEquipmentName=" + vEquipmentName +
			", vMotorStatus=" + vMotorStatus +
			", vMotorTemp=" + vMotorTemp +
			", vMotorSpeed=" + vMotorSpeed +
			", dLongitude=" + dLongitude +
			", dLatitude=" + dLatitude +
			", dtmCreate=" + dtmCreate +
			", iWorkModel=" + iWorkModel +
			", iWorkStatus=" + iWorkStatus +
			"}";
	}

	@Override
	protected Serializable pkVal() {
		return vEquipmentName;
	}
}
