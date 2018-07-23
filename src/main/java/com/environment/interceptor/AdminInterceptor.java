package com.environment.interceptor;

import com.environment.mypuls.entity.TUserInfo;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class AdminInterceptor implements HandlerInterceptor {

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
                             Object handler) throws Exception {
		Object obj = request.getSession().getAttribute("sys_user_key");
		if (obj == null || !(obj instanceof TUserInfo)) {
//			String uri = request.getRequestURI();
//			if(uri.contains("/server")){
//				return true;
//			}
			response.sendRedirect(request.getContextPath() + "/index.htm");
			return false;
        }
		return true;
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
                           ModelAndView modelAndView) throws Exception {
		
	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response,
                                Object handler, Exception ex) throws Exception {

	}
}