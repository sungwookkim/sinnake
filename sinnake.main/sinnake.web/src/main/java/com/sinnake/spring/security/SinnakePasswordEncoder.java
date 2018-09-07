package com.sinnake.spring.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.encoding.PasswordEncoder;

import com.sinnake.util.SinnakeAES256Util;

@SuppressWarnings("deprecation")
public class SinnakePasswordEncoder implements PasswordEncoder{

	@Value("#{serverProp['pwAes256.key']}") String pwKey;
	
	@Override
	public String encodePassword(String rawPass, Object salt) {
		SinnakeAES256Util aes256;
		try {
			aes256 = new SinnakeAES256Util(pwKey);

			return aes256.aesEncode(rawPass);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return rawPass;
	}

	@Override
	public boolean isPasswordValid(String encPass, String rawPass, Object salt) {
		if(encPass.equals(this.encodePassword(rawPass, salt))) {
			 return true;
		}

		return false;
	}

}
