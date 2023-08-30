'use server';

import {Resend} from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);




export const sendEmail = async(data:FormData) => {

    const message = data.get('message') as string;
    const subject = data.get('subject') as string;
    const receiver = data.get('receiver') as string
    const sender = data.get('sender') as string

    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: receiver,
        subject: subject,
        html: message,
        reply_to:sender,
    })
}