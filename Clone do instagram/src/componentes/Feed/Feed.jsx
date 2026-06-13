import Post from '../Post/Post'
import Stories from '../Stories/Stories'
import estilos from './Feed.module.css'

export default function Feed({ postagens, aoAbrirChat, aoVerPerfil }) {
  return (
    <main className={estilos.feed}>
      <Stories aoVerPerfil={aoVerPerfil} />
      <div className={estilos.listaPosts}>
        {postagens.map((post) => (
          <Post
            key={post.codigo}
            usuario={post.usuario}
            apelido={post.apelido}
            avatar={post.avatar}
            corAvatar={post.corAvatar}
            simboloImagem={post.simboloImagem}
            corImagem={post.corImagem}
            legenda={post.legenda}
            curtidas={post.curtidas}
            comentarios={post.comentarios}
            timestamp={post.timestamp}
            aoAbrirChat={aoAbrirChat}
            aoVerPerfil={aoVerPerfil}
          />
        ))}
      </div>
    </main>
  )
}
