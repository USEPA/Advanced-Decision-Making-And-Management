# admin.py (teams)
# !/usr/bin/env python3
# coding=utf-8
# ruiz-mercado.gerardo@epa.gov

"""
Define classes used to generate Django Admin portion of the website.

Available functions:
- Sets Teams
- Sets Team Memberships
"""

from django.contrib import admin
from teams.models import Team, TeamMembership


class TeamAdmin(admin.ModelAdmin):
    """Custom Admin class for managing Teams."""

    model = Team
    fields = ('name',)
    readonly_fields = ('created_date', 'created_by', 'last_modified_date',
                       'last_modified_by', 'members',)

    def save_model(self, request, obj, form, change):
        """Custom save method to attach created_by user."""
        try:
            temp_obj = obj.created_by
        except BaseException:
            obj.created_by = request.user
        obj.last_modified_by = request.user
        obj.save()


admin.site.register(Team, TeamAdmin)

admin.site.register(TeamMembership)
