package br.com.neki.sistemaSkills.entities;

public enum UsersRoles {
	ADMIN("admin"),
	USER("user");
	
	private String role;

	private UsersRoles(String role) {
		this.role = role;
	}

	public String getRole() {
		return role;
	}
	
}
