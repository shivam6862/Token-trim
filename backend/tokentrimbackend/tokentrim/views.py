from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .utils import get_response, post_response, post_chat, get_all_parentchat, new_parent_chat, get_parent_chat


@api_view(['GET'])
def getRoutes(request):
    routes = [
        {'Endpoint': '/tokentrim/', 'method': 'GET',
         'body': None, 'description': 'Returns an array of tokentrim'},
        {'Endpoint': '/tokentrim/', 'method': 'POST',
            'body': {'name': 'string', 'age': 'integer'}, 'description': 'Creates a new tokentrim'},
        {'Endpoint': '/tokentrim/chat/<str:pk>/', 'method': 'POST',
            'body': {'message': 'string'}, 'description': 'Creates a new chat'},
        {'Endpoint': '/tokentrim/getallparentchats', 'method': 'GET',
            'body': None, 'description': 'Returns an array of parent chats'},
        {'Endpoint': '/tokentrim/newparentchat', 'method': 'POST',
            'body': {'chatName': 'string'}, 'description': 'Creates a new parent chat'},
        {'Endpoint': '/tokentrim/getparentchat/<str:pk>', 'method': 'GET',
            'body': None, 'description': 'Returns an array of chat messages'},
    ]
    return Response(routes)


@api_view(['GET', 'POST'])
def getTokenTrim(request):
    if request.method == 'GET':
        return get_response('Get all tokentrim')
    elif request.method == 'POST':
        return post_response('Create new tokentrim')
    return get_response('Hello World')


@api_view(['POST'])
def chat(request, pk):
    print(pk)
    message = request.data['message']
    return post_chat(message)


@api_view(['GET'])
def getallparentchats(request):
    return get_all_parentchat()


@api_view(['POST'])
def newparentchat(request):
    chatName = request.data['chatName']
    return new_parent_chat(chatName)


@api_view(['GET'])
def getparentchat(request, pk):
    return get_parent_chat(pk)
