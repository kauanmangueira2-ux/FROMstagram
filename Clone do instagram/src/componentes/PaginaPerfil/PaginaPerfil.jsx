import { useState } from 'react'
import { RiGridFill, RiBookmarkLine, RiArrowLeftSLine, RiMailLine, RiHeartFill, RiCameraLine } from 'react-icons/ri'
import { postagens } from '../../dados/postagens'
import estilos from './PaginaPerfil.module.css'

export default function PaginaPerfil({
  perfil,
  ehMeuPerfil,
  aoVoltar,
  aoAbrirChat,
}) {
  const [seguindo, setSeguindo] = useState(perfil.seguindo)
  const [abaAtiva, setAbaAtiva] = useState('posts')
  const postsDoPerfil = postagens.filter((p) => perfil.postagens.includes(p.codigo))

  return (
    <div className={estilos.paginaPerfil}>
      <div className={estilos.cabecalhoPagina}>
        <button className={estilos.botaoVoltar} onClick={aoVoltar}>
          <RiArrowLeftSLine size={24} />
        </button>
        <div>
          <h1 className={estilos.tituloPerfil}>{perfil.nome}</h1>
          <span className={estilos.contadorPosts}>{perfil.contadorPosts} publicações</span>
        </div>
      </div>

      <div className={estilos.cabecalhoPerfil}>
        <div
          className={estilos.avatarGrande}
          style={{ borderColor: perfil.corAvatar }}
        >
          <img src={perfil.avatar} alt={perfil.nome} className={estilos.fotoGrande} />
        </div>

        <div className={estilos.infoPerfil}>
          <div className={estilos.linhaSuperior}>
            <span className={estilos.apelidoPerfil}>{perfil.usuario}</span>
            {!ehMeuPerfil && (
              <div className={estilos.acoesPerfil}>
                <button
                  className={`${estilos.botaoSeguir} ${seguindo ? estilos.seguindo : ''}`}
                  onClick={() => setSeguindo(!seguindo)}
                >
                  {seguindo ? 'Seguindo' : 'Seguir'}
                </button>
                <button
                  className={estilos.botaoMensagem}
                  onClick={() => aoAbrirChat(perfil.nome)}
                >
                  <RiMailLine size={18} />
                </button>
              </div>
            )}
            {ehMeuPerfil && (
              <button className={estilos.botaoEditar}>Editar perfil</button>
            )}
          </div>

          <div className={estilos.estatisticas}>
            <span className={estilos.estatistica}>
              <strong>{perfil.contadorPosts}</strong> publicações
            </span>
            <span className={estilos.estatistica}>
              <strong>{perfil.contadorSeguidores}</strong> seguidores
            </span>
            <span className={estilos.estatistica}>
              <strong>{perfil.contadorSeguindo}</strong> seguindo
            </span>
          </div>

          <p className={estilos.bio}>{perfil.bio}</p>
        </div>
      </div>

      <div className={estilos.abas}>
        <button
          className={`${estilos.aba} ${abaAtiva === 'posts' ? estilos.abaAtiva : ''}`}
          onClick={() => setAbaAtiva('posts')}
        >
          <RiGridFill size={12} /> POSTS
        </button>
        <button
          className={`${estilos.aba} ${abaAtiva === 'salvos' ? estilos.abaAtiva : ''}`}
          onClick={() => setAbaAtiva('salvos')}
        >
          <RiBookmarkLine size={12} /> SALVOS
        </button>
      </div>

      <div className={estilos.gridPosts}>
        {abaAtiva === 'posts' ? (
          postsDoPerfil.length > 0 ? (
            postsDoPerfil.map((post) => (
              <div
                key={post.codigo}
                className={estilos.itemGrid}
                style={{ background: post.corImagem }}
              >
                <div className={estilos.overlayGrid}>
                  <span><RiHeartFill size={14} /> {post.curtidas}</span>
                </div>
              </div>
            ))
          ) : (
            <div className={estilos.semPosts}>
              <span className={estilos.iconeSemPosts}><RiCameraLine size={32} /></span>
              <p>Nenhuma publicação ainda</p>
            </div>
          )
        ) : (
          <div className={estilos.semPosts}>
            <span className={estilos.iconeSemPosts}><RiBookmarkLine size={32} /></span>
            <p>Nenhum post salvo</p>
          </div>
        )}
      </div>
    </div>
  )
}
