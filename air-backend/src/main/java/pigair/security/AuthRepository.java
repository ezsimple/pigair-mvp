package pigair.security;

// ---------------------------------------------
// 스프링 시큐리티를 분리합니다. 
// 가장 기본적으로 제공되어야 하는 DAO 입니다.
// ---------------------------------------------
public interface AuthRepository {
	boolean existsByUsername(String username) throws Exception;
	Auth findByUsername(String username) throws Exception;
	public String signin(String username, String password) throws UserSecurityException; // UI login 용
}
