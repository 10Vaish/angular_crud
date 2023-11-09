package com.javaguides.springboot.service;


import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.javaguides.springboot.model.Login;
import com.javaguides.springboot.repository.LoginRepository;

@Service
public class LoginService {
	
	@Autowired
	private LoginRepository loginRepository;
	
	public Boolean validLogin(Login login) {
		Long id= (long)1;
		Optional<Login> storedLogin = loginRepository.findById(id);
				
		
		if (storedLogin.isPresent()) {
            if (storedLogin.get().getEmail().equals(login.getEmail()) && storedLogin.get().getPassword().equals(login.getPassword())) {
                return true; 
            }
        }

        return false;

	}
}
