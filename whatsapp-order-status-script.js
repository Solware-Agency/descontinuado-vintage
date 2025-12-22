/**
 * WhatsApp Order Confirmation Script
 * Para pegar en: Settings → Checkout → Order status page → Additional scripts
 * 
 * Este script detecta la Order Status Page, extrae datos del pedido desde Shopify.checkout
 * y muestra un modal con botón de WhatsApp después de 3 segundos.
 */

(function() {
  'use strict';
  
  // Detectar Order Status Page
  function isOrderStatusPage() {
    var path = window.location.pathname.toLowerCase();
    var search = window.location.search.toLowerCase();
    var href = window.location.href.toLowerCase();
    
    return path.includes('/thank_you') || 
           path.includes('/thank-you') ||
           (path.includes('/checkouts/') && (search.includes('thank_you') || search.includes('order_status'))) ||
           href.includes('order_status') ||
           href.includes('order-status');
  }
  
  // Esperar a que Shopify.checkout esté disponible
  function waitForCheckout(callback, maxAttempts) {
    maxAttempts = maxAttempts || 20;
    var attempts = 0;
    var interval = setInterval(function() {
      attempts++;
      if (window.Shopify && window.Shopify.checkout && window.Shopify.checkout.order) {
        clearInterval(interval);
        callback(window.Shopify.checkout);
      } else if (attempts >= maxAttempts) {
        clearInterval(interval);
        callback(null);
      }
    }, 500);
  }
  
  // Construir mensaje de WhatsApp - Mensaje simplificado
  function buildMessage(checkout) {
    if (!checkout || !checkout.order) return '';
    
    return 'Hola, ya estoy lista para concretar el envío.';
  }
  
  // Crear y mostrar modal
  function showModal(message) {
    // Evitar duplicados
    if (document.getElementById('whatsapp-modal-overlay')) {
      return;
    }
    
    var encoded = encodeURIComponent(message);
    var url = 'https://wa.me/584122150171?text=' + encoded;
    
    // Overlay
    var overlay = document.createElement('div');
    overlay.id = 'whatsapp-modal-overlay';
    overlay.style.cssText = 'display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);z-index:999999;justify-content:center;align-items:center;';
    
    // Container
    var container = document.createElement('div');
    container.style.cssText = 'background:#fff;border-radius:8px;padding:30px;margin:20px;max-width:600px;width:90%;max-height:90vh;overflow-y:auto;box-shadow:0 10px 40px rgba(0,0,0,0.3);position:relative;';
    
    // Close button
    var closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Cerrar');
    closeBtn.style.cssText = 'position:absolute;top:15px;right:15px;background:none;border:none;font-size:24px;cursor:pointer;color:#666;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;transition:all 0.3s ease;';
    closeBtn.onmouseover = function() { this.style.background = '#f0f0f0'; this.style.color = '#000'; };
    closeBtn.onmouseout = function() { this.style.background = 'none'; this.style.color = '#666'; };
    closeBtn.onclick = function() { overlay.style.display = 'none'; };
    
    // Title
    var title = document.createElement('h3');
    title.textContent = 'Confirmar Pedido por WhatsApp';
    title.style.cssText = 'font-family:"D-DIN","DIN",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;font-size:18px;font-weight:600;color:#000;text-align:center;margin-bottom:20px;text-transform:uppercase;letter-spacing:0.5px;margin-top:0;';
    
    // Preview
    var preview = document.createElement('div');
    preview.textContent = message;
    preview.style.cssText = 'background:#f5f5f5;border:1px solid #e0e0e0;border-radius:4px;padding:15px;margin-bottom:20px;font-family:"D-DIN","DIN",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;font-size:14px;color:#333;line-height:1.6;white-space:pre-wrap;max-height:300px;overflow-y:auto;';
    
    // WhatsApp Button
    var button = document.createElement('a');
    button.href = url;
    button.target = '_blank';
    button.rel = 'noopener noreferrer';
    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="currentColor" style="width:20px;height:20px;vertical-align:middle;margin-right:8px;display:inline-block;"><path d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"></path><path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"></path><path fill="#fff" fill-rule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clip-rule="evenodd"></path></svg> Enviar por WhatsApp';
    button.style.cssText = 'display:block;width:100%;padding:15px 30px;background:#fff;color:#000;border:2px solid #000;border-radius:4px;font-family:"D-DIN","DIN",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;text-align:center;text-decoration:none;cursor:pointer;box-sizing:border-box;transition:all 0.3s ease;';
    button.onmouseover = function() { this.style.background = '#000'; this.style.color = '#fff'; };
    button.onmouseout = function() { this.style.background = '#fff'; this.style.color = '#000'; };
    button.onclick = function() { setTimeout(function(){overlay.style.display='none';}, 500); };
    
    // Responsive para mobile
    var mobileStyle = document.createElement('style');
    mobileStyle.textContent = '@media (max-width: 767px) { #whatsapp-modal-overlay > div { padding: 20px 15px !important; margin: 15px 0 !important; } #whatsapp-modal-overlay h3 { font-size: 16px !important; } #whatsapp-modal-overlay > div > div:nth-child(3) { font-size: 13px !important; padding: 12px !important; } #whatsapp-modal-overlay a { font-size: 13px !important; padding: 12px 20px !important; } } @media (min-width: 768px) { #whatsapp-modal-overlay a { width: auto !important; min-width: 250px !important; margin: 0 auto !important; display: inline-block !important; } #whatsapp-modal-overlay > div { text-align: center !important; } }';
    document.head.appendChild(mobileStyle);
    
    // Ensamblar
    container.appendChild(closeBtn);
    container.appendChild(title);
    container.appendChild(preview);
    container.appendChild(button);
    overlay.appendChild(container);
    
    // Cerrar al hacer click fuera
    overlay.onclick = function(e) {
      if (e.target === overlay) overlay.style.display = 'none';
    };
    
    document.body.appendChild(overlay);
    
    // Mostrar después de 3 segundos
    setTimeout(function() {
      overlay.style.display = 'flex';
    }, 3000);
  }
  
  // Inicializar solo si estamos en Order Status Page
  if (isOrderStatusPage()) {
    waitForCheckout(function(checkout) {
      if (checkout) {
        var message = buildMessage(checkout);
        if (message) {
          showModal(message);
        }
      }
    }, 20);
  }
})();

