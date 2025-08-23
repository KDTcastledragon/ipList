package com.iplist.ipboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iplist.ipboot.domain.AdministratorDTO;
import com.iplist.ipboot.mapper.AdministratorMapper;

import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
public class AdministratorServiceImpl implements AdministratorService {
	@Autowired
	AdministratorMapper admmapper;

	@Override
	public AdministratorDTO login(String adminId, String adminPw) {
		log.info("adminId & Pw : " + adminId + " & " + adminPw);
		AdministratorDTO admin = admmapper.selectById(adminId);
		log.info("admin정보 : " + admin);

		if (admin != null) {
			String pw = admin.getAdmin_pw();
			if (pw.equals(adminPw)) {
				return admin;
			} else {
				return null;
			}
		} else {
			return null;
		}

	}
}
