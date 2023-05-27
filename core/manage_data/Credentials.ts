import {readFileSync} from "fs";
export default class Credentials{
    static async getDataUser(userInfo='defaultUser'){
        const path=`${process.cwd()}\\core\\manage_data\\credentials.json`;
        return (JSON.parse(readFileSync(path, 'utf-8')))[userInfo];
    }
}