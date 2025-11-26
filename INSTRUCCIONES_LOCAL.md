# Cómo ver cambios localmente en Shopify

## Opción 1: Shopify CLI (Recomendado - Desarrollo Local)

### Instalación

1. **Instalar Node.js** (si no lo tienes):
   - Descarga desde: https://nodejs.org/
   - Instala la versión LTS

2. **Instalar Shopify CLI**:
   ```bash
   npm install -g @shopify/cli @shopify/theme
   ```

3. **Autenticarte con Shopify**:
   ```bash
   shopify auth login
   ```

4. **Iniciar servidor de desarrollo local**:
   ```bash
   shopify theme dev
   ```
   
   Esto:
   - Crea un tema de desarrollo en tu tienda
   - Sincroniza cambios en tiempo real
   - Te da una URL local para ver los cambios
   - Hot reload automático

### Comandos útiles:
- `shopify theme dev` - Inicia servidor de desarrollo
- `shopify theme push` - Sube cambios al tema
- `shopify theme pull` - Descarga cambios del tema
- `shopify theme check` - Verifica errores en el código

---

## Opción 2: Editor de Temas de Shopify (Más Simple)

### Pasos:

1. **Subir cambios manualmente**:
   - Ve a tu tienda Shopify Admin
   - Ve a: **En línea > Temas**
   - Haz clic en **"..."** junto a tu tema
   - Selecciona **"Editar código"**
   - Navega al archivo que editaste (ej: `snippets/collection-filters-simple.liquid`)
   - Copia y pega el contenido actualizado
   - Guarda los cambios

2. **Ver cambios**:
   - Ve a tu tienda en vivo
   - Navega a una página de colección
   - Abre la consola del navegador (F12) para ver los mensajes de diagnóstico

---

## Opción 3: Tema de Desarrollo (Sin afectar tienda en vivo)

### Pasos:

1. **Crear tema de desarrollo**:
   - Ve a: **En línea > Temas**
   - Haz clic en **"Agregar tema"** > **"Duplicar tema"**
   - Esto crea una copia de tu tema actual

2. **Subir cambios al tema de desarrollo**:
   - Usa Shopify CLI: `shopify theme push --theme=ID_DEL_TEMA`
   - O edita manualmente en el editor de código

3. **Previsualizar**:
   - En la lista de temas, haz clic en **"Previsualizar"** del tema de desarrollo
   - Esto te permite ver los cambios sin afectar la tienda en vivo

---

## Opción 4: Usar GitHub + Deploy Automático

Si tienes el repositorio conectado a Shopify:

1. **Hacer commit de los cambios**:
   ```bash
   git add snippets/collection-filters-simple.liquid
   git commit -m "Mejoras en filtros de búsqueda"
   git push
   ```

2. **Shopify sincronizará automáticamente** (si está configurado)

---

## Verificación de Cambios

### Para verificar que los filtros funcionan:

1. **Abre la consola del navegador** (F12 → Console)
2. **Navega a una página de colección**
3. **Busca estos mensajes**:
   - ✅ "Inicializando filtros..."
   - ✅ "=== RESUMEN DE DIAGNÓSTICO ==="
   - ✅ Información sobre productos con colores/tallas/precios

4. **Prueba los filtros**:
   - Selecciona un color en el dropdown
   - Selecciona una talla
   - Selecciona un rango de precio
   - Verifica que los productos se filtren correctamente

---

## Solución de Problemas

### Si no ves los cambios:

1. **Limpia la caché del navegador**: Ctrl + Shift + R
2. **Verifica que el archivo se guardó correctamente**
3. **Revisa la consola del navegador** para errores de JavaScript
4. **Asegúrate de estar en la página correcta** (página de colección)

### Si los filtros no funcionan:

1. **Revisa la consola del navegador** para mensajes de diagnóstico
2. **Verifica que los productos tengan**:
   - Opción de variante "Color" o "Colour"
   - Metafield `custom.talla_estandar` configurado
   - Precio configurado

