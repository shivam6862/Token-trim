from rest_framework.response import Response


def get_response(data, status=200):
    return Response(data, status=status)


def post_response(data, status=201):
    return Response(data, status=status)


def post_chat(message, status=201):
    try:
        response = {
            'response': "Account login issue, password problem",
            'type': 'SUCCESS'
        }
        return Response(response, status=status)
    except Exception as e:
        return Response({'message': str(e)}, status=500)


def get_all_parentchat(status=200):
    print("get_all_parentchat")
    ressponse = {
        'type': 'Success',
        'response': []
    }
    return Response(ressponse, status=status)


def new_parent_chat(data, status=201):
    print("data", data)
    response = {
        'type': 'Success',
        'response': {
            'chatName': data
        }
    }
    return Response(response, status=status)


def get_parent_chat(pk, status=200):
    print("pk", pk)
    data = {
        'type': 'Success',
        'response': []
    }
    return Response(data, status=status)
