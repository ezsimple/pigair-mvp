package pigair.service;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class SequenceService {
	
	@Autowired
    private MongoOperations mongoOperation;
	
	private int getNextSequence(String seqName) {
		
		String seqNm = StringUtils.lowerCase(seqName);

		// collection명칭은 사용금지 합니다. document명만 사용합니다.
		// if(StringUtils.endsWith(seqNm, "s"))
		//	seqNm = StringUtils.removeEnd(seqNm, "s"); 

		Criteria criteria = Criteria.where("_id").is(seqNm); // 중요: _id를 String으로 지정
		Query query = new Query(criteria);
		
		Update update = new Update();
		update.inc("seq", 1); // +1증가
		
		FindAndModifyOptions option = new FindAndModifyOptions();
		option.returnNew(true); // 수정 이후의 도큐먼트를 반환
		option.upsert(true);
		
        // findAndModify => find, update, return
        // [sequence]콜렉션
		Sequence seq = mongoOperation.findAndModify(query, update, option, Sequence.class, "sequence");
		return seq.getSeq();
	}
	
	// 다음 사용자 번호
	public int getNextUserNo() {
		return this.getNextSequence("user");
	}

}
