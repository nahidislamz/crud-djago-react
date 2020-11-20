
from django.urls import path, include
from rest_framework import routers
from .views import *
from django.conf.urls import url

router = routers.DefaultRouter()
router.register('users', UserViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('info/', UserInfoViewSet.as_view()),
]
