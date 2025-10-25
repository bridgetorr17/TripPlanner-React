import Mailjet from 'node-mailjet';

const sendEmail = async (sender: string, senderName: string, receiver: string, receiverName: string, subject: string, text: string, html: string) => {

    const publicKey = process.env.MJ_APIKEY_PUBLIC as string;
    const privateKey = process.env.MJ_APIKEY_PRIVATE as string;

    if (!publicKey || !privateKey) {
        throw new Error ('Mailjet API keys are not set as environment variables')
    }

    const mj = Mailjet.default.apiConnect(
        publicKey,
        privateKey
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

        return request;
    }
    catch(err){
        console.error('Mailjet error: ', err)
        throw err;
    }
}

export { sendEmail }