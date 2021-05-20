package pigair.security;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service("UserDetailsService")
public class AuthUserDetailsServiceImpl extends UserAuthService implements UserDetailsService {

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException  {

		Auth auth = findByUsername(username);
		if (auth == null) {
			throw new UsernameNotFoundException("아이디를 찾을 수 없습니다");
		}
		
		return new User(auth.getUsername(), auth.getPassword(), auth.getAuthorities());
	}

}
