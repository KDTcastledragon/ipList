package com.iplist.ipboot.mapper;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.iplist.ipboot.domain.ExtDevDTO;
import com.iplist.ipboot.domain.ExtDevLogHistDTO;

@Mapper
public interface ExtDevMapper {

	List<ExtDevDTO> allExtDevs();

	void addExtDev(Map<String, Object> param);

	List<ExtDevDTO> searchWord(String enteredWord);

	void modifyExtDev(Map<String, Object> data);

	void modifyExtDev2(Map<String, Object> data);

	List<ExtDevLogHistDTO> allLogs();

	List<ExtDevDTO> searchExtDev(String word, String devType, String devStatus);

	List<ExtDevLogHistDTO> filteredLogs(LocalDate startDate, LocalDate endDate, String selectedOptType, String selectedOptStatus, String logWord);

}
