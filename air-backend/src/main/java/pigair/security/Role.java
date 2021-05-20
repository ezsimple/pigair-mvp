package pigair.security;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {

  ROLE_ADMIN, 	// 관리자
  ROLE_RESEARCH,// 연구원
  ROLE_USER; 	// 사용자

  public String getAuthority() {
    return name();
  }

}
