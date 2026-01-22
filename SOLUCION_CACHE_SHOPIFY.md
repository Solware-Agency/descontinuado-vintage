# Soluciones para problemas de caché en Shopify Responsive

## Posibles causas por las que no se ven los cambios en Shopify responsive:

### 1. **Caché de Shopify**
Shopify tiene un sistema de caché agresivo que puede servir versiones antiguas de los archivos CSS.

**Soluciones:**
- Esperar 5-10 minutos después de guardar los cambios
- Agregar un parámetro de versión al archivo CSS en `theme.liquid`:
  ```liquid
  {{ 'engo-customizes.css' | asset_url | stylesheet_tag }}?v={{ 'now' | date: '%s' }}
  ```
- Limpiar la caché desde el panel de administración de Shopify: **Online Store > Themes > Actions > Edit code** y luego guardar cualquier cambio menor para forzar la actualización

### 2. **Caché del navegador**
El navegador puede estar cacheando los archivos CSS antiguos.

**Soluciones:**
- **Chrome/Edge**: Ctrl+Shift+Delete (Windows) o Cmd+Shift+Delete (Mac) para limpiar caché
- **Hard refresh**: Ctrl+F5 (Windows) o Cmd+Shift+R (Mac)
- Abrir en modo incógnito/privado
- Desactivar caché en DevTools: F12 > Network > Marcar "Disable cache"

### 3. **Especificidad CSS insuficiente**
Los estilos pueden estar siendo sobrescritos por reglas más específicas.

**Solución aplicada:**
- Se agregó `!important` a las reglas de `font-family`
- Se aumentó la especificidad de los selectores
- Se agregaron media queries específicos para responsive

### 4. **Archivo CSS incorrecto**
Shopify puede estar usando el archivo `.liquid` en lugar del `.css` o viceversa.

**Verificación:**
- Revisar en `layout/theme.liquid` qué archivo se está cargando
- Asegurarse de que ambos archivos (`engo-customizes.css` y `engo-customizes.css.liquid`) tengan los mismos cambios

### 5. **Media queries no se están aplicando**
Los breakpoints pueden no coincidir con el tamaño de pantalla.

**Solución:**
- Verificar que el viewport esté configurado correctamente: `<meta name="viewport" content="width=device-width,initial-scale=1">`
- Probar con diferentes tamaños de pantalla en DevTools
- Verificar que los media queries usen `max-width` correctamente

### 6. **Estilos inline o JavaScript**
Puede haber JavaScript que esté aplicando estilos inline después de cargar la página.

**Solución:**
- Inspeccionar el elemento en DevTools y verificar si hay estilos inline
- Buscar en el código JavaScript que pueda estar sobrescribiendo estilos

### 7. **Minificación de CSS**
Shopify puede estar minificando los archivos CSS y puede haber errores de sintaxis.

**Solución:**
- Verificar que no haya errores de sintaxis en el CSS
- Revisar la consola del navegador por errores

## Cambios realizados:

Se agregaron estilos para aplicar la fuente DIN en responsive para:

1. **Barra de categorías** (`.filter-category`)
2. **Menú móvil** (`.box_contentmenu .tab_content_menu_mobile`)
3. **Dropdown de SHOP** (`.dropdown-menu.list-woman.shop .menu_lv2`)
4. **Títulos del menú móvil** (`.title_menu_mb`)

Todos los estilos incluyen:
- Media queries para `@media (max-width: 991px)` y `@media (max-width: 767px)`
- `!important` para asegurar que sobrescriban otros estilos
- Selectores específicos para aumentar la especificidad

## Pasos para verificar:

1. **Abrir DevTools** (F12)
2. **Ir a la pestaña Network** y marcar "Disable cache"
3. **Recargar la página** con Ctrl+F5
4. **Inspeccionar un elemento** (por ejemplo, "Bags" en el menú móvil)
5. **Verificar en Computed** que `font-family` sea "D-DIN" o "DIN"
6. **Verificar en Styles** que nuestros estilos estén aplicados y no tachados

## Si aún no funciona:

1. Verificar que el archivo CSS se esté cargando correctamente en Network
2. Agregar un estilo de prueba más visible (como `color: red !important;`) para verificar que los estilos se están aplicando
3. Revisar si hay otros archivos CSS que se carguen después y puedan estar sobrescribiendo
4. Contactar al soporte de Shopify si el problema persiste después de limpiar caché

