package com.iplist.ipboot.domain;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ExtDevLogHistDTO {
	private Long log_id;
	private String log_type;

	private String dev_id;
	private String dev_type;
	private String registered_dlp;
	private String controlled_dlp;
	private String dev_status;
	private String emp_id;
	private String emp_name;
	private String dept_id;
	private String dept_name;
	private String location;
	private String valid_date;     // date → LocalDate
	private String usage_purpose;
	private String cmd_model;
	private String cmd_serial_num;
	private String dlp_model;
	private String dlp_serial_num;
	private String capacity;
	private String manufacturer;
	private String notes;

	private String admin_id;
	private String admin_name;
	private LocalDateTime log_timestamp;

}