package com.sinnake.controller.home.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sinnake.common.login.inter.LoginInterface;
import com.sinnake.service.home.service.HomeService;
import com.sinnake.util.SinnakeLocaleUtil;
import com.sinnake.util.SinnakeMsgSourceUtil;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	@Autowired LoginInterface loginImpl;
	@Autowired HomeService homeService;
	@Autowired MessageSource messageSource;
	@Autowired SinnakeLocaleUtil sinnakeLocaleUtil;
	@Autowired SinnakeMsgSourceUtil sinnakeMsgSourceUtil;
	@Value("#{globalProp['locale.propertie']}") String defaultLocale;
	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model, HttpServletRequest request, Authentication auth) {
/*		Locale sinnakeLocale = sinnakeLocaleUtil.getLocale(request);

		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, sinnakeLocale);

		logger.debug("home Start!!!!!!!!!!!");
		String formattedDate = dateFormat.format(date);
		
		UserInfo userInfo = loginImpl.getCurrentUser();
		model.addAttribute("serverTime", formattedDate );
		model.addAttribute("devUserName", messageSource.getMessage("dev.userName", null, sinnakeLocale));
		model.addAttribute("devPassword", messageSource.getMessage("dev.passwornd", null, sinnakeLocale));
		model.addAttribute("sinnakeLocaleUtil", sinnakeLocale.getLanguage());
		model.addAttribute("defaultLocale", defaultLocale);
		model.addAttribute("msgTest1", sinnakeMsgSourceUtil.getMsg("msg.test1", request));
		if(userInfo != null) {
			model.addAttribute("currentUser", userInfo.getUserName());	
		}
		
		return "home";*/
		
		model.addAttribute("jsController", "controller/home/homeController");

		return "view";
	}
	
	@RequestMapping(value = "/main", method = RequestMethod.GET)
	public String main(Locale locale, Model model, HttpServletRequest request, Authentication auth) {
		model.addAttribute("jsController", "controller/home/homeController");

		return "view";
	}
	
	@RequestMapping(value = "/firstMenu/menu1", method = RequestMethod.GET)
	@ResponseBody public String firstMenuMenu1() throws Exception {
		ArrayList<HashMap<String, Object>> lists = new ArrayList<HashMap<String,Object>>();
		HashMap<String, Object> list = null;
		
		list = new HashMap<String, Object>();
		list.put("memberId", "sinnake");
		list.put("subject", "여기는 어디?");
		list.put("date", "2017-12-14");
		lists.add(list);
		
		list = new HashMap<String, Object>();
		list.put("memberId", "sinnake1");
		list.put("subject", "여기는 어디?1");
		list.put("date", "2017-12-13");
		lists.add(list);
		
		list = new HashMap<String, Object>();
		list.put("memberId", "sinnake2");
		list.put("subject", "여기는 어디?2");
		list.put("date", "2017-12-12");
		lists.add(list);
		
		list = new HashMap<String, Object>();
		list.put("memberId", "sinnake3");
		list.put("subject", "여기는 어디?3");
		list.put("date", "2017-12-11");
		lists.add(list);
		
		list = new HashMap<String, Object>();
		list.put("memberId", "sinnake4");
		list.put("subject", "여기는 어디?4");
		list.put("date", "2017-12-10");
		lists.add(list);

		return new ObjectMapper().writeValueAsString(lists);
	}
	
	@RequestMapping(value = "/firstMenu/menu2", method = RequestMethod.GET)
	@ResponseBody public String firstMenuMenu2() throws Exception {
		ArrayList<HashMap<String, Object>> lists = new ArrayList<HashMap<String,Object>>();
		HashMap<String, Object> list = null;
		
		list = new HashMap<String, Object>();
		list.put("memberId", "sinnake11");
		list.put("subject", "여기는 어디?11");
		list.put("date", "2017-12-14");
		lists.add(list);
		
		list = new HashMap<String, Object>();
		list.put("memberId", "sinnake22");
		list.put("subject", "여기는 어디?22");
		list.put("date", "2017-12-13");
		lists.add(list);
		
		list = new HashMap<String, Object>();
		list.put("memberId", "sinnake33");
		list.put("subject", "여기는 어디?33");
		list.put("date", "2017-12-12");
		lists.add(list);
		
		list = new HashMap<String, Object>();
		list.put("memberId", "sinnake44");
		list.put("subject", "여기는 어디?44");
		list.put("date", "2017-12-11");
		lists.add(list);
		
		list = new HashMap<String, Object>();
		list.put("memberId", "sinnake55");
		list.put("subject", "여기는 어디?55");
		list.put("date", "2017-12-10");
		lists.add(list);

		return new ObjectMapper().writeValueAsString(lists);
	}
	
	@RequestMapping(value = "/tranTest", method = RequestMethod.GET)
	public void tranTest() throws Exception {
		homeService.setTotalCity("sungwkim", "1", "1", 1);
	}
}
