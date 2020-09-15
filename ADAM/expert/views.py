# views.py (expert)
# !/usr/bin/env python3
# coding=utf-8
# ruiz-mercado.gerardo@epa.gov


from django.shortcuts import render, redirect
from django.urls import reverse
from django.utils import timezone
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponse, FileResponse
from django.conf import settings
from django.forms import formset_factory
from django.utils.encoding import smart_str
from wsgiref.util import FileWrapper
from django.db.models import Q
from functools import reduce
from .models import *
from .forms import *
from .tasks import *
from math import log
from collections import namedtuple
import string
import random
import os
import io
import csv
import zipfile
import json
import operator

from .util import *


# registered page - redirect to usermain
def exp_registered(request):
    """Main page - login/out, Register"""
    return render(request, 'exp_registered.html')


# register page
def exp_register(request):
    fail = 0
    if (request.POST.get('user_register')):
        uf = UserForm(request.POST)
        if uf.is_valid():
            new_user = User.objects.create_user(
                username=uf.cleaned_data['username'],
                password=uf.cleaned_data['password'])
            new_user.first_name = uf.cleaned_data['first_name']
            new_user.last_name = uf.cleaned_data['last_name']
            new_user.email = uf.cleaned_data['email']
            new_user.save()
            new_info = UserInfo(user=new_user)
            new_info.organization = uf.cleaned_data['organization']
            new_info.save()
            new_base = UserDatabase(user=new_user)
            new_base.save()
            for p in Product.objects.all():
                if p.public:
                    newitem = UserHasProd(userdatabase=new_base, product=p)
                    newitem.save()
            for t in Technology.objects.all():
                if t.public:
                    newitem = UserHasTech(userdatabase=new_base, technology=t)
                    newitem.save()
            new_base.save()
            return redirect(reverse('expert:exp_registered'))
        else:
            fail = 1
            context = {'userform': uf, 'fail': fail}
            return render(request, 'exp_register.html', context)
    else:
        uf = UserForm()
        context = {'userform': uf, 'fail': fail}
        return render(request, 'exp_register.html', context)


# login page
def exp_login(request):
    formfail = 0
    authfail = 0
    if (request.POST.get('user_login')):
        uf = LoginForm(request.POST)
        if uf.is_valid():
            username = uf.cleaned_data['username']
            password = uf.cleaned_data['password']
            user = authenticate(username=username, password=password)
            if user is None:
                authfail = 1
                context = {
                    'loginform': uf, 'formfail': formfail,
                    'authfail': authfail}
                return render(request, 'exp_login.html', context)
            else:
                login(request, user)
                base = user.userdatabase
                for p in Product.objects.all():
                    if p.public and p not in base.prods.all():
                        newitem = UserHasProd(userdatabase=base, product=p)
                        newitem.save()
                for t in Technology.objects.all():
                    if t.public and t not in base.techs.all():
                        newitem = UserHasTech(userdatabase=base, technology=t)
                        newitem.save()
                base.save()
                return redirect('expert:exp_usermain')
        else:
            formfail = 1
            context = {
                'loginform': uf, 'formfail': formfail, 'authfail': authfail}
            return render(request, 'exp_login.html', context)
    else:
        uf = LoginForm()
        context = {
            'loginform': uf, 'formfail': formfail, 'authfail': authfail}
        return render(request, 'exp_login.html', context)


# logout page, will redirect to expertmain
def exp_logout(request):
    user = request.user
    if user.is_authenticated:
        logout(request)
        return render(request, 'exp_logout.html')
    else:
        redirect('expert:expertmain')


# usermain page
@login_required()
def exp_usermain(request):
    """User Dashboard"""
    user = request.user
    return render(request, 'exp_usermain.html', {'user': user})


@login_required()
def exp_advpanel(request):
    user = request.user
    return render(request, 'exp_advpanel.html', {'user': user})


@login_required()
def exp_task_list(request):
    """Task List and Creation"""
    user = request.user
    tasklist = user.opttask_set.all()
    casels = CaseGroup.objects.all()
    return render(
        request, 'exp_task_list.html',
        {'user': user, 'tasklist': tasklist, 'caselist': casels})


@login_required()
def taskmanagedelete(request):
    user = request.user
    success = False
    if (request.POST):
        post_data = request.POST
        type = post_data['type']
        task_id = post_data['task_id']
        if 'delete_task' in type:
            task = user.opttask_set.get(id=task_id)
            task.delete()
            success = True
        return JsonResponse({'success': success})
    else:
        return HttpResponse("Invalid request!")


@login_required()
def newmodel(request):
    user = request.user
    success = False
    if (request.POST):
        post_data = request.POST
        modelname = post_data['modelname']
        modelnotes = post_data['modelnotes'].replace(
            "'", " ").replace('"', ' ').replace('\n', '')
        new_task = user.opttask_set.create(
            task_name=modelname, date_create=timezone.now(),
            task_pseudoid=id_generator(), notes=modelnotes)
        new_task.save()
        success = True
        return JsonResponse({'success': success})
    else:
        return HttpResponse("Invalid request!")


@login_required()
def copymodel(request):
    user = request.user
    success = False
    if (request.POST):
        post_data = request.POST
        modelname = post_data['modelname']
        modelnotes = post_data['modelnotes'].replace("'", " ").replace(
            '"', ' ').replace('\n', '')
        task = user.opttask_set.create(
            task_name=modelname, date_create=timezone.now(),
            task_pseudoid=id_generator(), notes=modelnotes)

        load_id = post_data['loadid']
        if 'c' not in load_id:
            load = OptTask.objects.get(pk=int(load_id))
        else:
            load = CaseStudy.objects.get(pk=int(load_id[1:]))

        task.task_status = "Data Required"
        task.model_type = load.model_type
        task.save()
        task.code_path = codeselector(task.model_type)

        if 'c' not in load_id:
            task.finished_steps = load.finished_steps.replace(
                "5", "").replace("6", "")
        else:
            task.finished_steps = '1234'

        task.timeunit = load.timeunit
        task.supLatLs = load.supLatLs
        task.supLngLs = load.supLngLs
        task.supProLs = load.supProLs
        task.supCapLs = load.supCapLs
        task.supBidLs = load.supBidLs
        task.supNames = load.supNames
        # tech site data
        task.siteLatLs = load.siteLatLs
        task.siteLngLs = load.siteLngLs
        task.siteTecLs = load.siteTecLs
        task.siteCapLs = load.siteCapLs
        task.siteNames = load.siteNames
        # tech cand data
        task.candLatLs = load.candLatLs
        task.candLngLs = load.candLngLs
        task.candTecLs = load.candTecLs
        task.candNames = load.candNames
        # demand data
        task.demLatLs = load.demLatLs
        task.demLngLs = load.demLngLs
        task.demProLs = load.demProLs
        task.demCapLs = load.demCapLs
        task.demBidLs = load.demBidLs
        task.demNames = load.demNames

        task.save()
        success = True
        return JsonResponse({'success': success})
    else:
        return HttpResponse("Invalid request!")


# """Guidence for defining a problem"""
# """Step 1 - Model Type and Time Scope"""
@login_required()
def exp_task_step1(request, task_id):
    user = request.user
    task = OptTask.objects.get(pk=task_id)
    task_is_user = task in user.opttask_set.all()
    if not task_is_user:
        return redirect('expert:exp_login')
    else:
        if (request.GET.get('confirm_type')):
            mf = TaskTypeForm(request.GET)
            if mf.is_valid():
                task.model_type = int(mf.cleaned_data['model_type'])
                task.code_path = codeselector(task.model_type)
                task.timeunit = timeselector(
                    int(mf.cleaned_data['time_basis']))
                if '1' not in task.finished_steps:
                    task.finished_steps += '1'
                task.save()
            return redirect('expert:exp_task_step2new', task.id)
        else:
            modelform = TaskTypeForm()
            return render(
                request, 'exp_task_step1.html',
                {'user': user, 'task': task, 'modelform': modelform})


# """Step 2 - Supply Data"""
@login_required()
def exp_task_step2new(request, task_id):
    user = request.user
    task = OptTask.objects.get(pk=task_id)
    task_is_user = task in user.opttask_set.all()
    if not task_is_user:
        return redirect('expert:exp_login')
    else:
        uf = DataUploadForm()
        return render(
            request, 'exp_task_step2new.html',
            {'user': user, 'task': task, 'dataupload': uf})


@login_required()
def step2supfileselection(request):
    user = request.user
    if request.POST:
        data = request.POST
        supfileid = int(data['fileid'])
        file = DataDocument.objects.get(pk=supfileid)
        msg, supdata = readSupFile(user, file.docfile)
        return JsonResponse({'msg': msg, 'supdata': supdata})
    else:
        return HttpResponse("Invalid request!")


@login_required()
def step2suploadmodeldata(request):
    user = request.user
    if request.POST:
        data = request.POST
        loadid = int(data['loadid'])
        task = OptTask.objects.get(pk=loadid)
        msg, supdata = readModelData(task, 'sup')
        return JsonResponse({'msg': msg, 'supdata': supdata})
    else:
        return HttpResponse("Invalid request!")


@login_required()
def step2supfileupload(request):
    user = request.user
    if request.FILES:
        data = request.POST
        file = request.FILES
        new_sup_file = user.datadocument_set.create(
            docfile=file['datafile'], date_upload=timezone.now(),
            notes=data['datanotes'].replace('"', ' ').replace("'", " "),
            datatype="Supply Data")
        new_sup_file.save()
        return JsonResponse({'fileid': new_sup_file.id})
    else:
        return HttpResponse("Invalid request!")


@login_required()
def step2savesup(request):
    user = request.user
    if request.POST:
        data = request.POST
        task_id = int(data['taskid'])
        task = OptTask.objects.get(pk=task_id)

        task.supLatLs = json.loads(data['suplatls'])
        task.supLngLs = json.loads(data['suplngls'])
        task.supCapLs = json.loads(data['supcapls'])
        task.supProLs = json.loads(data['supprols'])
        task.supBidLs = json.loads(data['supbidls'])
        supnames = json.loads(data['supnames'])
        task.supNames = [
            supnames[i].replace(',', ' ') for i in range(len(supnames))]

        if '2' not in task.finished_steps:
            task.finished_steps += '2'
        task.save()
        msg = 'Data file changed and assigned.'
        return JsonResponse({'msg': msg})
    else:
        return HttpResponse("Invalid request!")


# """Step3 - Technology Site and Candidate Data"""
@login_required()
def exp_task_step3new(request, task_id):
    user = request.user
    task = OptTask.objects.get(pk=task_id)
    task_is_user = task in user.opttask_set.all()
    if not task_is_user:
        return redirect('expert:exp_login')
    else:
        uf = DataUploadForm()
        return render(
            request, 'exp_task_step3new.html',
            {'user': user, 'task': task, 'dataupload': uf})


@login_required()
def step3techfileselection(request):
    user = request.user
    if request.POST:
        data = request.POST
        techfileid = int(data['fileid'])
        techids = data['techids']
        file = DataDocument.objects.get(pk=techfileid)
        type = file.datatype
        msg, techdata = readTechFile(user, file.docfile, type, techids)
        # print(techdata)
        return JsonResponse({'msg': msg, 'techdata': techdata,
                             'techtype': type})
    else:
        return HttpResponse("Invalid request!")


@login_required()
def step3techloadmodeldata(request):
    user = request.user
    if request.POST:
        data = request.POST
        loadid = int(data['loadid'])
        checkls = json.loads(data['checkls'])

        task = OptTask.objects.get(pk=loadid)
        msg, techdata, type = readModelData(task, 'tech', checkls=checkls)
        return JsonResponse({
            'msg': msg, 'techdata': techdata, 'techtype': type})
    else:
        return HttpResponse("Invalid request!")


@login_required()
def step3techfileupload(request):
    user = request.user
    if request.FILES:
        data = request.POST
        file = request.FILES
        new_tech_file = user.datadocument_set.create(
            docfile=file['datafile'], date_upload=timezone.now(),
            notes=data['datanotes'].replace('"', ' ').replace("'", " "),
            datatype=data["datatype"])
        new_tech_file.save()
        return JsonResponse({'fileid': new_tech_file.id})
    else:
        return HttpResponse("Invalid request!")


@login_required()
def step3savetech(request):
    user = request.user
    if request.POST:
        data = request.POST
        task_id = int(data['taskid'])
        task = OptTask.objects.get(pk=task_id)

        task.siteLatLs = json.loads(data['sitelatls'])
        task.siteLngLs = json.loads(data['sitelngls'])
        task.siteTecLs = json.loads(data['sitetechls'])
        task.siteCapLs = json.loads(data['sitecapls'])
        sitenames = json.loads(data['sitenames'])
        task.siteNames = [sitenames[i].replace(',', ' ') for i in range(
            len(sitenames))]

        task.candLatLs = json.loads(data['candlatls'])
        task.candLngLs = json.loads(data['candlngls'])
        task.candTecLs = json.loads(data['candtechls'])
        candnames = json.loads(data['candnames'])
        task.candNames = [candnames[i].replace(',', ' ') for i in range(
            len(candnames))]

        if '3' not in task.finished_steps:
            task.finished_steps += '3'
        task.save()
        msg = 'Data file changed and assigned.'
        return JsonResponse({'msg': msg})
    else:
        return HttpResponse("Invalid request!")


# """Step4 - Demand Data"""
@login_required()
def exp_task_step4new(request, task_id):
    user = request.user
    task = OptTask.objects.get(pk=task_id)
    task_is_user = task in user.opttask_set.all()
    if not task_is_user:
        return redirect('expert:exp_login')
    else:
        uf = DataUploadForm()
        return render(
            request, 'exp_task_step4new.html',
            {'user': user, 'task': task, 'dataupload': uf})


@login_required()
def step4demfileselection(request):
    user = request.user
    if request.POST:
        data = request.POST
        demfileid = int(data['fileid'])
        prodids = data['prodids']
        file = DataDocument.objects.get(pk=demfileid)
        msg, demdata = readDemFile(user, file.docfile, prodids)
        return JsonResponse({'msg': msg, 'demdata': demdata})
    else:
        return HttpResponse("Invalid request!")


@login_required()
def step4demloadmodeldata(request):
    user = request.user
    if request.POST:
        data = request.POST
        loadid = int(data['loadid'])
        task = OptTask.objects.get(pk=loadid)
        msg, demdata = readModelData(task, 'dem')
        return JsonResponse({'msg': msg, 'demdata': demdata})
    else:
        return HttpResponse("Invalid request!")


@login_required()
def step4demfileupload(request):
    user = request.user
    if request.FILES:
        data = request.POST
        file = request.FILES
        new_dem_file = user.datadocument_set.create(
            docfile=file['datafile'], date_upload=timezone.now(),
            notes=data['datanotes'].replace('"', ' ').replace("'", " "),
            datatype="Demand Data")
        new_dem_file.save()
        return JsonResponse({'fileid': new_dem_file.id})
    else:
        return HttpResponse("Invalid request!")


@login_required()
def step4savedem(request):
    user = request.user
    if request.POST:
        data = request.POST
        task_id = int(data['taskid'])
        task = OptTask.objects.get(pk=task_id)

        task.demLatLs = json.loads(data['demlatls'])
        task.demLngLs = json.loads(data['demlngls'])
        task.demCapLs = json.loads(data['demcapls'])
        task.demProLs = json.loads(data['demprols'])
        task.demBidLs = json.loads(data['dembidls'])
        demnames = json.loads(data['demnames'])
        task.demNames = [demnames[i].replace(',', ' ') for i in range(
            len(demnames))]

        if '4' not in task.finished_steps:
            task.finished_steps += '4'
        task.save()
        msg = 'Data file changed and assigned.'
        return JsonResponse({'msg': msg})
    else:
        return HttpResponse("Invalid request!")


# """Step5 - Transportation Data"""
@login_required()
def exp_task_step5new(request, task_id):
    user = request.user
    task = OptTask.objects.get(pk=task_id)
    task_is_user = task in user.opttask_set.all()
    if not task_is_user:
        return redirect('expert:exp_login')
    else:
        uf = DataUploadForm()
        return render(
            request, 'exp_task_step5new.html',
            {'user': user, 'task': task, 'dataupload': uf})


@login_required()
def step5_writetransfiles(request):
    user = request.user
    if request.POST:
        data = request.POST
        task_id = int(data['taskid'])
        task = OptTask.objects.get(pk=task_id)
        msg = False
        try:
            nodedata, proddata = WriteTransfiles(task)
        except Exception:
            msg = 'There is an error when generating transportation routes.'

        # if not transdata:
        #    msg = 'There is an error when generating transportation routes.'
        # return JsonResponse({
        #     'msg': msg, 'transdata': transdata, 'nodedata': nodedata,
        #     'prodlist': proddata})
        return JsonResponse({
            'msg': msg, 'nodedata': nodedata, 'prodlist': proddata})
    else:
        return HttpResponse("Invalid request!")


def step5_skipthis(request):
    user = request.user
    if request.POST:
        data = request.POST
        task_id = int(data['taskid'])
        task = OptTask.objects.get(pk=task_id)
        msg = []
        try:
            nodedata, proddata = WriteTransfiles(task, transfile=False)
            task.tasktransfile = False
        except Exception:
            msg.append('There is an error when writing modeling data.')
        if '5' not in task.finished_steps:
            task.finished_steps += '5'
            task.task_status = "Data Complete"
            task.save()
        return JsonResponse({'msg': msg, 'success': True})
    else:
        return HttpResponse("Invalid request!")


@login_required()
def step5_rewritetransfiles(request):
    user = request.user
    if request.POST:
        data = request.POST
        task_id = int(data['taskid'])
        task = OptTask.objects.get(pk=task_id)
        transdata = data['transdata']
        transdata = transdata.replace('\n', '')
        transdata = json.loads(transdata)
        error = []
        if transdata:
            for i in range(len(transdata)):
                print(transdata[i])
                prodid = int(transdata[i]['prodid'])
                ReWriteTransData(task, prodid, transdata[i]['data'])
            if '5' not in task.finished_steps:
                task.finished_steps += '5'
                task.task_status = "Data Complete"
            task.save()
        else:
            error.append('Data is empty.')
        return JsonResponse({'error': error, 'success': True})
    else:
        return HttpResponse("Invalid request!")


@login_required()
def step5_readtransfiles(request):
    user = request.user
    if request.POST:
        data = request.POST
        task_id = int(data['taskid'])
        task = OptTask.objects.get(pk=task_id)
        transdata = False
        nodedata = False
        proddata = False
        msg = []
        try:
            nodedata, proddata = ReadTaskData(task)
            print("Data read!!!")
        except Exception:
            msg.append("No transportation data available!")
        return JsonResponse({
            'msg': msg, 'nodedata': nodedata, 'prodlist': proddata})


@login_required()
def step5_gettransdata(request):
    user = request.user
    if request.POST:
        data = request.POST
        task_id = int(data['taskid'])
        task = OptTask.objects.get(pk=task_id)
        prodid = int(data['prodid'])
        transdata = False
        msg = []
        # try:
        transdata = ReadTransData(task, prodid)
        # except Exception:
        #    msg.append("No transportation data available!")

        return JsonResponse({'msg': msg, 'transdataprod': transdata})


# """Step6 - Ready to go!"""
@login_required()
def exp_task_step6new(request, task_id):
    user = request.user
    task = OptTask.objects.get(pk=task_id)
    task_is_user = task in user.opttask_set.all()
    if not task_is_user:
        return redirect('expert:exp_login')
    else:
        return render(
            request, 'exp_task_step6new.html',
            {'user': user, 'task': task})


@login_required()
def beginsolve(request):
    user = request.user
    if request.POST:
        data = request.POST
        task_id = int(data['taskid'])
        task = OptTask.objects.get(pk=task_id)
        msg = []
        success = True
        try:
            notify_user(user.id, task_id)
            beginsolvenew(task_id)
        except Exception:
            msg.append("An error occured!")
            success = False
        if '6' not in task.finished_steps:
            task.finished_steps += '6'
        task.task_status = "Running"
        task.save()
        return JsonResponse({'msg': msg, 'success': success})
    else:
        return HttpResponse("Invalid request!")


@login_required()
def exp_task_detail_new(request, task_id):
    """Task Home Page"""
    user = request.user
    task = OptTask.objects.get(pk=task_id)
    task_is_user = task in user.opttask_set.all()
    casels = CaseGroup.objects.all()
    fail = 0
    checked = 0
    msg = 0
    if not user.is_authenticated:
        return redirect('expert:exp_login')
    elif (user.last_login is None):
        return redirect('expert:exp_login')
    elif not task_is_user:
        return redirect('expert:exp_login')
    else:
        if (request.GET.get('see_results')):
            return redirect('expert:exp_task_results', task.id)
        else:
            return render(
                request, 'exp_task_detail_new.html',
                {'user': user, 'task': task, 'fail': fail,
                 'checked': checked, 'message': msg, 'casels': casels})


@login_required()
def exp_task_detail_reinitilize(request):
    user = request.user
    if request.POST:
        data = request.POST
        task_id = int(data['taskid'])
        task = OptTask.objects.get(pk=task_id)
        task.task_status = 'Data Required'
        task.code_path = ''
        task.model_type = 0
        task.finished_steps = ''
        task.timeunit = 'year'
        task.supLatLs = []
        task.supLngLs = []
        task.supProLs = []
        task.supCapLs = []
        task.supBidLs = []
        task.supNames = []
        # tech site data
        task.siteLatLs = []
        task.siteLngLs = []
        task.siteTecLs = []
        task.siteCapLs = []
        task.siteNames = []
        # tech cand data
        task.candLatLs = []
        task.candLngLs = []
        task.candTecLs = []
        task.candNames = []
        # demand data
        task.demLatLs = []
        task.demLngLs = []
        task.demProLs = []
        task.demCapLs = []
        task.demBidLs = []
        task.demNames = []
        task.save()
        return JsonResponse({'success': True})
    else:
        return HttpResponse("Invalid request!")


@login_required()
def exp_task_detail_delete(request):
    user = request.user
    if request.POST:
        data = request.POST
        task_id = int(data['taskid'])
        task = OptTask.objects.get(pk=task_id)
        task.delete()
        return JsonResponse({'success': True})
    else:
        return HttpResponse("Invalid request!")


@login_required()
def load_model(request):
    user = request.user
    if request.POST:
        data = request.POST
        task_id = int(data['taskid'])
        load_id = data['loadid']
        if 'c' not in load_id:
            load = OptTask.objects.get(pk=int(load_id))
        else:
            load = CaseStudy.objects.get(pk=int(load_id[1:]))

        task = OptTask.objects.get(pk=task_id)
        task.task_status = "Data Required"

        task.model_type = load.model_type
        task.save()
        task.code_path = codeselector(task.model_type)
        if 'c' not in load_id:
            task.finished_steps = load.finished_steps.replace(
                "5", "").replace("6", "")
        else:
            task.finished_steps = '1234'
        task.timeunit = load.timeunit
        task.supLatLs = load.supLatLs
        task.supLngLs = load.supLngLs
        task.supProLs = load.supProLs
        task.supCapLs = load.supCapLs
        task.supBidLs = load.supBidLs
        task.supNames = load.supNames
        # tech site data
        task.siteLatLs = load.siteLatLs
        task.siteLngLs = load.siteLngLs
        task.siteTecLs = load.siteTecLs
        task.siteCapLs = load.siteCapLs
        task.siteNames = load.siteNames
        # tech cand data
        task.candLatLs = load.candLatLs
        task.candLngLs = load.candLngLs
        task.candTecLs = load.candTecLs
        task.candNames = load.candNames
        # demand data
        task.demLatLs = load.demLatLs
        task.demLngLs = load.demLngLs
        task.demProLs = load.demProLs
        task.demCapLs = load.demCapLs
        task.demBidLs = load.demBidLs
        task.demNames = load.demNames
        task.save()
        print(task.task_status)
        return JsonResponse({'success': True})
    else:
        return HttpResponse("Invalid request!")


@login_required()
def downloadmodeldata(request):
    user = request.user
    if request.POST:
        data = request.POST
        taskid = int(data['taskid'])
        task = OptTask.objects.get(pk=taskid)
        checkls = json.loads(data['checkls'])
        href = writeModelData(task, checkls)
        return JsonResponse({'success': True, 'href': href})
    else:
        return HttpResponse("Invalid request!")


def exp_task_results(request, task_id):
    user = request.user
    task = OptTask.objects.get(pk=task_id)
    task_is_user = task in user.opttask_set.all()
    fail = 0
    if not user.is_authenticated:
        return redirect('expert:exp_login')
    elif (user.last_login is None):
        return redirect('expert:exp_login')
    elif not task_is_user:
        return redirect('expert:exp_login')
    else:
        return render(request, 'exp_task_results.html',
                      {'user': user, 'task': task})


@login_required()
def exp_prodbase(request):
    """Database System - Product Database"""
    user = request.user
    admin = user.is_staff
    if not user.is_authenticated:
        return redirect('expert:exp_login')
    elif (user.last_login is None):
        return redirect('expert:exp_login')
    else:
        prodlist = False
        prodsearch = False
        sf = SearchForm()
        error = False
        if (request.GET.get('search_prod')):
            sf = SearchForm(request.GET)
            if sf.is_valid():
                keywords = sf.cleaned_data['keywords'].split()
                if len(keywords) > 0:
                    query1 = reduce(
                        operator.or_,
                        (Q(name__icontains=item) for item in keywords))
                    query2 = reduce(
                        operator.or_,
                        (Q(additionalinfo__icontains=item)
                         for item in keywords))
                    # prodlist = Product.objects.filter(query1)
                    # prodlist = prodlist | Product.objects.filter(query2)
                    prodlist = user.userdatabase.prods.filter(query1)
                    prodlist = prodlist | user.userdatabase.prods.filter(
                        query2)
                else:
                    prodlist = []
                prodsearch = True
                return render(
                    request, 'exp_database_prod.html',
                    {'searchform': sf, 'prodlist': prodlist,
                     'prodsearch': prodsearch, 'error': error, 'admin': admin})
            else:
                error = 'Form Not Valid'
                return render(
                    request, 'exp_database_prod.html',
                    {'searchform': sf, 'prodlist': prodlist,
                     'prodsearch': prodsearch, 'error': error, 'admin': admin})
        elif (request.GET.get('list_prod')):
            sf = SearchForm()
            # prodlist = Product.objects.all()
            prodlist = user.userdatabase.prods.all()
            prodsearch = True
            return render(
                request, 'exp_database_prod.html',
                {'searchform': sf, 'prodlist': prodlist,
                 'prodsearch': prodsearch, 'error': error, 'admin': admin})
        else:
            return render(
                request, 'exp_database_prod.html',
                {'searchform': sf, 'prodlist': prodlist,
                 'prodsearch': prodsearch, 'error': error, 'admin': admin})


@login_required()
def prodbaseaddproduct(request):
    user = request.user
    if request.POST:
        data = request.POST
        prodname = data['prodname'].replace(
            '"', ' ').replace("'", " ").replace("\n", " ")
        produnit = data['produnit']
        transcost = float(data['prodtranscost'])
        prodnote = data['prodnote'].replace(
            '"', ' ').replace("'", " ").replace("\n", " ")
        public = 1*(data['prodpublic'] == 'true')
        base = user.userdatabase
        p = Product(name=prodname, unit=produnit, transcost=transcost,
                    additionalinfo=prodnote, public=public)
        p.save()
        if not public:
            newitem = UserHasProd(userdatabase=base, product=p)
            newitem.save()
        else:
            for u in User.objects.all():
                b = u.userdatabase
                newitem = UserHasProd(userdatabase=b, product=p)
                newitem.save()
        return JsonResponse({'success': True})
    else:
        return HttpResponse("Invalid request!")


@login_required()
def prodbaseeditprod(request):
    user = request.user
    if request.POST:
        data = request.POST
        prodid = int(data['prodid'])
        base = user.userdatabase
        p = Product.objects.get(id=prodid)
        p.name = data['prodname'].replace(
            '"', ' ').replace("'", " ").replace("\n", " ")
        p.unit = data['produnit']
        p.transcost = float(data['prodtranscost'])
        p.additionalinfo = data['prodnote'].replace(
            '"', ' ').replace("'", " ").replace("\n", " ")
        p.save()
        return JsonResponse({'success': True})
    else:
        return HttpResponse("Invalid request!")


@login_required()
def prodbasedeleteprod(request):
    user = request.user
    if request.POST:
        data = request.POST
        prodid = int(data['prodid'])
        p = Product.objects.get(id=prodid)
        p.delete()
        return JsonResponse({'success': True})
    else:
        return HttpResponse("Invalid request!")


@login_required()
def exp_techbase(request):
    """Database System - Technology Database"""
    user = request.user
    admin = user.is_staff
    prodlist = user.userdatabase.prods.all()
    if not user.is_authenticated:
        return redirect('expert:exp_login')
    elif (user.last_login is None):
        return redirect('expert:exp_login')
    else:
        techlist = False
        techsearch = False
        sf = SearchForm()
        error = False
        if (request.GET.get('search_tech')):
            sf = SearchForm(request.GET)
            if sf.is_valid():
                keywords = sf.cleaned_data['keywords'].split()
                if len(keywords) > 0:
                    query1 = reduce(
                        operator.or_,
                        (Q(name__icontains=item) for item in keywords))
                    query2 = reduce(
                        operator.or_,
                        (Q(notes__icontains=item) for item in keywords))
                    techlist = Technology.objects.filter(query1)
                    techlist = techlist | Technology.objects.filter(query2)
                else:
                    techlist = []
                techsearch = True
                return render(
                    request, 'exp_database_tech.html',
                    {'searchform': sf, 'techlist': techlist,
                     'techsearch': techsearch, 'error': error,
                     'admin': admin, 'prodlist': prodlist})
            else:
                error = 'Form Not Valid'
                return render(
                    request, 'exp_database_tech.html',
                    {'searchform': sf, 'techlist': techlist,
                     'techsearch': techsearch, 'error': error,
                     'admin': admin, 'prodlist': prodlist})
        elif (request.GET.get('list_tech')):
            sf = SearchForm()
            techlist = user.userdatabase.techs.all()
            techsearch = True
            return render(
                request, 'exp_database_tech.html',
                {'searchform': sf, 'techlist': techlist,
                 'techsearch': techsearch, 'error': error,
                 'admin': admin, 'prodlist': prodlist})

        else:
            return render(
                request, 'exp_database_tech.html',
                {'searchform': sf, 'techlist': techlist,
                 'techsearch': techsearch, 'error': error,
                 'admin': admin, 'prodlist': prodlist})


@login_required()
def exp_techbase_graph(request, tech_id):
    user = request.user
    tech = Technology.objects.get(pk=tech_id)
    return render(request, "exp_database_techgraph.html", {'tech': tech})


@login_required()
def savefig_techbase(request):
    user = request.user
    if request.POST:
        data = request.POST
        type = data['type']
        name = data['name']
        content = data['content']
        pngsrc = data['pngsrc']
        msg = 'no message'
        tech_id = int(data['tech_id'])
        tech = Technology.objects.get(pk=tech_id)
        tech.graphcontent = content
        tech.pngsrc = pngsrc
        tech.save()
        msg = 'Change saved.'
        return JsonResponse({'msg': msg, 'tech_id': tech_id})
    else:
        return HttpResponse("Invalid request!")


@login_required()
def techbaseaddtechnology(request):
    user = request.user
    if request.POST:
        data = request.POST
        base = user.userdatabase

        t = Technology(
            name=data['techname'].replace('"', ' ').replace(
                "'", " ").replace("\n", " "),
            public=1*(data['techpublic'] == 'true'),
            notes=data['technotes'].replace('"', ' ').replace(
                "'", " ").replace("\n", " "),
            capmin=float(data['capmin']),
            capmax=float(data['capmax']),
            invcost_fix=float(data['invfix']),
            invcost_pro=float(data['invpro']),
            opcost_fix=float(data['opfix']),
            opcost_pro=float(data['oppro']))
        t.save()

        transformation = json.loads(data['transformation'])
        for item in transformation:
            # print(item)
            newtrans = Transformation(
                technology=t,
                product=product.objects.get(id=int(item['prodid'])),
                transforming_coefficient=float(item['yield']))
            newtrans.save()
            if item['ifrefprod']:
                t.refproduct = int(item['prodid'])
                t.save()

        if not t.public:
            newitem = UserHasTech(userdatabase=base, technology=t)
            newitem.save()
        else:
            for u in User.objects.all():
                b = u.userdatabase
                newitem = UserHasTech(userdatabase=b, technology=t)
                newitem.save()
        return JsonResponse({'success': True, 'techid': t.id})
    else:
        return HttpResponse("Invalid request!")


@login_required()
def techbasedeletetech(request):
    user = request.user
    if request.POST:
        data = request.POST
        techid = int(data['techid'])
        t = Technology.objects.get(id=techid)
        t.delete()
        return JsonResponse({'success': True})
    else:
        return HttpResponse("Invalid request!")


@login_required()
def techbaseedittech(request):
    user = request.user
    if request.POST:
        data = request.POST
        t = Technology.objects.get(id=int(data['techid']))
        t.name = data['techname'].replace('"', ' ').replace(
            "'", " ").replace("\n", " ")
        t.notes = data['technotes'].replace('"', ' ').replace(
            "'", " ").replace("\n", " ")
        t.capmin = float(data['capmin'])
        t.capmax = float(data['capmax'])
        t.invcost_fix = float(data['invfix'])
        t.invcost_pro = float(data['invpro'])
        t.opcost_fix = float(data['opfix'])
        t.opcost_pro = float(data['oppro'])
        t.save()
        transformation = json.loads(data['transformation'])
        for oldtrans in t.transformation_set.all():
            oldtrans.delete()
        for item in transformation:
            newtrans = Transformation(
                technology=t,
                product=product.objects.get(id=int(item['prodid'])),
                transforming_coefficient=float(item['yield']))
            newtrans.save()
            if item['ifrefprod']:
                t.refproduct = int(item['prodid'])
                t.save()
        return JsonResponse({'success': True, 'techid': t.id})
    else:
        return HttpResponse("Invalid request!")


@login_required()
def exp_user_profile(request):
    """User Profile Modification"""
    user = request.user
    return render(request, 'exp_user_profile.html', {'user': user})


@login_required()
def userprofileedit(request):
    user = request.user
    if (request.POST):
        post_data = request.POST
        type = post_data['type']
        value = post_data['new_value']
        if type == 'First Name':
            user.first_name = value
            user.save()
        elif type == 'Last Name':
            user.last_name = value
            user.save()
        elif type == 'Email':
            user.email = value
            user.save()
        elif type == 'password':
            user.set_password(value)
            user.save()
            login(request, user)
        elif type == 'Organization':
            userinfo = UserInfo.objects.get(user=user)
            userinfo.organization = value
            userinfo.save()
        return JsonResponse({'success': True})
    else:
        return HttpResponse("Invalid request!")


@login_required()
def exp_visualization_home(request):
    """Visualization Tool - Home Page of Module"""
    user = request.user
    if not user.is_authenticated:
        return redirect('expert:exp_login')
    elif (user.last_login is None):
        return redirect('expert:exp_login')
    elif (request.GET.get('task_selection')):
        tf = TaskSelectionForm(request.GET, user=request.user)
        if tf.is_valid():
            task_selected = OptTask.objects.get(
                pk=tf.cleaned_data['task_choice'])
            task_id = task_selected.id
            return redirect(
                '/expert/usermain/visualization/results/' + str(task_id))
        else:
            msg = "Form Not Valid!"
            return render(
                request, 'exp_visual_main.html',
                {'user': user, 'taskform': tf, 'error': msg})
    elif (request.GET.get('task_selection2')):
        tf2 = TaskSelectionForm2(request.GET, user=request.user)
        if tf2.is_valid():
            task_selected = OptTask.objects.get(
                pk=tf2.cleaned_data['task_choice'])
            task_id = task_selected.id
            return redirect(
                '/expert/usermain/visualization/data/' + str(task_id))
    else:
        tf = TaskSelectionForm(user=user)
        tf2 = TaskSelectionForm2(user=user)
        return render(
            request, 'exp_visual_main.html',
            {'user': user, 'taskform': tf, 'taskform2': tf2})


@login_required()
def exp_visualization_geo(request):
    """Visualization Tool - Visualize Uploaded Datafiles"""
    user = request.user
    return render(request, 'exp_visual_file.html', {'user': user})


@login_required()
def visualuploadedfile(request):
    user = request.user
    if (request.POST):
        data = request.POST
        type = data['type']
        docid = data['id']
        doc = DataDocument.objects.get(id=docid)
        ls = False
        error = []
        if doc.datatype == 'Supply Data':
            msg, ls = readSupFile(user, doc.docfile)
            if msg:
                error.append(msg)
        if doc.datatype == 'Demand Data':
            prodids = []
            for userhasprod in user.userdatabase.userhasprod_set.all():
                prodids.append(str(userhasprod.product.id))
            msg, ls = readDemFile(user, doc.docfile, prodids)
            if msg:
                error.append(msg)
        if doc.datatype == 'Technology Site Data':
            techids = []
            for userhastech in user.userdatabase.userhastech_set.all():
                techids.append(str(userhastech.technology.id))
            msg, ls = readTechFile(user, doc.docfile, doc.datatype, techids)
            if msg:
                error.append(msg)
        if doc.datatype == 'Technology Candidate Data':
            techids = []
            for userhastech in user.userdatabase.userhastech_set.all():
                techids.append(str(userhastech.technology.id))
            msg, ls = readTechFile(user, doc.docfile, doc.datatype, techids)
            if msg:
                error.append(msg)
        return JsonResponse({'success': True, 'ls': ls, 'error': error})
    else:
        return HttpResponse("Invalid request!")


@login_required()
def exp_visualization_upload(request):
    """Visualization Tool - Visualize Nodes and Flows"""
    user = request.user
    if (request.POST.get('upload_file_geo')):
        uf = VisualUploadForm(request.POST, request.FILES)
        msg = []
        msg1 = []
        msg2 = []
        nodedata = False
        flows = False
        destinations = False
        origins = False
        new_node_file = False
        new_flow_file = False
        type = 0
        if uf.is_valid():
            if (uf.cleaned_data['nodefile']):
                new_node_file = user.tempdocument_set.create(
                    docfile=uf.cleaned_data['nodefile'],
                    date_upload=timezone.now())
                msg1, nodedata = readNodeFile(new_node_file.docfile)
                new_node_file.delete()
            if (uf.cleaned_data['flowfile']):
                new_flow_file = user.tempdocument_set.create(
                    docfile=uf.cleaned_data['flowfile'],
                    date_upload=timezone.now())
                msg2, destinations, origins, flows = readFlowFile(
                    nodedata, new_flow_file.docfile)
                new_flow_file.delete()
            type = int(uf.cleaned_data['selectmode'])
            for item in msg1:
                msg.append(item)
            for item in msg2:
                msg.append(item)
        return render(
            request, 'exp_visual_upload.html',
            {'user': user, 'nodedata': nodedata, 'dataupload': uf,
             'error': msg, 'origins': origins,
             'destinations': destinations, 'flows': flows, 'type': type})
    else:
        uf = VisualUploadForm()
        return render(
            request, 'exp_visual_upload.html',
            {'user': user, 'dataupload': uf})


@login_required()
def exp_visualization_georesult(request, task_id):
    """Visualization Tool - Visualize Task Results"""
    # need to impplement a function to read results
    user = request.user
    task = OptTask.objects.get(id=task_id)
    nodedata, supresults, demresults, candresults, siteresults = \
        ReadTaskResultBasic(task)
    return render(
        request, 'exp_visual_result.html',
        {'user': user, 'task': task, 'supresults': supresults,
         'demresults': demresults, 'candresults': candresults,
         'siteresults': siteresults, 'nodedata': nodedata})


@login_required()
def readtaskresult(request):
    user = request.user
    if request.POST:
        data = request.POST
        task_id = int(data['taskid'])
        task = OptTask.objects.get(pk=task_id)
        transdata = False
        nodedata = False
        proddata = False
        pricedata = False
        msg = []
        try:
            transdata, nodedata, proddata, pricedata = ReadTaskResult(task)
        except Exception:
            msg.append("No Result Available!")

        return JsonResponse({
            'msg': msg, 'transdata': transdata, 'nodedata': nodedata,
            'prodlist': proddata, 'pricedata': pricedata})


# """Visualization Tool - Visualize Model Data"""
@login_required()
def exp_visualization_modeldata(request, task_id):
    user = request.user
    task = OptTask.objects.get(id=task_id)
    return render(
        request, 'exp_visual_model.html', {'user': user, 'task': task})


# """Managing Case Study"""
def exp_demomain(request):
    user = request.user
    casestudy_list = CaseStudy.objects.all()
    casegroup_list = CaseGroup.objects.all()
    return render(
        request, "exp_casemain.html",
        {'casestudylist': casestudy_list, 'casegrouplist': casegroup_list})


@login_required()
def exp_managecasestudy(request):
    user = request.user
    if not user.is_staff:
        return redirect('expert:exp_login')
    casestudy_list = CaseStudy.objects.all()
    casegroup_list = CaseGroup.objects.all()
    return render(
        request, "exp_casemanage.html",
        {'casestudylist': casestudy_list, 'casegrouplist': casegroup_list})


@login_required()
def groupcases(request):
    user = request.user
    if not user.is_staff:
        return redirect('expert:exp_login')
    if request.POST:
        data = request.POST
        casels = data['casels']
        casels = casels.replace('\n', '')
        casels = json.loads(casels)
        casegroup = CaseGroup(name=data['groupname'])
        casegroup.save()
        for item in casels:
            if item['id']:
                case = CaseStudy.objects.get(id=int(item['id']))
                groupcase = GroupHasCase(casegroup=casegroup, casestudy=case)
                groupcase.save()
        casegroup.save()

        return JsonResponse({'success': True})
    else:
        return HttpResponse("Invalid request!")


@login_required()
def deletecases(request):
    user = request.user
    if not user.is_staff:
        return redirect('expert:exp_login')
    if request.POST:
        data = request.POST
        caseidls = data['caseidls']
        caseidls = caseidls.replace('\n', '')
        caseidls = json.loads(caseidls)
        mode = data['mode']
        if mode == 'study':
            for item in caseidls:
                if item['id']:
                    case = CaseStudy.objects.get(id=int(item['id']))
                    case.delete()
        if mode == 'group':
            for item in caseidls:
                if item['id']:
                    casegroup = CaseGroup.objects.get(id=int(item['id']))
                    casegroup.delete()
        return JsonResponse({'success': True})
    else:
        return HttpResponse("Invalid request!")


@login_required()
def renamecase(request):
    user = request.user
    if not user.is_staff:
        return redirect('expert:exp_login')
    if request.POST:
        data = request.POST
        caseid = data['caseid']
        mode = data['type']
        if mode == 'study':
            case = CaseStudy.objects.get(id=caseid)
            case.name = data['newname']
            case.save()
        if mode == 'group':
            casegroup = CaseGroup.objects.get(id=caseid)
            casegroup.name = data['newname']
            casegroup.save()
        return JsonResponse({'success': True})
    else:
        return HttpResponse("Invalid request!")


@login_required()
def editscenario(request):
    user = request.user
    if not user.is_staff:
        return redirect('expert:exp_login')
    if request.POST:
        data = request.POST
        caseid = data['caseid']
        groupid = data['groupid']
        case = CaseStudy.objects.get(pk=int(caseid))
        group = CaseGroup.objects.get(pk=int(groupid))
        mode = data['mode']
        msg = []
        if mode == 'add':
            try:
                groupcase = GroupHasCase(casegroup=group, casestudy=case)
                groupcase.save()
            except Exception:
                msg.append('This scenario is already in the case study.')
        if mode == 'remove':
            try:
                groupcase = GroupHasCase.objects.get(
                    casegroup=group, casestudy=case)
                groupcase.delete()
            except Exception:
                msg.append('This scenario is not in the case study.')
        return JsonResponse({'success': True, 'msg': msg})
    else:
        return HttpResponse("Invalid request!")


@login_required()
def publishcase(request):
    user = request.user
    if not user.is_staff:
        return redirect('expert:exp_login')
    if request.POST:
        data = request.POST
        caseidls = data['caseidls']
        caseidls = caseidls.replace('\n', '')
        caseidls = json.loads(caseidls)
        for item in caseidls:
            if item['id']:
                casegroup = CaseGroup.objects.get(id=int(item['id']))
                cases = casegroup.childrencase.all()
                for case in cases:
                    prodlist = case.getprodlist()
                    techlist = case.gettechlist()
                    for prodid in prodlist:
                        Prod = Product.objects.get(pk=int(prodid))
                        if not Prod.public:
                            Prod.public = True
                            Prod.onpublic()
                            Prod.save()
                    for techid in techlist:
                        Tech = Technology.objects.get(pk=int(techid))
                        if not Tech.public:
                            Tech.public = True
                            Tech.onpublic()
                            Tech.save()
                if casegroup.published:
                    casegroup.published = False
                else:
                    casegroup.published = True
                casegroup.save()
        return JsonResponse({'success': True})
    else:
        return HttpResponse("Invalid request!")


@login_required()
def exp_casestudydetail(request, case_id):
    user = request.user
    taskgroup = CaseGroup.objects.get(pk=case_id)
    tasks = taskgroup.childrencase.all()
    if (not taskgroup.published) and (not user.is_staff):
        return HttpResponse("Invalid request!")
    else:
        if request.POST:
            data = request.POST
            task = CaseStudy.objects.get(pk=int(data['selectcase']))
            return render(
                request, 'exp_casestudydetail.html',
                {'user': user, 'taskgroup': taskgroup, 'task': task})
        else:
            return render(
                request, 'exp_casestudydetail.html',
                {'user': user, 'taskgroup': taskgroup, 'task': tasks[0]})


@login_required()
def casereadtransfiles(request):
    user = request.user
    if request.POST:
        data = request.POST
        caseid = int(data['caseid'])
        case = CaseStudy.objects.get(pk=caseid)
        transdata = False
        nodedata = False
        proddata = False
        msg = []
        # try:
        nodedata, proddata, transdata = ReadCaseData(case)
        print("Data read!!!")
        # except Exception:
        #     msg.append("No transportation data available!")
        return JsonResponse({
            'msg': msg, 'nodedata': nodedata, 'prodlist': proddata,
            'transdata': transdata})


@login_required()
def copycase(request):
    user = request.user
    if request.POST:
        data = request.POST
        load = CaseStudy.objects.get(pk=data['caseid'])
        task = OptTask(user=user, task_name=data['modelname'])
        task.task_status = 'Data Required'
        task.model_type = load.model_type
        task.code_path = codeselector(task.model_type)
        task.date_create = timezone.now()
        task.finished_steps = '1234'
        task.timeunit = load.timeunit
        task.supLatLs = load.supLatLs
        task.supLngLs = load.supLngLs
        task.supProLs = load.supProLs
        task.supCapLs = load.supCapLs
        task.supBidLs = load.supBidLs
        task.supNames = load.supNames
        # tech site data
        task.siteLatLs = load.siteLatLs
        task.siteLngLs = load.siteLngLs
        task.siteTecLs = load.siteTecLs
        task.siteCapLs = load.siteCapLs
        task.siteNames = load.siteNames
        # tech cand data
        task.candLatLs = load.candLatLs
        task.candLngLs = load.candLngLs
        task.candTecLs = load.candTecLs
        task.candNames = load.candNames
        # demand data
        task.demLatLs = load.demLatLs
        task.demLngLs = load.demLngLs
        task.demProLs = load.demProLs
        task.demCapLs = load.demCapLs
        task.demBidLs = load.demBidLs
        task.demNames = load.demNames
        task.save()
        return JsonResponse({'success': True})
    else:
        return HttpResponse("Invalid request!")


@login_required()
def exp_addcasestudy(request):
    user = request.user
    if not user.is_staff:
        return redirect('expert:exp_login')

    task_list = []
    for task_item in OptTask.objects.all():
        if task_item.task_status == 'Completed':  # Only show completed tasks
            task_list.append(task_item)

    return render(
        request, "exp_addcasestudy.html", {'tasklist': task_list})


@login_required()
def makingcasestudy1(request):
    user = request.user
    if not user.is_staff:
        return redirect('expert:exp_login')

    if request.POST:
        data = request.POST
        load_id = int(data['taskid'])
        casename = data['casename'].replace(
            "'", '').replace('"', '').replace('/', '-')
        task = CaseStudy(name=casename)
        load = OptTask.objects.get(pk=load_id)
        task.timeunit = load.timeunit
        task.model_type = load.model_type
        task.supLatLs = load.supLatLs
        task.supLngLs = load.supLngLs
        task.supProLs = load.supProLs
        task.supCapLs = load.supCapLs
        task.supBidLs = load.supBidLs
        task.supNames = load.supNames
        # tech site data
        task.siteLatLs = load.siteLatLs
        task.siteLngLs = load.siteLngLs
        task.siteTecLs = load.siteTecLs
        task.siteCapLs = load.siteCapLs
        task.siteNames = load.siteNames
        # tech cand data
        task.candLatLs = load.candLatLs
        task.candLngLs = load.candLngLs
        task.candTecLs = load.candTecLs
        task.candNames = load.candNames
        # demand data
        task.demLatLs = load.demLatLs
        task.demLngLs = load.demLngLs
        task.demProLs = load.demProLs
        task.demCapLs = load.demCapLs
        task.demBidLs = load.demBidLs
        task.demNames = load.demNames

        task.target_taskid = load.id
        task.save()
        task.copyfiles(load)
        return JsonResponse({'success': True})
    else:
        return HttpResponse("Invalid request!")


@login_required()
def exp_addcasestudy2(request):
    user = request.user
    if not user.is_staff:
        return redirect('expert:exp_login')

    return render(request, "exp_addcasestudy2.html")
