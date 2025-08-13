package com.iplist.ipboot.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

import com.iplist.ipboot.domain.AssetDTO;

@Mapper
public interface AssetMapper {

	List<AssetDTO> allAssets();

	@Insert("""
			    INSERT INTO assets
			    (asset_id, asset_type, owns_type, emp_id, emp_name, org_name, dept_name, location, usage_type,
			     pur_date, exp_date, model, serial_num, cost, ipv4_octet1, ipv4_octet2, ipv4_octet3, ipv4_octet4, notes)
			    VALUES
			    (#{assetId}, #{assetType}, #{ownsType}, #{empId}, #{empName}, #{orgName}, #{deptName}, #{location}, #{usageType},
			     #{purDate}, #{expDate}, #{model}, #{serialNum}, #{cost}, #{ipv4Octet1}, #{ipv4Octet2}, #{ipv4Octet3}, #{ipv4Octet4}, #{notes})
			""")
	void insertAsset(AssetDTO asset);

	List<AssetDTO> searchWord(String word);

}
