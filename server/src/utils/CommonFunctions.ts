import jwt from 'jsonwebtoken';

export const generateToken = (data: string, expiration: string) => {
    const expirationDate = new Date();

    const unit = expiration.slice(-1);
    const amount = parseInt(expiration.slice(0, -1), 10);

    switch (unit) {
        case 's': // seconds
            expirationDate.setSeconds(expirationDate.getSeconds() + amount);
            break;
        case 'm': // minutes
            expirationDate.setMinutes(expirationDate.getMinutes() + amount);
            break;
        case 'h': // hours
            expirationDate.setHours(expirationDate.getHours() + amount);
            break;
        case 'd': // days
            expirationDate.setDate(expirationDate.getDate() + amount);
            break;
        default:
            throw new Error('Invalid expiration format');
    }

    return jwt.sign({ data, expirationDate }, process.env.JWT_SECRET as string);
};
