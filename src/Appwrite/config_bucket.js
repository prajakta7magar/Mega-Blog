import conf from "../Conf/conf.js";  // For accessing conf.appwriteUrl and conf.appwriteProjectId
import { ID, Client, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, featuredImage, content, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug, // Document ID
        { title, featuredImage, content, status, userId }
      );
    } catch (error) {
      console.error("Appwrite Service::createPost::error", error);
    }
  }

  async updatePost(slug, { title, featuredImage, content, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug, // Document ID
        { title, featuredImage, content, status }
      );
    } catch (error) {
      console.error("Appwrite Service::updatePost::error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.error("Appwrite Service::deletePost::error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      console.log("Fetching post with slug:", slug);
      console.log("Database ID:", conf.appwriteDatabaseId);
      console.log("Collection ID:", conf.appwriteCollectionId);
  
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug // Ensure this is the document ID
      );
    } catch (error) {
      console.error("Appwrite Service::getPost::error", error.message);
      if (error.response) {
        console.error("Error details:", error.response);
      }
      throw error; // Re-throw to handle it higher up if needed
    }
  }
  

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.error("Appwrite Service::getPosts::error", error);
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error("Appwrite Service::uploadFile::error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.error("Appwrite Service::deleteFile::error", error);
      return false;
    }
  }

  async getFilePreview(fileId) {
    try {
      return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.error("Appwrite Service::getFilePreview::error", error);
    }
  }
}

const service = new Service(); // Instantiate the service

export default service;
