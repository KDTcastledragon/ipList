package com.iplist.ipboot.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iplist.ipboot.domain.ExtDevDTO;
import com.iplist.ipboot.mapper.ExtDevMapper;

import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
public class ExtDevServiceImpl implements ExtDevService {

	@Autowired
	ExtDevMapper extmapper;

	@Override
	public List<ExtDevDTO> allExtDevs() {
		List<ExtDevDTO> list = extmapper.allExtDevs();
		return list;
	}

	@Override
	public List<ExtDevDTO> searchWord(String enteredWord) {
		log.info("Service단의 검색어 확인 : " + enteredWord);
		List<ExtDevDTO> list = extmapper.searchWord(enteredWord);
		return list;
	}

	@Override
	public void addExtDev(Map<String, Object> data) {
		if (!data.containsKey("devId")) {
			log.info("관리번호가 없습니다. : " + data);
			throw new RuntimeException("관리번호(devId)가 필요합니다.");
		}

		extmapper.addExtDev(data);
	}

	@Override
	public void modifyExtDev(Map<String, Object> data) {
		if (!data.containsKey("devId")) {
			log.info("관리번호가 없습니다. : " + data);
			throw new RuntimeException("관리번호(devId)가 필요합니다.");
		}

		extmapper.modifyExtDev(data);
	}

	@Override
	public void modifyExtDev2(Map<String, Object> data) {
		if (!data.containsKey("devId")) {
			log.info("관리번호가 없습니다. : " + data);
			throw new RuntimeException("관리번호(devId)가 필요합니다.");
		}

		extmapper.modifyExtDev2(data); // MyBatis XML에 data Map 전달
	}

	@Override
	public List<ExtDevDTO> allLogs() {
		List<ExtDevDTO> list = extmapper.allLogs();
		return list;
	}

	//	@Override
	//	public void addExtDev(String devId, String devType, boolean registeredDlp, boolean controlledDlp, String empId, String empName, String deptId, String deptName, String cmdModel, String cmdSerialNum, String dlpModel, String dlpSerialNum, Integer capacity, String manufacturer, String usagePurpose, String location, String validDate, String notes) {
	//
	//		Map<String, Object> param = new HashMap<>();
	//
	//		param.put("devId", devId);
	//		param.put("devType", devType);
	//		param.put("registeredDlp", registeredDlp);
	//		param.put("controlledDlp", controlledDlp);
	//		param.put("empId", empId);
	//		param.put("empName", empName);
	//		param.put("deptId", deptId);
	//		param.put("deptName", deptName);
	//		param.put("cmdModel", cmdModel);
	//		param.put("cmdSerialNum", cmdSerialNum);
	//		param.put("dlpModel", dlpModel);
	//		param.put("dlpSerialNum", dlpSerialNum);
	//		param.put("capacity", capacity);
	//		param.put("manufacturer", manufacturer);
	//		param.put("usagePurpose", usagePurpose);
	//		param.put("location", location);
	//		param.put("validDate", validDate);
	//		param.put("notes", notes);
	//
	//		extmapper.addExtDev(param);
	//	}
}
