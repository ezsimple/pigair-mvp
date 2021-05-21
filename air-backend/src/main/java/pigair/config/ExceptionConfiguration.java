package pigair.config;

import org.springframework.web.bind.annotation.ControllerAdvice;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@ControllerAdvice
public class ExceptionConfiguration {
	
	// @ExceptionHandler(Exception.class)
    // protected ResponseEntity<String> handleException(Exception e) {
    //    return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    // }

	// @ExceptionHandler(UserSecurityException.class)
    // protected ResponseEntity<String> handleUserSecurityException(UserSecurityException e) {
    //    return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
    // }
	
//	@ExceptionHandler(NoHandlerFoundException.class)
//	protected ModelAndView handleError(HttpServletRequest request, Exception e) {
//        String statusCode = "404";
//        String errTitle = "존재하지 않는 페이지 입니다.";
//        String errMessage = e.getMessage();
//
//        ModelAndView mv = new ModelAndView();
//        mv.addObject("statusCode", statusCode);
//        mv.addObject("errTitle", errTitle);
//        mv.addObject("errMessage", errMessage);
//        mv.setViewName("error");
//
//        return mv;
//	}

//	@ExceptionHandler({Exception.class, UserSecurityException.class})
//    protected ModelAndView handleException(HttpServletRequest request, Exception e) {
//
//        String statusCode = "500";
//        String errTitle = "웁스! 서버 내부 오류";
//        String errMessage = e.getMessage();
//
//		if(e instanceof UserSecurityException) {
//			statusCode = "401";	
//			errTitle = "인증되지 않았습니다.";
//			errMessage = "(재)로그인 하십시오. <p><a href='/'>로그인 페이지 이동</a></p>";
//		}
//
//        ModelAndView mv = new ModelAndView();
//        mv.addObject("statusCode", statusCode);
//        mv.addObject("errTitle", errTitle);
//        mv.addObject("errMessage", errMessage);
//        mv.setViewName("index");
//
//        return mv;
//    }

}
