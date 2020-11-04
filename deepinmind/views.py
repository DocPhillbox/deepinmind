from django.shortcuts import render, redirect
from .forms import RegisterForm
from quiz.models import Quiz
from django.contrib.auth.decorators import login_required
import json
import random

def index(request):
    return render(request, "index.html")

def login(request):
    return render(request, "login.html")

@login_required
def quizmenu(request):
    data = Quiz.objects.all()

    return render(request, "quiz-menu.html", {"quiz": data})

@login_required
def gamemenu(request):
    return render(request, 'game-menu.html')

def quizcreation(request):
    # Récupère les données du quiz depuis le bouton quizData
    context = {}
    data = request.POST.get("quizData")
    if data != None:
        data = json.loads(data)
        context["quiz"] = data

        # Création des propriétés pour la sauvegarde dans la base de données
        quizTitle = data["quesTitle"]
        quiz = Quiz(title=quizTitle, data=data, user_id=1)
        quiz.save()

    return render(request, "quiz-creation.html", context)

def gamecreation(request):
    data = Quiz.objects.all()

    letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    code = ''.join(random.choice(letters) for _ in range(20))

    return render(request, 'game/game-creation.html', {"data": data, "code": code})

def game(request, game_name):
    quiz = Quiz.objects.all()
    #quiz_name = request.POST.get('quizName')
    actual_quiz = ""
    for element in quiz:
        if element.title == "Quiz Chocolat":
            actual_quiz = element
    print(actual_quiz.data)

    return render(request, 'game/game.html', {'game_name': game_name, 'data': actual_quiz.data})

def register(request):
    if request.method == "POST":
        form = RegisterForm(request.POST)
        if form.is_valid():
            form.save()
        return render(request, 'login.html', {"form":form})
    else:
        form = RegisterForm()
    
    return render(request, "register.html", {"form":form})
