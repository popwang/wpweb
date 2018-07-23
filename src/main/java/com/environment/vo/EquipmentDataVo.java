package com.environment.vo;

import java.io.Serializable;

public class EquipmentDataVo implements Serializable{
	private static final long serialVersionUID = -5499406930942134891L;
	private String deviceid;
    /**
     * PM2.5
     */
	private Double pm25;
    /**
     * pm10
     */
	private Double pm10;
    /**
     * 风速
     */
	private Double winds;
    /**
     * 风向
     */
	private String windd;
    /**
     * 温度
     */
	private Double temp;
    /**
     * 湿度
     */
	private Double humi;
    /**
     * 噪音
     */
	private Double noise;
    /**
     * pm100
     */
	private Double pm100;
    /**
     * 气压
     */
	private Double pre;
    
    /**
     * 经度
     */
	private Double logi;
    /**
     * 纬度
     */
	private Double lati;
	/**
	 * 数据时间
	 */
	private String dtmCreate;
	
	public String getDtmCreate() {
		return dtmCreate;
	}
	public void setDtmCreate(String dtmCreate) {
		this.dtmCreate = dtmCreate;
	}
	public String getDeviceid() {
		return deviceid;
	}
	public void setDeviceid(String deviceid) {
		this.deviceid = deviceid;
	}
	public Double getPm25() {
		return pm25;
	}
	public void setPm25(Double pm25) {
		this.pm25 = pm25;
	}
	public Double getPm10() {
		return pm10;
	}
	public void setPm10(Double pm10) {
		this.pm10 = pm10;
	}
	public Double getWinds() {
		return winds;
	}
	public void setWinds(Double winds) {
		this.winds = winds;
	}
	
	public String getWindd() {
		return windd;
	}
	public void setWindd(String windd) {
		this.windd = windd;
	}
	public Double getTemp() {
		return temp;
	}
	public void setTemp(Double temp) {
		this.temp = temp;
	}
	public Double getHumi() {
		return humi;
	}
	public void setHumi(Double humi) {
		this.humi = humi;
	}
	public Double getNoise() {
		return noise;
	}
	public void setNoise(Double noise) {
		this.noise = noise;
	}
	public Double getPm100() {
		return pm100;
	}
	public void setPm100(Double pm100) {
		this.pm100 = pm100;
	}
	public Double getPre() {
		return pre;
	}
	public void setPre(Double pre) {
		this.pre = pre;
	}
	public Double getLogi() {
		return logi;
	}
	public void setLogi(Double logi) {
		this.logi = logi;
	}
	public Double getLati() {
		return lati;
	}
	public void setLati(Double lati) {
		this.lati = lati;
	}
}
