import { Category } from "./../types/Category";
import { Blog } from "@/types/Blog";
import { createClient, groq } from "next-sanity";
import clientConfig from "./config/client-config";

// fetching the data from sanity
//  data for home page
export async function getBlogs(): Promise<Blog[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "project"]{
            _id,
            _createdAt,
            title,
            description,
            author -> {name, "image": image.asset->url, "slug": slug.current, "bio": bio},
            
            // loop through all the entries in categories and return the title from the referenced document
            "categories": categories[]->title, 
            publichedAt,
            "slug": slug.current,
            "image": image.asset->url,
            content
        }`
  );
}
//  data for individual blog page
export async function getBlog(slug: string): Promise<Blog> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "project" && slug.current == $slug][0]{
            _id,
            _createdAt,
            title,
            description,
            author -> {name, "image": image.asset->url, "slug": slug.current, "bio": bio},
            "categories": categories[]->title, 
            publichedAt, 
            "slug": slug.current,
            "image": image.asset->url,
            content
        }`,
    { slug }
  );
}
// fetch all categories data
export async function getCategories(): Promise<Category[]> {
  return createClient(clientConfig).fetch(
    // groq`*[_type == "category"]{
    //         _id,
    //         title,
    //         description,
    //     }`
    groq`*[_type == 'category']{
      title,
     'id':*[defined(categories) && _type == 'project' && references(^._id)][0]{_id},
     description,
    }[defined(id)]`
  );
}
// Blockchain Blog Filter
export async function getFilterBlockchainBlogs(): Promise<Blog[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == 'project' && categories[]->title match "Blockchain"]{
      _id,
      _createdAt,
      title,
      description,
      author -> {name, "authorImage": image.asset->url},
      
      // loop through all the entries in categories and return the title from the referenced document
      "categories": categories[]->title, 
      publichedAt,
      "slug": slug.current,
      "image": image.asset->url,
      content}`
  );
}
// Market Blog Filter
export async function getFilterMarketBlogs(): Promise<Blog[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == 'project' && categories[]->title match "Market"]{
      _id,
      _createdAt,
      title,
      description,
      author -> {name, "authorImage": image.asset->url},
      
      // loop through all the entries in categories and return the title from the referenced document
      "categories": categories[]->title, 
      publichedAt,
      "slug": slug.current,
      "image": image.asset->url,
      content}`
  );
}

// AI/ML Blog Filter
export async function getFilterAIBlogs(): Promise<Blog[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == 'project' && categories[]->title match "AI/ML"]{
      _id,
      _createdAt,
      title,
      description,
      author -> {name, "image": image.asset->url, slug, bio},
      
      // loop through all the entries in categories and return the title from the referenced document
      "categories": categories[]->title, 
      publichedAt,
      "slug": slug.current,
      "image": image.asset->url,
      content}`
  );
}
// Metaverse Blog Filter
export async function getFilterMetaverseBlogs(): Promise<Blog[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == 'project' && categories[]->title match "Metaverse"]{
      _id,
      _createdAt,
      title,
      description,
      author -> {name, "authorImage": image.asset->url},
      
      // loop through all the entries in categories and return the title from the referenced document
      "categories": categories[]->title, 
      publichedAt,
      "slug": slug.current,
      "image": image.asset->url,
      content}`
  );
}

// Filtered Blogs
export async function getFilteredBlogs(categoryTitle: string): Promise<Blog[]> {
  console.log(categoryTitle);
  return createClient(clientConfig).fetch(
    groq`*[_type == 'project' && categories[]->title match ${categoryTitle}]{
      _id,
      _createdAt,
      title,
      description,
      author -> {name, "authorImage": image.asset->url},
      
      // loop through all the entries in categories and return the title from the referenced document
      "categories": categories[]->title, 
      publichedAt,
      "slug": slug.current,
      "image": image.asset->url,
      content}`
  );
}
