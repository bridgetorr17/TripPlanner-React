import mailjet from 'node-mailjet';

const sendEmail = async (
    sender, 
    senderName,
    receiver,
    receiverName,
    subject,
    text,
    html) => {

    console.log('called sendEmail with receiver: ', receiver)
    
    const mj = mailjet.apiConnect(
        process.env.MJ_APIKEY_PUBLIC,
        process.env.MJ_APIKEY_PRIVATE
    );

    try{
        const request = await mj.post('send', {version: 'v3.1'}).request({
            Messages: [
                {
                    From: { Email: sender, Name: senderName },
                    To: [{ Email: receiver, Name: receiverName }],
                    Subject: subject,
                    TextPart: text,
                    HTMLPart: html
                }
            ]
        });

        console.log('Mailject response body: ', request.body);
        return request;
    }
    catch(err){
        console.error('Mailjet error: ', err)
        throw err;
    }
}

export { sendEmail }