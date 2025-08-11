package com.iplist.ipboot.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iplist.ipboot.domain.EmpDTO;
import com.iplist.ipboot.service.EmpService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/test")
@Log4j2
@AllArgsConstructor
public class OaController {

	EmpService empservice;

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
