package com.marcolenzo.gameboard.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Main Controller.
 * @author Marco Lenzo <lenzo.marco@gmail.com>
 *
 */
@Controller
public class WebController {

	@RequestMapping(value = "login")
	public String login() {
		return "login";
	}

	@RequestMapping(value = "signup")
	public String signup() {
		return "signup";
	}

	@RequestMapping(value = "index")
	public String dashboard() {
		return "index";
	}

}
