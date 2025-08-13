package com.iplist.ipboot.service;

import java.time.LocalDate;
import java.util.List;

import com.iplist.ipboot.domain.AssetDTO;

public interface AssetService {
	List<AssetDTO> allAssets();

	List<AssetDTO> typeAsset();

	List<AssetDTO> searchWord(String searchWord);

	List<AssetDTO> modifyAsset();

	List<AssetDTO> addAsset(String assetId, String assetType, String ownsType, String empId, String empName, String orgName, String deptName, String location, String usageType, LocalDate purDate, LocalDate expDate, String model, String serialNum, Integer cost, String ipv4Octet1, String ipv4Octet2, String ipv4Octet3, String ipv4Octet4, String notes);
}
