import nodemailer from 'nodemailer';
class Email {
    enviar(para, asunto, cuerpoMensaje, pathArchivoAdjunto) {
        return new Promise((resolve, reject) => {
            var transporter = nodemailer.createTransport({
                host: 'smtp.mail.gmail.com',
                port: 465,
                service: 'gmail',
                secure: false,
                auth: {
                    user: 'agendinort@gmail.com',
                    pass: 'Agendin#ort2022'
                },
                debug: false,
                logger: true
            });
            const mailOptions = {
                from: 'agendinort@gmail.com',
                to: para,
                subject: asunto,
                text: cuerpoMensaje,
                attachments: [{ path: pathArchivoAdjunto }]
            };
            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    throw err;
                }
                else {
                    console.log(info);
                }
            });
        });
    }
}
export { Email };
