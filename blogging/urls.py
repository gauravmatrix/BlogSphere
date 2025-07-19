from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # path('home/', views.home, name='home'),
    path('all_product/', views.all_products, name='all_product'),
    path('', views.home, name='home'),
    path('add/', views.add_product, name='add_product'),
    path('blog/<int:pk>/', views.product_detail, name='product_detail'),  # Fix this line
    # path('one_product/<int:pk>/', views.one_product, name='one_product'),
    path('product<int:pk>/edit/', views.edit_product, name='edit_product'),
    path('product<int:pk>/delete/', views.delete_product, name='delete_product'),
    path('external-blogs/', views.external_blogs, name='external_blogs'),

]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)