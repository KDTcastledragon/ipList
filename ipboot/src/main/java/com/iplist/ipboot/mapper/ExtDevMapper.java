package com.iplist.ipboot.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.iplist.ipboot.domain.ExtDevDTO;

@Mapper
public interface ExtDevMapper {

	List<ExtDevDTO> allExtDevs();

	void addExtDev(Map<String, Object> param);

	List<ExtDevDTO> searchWord(String enteredWord);

}
