const adminAuth = (req,res,next) => {
  const {adminToken} = req.body;
  if(!adminToken){
    return res.status(401).json({error:"Please provide a adminToken."})
  }
  else{
    if(adminToken.toString() === process.env.ADMIN_TOKEN){
      req.admin = true;
      next();
    }else{
      return res.status(401).json({error:"Please provide a valid adminToken."})
    }
  }
}
module.exports = {adminAuth};