from django.shortcuts import render
from .models import Product
from django.http import HttpResponse
from django.shortcuts import render, redirect, get_object_or_404
from .models import Product
from .forms import ProductForm 
import requests



def all_products(request):
    products = Product.objects.all()
    return render(request, 'blogging/all_product.html', {'products': products})

# def one_product(request, pk):
#     product = Product.objects.get(pk=pk)
#     return render(request, 'blogging/one_product.html', {'product': product})

def product_detail(request, pk):
    product = get_object_or_404(Product, pk=pk)
    return render(request, 'blogging/product_detail.html', {'product': product})

def add_product(request):
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES)  # Files bhi allow honi chahiye
        if form.is_valid():
            form.save()
            return redirect('all_product')  # Blog list page pe redirect
    else:
        form = ProductForm()
    return render(request, 'blogging/add_product.html', {'form': form})

def edit_product(request, pk):
    product = get_object_or_404(Product, pk=pk)

    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES, instance=product)
        if form.is_valid():
            product.edit(
                name=form.cleaned_data['name'],
                category=form.cleaned_data['category'],
                description=form.cleaned_data['description'],
                image=form.cleaned_data.get('image')  # Image optional hai
            )
            return redirect('all_product')
    else:
        form = ProductForm(instance=product)

    return render(request, 'blogging/edit.html', {'form': form})


def delete_product(request, pk):
    product = get_object_or_404(Product, pk=pk)
    if request.method == 'POST':
        product.delete()
        return redirect('all_product')
    return render(request, 'blogging/delete.html', {'product': product})


def home(request):
    return render(request, 'blogging/home.html')

def external_blogs(request):
    API_KEY = "YOUR_NEWSAPI_KEY"
    url = f"https://newsapi.org/v2/everything?q=technology&apiKey={API_KEY}"

    response = requests.get(url)
    blogs = response.json().get('articles', [])  

    return render(request, 'blogging/external_blogs.html', {'blogs': blogs})