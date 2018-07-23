package com.environment.mypuls.service;

 import com.environment.mypuls.entity.TEquipmentInfo2;
import com.baomidou.mybatisplus.service.IService;

import java.util.List;
import java.util.Map;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author niuchen
 * @since 2017-10-27
 */
public interface ITEquipmentInfo2Service extends IService<TEquipmentInfo2> {
    List<TEquipmentInfo2> getTEquipmentInfo(Map<String,Object> map) ;
    
    void updateTEquipmentInfo2(Map<String,Object> map);
    
    void updateTEquipmentInfo(Map<String,Object> map);
}
