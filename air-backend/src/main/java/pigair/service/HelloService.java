package pigair.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;
import pigair.entity.User;

@Slf4j
@Service
public class HelloService {

	@Autowired
	MongoTemplate mongoTemplate;
	
	@Autowired
	SequenceService sequenceService;
	
	@Autowired
	ObjectMapper objectMapper;

	public String hello() throws Exception {

		mongoTemplate.getCollection("users").drop(); // delete all

		int userNo = sequenceService.getNextUserNo();
				
		User user =	User.builder()
				.userNo(userNo)
				.userId("hello")
				.userPw("1111")
				.userNm("헬로우")
				.userEmail("hello@gmail.com")
				.userPhone("000-000-0000")
				.build();
		mongoTemplate.save(user);
		
		List<User> result = mongoTemplate.findAll(User.class);
		for(User o : result) {
			log.debug("{}, {}, {}", o.getUserNo(), o.getUserId(), o.getUserNm());
		}
		
		Criteria criteria = new Criteria("_id").is(userNo).and("userId").is("hello");
		Query query = new Query(criteria);
		User obj = mongoTemplate.findOne(query, User.class);
		
		log.debug("{}", query);
		log.debug("{}", obj);
		
		return objectMapper.writeValueAsString(result);
		
	}
}
