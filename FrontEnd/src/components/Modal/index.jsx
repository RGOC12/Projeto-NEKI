import React, { useState } from 'react';
import { ChevronUp, ChevronDown, CheckCircle2 } from 'lucide-react';
import { FaJava, FaJs, FaReact, FaPython, FaPhp } from 'react-icons/fa';
import './Modal.css';

const BACKGROUND_STYLE = {
    position: 'fixed',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    backgroundColor: 'rgb(0,0,0, 0.7)',
    zIndex: '1000',
    color: 'black'
};

const MODAL_STYLE = {
    position: 'fixed',
    top: '20%',
    left: '26%',
    transform: 'translate(-50% -50%)',
    padding: '20px',
    backgroundColor: 'rgba(0, 0, 255, 0.5)', /* Azul transparente */
    backdropFilter: 'blur(5px)', /* Efeito meio fosco */
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', /* Sombreamento */
    zIndex: '1000'
};

function Modal({ isOpen, setModalOpen, children }) {
    const [showOptions, setShowOptions] = useState(false);

    const toggleOptions = () => {
        setShowOptions((prevShowOptions) => !prevShowOptions);
    };

    if (isOpen) {
        return (
            <div style={BACKGROUND_STYLE}>
                <div style={MODAL_STYLE}>
                    <div>{children}</div>

                    <div className="select">
                        <div id="category-select">
                            <label htmlFor="options-view-button">Skills</label>

                            <input type="checkbox" id="options-view-button" onChange={toggleOptions} checked={showOptions} />
                            <div id="select-button">
                                <div id="selected-value">Selecione a skill</div>

                                <div id="chevrons">
                                    {showOptions ? <ChevronUp className="chevron-up" /> : <ChevronDown className="chevron-down" />}
                                </div>
                            </div>
                        </div>
                        <ul id="options" style={{ display: showOptions ? 'block' : 'none' }}>
                            <li className="option">
                                <input type="radio"
                                    name="category"
                                    value="linguagem"
                                    data-label="React"></input>

                                <FaReact />
                                <span className="label">React</span>
                                <CheckCircle2 className="check" />
                            </li>
                            <li className="option">
                                <input type="radio"
                                    name="category"
                                    value="linguagem"
                                    data-label="Javascript"></input>
                                <FaJs />
                                <span className="label">Javascript</span>
                                <CheckCircle2 className="check" />
                            </li>
                            <li className="option">
                                <input type="radio"
                                    name="category"
                                    value="linguagem"
                                    data-label="Java"></input>
                                <FaJava />
                                <span className="label">Java</span>
                                <CheckCircle2 className='check' />
                            </li>
                            <li className="option">
                                <input type="radio"
                                    name="category"
                                    value="linguagem"
                                    data-label="Python"></input>
                                <FaPython />
                                <span className="label">Python</span>
                                <CheckCircle2 className="check" />
                            </li>
                            <li className="option">
                                <input type="radio"
                                    name="category"
                                    value="linguagem"
                                    data-label="PHP"></input>
                                <FaPhp />
                                <span className="label">PHP</span>
                                <CheckCircle2 className="check" />
                            </li>
                        </ul>
                    </div>
                    <button className="fechar" onClick={setModalOpen}>Cancelar</button>
                    <button className="adicionar" onClick={""}>Salvar</button>
                </div>
            </div>
        );
    }
    return null;
}

export default Modal;