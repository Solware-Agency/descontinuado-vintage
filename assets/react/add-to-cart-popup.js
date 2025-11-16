(function() {
  'use strict';

  // Variables globales para gestión del popup
  var reactPopupRoot = null;
  var reactPopupTimeout = null;
  var reactPopupCloseTimeout = null;

  // Componente CheckCircle Icon
  function CheckCircleIcon(props) {
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
  }

  // Componente Confetti Explosion (negro, position: fixed)
  function ConfettiExplosion() {
    var confettiCount = 100;
    var confettiElements = [];

    // Crear estilos inline para la animación
    var styleElement = React.createElement('style', null, 
      '@keyframes fall {' +
        '0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }' +
        '100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }' +
      '}'
    );

    // Generar partículas de confetti
    for (var i = 0; i < confettiCount; i++) {
      var left = Math.random() * 100;
      var top = -20 + Math.random() * 10;
      var rotation = Math.random() * 360;
      var animationDuration = 2.5 + Math.random() * 2.5;
      var animationDelay = Math.random() * 2;

      confettiElements.push(
        React.createElement('div', {
          key: i,
          className: 'react-confetti-particle',
          style: {
            position: 'fixed',
            left: left + '%',
            top: top + '%',
            width: '8px',
            height: '16px',
            backgroundColor: '#000000',
            transform: 'rotate(' + rotation + 'deg)',
            animation: 'fall ' + animationDuration + 's ' + animationDelay + 's linear forwards',
            zIndex: 9998,
            pointerEvents: 'none'
          }
        })
      );
    }

    return React.createElement(React.Fragment, null,
      styleElement,
      React.createElement('div', {
        className: 'react-confetti-container',
        style: {
          position: 'fixed',
          inset: 0,
          zIndex: 9998,
          pointerEvents: 'none'
        },
        'aria-hidden': 'true'
      }, confettiElements)
    );
  }

  // Componente principal AddToCartPopup
  function AddToCartPopup() {
    var _React$useState = React.useState(false);
    var showConfetti = _React$useState[0];
    var setShowConfetti = _React$useState[1];

    React.useEffect(function() {
      // Iniciar confetti después de 100ms
      var confettiTimer = setTimeout(function() {
        setShowConfetti(true);
      }, 100);

      // Ocultar confetti después de 1.6s
      var confettiHideTimer = setTimeout(function() {
        setShowConfetti(false);
      }, 1600);

      return function() {
        clearTimeout(confettiTimer);
        clearTimeout(confettiHideTimer);
      };
    }, []);

    return React.createElement(React.Fragment, null,
      showConfetti ? React.createElement(ConfettiExplosion) : null,
      React.createElement('div', {
        className: 'react-addtocart-popup-content',
        style: {
          position: 'relative',
          width: '100%',
          maxWidth: '400px',
          background: '#fff',
          borderRadius: '16px',
          padding: '48px 32px',
          textAlign: 'center',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
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
                width: '80px',
                height: '80px',
                color: '#212529'
              }
            })
          )
        ),
        // Mensaje
        React.createElement('h2', {
          style: {
            fontFamily: 'D-DIN, sans-serif',
            fontSize: '18px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: '#212529',
            margin: 0,
            letterSpacing: '0.05em',
            lineHeight: '1.4'
          }
        }, 'PRODUCTO AGREGADO AL CARRITO')
      )
    );
  }

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
    var popupContainer = document.querySelector('.product-popup');

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
  }

  // Función principal para mostrar el popup React
  window.showAddToCartReactPopup = function() {
    // Limpiar estado previo
    cleanupPreviousPopup();

    // Obtener contenedor
    var container = document.getElementById('react-addtocart-popup');
    if (!container) {
      console.error('Contenedor #react-addtocart-popup no encontrado');
      return;
    }

    // Crear root React
    try {
      reactPopupRoot = ReactDOM.createRoot(container);
      
      // Renderizar componente
      reactPopupRoot.render(React.createElement(AddToCartPopup));

      // Mostrar popup (usar función global del theme)
      if (typeof showPopup === 'function') {
        showPopup('.product-popup');
      } else if (typeof jQuery !== 'undefined' && jQuery.fn.addClass) {
        jQuery('.product-popup').addClass('active');
      }

      // Programar autocierre después de 3.5 segundos
      reactPopupTimeout = setTimeout(function() {
        window.closeAddToCartPopup();
      }, 3500);

    } catch (e) {
      console.error('Error al montar componente React:', e);
    }
  };

  // Los listeners del botón X y overlay se manejan en el template Liquid
  // para mantener compatibilidad con el sistema de popups del theme

  // Agregar estilos CSS para animaciones
  var styleSheet = document.createElement('style');
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
    '@media (max-width: 767px) {' +
      '.react-addtocart-popup-content {' +
        'max-width: 80% !important;' +
        'padding: 32px 24px !important;' +
      '}' +
      '.react-addtocart-popup-content svg {' +
        'width: 60px !important;' +
        'height: 60px !important;' +
      '}' +
      '.react-addtocart-popup-content h2 {' +
        'font-size: 14px !important;' +
      '}' +
    '}';
  document.head.appendChild(styleSheet);

})();

