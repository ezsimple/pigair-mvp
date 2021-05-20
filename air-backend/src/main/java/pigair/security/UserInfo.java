package pigair.security;

import java.io.Serializable;
import java.util.Collection;
import java.util.Map;
import java.util.Set;

public class UserInfo<K,V> implements Map, Serializable {

	Map<K, V> map = null;
	public UserInfo(Map<K, V> map){
		this.map = filterUserInfo(map);
	}

	private Map<K, V> filterUserInfo(Map<K, V> map) {
		// 패스워드 및 불필요 사용자 정보 제외. 
		String[] remList = {"password", "deleted", "blocked", "disabled"}; 
		for(String item: remList) {
            map.remove(item);
		}
		return map;
	}

	public V get(Object key) {
		if(map==null) return null;
		return map.get(key);
	}

	public int size() {
		if(map==null) return 0;
		return map.size();
	}

	public boolean isEmpty() {
		if(map==null) return true;
		return map.isEmpty();
	}

	public boolean containsKey(Object key) {
		if(map==null) return false;
		return map.containsKey(key);
	}

	public boolean containsValue(Object value) {
		if(map==null) return false;
		return map.containsValue(value);
	}

	public void clear() {
		map.clear();
	}

	public Set<K> keySet() {
		return map.keySet();
	}

	public Collection<V> values() {
		return map.values();
	}

	public Set<java.util.Map.Entry<K, V>> entrySet() {
		return map.entrySet();
	}

	public V remove(Object key) {
    	throw new RuntimeException("사용자 정보는 임의 삭제할 수 없습니다.");
	}

	@Override
	public Object put(Object key, Object value) {
    	throw new RuntimeException("사용자 정보는 임의 수정할 수 없습니다.");
	}

	@Override
	public void putAll(Map m) {
    	throw new RuntimeException("사용자 정보는 임의 수정할 수 없습니다.");
	}

}
