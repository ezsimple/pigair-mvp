package pigair.service;

import java.util.List;

import org.bson.Document;
import org.bson.conversions.Bson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.ScriptOperations;
import org.springframework.data.mongodb.core.query.BasicQuery;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.script.ExecutableMongoScript;
import org.springframework.data.mongodb.core.script.NamedMongoScript;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.BasicDBList;
import com.mongodb.BasicDBObject;
import com.mongodb.ReadPreference;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoIterable;
import com.mongodb.client.MongoCollection;

// import com.mongodb.BasicDBList;
// import com.mongodb.BasicDBObject;

import lombok.extern.slf4j.Slf4j;
import pigair.entity.User;

@Slf4j
@Service
public class HelloService {

	@Autowired
	MongoTemplate mongoTemplate;
	
	@Autowired
	MongoClient mongoClient;
	
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
		
		// MongoIterable<String> collections = mongoClient.getDatabase("airDB").listCollectionNames();

		MongoDatabase mdb = mongoClient.getDatabase("airDB");
		MongoCollection<Document> collection = mdb.getCollection("users");
		
		// MongoIterable<String> collections = mdb.listCollectionNames();
		// Document stats = mdb.runCommand(new Document("dbstats", 1));
		
	    // StringBuilder text = new StringBuilder();
	    // BufferedReader br = new BufferedReader(new FileReader(new File("/path/file.js")));
	    // try {
	    //    while (true) {
	    //        String line = br.readLine();
	    //        if (line == null)
	    //            break;
	    //        text.append(line).append("\n");
	    //    }
	    // } finally {
	    //     try { br.close(); } catch (Exception ignore) {}
	    // }
	    // BasicDBObject obj = new BasicDBObject();
	    // obj.append("$eval", text.toString());
	    // System.out.println(mongoTemplate.executeCommand(obj));
		
		// String jsonSql="{distinct:'"+tableName+"', key:'"+columnName+"'}";
		// Document rows = mongoTemplate.executeCommand(jsonSql);

		// ReadPreference resultClass = null;
		// Bson command = null;
		// Document out = db.runCommand(command, resultClass);
		
		BasicQuery q = new BasicQuery("{userId: 'hello', userNm: '헬로우'}");
		List<User> rows = mongoTemplate.find(q, User.class);
		User row = mongoTemplate.findOne(q, User.class);
		
		BasicDBList andList = new BasicDBList();
		andList.add(new BasicDBObject("by", "tutorials point"));
		andList.add(new BasicDBObject("title", "MongoDB Overview")); 
		BasicDBObject and = new BasicDBObject("$and", andList);
		BasicDBObject command = new BasicDBObject("find", "collectionName");
		command.append("filter", and); 
		
		log.debug("{}", command.toString());
		// mongoTemplate.executeCommand(command.toString());
		
		return objectMapper.writeValueAsString(row);
		
	}
}
