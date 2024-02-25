from django.urls import include, path
from rest_framework import routers

from .views import DishViewSet, CategoryListViewSet

router = routers.DefaultRouter()
router.register('dishes', DishViewSet)
router.register('categories', CategoryListViewSet)

urlpatterns = [
    path('', include(router.urls)),
]