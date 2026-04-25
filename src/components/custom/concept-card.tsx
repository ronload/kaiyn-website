import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ConceptCardProps = {
  title: string;
  description: string;
  className?: string;
};

export function ConceptCard({
  title,
  description,
  className,
}: ConceptCardProps) {
  return (
    <Card
      size="sm"
      className={cn(
        "w-64 shrink-0 gap-2 rounded-2xl bg-white/5 py-3 ring-0 backdrop-blur-md",
        "[border:1px_solid_rgba(255,255,255,.1)]",
        "[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
        className,
      )}
    >
      <CardHeader>
        <CardTitle className="text-sm text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 text-white/60 text-xs leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
