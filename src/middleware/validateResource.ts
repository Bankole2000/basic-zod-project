import {Request, Response, NextFunction} from 'express'
import {AnyZodObject} from 'zod';
import logger from '../utils/logger';

const validate = (schema: AnyZodObject, schemaName: string) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({
      body: req.body, 
      query: req.query, 
      params: req.params
    })
    logger.info(`✅ ${schemaName} Input is valid`)
    next()
  } catch (error: any) {
    console.log({error})
    return res.status(400).send({message: "Invalid Date",  succes: false, error: error.errors})
  }
}

export default validate;