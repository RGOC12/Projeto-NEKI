import React from 'react';
import SkillModal from './SkillModal'; // Importe o componente SkillModal ou o componente que você está usando para atualizar o nível

const SkillCard = ({ skillId, imageUrl, name, description, levels, onLevelUpdate, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleUpdateLevelClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteClick = () => {
    onDelete(skillId); // Chame a função onDelete passando o skillId
  };

  return (
    <div className="skill-card">
      <img src={imageUrl} alt={name} />
      <h3>{name}</h3>
      <p>{description}</p>
      <p>Level: {levels}</p>
      <button onClick={handleUpdateLevelClick}>Atualizar Nível</button>
      <button onClick={handleDeleteClick}>Deletar Skill</button>
      {isModalOpen && (
        <SkillModal
          skillId={skillId}
          skillName={name}
          onClose={handleCloseModal}
          onLevelUpdate={onLevelUpdate}
        />
      )}
    </div>
  );
};

export default SkillCard;
