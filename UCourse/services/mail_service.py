from django.core.mail import send_mail, EmailMessage


def send_mail_with_attachments(subject, body, send_from, send_to, cc, attachments):
    email = EmailMessage(
        subject=subject,
        body=body,
        from_email=send_from,
        to=send_to,
        cc=cc,
    )
    for attachment in attachments:
        email.attach(filename=attachment.name, content=attachment.file.read(), mimetype='application/pdf')
    email.send()


def send_mail_with_attachment(subject, body, send_from, send_to, cc, attachment, filename=None):
    email = EmailMessage(
        subject=subject,
        body=body,
        from_email=send_from,
        to=send_to,
        cc=cc,
    )
    if filename:
        email.attach(filename=filename, content=attachment, mimetype='application/pdf')
    else:
        email.attach(filename=attachment.name, content=attachment, mimetype='application/pdf')
    email.send()
