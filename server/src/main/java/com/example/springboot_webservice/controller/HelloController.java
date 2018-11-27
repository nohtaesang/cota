package com.example.springboot_webservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springboot_webservice.entity.HelloDao;
import com.example.springboot_webservice.service.HelloSvc;

@RestController
public class HelloController {
	
	@Autowired
	private HelloSvc helloSvc;
	
	@GetMapping("/")
	public String index() {
		return "hello world";
	}
	
	@GetMapping("/add")
	public HelloDao add(HelloDao hello) {
		HelloDao helloDao = helloSvc.save(hello);
		
		return helloDao;
	}
	
	@GetMapping("/list")
	public List<HelloDao> list(Model model){
		List<HelloDao> list = helloSvc.findAll();
		
		return list;
	}
	
	@GetMapping("/remove")
	public String delete(int id) {
		
		helloSvc.deleteById(id);
		return "delete success!";
	}
}
