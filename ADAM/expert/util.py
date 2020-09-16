# util.py (expert)
# !/usr/bin/env python3
# coding=utf-8
# ruiz-mercado.gerardo@epa.gov


"""Add docstring."""  # TODO: add docstring.


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
from django.core.files import File
from wsgiref.util import FileWrapper
from django.db.models import Q
from functools import reduce
from .models import *
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


"""This script contains several utility functions used in views.py"""


# to generate a random string as a pseudo id for tasks
def id_generator(size=20, chars=string.ascii_uppercase + string.digits):
    """Generate random ID string."""
    return ''.join(random.choice(chars) for _ in range(size))


# need to be consistent with TaskCreationForm
def codeselector(modeltype):
    """Select code path based on model type."""
    if int(modeltype) == 1:  # supply chain design
        return "julia_script/supply_chain_design.jl"
    elif int(modeltype) == 2:  # market clearing
        return "julia_script/market_clearing.jl"
    elif int(modeltype) == 3:  # pure logistic design
        return "julia_script/logistic_design.jl"


def getcoef(unit):
    """Get the coefficient based on time step."""
    if unit == 'year':
        return 1.0
    elif unit == 'month':
        return 1.0/12
    elif unit == 'day':
        return 1.0/365
    else:
        return 1.0


def timeselector(i):
    """Map int selection with time step."""
    if int(i) == 1:
        return "year"
    elif int(i) == 2:
        return "month"
    elif int(i) == 3:
        return "day"
    elif int(i) == 4:
        return '\u0394t'


# to check if a string can be converted to a float
def isfloat(value):
    """Check if a string can be converted into float."""
    try:
        float(value)
        return True
    except ValueError:
        return False


def readSupFile(user, path):
    """
    Read a supply data file.
    
    Specify user object and datadocfile.docpath, return msg and data.
    """
    # extract user accessible product
    UserProd = []
    for userhasprod in user.userdatabase.userhasprod_set.all():
        UserProd.append(str(userhasprod.product.id))

    msg = []
    data = False
    try:
        temp_path = settings.MEDIA_ROOT + '/' + str(path)
        with open(temp_path, newline='') as csvfile:
            data = list(csv.reader(csvfile))
    except Exception:
        msg.append('Supply file lost or not valid.')
    else:
        try:
            latlist = [data[i][1] for i in range(1, len(data))]
            lnglist = [data[i][2] for i in range(1, len(data))]
            prodlist = [data[i][3] for i in range(1, len(data))]
            caplist = [data[i][5] for i in range(1, len(data))]
            pricelist = [data[i][4] for i in range(1, len(data))]
        except Exception:
            msg.append('Uploaded file has incorrect structure. ' +
                       'Please refer to the template.')
        else:
            float_check = True
            for i in range(len(latlist)):
                if isfloat(latlist[i]) and isfloat(lnglist[i]) and \
                        isfloat(caplist[i]) and isfloat(pricelist[i]):
                    pass
                else:
                    float_check = False
                    index = i+2
                    break
            if not float_check:
                msg.append('Some data cannot be converted to float. ' +
                           'Please check line ' + str(index) + '.')

            positive_check = True
            for i in range(len(latlist)):
                if isfloat(caplist[i]):
                    if float(caplist[i]) >= 0:
                        pass
                    else:
                        positive_check = False
                        index = i+2
                        break
            if not positive_check:
                msg.append('Some capacity is negative. Please check line ' +
                           str(index) + '.')

            prod_check = True
            for pp in prodlist:
                p = pp[1:]
                if p in UserProd:
                    pass
                else:
                    prod_check = False
                    name = pp
                    break
            if not prod_check:
                msg.append(name + ' is not a valid feedstock ID.')
    if len(msg) > 0:
        data = False
    return msg, data


def readTechFile(user, path, type, techids):
    """
    Read a technology data file.
    
    Specify user object, datadocfile.docpath, data type  (Site or Candidate),
    and a string list of available technology ids, return msg and data.
    """
    # extract user accessible product

    msg = []
    data = False
    try:
        temp_path = settings.MEDIA_ROOT + '/' + str(path)
        with open(temp_path, newline='') as csvfile:
            data = list(csv.reader(csvfile))
    except Exception:
        msg.append('Technology file lost or not valid.')
    else:
        try:
            if 'Site' in type:
                latlist = [data[i][1] for i in range(1, len(data))]
                lnglist = [data[i][2] for i in range(1, len(data))]
                techlist = [data[i][3] for i in range(1, len(data))]
                caplist = [data[i][4] for i in range(1, len(data))]
            else:
                latlist = [data[i][1] for i in range(1, len(data))]
                lnglist = [data[i][2] for i in range(1, len(data))]
                techlist = [data[i][3] for i in range(1, len(data))]
                caplist = False
        except Exception:
            msg.append('Uploaded file has incorrect structure. ' +
                       'Please refer to the template.')
        else:
            float_check = True
            for i in range(len(latlist)):
                if caplist:
                    if isfloat(latlist[i]) and isfloat(lnglist[i]) and \
                                isfloat(caplist[i]):
                        pass
                    else:
                        float_check = False
                        index = i+2
                        break
                else:
                    if isfloat(latlist[i]) and isfloat(lnglist[i]):
                        pass
                    else:
                        float_check = False
                        index = i+2
                        break
            if not float_check:
                msg.append('Some data cannot be converted to float. ' +
                           'Please check line ' + str(index) + '.')

            capacity_check = True
            if caplist:
                for i in range(len(latlist)):
                    if isfloat(caplist[i]):
                        if float(caplist[i]) >= 0:
                            pass
                        else:
                            capacity_check = False
                            index = i+2
                            break
                if not capacity_check:
                    msg.append(
                        'Some capacity is negative. Please check line ' +
                        str(index) + '.')

            tech_check = True
            for tt in techlist:
                t = tt[1:]
                if t in techids:
                    pass
                else:
                    tech_check = False
                    name = tt
                    break
            if not tech_check:
                msg.append(name + ' is either not a valid technology ID ' +
                           'or is not an applicable technology.')
    if len(msg) > 0:
        data = False
    return msg, data


def readDemFile(user, path, prodids):
    """
    Read a demand data file.
    
    Specify user object, datadocfile.docpath, and a string list of available
    product ids, return msg and data.
    """
    # extract user accessible product
    msg = []
    data = False
    try:
        temp_path = settings.MEDIA_ROOT + '/' + str(path)
        with open(temp_path, newline='') as csvfile:
            data = list(csv.reader(csvfile))
    except Exception:
        msg.append('Demand file lost or not valid.')
    else:
        try:
            latlist = [data[i][1] for i in range(1, len(data))]
            lnglist = [data[i][2] for i in range(1, len(data))]
            prodlist = [data[i][3] for i in range(1, len(data))]
            caplist = [data[i][5] for i in range(1, len(data))]
            pricelist = [data[i][4] for i in range(1, len(data))]
        except Exception:
            msg.append('Uploaded file has incorrect structure. ' +
                       'Please refer to the template.')
        else:
            float_check = True
            for i in range(len(latlist)):
                if isfloat(latlist[i]) and isfloat(lnglist[i]) and \
                        isfloat(caplist[i]) and isfloat(pricelist[i]):
                    pass
                else:
                    float_check = False
                    index = i+2
                    break
            if not float_check:
                msg.append('Some data cannot be converted to float. ' +
                           'Please check line ' + str(index) + '.')

            positive_check = True
            for i in range(len(latlist)):
                if isfloat(caplist[i]):
                    if float(caplist[i]) >= 0:
                        pass
                    else:
                        positive_check = False
                        index = i+2
                        break
            if not positive_check:
                msg.append('Some capacity is negative. Please check line ' +
                           str(index) + '.')

            prod_check = True
            for pp in prodlist:
                p = pp[1:]
                if p in prodids:
                    pass
                else:
                    prod_check = False
                    name = pp
                    break
            if not prod_check:
                msg.append(name + ' is either not a valid ID or is not ' +
                           'an applicable product.')
    if len(msg) > 0:
        data = False
    return msg, data


def WriteTransfiles(task, transfile=True):
    """
    Based on defined supply, demand, and technology data.
    
    Generate 8 files needed for julia script and transportation matrix for each
    product, return node list, product list, and transportation matrices.
    """
    user = task.user
    task_id = task.id
    # prodlist = task.getprodlist()
    transdata = False

    # remove existing files
    folder = settings.MEDIA_ROOT + '/' + str(user.id) + '_' + \
        user.username + '/task_' + str(task.id) + '/'
    try:
        os.stat(folder)
    except Exception:
        os.mkdir(folder)

    for root, dirs, files in os.walk(folder):
        for filename in files:
            ff = folder + filename
            if ('transmatrix_' in ff) or ('node_data' in ff) or \
                    ('sup_data' in ff) or ('dem_data' in ff) or \
                    ('tech_data' in ff) or ('prod_data' in ff) or \
                    ('alpha_data' in ff) or ('site_data' in ff) or \
                    ('cand_data' in ff):
                os.remove(ff)

    nodelatlngdic = {}

    nodedata = [["node", "lat", "lng"]]
    supdata = [["sup", "node", "prod", "price", "cap"]]
    demdata = [["dem", "node", "prod", "price", "cap"]]
    techdata = [["tech", "name", "capmin", "capmax", "refprod", "Kinv",
                 "Binv", "Kop", "Bop"]]
    proddata = [["prod", "name", "transcost"]]
    alphadata = []
    sitedata = [["site", "node", "tech", "cap"]]
    canddata = [["cand", "node", "tech"]]

    # make the node lat-lng dictionary
    nn = 1
    for i in range(len(task.supLatLs)):
        if (task.supLatLs[i], task.supLngLs[i]) not in nodelatlngdic:
            nodelatlngdic[(task.supLatLs[i], task.supLngLs[i])] = "n" + str(nn)
            nodedata.append(["n" + str(nn), task.supLatLs[i],
                            task.supLngLs[i]])
            nn += 1
    for i in range(len(task.siteLatLs)):
        if (task.siteLatLs[i], task.siteLngLs[i]) not in nodelatlngdic:
            nodelatlngdic[(task.siteLatLs[i], task.siteLngLs[i])] = \
                "n" + str(nn)
            nodedata.append(["n" + str(nn), task.siteLatLs[i],
                            task.siteLngLs[i]])
            nn += 1
    for i in range(len(task.candLatLs)):
        if (task.candLatLs[i], task.candLngLs[i]) not in nodelatlngdic:
            nodelatlngdic[(task.candLatLs[i], task.candLngLs[i])] = \
                "n" + str(nn)
            nodedata.append(["n" + str(nn), task.candLatLs[i],
                            task.candLngLs[i]])
            nn += 1
    for i in range(len(task.demLatLs)):
        if (task.demLatLs[i], task.demLngLs[i]) not in nodelatlngdic:
            nodelatlngdic[(task.demLatLs[i], task.demLngLs[i])] = \
                "n" + str(nn)
            nodedata.append(["n" + str(nn), task.demLatLs[i],
                            task.demLngLs[i]])
            nn += 1

    prodidls = []
    ss = 1
    for i in range(len(task.supLatLs)):
        prodid = task.supProLs[i]
        name = 's'+str(ss)
        node = nodelatlngdic[(task.supLatLs[i], task.supLngLs[i])]
        prod = 'p'+prodid
        price = task.supBidLs[i]
        cap = task.supCapLs[i]
        supdata.append([name, node, prod, price, cap])
        ss += 1
        if prodid not in prodidls:
            prodidls.append(prodid)
            prod = "p" + prodid
            Prodobj = Product.objects.get(id=int(prodid))
            name = Prodobj.name
            transcost = Prodobj.transcost
            proddata.append([prod, name, transcost])

    dd = 1
    for i in range(len(task.demLatLs)):
        prodid = task.demProLs[i]
        name = 'd'+str(dd)
        node = nodelatlngdic[(task.demLatLs[i], task.demLngLs[i])]
        prod = 'p'+prodid
        price = task.demBidLs[i]
        cap = task.demCapLs[i]
        demdata.append([name, node, prod, price, cap])
        dd += 1
        if prodid not in prodidls:
            prodidls.append(prodid)
            prod = "p" + prodid
            Prodobj = Product.objects.get(id=int(prodid))
            name = Prodobj.name
            transcost = Prodobj.transcost
            proddata.append([prod, name, transcost])

    techidls = []
    ts = 1
    for i in range(len(task.siteLatLs)):
        techid = task.siteTecLs[i]
        if techid not in techidls:
            techidls.append(techid)
            tech = "t" + str(techid)
            Techobj = Technology.objects.get(id=int(techid))
            name = Techobj.name
            capmin = str(Techobj.capmin)
            capmax = str(Techobj.capmax)
            refprod = "p" + str(Techobj.refproduct)
            Kinv = str(Techobj.invcost_pro)
            Binv = str(Techobj.invcost_fix)
            Kop = str(Techobj.opcost_pro)
            Bop = str(Techobj.opcost_fix)
            techdata.append([tech, name, capmin, capmax, refprod, Kinv,
                            Binv, Kop, Bop])

        site = "ts" + str(ts)
        node = nodelatlngdic[(task.siteLatLs[i], task.siteLngLs[i])]
        tech = "t" + str(techid)
        cap = task.siteCapLs[i]
        sitedata.append([site, node, tech, cap])
        ts += 1

    tc = 1
    for i in range(len(task.candLatLs)):
        techid = task.candTecLs[i]
        if techid not in techidls:
            techidls.append(techid)
            tech = "t" + str(techid)
            Techobj = Technology.objects.get(id=int(techid))
            name = Techobj.name
            capmin = str(Techobj.capmin)
            capmax = str(Techobj.capmax)
            refprod = "p" + str(Techobj.refproduct)
            Kinv = str(Techobj.invcost_pro)
            Binv = str(Techobj.invcost_fix)
            Kop = str(Techobj.opcost_pro)
            Bop = str(Techobj.opcost_fix)
            techdata.append([tech, name, capmin, capmax, refprod,
                            Kinv, Binv, Kop, Bop])

        cand = "tc" + str(tc)
        node = nodelatlngdic[(task.candLatLs[i], task.candLngLs[i])]
        tech = "t" + str(techid)
        canddata.append([cand, node, tech])
        tc += 1

    for i in range(len(techidls)):
        Techobj = Technology.objects.get(id=techidls[i])
        prodset = Techobj.prods.all()
        for Prodobj in prodset:
            if str(Prodobj.id) not in prodidls:
                prodidls.append(str(Prodobj.id))
                prod = "p" + str(Prodobj.id)
                name = Prodobj.name
                transcost = Prodobj.transcost
                proddata.append([prod, name, transcost])

    for i in range(len(techidls)):
        line = []
        for j in range(len(prodidls)):
            try:
                line.append(
                    Transformation.objects.get(
                        product=Product.objects.get(id=int(prodidls[j])),
                        technology=Technology.objects.get(
                            id=int(techidls[i]))).transforming_coefficient)
            except Exception:
                line.append(0)
        alphadata.append(line)

    nodelist = [nodedata[i][0] for i in range(1, len(nodedata))]
    latilist = [nodedata[i][1] for i in range(1, len(nodedata))]
    longlist = [nodedata[i][2] for i in range(1, len(nodedata))]

    techlist = [techdata[i][0] for i in range(1, len(techdata))]
    prodlist = [proddata[i][0] for i in range(1, len(proddata))]

    supnodelist = [supdata[i][1] for i in range(1, len(supdata))]
    supprodlist = [supdata[i][2] for i in range(1, len(supdata))]

    demnodelist = [demdata[i][1] for i in range(1, len(demdata))]
    demprodlist = [demdata[i][2] for i in range(1, len(demdata))]

    # candidate is not necessary
    try:
        sitenodelist = [sitedata[i][1] for i in range(1, len(sitedata))]
        sitetechlist = [sitedata[i][2] for i in range(1, len(sitedata))]
    except Exception:
        sitenodelist = []
        sitetechlist = []
    try:
        candnodelist = [canddata[i][1] for i in range(1, len(canddata))]
        candtechlist = [canddata[i][2] for i in range(1, len(canddata))]
    except Exception:
        candnodelist = []
        candtechlist = []

    with open(folder + 'node_data.csv', 'w') as csvfile:
        writer = csv.writer(csvfile, delimiter=',')
        for row in range(len(nodedata)):
            writer.writerow(nodedata[row])

    with open(folder + 'sup_data.csv', 'w') as csvfile:
        writer = csv.writer(csvfile, delimiter=',')
        for row in range(len(supdata)):
            writer.writerow(supdata[row])

    with open(folder + 'dem_data.csv', 'w') as csvfile:
        writer = csv.writer(csvfile, delimiter=',')
        for row in range(len(demdata)):
            writer.writerow(demdata[row])

    with open(folder + 'tech_data.csv', 'w') as csvfile:
        writer = csv.writer(csvfile, delimiter=',')
        for row in range(len(techdata)):
            writer.writerow(techdata[row])

    with open(folder + 'prod_data.csv', 'w') as csvfile:
        writer = csv.writer(csvfile, delimiter=',')
        for row in range(len(proddata)):
            writer.writerow(proddata[row])

    with open(folder + 'site_data.csv', 'w') as csvfile:
        writer = csv.writer(csvfile, delimiter=',')
        for row in range(len(sitedata)):
            writer.writerow(sitedata[row])

    with open(folder + 'cand_data.csv', 'w') as csvfile:
        writer = csv.writer(csvfile, delimiter=',')
        for row in range(len(canddata)):
            writer.writerow(canddata[row])

    with open(folder + 'alpha_data.csv', 'w') as csvfile:
        writer = csv.writer(csvfile, delimiter=',')
        for row in range(len(alphadata)):
            writer.writerow(alphadata[row])

    if transfile:
        # initialize transportation matrix
        transdata = [[['N' for k in range(len(nodelist))] for j
                     in range(len(nodelist))] for i in range(len(prodlist))]
        for proditem in prodlist:
            # print(proditem)
            prod = proditem
            transid = prodlist.index(prod)

            filename = folder + 'transmatrix_' + prod + '.csv'
            os.makedirs(os.path.dirname(filename), exist_ok=True)

            # from supply to demand
            for ss in range(len(supnodelist)):
                if supprodlist[ss] == prod:
                    nodeI = nodelist.index(supnodelist[ss])
                    for dd in range(len(demnodelist)):
                        if demprodlist[dd] == prod:
                            nodeJ = nodelist.index(demnodelist[dd])
                            if nodeI != nodeJ:
                                transdata[transid][nodeI][nodeJ] = 'Y'
            # from supply to tech site
                    for tt in range(len(sitenodelist)):
                        techid = techlist.index(sitetechlist[tt])
                        if float(alphadata[techid][transid]) < 0:
                            nodeJ = nodelist.index(sitenodelist[tt])
                            if nodeI != nodeJ:
                                transdata[transid][nodeI][nodeJ] = 'Y'
            # from supply to tech cand
                    for tt in range(len(candnodelist)):
                        techid = techlist.index(candtechlist[tt])
                        if float(alphadata[techid][transid]) < 0:
                            nodeJ = nodelist.index(candnodelist[tt])
                            if nodeI != nodeJ:
                                transdata[transid][nodeI][nodeJ] = 'Y'

            # from tech site to tech site
            for t1 in range(len(sitenodelist)):
                t1id = techlist.index(sitetechlist[t1])
                if float(alphadata[t1id][transid]) > 0:
                    nodeI = nodelist.index(sitenodelist[t1])
                    for t2 in range(len(sitenodelist)):
                        t2id = techlist.index(sitetechlist[t2])
                        if float(alphadata[t2id][transid]) < 0:
                            nodeJ = nodelist.index(sitenodelist[t2])
                            if nodeI != nodeJ:
                                transdata[transid][nodeI][nodeJ] = 'Y'
            # from tech site to tech cand
                    for t2 in range(len(candnodelist)):
                        t2id = techlist.index(candtechlist[t2])
                        if float(alphadata[t2id][transid]) < 0:
                            nodeJ = nodelist.index(candnodelist[t2])
                            if nodeI != nodeJ:
                                transdata[transid][nodeI][nodeJ] = 'Y'
            # from tech site to demand
                    for dd in range(len(demnodelist)):
                        if demprodlist[dd] == prod:
                            nodeJ = nodelist.index(demnodelist[dd])
                            if nodeI != nodeJ:
                                transdata[transid][nodeI][nodeJ] = 'Y'

            # from tech cand to tech site
            for t1 in range(len(candnodelist)):
                t1id = techlist.index(candtechlist[t1])
                if float(alphadata[t1id][transid]) > 0:
                    nodeI = nodelist.index(candnodelist[t1])
                    for t2 in range(len(sitenodelist)):
                        t2id = techlist.index(sitetechlist[t2])
                        if float(alphadata[t2id][transid]) < 0:
                            nodeJ = nodelist.index(sitenodelist[t2])
                            if nodeI != nodeJ:
                                transdata[transid][nodeI][nodeJ] = 'Y'
            # from tech cand to tech cand
                    for t2 in range(len(candnodelist)):
                        t2id = techlist.index(candtechlist[t2])
                        if float(alphadata[t2id][transid]) < 0:
                            nodeJ = nodelist.index(candnodelist[t2])
                            if nodeI != nodeJ:
                                transdata[transid][nodeI][nodeJ] = 'Y'
            # from tech cand to demand
                    for dd in range(len(demnodelist)):
                        if demprodlist[dd] == prod:
                            nodeJ = nodelist.index(demnodelist[dd])
                            if nodeI != nodeJ:
                                transdata[transid][nodeI][nodeJ] = 'Y'
            with open(filename, 'w') as csvfile:
                writer = csv.writer(csvfile, delimiter=',')
                for row in range(len(transdata[transid])):
                    writer.writerow(transdata[transid][row])
    return nodedata, prodlist


def ReWriteTransData(task, prod_id, transdata):
    """
    Rewrite transportation matrix file.
    
    Specify task, product id, and the new matrix.
    """
    user = task.user
    folder = settings.MEDIA_ROOT + '/' + str(user.id) + '_' + \
        user.username + '/task_' + str(task.id) + '/'
    filename = folder + 'transmatrix_p' + str(prod_id) + '.csv'
    with open(filename) as csvfile:
        data = list(csv.reader(csvfile))
    for i in range(0, len(data)):
        for j in range(0, len(data[0])):
            data[i][j] = 'N'
    for item in transdata:
        print(item)
        ii = item['ii']
        jj = item['jj']
        data[ii][jj] = 'Y'
    with open(filename, 'w') as csvfile:
        writer = csv.writer(csvfile, delimiter=',')
        for row in range(len(data)):
            writer.writerow(data[row])


def ReadTaskData(task):
    """
    Read transportation matrix files.
    
    Specify task and return transportation matrix, node list, and product list.
    """
    user = task.user
    task_id = task.id
    folder = settings.MEDIA_ROOT + '/' + str(user.id) + '_' + \
        user.username + '/task_' + str(task.id) + '/'

    with open(folder + 'prod_data.csv') as csvfile:
        data = list(csv.reader(csvfile))
        prodlist = [data[i][0] for i in range(1, len(data))]
    with open(folder + 'node_data.csv') as csvfile:
        nodedata = list(csv.reader(csvfile))
    """transdata = []
    for p in prodlist:
        with open(folder + 'transmatrix_' + p + '.csv') as csvfile:
            data = list(csv.reader(csvfile))
            transdata.append(data)"""

    return nodedata, prodlist


def ReadTransData(task, prodid):
    """Add docstring."""  # TODO: add docstring.
    user = task.user
    task_id = task.id
    folder = settings.MEDIA_ROOT + '/' + str(user.id) + '_' + \
        user.username + '/task_' + str(task.id) + '/'
    with open(folder + 'transmatrix_p' + str(prodid) + '.csv') as csvfile:
        transdata = list(csv.reader(csvfile))
    return transdata


def ReadCaseData(case):
    """Add docstring."""  # TODO: add docstring.
    case_id = case.id
    folder = settings.MEDIA_ROOT + '/casestudies/' + str(case.id) + '_' + \
        case.name + '/'

    with open(folder + 'prod_data.csv') as csvfile:
        data = list(csv.reader(csvfile))
        prodlist = [data[i][0] for i in range(1, len(data))]
    with open(folder + 'node_data.csv') as csvfile:
        nodedata = list(csv.reader(csvfile))
    transdata = []
    for p in prodlist:
        with open(folder + 'flow_results_' + p + '_' +
                  str(case.target_taskid) + '.csv') as csvfile:
            data = list(csv.reader(csvfile))
            data = [[data[i][j] for j in range(1, len(data[i]))]
                    for i in range(1, len(data))]
            transdata.append(data)

    return nodedata, prodlist, transdata


def readNodeFile(nodepath):
    """Read the node file generated, return msg and node data."""
    msg = []
    data = False
    try:
        with open(settings.MEDIA_ROOT + '/' + str(nodepath),
                  newline='') as csvfile:
            data = list(csv.reader(csvfile))
    except Exception:
        msg.append('Node file lost or not valid.')
    else:
        try:
            nodelist = [data[i][0] for i in range(1, len(data))]
            latilist = [data[i][1] for i in range(1, len(data))]
            longlist = [data[i][2] for i in range(1, len(data))]
        except Exception:
            msg.append('Node file has incorrect structure. ' +
                       'Please refer to the template.')
        else:
            float_check = True
            for i in range(len(latilist)):
                lati_item = latilist[i]
                long_item = longlist[i]
                if lati_item == '' or isfloat(lati_item):
                    pass
                else:
                    float_check = False
                if long_item == '' or isfloat(long_item):
                    pass
                else:
                    float_check = False
            if not float_check:
                msg.append('Coordinates cannot be converted to float.')
    if len(msg) > 0:
        data = False
    return msg, data


def readFlowFile(nodedata, flowpath):
    """
    Read the flow file uploaded.
    
    Specify the corresponding node file and tempdocument.docfile, return msg,
    lists of destinations, origins, and flow amounts
    """
    msg = []
    flows = False
    destinations = False
    origins = False
    try:
        newdata = []
        latdata = {}
        lngdata = {}
        alias = {}
        for i in range(1, len(nodedata)):
            item = {'node': nodedata[i][0], 'lat': float(nodedata[i][1]),
                    'lng': float(nodedata[i][2])}
            latdata[nodedata[i][0]] = float(nodedata[i][1])
            lngdata[nodedata[i][0]] = float(nodedata[i][2])
            newdata.append(item)
        latlist = [newdata[i]["lat"] for i in range(len(newdata))]
        lnglist = [newdata[i]["lng"] for i in range(len(newdata))]

        with open(settings.MEDIA_ROOT + '/' + str(flowpath),
                  newline='') as csvfile:
            data = list(csv.reader(csvfile))
        origins = []
        destinations = []
        flows = []
        for i in range(1, len(data)):
            for j in range(1, len(data[0])):
                if isfloat(data[i][j]):
                    if float(data[i][j]) >= 0.01:
                        origin = {'lat': latdata[data[i][0]],
                                  'lng': lngdata[data[i][0]], 'index': i-1}
                        destination = {'lat': latdata[data[0][j]],
                                       'lng': lngdata[data[0][j]],
                                       'index': j-1}
                        flows.append(data[i][j])
                        origins.append(origin)
                        destinations.append(destination)
    except Exception:
        msg.append("Flow data not readable!")
    if len(msg) > 0:
        flows = False
        destinations = False
        origins = False
    return msg, destinations, origins, flows


def ReadTaskResult(task):
    """Read the task results, only transportation results for now."""
    user = task.user
    task_id = task.id
    folder = settings.MEDIA_ROOT + '/' + str(user.id) + '_' + \
        user.username + '/task_' + str(task.id) + '/'
    pricedata = []
    with open(folder + 'prod_data.csv') as csvfile:
        data = list(csv.reader(csvfile))
        prodlist = [data[i][0] for i in range(1, len(data))]
    with open(folder + 'node_data.csv') as csvfile:
        nodedata = list(csv.reader(csvfile))
    transdata = []
    for p in prodlist:
        with open(folder + 'flow_results_' + p + '_' + str(task.id) +
                  '.csv') as csvfile:
            data = list(csv.reader(csvfile))
            data = [[data[i][j] for j in range(1, len(data[i]))]
                    for i in range(1, len(data))]
            transdata.append(data)
    try:
        with open(folder + 'clearing_prices_' + str(task.id) +
                  '.csv') as csvfile:
            pricedata = list(csv.reader(csvfile))
    except Exception:
        pass

    return transdata, nodedata, prodlist, pricedata


def ReadTaskResultBasic(task):
    """Add docstring."""  # TODO: add docstring.
    user = task.user
    task_id = task.id
    folder = settings.MEDIA_ROOT + '/' + str(user.id) + '_' + \
        user.username + '/task_' + str(task.id) + '/'

    try:
        with open(folder + 'node_data.csv') as csvfile:
            nodedata = list(csv.reader(csvfile))
    except Exception:
        nodedata = False

    try:
        with open(folder + 'supply_results_' + str(task_id) +
                  '.csv') as csvfile:
            supresults = list(csv.reader(csvfile))
    except Exception:
        supresults = False

    try:
        with open(folder + 'demand_results_' + str(task_id) +
                  '.csv') as csvfile:
            demresults = list(csv.reader(csvfile))
    except Exception:
        demresults = False

    try:
        with open(folder + 'installment_results_' + str(task_id) +
                  '.csv') as csvfile:
            candresults = list(csv.reader(csvfile))
    except Exception:
        candresults = False

    try:
        with open(folder + 'techsite_results_' + str(task_id) +
                  '.csv') as csvfile:
            siteresults = list(csv.reader(csvfile))
    except Exception:
        siteresults = False

    return nodedata, supresults, demresults, candresults, siteresults


def zipfiles(zipls, defaultfilename='download_datals_zip_'):
    """Make a zip file and return its path."""
    randomstr = id_generator(size=10)
    zipfilename = settings.MEDIA_ROOT + '/public/' + defaultfilename + \
        randomstr + '.zip'
    buffer = io.BytesIO()
    zf = zipfile.ZipFile(zipfilename, "w")
    for file in zipls:
        filename = os.path.join(settings.MEDIA_ROOT, file)
        zf.write(filename, os.path.basename(filename))
    return '/media/public/' + defaultfilename + randomstr + '.zip'


def writeModelData(task, checkls):
    """Add docstring."""  # TODO: add docstring.
    folder = settings.MEDIA_ROOT + '/public/'
    checkls = [int(i) for i in checkls]
    zipname = 'modeldata_' + str(task.id)

    if sum(checkls) == 0:
        filename = folder + 'placeholder' + str(task.id) + '.csv'
        with open(filename, 'w') as csvfile:
            writer = csv.writer(csvfile, delimiter=',')
            writer.writerow(['This', 'is', 'a', 'placeholder', 'file.'])

        filels = [filename]

    else:
        filels = []
        if checkls[0]:
            filename = folder + 'supplydata' + str(task.id) + '.csv'
            with open(filename, 'w') as csvfile:
                writer = csv.writer(csvfile, delimiter=',')
                writer.writerow(['#', 'Latitude', ',Longitude', 'Feed ID',
                                 'Price', 'Capacity'])
                for i in range(len(task.supLatLs)):
                    writer.writerow([
                        's' + str(i+1), task.supLatLs[i], task.supLngLs[i],
                        'p' + task.supProLs[i], task.supBidLs[i],
                        task.supCapLs[i]])
            filels.append(filename)
        if checkls[1]:
            filename = folder + 'techsitedata' + str(task.id) + '.csv'
            with open(filename, 'w') as csvfile:
                writer = csv.writer(csvfile, delimiter=',')
                writer.writerow([
                    '#', 'Latitude', ',Longitude', 'Tech ID', 'Capacity'])
                for i in range(len(task.siteLatLs)):
                    writer.writerow([
                        'ts' + str(i+1), task.siteLatLs[i], task.siteLngLs[i],
                        't' + task.siteTecLs[i], task.siteCapLs[i]])
            filels.append(filename)
        if checkls[2]:
            filename = folder + 'techcanddata' + str(task.id) + '.csv'
            with open(filename, 'w') as csvfile:
                writer = csv.writer(csvfile, delimiter=',')
                writer.writerow(['#', 'Latitude', ',Longitude', 'Tech ID'])
                for i in range(len(task.candLatLs)):
                    writer.writerow(['cd' + str(i+1), task.candLatLs[i],
                                     task.candLngLs[i], 't'+task.candTecLs[i]])
            filels.append(filename)
        if checkls[3]:
            filename = folder + 'demanddata' + str(task.id) + '.csv'
            with open(filename, 'w') as csvfile:
                writer = csv.writer(csvfile, delimiter=',')
                writer.writerow(['#', 'Latitude', ',Longitude', 'Prod ID',
                                 'Price', 'Capacity'])
                for i in range(len(task.demLatLs)):
                    writer.writerow([
                        'd' + str(i+1), task.demLatLs[i], task.demLngLs[i],
                        'p' + task.demProLs[i], task.demBidLs[i],
                        task.demCapLs[i]])
            filels.append(filename)

    randomstr = id_generator(size=10)
    zipfilename = settings.MEDIA_ROOT + '/public/' + zipname + \
        randomstr + '.zip'
    buffer = io.BytesIO()
    zf = zipfile.ZipFile(zipfilename, "w")
    for file in filels:
        zf.write(file, os.path.basename(file))
    href = '/media/public/' + zipname + randomstr + '.zip'

    for i in filels:
        os.remove(i)

    return href


def readModelData(task, mode, checkls=[]):
    """Add docstring."""  # TODO: add docstring.
    if mode == 'sup':
        supdata = [['#', 'Latitude', ',Longitude', 'Feed ID',
                    'Price', 'Capacity']]
        msg = []
        try:
            for i in range(len(task.supLatLs)):
                supdata.append([
                    's' + str(i+1), task.supLatLs[i], task.supLngLs[i],
                    'p' + task.supProLs[i], task.supBidLs[i],
                    task.supCapLs[i]])
        except Exception:
            msg.append('Cannot load data from the model.')
        return msg, supdata
    if mode == 'tech':
        if checkls[0]:
            type = 'Technology Site Data'
            techdata = [['#', 'Latitude', ',Longitude', 'Tech ID', 'Capacity']]
            msg = []
            try:
                for i in range(len(task.siteLatLs)):
                    techdata.append([
                        'ts' + str(i+1), task.siteLatLs[i], task.siteLngLs[i],
                        't' + task.siteTecLs[i], task.siteCapLs[i]])
            except Exception:
                msg.append('Cannot load data from the model.')
        if checkls[1]:
            type = 'Technology Candidate Data'
            techdata = [['#', 'Latitude', ',Longitude', 'Tech ID']]
            msg = []
            if task.model_type == 1:
                try:
                    for i in range(len(task.candLatLs)):
                        techdata.append([
                            'cd' + str(i+1), task.candLatLs[i],
                            task.candLngLs[i], 't' + task.candTecLs[i]])
                except Exception:
                    msg.append('Cannot load data from the model.')
        return msg, techdata, type
    if mode == 'dem':
        demdata = [['#', 'Latitude', ',Longitude', 'Prod ID',
                    'Price', 'Capacity']]
        msg = []
        try:
            for i in range(len(task.demLatLs)):
                demdata.append([
                    'd' + str(i+1), task.demLatLs[i], task.demLngLs[i],
                    'p'+task.demProLs[i], task.demBidLs[i], task.demCapLs[i]])
        except Exception:
            msg.append('Cannot load data from the model.')
        return msg, demdata
