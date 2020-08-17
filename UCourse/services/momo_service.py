import json
import hmac
import hashlib
import requests
import codecs
import urllib.parse
from Crypto.Cipher import PKCS1_v1_5 as Cipher_PKCS1_v1_5
from Crypto.PublicKey import RSA
import pathlib
from base64 import b64encode


class MoMoService:
    def __init__(self, orderInfo, returnUrl, notifyUrl, amount, orderId, requestId, extraData):
        self.signature = None
        self.partnerCode = 'MOMOVQ4J20200809'
        self.accessKey = 'RJ9VjezrUYXERdpp'
        self.orderInfo = orderInfo
        self.returnUrl = returnUrl
        self.notifyUrl = notifyUrl
        self.amount = str(amount)
        self.orderId = orderId
        self.requestId = requestId
        self.requestType = "captureMoMoWallet"
        self.extraData = "response=" + extraData

    def call(self):
        self.signature = self.__signature()
        data = {
            'partnerCode': self.partnerCode,
            'accessKey': self.accessKey,
            'requestId': self.requestId,
            'amount': str(self.amount),
            'orderId': self.orderId,
            'orderInfo': self.orderInfo,
            'returnUrl': self.returnUrl,
            'notifyUrl': self.notifyUrl,
            'extraData': self.extraData,
            'requestType': self.requestType,
            'signature': self.signature
        }
        data = json.dumps(data)
        response = requests.post('https://test-payment.momo.vn/gw_payment/transactionProcessor', data=data, json={
                                 'Content-Type': 'application/json'})
        return response

    def __signature(self):
        rawSignature = "partnerCode="+self.partnerCode+"&accessKey="+self.accessKey+"&requestId="+self.requestId+"&amount="+self.amount + \
            "&orderId="+self.orderId+"&orderInfo="+self.orderInfo+"&returnUrl=" + \
            self.returnUrl+"&notifyUrl="+self.notifyUrl+"&extraData="+self.extraData
        h = hmac.new('ULKpdY4FeC6kpu6WGawUTlXO6lSPcHt6'.encode(),
                     rawSignature.encode(), hashlib.sha256)
        signature = h.hexdigest()
        return signature


class MoMoQueryStatusService: 
    def __init__(self, partnerRefId, requestId):
        self.publicKey = ''
        self.partnerCode = 'MOMOVQ4J20200809'
        self.partnerRefId = partnerRefId
        self.requestId = requestId
        self.hash = None

    def call(self):
        self.hash = self._hash()
        data = {
            'partnerCode': self.partnerCode,
            'partnerRefId': self.partnerRefId,
            'hash': self.hash,
            'version': 2
        }
        data = json.dumps(data)
        response = requests.post('https://test-payment.momo.vn/pay/query-status', data=data, json={
                                 'Content-Type': 'application/json'})
        return response

    def _hash(self):
        f = open(str(pathlib.Path(__file__).parent) + '/mykey.pem', 'r')
        key = RSA.importKey(f.read())
        rawJson = json.dumps({
            "partnerCode": self.partnerCode,
            "partnerRefId": self.partnerRefId,
            "requestId": self.requestId
        })
        cipher = Cipher_PKCS1_v1_5.new(key)
        cipher_text = cipher.encrypt(rawJson.encode())
        emsg = b64encode(cipher_text)
        return emsg.decode("ascii")

