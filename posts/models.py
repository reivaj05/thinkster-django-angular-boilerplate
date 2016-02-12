from django.db import models
from authentication.models import Account


# Create your models here.
class Post(models.Model):

    author = models.ForeignKey(Account)
    content = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Post"
        verbose_name_plural = "Posts"

    def __unicode__(self):
        return '{0}'.format(self.content)
