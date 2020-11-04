from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('register', views.register, name="register"),
    path('', include('django.contrib.auth.urls')),
    path('admin/', admin.site.urls),
    path('quizmenu', views.quizmenu, name="quizmenu"),
    path('quizcreation', views.quizcreation, name="quizcreation"),
    path('game-menu', views.gamemenu, name="gamemenu"),
    path('game-creation', views.gamecreation, name="gamecreation"),
    path('<str:game_name>/', views.game, name="game"),
]
