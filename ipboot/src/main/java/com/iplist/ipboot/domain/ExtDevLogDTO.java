package com.iplist.ipboot.domain;

import java.time.LocalDateTime;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ExtDevLogDTO {
	private Long log_id;
	private String log_type;
	private String dev_id;
	private String dev_type;
	private Boolean registered_dlp;
	private Boolean controlled_dlp;
	private String emp_id;
	private String emp_name;
	private String dept_id;
	private String dept_name;
	private String cmd_model;
	private String cmd_serial_num;
	private String dlp_model;
	private String dlp_serial_num;
	private Integer capacity;
	private String manufacturer;
	private String usage_purpose;
	private String location;
	private Date valid_date;
	private String notes;
	private String status;
	private String admin_id;
	private String admin_name;
	private LocalDateTime log_timestamp;
}
