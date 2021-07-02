import Flutterwave from 'flutterwave-node-v3';

class MomoPayController {
    static InitiatePayment(req, res) {
        const { amount, email, phoneNumber, fullName  } = req.body;
        const flw = new Flutterwave('FLWPUBK-a6a1690036797707c7df7b1eb382e497-X', 'FLWSECK-a50592699fb6d93a80e69ac31b659dae-X'  );
 
 
    const rw_mobile_money =  async () =>{
 
    try {

        const randomNumber = (min, max) => {
            return Math.floor(
                Math.random() * (max - min) + min
            )
        }

        const randomNumber1 = (min, max) => {
            return Math.floor(
                Math.random() * (max - min) + min
            )
        }

        const txRef = randomNumber(111111, 999999);
        const orderId = randomNumber1(111111, 999999);

        const payload = {
            "tx_ref": `MC-${txRef}`, //This is a unique reference, unique to the particular transaction being carried out. It is generated when it is not provided by the merchant for every transaction.
            "order_id": `USS_URG_${orderId}`, //Unique ref for the mobilemoney transaction to be provided by the merchant
            "amount": amount,
            "currency": "RWF",
            "email": email,
            "phone_number": phoneNumber,
            "fullname": fullName
        }
 
       const response =  await flw.MobileMoney.rwanda(payload)
       console.log(response);
       res.status(201).json({
        status: 201,
        data: response
       })
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }                            
   
    }
        rw_mobile_money();

    }
}


export default MomoPayController;
