import { MOMO_CONFIG } from "../configs";
import axios from "axios";
import hash from "hash.js";

export default class MoMoService {
  constructor(orderInfo, returnUrl, notifyUrl, amount, orderId, requestId) {
    this.signature = undefined;
    this.partnerCode = MOMO_CONFIG.PARTNER_CODE;
    this.accessKey = MOMO_CONFIG.ACCESS_KEY;
    this.orderInfo = orderInfo;
    this.returnUrl = returnUrl;
    this.notifyUrl = notifyUrl;
    this.amount = amount;
    this.orderId = orderId;
    this.requestId = requestId;
    this.requestType = "captureMoMoWallet";
    this.extraData = "merchantName=;merchantId=";
  } 

  call = async () => {
    this.signature = this._signature();
    let data = JSON.stringify({
      'partnerCode': this.partnerCode,
      'accessKey': this.accessKey,
      'requestId': this.requestId,
      'amount': this.amount.toString(),
      'orderId': this.orderId,
      'orderInfo': this.orderInfo,
      'returnUrl': this.returnUrl,
      'notifyUrl': this.notifyUrl,
      'extraData': this.extraData,
      'requestType': this.requestType,
      'signature': this.signature
    });
    const response = await axios.post(MOMO_CONFIG.API_ENDPOINT, data, {
      'Content-Type': 'application/json'
    })
    return response.data;
  };

  _signature = () => {
    const rawSignature = `partnerCode=${this.partnerCode}&accessKey=${this.accessKey}&requestId=${this.requestId}&amount=${this.amount}&orderId=${this.orderId}&orderInfo=${this.orderInfo}&returnUrl=${this.returnUrl}&notifyUrl=${this.notifyUrl}&extraData=${this.extraData}`
    const signature = hash.hmac(hash.sha256, MOMO_CONFIG.SECRET_KEY).update(rawSignature).digest("hex");
    return signature;
  }
}