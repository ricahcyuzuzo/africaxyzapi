import open from 'open';
import Flutterwave from 'flutterwave-node-v3';

class CardController {
    static chargeTheCard(req, res){

        const { cardNumber, cvv, expiryMonth, expiryYear, currency, amount, fullName, email, phoneNumber, pin, otp  } = req.body;
        const flw = new Flutterwave("FLWPUBK_TEST-SANDBOXDEMOKEY-X", "FLWSECK_TEST-SANDBOXDEMOKEY-X");

        const randomNumber1 = (min, max) => {
            return Math.floor(
                Math.random() * (max - min) + min
            )
        }

        const txRef = randomNumber1(111111, 999999);

const payload = {
    "card_number": cardNumber,
    "cvv": cvv,
    "expiry_month": expiryMonth,
    "expiry_year": expiryYear,
    "currency": currency,
    "amount": amount,
    "redirect_url": "https://www.google.com",
    "fullname": fullName,
    "email": email,
    "phone_number": phoneNumber,
    "enckey": "FLWSECK_TEST74e0b6c7db0e",
    "tx_ref": `MC-${txRef}` // This is a unique reference, unique to the particular transaction being carried out. It is generated when it is not provided by the merchant for every transaction.
}
 
 
const chargeCard = async () => {
    try {
        const response = await flw.Charge.card(payload)
        console.log(response)
        if (response.meta.authorization.mode === 'pin') {
            let payload2 = payload
            payload2.authorization = {
                "mode": "pin",
                "fields": [
                    "pin"
                ],
                "pin": pin
            }
            const reCallCharge = await flw.Charge.card(payload2)
 
            const callValidate = await flw.Charge.validate({
                "otp": otp,
                "flw_ref": reCallCharge.data.flw_ref
            })
            console.log(callValidate)
 
        }
        if (response.meta.authorization.mode === 'redirect') {
 
            var url = response.meta.authorization.redirect
            open(url)
        }
 
        console.log(response)
        
        res.status(201).json({
            message: 'Payment initiated',
            data: response
        })
        
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}
 
chargeCard();
}
}

export default CardController;
