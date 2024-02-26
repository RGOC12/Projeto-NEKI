import React, { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Modal from "../../components/Modal";
import "./Home.css";
import SkillsList from "../../components/card/skillList";

function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [updateSkills, setUpdateSkills] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = "/";
};

  const handleSkillSave = () => {
    setUpdateSkills(prevState => !prevState);
  };

  return (
    <>
      <Header />
      <section className='container'>
        <div className='skills'>
          <p>
            Lista de Skills de usuário | Level
          </p>
          <button className='butto' onClick={() => setOpenModal(true)}>Adicionar Skill</button>
          <button className='butto' onClick={handleLogout}>Logout</button>
        </div>
        <figure>
          <img className="foto" src="/Logo-Neki.png" alt="Logo" />
        </figure>
      </section>
      <div className="Skills">
      <SkillsList updateSkills={updateSkills} />
      </div>
      <Modal isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)} onSkillSave={handleSkillSave} />
      <Footer />
    </>
  );
}

export default Home;
