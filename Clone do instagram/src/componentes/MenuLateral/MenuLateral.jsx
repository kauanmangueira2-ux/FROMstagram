import { RiHomeLine, RiAddBoxLine, RiHeartLine, RiUserLine } from 'react-icons/ri'
import { FaInstagram } from 'react-icons/fa'
import estilos from './MenuLateral.module.css'

export default function MenuLateral({
  aoClicarInicio,
  aoCriarPost,
  aoAbrirNotificacoes,
  aoAbrirPerfil,
  aoVerMeuPerfil,
  notificacoesAberto,
  menuPerfilAberto,
}) {
  return (
    <aside className={estilos.menuLateral}>
      <div className={estilos.logo}>
        <FaInstagram className={estilos.iconeLogo} />
        <h1 className={estilos.titulo}>FROMstagram</h1>
      </div>

      <nav className={estilos.navegacao}>
        <button className={estilos.itemMenu} onClick={aoClicarInicio} title="Início">
          <RiHomeLine size={24} />
          <span className={estilos.textoItem}>Início</span>
        </button>

        <button className={estilos.itemMenu} onClick={aoCriarPost} title="Criar Post">
          <RiAddBoxLine size={24} />
          <span className={estilos.textoItem}>Criar Post</span>
        </button>

        <div className={estilos.containerNotificacao}>
          <button
            className={`${estilos.itemMenu} ${notificacoesAberto ? estilos.itemAtivo : ''}`}
            onClick={aoAbrirNotificacoes}
            title="Notificações"
          >
            <RiHeartLine size={24} />
            <span className={estilos.textoItem}>Notificações</span>
          </button>
        </div>

        <div className={estilos.containerPerfil}>
          <button
            className={`${estilos.itemMenu} ${menuPerfilAberto ? estilos.itemAtivo : ''}`}
            onClick={aoAbrirPerfil}
            title="Minha Conta"
          >
            <RiUserLine size={24} />
            <span className={estilos.textoItem}>Minha Conta</span>
          </button>
          {menuPerfilAberto && (
            <div className={estilos.menuPerfil}>
              <button className={estilos.itemPerfil} onClick={aoVerMeuPerfil}>Perfil</button>
              <button className={estilos.itemPerfil}>Salvos</button>
              <button className={estilos.itemPerfil}>Configurações</button>
              <hr className={estilos.divisor} />
              <button className={estilos.itemPerfil}>Sair</button>
            </div>
          )}
        </div>
      </nav>
    </aside>
  )
}
