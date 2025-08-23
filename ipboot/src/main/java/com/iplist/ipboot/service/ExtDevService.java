package com.iplist.ipboot.service;

import java.util.List;
import java.util.Map;

import com.iplist.ipboot.domain.ExtDevDTO;

public interface ExtDevService {

	List<ExtDevDTO> allExtDevs();

	List<ExtDevDTO> searchWord(String enteredWord);

	void addExtDev(String devId, String devType, boolean registeredDlp, boolean controlledDlp, String empId, String empName, String deptId, String deptName, String cmdModel, String cmdSerialNum, String dlpModel, String dlpSerialNum, Integer capacity, String manufacturer, String usagePurpose, String location, String validDate, String notes);

	void modifyExtDev(Map<String, Object> data);

	void modifyExtDev2(Map<String, Object> data);

}
