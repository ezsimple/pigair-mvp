package pigair.entity;

import java.io.Serializable;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@Document(collection="users")
public class User implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	int userNo;

	String userId;
	String userNm;
	String userEmail;
	String userPw;
	String userPhone;
}
