package com.iplist.ipboot.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iplist.ipboot.domain.AssetDTO;
import com.iplist.ipboot.mapper.AssetMapper;

import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
public class AssetServiceImpl implements AssetService {

	@Autowired
	AssetMapper assetmapper;

	@Override
	public List<AssetDTO> allAssets() {
		List<AssetDTO> list = assetmapper.allAssets();
		return list;
	}

	@Override
	public List<AssetDTO> typeAsset() {
		List<AssetDTO> list = assetmapper.allAssets();
		return list;
	}

	@Override
	public List<AssetDTO> modifyAsset() {
		return null;
	}

	@Override
	public List<AssetDTO> addAsset(String assetId, String assetType, String ownsType, String empId, String empName, String orgName, String deptName, String location, String usageType, LocalDate purDate, LocalDate expDate, String model, String serialNum, Integer cost, String ipv4Octet1, String ipv4Octet2, String ipv4Octet3, String ipv4Octet4, String notes) {
		return null;
	}

	@Override
	public List<AssetDTO> searchWord(String word) {
		return assetmapper.searchWord(word);

	}

}
