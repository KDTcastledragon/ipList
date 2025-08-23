package com.iplist.ipboot.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iplist.ipboot.domain.AdministratorDTO;
import com.iplist.ipboot.service.AdministratorService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/admin")
@Log4j2
@AllArgsConstructor
public class AdministratorController {
	AdministratorService admservice;

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody AdministratorDTO data) {
		log.info("loginData :" + data);
		String adminId = data.getAdmin_id();
		String adminPw = data.getAdmin_pw();

		AdministratorDTO admin = admservice.login(adminId, adminPw);

		if (admin != null) {
			return ResponseEntity.ok(admin);
		} else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("잘못된 관리자");
		}
	}

}
