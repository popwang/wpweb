package com.environment.utils;

/**
 * 雾炮指令生成工具类，实现以下几个功能：
 * 1.生成读取数据指令；
 * 2.生成开关指令；
 * 3.生成锁定设备指令；
 * 4.生成解锁设备指令；
 * 5.生成定时指令。
 * @author pactera
 */
public class CommandUtil {
	
	public static String READ_CMD = "SD,READ,NAME,END";
	
	public static String OFF_ON_CMD = "SD,CTRL,NAME,STATUS,END";
	
	public static String LOCK_CMD = "SD,LOCK,NAME,END";
	
	public static String UNLOCK_CMD = "SD,UNLK,NAME,END";
	
	public static String SET_TIME_CMD = "SD,TIME,NAME,STATUS,SETS,END";
	/**
	 * 命令接口
	 * @author pactera
	 *
	 */
	private interface CommandType{
		/**
		 * 读取命令
		 */
		public static String READ = "READ";
		/**
		 * 开关命令
		 */
		public static String OFFON = "OFFON";
		/**
		 * 锁定命令
		 */
		public static String LOCK = "LOCK";
		/**
		 * 解锁命令
		 */
		public static String UNLOCK = "UNLOCK";
		/**
		 * 定时命令 
		 */
		public static String SETTIME = "SETTIME";
	}
	
	public static String getReadCmd(String name){
		return getCommand(CommandType.READ,name,null,null);
	}
	
	public static String getOffonCmd(String name,String status){
		return getCommand(CommandType.OFFON,name,status,null);
	}
	
	public static String getLockCmd(String name){
		return getCommand(CommandType.LOCK,name,null,null);
	}
	
	public static String getUnlockCmd(String name){
		return getCommand(CommandType.UNLOCK,name,null,null);
	}
	
	public static String getSetTimeCmd(String name,String status,String sets){
		return getCommand(CommandType.SETTIME,name,status,sets);
	}
	
	public static String getCommand(String commandType,String name,String status,String sets){
		String cmd = "";
		switch(commandType){
			case CommandType.READ:
				cmd = READ_CMD.replace("NAME", name);
				break;
			case CommandType.OFFON:
				cmd = OFF_ON_CMD.replace("NAME", name).replace("STATUS", status);
				break;
			case CommandType.LOCK:
				cmd = LOCK_CMD.replace("NAME", name);
				break;
			case CommandType.UNLOCK:
				cmd = UNLOCK_CMD.replace("NAME", name);
				break;
			case CommandType.SETTIME:
				cmd = SET_TIME_CMD.replace("NAME", name).replace("STATUS", status).replace("SETS", sets);
				break;
			default:
		}
		return cmd;
	}
	
	public static void main(String[] args) {
		System.out.println(CommandUtil.getCommand(CommandType.OFFON, "00000888", "11110000",null));
		System.out.println(CommandUtil.getSetTimeCmd("00000888", "1","08,18,30,05,11110000"));
	}
}
