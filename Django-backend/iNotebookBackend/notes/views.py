from notes.models import Notes
from notes.serializers import NotesSerializer
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework import permissions
from accounts.models import User


class NotesViewSet(viewsets.ViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def create(self, request):

        try:
            user = request.user
            serializer = NotesSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(user=user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):

        try:
            user = request.user
            notes = Notes.objects.filter(user=user).order_by('created_at')
            serializer = NotesSerializer(notes, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
        
    def update(self, request, pk):
        try:
            user = request.user
            note = Notes.objects.get(id=pk)
            serializer = NotesSerializer(note, data=request.data)
            if serializer.is_valid():
                serializer.save(user=user)
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, pk):
        try:
            note = Notes.objects.get(id=pk)
            note.delete()
            return Response({"message":'Note deleted'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)