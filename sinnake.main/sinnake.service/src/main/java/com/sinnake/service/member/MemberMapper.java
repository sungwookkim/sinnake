package com.sinnake.service.member;

import java.util.HashMap;
import java.util.Map;

public interface MemberMapper {
	// 회원정보 조회
	public HashMap<String, Object> getMember(String memberId) throws Exception;
	
	// 회원 상세 정보 조회
	public HashMap<String, Object> getMemberDetail(String memberId) throws Exception;
	
	// 회원 등록
	public void setMember(Map<String, Object> memberData) throws Exception;
	
	// 회원 로그인 시도 횟수 등록
	public void setMemberAttempts(Map<String, Object> memberData) throws Exception;
	
	// 회원 권한 등록
	public void setMemberRoles(Map<String, Object> memberData) throws Exception;
	
	// 회원 상세 정보 등록
	public void setMemberDetail(Map<String, Object> memberData) throws Exception;
	
	// 회원 정보 수정
	public int setMember_UP(Map<String, Object> memberData) throws Exception;
	
	// 회원 상세 정보 수정
	public int setMemberDetail_UP(Map<String, Object> memberData) throws Exception;	
}
