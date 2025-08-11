package com.iplist.ipboot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iplist.ipboot.domain.EmpDTO;
import com.iplist.ipboot.mapper.EmpMapper;

import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
public class EmpServiceImpl implements EmpService {

	@Autowired
	EmpMapper empmapper;

	@Override
	public List<EmpDTO> allEmp() {
		List<EmpDTO> list = empmapper.allEmp();
		return list;
	}
}
