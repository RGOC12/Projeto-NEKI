package br.com.neki.sistemaSkills.dtos;

import br.com.neki.sistemaSkills.entities.Levels;

public record SkillsResponseDTO(String imageUrl,String name,String description,String levels) {

	public Integer getSkillsId() {
		// TODO Auto-generated method stub
		return null;
	}
}
