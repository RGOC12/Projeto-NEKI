package br.com.neki.sistemaSkills.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.neki.sistemaSkills.entities.Levels;
import br.com.neki.sistemaSkills.repositories.LevelsRepository;

@Service
public class LevelsService {

	 @Autowired
	    private LevelsRepository levelsRepository;
	 
	 public List<Levels> buscarTodosLevels() {
	        return levelsRepository.findAll();
	    }
	 
	 public Levels buscarLevelPorId(Integer id) {
	        return levelsRepository.findById(id).orElse(null);
	    }

}
