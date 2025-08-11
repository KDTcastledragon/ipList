package com.iplist.ipboot.domain;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class EmpDTO {
	private String emp_id;        // emp_id
	private String emp_name;      // emp_name
	private Date birth;          // birth
	private String phone_number;  // phone_number
	private String email;        // email
	private Integer salary;      // salary
	private Date hire_date;       // hire_date
	private Date resg_date;       // resg_date (퇴사일)

}
