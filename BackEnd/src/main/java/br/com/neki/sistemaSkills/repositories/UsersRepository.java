package br.com.neki.sistemaSkills.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import br.com.neki.sistemaSkills.entities.Users;



public interface UsersRepository extends JpaRepository<Users,String>{

	UserDetails findByLogin(Object login);
}
