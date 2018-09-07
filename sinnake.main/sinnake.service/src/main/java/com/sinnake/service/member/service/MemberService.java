package com.sinnake.service.member.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.sinnake.service.member.MemberMapper;

@Service(value = "memberService")
public class MemberService {
	@Autowired MemberMapper memberMapper;

	// 회원정보 조회
	public HashMap<String, Object> getMember(String memberId) throws Exception {
		return memberMapper.getMember(memberId);
	}

	// 회원 상세 정보 조회
	public HashMap<String, Object> getMemberDetail(String memberId) throws Exception {
		return memberMapper.getMemberDetail(memberId);
	}

	// 회원 가입
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
	public void setMemberRegist(Map<String, Object> memberData) throws Exception {
		memberMapper.setMember(memberData);
		memberMapper.setMemberAttempts(memberData);
		memberMapper.setMemberRoles(memberData);
		memberMapper.setMemberDetail(memberData);
	}
	
	// 회원 정보 수정
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
	public void setMemberRegistUpdate(Map<String, Object> memberData) throws Exception {
		memberMapper.setMember_UP(memberData);
		memberMapper.setMemberDetail_UP(memberData);
	}
}
