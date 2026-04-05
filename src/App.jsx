import { useState } from 'react'
import './App.css'
import { Analytics } from "@vercel/analytics/react"; 

function App() {
  // --- ESTADOS ---
  const [carrinho, setCarrinho] = useState([]); 
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');
  const [verSemana, setVerSemana] = useState(false); 
  const [cliente, setCliente] = useState({ nome: '', endereco: '', pagamento: 'Pix' });
  
  const total = carrinho.reduce((soma, item) => soma + item.preco, 0);

    // Exemplo:datas que estarão fechado 'AAAA-MM-DD'
  const datasFechado = [
    '2026-04-05', //domingo
    '2026-04-11', //sábado
    '2026-04-12', //domingo
    '2026-04-21', // Tiradentes
    
  ];

  // --- LÓGICA DE DATA PARA BLOQUEIO ---
  // Substitua a linha do toISOString por esta:
const dataHojeISO = new Date().toLocaleDateString('en-CA'); 
const estaFechadoHoje = datasFechado.includes(dataHojeISO);
  // --- DADOS ---
  const restaurante = { nome: "Marmitaria da Déia", cor: "#d66458", fone: "5511987593594" };
  
  const produtos = [
    //SEGUNDA-FEIRA
    { id: 101, dia:"Segunda-feira", nome: "Opção 1", precos: {P:22.00, M:25.00, G:28.00}, categoria: "Marmitas", destaque: true, desc: "Arroz, feijão, Carne de Panela com batata. ", imagem: "/carne-panela.png" },
    { id: 102, dia:"Segunda-feira", nome: "Opção 2", precos: {P:22.00, M:25.00, G:28.00}, categoria: "Marmitas", destaque: false, desc: "Arroz, feijão e File de frango grelhado.", imagem: "/file-grelhado.png" },
    { id: 103, dia:"Segunda-feira", nome: "Opção 3", precos: {P:22.00, M:25.00, G:28.00}, categoria: "Marmitas", destaque: false, desc: "Arroz, Omelete de queijo.", imagem: "/omelete-queijo.png" }, 
    
    //TERÇA-FEIRA
    { id: 104, dia:"Terça-feira", nome: "Opção 1", precos: {P:22.00, M:25.00, G:28.00}, categoria: "Marmitas", destaque: true, desc: "Arroz, feijão, Pernil em cubos. ", imagem: "/pernil-cubos.png" },
    { id: 105, dia:"Terça-feira", nome: "Opção 2", precos: {P:22.00, M:25.00, G:28.00}, categoria: "Marmitas", destaque: false, desc: "Arroz, feijão e Linuiça de frango Acebolado.", imagem: "/linguicafrango-acebolada.png" },
    { id: 106, dia:"Terça-feira", nome: "Opção 3", precos: {P:22.00, M:25.00, G:28.00}, categoria: "Marmitas", destaque: false, desc: "Arroz, feijão e crepioca de abobrinha.", imagem: "/crepioca-abobrinha.png" }, 
    
    //QUARTA-FEIRA
    { id: 107, dia:"Quarta-feira", nome: "Opção 1", precos: {P:22.00, M:25.00, G:28.00}, categoria: "Marmitas", destaque: true, desc: "Feijoada Completa. ", imagem: "/feijoada.png" },
    { id: 108, dia:"Quarta-feira", nome: "Opção 2", precos: {P:22.00, M:25.00, G:28.00}, categoria: "Marmitas", destaque: false, desc: "Arroz, feijão e Strogonoff de Frango.", imagem: "/strogonoff-frango.png" },
    //{ id: 109, dia:"Quarta-feira", nome: "Opção 3", precos: {P:22.00, M:25.00, G:28.00}, categoria: "Marmitas", destaque: false, desc: "Arroz, feijão e Tilápia Empanada", imagem: "/isca-tilapia.png" }, 
    
    //QUINTA-FEIRA
    { id: 110, dia:"Quinta-feira", nome: "Opção 1", precos: {P:22.00, M:25.00, G:28.00}, categoria: "Marmitas", destaque: false, desc: "Arroz, feijão, Frango Assado. ", imagem: "/frango-assado.png" },
    { id: 111, dia:"Quinta-feira", nome: "Opção 2", precos: {P:22.00, M:25.00, G:28.00}, categoria:"Marmitas", destaque: false, desc:"Arroz feijão e Carne moida com cenoura.", imagem:"/carnemoida-cenoura.png"},
    { id: 112, dia:"Quinta-feira", nome: "Opção 3", precos: {P:22.00, M:25.00, G:28.00}, categoria:"Marmitas", destaque: true, desc:"Arroz feijão e Batata Recheada.", imagem:"/batata-recheada.png"},
    
    //SEXTA-FEIRA
    { id: 113, dia:"Sexta-feira", nome: "Opção 1", precos: {P:22.00, M:25.00, G:28.00}, categoria: "Marmitas", destaque: false, desc: "Arroz, feijão, Panqueca de frango. ", imagem: "/panqueca-frango.png" },
    { id: 114, dia:"Sexta-feira", nome: "Opção 2", precos: {P:24.00, M:28.00, G:30.00}, categoria: "Marmitas", destaque: true, desc: "Arroz, feijão e Contra file acebolado.", imagem: "/contra-file-acebolado.png" },
    { id: 115, dia:"Sexta-feira", nome: "Opção 3", precos: {P:22.00, M:25.00, G:28.00}, categoria: "Marmitas", destaque: false, desc: "Arroz, feijão e Omelete de queijo.", imagem: "/omelete-queijo.png" }, 

    //SÁBADO
    //{ id: 116, dia:"Sábado", nome: "Opção 1", precos: {P:22.00, M:25.00, G:28.00}, categoria: "Marmitas", destaque: true, desc: "Arroz, feijão, Feijoada Completa. ", imagem: "/feijoada.png" },
    //{ id: 117, dia:"Sábado", nome: "Opção 2", precos: {P:22.00, M:25.00, G:28.00}, categoria: "Marmitas", destaque: false, desc: "Arroz, feijão e Parmegiana de Frango.", imagem: "/frango-parmegiana.png" },
    //{ id: 118, dia:"Sábado", nome: "Opção 3", precos: {P:22.00, M:25.00, G:28.00}, categoria: "Marmitas", destaque: false, desc: "Arroz, feijão e Crepioca de queijo.", imagem: "/crepioca-queijo.png" },
    
    //DOMINGO
    //{ id: 119, dia:"Domingo", nome: "Opção 1", precos: {P:22.00, M:25.00, G:28.00}, categoria: "Marmitas", destaque: false, desc: "Arroz, feijão, Sobrecoxa recheada ", imagem: "/sobrecoxa-recheada.png" },
    //{ id: 120, dia:"Domingo", nome: "Opção 2", precos: {P:24.00, M:28.00, G:30.00}, categoria: "Marmitas", destaque: false, desc: "Arroz, feijão e Carne assada.", imagem: "/carne-assada.png" },
    //{ id: 121, dia:"Domingo", nome: "Opção 3", precos: {P:22.00, M:25.00, G:28.00}, categoria: "Marmitas", destaque: true, desc: "Arroz, feijão e Parmegiana de berinjela.", imagem: "/parmegiana-beringela.png" }, 

    { id: 4, nome: "Coca-Cola", precoFixo: 6.00, categoria: "Bebidas", destaque: true, desc: "Lata 350ml gelada.", imagem: "/coca-cola.png" },
    { id: 5, nome: "Guaraná", precoFixo: 6.00, categoria: "Bebidas", destaque: false, desc: "Lata 350ml gelada.", imagem: "/guarana.png" },
    { id: 6, nome: "Sprite", precoFixo: 6.00, categoria: "Bebidas", destaque: false, desc: "Lata 350ml gelada.", imagem: "/sprite.png" },
    { id: 7, nome: "Fanta Laranja", precoFixo: 6.00, categoria: "Bebidas", destaque: false, desc: "Lata 350ml gelada.", imagem: "/fanta-laranja.png" },
    { id: 8, nome: "H2O", precoFixo: 6.00, categoria: "Bebidas", destaque: false, desc: "Lata 350ml gelada.", imagem: "/h2o.png" },
    { id: 9, nome: "Coca-Cola 2L ", precoFixo: 14.00, categoria: "Bebidas", destaque: false, desc: "Garrafa 2 litros.", imagem: "/coca-cola2.png" },
    { id: 10, nome: "Guaraná 2L ", precoFixo: 12.00, categoria: "Bebidas", destaque: false, desc: "Garrafa 2 litros.", imagem: "/guarana2.png" },
    { id: 11, nome: "Skol ", precoFixo: 5.00, categoria: "Cervejas", destaque: false, desc: "Lata 350 ml gelada.", imagem: "/skol.png" },
    { id: 12, nome: "Império Puro Malte ", precoFixo: 5.00, categoria: "Cervejas", destaque: false, desc: "Lata 350 ml gelada.", imagem: "/imperio350ml.png" },
    { id: 13, nome: "Império Puro Malte ", precoFixo: 6.00, categoria: "Cervejas", destaque: false, desc: "Lata 473 ml gelada.", imagem: "/imperio473ml.png" },
    { id: 14, nome: "Itaipava ", precoFixo: 5.00, categoria: "Cervejas", destaque: false, desc: "Lata 350 ml gelada.", imagem: "/itaipava350ml.png" },

    // ADICIONAIS PROGRAMADOS
    { id: 301, dia:"Domingo", nome: "Feijão Tropeiro", precoFixo: 40.00, categoria: "Adicionais", destaque: false, desc: "kilo.", imagem: "/feijao-tropeiro.png" },
    { id: 302, dia:"Domingo", nome: "Salada de Maionese", precoFixo: 35.00, categoria: "Adicionais", destaque: false, desc: "kilo.", imagem: "/salada-maionese.png" },

    // SOBREMESAS PROGRAMADAS
    { id: 201, dia:"Domingo", nome: "Pudim 200 ml", precoFixo: 8.00, categoria: "Sobremesas", destaque: false, desc: "200 ml.", imagem: "/pudim200.png" },
    { id: 202, dia:"Domingo", nome: "Pudim 500 ml", precoFixo: 12.00, categoria: "Sobremesas", destaque: false, desc: "500 ml.", imagem: "/pudim500.png" },
    { id: 203, dia:"Domingo", nome: "Pudim Família", precoFixo: 60.00, categoria: "Sobremesas", destaque: false, desc: "1.500 kilo.", imagem: "/pudim-familia.png" },
    { id: 204, dia:"Domingo", nome: "Bolo de Brigadeiro", precoFixo: 14.00, categoria: "Sobremesas", destaque: false, desc: "Pote 200 ml.", imagem: "/bolobrigadeiro200.png" },
    { id: 205, dia:"Domingo", nome: "Bolo de Ninho com Morango", precoFixo: 14.00, categoria: "Sobremesas", destaque: false, desc: "Pote 200 ml.", imagem: "/bolopotemorango.png" },
    { id: 206, dia:"Domingo", nome: "Bolo de Brigadeiro", precoFixo: 10.00, categoria: "Sobremesas", destaque: false, desc: "Corte unidade", imagem: "/bolocorte.png" },
  ];

  // --- FUNÇÕES ---
  const adicionarAoCarrinho = (produto, tamanho = null) => {
    // BLOQUEIO ADICIONAL: Impede adicionar ao carrinho via código se estiver fechado
    if (estaFechadoHoje) return;

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

  const removerDoCarrinho = (idUnico) => {
    const novoCarrinho = carrinho.filter(item => item.id_unico !== idUnico);
    setCarrinho(novoCarrinho);
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
    "Segunda-feira": "Farofa / legumes cozido.",
    "Terça-feira": "Macarrão caipira / farofa.",
    "Quarta-feira": "Vinagrete / farofa / couve refogada.",
    "Quinta-feira": " Repolho colorido / macarrão ao sugo",
    "Sexta-feira": "Batata frita / chuchu refogado.",
    //"Sábado": "",
    //"Domingo": "",
  };

  return (
    <div className="container">
      <Analytics />
      <header className="header-dinamico">
        <div className="header-content">
          <img src="/logo.png" alt="Logo" className="logo-restaurante" />
          <div className="header-info">
            <h1>{restaurante.nome}</h1>
            <div className="status-container">
              {/* MUDANÇA: Status muda de cor e texto se estiver fechado */}
              <span className="badge-status" style={{ backgroundColor: estaFechadoHoje ? '#777' : '#28a745' }}>
                ● {estaFechadoHoje ? 'Fechado' : 'Aberto'}
              </span>
              <span className="tempo-entrega">🕒 {estaFechadoHoje ? 'Hoje não abriremos' : '30-45 min'}</span>
            </div>
          </div>
          <div className="carrinho-header" onClick={() => setCarrinhoAberto(!carrinhoAberto)}>
            <span className="icone-carrinho">🛒</span>
            {carrinho.length > 0 && <span className="badge-quantidade">{carrinho.length}</span>}
          </div>
        </div>
      </header>

      <main className="container-cardapio">
        
        {/* AVISO DE FECHAMENTO (Opcional: aparece apenas se hoje estiver na lista) */}
        {estaFechadoHoje && (
          <div className="aviso-fechado" style={{
            background: '#fff3cd', color: '#856404', padding: '10px', 
            borderRadius: '8px', textAlign: 'center', marginBottom: '15px', border: '1px solid #ffeeba'
          }}>
            📍 Não estamos recebendo pedidos hoje.
          </div>
        )}

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
                          <button disabled={estaFechadoHoje} onClick={() => adicionarAoCarrinho(item, 'P')}>P</button>
                          <button disabled={estaFechadoHoje} onClick={() => adicionarAoCarrinho(item, 'M')}>M</button>
                          <button disabled={estaFechadoHoje} onClick={() => adicionarAoCarrinho(item, 'G')}>G</button>
                        </>
                      ) : (
                        <button disabled={estaFechadoHoje} className='btn-add-simples' onClick={() => adicionarAoCarrinho(item)}>+</button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>

        <nav className="filtros">
          {['Todos', 'Marmitas', 'Adicionais', 'Sobremesas', 'Bebidas', 'Cervejas'].map(cat => (
            <button key={cat} className={categoriaAtiva === cat ? 'active' : ''} onClick={() => setCategoriaAtiva(cat)}>
              {cat}
            </button>
          ))}
        </nav>

    <section className="lista-produtos">
  {['Marmitas', 'Adicionais', 'Sobremesas', 'Bebidas', 'Cervejas']
    .filter(cat => categoriaAtiva === 'Todos' || categoriaAtiva === cat)
    .map(categoria => {
      const produtosDaCategoria = produtos.filter(p => p.categoria === categoria);
      const produtosExibidosVenda = produtosDaCategoria.filter(p => {
        if (categoria === "Marmitas") return p.dia === hojeGlobal;
        return true; 
      });

      if (produtosDaCategoria.length === 0) return null;

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

          {produtosExibidosVenda.map((item) => {
            const diasLiberadosSobr = ["Quinta-feira", "Sexta-feira", "Sábado", "Domingo"];

            const liberadoVenda = 
              !estaFechadoHoje && (
                !item.dia || 
                item.dia === hojeGlobal || 
                (item.categoria === "Sobremesas" && diasLiberadosSobr.includes(hojeGlobal))
              );

            return (
              <div key={item.id} className="card-produto-compacto" style={{ opacity: liberadoVenda ? 1 : 0.8 }}>
                <div className="area-foto"><img src={item.imagem} alt={item.nome} /></div>
                
                <div className="info-texto">
                  <h3>{item.nome}</h3>
                  <p>{item.desc}</p>
                  
                  {item.categoria === "Sobremesas" ? (
                    <div style={{ color: '#d66458', fontSize: '0.75rem', fontWeight: 'bold', margin: '4px 0' }}>
                      🕒 Disponível: Quinta a Domingo
                    </div>
                  ) : item.categoria === "Adicionais" ? (
                    <div style={{ color: '#666', fontSize: '0.75rem', fontWeight: 'bold', margin: '4px 0' }}>
                      🕒 Disponível: Somente Domingo
                    </div>
                  ) : (
                    item.dia && item.dia !== hojeGlobal && (
                      <div style={{ color: '#666', fontSize: '0.75rem', fontWeight: 'bold', margin: '4px 0' }}>
                        🕒 Disponível: {item.dia}
                      </div>
                    )
                  )}

                  <div className={item.categoria === "Marmitas" ? "acoes-marmita" : "acoes-bebida"}>
                    <strong>R$ {item.precoFixo ? item.precoFixo.toFixed(2) : item.precos.P.toFixed(2)}</strong>
                    
                    {item.categoria === "Marmitas" ? (
                      <div className="seletor-tamanhos-mini">
                        <button disabled={!liberadoVenda} onClick={() => adicionarAoCarrinho(item, 'P')}>P</button>
                        <button disabled={!liberadoVenda} onClick={() => adicionarAoCarrinho(item, 'M')}>M</button>
                        <button disabled={!liberadoVenda} onClick={() => adicionarAoCarrinho(item, 'G')}>G</button>
                      </div>
                    ) : (
                      <button 
                        className="btn-add-simples" 
                        disabled={!liberadoVenda}
                        onClick={() => liberadoVenda && adicionarAoCarrinho(item)}
                        style={{ 
                          backgroundColor: liberadoVenda ? restaurante.cor : '#b0b8d1',
                          cursor: liberadoVenda ? 'pointer' : 'not-allowed'
                        }}
                      >
                        {liberadoVenda ? '+' : '🔒'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* LISTA SEMANAL ATUALIZADA - APENAS "FECHADO" */}
          {categoria === "Marmitas" && verSemana && (
            <div className="cardapio-semanal-expansivel" style={{ marginTop: '20px', padding: '15px', backgroundColor: '#fdf2f0', borderRadius: '12px', border: '1px solid #d66458' }}>
              <h4 style={{ color: '#d66458', marginBottom: '15px' }}>📅 Conferência do Cardápio Semanal- 06 à 11/04</h4>
              {diasSemana.map(diaSemana => {
                
                const hoje = new Date();
                const indiceHoje = hoje.getDay();
                const diasDeSemanaNomes = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
                const indiceAlvo = diasDeSemanaNomes.indexOf(diaSemana);
                const diferenca = indiceAlvo - indiceHoje;
                const dataReferencia = new Date();
                dataReferencia.setDate(hoje.getDate() + diferenca);
                const dataISO = dataReferencia.toISOString().split('T')[0];
                
                const diaEstaFechado = datasFechado.includes(dataISO);

                return (
                  <div key={diaSemana} style={{ marginBottom: '20px', borderBottom: '1px dashed #ccc', paddingBottom: '15px', opacity: diaEstaFechado ? 0.6 : 1 }}>
                    <h5 style={{ margin: '0 0 10px 0', color: diaEstaFechado ? '#d66458' : '#333', fontSize: '1.1rem' }}>
                      {diaSemana} {diaSemana === hojeGlobal ? "(HOJE ⭐)" : ""}
                      {/* TEXTO ALTERADO AQUI EMBAIXO: Tirei o "(FERIADO)" */}
                      {diaEstaFechado && <span style={{ marginLeft: '10px', fontSize: '0.8rem', fontWeight: 'bold' }}>🚫 FECHADO</span>}
                    </h5>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '10px' }}>
                      {produtos.filter(p => {
                        if (p.dia === diaSemana) return true;
                        const diasExtrasSobremesa = ["Quinta-feira", "Sexta-feira", "Sábado"]; 
                        if (p.categoria === "Sobremesas" && diasExtrasSobremesa.includes(diaSemana)) return true;
                        return false;
                      }).map(p => {
                        const diasLiberadosSobr = ["Quinta-feira", "Sexta-feira", "Sábado", "Domingo"]; 
                        const estaTrancado = diaEstaFechado ||
                          (p.categoria === "Sobremesas" && !diasLiberadosSobr.includes(diaSemana)) ||
                          (p.categoria === "Adicionais" && diaSemana !== "Domingo");

                        return (
                          <div key={p.id} style={{ textAlign: 'center', backgroundColor: '#fff', padding: '5px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', position: 'relative' }}>
                            {estaTrancado && <span style={{ position: 'absolute', top: '5px', right: '5px', fontSize: '0.8rem' }}>🔒</span>}
                            <img src={p.imagem} alt={p.nome} style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '5px', filter: estaTrancado ? 'grayscale(100%)' : 'none', opacity: estaTrancado ? 0.6 : 1 }} />
                            <p style={{ fontSize: '0.7rem', fontWeight: 'bold', margin: '5px 0' }}>{p.nome}</p>
                            <span style={{ fontSize: '0.6rem', color: '#666' }}>({p.categoria})</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
    })}
</section>
        
      </main>

      {carrinho.length > 0 && (
       <footer className="footer-carrinho">
          {carrinhoAberto && (
            <div className="revisao-pedido">
              <div className="revisao-header">
                <h3>Seu Pedido</h3>
                <button className="btn-fechar" onClick={() => setCarrinhoAberto(false)}>Fechar [x]</button>
              </div>

              <ul className="itens-revisao">
                {carrinho.map((item) => (
                  <li key={item.id_unico} className="item-carrinho-linha">
                    <div className="info-item-texto">
                      <span className="nome-item-revisao">{item.nome}</span>
                      <strong className="preco-item-revisao">R$ {item.preco.toFixed(2)}</strong>
                    </div>
                    <button className="btn-remover-item" onClick={() => removerDoCarrinho(item.id_unico)}>🗑️</button>
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

          <div className="total-info" onClick={() => setCarrinhoAberto(!carrinhoAberto)}>
            <span>{carrinhoAberto ? "⬇️ Ocultar Itens" : "⬆️ Ver Itens do Pedido"}</span>
            <span>Total: <strong>R$ {total.toFixed(2)}</strong></span>
          </div>
          
          <button className="btn-pedido" onClick={enviarWhatsApp}>
            Finalizar pelo WhatsApp
          </button>
        </footer>
      )}
    </div>
  )
}

export default App