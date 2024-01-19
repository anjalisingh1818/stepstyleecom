import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  try {
    const saltrou = 10;
    const hassedPassword = await bcrypt.hash(password, saltrou);
    return hassedPassword;
  } catch (err) {
    
  }
};
export const comparePassword = async (password, hashpass) => {
  try {
    return bcrypt.compare(password, hashpass);
  } catch (error) {
   
  }
};
