package com.environment.mypuls.entity;

import java.io.Serializable;

import com.baomidou.mybatisplus.annotations.TableField;
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
@TableName("t_wind_direct_dic")
public class TWindDirectDic extends Model<TWindDirectDic> {

    private static final long serialVersionUID = 1L;

    /**
     * 风向id
     */
	@TableField("i_wind_direct_id")
	private Integer iWindDirectId;
    /**
     * 风向
     */
	@TableField("v_wind_direct_name")
	private String vWindDirectName;


	public Integer getiWindDirectId() {
		return iWindDirectId;
	}

	public void setiWindDirectId(Integer iWindDirectId) {
		this.iWindDirectId = iWindDirectId;
	}

	public String getvWindDirectName() {
		return vWindDirectName;
	}

	public void setvWindDirectName(String vWindDirectName) {
		this.vWindDirectName = vWindDirectName;
	}

	@Override
	protected Serializable pkVal() {
		return this.iWindDirectId;
	}

	@Override
	public String toString() {
		return "TWindDirectDic{" +
			", iWindDirectId=" + iWindDirectId +
			", vWindDirectName=" + vWindDirectName +
			"}";
	}
}
