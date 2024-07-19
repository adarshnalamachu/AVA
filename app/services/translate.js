import { apiClient, backendurl } from "./apiClient";

const aep= backendurl

export const translateapis = {

     text_to_english : async (text) => {
         return await apiClient.post(aep + "/text-to-english",{} ,{
             params : {text:text} 
         })
     },

     text_to_text : async (targetLanguage, text) => {
        return await apiClient.get(aep + "/text-to-text",{
            params : {targetLanguage:targetLanguage,text:text} 
        })
    },
}