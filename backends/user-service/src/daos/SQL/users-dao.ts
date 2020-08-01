import { PoolClient, QueryResult } from "pg";
import { connectionPool } from ".";
import { UserDTOtoUserConvertor } from "../../utils/userDTO-to-user-convertor";
import { UserNotFoundError } from "../../errors/UserNotFoundError";
import { User } from "../../models/User";
import { BadCredentialsError } from "../../errors/BadCredentialsError";
import { NewUserInputError } from "../../errors/NewUserInputError";
import { logger, errorLogger } from "../../utils/loggers";

const schema = process.env['LB_SCHEMA'] || 'instabytes_user_service'

export async function getAllUsers():Promise<User[]>{
    let client:PoolClient;
    try{
        client = await connectionPool.connect()
        let results:QueryResult = await client.query(`select u.user_id, 
        u.username , 
        u."password" , 
        u.first_name, 
        u.last_name, 
        u.email , 
        r.role_id, 
        r."role",
        u."image",
        u."favorite_food",
        u."city" from ${schema}.users u left join ${schema}.roles r on u."role" = r.role_id;`)
        return results.rows.map(UserDTOtoUserConvertor);
    }
    catch(e){
        logger.error(e)
        errorLogger.error(e)
        throw new Error('Unhandeled Error Occured')
    }
    finally{
        client && client.release();
    }
}

export async function getUserById(id: number):Promise<User>{
    let client:PoolClient;
    
    try{
        client = await connectionPool.connect()
        let results:QueryResult = await client.query(`select u.user_id, 
        u.username , 
        u."password",
        u.first_name,
        u.last_name, 
        u.email ,
        r.role_id , 
        r."role",
        u."image",
        u."favorite_food",
        u."city" 
        from ${schema}.users u left join ${schema}.roles r on u."role" = r.role_id 
        where u.user_id = $1;`,
        [id])
        if(results.rowCount === 0){
            throw new Error('User Not Found')
        }
        return UserDTOtoUserConvertor(results.rows[0])
    } catch(e){
        if(e.message === 'User Not Found'){
            throw new UserNotFoundError()
        }
        logger.error(e)
        errorLogger.error(e)
        throw new Error('Unhandled Error Occured')
    } finally {
        client && client.release()
    }
}

export async function patchUser(user:User):Promise<User>{
    let client:PoolClient;
    try{
        client = await connectionPool.connect()
        await client.query('BEGIN;')

        //check if the user to update exists
        let userId = await client.query(`select u.user_id from ${schema}.users u 
        where u.user_id = $1`, [user.userId])

        if(userId.rowCount === 0){
            throw new Error('User Not Found.')
        }
        userId = userId.rows[0].user_id

        if(user.username){
            await client.query(`update ${schema}.users 
            set "username" = $1 where user_id = $2;`,[user.username, userId])
        }
        if(user.password){
            await client.query(`update ${schema}.users 
            set "password" = $1 where user_id = $2;`,[user.password, userId])
        }
        if(user.firstName){
            await client.query(`update ${schema}.users 
            set "first_name" = $1 where user_id = $2;`,[user.firstName, userId])
        }
        if(user.lastName){
            await client.query(`update ${schema}.users 
            set "last_name" = $1 where user_id = $2;`,[user.lastName, userId])
        }
        if(user.email){
            await client.query(`update ${schema}.users 
            set "email" = $1 where user_id = $2;`,[user.email, userId])
        }
        // if(user.role != undefined){
        //     console.log("in the role")
        //     let roleId = await client.query('select r.role_id from user_reimbursement.roles r where r.role = $1', [user.role])
            
        //     if(roleId.rowCount === 0){
        //         throw new Error('Role Not Found.')
        //     }
        //     roleId = roleId.rows[0].role_id

        //     let updateResults = await client.query(`update user_reimbursement.users 
        //     set "role" = $1 where user_id = $2;`,[roleId, userId])
        //     console.log(updateResults.rows[0])
        // }
        if(user.image){
            await client.query(`update ${schema}.users 
            set "image" = $1 where user_id = $2;`,[user.image, userId])
        }

        if(user.favoriteFood){
            await client.query(`update ${schema}.users 
            set "favorite_food" = $1 where user_id = $2;`,[user.favoriteFood, userId])
        }

        if(user.city){
            await client.query(`update ${schema}.users 
            set "city" = $1 where user_id = $2;`,[user.city, userId])
        }

        let result:QueryResult = await client.query(`select u.user_id, 
        u.username , 
        u."password",
        u.first_name,
        u.last_name, 
        u.email ,
        r.role_id , 
        r."role",
        u."image",
        u."favorite_food",
        u."city" 
        from ${schema}.users u left join ${schema}.roles r on u."role" = r.role_id 
        where u.user_id = $1;`,
        [userId])
        await client.query('COMMIT;')
        logger.debug(`Here is the modifed user ${result.rows[0]}`)
        return UserDTOtoUserConvertor(result.rows[0])
    }
    catch(e){
        client && client.query('ROLLBACK;')
        if(e.message === 'User Not Found'){
            throw new UserNotFoundError()
        }
        if(e.message === 'Role Not Found'){
            throw new Error('Rollback Error')
        }
        logger.error(e)
        errorLogger.error(e)
        throw new Error('Unhandled Error Occured')
    }
    finally{
        client && client.release()
    }
}

export async function getUsernameAndPassword(username:string, password:string):Promise<User>{
    let client: PoolClient
    try{
        client = await connectionPool.connect()
        let results = await client.query(`select u.user_id, 
        u.username, 
        u."password", 
        u.first_name, 
        u.last_name, 
        u.email , 
        r.role_id , 
        r."role",
        u."image",
        u."favorite_food",
        u."city"
        from ${schema}.users u left join ${schema}.roles r on u."role" = r.role_id
        where u.username = $1 and u.password = $2;`,[username, password])
        if(results.rowCount === 0 ){
            throw new Error('User Not Found')
        }
        return UserDTOtoUserConvertor(results.rows[0])
    }
    catch(e){
        if(e.message === 'User Not Found'){
            throw new BadCredentialsError()
        }
        logger.error(e)
        errorLogger.error(e)
        throw new Error('Unhandled Error Occured')
    }
    finally{
        client && client.release()
    }
}

export async function saveNewUser(newUser:User):Promise<User>{
    let client:PoolClient
    try{
        client = await connectionPool.connect()
        await client.query('BEGIN;')

        // let usernameCheck = await client.query('select count(*) from user_reimbursement.users u where u.username = $1', [newUser.username])

        // // if(usernameCheck !== 0){
        // //     throw new Error('Username Already Exists')
        // // }
        // console.log(usernameCheck)

        // let roleId = await client.query('select r.role_id from user_reimbursement.roles r where r.role = $1', [newUser.role])
            
        // if(roleId.rowCount === 0){
        //     throw new Error('Role Not Found.')
        // }
        // roleId = roleId.rows[0].role_id

        let roleId = 3 

        let results = await client.query(` insert into ${schema}.users
        ("username", "password", "first_name", "last_name", "email", "role", "image", "favorite_food", "city")
        values($1,$2,$3,$4,$5,$6,$7,$8,$9) returning "user_id";`, 
        [newUser.username, newUser.password, newUser.firstName, newUser.lastName, newUser.email, roleId, newUser.image, newUser.favoriteFood, newUser.city])
        
        newUser.userId = results.rows[0].user_id
        await client.query('COMMIT;')
        logger.debug(`Save new user ${newUser}`)
        return newUser

    }catch(e){
        client && client.query('ROLLBACK;')
        if(e.message === 'Role Not Found'){
            throw new NewUserInputError()
        }
        logger.error(e)
        errorLogger.error(e)
        throw new Error('Unhandled Error Occured')
    }finally{
        client && client.release();
    }
}