from django.conf.urls import include, patterns, url
from rest_framework import routers
from authentications.views import AccountViewSet

router = routers.routersSimpleRouter()
router.register(r'accounts', AccountViewSet)

urlpatterns = patterns(
    '',

    url(r'^api/v1/', include(router.urls)),
)
