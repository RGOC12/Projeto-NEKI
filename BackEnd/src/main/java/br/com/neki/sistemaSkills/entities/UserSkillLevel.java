package br.com.neki.sistemaSkills.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "user_skill_levels")
public class UserSkillLevel {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer userSkillLevelid;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;

    @ManyToOne
    @JoinColumn(name = "skill_id")
    private Skills skill;

    @ManyToOne
    @JoinColumn(name = "level_id")
    private Levels level;

	public UserSkillLevel() {
		super();
	}
	
	

	

	public UserSkillLevel(Integer userSkillLevelid, Users user, Skills skill, Levels level) {
		super();
		this.userSkillLevelid = userSkillLevelid;
		this.user = user;
		this.skill = skill;
		this.level = level;
	}





	public Integer getUserSkillLevelid() {
		return userSkillLevelid;
	}





	public void setUserSkillLevelid(Integer userSkillLevelid) {
		this.userSkillLevelid = userSkillLevelid;
	}





	public Users getUser() {
		return user;
	}

	public void setUser(Users user) {
		this.user = user;
	}

	public Skills getSkill() {
		return skill;
	}

	public void setSkill(Skills skill) {
		this.skill = skill;
	}

	public Levels getLevel() {
		return level;
	}

	public void setLevel(Levels level) {
		this.level = level;
	}
    
    

}


