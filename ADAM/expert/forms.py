# forms.py (expert)
# !/usr/bin/env python3
# coding=utf-8
# ruiz-mercado.gerardo@epa.gov

"""Forms used in ADAM main module"""


from django import forms
from django.forms import ModelForm
from accounts.models import User
from .models import *
from django.contrib.auth import authenticate
from django.conf import settings
import csv


class UserForm(forms.Form):
    """UserForm
        form used for user registration
    """

    username = forms.CharField(
        label="Username",
        widget=forms.TextInput(
            attrs={'placeholder': 'Username', 'class': 'form-control'}),
        required=True)
    email = forms.EmailField(
        label="E-mail",
        widget=forms.TextInput(
            attrs={'placeholder': 'Email', 'class': 'form-control'}),
        required=True)
    password = forms.CharField(
        label="Password",
        widget=forms.PasswordInput(
            attrs={'placeholder': 'Password', 'class': 'form-control'}),
        required=True)
    password_repeat = forms.CharField(
        label="Confirm",
        widget=forms.PasswordInput(
            attrs={'placeholder': 'Retype Password', 'class': 'form-control'}),
        required=True)
    first_name = forms.CharField(
        label="First Name",
        widget=forms.TextInput(
                attrs={'placeholder': 'First Name', 'class': 'form-control'}),
        required=True)
    last_name = forms.CharField(
        label="Last Name",
        widget=forms.TextInput(
                attrs={'placeholder': 'Last Name', 'class': 'form-control'}),
        required=True)
    organization = forms.CharField(
        label="Organization",
        widget=forms.TextInput(
                attrs={'placeholder': 'Organization',
                       'class': 'form-control'}),
        required=True)

    def clean(self):
        """clean up the form"""
        # check if password matches
        password = self.cleaned_data['password']
        password_repeat = self.cleaned_data['password_repeat']
        if password != password_repeat:
            raise forms.ValidationError({
                'password': ["Passwords do not match."]})
        # check if username exists
        username = self.cleaned_data['username']
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            pass
        else:
            raise forms.ValidationError({
                'username': ["The username '%s' already exists." % username]})
        # check if email exists
        useremail = self.cleaned_data['email']
        try:
            user = User.objects.get(email=useremail)
        except User.DoesNotExist:
            pass
        else:
            raise forms.ValidationError(
                {'email': ["This email is already in use."]})


class LoginForm(forms.Form):
    """form used for login"""

    username = forms.CharField(
        label="Username",
        widget=forms.TextInput(
                attrs={'placeholder': 'Username', 'class': 'form-control'}),
        required=True)
    password = forms.CharField(
        label="Password",
        widget=forms.PasswordInput(
            attrs={'placeholder': 'Password', 'class': 'form-control'}),
        required=True)

    def clean(self):
        """clean up the form"""
        username = self.cleaned_data['username']
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            raise forms.ValidationError(
                {'username': ["The username '%s' does not exist." % username]})
        else:
            pass


class TaskTypeForm(forms.Form):
    """select model type and time step in model setup step 1"""

    Model_Type_List = (
        (1, 'Supply Chain Design'),
        # (2, 'Market Analysis'),
        (3, 'Supply Chain Management')
    )
    model_type = forms.IntegerField(
        widget=forms.Select(
            choices=Model_Type_List, attrs={'class': 'custom-select'})
    )
    Time_Step_List = (
        (1, 'year'),
        (2, 'month'),
        (3, 'day')
        # (4, '\u0394t')
    )
    time_basis = forms.IntegerField(
            widget=forms.Select(
                choices=Time_Step_List, attrs={'class': 'custom-select'})
        )


class TaskDataSelectionForm(forms.Form):
    """used for select datafiles for models (deprecated)"""

    nodefile = forms.IntegerField(
        label='Select geographical data (.csv)', widget=forms.Select(
            attrs={'class': 'custom-select'}), required=True)
    disfile = forms.IntegerField(
        label='Select distance data (.csv)', widget=forms.Select(
            attrs={'class': 'custom-select'}), required=True)
    prodfile = forms.IntegerField(
        label='Select product database (.csv)', widget=forms.Select(
            attrs={'class': 'custom-select'}), required=True)
    techfile = forms.IntegerField(
        label='Select technology database (.csv)', widget=forms.Select(
            attrs={'class': 'custom-select'}), required=True)
    sitefile = forms.IntegerField(
        label='Select existing technologies (.csv)', widget=forms.Select(
            attrs={'class': 'custom-select'}), required=True)
    alphafile = forms.IntegerField(
        label='Select technology yield data (.csv)', widget=forms.Select(
            attrs={'class': 'custom-select'}), required=True)
    supfile = forms.IntegerField(
        label='Select supply data (.csv)', widget=forms.Select(
            attrs={'class': 'custom-select'}), required=True)
    demfile = forms.IntegerField(
        label='Select demand data (.csv)', widget=forms.Select(
            attrs={'class': 'custom-select'}), required=True)


class DataUploadForm(forms.Form):
    """used for uploading data files for models"""

    datafile = forms.FileField(
        label='Upload a data file(.csv)', widget=forms.FileInput(
            attrs={'class': 'custom-file-input', 'onchange': 'UpdateLabel()'}),
        required=False)
    datanotes = forms.CharField(
        widget=forms.Textarea(
            {'placeholder': 'Write your notes here', 'class': 'form-control',
             'rows': 6}),
        required=False)
    datatypes = (
        ('Supply Data', 'Supply Data'),
        ('Demand Data', 'Demand Data'),
        ('Technology Site Data', 'Technology Site Data'),
        ('Technology Candidate Data', 'Technology Candidate Data')
    )
    datatype = forms.CharField(
        widget=forms.Select(
            choices=datatypes,
            attrs={'class': 'custom-select', 'onchange': 'UpdateTable()'})
    )


class TaskSelectionForm(forms.Form):
    """used to select a completed model for visualization"""

    task_choice = forms.IntegerField(
        label='Select a completed task',
        widget=forms.Select(
            attrs={'class': 'custom-select'}), required=True)

    def __init__(self, *args, **kwargs):
        """initialize the form - read all completed models"""
        self.user = kwargs.pop('user', None)
        super().__init__(*args, **kwargs)
        task_list = []
        for task_item in self.user.opttask_set.all():
            # Only show completed tasks
            if task_item.task_status == 'Completed':
                task_list.append((task_item.id, task_item.task_name))
        self.fields['task_choice'].widget.choices = task_list


class TaskSelectionForm2(forms.Form):
    """used to select a model for visualization"""

    task_choice = forms.IntegerField(
        label='Select a completed task',
        widget=forms.Select(
            attrs={'class': 'custom-select'}), required=True)

    def __init__(self, *args, **kwargs):
        """initialize the form - read all models"""
        self.user = kwargs.pop('user', None)
        super().__init__(*args, **kwargs)
        task_list = []
        for task_item in self.user.opttask_set.all():
            task_list.append((task_item.id, task_item.task_name))
        self.fields['task_choice'].widget.choices = task_list


class ProdSelectionForm(forms.Form):
    """used for selecting a product used in a model."""

    prod_choice = forms.IntegerField(
        label='Select a product in this task:',
        widget=forms.Select(
            attrs={'class': 'custom-select'}), required=True)

    def __init__(self, *args, **kwargs):
        """initialize the form - read products in a model"""
        self.task = kwargs.pop('task', None)
        super().__init__(*args, **kwargs)
        prod_list = []
        prodfile = self.task.prod_path
        temp_path = settings.MEDIA_ROOT + '/' + str(prodfile)
        with open(temp_path, newline='') as csvfile:
            data = list(csv.reader(csvfile))
        newdata = []
        for i in range(1, len(data)):
            item = {
                'id': i, 'alia': data[i][0], 'name': data[i][1],
                'transcost': float(data[i][2]), 'unit': data[i][4]}
            newdata.append(item)
            prod_list.append((
                item['id'],
                item['alia'] + '_' + item['name'] + " (" + item['unit'] + ")"))
        self.fields['prod_choice'].widget.choices = prod_list


class SearchForm(forms.Form):
    """used for searching items in database"""

    keywords = forms.CharField(
        widget=forms.TextInput(
            attrs={'placeholder': 'Type your keywords here',
                   'class': 'form-control'}),
        required=False)


class ProductForm(ModelForm):
    """used for defining a new products"""

    class Meta:
        """-"""

        model = Product
        fields = ['name', 'unit', 'transcost', 'additionalinfo']
        labels = {
            'name': 'Product Name',
            'unit': 'Product Unit',
            'transcost': 'Transportation Cost (USD/unit/km)',
            'additionalinfo': 'Additional Information',
        }
        widgets = {
            'name': forms.TextInput(
                attrs={'class': 'form-control'}),
            'unit': forms.Select(
                attrs={'class': 'custom-select'}),
            'additionalinfo': forms.Textarea(
                attrs={'class': 'form-control', 'rows': 10}),
            'transcost': forms.NumberInput(
                attrs={'class': 'form-control'})
        }


class InOutNumForm(forms.Form):
    """used for selecting input and output stream numbers for a technology"""

    Number_List = (
        (1, '1'),
        (2, '2'),
        (3, '3'),
        (4, '4'),
        (5, '5'),
        (6, '6'),
        (7, '7'),
        (8, '8'),
        (9, '9')
    )
    inputnum = forms.IntegerField(
        label='Number of Input Streams:',
        widget=forms.Select(
            choices=Number_List, attrs={'class': 'custom-select'}),
        required=True
    )
    outputnum = forms.IntegerField(
        label='Number of Output Streams:',
        widget=forms.Select(
            choices=Number_List, attrs={'class': 'custom-select'}),
        required=True
    )


class YieldInputForm(forms.Form):
    """used for specifing input streams"""

    product = forms.IntegerField(
        label='Product',
        widget=forms.Select(
            attrs={'class': 'custom-select'}),
        required=True
    )
    yieldfactor = forms.FloatField(
        label='Yield Factor',
        widget=forms.NumberInput(
            attrs={'class': 'form-control'}),
        required=True
    )
    refprod = forms.BooleanField(
        label='Reference Product',
        widget=forms.CheckboxInput(
            attrs={'class': 'form-control', 'onclick': 'modifycheck();'}),
        required=False
    )

    def __init__(self, *args, **kwargs):
        """initialize this form"""
        super().__init__(*args, **kwargs)
        self.fields['product'].widget.choices = list(
            Product.objects.all().values_list('id', 'name'))

    def clean(self):
        """clean up this form"""
        yieldfactor = self.cleaned_data[yieldfactor]
        if yieldfactor >= 0:
            raise forms.ValidationError({
                'yieldfactor': 'Yield factor should be ' +
                'negative for input stream.'})


class YieldOutputForm(forms.Form):
    """used for specifying output streams"""

    product = forms.IntegerField(
        label='Product',
        widget=forms.Select(
            attrs={'class': 'custom-select'}),
        required=True
    )
    yieldfactor = forms.FloatField(
        label='Yield Factor',
        widget=forms.NumberInput(
            attrs={'class': 'form-control'}),
        required=True
    )
    refprod = forms.BooleanField(
        label='Reference Product',
        widget=forms.CheckboxInput(
            attrs={'class': 'form-control', 'onclick': 'modifycheck();'}),
        required=False
    )

    def __init__(self, *args, **kwargs):
        """initialize this form"""
        super().__init__(*args, **kwargs)
        self.fields['product'].widget.choices = list(
            Product.objects.all().values_list('id', 'name'))

    def clean(self):
        """clean up this form"""
        yieldfactor = self.cleaned_data[yieldfactor]
        if yieldfactor <= 0:
            raise forms.ValidationError({
                'yieldfactor': 'Yield factor should be positive for ' +
                'output stream.'})


class TechnologyForm(ModelForm):
    """used for specifying new technologies"""

    class Meta:
        """-"""

        model = Technology
        fields = ['name', 'capmin', 'capmax', 'invcost_fix', 'invcost_pro',
                  'opcost_fix', 'opcost_pro', 'notes']
        labels = {
            'name': 'Technology Name',
            'capmin': 'Minimum Capacity (unit reference product/year)',
            'capmax': 'Maximum Capacity (unit reference product/year)',
            'invcost_fix': 'Investment Cost Fixed (USD)',
            'invcost_pro': 'Investment Cost Proportional ' +
            '(USD/(unit reference product/year))',
            'opcost_fix': 'Operational Cost Fixed (USD/year)',
            'opcost_pro': 'Operational Cost Proportional ' +
            '(USD/unit reference product)',
            'notes': 'Additional Information'
        }
        widgets = {
            'name': forms.TextInput(
                attrs={'class': 'form-control'}),
            'capmin': forms.NumberInput(
                attrs={'class': 'form-control', 'min': 0}),
            'capmax': forms.NumberInput(
                attrs={'class': 'form-control', 'min': 0}),
            'invcost_fix': forms.NumberInput(
                attrs={'class': 'form-control'}),
            'invcost_pro': forms.NumberInput(
                attrs={'class': 'form-control'}),
            'opcost_fix': forms.NumberInput(
                attrs={'class': 'form-control'}),
            'opcost_pro': forms.NumberInput(
                attrs={'class': 'form-control'}),
            'notes': forms.Textarea(
                attrs={'class': 'form-control', 'rows': 10}),
        }


class FeedNumForm(forms.Form):
    """used for selecting input stream numbers for a technology (deprecated)"""

    Number_List = (
        (1, '1'),
        (2, '2'),
        (3, '3'),
        (4, '4'),
        (5, '5'),
        (6, '6'),
        (7, '7'),
        (8, '8'),
        (9, '9')
    )
    inputnum = forms.IntegerField(
        label='How many types of waste stream(s) are you handling?',
        widget=forms.Select(
            choices=Number_List, attrs={'class': 'custom-select'}),
        required=True
    )


class ProdNumForm(forms.Form):
    """used for selecting output stream numbers for a tech (deprecated)"""

    Number_List = (
        (1, '1'),
        (2, '2'),
        (3, '3'),
        (4, '4'),
        (5, '5'),
        (6, '6'),
        (7, '7'),
        (8, '8'),
        (9, '9')
    )
    inputnum = forms.IntegerField(
        label='How many types of product(s) do you get?',
        widget=forms.Select(
            choices=Number_List, attrs={'class': 'custom-select'}),
        required=True
    )


class Step2GraphCsvSelection(forms.Form):
    """(deprecated)"""

    Number_List = (
        (1, 'Use a Technology Graph'),
        (2, 'Use csv Files')
        )
    definepathways = forms.IntegerField(
        label='How do you want to define processing pathways?',
        widget=forms.Select(
            choices=Number_List, attrs={'class': 'custom-select'}),
        required=True
    )


class Step2CsvFileSelection(forms.Form):
    """(deprecated)"""

    techlist = forms.IntegerField(
        label='Please choose technology data:', widget=forms.Select(
            attrs={'class': 'custom-select'}), required=True)
    prodlist = forms.IntegerField(
        label='Please choose product data:', widget=forms.Select(
            attrs={'class': 'custom-select'}), required=True)
    alphalist = forms.IntegerField(
        label='Please choose yield data:', widget=forms.Select(
            attrs={'class': 'custom-select'}), required=True)

    def __init__(self, *args, **kwargs):
        """Add docstring."""
        self.user = kwargs.pop('user', None)
        super().__init__(*args, **kwargs)
        tlist = [('0', 'Upload Technology Data')]
        plist = [('0', 'Upload Product Data')]
        alist = [('0', 'Upload Yield Data')]
        for f in self.user.techdocument_set.all():
            tlist.append((f.id, f.shortfilename()))
        for f in self.user.proddocument_set.all():
            plist.append((f.id, f.shortfilename()))
        for f in self.user.alphadocument_set.all():
            alist.append((f.id, f.shortfilename()))
        self.fields['techlist'].widget.choices = tlist
        self.fields['prodlist'].widget.choices = plist
        self.fields['alphalist'].widget.choices = alist


class Step2TechGraphSelection(forms.Form):
    """(deprecated)"""

    graphlist = forms.IntegerField(
        label='Please choose a graph:', widget=forms.Select(
            attrs={'class': 'custom-select'}), required=True)

    def __init__(self, *args, **kwargs):
        """(deprecated)"""
        self.user = kwargs.pop('user', None)
        super().__init__(*args, **kwargs)
        glist = [('0', 'New Graph')]
        for f in self.user.pgraph_set.all():
            glist.append((f.id, f.name))
        self.fields['graphlist'].widget.choices = glist


class Step3GraphCsvSelection(forms.Form):
    """(deprecated)"""

    Number_List2 = (
        (1, 'Cartesian coordinates (x-y)'),
        (2, 'Geographical coordinates (latitude-longitude)')
        )
    definecoord = forms.IntegerField(
        label='What type of coordinate system you want to use?',
        widget=forms.Select(
            choices=Number_List2, attrs={'class': 'custom-select'}),
        required=True
    )


class VisualUploadForm(forms.Form):
    """used for uploading files in visualization"""

    nodefile = forms.FileField(
        label='Upload geographical data (.csv)',
        widget=forms.FileInput(
            attrs={'class': 'custom-file-input',
                   'onchange': 'UpdateLabel(0)'}),
        required=False)
    flowfile = forms.FileField(
        label='Upload flow data (.csv)',
        widget=forms.FileInput(
            attrs={'class': 'custom-file-input',
                   'onchange': 'UpdateLabel(1)'}),
        required=False)
    modeList = (
        (1, 'Straight Line'),
        (2, 'Routing'),
        (3, 'Hybrid'),)
    selectmode = forms.IntegerField(
        label='Please select the mapping style',
        widget=forms.Select(
            choices=modeList, attrs={'class': 'custom-select'}),
        required=True
    )
