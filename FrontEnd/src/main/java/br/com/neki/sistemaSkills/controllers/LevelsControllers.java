package br.com.neki.sistemaSkills.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.neki.sistemaSkills.entities.Levels;
import br.com.neki.sistemaSkills.repositories.LevelsRepository;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;


@RestController
@RequestMapping("levels")
public class LevelsControllers {
	
	@Autowired
	LevelsRepository levelsRepository;
	
	@SecurityRequirement(name = "bearerAuth")
	@GetMapping
	public List<Levels> listar(){
		return levelsRepository.findAll();
	}
}
