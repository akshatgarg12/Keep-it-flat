const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const createVerificationMessage = (req,token,email,res) =>{
  const msg = {
      to: email.toString(), // Change to your recipient
      from: 'akshatarungarg78@gmail.com', // Change to your verified sender
      subject: 'Email Verification for KeepItFlat',
      text: `Thanks for becoming a part of family.The greatest asset you have is right mindset and a healthy body. Please confirm your email by clicking on the link, http://${req.headers.host}/user/verify-email/${token}`,
      html: `<strong>Keep it Flat</strong>
      <p>Thanks for joining this family!</p>
      <p>Please click on the Link below to verify your account.</p>
      <a href="http://${req.headers.host}/user/verify-email/${token}">Verify your account</a>
      <strong>If this account doesn't belong to you, write to akshatarungarg78@gmail.com immidiately and skip this process.</strong>
      `,
    }
    sgMail.send(msg).then(()=>{
      console.log('verification email sent to ', email);
    }).catch(e => {
      console.log(e)
      return res.status(500).json({error:"error occured while sending email, try again later."});
    });
} 


module.exports = createVerificationMessage; 