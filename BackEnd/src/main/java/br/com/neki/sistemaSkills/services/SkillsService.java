package br.com.neki.sistemaSkills.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.neki.sistemaSkills.dtos.SkillsDTO;
import br.com.neki.sistemaSkills.entities.Levels;
import br.com.neki.sistemaSkills.entities.Skills;
import br.com.neki.sistemaSkills.entities.Users;
import br.com.neki.sistemaSkills.repositories.SkillsRepository;



@Service
public class SkillsService {

	@Autowired
	SkillsRepository skillsRepo;


	public Skills buscarSkillPorId(Integer id) {
		return skillsRepo.findById(id).orElse(null);
	}

	public Skills salvarSkill(Skills skill) {
		return skillsRepo.save(skill);
	}

	public Skills atualizarSkill(Skills skill) {
		return skillsRepo.save(skill);
	}

	public boolean deletarSkillPorId(Integer id) {
	    Optional<Skills> skill = skillsRepo.findById(id);
	    if (skill.isPresent()) {
	        skillsRepo.delete(skill.get());
	        return true;
	    }
	    return false;
	}
	
	public List<SkillsDTO> buscarTodosSkillsDTO() {
	    List<Skills> skillsList = skillsRepo.findAll();
	    return skillsList.stream()
	        .map(skill -> new SkillsDTO(skill.getSkillId(),skill.getName(), skill.getDescription()))
	        .collect(Collectors.toList());
	}
	    }
	

