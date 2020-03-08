from rest_framework.compat import SHORT_SEPARATORS, LONG_SEPARATORS, INDENT_SEPARATORS
from rest_framework.renderers import JSONRenderer
from rest_framework.utils import json


class UcApiRenderer(JSONRenderer):

    def render(self, data, accepted_media_type=None, renderer_context=None):
        """
        Render `data` into JSON, returning a bytestring.
        """
        if data is None:
            return b''

        if isinstance(data, list) or 'result' not in data.keys():
            custome_response = {
                'data': data,
                'result': True,
                'message': 'OK',
                'status_code':200
            }
            if isinstance(data, list):
                custome_response['count'] = len(data)
            data = custome_response

        renderer_context = renderer_context or {}
        indent = self.get_indent(accepted_media_type, renderer_context)

        if indent is None:
            separators = SHORT_SEPARATORS if self.compact else LONG_SEPARATORS
        else:
            separators = INDENT_SEPARATORS

        ret = json.dumps(
            data, cls=self.encoder_class,
            indent=indent, ensure_ascii=self.ensure_ascii,
            allow_nan=not self.strict, separators=separators
        )
        ret = ret.replace('\u2028', '\\u2028').replace('\u2029', '\\u2029')
        return ret.encode()
