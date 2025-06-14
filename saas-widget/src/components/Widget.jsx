import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export const Widget = () => {
    return (
    <div className="fixed bottom-8 right-8 z-50">
    <Button className="rounded-full shadow-lg hover:scale-105">Feedback</Button>
    <div>
        <h3>Send us doggie feedback</h3>
        <form>
            <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter doggie's name"/>
            </div>
        </form>
    </div>
    </div>
    );
};