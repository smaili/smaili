import smtplib
import email.utils
import re
from email.mime.text import MIMEText


def minify(html):
    html = html.replace("\r\n", "\n")
    html = html.replace("\n", "")
    html = re.sub(r"<p>\s+", "<p>", html)
    html = re.sub(r"\s+</p>", "</p>", html)
    html = re.sub(r">\s{2,}<", "><", html)
    html = re.sub(r"(>)\s{2,}(.)", r"\1 \2", html)

    # Original Version
    """
    html = html.replace("\r\n", "\n")
    html = html.replace("\r", "\n")
    html = html.replace("\n", " ")
    html = html.replace("  ", "")
    html = re.sub(r'>\s*<', '><', html)
    """

    return html


def mail(user_email, body):
    mail_from = 'no-reply@smaili.org'
    mail_to_admin = 'me@smaili.org'
    mail_subject = 'Contact Message'

    server = smtplib.SMTP('localhost', 25)
    server.set_debuglevel(True)

    try:
        msg = MIMEText(body, 'plain')
        msg['To'] = email.utils.formataddr(('Michael Smaili', mail_to_admin))
        msg['From'] = email.utils.formataddr(('No Reply', mail_from))
        msg['Subject'] = mail_subject
        msg.add_header('reply-to', user_email)
        server.sendmail(mail_from, [mail_to_admin], msg.as_string())
    finally:
        server.quit()
