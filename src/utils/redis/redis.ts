import {createClient} from 'redis'

let client=createClient();
export const redFun=()=>{

    
    client.connect().then(()=>{
        console.log("Redis Connected")
    });

}
export default client