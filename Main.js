<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Megie's ML Diamonds — Demo Store</title>
  <style>
    :root{--bg:#07060a;--panel:#0f1720;--muted:#94a3b8;--accent:#7c3aed;--accent-2:#06b6d4;--success:#16a34a;--danger:#ef4444}
    *{box-sizing:border-box}
    body{margin:0;font-family:Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;color:#e6eef8;background:linear-gradient(180deg,#050509 0%, #071226 100%);min-height:100vh}
    .container{max-width:1100px;margin:28px auto;padding:20px}
    header{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px}
    h1{font-size:26px;margin:0;letter-spacing:-0.5px}
    .sub{color:var(--muted);font-size:13px}
    .layout{display:grid;grid-template-columns:2fr 1fr;gap:18px}/* panels */
.panel{background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));padding:16px;border-radius:12px;border:1px solid rgba(255,255,255,0.04)}

/* packs grid */
.packs{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px}
.pack{padding:12px;border-radius:10px;background:linear-gradient(135deg, rgba(124,58,237,0.12), rgba(6,182,212,0.06));border:1px solid rgba(124,58,237,0.14);display:flex;flex-direction:column;justify-content:space-between}
.pack .top{display:flex;justify-content:space-between;align-items:center}
.diam{font-size:20px;font-weight:700}
.price{font-size:18px;font-weight:600}
.btn{cursor:pointer;border:0;padding:8px 10px;border-radius:8px;font-weight:600}
.btn-primary{background:linear-gradient(90deg,var(--accent),var(--accent-2));color:white}
.btn-ghost{background:transparent;border:1px solid rgba(255,255,255,0.06);color:var(--muted)}

/* form rows */
.row{display:flex;gap:10px;align-items:center}
.input,select{width:100%;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.06);background:transparent;color:inherit}
label{display:block;font-size:12px;color:var(--muted);margin-bottom:6px}

/* sidebar orders */
.orders-list{max-height:420px;overflow:auto;margin-top:8px}
.order{padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.03);margin-bottom:8px;background:linear-gradient(180deg, rgba(255,255,255,0.01), transparent)}
.order .meta{display:flex;justify-content:space-between;align-items:center}
.badge{font-size:12px;padding:4px 8px;border-radius:999px}
.badge.pending{background:rgba(250,204,21,0.12);color:#f59e0b}
.badge.fulfilled{background:rgba(34,197,94,0.1);color:var(--success)}

/* admin panel */
.admin{margin-top:12px}
.table{width:100%;border-collapse:collapse;margin-top:8px}
.table th,.table td{padding:8px;text-align:left;border-bottom:1px dashed rgba(255,255,255,0.03);font-size:13px}

/* modal & toast */
.modal-back{position:fixed;inset:0;background:rgba(1,2,6,0.6);display:flex;align-items:center;justify-content:center}
.modal{background:var(--panel);padding:18px;border-radius:12px;width:360px;border:1px solid rgba(255,255,255,0.04)}
.toast{position:fixed;right:18px;bottom:18px;background:rgba(0,0,0,0.6);padding:10px 14px;border-radius:10px;border:1px solid rgba(255,255,255,0.03)}

footer{margin-top:20px;color:var(--muted);font-size:12px;text-align:center}

/* responsive */
@media(max-width:880px){.layout{grid-template-columns:1fr}.container{padding:12px}}

  </style>
</head>
<body>
  <div class="container">
    <header>
      <div>
        <h1>Megie's ML Diamonds</h1>
        <div class="sub">Fast demo store — single HTML file (mock payments)</div>
      </div>
      <div style="display:flex;gap:8px;align-items:center">
        <button id="supportBtn" class="btn btn-ghost">Support</button>
        <input id="adminPass" placeholder="Admin passcode" style="padding:8px;border-radius:8px;background:transparent;border:1px solid rgba(255,255,255,0.04);color:inherit" type="password">
        <button id="adminBtn" class="btn btn-primary">Enter Admin</button>
      </div>
    </header><div class="layout">
  <main class="panel">
    <h2 style="margin-top:0">Diamond Packages</h2>
    <div class="packs" id="packs"></div>

    <div style="margin-top:14px" class="panel">
      <h3 style="margin:0 0 10px 0">Player & Payment</h3>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div>
          <label>Player ID</label>
          <input id="playerId" class="input" placeholder="Numeric Player ID (6-14 digits)">
        </div>
        <div>
          <label>Payment Method</label>
          <select id="payment" class="input">
            <option value="upi">UPI (GPay / PhonePe)</option>
            <option value="paytm">Paytm</option>
            <option value="card">Card (Mock)</option>
            <option value="wallet">In-app Wallet</option>
          </select>
        </div>
      </div>

      <div style="margin-top:12px;display:flex;gap:8px;align-items:center">
        <button id="checkoutBtn" class="btn btn-primary">Checkout</button>
        <button id="clearBtn" class="btn btn-ghost">Clear</button>
        <div style="margin-left:auto;color:var(--muted);font-size:13px">Selected: <span id="selectedText">None</span></div>
      </div>

      <div style="margin-top:12px;color:var(--muted);font-size:13px">
        <strong>How it works</strong>
        <ol style="margin:8px 0 0 18px">
          <li>Choose a pack → click Add</li>
          <li>Enter Player ID, choose payment</li>
          <li>Click Checkout — order saved locally (demo)</li>
          <li>Admin can mark fulfilled</li>
        </ol>
      </div>
    </div>
  </main>

  <aside class="panel">
    <h3 style="margin-top:0">Recent Orders</h3>
    <div class="orders-list" id="orders"></div>

    <div class="admin" id="adminPanel" style="display:none">
      <h4 style="margin:8px 0">Admin Panel</h4>
      <div style="font-size:13px;color:var(--muted)">Orders (most recent first)</div>
      <table class="table" id="adminTable"></table>
    </div>
  </aside>
</div>

<footer>Demo store — for production integrate secure backend, payment gateway and authentication.</footer>

  </div>  <!-- modal & toast placeholders -->  <div id="modalRoot"></div>
  <div id="toastRoot"></div>  <script>
    // --- Data ---
    const PACKS = [
      {id:'p1',diamonds:86,price:49},
      {id:'p2',diamonds:172,price:99},
      {id:'p3',diamonds:257,price:149},
      {id:'p4',diamonds:430,price:249},
      {id:'p5',diamonds:720,price:399},
      {id:'p6',diamonds:1488,price:799}
    ];
    const ADMIN_PASS = 'admin123'; // change before sharing publicly

    // --- DOM refs ---
    const packsEl = document.getElementById('packs');
    const selectedText = document.getElementById('selectedText');
    const playerIdEl = document.getElementById('playerId');
    const paymentEl = document.getElementById('payment');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const clearBtn = document.getElementById('clearBtn');
    const ordersEl = document.getElementById('orders');
    const adminBtn = document.getElementById('adminBtn');
    const adminPassEl = document.getElementById('adminPass');
    const adminPanel = document.getElementById('adminPanel');
    const adminTable = document.getElementById('adminTable');
    const modalRoot = document.getElementById('modalRoot');
    const toastRoot = document.getElementById('toastRoot');
    const supportBtn = document.getElementById('supportBtn');

    // --- State ---
    let selected = null;
    let orders = loadOrders();
    let adminMode = false;

    // --- Init ---
    function init(){
      renderPacks();
      renderOrders();
      updateSelectedText();
      supportBtn.addEventListener('click', copySupport);
      checkoutBtn.addEventListener('click', checkout);
      clearBtn.addEventListener('click', clearCart);
      adminBtn.addEventListener('click', toggleAdmin);
    }

    function renderPacks(){
      packsEl.innerHTML='';
      PACKS.forEach(p=>{
        const d = document.createElement('div'); d.className='pack';
        d.innerHTML = `
          <div class="top">
            <div>
              <div class="diam">${p.diamonds} 💎</div>
              <div style="font-size:12px;color:var(--muted)">Best value</div>
            </div>
            <div style="text-align:right">
              <div class="price">₹${p.price}</div>
              <button class="btn btn-primary" data-id="${p.id}" style="margin-top:8px">Add</button>
            </div>
          </div>
        `;
        packsEl.appendChild(d);
      });
      packsEl.querySelectorAll('button[data-id]').forEach(b=>b.addEventListener('click',()=>{
        const id=b.getAttribute('data-id');
        const p = PACKS.find(x=>x.id===id);
        selected = p; updateSelectedText(); toast(`${p.diamonds} Diamonds added to cart`);
      }));
    }

    function updateSelectedText(){
      selectedText.textContent = selected ? `${selected.diamonds} 💎 • ₹${selected.price}` : 'None';
    }

    function validatePlayerId(id){
      return /^\d{6,14}$/.test(id.trim());
    }

    function checkout(){
      if(!selected) return toast('Choose a diamond pack first');
      const pid = playerIdEl.value.trim();
      if(!validatePlayerId(pid)) return toast('Enter a valid numeric Player ID (6-14 digits)');
      const order = {
        orderId: generateOrderId(),
        playerId: pid,
        pack: selected,
        payment: paymentEl.value,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      // show processing modal
      showModal('Processing payment', 'Simulating payment & delivery...');
      setTimeout(()=>{
        hideModal();
        orders.unshift(order);
        saveOrders();
        renderOrders();
        toast(`Order ${order.orderId} placed!`);
        // clear cart
        selected=null; playerIdEl.value=''; updateSelectedText();
      },1000);
    }

    function clearCart(){ selected=null; playerIdEl.value=''; updateSelectedText(); toast('Cart cleared'); }

    function renderOrders(){
      ordersEl.innerHTML='';
      if(orders.length===0){ ordersEl.innerHTML='<div style="color:var(--muted);font-size:13px">No orders yet.</div>'; return; }
      orders.forEach(o=>{
        const div = document.createElement('div'); div.className='order';
        div.innerHTML = `
          <div class="meta">
            <div>
              <div style="font-weight:700">${o.pack.diamonds} 💎 • ₹${o.pack.price}</div>
              <div style="font-size:12px;color:var(--muted)">${o.playerId} • ${new Date(o.createdAt).toLocaleString()}</div>
            </div>
            <div style="text-align:right">
              <div style="font-size:12px">${o.orderId}</div>
              <div style="margin-top:6px"><span class="badge ${o.status==='fulfilled'?'fulfilled':'pending'}">${o.status}</span></div>
            </div>
          </div>
        `;
        if(adminMode && o.status!=='fulfilled'){
          const act = document.createElement('div'); act.style.marginTop='8px';
          const btn = document.createElement('button'); btn.className='btn btn-primary'; btn.textContent='Mark Fulfilled';
          btn.addEventListener('click',()=>{ markFulfilled(o.orderId); });
          act.appendChild(btn); div.appendChild(act);
        }
        ordersEl.appendChild(div);
      });
      renderAdminTable();
    }

    function generateOrderId(){
      const t = Date.now().toString(36).toUpperCase();
      const r = Math.random().toString(36).slice(2,6).toUpperCase();
      return `ML-${t}-${r}`;
    }

    function saveOrders(){ localStorage.setItem('mlbb_orders_v1', JSON.stringify(orders)); }
    function loadOrders(){ try{ const raw = localStorage.getItem('mlbb_orders_v1'); return raw ? JSON.parse(raw) : []; }catch(e){return []} }

    function toggleAdmin(){
      if(adminMode){ adminMode=false; adminPanel.style.display='none'; adminBtn.textContent='Enter Admin'; toast('Exited admin mode'); renderOrders(); return; }
      const pass = adminPassEl.value.trim(); if(pass===ADMIN_PASS){ adminMode=true; adminPanel.style.display='block'; adminBtn.textContent='Exit Admin'; adminPassEl.value=''; toast('Admin mode enabled'); renderOrders(); } else { toast('Enter admin passcode to access admin panel'); }
    }

    function markFulfilled(orderId){
      orders = orders.map(o => o.orderId===orderId ? {...o, status:'fulfilled'} : o);
      saveOrders(); renderOrders(); toast(`${orderId} marked fulfilled`);
    }

    function renderAdminTable(){
      if(!adminMode){ adminTable.innerHTML=''; return; }
      let html = '<thead><tr><th>ID</th><th>Player</th><th>Pack</th><th>Payment</th><th>Status</th><th>Action</th></tr></thead><tbody>';
      orders.forEach(o=>{
        html += `<tr><td style="font-size:12px">${o.orderId}</td><td>${o.playerId}</td><td>${o.pack.diamonds}💎</td><td>${o.payment}</td><td>${o.status}</td><td>${o.status!=='fulfilled' ? '<button class="btn btn-primary" data-act="fulfill" data-id="'+o.orderId+'">Fulfill</button>' : 'Done'}</td></tr>`
      });
      html += '</tbody>';
      adminTable.innerHTML = html;
      adminTable.querySelectorAll('button[data-act]').forEach(b=>b.addEventListener('click',()=>{
        const id = b.getAttribute('data-id'); markFulfilled(id);
      }));
    }

    // modal/toast helpers
    function showModal(title, text){ modalRoot.innerHTML = `<div class="modal-back"><div class="modal"><h3 style="margin:0">${title}</h3><p style="color:var(--muted);margin-top:8px">${text}</p></div></div>`; }
    function hideModal(){ modalRoot.innerHTML=''; }
    function toast(msg){ toastRoot.innerHTML = `<div class="toast">${msg}</div>`; setTimeout(()=>{ toastRoot.innerHTML=''; },2500); }

    // support copy
    function copySupport(){ navigator.clipboard?.writeText('https://t.me/your-support') .then(()=>toast('Support link copied')) .catch(()=>toast('Could not copy — open support manually')); }

    // init app
    init();
  </script></body>
</html>
