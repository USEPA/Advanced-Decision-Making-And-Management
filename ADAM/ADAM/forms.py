from django import forms


class ContactForm(forms.Form):
    yourname = forms.CharField(
        required=True,
        label='Name',
        widget=forms.TextInput(attrs={'class': 'form-control'}))
    email = forms.EmailField(
        required=True,
        label='E-mail',
        widget=forms.TextInput(attrs={'class': 'form-control'}))
    subject = forms.CharField(
        required=True,
        label='Subject',
        widget=forms.TextInput(attrs={'class': 'form-control'}))
    message = forms.CharField(
        label='Content',
        required=True,
        widget=forms.Textarea(attrs={'class': 'form-control', 'rows': 12}))

    def clean(self):
        name = self.cleaned_data['yourname']
        email = self.cleaned_data['email']
        subject = self.cleaned_data['subject']
        message = self.cleaned_data['message']
