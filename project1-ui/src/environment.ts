export let lbBaseUrl:string

if(process.env['NODE_ENV'] === 'production'){
    lbBaseUrl = 'http://instaBytes.innaconnection.com'
}else {
    lbBaseUrl = 'http://localhost:8070/user-service'
}
