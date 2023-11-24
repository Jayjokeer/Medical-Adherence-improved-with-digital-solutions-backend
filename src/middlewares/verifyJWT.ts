import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../interface/IaunthenticatedUser';

export const authenticatePatient = (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction,
) => {
	const token = req.headers.authorization?.split(' ')[1]

	if (!token) {
		return res.status(401).json({Error:"Please Login"});
    };
	try {
		const decoded: any = jwt.verify(token, process.env.JWT_SECRET || '')
		req.user = decoded
		if(req.user.role === "patient"){
			next();
		}else{
			return res.status(401).json({Error:"You are unauthorized"});
		}
		
	} catch (error) {
		return res.status(401).json({Error:"Internal server error",error});
	}
};

export const authenticateHProvider=  (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction,
) => {
	const token = req.headers.authorization?.split(' ')[1]

	if (!token) {
		return res.status(401).json({Error:"Please Login"});
    };
	try {
		const decoded: any = jwt.verify(token, process.env.JWT_SECRET|| '')
		req.user = decoded
		if(req.user.role === "Doctor"){
			next();
		}else{
			return res.status(401).json({Error:"You are unauthorized"});
		}
		
	} catch (error) {
		return res.status(401).json({Error:"Internal server error",error});
	}
};
 