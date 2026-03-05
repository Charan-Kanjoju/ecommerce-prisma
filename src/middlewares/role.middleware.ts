export const authorize = (...roles: string[]) => {
  return (req: any, res: any, next: any) => {
    if (!roles.includes(req.user.role)){
      console.log(req.user.role)
      return res.status(403).json({ message: req.user.role + " role is not authorized to access this resource" });
    }
    next();
  };
};