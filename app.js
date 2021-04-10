const toAddress = "example@mailsac.com"; // Mailsac email address where the email will be sent
const fromAddress = "web-application@mailsac.com"; // Address the email will be sent from
const smtpUserName = "web-application@mailsac.com"; // Username for smtp server authentication
const smtpPassword = ""; // Password for smtp server atuthentication
const smtpHost = "out.mailsac.com"; // hostname of the smtp server

window.onload = function (){
  document.querySelector('form').addEventListener('submit', handleSubmitForm)
}

function handleSubmitForm(e) {
  e.preventDefault();
  let email = document.querySelector('#email').value;
  Email.send({
    Host: smtpHost,
    Username: smtpUserName,
    Password: smtpPassword,
    To: toAddress,
    From: fromAddress,
    Subject: "Confirm your new example.com account",
    Body: "<body><a href='https://example.com'>Confirm your new account</a></body>"
  })
    .then( message => {
      const form = document.querySelector('form');
      const success = document.querySelector('#success');
      form.style.display = 'none';
      success.innerHTML = success.innerHTML + email;
      success.style.display = 'block';
    })
    .catch(err => alert(err))
}
