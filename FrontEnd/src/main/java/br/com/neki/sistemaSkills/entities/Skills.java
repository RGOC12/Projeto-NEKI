package br.com.neki.sistemaSkills.entities;

import java.util.HashSet;
import java.util.Set;

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
	private Integer skillsId;
	private String imageUrl;
	private String name;
	private String description;
	
	@ManyToOne
    @JoinColumn(name = "id_level")
    private Levels levels;

	
	public Skills() {
		super();
	}


	public Skills(Integer skillsId, String imageUrl, String name, String description, Levels levels) {
		super();
		this.skillsId = skillsId;
		this.imageUrl = imageUrl;
		this.name = name;
		this.description = description;
		this.levels = levels;
	}


	public Skills(SkillsResponseDTO skillsResponseDTO) {
		this.imageUrl = skillsResponseDTO.imageUrl();
		this.name = skillsResponseDTO.name();
		this.description = skillsResponseDTO.description();
		this.levels = levels;
	}


	public Integer getSkillsId() {
		return skillsId;
	}


	public void setSkillsId(Integer skillsId) {
		this.skillsId = skillsId;
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
