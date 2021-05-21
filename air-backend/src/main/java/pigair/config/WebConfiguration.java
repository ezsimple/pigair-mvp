package pigair.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import io.mkeasy.resolver.CommandMapArgumentResolver;
import lombok.extern.slf4j.Slf4j;
import pigair.security.LoginInterceptor;

@Slf4j
// @EnableWebMvc
@Configuration
@SuppressWarnings("deprecation")
public class WebConfiguration extends WebMvcConfigurerAdapter {
	
    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
        argumentResolvers.add(new CommandMapArgumentResolver());
    }

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry
            .addResourceHandler("/webjars/**")
			.addResourceLocations("classpath:/META-INF/resources/webjars/");
	}
	
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry
                .addMapping("/api/**")
                .allowedOrigins("http://localhost:7000")
        ;
    }
	
	@Bean
	LoginInterceptor loginInterceptor() {
		return new LoginInterceptor();
	}

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(loginInterceptor())
		.addPathPatterns("/**")
		.excludePathPatterns("/"
							,"/static/**"
							,"/webjars/**"
							,"/login"
							,"/logout"
							,"/error"
							,"/hello"
							// -- for React frontend ----------
							,"/index.html"
							,"/favicon.ico"
							,"/service-worker.js"
							,"/precache-manifest.*"
							)
							;
	}

//  @Value("${upload.dir}")
//	private String UPLOAD_DIR;

//	@Bean
//	public FileFactory fileFactory() {
//		FileFactory bean = new FileFactory();
//		// bean.setUploadDir(UPLOAD_DIR);
//		return bean;
//	}

//	@Bean
//	public ExcelFactory excelFactory() {
//		return new ExcelFactory();
//	}

	@Value("${spring.data.mongodb.host}")
    String host;

	@Value("${spring.data.mongodb.port}")
	int port;

	@Value("${spring.data.mongodb.database}")
	String dataBase;

}
