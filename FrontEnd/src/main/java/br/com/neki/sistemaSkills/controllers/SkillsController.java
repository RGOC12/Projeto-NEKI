package br.com.neki.sistemaSkills.controllers;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.neki.sistemaSkills.dtos.SkillsDTO;
import br.com.neki.sistemaSkills.dtos.SkillsResponseDTO;
import br.com.neki.sistemaSkills.entities.Levels;
import br.com.neki.sistemaSkills.entities.Skills;
import br.com.neki.sistemaSkills.entities.UserSkillLevel;
import br.com.neki.sistemaSkills.entities.Users;
import br.com.neki.sistemaSkills.repositories.UserSkillLevelRepository;
import br.com.neki.sistemaSkills.services.LevelsService;
import br.com.neki.sistemaSkills.services.SkillsService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("skills")
public class SkillsController {

	@Autowired
	SkillsService skillsService;
	
	@Autowired
	LevelsService levelsService;
	
	@Autowired
	private UserSkillLevelRepository userSkillLevelRepo;
	
	

	@SecurityRequirement(name = "bearerAuth")
	@GetMapping
	public ResponseEntity<List<SkillsResponseDTO>> listarSkills() {
	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	    Object principal = authentication.getPrincipal();
	    Users user = null;
	    if (principal instanceof Users) {
	        user = (Users) principal;
	    }

	    
	    List<UserSkillLevel> userSkillLevels = userSkillLevelRepo.findByUser(user);

	    
	    List<SkillsResponseDTO> skillsResponseDTOs = new ArrayList<>();
	    for (UserSkillLevel userSkillLevel : userSkillLevels) {
	        Skills skill = userSkillLevel.getSkill();
	        Levels level = userSkillLevel.getLevel();

	        SkillsResponseDTO skillsResponseDTO = new SkillsResponseDTO(
	                skill.getImageUrl(),
	                skill.getName(),
	                skill.getDescription(),
	                level.getLevel()
	        );

	        skillsResponseDTOs.add(skillsResponseDTO);
	    }

	    return new ResponseEntity<>(skillsResponseDTOs, HttpStatus.OK);
	}

	@SecurityRequirement(name = "bearerAuth")
	@GetMapping("/{id}")
	public ResponseEntity<Skills> buscarSkillPorId(@PathVariable Integer id) {
		Skills skill = skillsService.buscarSkillPorId(id);

		if (skill == null)
			return new ResponseEntity<>(skill, HttpStatus.NOT_FOUND);

		else
			return new ResponseEntity<>(skill, HttpStatus.OK);
	}

	@SecurityRequirement(name = "bearerAuth")
	@PostMapping
	public ResponseEntity<Void> associarSkillNivel(
	        @RequestParam Integer skillId,
	        @RequestParam Integer levelId) {
	    
	    Skills skill = skillsService.buscarSkillPorId(skillId);

	    Levels level = levelsService.buscarLevelPorId(levelId);

	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        Users user = null;
        if (principal instanceof Users) {
            user = (Users) principal;
        }

	    if (user != null && skill != null && level != null) {
	      
	        UserSkillLevel userSkillLevel = new UserSkillLevel();
	        userSkillLevel.setUser(user);
	        userSkillLevel.setSkill(skill);
	        userSkillLevel.setLevel(level);

	       
	        userSkillLevelRepo.save(userSkillLevel);
	    }

	    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

//	@SecurityRequirement(name = "bearerAuth")
//	@PutMapping
//	public ResponseEntity<Skills> atualizarSkill(@RequestBody SkillsDTO updatedSkill)
//			throws RuntimeException, IllegalAccessException, InvocationTargetException {
//		Skills existingSkill = skillsService.buscarSkillPorId(updatedSkill.getSkillsId());
//
//		for (Field field : updatedSkill.getClass().getDeclaredFields()) {
//			field.setAccessible(true);
//			Object value = field.get(updatedSkill);
//
//			try {
//				Method getter = field.getDeclaringClass().getMethod(
//						"get" + field.getName().substring(0, 1).toUpperCase() + field.getName().substring(1));
//				if (getter.invoke(updatedSkill) != null) {
//					field.set(existingSkill, value);
//				}
//			} catch (NoSuchMethodException e) {
//
//			}
//		}
//
//		return new ResponseEntity<>(skillsService.atualizarSkill(existingSkill), HttpStatus.OK);
//	}

	@SecurityRequirement(name = "bearerAuth")
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deletarSkill(@PathVariable("id") Integer id) {

		if (skillsService.deletarSkillPorId(id)) {
			return new ResponseEntity<>("Deletado com Sucesso", HttpStatus.OK);
		} else {
			return new ResponseEntity<>("Não foi possível deletar", HttpStatus.BAD_REQUEST);
		}
	}
}
