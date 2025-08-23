package com.iplist.ipboot.domain;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AdministratorDTO {
	private String admin_id;          // admin_id
	private String admin_pw;          // admin_pw
	private String admin_name;        // admin_name
	private String admin_code;        // admin_code
	private int authority;            // authority
	private LocalDateTime latest_logined; // latest_logined
}
