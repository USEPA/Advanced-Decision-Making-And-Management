# context_processors.py (ADAM)
# !/usr/bin/env python3
# coding=utf-8
# ruiz-mercado.gerardo@epa.gov

"""Definition of context processors for ADAM."""

from ADAM.settings import APP_DISCLAIMER, APP_NAME, APP_VERSION


def selected_settings(request):
    """Return the version value as a dictionary."""
    # you can add other values here as well
    return {
        'APP_DISCLAIMER': APP_DISCLAIMER, 'APP_NAME': APP_NAME,
        'APP_VERSION': APP_VERSION
    }
