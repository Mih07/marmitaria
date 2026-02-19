import { useState } from 'react'
import './App.css'

function App() {
  // --- ESTADOS ---
  const [carrinho, setCarrinho] = useState([]); 
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');
  
  const total = carrinho.reduce((soma, item) => soma + item.preco, 0);

  // --- DADOS ---
  const restaurante = { nome: "Marmitaria da Déia", cor: "#d66458", fone: "5511987593594" };
  
  const produtos = [
    { id: 1, nome: "Opção 1", precos: {P:22.00, M:25.00, G:28.00}, categoria: "Marmitas", destaque: true, desc: "Arroz, feijão, costela ao molho cremoso. ", imagem: "/costela-molho.png" },
    { id: 2, nome: "Opção 2", precos: {P:22.00, M:25.00, G:28.00}, categoria: "Marmitas", destaque: false, desc: "Arroz, feijão e isca de tilápia empanada.", imagem: "/isca-tilapia.png" },
    { id: 3, nome: "Opção 3", precos: {P:22.00, M:25.00, G:28.00}, categoria: "Marmitas", destaque: false, desc: "Arroz, feijão e filé acebolado.", imagem: "/file-acebolado.png" }, 
    { id: 4, nome: "Coca-Cola", precoFixo: 6.00, categoria: "Bebidas", destaque: true, desc: "Lata 350ml gelada.", imagem: "/coca-cola.png" },
    { id: 5, nome: "Guaraná", precoFixo: 6.00, categoria: "Bebidas", destaque: false, desc: "Lata 350ml gelada.", imagem: "/guarana.png" },
    { id: 6, nome: "Sprite", precoFixo: 6.00, categoria: "Bebidas", destaque: false, desc: "Lata 350ml gelada.", imagem: "/sprite.png" },
    { id: 7, nome: "Fanta Laranja", precoFixo: 6.00, categoria: "Bebidas", destaque: false, desc: "Lata 350ml gelada.", imagem: "/fanta-laranja.png" },
    { id: 8, nome: "H2O", precoFixo: 6.00, categoria: "Bebidas", destaque: false, desc: "Lata 350ml gelada.", imagem: "/h2o.png" },
    { id: 9, nome: "Coca-Cola 2L ", precoFixo: 14.00, categoria: "Bebidas", destaque: false, desc: "Garrafa 2 litros.", imagem: "/coca-cola2.png" },
    { id: 10, nome: "Guaraná 2L ", precoFixo: 12.00, categoria: "Bebidas", destaque: false, desc: "Garrafa 2 litros.", imagem: "/guarana2.png" },
    { id: 11, nome: "Skol ", precoFixo: 5.00, categoria: "Cervejas", destaque: false, desc: "Lata 350 ml gelada.", imagem: "/skol.png" },
  ];

  // --- FUNÇÕES ---
  const adicionarAoCarrinho = (produto, tamanho = null) => {
    let novoItem;
    
    if (tamanho) {
      // Se tiver tamanho (Marmita)
      novoItem = {
        id_unico: `${produto.id}-${tamanho}-${Date.now()}`,
        nome: `${produto.nome} (${tamanho})`,
        preco: produto.precos[tamanho]
      };
    } else {
      // Se não tiver tamanho (Bebida)
      novoItem = {
        id_unico: `${produto.id}-${Date.now()}`,
        nome: produto.nome,
        preco: produto.precoFixo
      };
    }
    
    setCarrinho([...carrinho, novoItem]);
  };

  const enviarWhatsApp = () => {
    const itensPedido = carrinho.map(item => `- ${item.nome}: R$ ${item.preco.toFixed(2)}`).join('\n');
    const mensagem = `Olá! Gostaria de fazer um pedido:\n\n${itensPedido}\n\n*Total: R$ ${total.toFixed(2)}*`;
    const link = `https://wa.me/${restaurante.fone}?text=${encodeURIComponent(mensagem)}`;
    window.open(link, '_blank');
  };

  return (
    <div className="container">
      <header className="header-dinamico">
        <div className="header-content">
          <img src="/logo.png" alt="Logo" className="logo-restaurante" />
          <div className="header-info">
            <h1>{restaurante.nome}</h1>
            <div className="status-container">
              <span className="badge-status">● Aberto</span>
              <span className="tempo-entrega">🕒 30-45 min</span>
            </div>
          </div>
          <div className="carrinho-header" onClick={() => setCarrinhoAberto(!carrinhoAberto)}>
            <span className="icone-carrinho">🛒</span>
            {carrinho.length > 0 && <span className="badge-quantidade">{carrinho.length}</span>}
          </div>
        </div>
      </header>

      <main className="container-cardapio">
        {/* 1. SEÇÃO DE DESTAQUE */}
        <section className="secao-destaque">
          <h2>🔥 Destaques do Dia</h2>
          <div className="scroll-horizontal">
            {produtos.filter(p => p.destaque).map(item => (
              <div key={item.id} className="card-destaque">
                <img src={item.imagem} alt={item.nome} />
                <div className="info-destaque">
                  <h3>{item.nome}</h3>
                  {/* Se for bebida mostra preço fixo, se for marmita mostra o P */}
                  <span>R$ {item.precoFixo ? item.precoFixo.toFixed(2) : item.precos.P.toFixed(2)}</span>
                  <div className="botoes-destaque">
                    {item.categoria === "Marmitas" ? (
                      <>
                        <button onClick={() => adicionarAoCarrinho(item, 'P')}>P</button>
                        <button onClick={() => adicionarAoCarrinho(item, 'M')}>M</button>
                        <button onClick={() => adicionarAoCarrinho(item, 'G')}>G</button>
                      </>
                    ) : (
                      <button className='btn-add-simples' onClick={() => adicionarAoCarrinho(item)}>+</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. FILTRO DE CATEGORIAS */}
        <nav className="filtros">
          {['Todos', 'Marmitas', 'Bebidas', 'Cervejas'].map(cat => (
            <button 
              key={cat}
              className={categoriaAtiva === cat ? 'active' : ''} 
              onClick={() => setCategoriaAtiva(cat)}
            >
              {cat}
            </button>
          ))}
        </nav>

{/* 3. LISTA FILTRADA AGRUPADA */}
<section className="lista-produtos">
  {['Marmitas', 'Bebidas', 'Cervejas']
    .filter(cat => categoriaAtiva === 'Todos' || categoriaAtiva === cat)
    .map(categoria => {
      // Filtra os produtos desta categoria específica
      const produtosDaCategoria = produtos.filter(p => p.categoria === categoria);
      
      // Se não houver produtos na categoria (e não for "Todos"), não renderiza o título
      if (produtosDaCategoria.length === 0) return null;

      return (
        <div key={categoria} className="grupo-categoria">
          <h2 className="titulo-categoria-lista">{categoria}
            {categoria === "Marmitas" && (
              <span className="acompanhamento do dia"> 
              (Acompanhamento: Legumes refogado / Purê de batata.)</span>
            )}
          </h2>
          
          {produtosDaCategoria.map((item) => (
            <div key={item.id} className="card-produto-compacto">
              <div className="area-foto">
                <img src={item.imagem} alt={item.nome} />
              </div>
              
              <div className="info-texto">
                <h3>{item.nome}</h3>
                <p>{item.desc}</p>
                
                {item.categoria === "Marmitas" ? (
                  <div className="acoes-marmita">
                    <strong>R$ {item.precos.P.toFixed(2)}</strong>
                    <div className="seletor-tamanhos-mini">
                      <button onClick={() => adicionarAoCarrinho(item, 'P')}>P</button>
                      <button onClick={() => adicionarAoCarrinho(item, 'M')}>M</button>
                      <button onClick={() => adicionarAoCarrinho(item, 'G')}>G</button>
                    </div>
                  </div>
                ) : (
                  <div className="acoes-bebida">
                    <strong>R$ {item.precoFixo.toFixed(2)}</strong>
                    <button className="btn-add-simples" onClick={() => adicionarAoCarrinho(item)}>+</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      );
    })}
</section>
      </main>

      {/* FOOTER / CARRINHO */}
      {carrinho.length > 0 && (
        <footer className="position-fixed">
          {carrinhoAberto && (
            <div className="revisao-pedido">
              <div className="revisao-header">
                <h3>Seu Pedido</h3>
                <button onClick={() => setCarrinhoAberto(false)}>Fechar [x]</button>
              </div>
              <ul className="itens-revisao">
                {carrinho.map((item, index) => (
                  <li key={index}>
                    <span>{item.nome}</span>
                    <strong>R$ {item.preco.toFixed(2)}</strong>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="total-info" onClick={() => setCarrinhoAberto(!carrinhoAberto)} style={{cursor: 'pointer'}}>
            <span>{carrinhoAberto ? "⬇️ Ocultar" : "⬆️ Ver Itens"}</span>
            <span>Total: <strong>R$ {total.toFixed(2)}</strong></span>
          </div>
          <button className="btn-pedido" onClick={enviarWhatsApp}>
            Finalizar Pedido (WhatsApp)
          </button>
        </footer>
      )}
    </div>
  )
}

export default App
