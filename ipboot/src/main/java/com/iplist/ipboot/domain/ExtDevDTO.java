package com.iplist.ipboot.domain;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ExtDevDTO {
	private String dev_id;
	private String dev_type;
	private Boolean registered_dlp;
	private Boolean controlled_dlp;
	private String dev_status;
	private String emp_id;
	private String emp_name;
	private String dept_id;
	private String dept_name;
	private String location;
	private LocalDate valid_date;     // date → LocalDate
	private String usage_purpose;
	private String cmd_model;
	private String cmd_serial_num;
	private String dlp_model;
	private String dlp_serial_num;
	private Integer capacity;
	private String manufacturer;
	private String notes;
}
