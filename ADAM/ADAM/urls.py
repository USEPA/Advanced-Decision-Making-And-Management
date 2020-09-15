"""ADAM URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns: path('blog/', include('blog.urls')) """ 
from django.contrib import admin 
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.main, name = 'main'),
    path('main/ajax/getdata', views.getdata, name = 'getdata'), 
    path('main/ajax/getbounds', views.getbounds, name = 'getbounds'),
    path('support', views.support, name = 'support'),
    path('contact', views.contact, name = 'contact'),
    path('whatisthis', views.whatisthis, name = 'whatisthis'),
    path('tryit', views.tryit, name = 'tryit'),
    path('tryit/eg1', views.tryit_eg1, name = 'tryit_eg1'),
    path('tryit/eg2', views.tryit_eg2, name = 'tryit_eg2'),
    path('ajax/begintosolveeg2', views.beginsolveeg2, name = 'begintosolveeg2'),
    path('eg2_results/<id>', views.eg2_results, name = 'eg2_results'),
#    path('demo/', include('demo.urls')),
    path('expert/', include('main.urls'))] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

