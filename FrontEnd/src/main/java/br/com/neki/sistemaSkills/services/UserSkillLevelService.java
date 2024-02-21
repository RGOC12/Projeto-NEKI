package br.com.neki.sistemaSkills.services;

import org.springframework.beans.factory.annotation.Autowired;

import br.com.neki.sistemaSkills.entities.Levels;
import br.com.neki.sistemaSkills.entities.UserSkillLevel;
import br.com.neki.sistemaSkills.repositories.UserSkillLevelRepository;

public class UserSkillLevelService {

	@Autowired
	private UserSkillLevelRepository userSkillLevelRepo;

	public UserSkillLevel salvarUserSkillLevel(UserSkillLevel userSkillLevel) {
		return userSkillLevelRepo.save(userSkillLevel);
	}

}
