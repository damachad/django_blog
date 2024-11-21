from django.db import models

class Test(models.Model):
	name = models.CharField(max_length=80)
	age = models.IntegerField(default=0)