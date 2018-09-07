package com.sinnake.biz.entity;

import org.springframework.ui.Model;
import org.springframework.web.servlet.ModelAndView;

public class ViewInfo {

	private String viewName = "view";
	private Model model = null;
	private ModelAndView mv = null;

	/**********/
	/* Setter */
	/**********/		
	public void setViewName(String viewName) {
		this.viewName = viewName;
	}
	
	public void setModel(Model model) {
		this.model = model;
	}	

	public void setModelAndView(ModelAndView mv) {
		this.mv = mv;
	}
	
	/**********/
	/* Getter */
	/**********/
	public String getViewName() {
		return this.viewName;
	}

	public Model getModel() {
		return this.model;
	}

	public ModelAndView getModelAndView() {
		return this.mv;
	}
}
