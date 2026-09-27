package com.krejto.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class ServerApplication {

    static void main(String[] args) {
        SpringApplication.run(ServerApplication.class, args);
    }
}
