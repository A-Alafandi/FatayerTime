package com.fatayertime.backend;

import com.fatayertime.backend.Model.AppUser;
import com.fatayertime.backend.Repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendApplication {


	@Bean
	public CommandLineRunner createAdmin(UserRepository userRepository) {
		return args -> {
			if (userRepository.findByUsername("admin").isEmpty()) {
				AppUser admin = new AppUser();
				admin.setUsername("admin");
				admin.setPassword("$2a$12$9.8oAZ/KDa3E4YSqn7ctou7ePsu4u1hnPK4IbrH.r3gxEGBQC8qki");
				admin.setRole("ADMIN");
				userRepository.save(admin);
				System.out.println("Admin user created.");
			} else {
				System.out.println("Admin user already exists.");
			}
		};
	}
	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);



	}

}
