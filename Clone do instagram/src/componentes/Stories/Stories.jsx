import estilos from './Stories.module.css'
import { postagens } from '../../dados/postagens'

export default function Stories({ aoVerPerfil }) {
  return (
    <div className={estilos.containerStories}>
      <div className={estilos.listaStories}>
        {postagens.map((post) => (
          <div key={post.codigo} className={estilos.itemStory} onClick={() => aoVerPerfil(post.usuario)}>
            <div
              className={estilos.bordaStory}
              style={{ background: `conic-gradient(${post.corAvatar}, var(--dourado), ${post.corAvatar})` }}
            >
              <div className={estilos.avatarStory}>
                <img src={post.avatar} alt={post.usuario} className={estilos.fotoStory} />
              </div>
            </div>
            <span className={estilos.nomeStory}>
              {post.usuario.split(' ')[0]}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
