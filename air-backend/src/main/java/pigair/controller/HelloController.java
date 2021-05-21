package pigair.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.extern.slf4j.Slf4j;
import pigair.service.HelloService;

@Slf4j
@Controller
public class HelloController {
	
	@Autowired
	HelloService helloService;
	
	@ResponseBody
	@GetMapping(value = {"/hello"}, produces = MediaType.APPLICATION_JSON_VALUE)
	public Object hello() throws Exception {
		return helloService.hello();
	}

	@GetMapping(value = {"/", "/error"})
	public String index() throws Exception {
		return "index.html";
	}

}