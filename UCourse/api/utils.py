from rest_framework.views import exception_handler


def uc_exception_handle(exc, context):
    response = exception_handler(exc, context)

    if response is not None:
        response.data['status_code'] = response.status_code
        response.data['result'] = False

    return response
