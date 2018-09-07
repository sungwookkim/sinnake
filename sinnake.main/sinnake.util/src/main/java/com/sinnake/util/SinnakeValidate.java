package com.sinnake.util;

import java.util.regex.Pattern;

public class SinnakeValidate {

	private boolean validateFlag = true;
	private String chkValid = "";
	
	public SinnakeValidate(String chkValid) {
		this.chkValid = chkValid;
	}
	
	/*
	 * 필수 값 검증.
	 */
	public SinnakeValidate required() {
		if(this.isValidFlag()
			&& this.chkValid != null 
			&& !"".equals(this.chkValid)
			&& this.chkValid.length() > 0) {

			this.validateFlag = true;
		} else {
			this.validateFlag = false;
		}

		return this;
	}
	
	
	/*
	 * 필수 값 검증(체크박스).
	 */
	public SinnakeValidate checkBoxRequired() {
		if(this.required().getValidRes() && "on".equals(this.chkValid)) {
			this.validateFlag = true;
		} else {
			this.validateFlag = false;
		}

		return this;
	}
	
	/*
	 * 최소 길이 검증.
	 */
	public SinnakeValidate minLen(int minLen) {
		if(this.isValidFlag()
			&& this.chkValid.length() >= minLen) {
			
			this.validateFlag = true;
		} else {
			this.validateFlag = false;
		}

		return this;
	}
	
	/*
	 * 최대 길이 검증.
	 */
	public SinnakeValidate maxLen(int maxLen) {
		if(this.isValidFlag()
			&& this.chkValid.length() <= maxLen) {
			
			this.validateFlag = true;
		} else {
			this.validateFlag = false;
		}

		return this;
	}
	
	/*
	 * 비밀번호 형식 검증.
	 */
	public SinnakeValidate pwdValid() {
		if(this.customFind("[\\@\\#\\$\\%\\^\\&\\*\\(\\)\\_\\+\\!]").getValidRes()
			&& this.customFind("[a-z]").getValidRes()
			&& this.customFind("[0-9]").getValidRes()) {
			this.validateFlag = true;			
		} else {
			this.validateFlag = false;
		}

		return this;
	}

	/*
	 * 아이디 형식 검증.
	 */
	public SinnakeValidate idValid() {
		if(this.customFind("^[A-Za-z]{1}[A-Za-z0-9]{4,15}$").getValidRes()) {
			this.validateFlag = true;			
		} else {
			this.validateFlag = false;
		}

		return this;
	}
	
	/*
	 * 공백 존재 여부 검증.
	 */
	public SinnakeValidate blankValid() {
		if(this.isValidFlag()
			&& !Pattern.compile("[\\s]").matcher(this.chkValid).find()) {
			this.validateFlag = true;			
		} else {
			this.validateFlag = false;
		}

		return this;
	}
	
	/*
	 * 동일 값 검증.
	 */
	public SinnakeValidate equalTo(String chkVal) {
		if(this.isValidFlag()
			&& (this.chkValid.equals(chkVal))) {
			this.validateFlag = true;
		} else {
			this.validateFlag = false;
		}
		return this;
	}
	
	/*
	 * 숫자 검증.
	 */
	public SinnakeValidate number() {
		if(this.custom("[0-9]+").getValidRes()) {
			this.validateFlag = true;
		} else {
			this.validateFlag = false;
		}
		
		return this;
	}
	
	/*
	 * 사용자 임의 검증(정규식 문자열을 매개변수로 해야 함.)
	 */
	public SinnakeValidate custom(String regex) {
		if(this.isValidFlag() && this.chkValid.matches(regex)) {
			this.validateFlag = true;
		} else {
			this.validateFlag = false;
		}
		
		return this;
	}

	/*
	 * 사용자 임의 검증 - find메소드 사용(정규식 문자열을 매개변수로 해야 함.)
	 */
	public SinnakeValidate customFind(String regex) {
		if(this.isValidFlag() && Pattern.compile(regex).matcher(this.chkValid).find()) {
			this.validateFlag = true;
		} else {
			this.validateFlag = false;
		}
		
		return this;
	}
	
	/*
	 * 최종 검증 반환.
	 */
	public boolean getValidRes() {
		return this.validateFlag;
	}
	
	private boolean isValidFlag() {		
		if(this.validateFlag) {
			return true;
		}

		return false;
	}
}
