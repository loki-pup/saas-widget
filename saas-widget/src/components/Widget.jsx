import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState, useRef } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover"
import supabase from "../supabaseClient";
import tailwindStyles from "../index.css?inline";

export const Widget = ({ projectId}) => {
    const [rating, SetRating] = useState(3);
    const [submitted, SetSubmitted] = useState(false);

    const [imageBase64, SetImageBase64] = useState(null);
    const [imageName, SetImageName] = useState(null);
    const fileInputRef = useRef(null); 

    const onSelectStar = (index) => {
        SetRating(index+1);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                SetImageBase64(reader.result);
                SetImageName(file.name);
            };
            reader.readAsDataURL(file);
        }
    }


    const submit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const data = {
            p_project_id: projectId,
            p_user_name: form.name.value,
            p_user_email: form.email.value,
            p_message: form.feedback.value,
            p_rating: rating,
            p_photo_base64: imageBase64,
            p_photo_name: imageName,
        };
        SetSubmitted(true);
        const { data: returnedData, error} = await supabase.rpc("add_feedback", data);       
    }


    return (
        <>
<style>{tailwindStyles}</style>
    <div className="widget tw-preflight ">
        <div className="fixed bottom-8 sm:right-8 right-4 z-50">
        <Popover>
            <PopoverTrigger asChild>
    <Button className="rounded-full shadow-lg hover:scale-105">
        <MessageIcon className="mr-2 w-5 h-5"/>
        Feedback</Button>
    </PopoverTrigger>
    <PopoverContent 
    className="widget tw-preflight">
         <style>{tailwindStyles}</style>   
         <div className=" sm:mr-10 mr-1 sm:shadow-lg rounded-lg border border-gray-300   w-full bg-card sm:p-4 p-3 sm:max-w-md max-w-[90vw]">
        { submitted ? (<div>
        <h3 className="text-center text-lg font-bold">Thank you for your doggie feedback</h3>
        <p className="text-left items-center mt-2">We appreciate your doggie feedback. It helps us improve doggie products</p>
    </div>) :
    <div>
        <h3 className="text-center text-lg font-bold mb-3">Send us doggie feedback</h3>
        <form className="space-y-3" onSubmit={submit}>
            <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
                <Label 
                className="block text-center w-full" htmlFor="name">Name</Label>
                <Input 
                id="name" placeholder="doggie's name"/>
            </div>
            <div className="space-y-3">
                <Label 
                className="block text-center w-full" htmlFor="email">Email</Label>
                <Input 
                id="email" type="email" placeholder="doggie's email"/>
            </div>
            </div>
            <div className="space-y-3">
                <Label 
                className="block text-center w-full" htmlFor="feedback">Feedback</Label>
                <Textarea 
                className="min-h-[100px]"
                id="feedback" placeholder="Tell us about the doggie"/>
            </div>

            <div className="space-y-3">
                <Label className="block text-center w-full">
                    Upload doggie photo</Label>
                <Input id="photo" name="photo" type="file" accept="image/*" 
                onChange={handleFileChange} ref={fileInputRef} />   
                {imageBase64 && (<img src={imageBase64} alt="doggie photo"
                className="mx-auto h-32 object-contain"/>)}
            </div>


            <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                {[...Array(5)].map((_, index) => (
                    <StarIcon key={index} 
                    className={`h-5 w-5 cursor-pointer 
                        ${rating > index ? "fill-primary" : "fill-muted stroke-muted-foreground"}`}
                    onClick = {() => onSelectStar(index)}    
                        />
                ))}
            </div>
            <Button 
            type="submit">Submit</Button>
            </div>
        </form>
    </div>
}
</div>
    </PopoverContent>
    </Popover>
    </div>
    </div>
    </>
    );
};




function StarIcon(props) {
    return (
    <svg
    {...props} 
    xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
    viewBox="0 0 24 24" fill="none" stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    >
        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>

    );
}


function MessageIcon(props) {
    return (
        <svg 
        {...props}
        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle-icon lucide-message-circle"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
    );
}

//test