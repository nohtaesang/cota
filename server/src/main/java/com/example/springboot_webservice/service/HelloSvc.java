package com.example.springboot_webservice.service;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springboot_webservice.entity.HelloDao;

public interface HelloSvc extends JpaRepository<HelloDao, Integer> {

}
