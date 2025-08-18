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
@AllArgsConstructor
@Log4j2
@RequestMapping("/emp")
public class EmpController {

	EmpService empservice;
	
	
	@GetMapping("/showEmpList") 
	public ResponseEntity<?> showEmpList() {
		try {
			log.info
			
			
		List<EmpDTO> list = empservice.showEmpList();
	
		return response
		}
	}
	
}
