import estilos from './BarraLateral.module.css'

const sugestoes = [
  { usuario: "Ethan", apelido: "ethanboy", avatar: "/imagens/ethan.perfil.png" },
  { usuario: "Kenny", apelido: "kennycolonia", avatar: "/imagens/kenny.perfil.png" },
  { usuario: "Fatima", apelido: "fatimaesperanca", avatar: "/imagens/farima.perfil.png" },
  { usuario: "Ellis", apelido: "ellisfilhodoboyd", avatar: "/imagens/ellis.perfil.jpg" },
  { usuario: "Randall", apelido: "randallconflitos", avatar: "/imagens/randall.perfil.png" },
]

export default function BarraLateral({ aoVerPerfil, seguindo, aoAlternarSeguir }) {
  return (
    <aside className={estilos.barraLateral}>
      <div className={estilos.itemSugestao} onClick={() => aoVerPerfil('viajante_perdido')}>
        <div className={estilos.avatarSugestao}>
          <img src="/imagens/viajanteperdido.perfil.jpg" alt="Perfil" className={estilos.fotoSugestao} />
        </div>
        <div className={estilos.infoSugestao}>
          <span className={estilos.apelidoSugestao}>viajante_perdido</span>
          <span className={estilos.descricaoSugestao}>Sobrevivente da Cidade</span>
        </div>
        <button className={estilos.botaoSeguir} onClick={(e) => { e.stopPropagation(); }}>Mudar</button>
      </div>

      <div className={estilos.secaoSugestoes}>
        <div className={estilos.cabecalhoSugestoes}>
          <span className={estilos.tituloSugestoes}>Sugestões para você</span>
          <button className={estilos.botaoVerTudo}>Ver tudo</button>
        </div>

        <div className={estilos.listaSugestoes}>
          {sugestoes.map((sugestao) => (
            <div key={sugestao.apelido} className={estilos.itemSugestao} onClick={() => aoVerPerfil(sugestao.usuario)}>
              <div className={estilos.avatarSugestao}>
                <img src={sugestao.avatar} alt={sugestao.usuario} className={estilos.fotoSugestao} />
              </div>
              <div className={estilos.infoSugestao}>
                <span className={estilos.apelidoSugestao}>{sugestao.apelido}</span>
                <span className={estilos.descricaoSugestao}>Novo por aqui</span>
              </div>
              <button
                className={estilos.botaoSeguir}
                onClick={(e) => { e.stopPropagation(); aoAlternarSeguir(sugestao.usuario) }}
              >
                {seguindo.includes(sugestao.usuario) ? 'Seguindo' : 'Seguir'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
