package com.sinnake.entity.security;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.SortedSet;
import java.util.TreeSet;

import org.springframework.security.core.CredentialsContainer;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.SpringSecurityCoreVersion;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.Assert;

/*
 * 계정 정보 엔티티 클래스.
 */
public class SinnakeUser implements UserDetails, CredentialsContainer {

	private static final long serialVersionUID = SpringSecurityCoreVersion.SERIAL_VERSION_UID;

	private String password;
	private final String username;
	private final Set<GrantedAuthority> authorities;
	private final boolean accountNonExpired;
	private final boolean accountNonLocked;
	private final boolean credentialsNonExpired;
	private final boolean enabled;	
	private int attempts;
	private Date lastModified;

	public SinnakeUser(String username, String password, boolean enabled,
			boolean accountNonExpired, boolean credentialsNonExpired,
			boolean accountNonLocked, int attempts,
			Date lastModified, Collection<? extends GrantedAuthority> authorities) {

		if (((username == null) || "".equals(username)) || (password == null)) {
			throw new IllegalArgumentException(
					"Cannot pass null or empty values to constructor");
		}

		this.username = username;
		this.password = password;
		this.enabled = enabled;
		this.accountNonExpired = accountNonExpired;
		this.credentialsNonExpired = credentialsNonExpired;
		this.accountNonLocked = accountNonLocked;
		this.attempts = attempts;
		this.lastModified = lastModified;
		this.authorities = Collections.unmodifiableSet(sortAuthorities(authorities));
	}

	public Collection<GrantedAuthority> getAuthorities() {
		return authorities;
	}

	public int getAttempts() {
		return attempts;
	}
	
	public Date getLastModified() {
		return lastModified;
	}
	
	public String getPassword() {
		return password;
	}

	public String getUsername() {
		return username;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public boolean isAccountNonExpired() {
		return accountNonExpired;
	}

	public boolean isAccountNonLocked() {
		return accountNonLocked;
	}

	public boolean isCredentialsNonExpired() {
		return credentialsNonExpired;
	}

	public void eraseCredentials() {
		password = null;
	}

	private static SortedSet<GrantedAuthority> sortAuthorities(
			Collection<? extends GrantedAuthority> authorities) {
		Assert.notNull(authorities, "Cannot pass a null GrantedAuthority collection");

		SortedSet<GrantedAuthority> sortedAuthorities = new TreeSet<GrantedAuthority>(
				new AuthorityComparator());

		for (GrantedAuthority grantedAuthority : authorities) {
			Assert.notNull(grantedAuthority,
					"GrantedAuthority list cannot contain any null elements");
			sortedAuthorities.add(grantedAuthority);
		}

		return sortedAuthorities;
	}

	private static class AuthorityComparator implements Comparator<GrantedAuthority>,
			Serializable {
		private static final long serialVersionUID = SpringSecurityCoreVersion.SERIAL_VERSION_UID;

		public int compare(GrantedAuthority g1, GrantedAuthority g2) {
			if (g2.getAuthority() == null) {
				return -1;
			}

			if (g1.getAuthority() == null) {
				return 1;
			}

			return g1.getAuthority().compareTo(g2.getAuthority());
		}
	}

	@Override
	public boolean equals(Object rhs) {
		if (rhs instanceof User) {
			return username.equals(((SinnakeUser) rhs).username);
		}
		return false;
	}

	@Override
	public int hashCode() {
		return username.hashCode();
	}

	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder();
		sb.append(super.toString()).append(": ");
		sb.append("Username: ").append(this.username).append("; ");
		sb.append("Password: [PROTECTED]; ");
		sb.append("Enabled: ").append(this.enabled).append("; ");
		sb.append("AccountNonExpired: ").append(this.accountNonExpired).append("; ");
		sb.append("credentialsNonExpired: ").append(this.credentialsNonExpired).append("; ");
		sb.append("attempts: ").append(this.attempts).append("; ");
		sb.append("lastModified: ").append(this.lastModified).append("; ");
		sb.append("AccountNonLocked: ").append(this.accountNonLocked).append("; ");

		if (!authorities.isEmpty()) {
			sb.append("Granted Authorities: ");

			boolean first = true;
			for (GrantedAuthority auth : authorities) {
				if (!first) {
					sb.append(",");
				}
				first = false;

				sb.append(auth);
			}
		}
		else {
			sb.append("Not granted any authorities");
		}

		return sb.toString();
	}

	public static UserBuilder withUsername(String username) {
		return new UserBuilder().username(username);
	}

	public static class UserBuilder {
		private String username;
		private String password;
		private List<GrantedAuthority> authorities;
		private boolean accountExpired;
		private boolean accountLocked;
		private boolean credentialsExpired;
		private boolean disabled;
		private int attempts;
		private Date lastModified;
		
		private UserBuilder() { }

		private UserBuilder username(String username) {
			Assert.notNull(username, "username cannot be null");
			this.username = username;
			return this;
		}

		public UserBuilder password(String password) {
			Assert.notNull(password, "password cannot be null");
			this.password = password;
			return this;
		}

		public UserBuilder roles(String... roles) {
			List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>(
					roles.length);
			for (String role : roles) {
				Assert.isTrue(!role.startsWith("ROLE_"), role
						+ " cannot start with ROLE_ (it is automatically added)");
				authorities.add(new SimpleGrantedAuthority("ROLE_" + role));
			}
			return authorities(authorities);
		}

		public UserBuilder authorities(GrantedAuthority... authorities) {
			return authorities(Arrays.asList(authorities));
		}

		public UserBuilder authorities(List<? extends GrantedAuthority> authorities) {
			this.authorities = new ArrayList<GrantedAuthority>(authorities);
			return this;
		}

		public UserBuilder authorities(String... authorities) {
			return authorities(AuthorityUtils.createAuthorityList(authorities));
		}

		public UserBuilder accountExpired(boolean accountExpired) {
			this.accountExpired = accountExpired;
			return this;
		}

		public UserBuilder accountLocked(boolean accountLocked) {
			this.accountLocked = accountLocked;
			return this;
		}

		public UserBuilder credentialsExpired(boolean credentialsExpired) {
			this.credentialsExpired = credentialsExpired;
			return this;
		}

		public UserBuilder disabled(boolean disabled) {
			this.disabled = disabled;
			return this;
		}

		public UserBuilder attempts(int attempts) {
			this.attempts = attempts;
			return this;
		}
		
		public UserBuilder lastModified(Date lastModified) {
			this.lastModified = lastModified;
			return this;
		}
		
		public UserDetails build() {
			return new SinnakeUser(username, password, !disabled, !accountExpired,
					!credentialsExpired, !accountLocked, attempts, lastModified, authorities);
		}
	}
}
