from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from .models import Task
from encargado.models import Encargado  # Importar el modelo de Encargado
from .forms import TaskForm

def task_list(request):
    tasks = Task.objects.all()
    
    # Handle filtering
    status_filter = request.GET.get('status')
    priority_filter = request.GET.get('priority')
    
    if status_filter and status_filter != 'all':
        tasks = tasks.filter(status=status_filter)
    
    if priority_filter and priority_filter != 'all':
        tasks = tasks.filter(priority=priority_filter)
    
    context = {
        'tasks': tasks,
        'status_filter': status_filter,
        'priority_filter': priority_filter,
    }
    
    return render(request, 'tasks/task_list.html', context)

def task_create(request):
    if request.method == 'POST':
        form = TaskForm(request.POST)
        if form.is_valid():
            task = form.save(commit=False)  # No guarda aún, para asignar encargado
            encargado_id = request.POST.get('encargado')  # Capturar el encargado desde el formulario
            
            if encargado_id:  # Si se seleccionó un encargado, asignarlo
                task.encargado = Encargado.objects.get(id=encargado_id)
            
            task.save()  # Guardar la tarea con el encargado asignado
            messages.success(request, 'Task created successfully!')
            return redirect('task_list')
    else:
        form = TaskForm()
    
    encargados = Encargado.objects.all()  # Obtener lista de encargados para el formulario
    return render(request, 'tasks/task_form.html', {'form': form, 'encargados': encargados})

def task_update(request, pk):
    task = get_object_or_404(Task, pk=pk)
    
    if request.method == 'POST':
        form = TaskForm(request.POST, instance=task)
        if form.is_valid():
            task = form.save(commit=False)
            encargado_id = request.POST.get('encargado')
            
            if encargado_id:
                task.encargado = Encargado.objects.get(id=encargado_id)
            else:
                task.encargado = None  # Permitir que se desasigne el encargado
            
            task.save()
            messages.success(request, 'Task updated successfully!')
            return redirect('task_list')
    else:
        form = TaskForm(instance=task)
    
    encargados = Encargado.objects.all()
    return render(request, 'tasks/task_form.html', {'form': form, 'encargados': encargados, 'task': task})

def task_delete(request, pk):
    task = get_object_or_404(Task, pk=pk)
    
    if request.method == 'POST':
        task.delete()
        messages.success(request, 'Task deleted successfully!')
        return redirect('task_list')
    
    return render(request, 'tasks/task_confirm_delete.html', {'task': task})
