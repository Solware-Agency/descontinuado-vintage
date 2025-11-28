# Instrucciones: WhatsApp Popup en Order Status Page

## 📋 Resumen del Problema

El código anterior en `snippets/whatsapp-order-confirmation.liquid` NO funcionaba en la Order Status Page porque:
- La Order Status Page de Shopify NO usa `theme.liquid`
- Está en un entorno sandbox/iframe separado
- El snippet incluido en `theme.liquid` nunca se carga en esa página

## ✅ Solución Implementada

### 1. Script para Additional Scripts

**Archivo creado:** `whatsapp-order-status-script.js`

Este script está optimizado para pegar directamente en:
**Settings → Checkout → Order status page → Additional scripts**

### 2. Limpieza del Tema

**Archivo modificado:** `layout/theme.liquid` línea 906

El include de `whatsapp-order-confirmation` ha sido **comentado** para evitar que se ejecute en todas las páginas del tema.

## 🚀 Cómo Implementar

### Paso 1: Copiar el Script

1. Abre el archivo `whatsapp-order-status-script.js` en tu editor
2. Copia TODO el contenido del archivo

### Paso 2: Pegar en Shopify

1. Ve a tu admin de Shopify
2. Navega a: **Settings → Checkout**
3. Busca la sección **"Order status page"** (o "Post-purchase page")
4. Busca el campo **"Additional scripts"** (o "Script")
5. Pega el código completo del archivo `whatsapp-order-status-script.js`
6. Guarda los cambios

### Paso 3: Probar

1. Realiza una compra de prueba
2. Completa el checkout
3. Llega a la página de agradecimiento
4. Espera 3 segundos
5. Deberías ver el modal de WhatsApp con todos los datos del pedido

## 📝 Características del Script

✅ **Detección automática** de Order Status Page por URL
✅ **Extrae datos completos** desde `Shopify.checkout.order`:
   - Número de pedido
   - Nombre del cliente
   - Total pagado
   - Items con variantes y precios
   - Método de envío
   - Método de pago
✅ **Modal responsive** (mobile y desktop)
✅ **Aparece automáticamente** después de 3 segundos
✅ **Diseño consistente** con tipografía D-DIN
✅ **Botón de WhatsApp** funcional con mensaje pre-formateado

## 🔧 Si No Tienes Acceso a Additional Scripts

Si no encuentras la opción "Additional scripts" en tu plan:

1. **Verifica tu plan:** Algunos planes básicos no tienen esta opción
2. **Ubicación alternativa:** Puede estar en:
   - Settings → Checkout → Post-purchase page → Script
   - Settings → Customer events
3. **Si definitivamente no existe:** Necesitarías usar la Solución B del plan (webhooks + backend)

## 🧹 Limpieza Realizada

El código en `layout/theme.liquid` ha sido comentado. Esto significa:
- ✅ Ya no se ejecuta en Home, Product, Collection, etc.
- ✅ No genera logs innecesarios
- ✅ El código se mantiene por si necesitas referencia futura

Si quieres eliminarlo completamente, puedes borrar las líneas 905-907 de `theme.liquid`.

## 📞 Soporte

Si el script no funciona:
1. Verifica que esté pegado correctamente en Additional Scripts
2. Abre la consola del navegador (F12) en la Order Status Page
3. Busca errores de JavaScript
4. Verifica que `Shopify.checkout.order` esté disponible

---

**Número de WhatsApp configurado:** 584122150171
**URL del botón:** https://wa.me/584122150171?text=...