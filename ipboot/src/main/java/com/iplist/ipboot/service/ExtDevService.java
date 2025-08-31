package com.iplist.ipboot.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import com.iplist.ipboot.domain.ExtDevDTO;
import com.iplist.ipboot.domain.ExtDevLogHistDTO;

public interface ExtDevService {

	List<ExtDevDTO> allExtDevs();

	List<ExtDevDTO> searchWord(String enteredWord);

	void addExtDev(Map<String, Object> data);

	void modifyExtDev(Map<String, Object> data);

	void modifyExtDev2(Map<String, Object> data);

	List<ExtDevLogHistDTO> allLogs();

	List<ExtDevLogHistDTO> filteredLogs(LocalDate startDate, LocalDate endDate, String selectedOpt, String logWord);
}
