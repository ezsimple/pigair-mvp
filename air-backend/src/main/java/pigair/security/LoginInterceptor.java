package pigair.security;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.joda.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import io.mkeasy.utils.NetUtil;
import lombok.extern.slf4j.Slf4j;
import pigair.utils.PropertiesUtil;


@Slf4j
public class LoginInterceptor extends HandlerInterceptorAdapter
{	
	SimpleDateFormat dateFormater = new SimpleDateFormat("yyyy-MM-dd");

	@Autowired
	LoginUtil loginUtil;
	
	@Autowired
	PropertiesUtil propertiesUtil;

	@Autowired
	private Environment env;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception  {

		response.setHeader("Cache-Control", "no-store");
		response.setHeader("Pragma", "no-cache");
		response.setHeader("X-Frame-Option", "DENY");
		
		// -- WebSecurityConfiguration 참조
		String path = request.getServletPath();
		HttpServletRequest req = ((HttpServletRequest) request);
		HttpSession session = req.getSession(false);
		if(session==null) 
			throw new UserSecurityException(path , HttpStatus.UNAUTHORIZED); // 401

		setCustomInfoToSession(session);

		if(!isIpAllowed())
		 	return false;
		
		User user = loginUtil.getUser();
		if(user == null)
			throw new UserSecurityException(path , HttpStatus.UNAUTHORIZED); // 401
		
		return true;
	}

	// 요청시마다 세션에 담아야하는 사용자 정의 정보들
	private void setCustomInfoToSession(HttpSession session) {
		if(session == null) return;

		long _ms = System.currentTimeMillis();
		LocalDateTime _now = LocalDateTime.now();
		String _adminlte = propertiesUtil.getProperty("adminlte");
		String _key = propertiesUtil.getProperty("download.key");

		session.setAttribute("_adminlte", _adminlte);
		session.setAttribute("_key", _key);
		session.setAttribute("_dateFormat", "yyyy-MM-dd");
		session.setAttribute("_now", _now.toDate());
		session.setAttribute("_date", dateFormater.format(new Date()));
		session.setAttribute("_year", _now.getYear());
		session.setAttribute("_ms", _ms);
	}

	private String getProfile() throws Exception {
		String[] profiles = env.getActiveProfiles();
		if(profiles.length == 0)
			throw new Exception("사용자 프로파일 설정을 하지 않았습니다.");
		return profiles[0];
	}

	// 허용 IP만 접근 가능
	private boolean isIpAllowed() throws Exception {
		String clientIp = NetUtil.getClientIP();
		String env = getProfile();

		if (StringUtils.equals(env, "local"))
			return true;

		// ezfarm 사무실에서만 접근 가능
		if (!(StringUtils.equals(clientIp, "127.0.0.1")
				|| StringUtils.equals(clientIp, "192.168.4"))) {
			log.warn("clientIp : {} is rejected", clientIp);
			return false;
		}

		return true;
	}

}
