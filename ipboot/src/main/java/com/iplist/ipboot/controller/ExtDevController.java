package com.iplist.ipboot.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.iplist.ipboot.domain.ExtDevDTO;
import com.iplist.ipboot.service.AssetService;
import com.iplist.ipboot.service.EmpService;
import com.iplist.ipboot.service.ExtDevService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("extDev")
@Log4j2
@AllArgsConstructor
public class ExtDevController {

	AssetService assetservice;
	ExtDevService extservice;
	EmpService empservice;

	@GetMapping("/allExtDevs")
	public ResponseEntity<?> allExtDevs() {
		try {
			log.info("allExtDevs");
			List<ExtDevDTO> allExtDevslist = extservice.allExtDevs();
			log.info("allExtDevs 확인 : " + allExtDevslist);
			return ResponseEntity.ok(allExtDevslist);
		} catch (Exception e) {
			throw e;
		}
	}

	@GetMapping("/searchWord")
	public ResponseEntity<?> searchWord(@RequestParam(value = "word", required = false) String enteredWord) {
		log.info("검색어 확인 : " + enteredWord);
		List<ExtDevDTO> searchedList = extservice.searchWord(enteredWord);
		log.info("");

		return ResponseEntity.ok().body(searchedList);
	}

	@PostMapping("/addExtDev")
	public ResponseEntity<?> addExtDev(@RequestBody Map<String, Object> data) {
		try {
			log.info("addExtDev : " + data);
			String devId = (String) data.get("devId");
			String devType = (String) data.get("devType");
			boolean registeredDlp = Boolean.parseBoolean(data.get("registeredDlp").toString());
			boolean controlledDlp = Boolean.parseBoolean(data.get("controlledDlp").toString());
			String empId = (String) data.get("empId");
			String empName = (String) data.get("empName");
			String deptId = (String) data.get("deptId");
			String deptName = (String) data.get("deptName");
			String cmdModel = (String) data.get("cmdModel");
			String cmdSerialNum = (String) data.get("cmdSerialNum");
			String dlpModel = (String) data.get("dlpModel");
			String dlpSerialNum = (String) data.get("dlpSerialNum");

			Integer capacity = data.get("capacity") != null ? Integer.parseInt(data.get("capacity").toString()) : null;
			String manufacturer = (String) data.get("manufacturer");
			String usagePurpose = (String) data.get("usagePurpose");
			String location = (String) data.get("location");
			String validDate = (String) data.get("validDate");
			String notes = (String) data.get("notes");

			log.info("true/false ????????? " + registeredDlp + " / " + controlledDlp);

			extservice.addExtDev(devId, devType, registeredDlp, controlledDlp, empId, empName, deptId, deptName, cmdModel, cmdSerialNum, dlpModel, dlpSerialNum, capacity, manufacturer, usagePurpose, location, validDate, notes);
			return ResponseEntity.ok("ok");
		} catch (Exception e) {
			throw e;
		}
	}

	@PostMapping("/modifyExtDev")
	public ResponseEntity<?> modifyExtDev(@RequestBody Map<String, Object> data) {
		try {
			log.info("modifyExtDev : " + data);

			extservice.modifyExtDev(data);

			return ResponseEntity.ok("ok");
		} catch (Exception e) {
			throw e;
		}
	}

}
