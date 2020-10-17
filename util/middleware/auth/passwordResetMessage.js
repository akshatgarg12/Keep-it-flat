const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const createPasswordResetMessage = (token,email,res) =>{
  const msg = {
      to: email.toString(), // Change to your recipient
      from: 'akshatarungarg78@gmail.com', // Change to your verified sender
      subject: 'Password reset for KeepItFlat',
      text: `To proceed further with the password recovery, please copy this id:${token}`,
      html: `<strong>Keep it Flat</strong>
      <p>Token for password reset</p>
      <p>Please use the token below to re-create your password:</p>
      <strong>${token}</strong>
      <p>If its not you, ignore this mail.</p>
      `,
    }
    sgMail.send(msg).then(()=>{
      console.log('passwordReset email sent to ', email);
    }).catch(e => {
        console.log(e);
        return res.status(500).json({error:"error occured while sending email, try again later."});
    });
} 

module.exports = createPasswordResetMessage; 