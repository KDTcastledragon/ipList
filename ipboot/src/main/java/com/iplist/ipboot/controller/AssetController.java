package com.iplist.ipboot.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.iplist.ipboot.domain.AssetDTO;
import com.iplist.ipboot.domain.EmpDTO;
import com.iplist.ipboot.service.AssetService;
import com.iplist.ipboot.service.EmpService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("asset")
@Log4j2
@AllArgsConstructor
public class AssetController {

	AssetService assetservice;
	EmpService empservice;

	@GetMapping("/allAssets")
	public ResponseEntity<?> allAssets() {
		try {
			log.info("allAssets");
			List<AssetDTO> allAssetsList = assetservice.allAssets();
			log.info("allAssetsList 확인 : " + allAssetsList);
			return ResponseEntity.ok(allAssetsList);
		} catch (Exception e) {
			throw e;
		}
	}

	@GetMapping("/searchWord")
	public ResponseEntity<?> searchWord(@RequestParam(value = "searchWord", required = false) String searchWord) {
		log.info("");
		log.info("유저ID검색 : {}", searchWord);

		List<AssetDTO> searchedList = null;

		if (searchWord == null) {
			searchedList = assetservice.allAssets();
		} else {
			searchedList = assetservice.searchWord(searchWord);
		}

		log.info("");

		return ResponseEntity.ok().body(searchedList);
	}

	//	@PostMapping("/typeAsset")
	//	public ResponseEntity<?> typeAsset(@RequestBody Map<String, Object> requestData) {
	//		log.info("typeAsset: " + requestData);
	//
	//		String type = (String) requestData.get("type");
	//
	//		try {
	//			log.info("typeAsset");
	//			List<AssetDTO> List = assetservice.typeAsset(type);
	//			log.info("typeAsset 확인 : " + List);
	//			return ResponseEntity.ok(List);
	//		} catch (Exception e) {
	//			throw e;
	//		}
	//	}

	@PostMapping("/modifyAsset")
	public ResponseEntity<?> modifyAsset(@RequestBody Map<String, Object> requestData) {
		try {
			log.info("modifyAsset");
			List<AssetDTO> List = assetservice.modifyAsset();
			log.info("modifyAsset 확인 : " + List);
			return ResponseEntity.ok(List);
		} catch (Exception e) {
			throw e;
		}
	}

	@PostMapping("/addAsset")
	public ResponseEntity<?> addAsset(@RequestBody Map<String, Object> requestData) {
		try {
			log.info("addAsset");
			String assetId = (String) requestData.get("assetId");
			String assetType = (String) requestData.get("assetType");
			String ownsType = (String) requestData.get("ownsType");
			String empId = (String) requestData.get("empId");
			String empName = (String) requestData.get("empName");
			String orgName = (String) requestData.get("orgName");
			String deptName = (String) requestData.get("deptName");
			String location = (String) requestData.get("location");
			String usageType = (String) requestData.get("usageType");
			String model = (String) requestData.get("model");
			String serialNum = (String) requestData.get("serialNum");
			Integer cost = requestData.get("cost") != null ? Integer.parseInt(requestData.get("cost").toString()) : null;
			String ipv4Octet1 = (String) requestData.get("ipv4Octet1");
			String ipv4Octet2 = (String) requestData.get("ipv4Octet2");
			String ipv4Octet3 = (String) requestData.get("ipv4Octet3");
			String ipv4Octet4 = (String) requestData.get("ipv4Octet4");
			String notes = (String) requestData.get("notes");

			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
			LocalDate purDate = requestData.get("purDate") != null ? LocalDate.parse((String) requestData.get("purDate"), formatter) : null;
			LocalDate expDate = requestData.get("expDate") != null ? LocalDate.parse((String) requestData.get("expDate"), formatter) : null;

			assetservice.addAsset(assetId, assetType, ownsType, empId, empName, orgName, deptName, location, usageType, purDate, expDate, model, serialNum, cost, ipv4Octet1, ipv4Octet2, ipv4Octet3, ipv4Octet4, notes);
			log.info("addAsset 확인");
			return ResponseEntity.ok("ok");
		} catch (Exception e) {
			throw e;
		}
	}

	@GetMapping("/allEmp")
	public ResponseEntity<?> allEmp() {
		try {
			log.info("allEmp");
			List<EmpDTO> allEmpList = empservice.allEmp();
			log.info("모든 직원 목록 확인 : " + allEmpList);

			return ResponseEntity.ok(allEmpList);

		} catch (Exception e) {
			throw e;
		}
	}
}
