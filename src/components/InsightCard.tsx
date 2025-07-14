
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Brain, CheckCircle } from "lucide-react";

interface InsightItem {
  name: string;
  type: 'bias' | 'model' | 'framework';
  description?: string;
}

interface InsightCardProps {
  title: string;
  items: InsightItem[];
  icon: 'eye' | 'brain' | 'check';
}

export const InsightCard = ({ title, items, icon }: InsightCardProps) => {
  const getIcon = () => {
    switch (icon) {
      case 'eye':
        return <Eye className="h-5 w-5" />;
      case 'brain':
        return <Brain className="h-5 w-5" />;
      case 'check':
        return <CheckCircle className="h-5 w-5" />;
    }
  };

  const getDotColor = (type: string) => {
    switch (type) {
      case 'bias':
        return 'bg-orange-500';
      case 'model':
        return 'bg-blue-500';
      case 'framework':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          {getIcon()}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className={`w-2 h-2 rounded-full mt-2 ${getDotColor(item.type)}`} />
              <div className="flex-1">
                <span className="font-medium text-gray-900">{item.name}</span>
                {item.description && (
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
