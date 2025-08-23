package com.iplist.ipboot.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.iplist.ipboot.domain.AdministratorDTO;

@Mapper
public interface AdministratorMapper {
	AdministratorDTO selectById(String adminId);

}
