package edu.cit.cinemabs;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
@EnableCaching
public class CinemabsApplication {

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.load();
        System.setProperty("DATABASE_URL", dotenv.get("DATABASE_URL"));
        System.setProperty("DB_USER", dotenv.get("DB_USER"));
        System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));
        System.setProperty("JWT_SECRET_KEY", dotenv.get("JWT_SECRET_KEY"));

		SpringApplication.run(CinemabsApplication.class, args);
		
			System.out.println("Run Success");
	}
}
