# views.py (ADAM)
# !/usr/bin/env python3
# coding=utf-8
# ruiz-mercado.gerardo@epa.gov

"""Add docstring."""  # TODO: add docstring.

# for the main page
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect
from django.core.mail import send_mail, get_connection
from django.urls import reverse
from django.conf import settings
from .forms import *
import json
import csv
import string
import random
import math
import subprocess
import os
import sys


def dashboard(request):
    """Forward request so /dashboard goes to /expert/dashboard. """
    return HttpResponseRedirect('/expert/dashboard')


# to generate a random string as a pseudo id for tasks
def id_generator(size=20, chars=string.ascii_uppercase + string.digits):
    """Add docstring."""  # TODO: add docstring.
    return ''.join(random.choice(chars) for _ in range(size))


def main(request):
    """Add docstring."""  # TODO: add docstring.
    return render(request, 'index.html')


def getdata(request):
    """Add docstring."""  # TODO: add docstring.
    if request.POST:
        data = request.POST
        id = data['id']
        state = id[6:].capitalize()
        filename = os.path.join(
            settings.STATICFILES_DIRS[0], 'maindata/' + id + '.csv')
        with open(filename, newline='') as csvfile:
            lsdata = list(csv.reader(csvfile))
        ls = lsdata[1:]

        return JsonResponse({'id': id, 'ls': ls})
    else:
        return HttpResponse("Invalid request!")


def getbounds(request):
    """Add docstring."""  # TODO: add docstring.
    if request.POST:
        data = request.POST
        id = data['id']
        filename = id+'.zip'
        return JsonResponse({'id': id, 'path': filename})
    else:
        return HttpResponse("Invalid request!")


def support(request):
    """Add docstring."""  # TODO: add docstring.
    return render(request, 'support.html')


def about(request):
    """Add docstring."""  # TODO: add docstring.
    return render(request, 'main/about.html')


def demo(request):
    """Add docstring."""  # TODO: add docstring.
    return render(request, 'demo.html')


def demo_eg1(request):
    """Add docstring."""  # TODO: add docstring.
    return render(request, 'demo_eg1.html')


def demo_eg2(request):
    """Add docstring."""  # TODO: add docstring.
    return render(request, 'demo_eg2.html')


def beginsolveeg2(request):
    """Add docstring."""  # TODO: add docstring.
    user = request.user
    if request.POST:
        data = request.POST
        nodedata = json.loads(data['nodedata'])
        supdata = json.loads(data['supdata'])
        sitedata = json.loads(data['sitedata'])
        canddata = json.loads(data['canddata'])
        demdata = json.loads(data['demdata'])
        print(demdata)
        proddata = json.loads(data['proddata'])
        techdata = json.loads(data['techdata'])
        alphadata = json.loads(data['alphadata'])
        pseudoID = id_generator()
        # generate files and begin to solve and wait
        nodefilename = settings.MEDIA_ROOT + '/public/eg2_node_' + \
            pseudoID + '.csv'
        techfilename = settings.MEDIA_ROOT + '/public/eg2_tech_' + \
            pseudoID + '.csv'
        supfilename = settings.MEDIA_ROOT + '/public/eg2_sup_' + \
            pseudoID + '.csv'
        demfilename = settings.MEDIA_ROOT + '/public/eg2_dem_' + \
            pseudoID + '.csv'
        sitefilename = settings.MEDIA_ROOT + '/public/eg2_site_' + \
            pseudoID + '.csv'
        prodfilename = settings.MEDIA_ROOT + '/public/eg2_prod_' + \
            pseudoID + '.csv'
        candfilename = settings.MEDIA_ROOT + '/public/eg2_cand_' + \
            pseudoID + '.csv'
        alphafilename = settings.MEDIA_ROOT + '/public/eg2_alpha_' + \
            pseudoID + '.csv'
        codepath = settings.MEDIA_ROOT + '/public/supply_chain_design_eg2.jl'

        with open(nodefilename, 'w') as csvfile:
            writer = csv.writer(csvfile, delimiter=',')
            writer.writerow(['#node', 'lat', 'lng'])
            for i in nodedata:
                writer.writerow(i)

        with open(supfilename, 'w') as csvfile:
            writer = csv.writer(csvfile, delimiter=',')
            writer.writerow(['#sup', 'node', 'prod', 'price', 'cap'])
            for i in supdata:
                writer.writerow(i)

        with open(demfilename, 'w') as csvfile:
            writer = csv.writer(csvfile, delimiter=',')
            writer.writerow(['#dem', 'node', 'prod', 'price', 'cap'])
            for i in demdata:
                writer.writerow(i)

        with open(sitefilename, 'w') as csvfile:
            writer = csv.writer(csvfile, delimiter=',')
            writer.writerow(['#site', 'node', 'tech', 'cap'])
            for i in sitedata:
                writer.writerow(i)

        with open(candfilename, 'w') as csvfile:
            writer = csv.writer(csvfile, delimiter=',')
            writer.writerow(['#cand', 'node', 'tech'])
            for i in canddata:
                writer.writerow(i)

        with open(prodfilename, 'w') as csvfile:
            writer = csv.writer(csvfile, delimiter=',')
            writer.writerow(['#prod', 'name', 'transcost'])
            for i in proddata:
                writer.writerow(i)

        with open(techfilename, 'w') as csvfile:
            writer = csv.writer(csvfile, delimiter=',')
            writer.writerow(['#tech', 'name', 'capmin', 'capmax', 'refprod',
                             'Kinv', 'Binv', 'Kop', 'Bop'])
            for i in techdata:
                writer.writerow(i)

        with open(alphafilename, 'w') as csvfile:
            writer = csv.writer(csvfile, delimiter=',')
            for i in alphadata: 
                writer.writerow(i)

        cmd = [
            "/home/bitnami/julia-1.1.1/bin/julia", codepath, nodefilename,
            supfilename, demfilename, sitefilename, candfilename,
            prodfilename, techfilename, alphafilename, pseudoID]
        print(cmd)
        p = subprocess.Popen(cmd, stderr=sys.stderr, stdout=sys.stdout)

        p.wait()

        return JsonResponse({'success': True, 'pseudoID': pseudoID})
    else:
        return HttpResponse("Invalid request!")


def eg2_results(request, id):
    """Add docstring."""  # TODO: add docstring.
    error = 0
    id_string = id

    nodefilename = settings.MEDIA_ROOT + '/public/eg2_node_' + \
        id_string + '.csv'
    techfilename = settings.MEDIA_ROOT + '/public/eg2_tech_' + \
        id_string + '.csv'
    supfilename = settings.MEDIA_ROOT + '/public/eg2_sup_' + \
        id_string + '.csv'
    demfilename = settings.MEDIA_ROOT + '/public/eg2_dem_' + \
        id_string + '.csv'
    candfilename = settings.MEDIA_ROOT + '/public/eg2_cand_' + \
        id_string + '.csv'
    sitefilename = settings.MEDIA_ROOT + '/public/eg2_site_' + \
        id_string + '.csv'
    prodfilename = settings.MEDIA_ROOT + '/public/eg2_prod_' + \
        id_string + '.csv'
    # distfilename = settings.MEDIA_ROOT + '/public/eg2_dist_' + \
    # id_string + '.csv'
    alphafilename = settings.MEDIA_ROOT + '/public/eg2_alpha_' + \
        id_string + '.csv'
    summaryfilename = settings.MEDIA_ROOT + '/public/results_summary_' + \
        id_string + '.csv'

    transfilenamels = []
    # for i in range(6):
    #    name = settings.MEDIA_ROOT + '/public/eg2_trans' + str(i) + \
    #        '_' + id_string + '.csv'
    #    transfilenamels.append(name)

    transresultnamels = []
    for i in [1, 2, 3, 4, 5]:
        name = settings.MEDIA_ROOT + '/public/flow_results_p' + str(i) + \
            '_' + id_string + '.csv'
        transresultnamels.append(name)
    distdata = []

    summary = ''
    # try:
    with open(summaryfilename, newline='') as csvfile:
        spamreader = csv.reader(csvfile, delimiter=',', quotechar='|')
        for row in spamreader:
            summary += ': '.join(row)
            summary += '\n'

    with open(prodfilename, newline='') as csvfile:
        data = list(csv.reader(csvfile))

    prodlist = [
        {'prod_id': data[i][0], 'prodname': data[i][1],
         'transcost': data[i][2], 'prodnote': ''} for i in range(1, len(data))
    ]

    with open(techfilename, newline='') as csvfile:
        data = list(csv.reader(csvfile))

    techlist = [{
        'tech_id': data[i][0], 'techname': data[i][1], 'capmin': data[i][2],
        'capmax': data[i][3], 'refprod': data[i][4], 'Kinv': data[i][5],
        'Binv': data[i][6], 'Kop': data[i][7], 'Bop': data[i][8]}
        for i in range(1, len(data))]

    with open(alphafilename, newline='') as csvfile:
        data = list(csv.reader(csvfile))

    yieldlist = [data[0][0], data[0][1], data[0][2], data[1][0],
                 data[1][2], data[1][3], data[2][0], data[2][2], data[2][4]]

    with open(nodefilename, newline='') as csvfile:
        data = list(csv.reader(csvfile))

    nodelist = [
        {'node': data[i][0], 'x': data[i][1], 'y': data[i][2],
         'cand': 0, name: 'Anon.'} for i in range(1, len(data))
    ]

    with open(supfilename, newline='') as csvfile:
        supdata = list(csv.reader(csvfile))

    with open(demfilename, newline='') as csvfile:
        demdata = list(csv.reader(csvfile))

    with open(sitefilename, newline='') as csvfile:
        sitedata = list(csv.reader(csvfile))

    transdata = []

    # for i in range(6):
    #    name = transfilenamels[i]
    #    with open(name, newline='') as csvfile:
    #        data = list(csv.reader(csvfile))
    #    data = [[data[i][j] for j in range(
    #       1, len(data[0]))] for i in range(1, len(data))]
    #    transdata.append(data)

    transresult = []
    for i in range(5):
        name = transresultnamels[i]
        with open(name, newline='') as csvfile:
            data = list(csv.reader(csvfile))
        data = [[
            data[i][j] for j in range(1, len(data[0]))]
            for i in range(1, len(data))]
        transresult.append(data)

    # except:
    #    summary = 'Request not valid!'
    #    error = 1
    # else:
    #    pass

    return render(
        request, 'eg2_results.html', {
            'id': id_string, 'summary': summary, 'proddata': prodlist,
            'techdata': techlist, 'yielddata': yieldlist, 'nodedata': nodelist,
            'distdata': distdata, 'supdata': supdata, 'demdata': demdata,
            'sitedata': sitedata, 'transdata': transdata,
            'transresult': transresult
            }
        )


def contact(request):
    """Add docstring."""  # TODO: add docstring.
    submitted = False
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            cd = form.cleaned_data
            # assert False
            con = get_connection(
                'django.core.mail.backends.console.EmailBackend')
            send_mail(
                cd['subject'],
                'From: ' + cd['email'] + '\n' + cd['message'],
                'email-host@xxx.com',
                ['service-email@xxx.com'],  # service email
                fail_silently=False)
            send_mail(
                'Message Received',
                'We have reveived your message and will respond to you soon!',
                'email-host@xxx.com',
                [cd['email']],  # service email
                fail_silently=False)
            return HttpResponseRedirect('/contact?submitted=True')
    else:
        form = ContactForm()
        if 'submitted' in request.GET:
            submitted = True
        return render(request, 'main/contact.html',
                      {'form': form, 'submitted': submitted})
