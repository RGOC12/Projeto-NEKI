package br.com.neki.sistemaSkills.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "levels")
public class Levels {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer levelId;
    private String level;
	
    public Levels() {
		super();
	}
	public Levels(Integer levelId, String level) {
		super();
		this.levelId = levelId;
		this.level = level;
	}
	public Integer getLevelId() {
		return levelId;
	}
	public void setLevelId(Integer levelId) {
		this.levelId = levelId;
	}
	public String getLevel() {
		return level;
	}
	public void setLevel(String level) {
		this.level = level;
	}

    
}