function inicializar() {
  return {
    qtdeImagens: 0,
    solicitarImagens() {
      const body = JSON.stringify({ qtdeImagens: this.qtdeImagens })
      fetch('/solicitar-imagens', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body
      })
    }
  }

}