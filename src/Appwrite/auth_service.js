import conf from "../Conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);

        console.log("Appwrite initialized with:", conf.appwriteUrl, conf.appwriteProjectId); // Debugging
    }

    async createAccount({ email, password, name }) {
        try {
            // No need to manually generate a user ID
            const userAccount = await this.account.create(email, password, name); // Let Appwrite handle user ID
            console.log("User account response:", userAccount); // Debugging
    
            if (userAccount) {
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            console.error("Error creating account:", error);
            throw error;
        }
    }
    
    async login({ email, password }) {
        try {
            const session = await this.account.createSession(email, password); // Use this.account
            console.log("Session created:", session);

            // Fetch user immediately after login
            const user = await this.account.get();
            console.log("Logged-in user:", user);

            return user;
        } catch (error) {
            console.error("Login failed:", error.message);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const user = await this.account.get();
            console.log("Authenticated user:", user);
            return user;
        } catch (error) {
            console.error("User is not logged in:", error);
            return null; // Return null instead of throwing an error
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
            console.log("User logged out successfully.");
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}

const authService = new AuthService();
export default authService;
