package br.com.neki.sistemaSkills.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.neki.sistemaSkills.entities.Skills;
import br.com.neki.sistemaSkills.entities.Users;



public interface SkillsRepository extends JpaRepository<Skills, Integer> {



}
