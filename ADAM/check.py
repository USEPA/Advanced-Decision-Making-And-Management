from background_task import background
from django.core.mail import send_mail, EmailMessage
from django.utils import timezone
from main.models import *
from demo.models import *
from background_task.models import Task
from background_task.models import CompletedTask
from django.conf import settings
import datetime
import os
import time
import shutil
import csv
import zipfile

# get the id of the task given the output file names
def getid(filename):
    ff_id = ''
    s = -5
    while filename[s] != '_':
        ff_id += filename[s]
        s += -1
    ff_id = ff_id[::-1]
    return ff_id

# To delete completed tasks more than 30 days
complete_list = CompletedTask.objects.all()
for t in complete_list:
    if (timezone.now() - t.run_at).total_seconds() > 30*24*3600:
        if 'solveLP' in t.task_name:
            p_id = t.pseudo_id
            lptask = LP_task.objects.get(pseudo_id = p_id)
            lptask.delete() # delete corresponding lp task record
        t.delete() # delete the completed task record


# To check if a SC task has a corresponding results file
path = 'your/path/to/store/julia_task_results' # subject to change
for root, dirs, files in os.walk(path):
    print(files)
    for filename in files:
        print(filename)
        ff = path + filename

        if '.csv' in ff and 'summary' in ff: # the creation time judgement need to coordinate with the frequency of running this script
            now = timezone.make_naive(timezone.localtime())
            delta_time = (now - datetime.datetime.fromtimestamp(os.path.getctime(ff)))
            if delta_time.total_seconds() <= 15*60:
                ff_id = getid(ff)
                if OptTask.objects.filter(pk = ff_id).exists():
                    task = OptTask.objects.get(pk = ff_id)
                    task.task_status = 'Completed'
                    task.save()
                    ff_user = task.user
                    toemail = ff_user.email
                    content = 'Your Task %s is Completed!' %task.task_name
                    message = EmailMessage(
                        'No Reply - Notification',
                        content,
                        'email-host@xxx.com',
                        [toemail])
                    message.send(fail_silently = False)   # send email to notify user
                    old_result = OptTaskResults.objects.filter(task = task)
                    for i in range(len(old_result)):
                        old_result[i].delete()
                    new_result = OptTaskResults(task = task)
                    summary = ''
                with open(ff, newline='') as csvfile:
                    spamreader = csv.reader(csvfile, delimiter=',', quotechar='|')
                    for row in spamreader:
                        summary += ': '.join(row)
                        summary += '\n'
                new_result.summary = summary            # obtain the summary information
                new_result.save()
                zipname = settings.MEDIA_ROOT + '/' + str(ff_user.id) + '_' + ff_user.username + '/task_' + str(task.id) + '/results_' + str(ff_id) + '.zip'
                zf = zipfile.ZipFile(zipname, "w")      # zip results files and move to the user folder
                for doc in files:
                    doc_full = path + doc
                    doc_id = getid(doc_full)
                    if doc_id == ff_id:
                        new_doc_full = settings.MEDIA_ROOT + '/' + str(ff_user.id) + '_' + ff_user.username + '/task_' + str(task.id) + '/' + doc
                        zf.write(doc_full, os.path.basename(doc_full))
                        os.rename(doc_full, new_doc_full)
                new_result.resultspath = '/media/' + str(ff_user.id) + '_' + ff_user.username + '/task_' + str(task.id) + '/results_' + str(ff_id) + '.zip'
                new_result.save()
        if '.csv' in ff and 'error' in ff: # the creation time judgement need to coordinate with the frequency of running this script
            now = timezone.make_naive(timezone.localtime())
            delta_time = (now - datetime.datetime.fromtimestamp(os.path.getctime(ff)))
            if delta_time.total_seconds() <= 15*60:
                ff_id = getid(ff)
                if OptTask.objects.filter(pk = ff_id).exists():
                    task = OptTask.objects.get(pk = ff_id)
                    task.task_status = 'Error'
                    task.save()
                    ff_user = task.user
                    toemail = ff_user.email
                    content = 'Your Task %s Raised an Error!' %task.task_name
                    message = EmailMessage(
                        'No Reply - Notification',
                        content,
                        'email-host@xxx.com',
                        [toemail])
                    message.send(fail_silently = False)   # send email to notify user
                    old_result = OptTaskResults.objects.filter(task = task)
                    for i in range(len(old_result)):
                        old_result[i].delete()
                    new_result = OptTaskResults(task = task)
                    summary = ''
                with open(ff, newline='') as csvfile:
                    spamreader = csv.reader(csvfile, delimiter=',', quotechar='|')
                    for row in spamreader:
                        summary += ': '.join(row)
                        summary += '\n'
                new_result.summary = summary            # obtain the summary information
                new_result.save()
                zipname = settings.MEDIA_ROOT + '/' + str(ff_user.id) + '_' + ff_user.username + '/task_' + str(task.id) + '/error_' + str(ff_id) + '.zip'
                zf = zipfile.ZipFile(zipname, "w")      # zip results files and move to the user folder
                for doc in files:
                    doc_full = path + doc
                    doc_id = getid(doc_full)
                    if doc_id == ff_id:
                        new_doc_full = settings.MEDIA_ROOT + '/' + str(ff_user.id) + '_' + ff_user.username + '/' + doc
                        zf.write(doc_full, os.path.basename(doc_full))
                        os.rename(doc_full, new_doc_full)
                new_result.resultspath = '/media/' + str(ff_user.id) + '_' + ff_user.username + '/task_' + str(task.id) + '/error_' + str(ff_id) + '.zip'
                new_result.save()

path = settings.MEDIA_ROOT + '/public/'
for root, dirs, files in os.walk(path):
    for filename in files:
        ff = path + filename
        now = timezone.make_naive(timezone.localtime())
        delta_time = (now - datetime.datetime.fromtimestamp(os.path.getctime(ff)))
        if (('eg2_' in ff) or ('results' in ff) or ('error' in ff)) and delta_time.total_seconds() > 3600:  # if a file exists more than an hour
            os.remove(ff)
        if ('download_datals_zip_' in ff):
            os.remove(ff)
        if ('modeldata_' in ff):
            os.remove(ff)
#        if '.csv' in ff and delta_time.total_seconds() > 30*24*3600: # if a file exists more than 30 days then delete
#            os.remove(ff)
