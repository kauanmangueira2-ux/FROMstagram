import { useState } from 'react'
import { RiSearchLine } from 'react-icons/ri'
import estilos from './Cabecalho.module.css'

export default function Cabecalho() {
  const [inputBusca, setInputBusca] = useState('')

  function aoDigitar(evento) {
    setInputBusca(evento.target.value)
  }

  function aoEnviarBusca(evento) {
    evento.preventDefault()
    setInputBusca('')
  }

  return (
    <header className={estilos.cabecalho}>
      <div className={estilos.container}>
        <form className={estilos.busca} onSubmit={aoEnviarBusca}>
          <RiSearchLine size={18} className={estilos.iconeBusca} />
          <input
            className={estilos.inputBusca}
            type="text"
            placeholder="Pesquisar"
            value={inputBusca}
            onChange={aoDigitar}
          />
        </form>
      </div>
    </header>
  )
}
