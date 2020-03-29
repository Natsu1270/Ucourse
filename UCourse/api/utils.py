from rest_framework.views import exception_handler
from tags.models import SearchKeyWord
from rest_framework.parsers import FileUploadParser


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


def create_search_keyword(keyword):
    search_key = SearchKeyWord.objects.filter(name=keyword)
    if len(search_key) == 0:
        SearchKeyWord.objects.create(name=keyword)
    else:
        search_key = search_key.first()
        search_key.count = search_key.count + 1
        search_key.save()


class ImageUploadParser(FileUploadParser):
    media_type = 'image/*'
