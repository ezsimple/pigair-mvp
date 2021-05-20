package pigair.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class LoginUtil {
	
	public User getUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication==null) {
			log.warn("{}", "authentication is null");
			return null;
		}

		Object user = authentication.getPrincipal();
		if(!(user instanceof User)) {
			log.warn("{}", "user is not User instance");
			return null;
		}

		// log.debug("{}", user);
		return (User) user;
	}

}
