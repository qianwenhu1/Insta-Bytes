export let lbBaseUrl:string

if(process.env['NODE_ENV'] === 'production'){
    lbBaseUrl = 'http://app-service.innaconnection.com/user-service'
}else {
    lbBaseUrl = 'http://localhost:8070/user-service'
}
