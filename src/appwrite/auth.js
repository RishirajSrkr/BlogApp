import conf from '../conf/conf.js'
import { Client, Account, ID } from 'appwrite'

//this is a class
export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }


    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                //call another method
                return this.login({ email, password })
            }
            else {
                return userAccount;
            }
        }
        catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        }
        catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }
        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }

}

//this is a object of the above class
const authService = new AuthService();

//exporting the object
export default authService



//so what ever method I define inside this class, can be accessed anywhere by simply importing this object and then to access the method, we have to do object.method

//so we used constructor, whenever an object is created the construcor gets called, it is used to set the initial values of the object attributes 