import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SkillCard from './index';

const API_URL = 'http://localhost:8080';

const SkillsList = () => {
  const [skills, setSkills] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        };
        const response = await axios.get(`${API_URL}/skills`, { headers });
        setSkills(response.data);
      } catch (error) {
        console.error('Erro ao obter as skills:', error);
      }
    };

    fetchSkills();
  }, []);

  

  const handleDeleteSkill = async (skillId, userId) => {
    console.log("O logins esta retornando:", skillId);
  
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
      };
  
      // Ajuste a URL da API para o endpoint correto
      const response = await axios.delete(`${API_URL}/user-skill-levels?skillId=${skillId}&userId=${userId}`, { headers });
  
      if (response.status === 204) {
        console.log('Skill deletada com sucesso!');
  
        // Remova a skill deletada do estado local (se aplicável)
        setSkills(skills.filter((skill) => skill.id !== skillId));
  
        // Chame a função para atualizar a UI (opcional)
        onSkillDelete && onSkillDelete();
      } else {
        console.error('Erro ao deletar skill:', response.data);
      }
    } catch (error) {
      console.error('Erro ao deletar skill:', error);
      if (error.response.status === 400) {
        console.error('IDs da skill ou usuário inválidos');
      } else if (error.response.status === 404) {
        console.error('Associação não encontrada');
      }
    }
  };

  return (
    <div className="skills-list">
      {skills.map((skill, index) => (
        <SkillCard
          key={index}
          {...skill}
          onDelete={handleDeleteSkill} // Passe a função handleDeleteSkill como prop
        />
      ))}
    </div>
  );
};

export default SkillsList;
