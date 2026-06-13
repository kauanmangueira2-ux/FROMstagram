import { RiCloseLine, RiHeartFill, RiChat3Fill } from 'react-icons/ri'
import estilos from './Notificacoes.module.css'

const notificacoes = [
  { tipo: 'curtida', usuario: 'Boyd Stevens', acao: 'curtiu seu post.', avatar: '/imagens/boyd.jpg' },
  { tipo: 'comentario', usuario: 'Jade', acao: 'comentou: "Isso é genial!"', avatar: '/imagens/jade.jpg' },
  { tipo: 'curtida', usuario: 'Tabitha', acao: 'curtiu seu post.', avatar: '/imagens/Tabitha.jpg' },
  { tipo: 'comentario', usuario: 'Victor', acao: 'comentou: "Eu vi isso antes..."', avatar: '/imagens/victor.jpg' },
  { tipo: 'curtida', usuario: 'Sara', acao: 'curtiu seu post.', avatar: '/imagens/sara.jpg' },
  { tipo: 'comentario', usuario: 'Donna', acao: 'comentou: "Fique atento."', avatar: '/imagens/dona.jpg' },
]

export default function Notificacoes({ aoFechar }) {
  return (
    <div className={estilos.overlay} onClick={aoFechar}>
      <div className={estilos.painel} onClick={(e) => e.stopPropagation()}>
        <div className={estilos.cabecalho}>
          <h2 className={estilos.titulo}>Notificações</h2>
          <button className={estilos.botaoFechar} onClick={aoFechar}>
            <RiCloseLine size={20} />
          </button>
        </div>

        <div className={estilos.lista}>
          {notificacoes.map((notif, idx) => (
            <div key={idx} className={estilos.item}>
              <div className={estilos.avatarNotif}>
                <img src={notif.avatar} alt={notif.usuario} className={estilos.fotoNotif} />
              </div>
              <div className={estilos.textoNotif}>
                <strong>{notif.usuario}</strong> {notif.acao}
              </div>
              <span className={estilos.iconeNotif}>
                {notif.tipo === 'curtida' ? <RiHeartFill size={18} /> : <RiChat3Fill size={18} />}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
