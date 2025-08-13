package com.iplist.ipboot.domain;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AssetDTO {
	private String asset_id;
	private String asset_type;
	private String grade;
	private String emp_id;
	private String emp_name;
	private String org_id;
	private String org_name;
	private String dept_id;
	private String dept_name;
	private String location;
	private LocalDate pur_date;
	private LocalDate exp_date;
	private String owns_type;
	private Integer cost;
	private String ipv4_octet1;
	private String ipv4_octet2;
	private String ipv4_octet3;
	private String ipv4_octet4;
	private String usage_type;
	private String model;
	private String serial_num;
	private LocalDate repl_date;
	private String notes;
}
