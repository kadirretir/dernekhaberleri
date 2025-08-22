package com.dernek;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@RestController
@SpringBootApplication
public class Main implements WebMvcConfigurer {

    @RequestMapping("/")
    String home() {
        return "Hello World!";
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins("http://localhost:5173") 
            .allowedMethods("GET", "POST", "PUT", "DELETE");
    }

    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }
}