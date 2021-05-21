package pigair.security;

import java.security.Principal;
import java.util.Collection;

import javax.validation.constraints.Size;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@Builder
@EqualsAndHashCode(of = "username")
@AllArgsConstructor
@NoArgsConstructor
public class Auth implements Principal, UserDetails {

	@Size(min = 4, max = 255, message = "Minimum 4 characters")
	private String username;

	@Size(min = 8, message = "Minimum 8 characters")
	private String password;

	@Size(min = 4, max = 255, message = "Minimum 4 characters")
	private String name;

	// Authorities
	Collection<? extends GrantedAuthority> roles;

	private final boolean isAccountNonExpired = true;
	private final boolean isAccountNonLocked = true;
	private final boolean isCredentialsNonExpired = true;
	private final boolean isEnabled = true;

	// Additional ... 은 사용자 정의(User extends Auth)에서 처리

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return this.roles;
	}

	@Override
	public String getPassword() {
		return this.password;
	}

	@Override
	public String getUsername() {
		return this.username;
	}

	@Override
	public boolean isAccountNonExpired() {
		return this.isAccountNonExpired;
	}

	@Override
	public boolean isAccountNonLocked() {
		return this.isAccountNonLocked;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return this.isCredentialsNonExpired;
	}

	@Override
	public boolean isEnabled() {
		return this.isEnabled;
	}

	@Override
	public String getName() {
		return this.name;
	}

}
