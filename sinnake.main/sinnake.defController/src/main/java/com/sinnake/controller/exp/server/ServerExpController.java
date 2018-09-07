package com.sinnake.controller.exp.server;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.sinnake.biz.entity.ViewInfo;

@Controller
@RequestMapping(value = "/serverExp")
public class ServerExpController {

	@RequestMapping(value = "/{menu}", method = RequestMethod.GET)
	public String config(@PathVariable String menu, HttpServletRequest req, HttpServletResponse resp, Model model) {		
		String rtnURL = "controller/error/notFoundController";
		
		if("config".equals(menu)
			|| "devStruct".equals(menu)
			|| "bizLogic".equals(menu)) {

			rtnURL = "controller/serverExp/" + menu + "Controller";
		}

		model.addAttribute("jsController", rtnURL);
		
		return new ViewInfo().getViewName();
	}
	
}
