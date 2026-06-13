import { useState, useRef } from 'react'
import { RiHeartLine, RiHeartFill, RiChat3Line, RiSendPlaneLine, RiBookmarkLine, RiBookmarkFill } from 'react-icons/ri'
import Comentario from '../Comentario/Comentario'
import estilos from './Post.module.css'

export default function Post({
  usuario,
  apelido,
  avatar,
  corAvatar,
  simboloImagem,
  corImagem,
  legenda,
  curtidas,
  comentarios: comentariosIniciais,
  timestamp,
  aoAbrirChat,
  aoVerPerfil,
}) {
  const [curtido, setCurtido] = useState(false)
  const [contagemCurtidas, setContagemCurtidas] = useState(curtidas)
  const [comentarios, setComentarios] = useState(comentariosIniciais)
  const [inputComentario, setInputComentario] = useState('')
  const [salvo, setSalvo] = useState(false)
  const inputRef = useRef(null)

  function curtirPost() {
    if (curtido) {
      setCurtido(false)
      setContagemCurtidas(contagemCurtidas - 1)
    } else {
      setCurtido(true)
      setContagemCurtidas(contagemCurtidas + 1)
    }
  }

  function aoClicarComentar() {
    inputRef.current?.focus()
  }

  function aoClicarCompartilhar() {
    aoAbrirChat(usuario)
  }

  function aoDigitarComentario(evento) {
    setInputComentario(evento.target.value)
  }

  function aoEnviarComentario(evento) {
    evento.preventDefault()
    const texto = inputComentario.trim()
    if (!texto) return

    const novoComentario = {
      usuario: 'viajante_perdido',
      texto: texto,
    }

    setComentarios([...comentarios, novoComentario])
    setInputComentario('')
  }

  function alternarSalvo() {
    setSalvo(!salvo)
  }

  return (
    <article className={estilos.post}>
      <div className={estilos.cabecalhoPost}>
        <button
          className={estilos.botaoAvatar}
          onClick={() => aoVerPerfil(usuario)}
          style={{ borderColor: corAvatar }}
        >
          <img src={avatar} alt={usuario} className={estilos.fotoAvatar} />
        </button>
        <div className={estilos.infoPost}>
          <button className={estilos.botaoNome} onClick={() => aoVerPerfil(usuario)}>
            <span className={estilos.apelidoPost}>{apelido}</span>
          </button>
          <button className={estilos.botaoNome} onClick={() => aoVerPerfil(usuario)}>
            <span className={estilos.localPost}>{usuario}</span>
          </button>
        </div>
        <button className={estilos.botaoOpcoes}>•••</button>
      </div>

      <div
        className={estilos.imagemPost}
        style={{ background: corImagem }}
      >
        {simboloImagem && (
          <span className={estilos.simboloImagem}>{simboloImagem}</span>
        )}
        <div className={estilos.overlayRuna} />
      </div>

      <div className={estilos.acoesPost}>
        <div className={estilos.acoesEsquerda}>
          <button
            className={`${estilos.botaoAcao} ${curtido ? estilos.curtido : ''}`}
            onClick={curtirPost}
            title="Curtir"
          >
            {curtido ? <RiHeartFill size={24} /> : <RiHeartLine size={24} />}
          </button>
          <button className={estilos.botaoAcao} title="Comentar" onClick={aoClicarComentar}>
            <RiChat3Line size={24} />
          </button>
          <button className={estilos.botaoAcao} title="Compartilhar" onClick={aoClicarCompartilhar}>
            <RiSendPlaneLine size={24} />
          </button>
        </div>
        <button
          className={`${estilos.botaoAcao} ${salvo ? estilos.salvo : ''}`}
          onClick={alternarSalvo}
          title="Salvar"
        >
          {salvo ? <RiBookmarkFill size={24} /> : <RiBookmarkLine size={24} />}
        </button>
      </div>

      <div className={estilos.corpoPost}>
        <span className={estilos.curtidas}>
          {contagemCurtidas} curtida{contagemCurtidas !== 1 ? 's' : ''}
        </span>

        <div className={estilos.legenda}>
          <span className={estilos.apelidoLegenda}>{apelido}</span>
          <span className={estilos.textoLegenda}>{legenda}</span>
        </div>

        <div className={estilos.comentarios}>
          {comentarios.map((comentario, indice) => (
            <Comentario
              key={indice}
              usuario={comentario.usuario}
              texto={comentario.texto}
            />
          ))}
        </div>

        <span className={estilos.timestamp}>{timestamp}</span>
      </div>

      <form className={estilos.formComentario} onSubmit={aoEnviarComentario}>
        <input
          ref={inputRef}
          className={estilos.inputComentario}
          type="text"
          placeholder="Adicione um comentário..."
          value={inputComentario}
          onChange={aoDigitarComentario}
        />
        <button
          className={`${estilos.botaoPublicar} ${inputComentario.trim() ? estilos.botaoPublicarAtivo : ''}`}
          type="submit"
          disabled={!inputComentario.trim()}
        >
          Publicar
        </button>
      </form>
    </article>
  )
}
