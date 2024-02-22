import { useState } from "react"
import Footer from "../../components/Footer"
import Header from "../../components/Header"
import Modal from "../../components/Modal"
import "./Home.css"

function Home() {
  const [openModal, setOpenModal] = useState(false)
  const handleClick=()=>{
    localStorage.clear();
    window.location.reload();
  }

  return (
        <>
        <Header />
        <section className='container'>
          <div className='skills'>
            <p>
              Lista de Skills de usuário | Level
            </p>
            <button className='btn' onClick={() => setOpenModal(true)}>Adicionar Skill</button>
        <button className='butto' onClick={handleClick}>Logout</button>
          </div>
        <figure>
          <img className="foto" src="/Logo-Neki.png" alt="Logo" />
        </figure>
        </section>
        <Modal isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)}>
        </Modal>
        <Footer />
            </>
    )
}

export default Home