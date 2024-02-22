package br.com.neki.sistemaSkills.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.neki.sistemaSkills.configs.TokenService;
import br.com.neki.sistemaSkills.dtos.AutheticationDTO;
import br.com.neki.sistemaSkills.dtos.LoginResponseDTO;
import br.com.neki.sistemaSkills.dtos.RegisterDTO;
import br.com.neki.sistemaSkills.entities.Users;
import br.com.neki.sistemaSkills.entities.UsersRoles;
import br.com.neki.sistemaSkills.repositories.UsersRepository;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AutheticationController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UsersRepository repository;

	@Autowired
	private TokenService tokenService;

	@PostMapping("/login")
	public ResponseEntity login(@RequestBody @Valid AutheticationDTO data) {

		var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());

		var auth = this.authenticationManager.authenticate(usernamePassword);

		var token = tokenService.generateToken((Users) auth.getPrincipal());

		return ResponseEntity.ok(new LoginResponseDTO(token));
	}

	@PostMapping("/register")
	public ResponseEntity register(@RequestBody @Valid RegisterDTO data) {
		if (this.repository.findByLogin(data.login()) != null)
			return ResponseEntity.badRequest().build();
		String encryptedpassword = new BCryptPasswordEncoder().encode(data.password());
		Users newUser = new Users(data.login(), encryptedpassword, UsersRoles.ADMIN);
		this.repository.save(newUser);
		return ResponseEntity.ok().build();

	}
}
