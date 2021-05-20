package pigair.security;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.stereotype.Service;

import io.mkeasy.utils.MapUtil;
import io.mkeasy.utils.QueryMap;
import io.mkeasy.utils.RequestUtil;
import io.mkeasy.webapp.processor.QueryFactory;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserAuthService implements AuthRepository {

	@Autowired
	private JwtTokenProvider jwtTokenProvider;

	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private LoginUtil loginUtil;

	@Override
	public boolean existsByUsername(String username) throws Exception {
		String ns = "newgov.userMapper";
		String nsId = "selectTnUserInfo";

		QueryMap params = new QueryMap();
		params.put("username", username);
		params.put("useYn", "Y"); // 강제 주입
		Object result = QueryFactory.execute(ns, nsId, params);
		result = QueryFactory.getResult(ns, nsId, result);
		List rows = QueryFactory.toList(result);
		
		if(rows == null || rows.size() != 1)
			return false;

		return true;
	}

	@Override
	public Auth findByUsername(String username) throws UsernameNotFoundException {

		String ns = "newgov.userMapper";
		String nsId = "selectTnUserInfo";

		QueryMap params = new QueryMap();
		params.put("username", username);
		params.put("useYn", "Y"); // 강제 주입
		Object result;
		try {
			result = QueryFactory.execute(ns, nsId, params);
			result = QueryFactory.getResult(ns, nsId, result);
		} catch (Exception e) {
			// (주) UsernameNotFoundException 만 허용됩니다.
			throw new UsernameNotFoundException(e.getMessage());
		}

		List<Map<String, Object>> rows = QueryFactory.toList(result);
		if(rows == null || rows.size() != 1)
			return null;

		Map<String, Object> row = rows.get(0);

		// --------------------------------------------------------------
		// 사용자 정보(로그인 쿼리 결과)를 session에 저장
		// --------------------------------------------------------------
		HttpServletRequest request = RequestUtil.getHttpServletRequest();
		HttpSession session = request.getSession(false);
		
		Map<String, Object> user = MapUtil.newMap();
		user.putAll(row);
		UserInfo userInfo = new UserInfo(user);
		session.setAttribute(SessionUtil.SESSION_USER, userInfo);
		// --------------------------------------------------------------

		String role[] = StringUtils.split(String.valueOf(row.get("authorCode")), ",");
	    List<Role> roles = new ArrayList<Role>();
		for(int i = 0; i< role.length; i++) {
			Role r = Role.valueOf(role[i]);
			roles.add(i, r);
		}

		Auth auth = Auth.builder()
			.username(String.valueOf(row.get("id")))
			.password(String.valueOf(row.get("password")))
			.roles(roles)
			.name(String.valueOf(row.get("nm")))
			.isAccountNonExpired(true)
			.isAccountNonLocked(true)
			.isCredentialsNonExpired(true)
			.isEnabled(true)
			.build();

		return auth;
	}
	
	@Override
	public String signin(String username, String password) throws UserSecurityException {
		try {
			UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, password);
			Authentication authentication = authenticationManager.authenticate(authToken);
			SecurityContextHolder.getContext().setAuthentication(authentication);

			doCustomSetting(authToken);
			
	        // IMPORTANT: Do not pass any data in the response body
	        // show empty 200 page (suitable for REST clients)
			String jwtToken = jwtTokenProvider.createToken(username, findByUsername(username).getRoles());
			return jwtToken;

		} catch (AuthenticationException e) {
			log.error("{}", "인증오류");
			e.printStackTrace();
			throw new UserSecurityException("아이디/패스워드를 확인하세요.", HttpStatus.FORBIDDEN); // 403
		}
	}

	@Autowired
	SessionUtil sessionUtil;

	// 커스텀 사용자 정보 설정
	private void doCustomSetting(UsernamePasswordAuthenticationToken authToken) {
		SecurityContext securityContext = SecurityContextHolder.getContext();
		HttpServletRequest request = RequestUtil.getHttpServletRequest();
		HttpSession session = request.getSession(true);
		session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, securityContext);

//		User user = loginUtil.getUser();
//		// authToken.setDetails(user);

//		Collection<GrantedAuthority> authorities = user.getAuthorities();
//		for(GrantedAuthority auth : user.getAuthorities()) {
//			session.setAttribute("userRole", auth.toString());
//			session.setAttribute("userRoleNm", toRoleNm(auth));
//		}
//		session.setAttribute("userId", user.getUsername());
		
		session.setAttribute("userId", sessionUtil.getUserId());
		session.setAttribute("userRole", sessionUtil.getUserRole());
		session.setAttribute("userRoleNm", sessionUtil.getUserRoleNm());
	}

//	private String toRoleNm(GrantedAuthority auth) {
//		String roleNm = "꺼져라 잡것";
//		switch(auth.toString()) {
//		case "ROLE_ADMIN": roleNm = "관리자"; break;
//		case "ROLE_RESEARCH": roleNm = "연구자"; break;
//		case "ROLE_USER": roleNm = "사용자"; break;
//		}
//		return roleNm;
//	}

}
