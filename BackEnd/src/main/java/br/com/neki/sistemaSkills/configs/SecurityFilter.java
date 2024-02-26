package br.com.neki.sistemaSkills.configs;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import br.com.neki.sistemaSkills.repositories.UsersRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class SecurityFilter extends OncePerRequestFilter {
	@Autowired
	TokenService tokenService;
	@Autowired
	UsersRepository userRepository;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		var token = this.recoverToken(request);
		System.out.println("Recuperou o token " + token);
		
		if (token != null) {
			System.out.println("Entrou no if");
			var login = tokenService.validateToken(token);
			System.out.println("login preenchido" + login);
			UserDetails user = userRepository.findByLogin(login);
			System.out.println("O login é " + login);
			System.out.println("Passou o usuario:" + user);
			var authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
			System.out.println("Recuperou o authentication: " + authentication);
			SecurityContextHolder.getContext().setAuthentication(authentication);
		}

		filterChain.doFilter(request, response);
	}

	private String recoverToken(HttpServletRequest request) {

		var authHeader = request.getHeader("Authorization");
		System.out.println("recuperou o Header" + authHeader);
		if (authHeader == null) {

			return null;
		};
		
		return authHeader.replace("Bearer ", "");
	}

}
