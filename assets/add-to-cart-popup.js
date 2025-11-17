(function() {
  'use strict';

  // Variables globales para gestión del popup (disponibles inmediatamente)
  var reactPopupRoot = null;
  var reactPopupTimeout = null;
  var reactPopupCloseTimeout = null;
  var isInitialized = false;

  // Componentes React (se definen cuando React esté disponible)
  var CheckCircleIcon, AddToCartPopup;

  // Función para limpiar estado previo
  function cleanupPreviousPopup() {
    // Limpiar timeout de autocierre
    if (reactPopupTimeout) {
      clearTimeout(reactPopupTimeout);
      reactPopupTimeout = null;
    }

    // Limpiar timeout de cierre
    if (reactPopupCloseTimeout) {
      clearTimeout(reactPopupCloseTimeout);
      reactPopupCloseTimeout = null;
    }

    // Desmontar root React anterior si existe
    if (reactPopupRoot) {
      try {
        reactPopupRoot.unmount();
      } catch (e) {
        console.warn('Error al desmontar root React anterior:', e);
      }
      reactPopupRoot = null;
    }

    // Limpiar contenido del contenedor
    var container = document.getElementById('react-addtocart-popup');
    if (container) {
      container.innerHTML = '';
    }
  }

  // Función para cerrar el popup con fade-out (expuesta globalmente)
  window.closeAddToCartPopup = function() {
    var popupContent = document.querySelector('.product-popup .react-addtocart-popup-content');
    
    if (popupContent) {
      // Agregar clase de fade-out
      popupContent.style.transition = 'opacity 0.3s ease-out';
      popupContent.style.opacity = '0';
    }

    // Esperar 300ms para completar animación
    reactPopupCloseTimeout = setTimeout(function() {
      // Desmontar root React
      if (reactPopupRoot) {
        try {
          reactPopupRoot.unmount();
        } catch (e) {
          console.warn('Error al desmontar root React:', e);
        }
        reactPopupRoot = null;
      }

      // Ejecutar hidePopup solo para .product-popup
      if (typeof hidePopup === 'function') {
        hidePopup('.product-popup');
      } else if (typeof jQuery !== 'undefined' && jQuery.fn.removeClass) {
        jQuery('.product-popup').removeClass('active');
      }

      // Limpiar contenedor
      var container = document.getElementById('react-addtocart-popup');
      if (container) {
        container.innerHTML = '';
      }

      // Limpiar timeouts
      if (reactPopupTimeout) {
        clearTimeout(reactPopupTimeout);
        reactPopupTimeout = null;
      }
      reactPopupCloseTimeout = null;
    }, 300);
  };

  // Función principal para mostrar el popup React (expuesta globalmente)
  window.showAddToCartReactPopup = function() {
    console.log('showAddToCartReactPopup llamado');
    
    // Verificar que React esté disponible
    if (typeof React === 'undefined' || typeof ReactDOM === 'undefined') {
      console.error('React o ReactDOM no están disponibles');
      // Fallback: mostrar popup vacío
      if (typeof showPopup === 'function') {
        showPopup('.product-popup');
      } else if (typeof jQuery !== 'undefined' && jQuery.fn.addClass) {
        jQuery('.product-popup').addClass('active');
      }
      return;
    }

    // Inicializar componentes si no están inicializados
    if (!isInitialized) {
      initComponents();
    }

    // Limpiar estado previo
    cleanupPreviousPopup();

    // Obtener contenedor
    var container = document.getElementById('react-addtocart-popup');
    if (!container) {
      console.error('Contenedor #react-addtocart-popup no encontrado');
      return;
    }

    console.log('Montando componente React...');

    // Crear root React
    try {
      reactPopupRoot = ReactDOM.createRoot(container);
      
      // Renderizar componente
      reactPopupRoot.render(React.createElement(AddToCartPopup));
      console.log('Componente React montado correctamente');

      // Mostrar popup (usar función global del theme)
      if (typeof showPopup === 'function') {
        showPopup('.product-popup');
      } else if (typeof jQuery !== 'undefined' && jQuery.fn.addClass) {
        jQuery('.product-popup').addClass('active');
      }

      // Programar autocierre después de 4.5 segundos
      reactPopupTimeout = setTimeout(function() {
        window.closeAddToCartPopup();
      }, 4500);

    } catch (e) {
      console.error('Error al montar componente React:', e);
    }
  };

  // Función para inicializar componentes React
  function initComponents() {
    if (isInitialized) return;
    if (typeof React === 'undefined' || typeof ReactDOM === 'undefined') {
      return;
    }

    // Componente CheckCircle Icon
    CheckCircleIcon = function(props) {
      return React.createElement('svg', Object.assign({
        xmlns: 'http://www.w3.org/2000/svg',
        width: '24',
        height: '24',
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
      }, props), 
        React.createElement('path', { d: 'M22 11.08V12a10 10 0 1 1-5.93-9.14' }),
        React.createElement('polyline', { points: '22 4 12 14.01 9 11.01' })
      );
    };

    // Componente principal AddToCartPopup
    AddToCartPopup = function() {
      return React.createElement(React.Fragment, null,
        React.createElement('div', {
          className: 'react-addtocart-popup-content',
          style: {
            position: 'relative',
            width: '100%',
            maxWidth: '500px',
            background: '#fff',
            borderRadius: '24px',
            padding: '64px 48px',
            textAlign: 'center',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            animation: 'fadeInZoom 0.5s ease-out',
            zIndex: 9999
          }
        },
          // Check animado
          React.createElement('div', {
            style: {
              padding: '16px',
              background: 'rgba(33, 37, 41, 0.1)',
              borderRadius: '50%',
              display: 'inline-block',
              marginBottom: '24px',
              animation: 'zoomIn 0.5s ease-out 0.3s both'
            }
          },
            React.createElement('div', {
              style: {
                animation: 'zoomIn 0.5s ease-out 0.5s both'
              }
            },
            React.createElement(CheckCircleIcon, {
              style: {
                width: '100px',
                height: '100px',
                color: '#212529'
              }
            })
            )
          ),
          // Mensaje
          React.createElement('h2', {
            style: {
              fontFamily: 'D-DIN, sans-serif',
              fontSize: '20px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              color: '#212529',
              margin: 0,
              marginTop: '8px',
              letterSpacing: '0.1em',
              lineHeight: '1.5'
            }
          }, 'PRODUCTO AGREGADO AL CARRITO')
        )
      );
    };

    isInitialized = true;
  }

  // Agregar estilos CSS para animaciones (solo una vez)
  if (!document.getElementById('react-addtocart-popup-styles')) {
    var styleSheet = document.createElement('style');
    styleSheet.id = 'react-addtocart-popup-styles';
    styleSheet.textContent = 
      '@keyframes fadeInZoom {' +
        '0% { opacity: 0; transform: scale(0.95); }' +
        '100% { opacity: 1; transform: scale(1); }' +
      '}' +
      '@keyframes zoomIn {' +
        '0% { opacity: 0; transform: scale(0.75); }' +
        '100% { opacity: 1; transform: scale(1); }' +
      '}' +
      '.react-addtocart-popup-content {' +
        'font-family: D-DIN, sans-serif;' +
      '}' +
      '@media (max-width: 1024px) {' +
        '.react-addtocart-popup-content {' +
          'max-width: 90% !important;' +
          'padding: 56px 40px !important;' +
        '}' +
        '.react-addtocart-popup-content svg {' +
          'width: 90px !important;' +
          'height: 90px !important;' +
        '}' +
        '.react-addtocart-popup-content h2 {' +
          'font-size: 18px !important;' +
        '}' +
      '}' +
      '@media (max-width: 767px) {' +
        '.react-addtocart-popup-content {' +
          'max-width: 85% !important;' +
          'padding: 48px 32px !important;' +
          'border-radius: 20px !important;' +
        '}' +
        '.react-addtocart-popup-content svg {' +
          'width: 80px !important;' +
          'height: 80px !important;' +
        '}' +
        '.react-addtocart-popup-content h2 {' +
          'font-size: 16px !important;' +
          'letter-spacing: 0.08em !important;' +
        '}' +
      '}' +
      '@media (max-width: 480px) {' +
        '.react-addtocart-popup-content {' +
          'max-width: 90% !important;' +
          'padding: 40px 24px !important;' +
          'border-radius: 16px !important;' +
        '}' +
        '.react-addtocart-popup-content svg {' +
          'width: 70px !important;' +
          'height: 70px !important;' +
        '}' +
        '.react-addtocart-popup-content h2 {' +
          'font-size: 14px !important;' +
          'letter-spacing: 0.05em !important;' +
        '}' +
      '}';
    document.head.appendChild(styleSheet);
  }

  // Intentar inicializar componentes cuando React esté disponible
  function tryInit() {
    if (typeof React !== 'undefined' && typeof ReactDOM !== 'undefined') {
      initComponents();
    } else {
      setTimeout(tryInit, 100);
    }
  }

  // Inicializar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryInit);
  } else {
    tryInit();
  }

})();
