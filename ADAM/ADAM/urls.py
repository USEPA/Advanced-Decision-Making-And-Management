# urls.py (ADAM)
# !/usr/bin/env python3
# coding=utf-8
# ruiz-mercado.gerardo@epa.gov

"""
ADAM URL Configuration.

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
    2. Add a URL to urlpatterns: path('blog/', include('blog.urls')).
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.main, name='main'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('main/ajax/getdata', views.getdata, name='getdata'),
    path('main/ajax/getbounds', views.getbounds, name='getbounds'),
    path('support', views.support, name='support'),
    path('contact', views.contact, name='contact'),
    path('about', views.about, name='about'),
    path('demo', views.demo, name='demo'),
    path('demo/eg1', views.demo_eg1, name='demo_eg1'),
    path('demo/eg2', views.demo_eg2, name='demo_eg2'),
    path('ajax/begintosolveeg2', views.beginsolveeg2, name='begintosolveeg2'),
    path('eg2_results/<id>', views.eg2_results, name='eg2_results'),
    # Module paths:
    # path('demo/', include('demo.urls')),
    path('expert/', include('expert.urls')),
    path('accounts/', include('accounts.urls')),
    path('teams/', include('teams.urls')),
    path('support/', include('support.urls'))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
