package pigair.security;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Component;

import io.mkeasy.utils.RequestUtil;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class SessionUtil {

	final public static String SESSION_USER = "user";

	public UserInfo getUser() {
		HttpSession session = getSession();
		UserInfo userInfo = (UserInfo) session.getAttribute(SESSION_USER);
		return userInfo;
	}

	public void logout() {
		HttpSession session = getSession();
		session.invalidate();
	}

	public boolean isLogined() {
		UserInfo userInfo = getUser();
		return !(userInfo.isEmpty());
	}

	public String getUserId() {
		UserInfo userInfo = getUser();
		return String.valueOf(userInfo.get("id"));
	}

	public String getUserNm() {
		UserInfo userInfo = getUser();
		return String.valueOf(userInfo.get("nm"));
	}

	public String getUserRole() {
		UserInfo userInfo = getUser();
		return String.valueOf(userInfo.get("authorCode"));
	}

	public String getUserRoleNm() {
		UserInfo userInfo = getUser();
		String authorCode = String.valueOf(userInfo.get("authorCode"));

		if(StringUtils.equals(authorCode, Role.ROLE_ADMIN.getAuthority()))
			return "관리자";
		if(StringUtils.equals(authorCode, Role.ROLE_RESEARCH.getAuthority()))
			return "연구자";
		if(StringUtils.equals(authorCode, Role.ROLE_USER.getAuthority()))
			return "사용자";
		
		log.error("{}", authorCode);
		return "꺼져라! 잡것!";
	}

	public String getFarmNo() {
		return String.valueOf(getUser().get("farmNo"));
	}

	public String getFarmNm() {
		return String.valueOf(getUser().get("farmNm"));
	}

	public String getPhoneNo() {
		return String.valueOf(getUser().get("moblphonNo"));
	}

	private HttpSession getSession() {
		HttpServletRequest request = RequestUtil.getHttpServletRequest();
		return request.getSession(); // caution : prevent session is null
	}

}
