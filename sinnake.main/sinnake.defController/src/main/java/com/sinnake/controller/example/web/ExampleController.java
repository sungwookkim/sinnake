package com.sinnake.controller.example.web;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.sinnake.biz.entity.ViewInfo;

@Controller
@RequestMapping(value="/example")
public class ExampleController {
	@RequestMapping(value = "/{pageName}", method = RequestMethod.GET)
	public String example(@PathVariable String pageName, HttpServletRequest req, Model model) throws Exception {
		model.addAttribute("jsController", "controller/example/"+ pageName +"Controller");
	
		return new ViewInfo().getViewName();
	}
}
