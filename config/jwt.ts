import { UserAttribute } from '../models/User';
const jwt = require('jsonwebtoken')

const secret = 'veryverysecret'

export function generateToken(user : UserAttribute) : string
{
    return jwt.sign(user, secret)
}

export function verifyToken(token : string | undefined) : UserAttribute | boolean
{
    if(token)
    {
        let user
        try {
            user = jwt.verify(token, secret)
        } catch(err)
        {
            return false
        }
        return user
    }
    return false
}