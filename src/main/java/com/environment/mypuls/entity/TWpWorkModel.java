package com.environment.mypuls.entity;

import java.io.Serializable;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableName;

/**
 * <p>
 * 雾炮工作模式字典表
 * </p>
 *
 * @author niuchen
 * @since 2018-07-03
 */
@TableName("t_wp_work_model")
public class TWpWorkModel extends Model<TWpWorkModel> {

    private static final long serialVersionUID = 1L;

    /**
     * 工作状态ID
     */
	@TableField("i_work_model")
	private Integer iWorkModel;
    /**
     * 工作状态名称
     */
	@TableField("v_work_model")
	private String vWorkModel;


	public Integer getiWorkModel() {
		return iWorkModel;
	}

	public void setiWorkModel(Integer iWorkModel) {
		this.iWorkModel = iWorkModel;
	}

	public String getvWorkModel() {
		return vWorkModel;
	}

	public void setvWorkModel(String vWorkModel) {
		this.vWorkModel = vWorkModel;
	}

	@Override
	protected Serializable pkVal() {
		return this.iWorkModel;
	}

	@Override
	public String toString() {
		return "TWpWorkModel{" +
			", iWorkModel=" + iWorkModel +
			", vWorkModel=" + vWorkModel +
			"}";
	}
}
