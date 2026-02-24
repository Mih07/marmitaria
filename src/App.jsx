import { useState } from 'react'
import './App.css'

function App() {
  // --- ESTADOS ---
  const [carrinho, setCarrinho] = useState([]); 
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');
  const [verSemana, setVerSemana] = useState(false); 
  const [cliente, setCliente] = useState({ nome: '', endereco: '', pagamento: 'Pix' });
  
  const total = carrinho.reduce((soma, item) => soma + item.preco, 0);

  // --- DADOS ---
  const restaurante = { nome: "Marmitaria da Déia", cor: "#d66458", fone: "5511987593594" };
  
  const produtos = [
    //SEGUNDA-FEIRA
    { id: 101, dia:"Segunda-feira", nome: "Opção 1", precos: {P:22.00, M:25.00, G:28.00}, categoria: "Marmitas", destaque: false, desc: "Arroz, feijão, linguiça refogada com batatas. ", imagem: "/opcao1.png" },
    { id: 102, dia:"Segunda-feira", nome: "Opção 2", precos: {P:22.00, M:25.00, G:28.00}, categoria: "Marmitas", destaque: false, desc: "Arroz, feijão e filé de frango gralhado.", imagem: "/opcao2.png" },
    { id: 103, dia:"Segunda-feira", nome: "Opção 3", precos: {P:22.00, M:25.00, G:28.00}, categoria: "Marmitas", destaque: true, desc: "Arroz, feijão e feijoada completa.", imagem: "/opcao3.png" }, 
    
    //TERÇA-FEIRA
    { id: 104, dia:"Terça-feira", nome: "Opção 1", precos: {P:22.00, M:25.00, G:28.00}, categoria: "Marmitas", destaque: false, desc: "Arroz, feijão, Escondidinho de carne moída. ", imagem: "/escondidinho-carne.png" },
    { id: 105, dia:"Terça-feira", nome: "Opção 2", precos: {P:22.00, M:25.00, G:28.00}, categoria: "Marmitas", destaque: false, desc: "Arroz, feijão e Panqueca de frango.", imagem: "/panqueca-frango.png" },
    { id: 106, dia:"Terça-feira", nome: "Opção 3", precos: {P:24.00, M:28.00, G:30.00}, categoria: "Marmitas", destaque: true, desc: "Arroz, feijão e Contra filé acebolado.", imagem: "/contra-file-acebolado.png" }, 
    
    //QUARTA-FEIRA
    { id: 107, dia:"Quarta-feira", nome: "Opção 1", precos: {P:22.00, M:25.00, G:28.00}, categoria: "Marmitas", destaque: true, desc: "Feijoada Completa. ", imagem: "/opcao3.png" },
    { id: 108, dia:"Quarta-feira", nome: "Opção 2", precos: {P:22.00, M:25.00, G:28.00}, categoria: "Marmitas", destaque: false, desc: "Arroz, feijão e Strogonoff de frango.", imagem: "/strogonoff-frango.png" },
    { id: 109, dia:"Quarta-feira", nome: "Opção 3", precos: {P:22.00, M:25.00, G:28.00}, categoria: "Marmitas", destaque: false, desc: "Arroz, feijão e Contra filé com ovo.", imagem: "/contra-file-ovo.png" }, 
    
    //QUINTA-FEIRA
    { id: 110, dia:"Quinta-feira", nome: "Opção 1", precos: {P:22.00, M:25.00, G:28.00}, categoria: "Marmitas", destaque: false, desc: "Arroz, feijão, Coxa sobrecoxa assada. ", imagem: "/coxa-sobrecoxa-assada.png" },
    { id: 111, dia:"Quinta-feira", nome: "Opção 2", precos: {P:22.00, M:25.00, G:28.00}, categoria:"Marmitas", destaque: true , desc:"Arroz feijão e Panqueca de carne.", imagem:"/panqueca-carne.png"},
    { id: 112, dia:"Quinta-feira", nome: "Opção 3", precos: {P:22.00, M:25.50, G:38.00}, categoria:"Marmitas", destaque:false , desc:"Arroz feijão e Linguiça acebolada.", imagem:"/linguica-acebolada.png"},
    
    //SEXTA-FEIRA
    { id: 113, dia:"Sexta-feira", nome: "Opção 1", precos: {P:22.00, M:25.00, G:28.00}, categoria: "Marmitas", destaque: false, desc: "Arroz, feijão, Lasanha de frango. ", imagem: "/lasanha-frango.png" },
    { id: 114, dia:"Sexta-feira", nome: "Opção 2", precos: {P:22.00, M:25.00, G:28.00}, categoria: "Marmitas", destaque: true, desc: "Arroz, feijão e Costela com batatas.", imagem: "/costela-batata.png" },
    { id: 115, dia:"Sexta-feira", nome: "Opção 3", precos: {P:22.00, M:25.00, G:28.00}, categoria: "Marmitas", destaque: false, desc: "Arroz, feijão e Crepioca ou omelete com queijo.", imagem: "/crepioca/omelete.png" }, 

    //SÁBADO
    { id: 116, dia:"Sábado", nome: "Opção 1", precos: {P:22.00, M:25.00, G:28.00}, categoria: "Marmitas", destaque: true, desc: "Arroz, feijão, Feijoada Completa. ", imagem: "/opcao3.png" },
    { id: 117, dia:"Sábado", nome: "Opção 2", precos: {P:22.00, M:25.00, G:28.00}, categoria: "Marmitas", destaque: false, desc: "Arroz, feijão e Frango a milanesa com purê de queijo.", imagem: "/filemilanesa-pureq.png" },
    
    //DOMINGO
    { id: 118, dia:"Domingo", nome: "Opção 1", precos: {P:22.00, M:25.00, G:28.00}, categoria: "Marmitas", destaque: true, desc: "Arroz, feijão, Lasanha bolonhesa. ", imagem: "/lasanha-bolonhesa.png" },
    { id: 119, dia:"Domingo", nome: "Opção 2", precos: {P:22.00, M:25.00, G:28.00}, categoria: "Marmitas", destaque: false, desc: "Arroz, feijão e Carne assada.", imagem: "/carne-assada.png" },
    { id: 120, dia:"Domingo", nome: "Opção 3", precos: {P:22.00, M:25.00, G:30.00}, categoria: "Marmitas", destaque: false, desc: "Arroz, feijão e Frango parmegiana.", imagem: "/frango-parmegiana.png" }, 

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
      novoItem = {
        id_unico: `${produto.id}-${tamanho}-${Date.now()}`,
        nome: `${produto.nome} (${tamanho})`,
        preco: produto.precos[tamanho]
      };
    } else {
      novoItem = {
        id_unico: `${produto.id}-${Date.now()}`,
        nome: produto.nome,
        preco: produto.precoFixo
      };
    }
    setCarrinho([...carrinho, novoItem]);
  };

  const enviarWhatsApp = () => {
    if (!cliente.nome || !cliente.endereco) {
      alert("Por favor, preencha nome e endereço!");
      return;
    }
    const itensPedido = carrinho.map(item => `- ${item.nome}: R$ ${item.preco.toFixed(2)}`).join('\n');
    const mensagem = encodeURIComponent(`*NOVO PEDIDO* 📋\n------------------------------\n*Cliente:* ${cliente.nome}\n*Endereço:* ${cliente.endereco}\n*Pagamento:* ${cliente.pagamento}\n------------------------------\n*Itens:*\n${itensPedido}\n\n*Total: R$ ${total.toFixed(2)}*`);
    window.open(`https://wa.me/${restaurante.fone}?text=${mensagem}`, '_blank');
  };

  // --- LÓGICA DO CARDÁPIO DO DIA ---
  const diasSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
  const hojeGlobal = diasSemana[new Date().getDay()];

  const acompanhamentosDaSemana = {
    "Segunda-feira": "Virado de couve e ovo frito.",
    "Terça-feira": "legumes misto e farofa.",
    "Quarta-feira": "farofa, macarrão e legumes.",
    "Quinta-feira": " farofa, macarrão e legumes.",
    "Sexta-feira": "batata frita.",
    "Sábado": "batata frita.",
    "Domingo": "batata frita."
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
        <section className="secao-destaque">
          <h2>🔥 Destaques do Dia</h2>
          <div className="scroll-horizontal">
            {produtos
              .filter(p => p.destaque && (!p.dia || p.dia === hojeGlobal))
              .map(item => (
                <div key={item.id} className="card-destaque">
                  <img src={item.imagem} alt={item.nome} />
                  <div className="info-destaque">
                    <h3>{item.nome}</h3>
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

        <nav className="filtros">
          {['Todos', 'Marmitas', 'Bebidas', 'Cervejas'].map(cat => (
            <button key={cat} className={categoriaAtiva === cat ? 'active' : ''} onClick={() => setCategoriaAtiva(cat)}>
              {cat}
            </button>
          ))}
        </nav>

        <section className="lista-produtos">
          {['Marmitas', 'Bebidas', 'Cervejas']
            .filter(cat => categoriaAtiva === 'Todos' || categoriaAtiva === cat)
            .map(categoria => {
              const produtosExibidos = produtos.filter(p => {
                if (p.categoria === "Marmitas") {
                  return (categoria === "Marmitas") && p.dia === hojeGlobal;
                }
                return p.categoria === categoria;
              });

              if (produtosExibidos.length === 0 && categoria !== "Marmitas") return null;

              return (
                <div key={categoria} className="grupo-categoria">
                  <h2 className="titulo-categoria-lista">
                    {categoria}
                    {categoria === "Marmitas" && (
                      <div className="container-acompanhamentos">
                        <span className="hoje-badge">Cardápio de Hoje ({hojeGlobal})</span>
                        <span className="acompanhamentos-dia">
                          * Acompanha: {acompanhamentosDaSemana[hojeGlobal]}
                        </span>
                        <button className="btn-ver-semana" onClick={() => setVerSemana(!verSemana)}>
                          {verSemana ? "⬅️ Ver menos" : "📅 Ver Cardápio da Semana"}
                        </button>
                      </div>
                    )}
                  </h2>

                  {produtosExibidos.map((item) => (
                    <div key={item.id} className="card-produto-compacto">
                      <div className="area-foto"><img src={item.imagem} alt={item.nome} /></div>
                      <div className="info-texto">
                        <h3>{item.nome}</h3>
                        <p>{item.desc}</p>
                        <div className={item.categoria === "Marmitas" ? "acoes-marmita" : "acoes-bebida"}>
                          <strong>R$ {item.precoFixo ? item.precoFixo.toFixed(2) : item.precos.P.toFixed(2)}</strong>
                          {item.categoria === "Marmitas" ? (
                            <div className="seletor-tamanhos-mini">
                              <button onClick={() => adicionarAoCarrinho(item, 'P')}>P</button>
                              <button onClick={() => adicionarAoCarrinho(item, 'M')}>M</button>
                              <button onClick={() => adicionarAoCarrinho(item, 'G')}>G</button>
                            </div>
                          ) : (
                            <button className="btn-add-simples" onClick={() => adicionarAoCarrinho(item)}>+</button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* LISTA EXPANSÍVEL DA SEMANA COM IMAGENS PARA CONFERÊNCIA */}
{categoria === "Marmitas" && verSemana && (
  <div className="cardapio-semanal-expansivel" style={{ marginTop: '20px', padding: '15px', backgroundColor: '#fdf2f0', borderRadius: '12px', border: '1px solid #d66458' }}>
    <h4 style={{ color: '#d66458', marginBottom: '15px' }}>📅 Conferência do Cardápio Semanal</h4>
    {diasSemana.map(diaSemana => (
      <div key={diaSemana} style={{ marginBottom: '20px', borderBottom: '1px dashed #ccc', paddingBottom: '15px' }}>
        <h5 style={{ margin: '0 0 10px 0', color: '#333', fontSize: '1.1rem' }}>
          {diaSemana} {diaSemana === hojeGlobal ? "(HOJE ⭐)" : ""}
        </h5>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '10px' }}>
          {produtos.filter(p => p.dia === diaSemana).map(p => (
            <div key={p.id} style={{ textAlign: 'center', backgroundColor: '#fff', padding: '5px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <img 
                src={p.imagem} 
                alt={p.nome} 
                style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '5px' }} 
                onError={(e) => e.target.src = 'https://via.placeholder.com/150?text=Sem+Foto'} 
              />
              <p style={{ fontSize: '0.75rem', fontWeight: 'bold', margin: '5px 0' }}>{p.nome}</p>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
)}
                </div>
              );
            })}
        </section>
      </main>

      {/* FOOTER DO CARRINHO */}
      {carrinho.length > 0 && (
        <footer className="footer-carrinho">
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
              <div className="dados-cliente">
                <h4>Dados para Entrega</h4>
                <input type="text" placeholder="Seu Nome" value={cliente.nome} onChange={(e) => setCliente({...cliente, nome: e.target.value})} />
                <input type="text" placeholder="Endereço Completo" value={cliente.endereco} onChange={(e) => setCliente({...cliente, endereco: e.target.value})} />
                <select value={cliente.pagamento} onChange={(e) => setCliente({...cliente, pagamento: e.target.value})}>
                  <option value="Pix">Pix</option>
                  <option value="Cartão">Cartão</option>
                  <option value="Dinheiro">Dinheiro</option>
                </select>
              </div>
            </div>
          )}
          <div className="total-info" onClick={() => setCarrinhoAberto(!carrinhoAberto)} style={{cursor: 'pointer'}}>
            <span>{carrinhoAberto ? "⬇️ Ocultar Itens" : "⬆️ Ver Itens do Pedido"}</span>
            <span>Total: <strong>R$ {total.toFixed(2)}</strong></span>
          </div>
          <button className="btn-pedido" onClick={enviarWhatsApp}>Finalizar pelo WhatsApp</button>
        </footer>
      )}
    </div>
  )
}

export default App