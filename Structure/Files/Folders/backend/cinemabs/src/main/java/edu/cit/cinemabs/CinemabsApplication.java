package edu.cit.cinemabs;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
@EnableCaching
public class CinemabsApplication {

	public static void main(String[] args) {
		// Only load dotenv if running locally
		if (isRunningLocally()) {
			Dotenv dotenv = Dotenv.configure()
					.ignoreIfMissing()
					.load();
			dotenv.entries().forEach(entry -> {
				System.setProperty(entry.getKey(), entry.getValue());
			});
		}

		SpringApplication.run(CinemabsApplication.class, args);
		System.out.println("Run Success");
	}

	private static boolean isRunningLocally() {
		// You can detect local by checking an environment variable that exists only in Render
		return System.getenv("RENDER") == null;
	}
}
