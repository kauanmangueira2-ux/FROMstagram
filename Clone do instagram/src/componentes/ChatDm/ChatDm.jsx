import { useState } from 'react'
import { RiSendPlaneLine, RiCloseLine } from 'react-icons/ri'
import estilos from './ChatDm.module.css'

const mensagensIniciais = {
  'Boyd Stevens': [
    { de: 'Boyd Stevens', texto: 'Preciso de ajuda aqui na cidade.' },
    { de: 'viajante_perdido', texto: 'O que está acontecendo, xerife?' },
    { de: 'Boyd Stevens', texto: 'Os monstros estão mais perto essa noite. O talismã não deu conta.' },
  ],
  'Tabitha': [
    { de: 'Tabitha', texto: 'Você viu os símbolos nas árvores?' },
    { de: 'viajante_perdido', texto: 'Vi sim. Parecem runas antigas.' },
    { de: 'Tabitha', texto: 'Exato! E acho que sei o que significam.' },
  ],
  'Victor': [
    { de: 'Victor', texto: 'Você gosta de lagartas?' },
    { de: 'viajante_perdido', texto: 'Err... não sei, Victor.' },
    { de: 'Victor', texto: 'Elas sabem se esconder. É assim que sobrevivem aqui.' },
  ],
  'Jade': [
    { de: 'Jade', texto: 'Consegui! Os talismãs são fractais!' },
    { de: 'viajante_perdido', texto: 'Fractais? Explica melhor.' },
    { de: 'Jade', texto: 'Cada símbolo se repete em escala diferente. É genial!' },
  ],
  'Sara': [
    { de: 'Sara', texto: 'As vozes disseram que você viria.' },
    { de: 'viajante_perdido', texto: 'Que vozes, Sara?' },
    { de: 'Sara', texto: 'As que sussurram quando escurece. Preste atenção.' },
  ],
  'Donna': [
    { de: 'Donna', texto: 'Na Colônia, todo mundo trabalha. Você vai se virar bem.' },
    { de: 'viajante_perdido', texto: 'Pode contar comigo, Donna.' },
    { de: 'Donna', texto: 'Bom. Precisamos de gente forte. E você parece resistente.' },
  ],
}

export default function ChatDm({ contato, avatar, corAvatar, aoFechar }) {
  const [mensagens, setMensagens] = useState(mensagensIniciais[contato] || [])
  const [inputMensagem, setInputMensagem] = useState('')

  function aoEnviarMensagem(evento) {
    evento.preventDefault()
    const texto = inputMensagem.trim()
    if (!texto) return

    const novaMensagem = { de: 'viajante_perdido', texto }
    const resposta = gerarResposta(contato, texto)

    setMensagens([...mensagens, novaMensagem, resposta])
    setInputMensagem('')
  }

  function gerarResposta(contato, msg) {
    const respostas = {
      'Boyd Stevens': 'Entendo. Vou fazer o possível para proteger todos.',
      'Tabitha': 'Interessante. Continue me contando.',
      'Victor': 'Você lembra de algo sobre isso?',
      'Jade': 'Isso prova minha teoria! Precisamos conversar pessoalmente.',
      'Sara': 'Elas disseram algo parecido ontem à noite.',
      'Donna': 'Bom. Fique atento ao anoitecer.',
    }
    return {
      de: contato,
      texto: respostas[contato] || 'Precisamos nos encontrar. Temos muito o que conversar.',
    }
  }

  return (
    <div className={estilos.overlay} onClick={aoFechar}>
      <div className={estilos.chat} onClick={(e) => e.stopPropagation()}>
        <div className={estilos.cabecalhoChat}>
          <div className={estilos.infoContato}>
            <div className={estilos.avatarContato} style={{ borderColor: corAvatar }}>
              <img src={avatar} alt={contato} className={estilos.fotoContato} />
            </div>
            <div>
              <span className={estilos.nomeContato}>{contato}</span>
              <span className={estilos.statusContato}>Online</span>
            </div>
          </div>
          <button className={estilos.botaoFechar} onClick={aoFechar}>
            <RiCloseLine size={22} />
          </button>
        </div>

        <div className={estilos.mensagens}>
          {mensagens.map((msg, idx) => (
            <div
              key={idx}
              className={`${estilos.mensagem} ${
                msg.de === 'viajante_perdido'
                  ? estilos.minhaMensagem
                  : estilos.mensagemContato
              }`}
            >
              <span className={estilos.textoMensagem}>{msg.texto}</span>
            </div>
          ))}
        </div>

        <form className={estilos.formMensagem} onSubmit={aoEnviarMensagem}>
          <input
            className={estilos.inputMensagem}
            type="text"
            placeholder="Mensagem..."
            value={inputMensagem}
            onChange={(e) => setInputMensagem(e.target.value)}
          />
          <button
            className={estilos.botaoEnviar}
            type="submit"
            disabled={!inputMensagem.trim()}
          >
            <RiSendPlaneLine size={18} />
          </button>
        </form>
      </div>
    </div>
  )
}
