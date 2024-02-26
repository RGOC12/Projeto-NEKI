package br.com.neki.sistemaSkills.controllers;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

			SkillsResponseDTO skillsResponseDTO = new SkillsResponseDTO(skill.getSkillId(), skill.getImageUrl(),
					skill.getName(), skill.getDescription(), level.getLevel());

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
	public ResponseEntity<Void> associarSkillNivel(@RequestParam Integer skillId, @RequestParam Integer levelId) {

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

	@SecurityRequirement(name = "bearerAuth")
	@PutMapping
	public ResponseEntity<Void> atualizacaoSkillNivel(@RequestParam Integer skillId, @RequestParam Integer levelId) {

		// Obtém o usuário autenticado
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Object principal = authentication.getPrincipal();
		Users user = null;
		if (principal instanceof Users) {
			user = (Users) principal;
		}

		// Verifica se o usuário, a habilidade e o nível existem
		Skills skill = skillsService.buscarSkillPorId(skillId);
		Levels level = levelsService.buscarLevelPorId(levelId);

		if (user != null && skill != null && level != null) {

			// Verifica se já existe uma entrada para essa habilidade e usuário
			UserSkillLevel existingUserSkillLevel = userSkillLevelRepo.findByUserAndSkill(user, skill);

			if (existingUserSkillLevel != null) {
				// Se já existe, atualiza o nível
				existingUserSkillLevel.setLevel(level);
				userSkillLevelRepo.save(existingUserSkillLevel);
			} else {
				// Se não existe, cria uma nova entrada
				UserSkillLevel newUserSkillLevel = new UserSkillLevel();
				newUserSkillLevel.setUser(user);
				newUserSkillLevel.setSkill(skill);
				newUserSkillLevel.setLevel(level);

				userSkillLevelRepo.save(newUserSkillLevel);
			}

			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {
			// Se o usuário, a habilidade ou o nível não existirem, retorna um erro
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

//	@SecurityRequirement(name = "bearerAuth")
//	@DeleteMapping
//	public ResponseEntity<?> delete(@RequestParam Integer skillId) {
//	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//	    Users user = (Users) authentication.getPrincipal();
//
//	    String userId = user.getUserId(); // Extraia o ID do usuário da classe Users
//
//	    UserSkillLevel association = userSkillLevelRepo.findBySkillIdAndUserId(skillId, userId);
//	    if (association == null) {
//	        return ResponseEntity.notFound().build();
//	    }
//
//	    userSkillLevelRepo.delete(association);
//	    return ResponseEntity.noContent().build();
//	}
}
