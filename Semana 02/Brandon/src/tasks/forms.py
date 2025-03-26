from django import forms
from .models import Task
from encargado.models import Encargado

class TaskForm(forms.ModelForm):
    encargado = forms.ModelChoiceField(
        queryset=Encargado.objects.all(), required=False
    )

    class Meta:  
        model = Task
        fields = ['title', 'description', 'due_date', 'priority', 'status', 'encargado']
        widgets = {
            'due_date': forms.DateInput(attrs={'type': 'date'}),
            'description': forms.Textarea(attrs={'rows': 4}),
        }
