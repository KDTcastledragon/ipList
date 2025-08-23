package com.iplist.ipboot.service;

import com.iplist.ipboot.domain.AdministratorDTO;

public interface AdministratorService {

	AdministratorDTO login(String adminId, String adminPw);

}
