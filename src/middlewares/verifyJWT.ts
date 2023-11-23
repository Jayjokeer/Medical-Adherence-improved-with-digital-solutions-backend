import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../interface/IaunthenticatedUser';

export const authenticate = (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction,
) => {
	const token = req.headers.authorization?.split(' ')[1]

	if (!token) {
		return res.status(401).json({Error:"Please Login"});
    };
	try {
		const decoded: any = jwt.verify(token, process.env.JWT_KEY || '')
		req.user = decoded

		next()
	} catch (error) {
		return res.status(401).json({Error:"Internal server error",error});
	}
};

 