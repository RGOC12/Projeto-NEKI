import React from 'react';
import axios from 'axios';
import Select from 'react-select';

const BACKGROUND_STYLE = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.7)',
  zIndex: 100,
};

const MODAL_STYLE = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'rgba(0, 0, 255, 0.5)',
  backdropFilter: 'blur(5px)',
  zIndex: 1000,
  height: 180,
  width: 400,
  padding: 20,
  borderRadius: 10,
};

const API_URL = 'http://localhost:8080';

const Modal = ({ isOpen, setModalOpen, onSkillSave }) => {
  const [selectedSkill, setSelectedSkill] = React.useState(null);
  const token = localStorage.getItem('token');
  const [skills, setSkills] = React.useState([]);

  React.useEffect(() => {
    const fetchSkills = async (token) => {
      if (isOpen) {
        try {
          const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          };

          const response = await axios.get(`${API_URL}/skills/skills`, { headers });
          // Transforme a resposta da API para o formato esperado pelo react-select
          const formattedSkills = response.data.map(skill => ({
            value: skill.skillId,
            label: skill.name,
          }));

          setSkills(formattedSkills);
        } catch (error) {
          console.error('Erro ao carregar skills:', error);
        }
      }
    };

    fetchSkills(token);
  }, [isOpen, token]);

  const handleSave = async () => {
    if (selectedSkill) {
      const skillId = selectedSkill.value;
      const levelId = 1;

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      try {
        await axios.post(`${API_URL}/skills?skillId=${skillId}&levelId=${levelId}`, null, { headers });
        alert('Habilidade salva com sucesso!');
        setModalOpen(false);
        onSkillSave(); // Chama a função de atualização após salvar
      } catch (error) {
        alert('Erro ao salvar habilidade: ' + error.message);
      }
    } else {
      alert('Selecione uma habilidade antes de salvar.');
    }
  };

  return (
    <div className="modal" style={{ BACKGROUND_STYLE, display: isOpen ? 'block' : 'none' }}>
      <div style={MODAL_STYLE}>
        <h2>Selecionar Habilidade</h2>
        <Select
          value={selectedSkill}
          onChange={setSelectedSkill}
          options={skills}
          placeholder="Selecione uma habilidade"
        />
        <button className="btn" onClick={handleSave}>Salvar</button>
      <button className="btn" onClick={() => setModalOpen(false)}>Cancelar</button>
      </div>
    </div>
  );
};

export default Modal;
