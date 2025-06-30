import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import supabase from "../supabaseClient";


export const Widget = ({ projectId}) => {
    const [rating, SetRating] = useState(3);
    const [submitted, SetSubmitted] = useState(false);

    const onSelectStar = (index) => {
        SetRating(index+1);
    };

    const submit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const data = {
            p_project_id: projectId,
            p_user_name: form.name.value,
            p_user_email: form.email.value,
            p_message: form.feedback.value,
            rating,
        };
        const { data: returnedData, error} = await supabase.rpc("add_feedback", data);
        SetSubmitted(true);
    }


    return (
    <div className="widget fixed bottom-8 right-8 z-50">
        <Popover>
            <PopoverTrigger asChild>
    <Button className="rounded-full shadow-lg hover:scale-105">
        <MessageIcon className="mr-2 w-5 h-5"/>
        Feedback</Button>
    </PopoverTrigger>
    <PopoverContent className="widget mr-10 rounded-lg shadow-lg w-full bg-card max-w-md p-4">
        { submitted ? (<div>
        <h3 className="text-lg font-bold">Thank you for your doggie feedback</h3>
        <p className="mt-4">We appreciate your doggie feedback. It helps us improve doggie products</p>
    </div>) :
    <div>
        <h3 className="text-lg font-bold">Send us doggie feedback</h3>
        <form className="space-y-2" onSubmit={submit}>
            <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label className="block text-center w-full" htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter doggie's name"/>
            </div>
            <div className="space-y-2">
                <Label className="block text-center w-full" htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter doggie's email"/>
            </div>
            </div>
            <div className="space-y-2">
                <Label className="block text-center w-full" htmlFor="feedback">Feedback</Label>
                <Textarea 
                className="min-h-[100px]"
                id="feedback" placeholder="Tell us about the doggie"/>
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
            <Button type="submit">Submit</Button>
            </div>
        </form>
    </div>
}
    </PopoverContent>
    </Popover>
    </div>
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