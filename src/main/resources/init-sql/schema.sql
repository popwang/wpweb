CREATE TABLE `t_wp_order_buffer` (
  `i_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `v_equipment_name` varchar(100) DEFAULT NULL COMMENT '设备编号',
  `v_order_content` varchar(500) DEFAULT NULL COMMENT '发送内容',
  `i_send_flag` int(11) DEFAULT NULL COMMENT '发送标志，0未发送，大于0已发送次数',
  `dtm_create` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '数据插入时间',
  PRIMARY KEY (`i_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `t_wp_data` (
  `v_equipment_name` varchar(20) NOT NULL DEFAULT '' COMMENT '设备名称',
  `v_motor_status` varchar(10) DEFAULT NULL COMMENT '电机工作状态，10个电机，1运行，0停止',
  `v_motor_temp` varchar(255) DEFAULT NULL COMMENT '电机温度，10个电机，每个电机2位标识',
  `v_motor_speed` varchar(255) DEFAULT NULL COMMENT '电机转速，10个电机，每个电机2位标识',
  `d_longitude` double(10,6) DEFAULT NULL COMMENT '经度',
  `d_latitude` double(10,6) DEFAULT NULL COMMENT '纬度',
  `dtm_create` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '数据插入时间',
  `i_work_model` int(11) DEFAULT NULL COMMENT '工作模式，1手动模式，2远程模式，3定时模式，4其他',
  `i_work_status` int(11) DEFAULT NULL COMMENT '工作状态，1有水，2缺水，3缺相，4其他'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

CREATE TABLE `t_wp_data2` (
  `v_equipment_name` varchar(20) NOT NULL DEFAULT '' COMMENT '设备名称',
  `v_motor_status` varchar(10) DEFAULT NULL COMMENT '电机工作状态，10个电机，1运行，0停止',
  `v_motor_temp` varchar(255) DEFAULT NULL COMMENT '电机温度，10个电机，每个电机2位标识',
  `v_motor_speed` varchar(255) DEFAULT NULL COMMENT '电机转速，10个电机，每个电机2位标识',
  `d_longitude` double(10,6) DEFAULT NULL COMMENT '经度',
  `d_latitude` double(10,6) DEFAULT NULL COMMENT '纬度',
  `dtm_create` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '数据插入时间',
  `i_work_model` int(11) DEFAULT NULL COMMENT '工作模式，1手动模式，2远程模式，3定时模式，4其他',
  `i_work_status` int(11) DEFAULT NULL COMMENT '工作状态，1有水，2缺水，3缺相，4其他'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

CREATE TABLE `t_user_info` (
  `i_user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `v_user_name` varchar(50) DEFAULT NULL COMMENT '用户名',
  `v_password` varchar(20) DEFAULT NULL COMMENT '密码',
  `dtm_create` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `i_admin` int(11) DEFAULT NULL COMMENT '是否管理员，0否，1是',
  PRIMARY KEY (`i_user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `t_user_equipment_relation` (
  `i_user_id` int(11) DEFAULT NULL COMMENT '用户ID',
  `i_equipment_id` int(11) DEFAULT NULL COMMENT '设备ID',
  `dtm_create` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户与设备关联关系表';

insert into t_user_info(v_user_name,v_password,i_admin) values('admin','admin',1);