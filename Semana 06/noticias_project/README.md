¡Hola Garamendi! 😃

Bienvenido a Django News Portal 📰, un proyecto web diseñado para gestionar y mostrar noticias de manera eficiente y elegante. Este sistema permite a los administradores organizar artículos, categorías y autores, mientras los lectores disfrutan de una plataforma bien estructurada para acceder a información actualizada.

🌟 ¿Qué hace este proyecto?
✅ Organiza noticias en categorías bien definidas. ✅ Muestra artículos dinámicamente utilizando plantillas de Django. ✅ Permite comentarios y valoraciones, para que los usuarios interactúen con el contenido. ✅ Sistema de administración potente, donde los editores pueden gestionar contenido fácilmente. ✅ Optimización visual, con diseño moderno y adaptable para todo tipo de dispositivos.

🔹 Funciones principales
✅ Gestión de Noticias
Cada artículo tiene un título, contenido, imagen y estado (publicado o borrador).

Se asocian a un reportero, quien puede tener una biografía y avatar.

Cada artículo pertenece a una categoría, facilitando la organización.

Se pueden añadir etiquetas (tags) para mejorar la búsqueda y clasificación.

✅ Sistema de Categorías
Las noticias se agrupan en distintas categorías (política, tecnología, deportes, etc.).

Se genera automáticamente un slug (URL amigable) para cada categoría.

Se pueden recuperar artículos de una categoría con category.articles.all().

✅ Etiquetas (Tags)
Cada etiqueta (name, slug) permite categorizar los artículos.

Un artículo puede tener varias etiquetas, usando una relación ManyToManyField.

Se crean dinámicamente al guardar un artículo nuevo.

Se consultan fácilmente con article.tags.all().


✅ Optimización en el Panel de Administración
Se usa ModelAdmin para personalizar cómo se muestran los datos en el admin de Django.

Se generan campos prellenados (slug desde el título o nombre).

Se incluyen filtros (list_filter), búsqueda (search_fields) y gestión de imágenes en miniatura.

🔹 Aspectos Técnicos Destacados
📌 Base de Datos
Usa SQLite por defecto, pero se puede cambiar fácilmente a MySQL.

Cada tabla está bien relacionada, evitando duplicaciones innecesarias.

Utiliza reverse() para generar URLs dinámicamente.

📌 Sistema de Templates
Se usa base.html como plantilla principal, extendida por otras.

Los módulos (home.html, article_detail.html, etc.) heredan estilos y estructura base.

Se incluyen bloques dinámicos ({% block content %}) que permiten modularidad en la interfaz.

📌 URL y Enrutamiento
Se usa news/urls.py para definir las rutas (article_detail, category_detail, etc.).

Se gestionan URLs dinámicas con path('<slug:slug>/', views.article_detail, name='article_detail').



Los archivos subidos se almacenan dentro de /media/articles/ y /media/reporters/.