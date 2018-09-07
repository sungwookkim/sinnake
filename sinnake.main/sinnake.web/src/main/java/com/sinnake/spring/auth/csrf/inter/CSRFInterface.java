package com.sinnake.spring.auth.csrf.inter;

import org.owasp.esapi.User;

public interface CSRFInterface {

	public String resetCSRFToken();	
	public String addCSRFToken(User user, String href);
	public String addCSRFToken(String href);
	public String getCSRFToken();
}
