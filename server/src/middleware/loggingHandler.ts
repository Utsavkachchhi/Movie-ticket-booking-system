import { Request, Response, NextFunction } from 'express';

export function loggingFunction (req:Request,res:Response,next:NextFunction) {
    console.info(`Incoming - Method: [${req.method}], URL: [${req.url}], IP: [${req.socket.remoteAddress}]`)

    res.on('finish',() => {
    console.info(`Incoming - Method: [${req.method}], URL: [${req.url}], IP: [${req.socket.remoteAddress}], Status: [${res.statusCode}]`)
    })

    next()
}