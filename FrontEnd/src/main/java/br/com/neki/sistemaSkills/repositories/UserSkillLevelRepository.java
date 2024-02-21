package br.com.neki.sistemaSkills.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.neki.sistemaSkills.entities.UserSkillLevel;
import br.com.neki.sistemaSkills.entities.Users;

public interface UserSkillLevelRepository extends JpaRepository<UserSkillLevel, Integer>{

	List<UserSkillLevel> findByUser(Users user);

}
