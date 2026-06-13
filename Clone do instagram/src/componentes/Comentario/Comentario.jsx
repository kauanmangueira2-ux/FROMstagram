import estilos from './Comentario.module.css'

export default function Comentario({ usuario, texto }) {
  return (
    <div className={estilos.comentario}>
      <span className={estilos.usuario}>{usuario}</span>
      <span className={estilos.texto}>{texto}</span>
    </div>
  )
}
