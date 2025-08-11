package com.iplist.ipboot.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.iplist.ipboot.domain.EmpDTO;

@Mapper
public interface EmpMapper {
	List<EmpDTO> allEmp();
}
