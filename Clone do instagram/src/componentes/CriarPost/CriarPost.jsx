import { useState } from 'react'
import { RiCloseLine, RiImageLine } from 'react-icons/ri'
import estilos from './CriarPost.module.css'

export default function CriarPost({ aoFechar, aoCriarPost }) {
  const [legenda, setLegenda] = useState('')
  const [imagemPreview, setImagemPreview] = useState(null)

  function aoSelecionarImagem(evento) {
    const arquivo = evento.target.files[0]
    if (arquivo) {
      setImagemPreview(URL.createObjectURL(arquivo))
    }
  }

  function aoCompartilhar(evento) {
    evento.preventDefault()
    if (!imagemPreview || !legenda.trim()) return

    const novoPost = {
      codigo: Date.now(),
      usuario: 'viajante_perdido',
      apelido: 'viajante',
      avatar: '/imagens/viajanteperdido.perfil.jpg',
      corAvatar: '#c9a84c',
      simboloImagem: '',
      corImagem: `url('${imagemPreview}') center/cover no-repeat`,
      legenda: legenda.trim(),
      curtidas: 0,
      comentarios: [],
      timestamp: 'Agora mesmo',
    }

    aoCriarPost(novoPost)
    aoFechar()
  }

  return (
    <div className={estilos.overlay} onClick={aoFechar}>
      <div className={estilos.modal} onClick={(e) => e.stopPropagation()}>
        <div className={estilos.cabecalhoModal}>
          <button className={estilos.botaoFechar} onClick={aoFechar}>
            <RiCloseLine size={20} />
          </button>
          <h2 className={estilos.tituloModal}>Criar novo post</h2>
          <button
            className={`${estilos.botaoCompartilhar} ${imagemPreview && legenda.trim() ? estilos.botaoAtivo : ''}`}
            onClick={aoCompartilhar}
            disabled={!imagemPreview || !legenda.trim()}
          >
            Compartilhar
          </button>
        </div>

        <div className={estilos.corpoModal}>
          <div className={estilos.areaImagem}>
            {imagemPreview ? (
              <img src={imagemPreview} alt="Preview" className={estilos.previewImagem} />
            ) : (
              <label className={estilos.placeholderImagem}>
                <RiImageLine size={48} />
                <span className={estilos.textoPlaceholder}>Clique para selecionar uma imagem</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={aoSelecionarImagem}
                  className={estilos.inputArquivo}
                />
              </label>
            )}
            {imagemPreview && (
              <button
                className={estilos.botaoTrocarImagem}
                onClick={() => setImagemPreview(null)}
              >
                Remover imagem
              </button>
            )}
          </div>

          <textarea
            className={estilos.textareaLegenda}
            placeholder="Escreva uma legenda..."
            value={legenda}
            onChange={(e) => setLegenda(e.target.value)}
            maxLength={300}
          />
          <span className={estilos.contadorCaracteres}>{legenda.length}/300</span>
        </div>
      </div>
    </div>
  )
}
