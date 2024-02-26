package br.com.neki.sistemaSkills.entities;

import java.util.HashSet;
import java.util.Set;

import br.com.neki.sistemaSkills.dtos.SkillsDTO;
import br.com.neki.sistemaSkills.dtos.SkillsResponseDTO;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.JoinColumn;

@Entity
@Table(name = "skills")
public class Skills {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Integer skillId;
	private String imageUrl;
	private String name;
	private String description;
	
	@ManyToOne
    @JoinColumn(name = "id_level")
    private Levels levels;

	
	public Skills() {
		super();
	}


	public Skills(Integer skillId, String imageUrl, String name, String description, Levels levels) {
		super();
		this.skillId = skillId;
		this.imageUrl = imageUrl;
		this.name = name;
		this.description = description;
		this.levels = levels;
	}


	public Skills(SkillsResponseDTO skillsResponseDTO) {
		this.imageUrl = skillsResponseDTO.imageUrl();
		this.name = skillsResponseDTO.name();
		this.description = skillsResponseDTO.description();
	}

	
	public Skills(SkillsDTO skillsDTO) {
		this.name = skillsDTO.name();
		this.description = skillsDTO.description();
		this.skillId = skillsDTO.skillId();
	}
	
	public Integer getSkillId() {
		return skillId;
	}


	public void setSkillId(Integer skillId) {
		this.skillId = skillId;
	}


	public String getImageUrl() {
		return imageUrl;
	}


	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public Levels getLevels() {
		return levels;
	}


	public void setLevels(Levels levels) {
		this.levels = levels;
	}
	


	
}
