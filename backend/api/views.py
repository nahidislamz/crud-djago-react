from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from .serializers import UserSerializer, UserInfoSerializer
from rest_framework.generics import GenericAPIView
from .models import UserInfo
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserInfoViewSet(GenericAPIView):
    @classmethod
    def get(self, request):
        if request.GET.get('id'):
            info = UserInfo.objects.get(pk=request.GET.get('id'))
            SnippetSerializer = UserInfoSerializer(info)
        else:
            info = UserInfo.objects.all()
            SnippetSerializer = UserInfoSerializer(info, many="true")
        response = {"status": 1, "message": "UserInfo List",
                    "data": SnippetSerializer.data}
        return JsonResponse(response, safe=False)

    @classmethod
    def post(self, request):
        data = request.data
        serializerData = ''
        saveInfo = UserInfoSerializer(data=data)
        if saveInfo.is_valid():
            saveInfo.save()
            serializerData = saveInfo.data
            statusResponse = status.HTTP_201_CREATED
        else:
            serializerData = saveInfo.errors
            statusResponse = status.HTTP_400_BAD_REQUEST
        response = {"status": 1, "message": "UserInfo Added Successfully",
                    "statusResponse": statusResponse, "serializerData": serializerData}
        return JsonResponse(response, safe=False)

    def put(self, request, id=None):
        data = request.data
        info = UserInfo.objects.filter(pk=request.data['id']).first()

        serializer = UserInfoSerializer(info)
        if serializer.is_valid():
            serializer.save()
        if serializer:
            data = {'status': 1, 'message': 'Size updated successfully.',
                    "data": serializer.data}
            return JsonResponse(data, status=200, safe=False)
        else:
            data = {'status': 0, 'message': 'Oops. there was a problem.'}
            return JsonResponse(data, status=500, safe=False)

    @classmethod
    def delete(self, request, id=None):
        info = UserInfo.objects.filter(pk=request.GET.get('id')).first()

        info.delete()
        info = UserInfo.objects.all()
        SnippetSerializer = UserInfoSerializer(info, many="true")
        data = {'status': 1, 'message': 'UserInfo deleted successfully.',
                "data": SnippetSerializer.data}
        return JsonResponse(data, safe=False)
