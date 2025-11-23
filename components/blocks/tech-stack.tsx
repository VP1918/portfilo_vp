import { Badge } from "@/components/ui/badge";

export const TechStackBlock = () => {
    return (
        <div className="flex flex-col gap-8 h-full w-full justify-center p-4">
            <div>
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">
                    Comfortable with
                </h3>
                <div className="flex flex-wrap gap-3">
                    {["Python", "TypeScript", "Next.js", "FastAPI", "Java"].map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-sm px-4 py-1.5 rounded-full bg-secondary/50 hover:bg-secondary hover:scale-105 transition-all duration-300 cursor-default border-transparent hover:border-primary/20">
                            {tech}
                        </Badge>
                    ))}
                </div>
            </div>
            <div>
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">
                    Learning
                </h3>
                <div className="flex flex-wrap gap-3">
                    {["Rust", "CUDA"].map((tech) => (
                        <Badge key={tech} variant="outline" className="text-sm px-4 py-1.5 rounded-full border-dashed border-muted-foreground/50 hover:border-primary hover:text-primary transition-colors duration-300 cursor-default">
                            {tech}
                        </Badge>
                    ))}
                </div>
            </div>
        </div>
    );
};
