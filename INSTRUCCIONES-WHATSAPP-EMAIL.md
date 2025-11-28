# Instrucciones: Botón de WhatsApp en Correo de Confirmación de Pedido

## 📋 Resumen

Se ha creado el snippet `snippets/whatsapp-email-button.liquid` que contiene el código del botón de WhatsApp para el correo de confirmación de pedido.

## 🚀 Cómo Implementar

### Paso 1: Acceder a la Plantilla de Correo

1. Ve a tu admin de Shopify
2. Navega a: **Settings → Notifications** (Configuración → Notificaciones)
3. Busca **"Order confirmation"** (Confirmación del pedido)
4. Haz clic en **"Edit code"** (Editar código)

### Paso 2: Insertar el Botón de WhatsApp

Busca en el código la sección donde están los botones de acción. Deberías encontrar algo como esto:

```liquid
{% if order_status_url %}
  <table class="row actions">
    <tr>
      <td class="actions__cell">
        <table class="button main-action-cell">
          <tr>
            <td class="button__cell"><a href="{{ order_status_url }}" class="button__text">Ver tu pedido</a></td>
          </tr>
        </table>
        {% if shop.url %}
          <table class="link secondary-action-cell">
            <tr>
              <td class="link__cell">o <a href="{{ shop.url }}">Visita nuestra tienda</a></td>
            </tr>
          </table>
        {% endif %}
      </td>
    </tr>
  </table>
{% endif %}
```

### Paso 3: Agregar el Código del Botón

**Opción A: Usar el snippet (recomendado)**

Justo después de cerrar el bloque `{% endif %}` de los botones de acción, agrega:

```liquid
{% include 'whatsapp-email-button' %}
```

**Opción B: Copiar el código directamente**

Si prefieres copiar el código directamente, abre el archivo `snippets/whatsapp-email-button.liquid` y copia TODO su contenido. Pégalo justo después de los botones de acción.

### Paso 4: Guardar

1. Haz clic en **"Save"** (Guardar)
2. Listo! El botón aparecerá en todos los correos de confirmación de pedido

## 📧 Ubicación Exacta en el Código

El botón debe ir después de esta sección:

```liquid
{% if order_status_url %}
  <table class="row actions">
    ...
  </table>
{% else %}
  ...
{% endif %}

{% comment %} AQUÍ VA EL BOTÓN DE WHATSAPP {% endcomment %}
{% include 'whatsapp-email-button' %}
```

Y antes de esta sección:

```liquid
<table class="row section">
  <tr>
    <td class="section__cell">
      <center>
        <table class="container">
          <tr>
            <td>
              <h3>Resumen del pedido</h3>
            </td>
          </tr>
        </table>
```

## ✅ Características del Botón

- ✅ **Color verde de WhatsApp** (#25D366)
- ✅ **Incluye todos los datos del pedido**:
  - Número de pedido
  - Nombre del cliente
  - Total pagado
  - Detalle de artículos con variantes y precios
  - Método de envío
  - Método de pago
- ✅ **Compatible con clientes de correo** (usa tablas HTML)
- ✅ **Responsive** (funciona en móviles y desktop)
- ✅ **Abre WhatsApp Web/App** con mensaje pre-formateado

## 🧪 Prueba

1. Realiza un pedido de prueba
2. Revisa el correo de confirmación
3. Verifica que el botón aparezca correctamente
4. Haz clic en el botón y verifica que el mensaje de WhatsApp contenga todos los datos

## 📝 Nota Importante

**Las plantillas de correo de Shopify NO están en el tema**, se editan desde el admin. Por eso no puedes encontrar el archivo en el proyecto. El snippet que creamos es solo para referencia - debes copiar el código o usar `{% include %}` directamente en la plantilla del admin.

---

**Número de WhatsApp configurado:** 584122150171  
**URL del botón:** https://wa.me/584122150171?text=...

