# tasks.py (expert)
# !/usr/bin/env python3
# coding=utf-8
# ruiz-mercado.gerardo@epa.gov

"""defines background tasks used in adam
sending notification emails to users
solve optimization models
"""


# All background tasks
from background_task import background
from django.core.mail import send_mail
from django.utils import timezone
from .models import OptTask
from accounts.models import User
import datetime
import subprocess


@background(schedule=timezone.now())
def notify_user(user_id, task_id):
    """notify user that one model is running"""
    user = User.objects.get(pk=user_id)
    task = OptTask.objects.get(pk=task_id)
    toemail = user.email
    content = 'This is a email to notify that your task %s is running.' % \
        task.task_name
    send_mail(
        'No Reply - Notification',
        content,
        'email-host@xxx.com',
        [toemail],
        fail_silently=False,
    )


@background(schedule=timezone.now())
def solveSC(task_id):
    """call julia and solver to solve opt model (deprecated)"""
    task = OptTask.objects.get(pk=task_id)
    p = subprocess.Popen([
        "julia", task.code_path, "media/" + task.node_path,
        "media/" + task.sup_path, "media/" + task.dem_path,
        "media/" + task.site_path, "media/" + task.prod_path,
        "media/" + task.tech_path, "media/" + task.alpha_path,
        "media/" + task.dis_path, "media/" + task.cand_path,
        str(task.id), str(task.user.username), str(task.user.id)])


@background(schedule=timezone.now())
def beginsolvenew(task_id):
    """call julia and solver to solve opt model"""
    task = OptTask.objects.get(pk=task_id)
    user = task.user
    userid = str(user.id)
    username = user.username
    taskid = str(task.id)
    cmd = [
        "your/path/to/julia", task.code_path, userid, username,
        taskid, str(int(task.tasktransfile))]
    p = subprocess.Popen(cmd)
