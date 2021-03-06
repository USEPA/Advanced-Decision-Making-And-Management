# urls.py (expert)
# !/usr/bin/env python3
# coding=utf-8
# ruiz-mercado.gerardo@epa.gov

"""Add docstring."""  # TODO: add docstring.


from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views

app_name = 'expert'
urlpatterns = [
    path('usermain/', views.exp_usermain, name='exp_usermain'),
    path('dashboard/', views.exp_usermain, name='dashboard'),
    path('usermain/advpanel', views.exp_advpanel, name='exp_advpanel'),

    path('usermain/task/', views.exp_task_list,
         name='exp_task_list'),
    path('usermain/task/<int:task_id>', views.exp_task_detail_new,
         name='exp_task_detail_new'),
    path('usermain/task/<int:task_id>/results', views.exp_task_results,
         name='exp_task_results'),

    path('usermain/profile', views.exp_user_profile, name='exp_user_profile'),

    path('usermain/visualization', views.exp_visualization_home,
         name='exp_visualization_home'),
    path('usermain/visualization/geo', views.exp_visualization_geo,
         name='exp_visualization_geo'),
    path('usermain/visualization/upload', views.exp_visualization_upload,
         name='exp_visualization_upload'),
    path('usermain/visualization/results/<int:task_id>',
         views.exp_visualization_georesult,
         name='exp_visualization_georesult'),
    path('usermain/visualization/data/<int:task_id>',
         views.exp_visualization_modeldata,
         name='exp_visualization_modeldata'),

    path('usermain/techbase', views.exp_techbase, name='exp_techbase'),
    path('usermain/prodbase', views.exp_prodbase, name='exp_prodbase'),

    path('usermain/techbase/<int:tech_id>', views.exp_techbase_graph,
         name='exp_techbase_graph'),

    path('usermain/task/<int:task_id>/1', views.exp_task_step1,
         name='exp_task_step1'),
    path('usermain/task/<int:task_id>/2', views.exp_task_step2new,
         name='exp_task_step2new'),
    path('usermain/task/<int:task_id>/3', views.exp_task_step3new,
         name='exp_task_task3new'),
    path('usermain/task/<int:task_id>/4', views.exp_task_step4new,
         name='exp_task_task4new'),
    path('usermain/task/<int:task_id>/5', views.exp_task_step5new,
         name='exp_task_task5new'),
    path('usermain/task/<int:task_id>/6', views.exp_task_step6new,
         name='exp_task_task6new'),

    path('demo/', views.exp_demomain,
         name='exp_demomain'),

    path('managecasestudy/', views.exp_managecasestudy,
         name='managecasestudy'),
    path('admincasestudy/', views.exp_addcasestudy,
         name="exp_addcasestudy"),
    path('admincasestudy2/', views.exp_addcasestudy2,
         name="exp_addcasestudy2"),
    path('casestudydetail/<int:case_id>', views.exp_casestudydetail,
         name="exp_casestudydetail"),

    path('ajax/deletetask', views.taskmanagedelete,
         name='taskmanagedelete'),
    path('ajax/userprofileedit', views.userprofileedit,
         name='userprofileedit'),
    path('ajax/supfileselection', views.step2supfileselection,
         name='step2supfileselection'),
    path('ajax/supfileupload', views.step2supfileupload,
         name='step2supfileupload'),
    path('ajax/suploadmodel', views.step2suploadmodeldata,
         name='step2suploadmodeldata'),
    path('ajax/step2savesup', views.step2savesup,
         name='step2savesup'),
    path('ajax/techfileselection', views.step3techfileselection,
         name='step3techfileselection'),
    path('ajax/techfileupload', views.step3techfileupload,
         name='step3techfileupload'),
    path('ajax/techloadmodel', views.step3techloadmodeldata,
         name='step3techloadmodeldata'),
    path('ajax/step3savetech', views.step3savetech,
         name='step3savetech'),
    path('ajax/demfileselection', views.step4demfileselection,
         name='step4demfileselection'),
    path('ajax/demfileupload', views.step4demfileupload,
         name='step4demfileupload'),
    path('ajax/demloadmodel', views.step4demloadmodeldata,
         name='step4demloadmodeldata'),
    path('ajax/step4savedem', views.step4savedem,
         name='step4savedem'),
    path('ajax/generatetransfiles', views.step5_writetransfiles,
         name='step5_writetransfiles'),
    path('ajax/rewritetransfiles', views.step5_rewritetransfiles,
         name='step5_rewritetransfiles'),
    path('ajax/readtransfiles', views.step5_readtransfiles,
         name='step5_readtransfiles'),
    path('ajax/gettransportdata', views.step5_gettransdata,
         name='step5_gettransdata'),
    path('ajax/skipstep5',  views.step5_skipthis,
         name='step5_skipthis'),
    path('ajax/beginsolve', views.beginsolve,
         name='beginsolve'),
    path('ajax/reinitilizetask', views.exp_task_detail_reinitilize,
         name='exp_task_detail_reinitilize'),
    path('ajax/deletetask', views.exp_task_detail_delete,
         name='exp_task_detail_delete'),
    path('ajax/loaddatafrommodel', views.load_model,
         name='load_model'),
    path('ajax/downloadmodeldata', views.downloadmodeldata,
         name='downloadmodeldata'),
    path('ajax/prodbaseadd', views.prodbaseaddproduct,
         name='prodbaseaddproduct'),
    path('ajax/prodbaseedit', views.prodbaseeditprod,
         name='prodbaseeditprod'),
    path('ajax/prodbasedelete', views.prodbasedeleteprod,
         name='prodbasedeleteprod'),
    path('ajax/techbaseadd', views.techbaseaddtechnology,
         name='techbaseaddtechnology'),
    path('ajax/techbasedelete', views.techbasedeletetech,
         name='techbasedeletetech'),
    path('ajax/techbaseedit', views.techbaseedittech,
         name='techbaseedittech'),
    path('ajax/savefig_techbase', views.savefig_techbase,
         name='savefig_techbase'),
    path('ajax/visualfilegetdata', views.visualuploadedfile,
         name='visualuploadedfile'),
    path('ajax/visualtaskresult', views.readtaskresult,
         name='readtaskresult'),
    path('ajax/addcasestudy1', views.makingcasestudy1,
         name='makingcasestudy1'),
    path('ajax/groupcases', views.groupcases,
         name='groupcases'),
    path('ajax/copycase', views.copycase,
         name='copycase'),
    path('ajax/casereadtransfiles', views.casereadtransfiles,
         name='casereadtransfiles'),
    path('ajax/deletecases', views.deletecases,
         name='deletecases'),
    path('ajax/publishcases', views.publishcase,
         name='publishcase'),
    path('ajax/renamecasestudy', views.renamecase,
         name='renamecase'),
    path('ajax/editscenario', views.editscenario,
         name='editscenario'),
    path('ajax/newmodel', views.newmodel,
         name='newmodel'),
    path('ajax/copymodel', views.copymodel,
         name='copymodel')
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
