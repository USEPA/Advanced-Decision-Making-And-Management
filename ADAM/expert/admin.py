# admin.py (expert)
# !/usr/bin/env python3
# coding=utf-8
# ruiz-mercado.gerardo@epa.gov


"""Add docstring."""  # TODO: add docstring.

from django.contrib import admin
from .models import *


class ProductAdmin(admin.ModelAdmin):
    """Add docstring."""  # TODO: add docstring.

    readonly_fields = ('id',)


class TechnologyAdmin(admin.ModelAdmin):
    """Add docstring."""  # TODO: add docstring.

    readonly_fields = ('id',)


class CasestudyAdmin(admin.ModelAdmin):
    """Add docstring."""  # TODO: add docstring.

    readonly_fields = ('id',)


class CaseGroupAdmin(admin.ModelAdmin):
    """Add docstring."""  # TODO: add docstring.

    readonly_fields = ('id',)


# Register your models here.
admin.site.register(UserInfo)
admin.site.register(OptTask)
admin.site.register(DataDocument)
admin.site.register(Product, ProductAdmin)
admin.site.register(Technology, TechnologyAdmin)
admin.site.register(Transformation)
admin.site.register(PGraph)
admin.site.register(UserDatabase)
admin.site.register(UserHasProd)
admin.site.register(UserHasTech)
admin.site.register(OptTaskResults)
admin.site.register(CaseStudy, CasestudyAdmin)
admin.site.register(CaseGroup, CaseGroupAdmin)
admin.site.register(GroupHasCase)
