from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('tokentrim/', views.getTokenTrim, name="tokentrim"),
    path("tokentrim/chat/<str:pk>/", views.chat, name="chat"),
    path("tokentrim/getallparentchats",
         views.getallparentchats, name="getallparentchats"),
    path("tokentrim/newparentchat", views.newparentchat, name="newparentchat"),
    path("tokentrim/getparentchat/<str:pk>",
         views.getparentchat, name="getparentchat"),
]
