package com.environment.mypuls.entity;

import java.io.Serializable;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableName;

/**
 * <p>
 * 雾炮工作状态字典表
 * </p>
 *
 * @author niuchen
 * @since 2018-07-03
 */
@TableName("t_wp_work_status")
public class TWpWorkStatus extends Model<TWpWorkStatus> {

    private static final long serialVersionUID = 1L;

    /**
     * 雾炮工作状态ID
     */
	@TableField("i_work_status")
	private Integer iWorkStatus;
    /**
     * 雾炮工作状态名称
     */
	@TableField("v_work_status")
	private String vWorkStatus;


	public Integer getiWorkStatus() {
		return iWorkStatus;
	}

	public void setiWorkStatus(Integer iWorkStatus) {
		this.iWorkStatus = iWorkStatus;
	}

	public String getvWorkStatus() {
		return vWorkStatus;
	}

	public void setvWorkStatus(String vWorkStatus) {
		this.vWorkStatus = vWorkStatus;
	}

	@Override
	protected Serializable pkVal() {
		return this.iWorkStatus;
	}

	@Override
	public String toString() {
		return "TWpWorkStatus{" +
			", iWorkStatus=" + iWorkStatus +
			", vWorkStatus=" + vWorkStatus +
			"}";
	}
}
