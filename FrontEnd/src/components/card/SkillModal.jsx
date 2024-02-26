import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8080';

const SkillModal = ({ skillId, skillName, onClose, onLevelUpdate }) => {
    console.log("skill modal: ", skillId)
  const [newLevel, setNewLevel] = useState('');
  const token = localStorage.getItem('token');
  const handleSave = async () => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          };

      const response = await axios.put(
        `${API_URL}/skills?skillId=${skillId}&levelId=${newLevel}`,
        null,
        { headers }
      );

      console.log('Nível atualizado com sucesso:', response.data);

      // Chama a função de atualização após salvar
      onLevelUpdate();

      // Fecha o modal
      onClose();
    } catch (error) {
      console.error('Erro ao atualizar o nível:', error);
    }
    
  };

  return (
    <div className="modal">
      <h2>Editar Nível para {skillName}</h2>
      <input
        type="number"
        placeholder="Novo Nível"
        value={newLevel}
        onChange={(e) => setNewLevel(e.target.value)}
      />
      <button onClick={handleSave}>Salvar</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
};

export default SkillModal;