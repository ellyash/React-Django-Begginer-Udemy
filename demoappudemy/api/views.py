from rest_framework import viewsets
from .serializers import BookSerializer, BookMiniSerializer
from .models import Book
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


class BookViewSet(viewsets.ModelViewSet):
    serializer_class = BookMiniSerializer
    queryset = Book.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = BookSerializer(instance)
        return Response(serializer.data)
