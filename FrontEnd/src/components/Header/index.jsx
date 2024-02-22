import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
    return (
<header className="header">
    <Link to="/">
    <img className="imagem" src="/Logo-Neki.png" alt="Logo" />
    </Link>
    <nav>
        <Link to="/">Login</Link>
        <Link to="/home">Home</Link>
        <Link to="/cadastro">Cadastro</Link>
         </nav>
</header>
    )
}

export default Header