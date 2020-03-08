from rest_framework.views import exception_handler
from rest_framework.response import Response


def uc_exception_handle(exc, context):
    response = exception_handler(exc, context)

    if response is not None:
        errors = list(response.data.values())
        for e in list(response.data.keys()):
            response.data.pop(e)
        errors_messages = list(map(lambda err: err[0] if isinstance(err,list) else err, errors))
        response.data['error_message'] = errors_messages
        response.data['data'] = None
        response.data['status_code'] = response.status_code
        response.data['result'] = False

    return response


def uc_response(data, error, result, message, status_code):
    return {
        'data': data,
        'error': error,
        'result': result,
        'message': message,
        'status_code': status_code
    }
