import { useState } from 'react'
import Cabecalho from './componentes/Cabecalho/Cabecalho'
import MenuLateral from './componentes/MenuLateral/MenuLateral'
import Feed from './componentes/Feed/Feed'
import BarraLateral from './componentes/BarraLateral/BarraLateral'
import PaginaPerfil from './componentes/PaginaPerfil/PaginaPerfil'
import ChatDm from './componentes/ChatDm/ChatDm'
import CriarPost from './componentes/CriarPost/CriarPost'
import Notificacoes from './componentes/Notificacoes/Notificacoes'
import { postagens as postagensIniciais } from './dados/postagens'
import { perfis } from './dados/usuarios'
import estilos from './App.module.css'

export default function App() {
  const [chatAberto, setChatAberto] = useState(null)
  const [criarPostAberto, setCriarPostAberto] = useState(false)
  const [notificacoesAberto, setNotificacoesAberto] = useState(false)
  const [menuPerfilAberto, setMenuPerfilAberto] = useState(false)
  const [paginaAtual, setPaginaAtual] = useState('feed')
  const [perfilVisualizado, setPerfilVisualizado] = useState(null)
  const [postagens, setPostagens] = useState(postagensIniciais)
  const [seguindo, setSeguindo] = useState(['viajante_perdido'])

  function aoAbrirChat(nomePersonagem) {
    const personagem = postagens.find((p) => p.usuario === nomePersonagem)
    if (personagem) {
      setChatAberto(personagem)
    }
  }

  function aoFecharChat() {
    setChatAberto(null)
  }

  function aoClicarInicio() {
    setPaginaAtual('feed')
    setPerfilVisualizado(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function aoVerPerfil(nomeUsuario) {
    const perfil = perfis[nomeUsuario]
    if (perfil) {
      setPerfilVisualizado(perfil)
      setPaginaAtual('perfil')
      window.scrollTo({ top: 0 })
    }
  }

  function aoVerMeuPerfil() {
    setPerfilVisualizado(perfis['viajante_perdido'])
    setPaginaAtual('perfil')
    setMenuPerfilAberto(false)
    window.scrollTo({ top: 0 })
  }

  function aoVoltarPagina() {
    setPaginaAtual('feed')
    setPerfilVisualizado(null)
  }

  function aoCriarPost(novoPost) {
    setPostagens([novoPost, ...postagens])
  }

  function aoAlternarSeguir(nome) {
    if (seguindo.includes(nome)) {
      setSeguindo(seguindo.filter((s) => s !== nome))
    } else {
      setSeguindo([...seguindo, nome])
    }
  }

  function renderizarConteudo() {
    if (paginaAtual === 'perfil' && perfilVisualizado) {
      return (
        <div className={estilos.conteudo}>
          <PaginaPerfil
            perfil={perfilVisualizado}
            ehMeuPerfil={perfilVisualizado.usuario === 'viajante_perdido'}
            aoVoltar={aoVoltarPagina}
            aoAbrirChat={aoAbrirChat}
          />
          <BarraLateral
            aoVerPerfil={aoVerPerfil}
            seguindo={seguindo}
            aoAlternarSeguir={aoAlternarSeguir}
          />
        </div>
      )
    }

    return (
      <div className={estilos.conteudo}>
        <Feed postagens={postagens} aoAbrirChat={aoAbrirChat} aoVerPerfil={aoVerPerfil} />
        <BarraLateral
          aoVerPerfil={aoVerPerfil}
          seguindo={seguindo}
          aoAlternarSeguir={aoAlternarSeguir}
        />
      </div>
    )
  }

  return (
    <div className={estilos.app}>
      <MenuLateral
        aoClicarInicio={aoClicarInicio}
        aoCriarPost={() => setCriarPostAberto(true)}
        aoAbrirNotificacoes={() => setNotificacoesAberto(!notificacoesAberto)}
        aoAbrirPerfil={() => setMenuPerfilAberto(!menuPerfilAberto)}
        aoVerMeuPerfil={aoVerMeuPerfil}
        notificacoesAberto={notificacoesAberto}
        menuPerfilAberto={menuPerfilAberto}
      />

      <Cabecalho />

      {renderizarConteudo()}

      {chatAberto && (
        <ChatDm
          contato={chatAberto.usuario}
          avatar={chatAberto.avatar}
          corAvatar={chatAberto.corAvatar}
          aoFechar={aoFecharChat}
        />
      )}

      {criarPostAberto && (
        <CriarPost aoFechar={() => setCriarPostAberto(false)} aoCriarPost={aoCriarPost} />
      )}

      {notificacoesAberto && (
        <Notificacoes aoFechar={() => setNotificacoesAberto(false)} />
      )}
    </div>
  )
}
