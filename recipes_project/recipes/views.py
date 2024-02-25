from django.shortcuts import render
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from rest_framework import viewsets
from .models import *
from .serializers import *


class DishViewSet(viewsets.ModelViewSet):
    serializer_class = DishSerializer
    queryset = Dish.objects.all()


class CategoryListViewSet(viewsets.ModelViewSet):
    serializer_class = CategoryListSerializer
    queryset = CategoryList.objects.all()



schema_view = get_schema_view(
    openapi.Info(
        title="National cuisine API",
        default_version='v1',
        description="Use methods below for data access",

    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)
