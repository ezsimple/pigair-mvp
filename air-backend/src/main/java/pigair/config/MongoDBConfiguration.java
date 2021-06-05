package pigair.config;

import java.io.IOException;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.convert.DefaultDbRefResolver;
import org.springframework.data.mongodb.core.convert.MappingMongoConverter;
import org.springframework.data.mongodb.core.convert.MongoCustomConversions;
import org.springframework.data.mongodb.core.mapping.MongoMappingContext;

import com.mongodb.client.MongoClient;

public class MongoDBConfiguration {

	@Autowired 
	private MongoDbFactory mongoDbFactory;

    @Autowired 
    private MongoMappingContext mongoMappingContext;
    
    public MongoCustomConversions customConversions() {
        List<Converter<?, ?>> converters = new ArrayList<>();
        // converters.add(DateToZonedDateTimeConverter.INSTANCE);
        // converters.add(ZonedDateTimeToDateConverter.INSTANCE);
        return new MongoCustomConversions(converters);
    }
    
    @Bean
    public MongoTemplate mongoTemplate() throws UnknownHostException {
        MappingMongoConverter converter = new MappingMongoConverter(new DefaultDbRefResolver(mongoDbFactory),
                new MongoMappingContext());
        // converter.setCustomConversions(customConversions());
        converter.afterPropertiesSet();
        return new MongoTemplate(mongoDbFactory, converter);
    }
    
//  @Value("${spring.data.mongodb.host}")
//  private String host;
//    
//  @Value("${spring.data.mongodb.port}")
//  private String port;
//    
//  @Bean
//  public MongoClient mongoClient() throws IOException {
//      return new MongoClient(host, Integer.parseInt(port));
//  }

}
