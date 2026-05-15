from django.conf import settings
from django.conf.urls.static import static

from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),

    path(
        'api/users/',
        include('users.urls')
    ),

    path(
        'api/books/',
        include('books.urls')
    ),

    path(
        'api/authors/',
        include('authors.urls')
    ),

    path(
        'api/categories/',
        include('categories.urls')
    ),

    path(
        'api/loans/',
        include('loans.urls')
    ),

        #  SWAGGER
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),

    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )