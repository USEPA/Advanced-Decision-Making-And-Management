from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from django.utils import timezone
import os
import csv
import shutil


# Create your models here.
class UserInfo(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    organization = models.CharField(max_length=100, default=None)


class CaseStudy(models.Model):
    name = models.CharField(max_length=100, default='Case Study Scenario')
    timeunit = models.CharField(max_length=20, default='year')
    model_type = models.IntegerField(default=1)
    notes = models.CharField(default='', max_length=1000)
    # data and results user for the case study
    # supply data
    supLatLs = models.CharField(max_length=10)
    supLngLs = models.CharField(max_length=10)
    supProLs = models.CharField(max_length=10)
    supCapLs = models.CharField(max_length=10)
    supBidLs = models.CharField(max_length=10)
    supNames = models.CharField(max_length=10)
    # supply results
    supValueLs = models.CharField(max_length=10)

    # tech site data
    siteLatLs = models.CharField(max_length=10)
    siteLngLs = models.CharField(max_length=10)
    siteTecLs = models.CharField(max_length=10)
    siteCapLs = models.CharField(max_length=10)
    siteNames = models.CharField(max_length=10)
    # tech site results
    siteTreatLs = models.CharField(max_length=10)

    # tech cand data
    candLatLs = models.CharField(max_length=10)
    candLngLs = models.CharField(max_length=10)
    candTecLs = models.CharField(max_length=10)
    candNames = models.CharField(max_length=10)
    # tech cand results
    candInstallLs = models.CharField(max_length=10)
    candCapLs = models.CharField(max_length=10)

    # demand data
    demLatLs = models.CharField(max_length=10)
    demLngLs = models.CharField(max_length=10)
    demProLs = models.CharField(max_length=10)
    demCapLs = models.CharField(max_length=10)
    demBidLs = models.CharField(max_length=10)
    demNames = models.CharField(max_length=10)
    # demand results
    demValueLs = models.CharField(max_length=10)

    # Other results
    summary = models.CharField(max_length=5000, default='')
    # list of tech file paths
    transportationResults = models.CharField(max_length=1000)
    # clearing price path
    priceResults = models.CharField(max_length=5000, default='')
    target_taskid = models.IntegerField(default=-1)

    def __str__(self):
        return self.name

    def copyfiles(self, task):
        user = task.user
        task_id = task.id
        folder = settings.MEDIA_ROOT + '/' + str(user.id) + '_' + \
            user.username + '/task_' + str(task.id) + '/'
        newpath = settings.MEDIA_ROOT + '/casestudies/' + \
            str(self.id) + '_' + self.name + '/'
        try:
            os.stat(newpath)
        except Exception:
            os.mkdir(newpath)

        for root, dirs, files in os.walk(folder):
            for filename in files:
                original_ff = folder + filename
                new_ff = newpath + filename
                shutil.copyfile(original_ff, new_ff)
        return

    def delete(self, *args, **kwargs):
        try:
            path = settings.MEDIA_ROOT + '/casestudies/' + str(self.id) + \
                '_' + self.name + '/'
            for root, dirs, files in os.walk(path):
                for filename in files:
                    ff = path + filename
                    os.remove(ff)
            os.rmdir(path)
        except Exception:
            print("Delete case " + str(self.id) + " and there is an error.")
        super(CaseStudy, self).delete(*args, **kwargs)

    def getprodlist(self):
        folder = settings.MEDIA_ROOT + '/casestudies/' + str(self.id) + \
            '_' + self.name + '/'
        prodlist = []
        try:
            with open(folder + 'prod_data.csv') as csvfile:
                data = list(csv.reader(csvfile))
                prodlist = [data[i][0] for i in range(1, len(data))]
                prodlist = [item[1:] for item in prodlist]
        except Exception:
            print("Cannot find product data!")
        return prodlist

    def gettechlist(self):
        folder = settings.MEDIA_ROOT + '/casestudies/' + str(self.id) + \
            '_' + self.name + '/'
        techlist = []
        try:
            with open(folder + 'tech_data.csv') as csvfile:
                data = list(csv.reader(csvfile))
                techlist = [data[i][0] for i in range(1, len(data))]
                techlist = [item[1:] for item in techlist]
        except Exception:
            print("Cannot find technology data!")
        return techlist


class CaseGroup(models.Model):
    name = models.CharField(max_length=100, default='Case Study')
    notes = models.CharField(default='', max_length=1000)
    published = models.BooleanField(default=False)
    childrencase = models.ManyToManyField(
        CaseStudy,
        through='GroupHasCase',
        through_fields=('casegroup', 'casestudy'),
    )

    def __str__(self):
        return self.name


class GroupHasCase(models.Model):
    casegroup = models.ForeignKey(CaseGroup, on_delete=models.CASCADE)
    casestudy = models.ForeignKey(CaseStudy, on_delete=models.CASCADE)

    def __str__(self):
        return self.casegroup.name + '-' + self.casestudy.name

    class Meta:
        unique_together = ["casegroup", "casestudy"]


class OptTask(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    task_name = models.CharField(max_length=100, default='New Task')
    task_pseudoid = models.CharField(max_length=20,
                                     default='00000000000000000000')
    task_status = models.CharField(max_length=50, default='Data Required')
    code_path = models.CharField(max_length=200, default='')
    date_create = models.DateTimeField('date created')
    date_finish = models.DateTimeField('date completed', null=True, blank=True)
    queue_id = models.CharField(max_length=10, default='-1')
    model_type = models.IntegerField(default=0)
    finished_steps = models.CharField(max_length=10, default='')
    timeunit = models.CharField(max_length=20, default='year')
    notes = models.CharField(default='', max_length=1000)
    # data used for the task
    # data path, uploaded by users:
    node_path = models.CharField(max_length=200, default='NA')
    sup_path = models.CharField(max_length=200, default='NA')
    tech_path = models.CharField(max_length=200, default='NA')
    alpha_path = models.CharField(max_length=200, default='NA')
    prod_path = models.CharField(max_length=200, default='NA')
    dem_path = models.CharField(max_length=200, default='NA')
    site_path = models.CharField(max_length=200, default='NA')
    dis_path = models.CharField(max_length=200, default='NA')
    cand_path = models.CharField(max_length=200, default='NA')
    pgraph_id = models.IntegerField(default=-1)
    tgraph_id = models.IntegerField(default=-1)

    # data user for the task (stored in mysql)
    # supply data
    supLatLs = models.CharField(max_length=10)
    supLngLs = models.CharField(max_length=10)
    supProLs = models.CharField(max_length=10)
    supCapLs = models.CharField(max_length=10)
    supBidLs = models.CharField(max_length=10)
    supNames = models.CharField(max_length=10)

    # tech site data
    siteLatLs = models.CharField(max_length=10)
    siteLngLs = models.CharField(max_length=10)
    siteTecLs = models.CharField(max_length=10)
    siteCapLs = models.CharField(max_length=10)
    siteNames = models.CharField(max_length=10)

    # tech cand data
    candLatLs = models.CharField(max_length=10)
    candLngLs = models.CharField(max_length=10)
    candTecLs = models.CharField(max_length=10)
    candNames = models.CharField(max_length=10)

    # demand data
    demLatLs = models.CharField(max_length=10)
    demLngLs = models.CharField(max_length=10)
    demProLs = models.CharField(max_length=10)
    demCapLs = models.CharField(max_length=10)
    demBidLs = models.CharField(max_length=10)
    demNames = models.CharField(max_length=10)

    tasktransfile = models.BooleanField(default=True)

    def __str__(self):
        return self.user.username + '_' + self.task_name

    def getprodlist(self):
        prod_list = []
        prodfile = self.prod_path
        try:
            temp_path = settings.MEDIA_ROOT + '/' + str(prodfile)
            with open(temp_path, newline='') as csvfile:
                data = list(csv.reader(csvfile))
            newdata = []
            for i in range(1, len(data)):
                try:
                    item = {'id': i, 'alia': data[i][0],
                            'name': data[i][1], 'transcost': float(data[i][2]),
                            'unit': data[i][4]}
                except Exception:
                    item = {'id': i, 'alia': data[i][0],
                            'name': data[i][1], 'transcost': float(data[i][2]),
                            'unit': 'UNIT'}
                newdata.append(item)
                prod_list.append((item['id'], item['alia']+'_'+item['name']))
            return newdata
        except Exception:
            pass
        else:
            return False

    def gettechlist(self):
        tech_list = []
        techfile = self.tech_path
        try:
            temp_path = settings.MEDIA_ROOT + '/' + str(techfile)
            with open(temp_path, newline='') as csvfile:
                data = list(csv.reader(csvfile))
            newdata = []
            for i in range(1, len(data)):
                refprod = None
                unit = None
                prodls = self.getprodlist()
                for item in prodls:
                    if data[i][4] == item['alia']:
                        refprod = item['name']
                        unit = item['unit']
                item = {
                    'id': i, 'alia': data[i][0], 'name': data[i][1],
                    'capmin': float(data[i][2]), 'capmax': float(data[i][3]),
                    'refprod': refprod, 'K_inv': float(data[i][5]),
                    'B_inv': float(data[i][6]), 'K_op': float(data[i][7]),
                    'B_op': float(data[i][8]), 'unit': unit}
                newdata.append(item)
                tech_list.append((item['id'], item['alia']+'_'+item['name']))
            return newdata
        except Exception:
            pass
        else:
            return False

    def delete(self, *args, **kwargs):
        try:
            path = settings.MEDIA_ROOT + '/' + str(self.user.id) + '_' + \
                self.user.username + '/task_' + str(self.id) + '/'
            for root, dirs, files in os.walk(path):
                for filename in files:
                    ff = path + filename
                    os.remove(ff)
            os.rmdir(path)
        except Exception:
            print("Delete task " + str(self.id) + " and there is an error.")
        super(OptTask, self).delete(*args, **kwargs)


def filepath(instance, filename):
    return '{0}_{1}/data_documents/{2}-{3}-{4}/{5}'.format(
        instance.user.id, instance.user.username, timezone.now().year,
        timezone.now().month, timezone.now().day, filename)


def temppath(instance, filename):
    return '{0}_{1}/temp_documents/{2}'.format(
        instance.user.id, instance.user.username, filename)


class DataDocument(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    TYPES = [
        ('Supply Data', 'Supply Data'),
        ('Demand Data', 'Demand Data'),
        ('Technology Site Data', 'Technology Site Data'),
        ('Technology Candidate Data', 'Technology Candidate Data'),
    ]
    datatype = models.CharField(
        max_length=100,
        choices=TYPES,
    )

    docfile = models.FileField(upload_to=filepath)
    date_upload = models.DateTimeField('date uploaded')
    notes = models.CharField(max_length=200, default='No Notes')

    def name(self):
        return self.__class__.__name__

    def shortfilename(self):
        return os.path.basename(self.docfile.name)

    def __str__(self):
        return str(self.docfile)

    def delete(self, *args, **kwargs):
        try:
            os.remove(os.path.join(settings.MEDIA_ROOT, self.docfile.name))
        except Exception:
            pass
        super(DataDocument, self).delete(*args, **kwargs)


class TempDocument(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    docfile = models.FileField(upload_to=temppath)
    date_upload = models.DateTimeField('date uploaded')

    def name(self):
        return self.__class__.__name__

    def shortfilename(self):
        return os.path.basename(self.docfile.name)

    def __str__(self):
        return str(self.docfile)

    def delete(self, *args, **kwargs):
        os.remove(os.path.join(settings.MEDIA_ROOT, self.docfile.name))
        super(TempDocument, self).delete(*args, **kwargs)

    def datatype(self):
        return "Temporary Files"


class OptTaskResults(models.Model):
    task = models.OneToOneField(OptTask, on_delete=models.CASCADE)
    summary = models.CharField(max_length=5000)
    resultspath = models.CharField(max_length=1000, default='')


# Technology and product database system
class Product(models.Model):
    name = models.CharField(max_length=100)
    transcost = models.FloatField(default=0.0)
    UNITS = [
        ('UNIT', 'UNIT'),
        ('metric tonne', 'metric tonne'),
        ('kg', 'kg'),
        ('lb', 'lb'),
        ('cubic meter', 'cubic meter'),
        ('liter', 'liter'),
        ('gallon', 'gallon'),
        ('kWh', 'kWh'),
        ('BTU', 'BTU'),
    ]
    unit = models.CharField(
        max_length=20,
        choices=UNITS,
        default='UNIT',
    )
    additionalinfo = models.CharField(max_length=1000, default='')
    public = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    def onpublic(self):
        for u in User.objects.all():
            b = u.userdatabase
            try:
                newitem = UserHasProd(userdatabase=b, product=self)
                newitem.save()
            except Exception:
                pass


class Technology(models.Model):
    name = models.CharField(max_length=100)
    capmin = models.FloatField(default=0.0)
    capmax = models.FloatField(default=0.0)
    invcost_fix = models.FloatField(default=0.0)
    invcost_pro = models.FloatField(default=0.0)
    opcost_fix = models.FloatField(default=0.0)
    opcost_pro = models.FloatField(default=0.0)
    notes = models.CharField(default='', max_length=1000)
    prods = models.ManyToManyField(
        Product,
        through='Transformation',
        through_fields=('technology', 'product'),
    )
    refproduct = models.IntegerField(default=0)
    graphcontent = models.TextField(default="")
    pngsrc = models.TextField(default="")
    public = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    def refprod(self):
        translist = Transformation.objects.filter(technology=self)
        min_y = 1
        refprod = None
        for trans in translist:
            if trans.transforming_coefficient < min_y:
                refprod = trans.product
        return refprod

    def yields(self):
        yields = []
        for p in self.prods.all():
            trans = Transformation.objects.filter(
                technology=self, product=p)[0]
            yields.append(trans.transforming_coefficient)
        return yields

    def onpublic(self):
        for u in User.objects.all():
            b = u.userdatabase
            try:
                newitem = UserHasTech(userdatabase=b, product=self)
                newitem.save()
            except Exception:
                pass


class Transformation(models.Model):
    technology = models.ForeignKey(Technology, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    transforming_coefficient = models.FloatField(default=0.0)

    def __str__(self):
        return self.technology.name + '_' + self.product.name

    class Meta:
        unique_together = ["technology", "product"]


class PGraph(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    date_create = models.DateTimeField('date create')
    content = models.TextField()
    pngsrc = models.TextField(default="")
    pseudo_id = models.TextField(default="")

    def __str__(self):
        return self.name


# User's database system
class UserDatabase(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    prods = models.ManyToManyField(
        Product,
        through='UserHasProd',
        through_fields=('userdatabase', 'product'),
    )
    techs = models.ManyToManyField(
        Technology,
        through='UserHasTech',
        through_fields=('userdatabase', 'technology'),
    )

    def __str__(self):
        return self.user.username + ' database'


class UserHasProd(models.Model):
    userdatabase = models.ForeignKey(UserDatabase, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    def __str__(self):
        return self.userdatabase.user.username + '_' + self.product.name

    class Meta:
        unique_together = ["userdatabase", "product"]


class UserHasTech(models.Model):
    userdatabase = models.ForeignKey(UserDatabase, on_delete=models.CASCADE)
    technology = models.ForeignKey(Technology, on_delete=models.CASCADE)

    def __str__(self):
        return self.userdatabase.user.username + '_' + self.technology.name

    class Meta:
        unique_together = ["userdatabase", "technology"]
