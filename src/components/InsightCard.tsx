
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Brain, CheckCircle, ExternalLink } from "lucide-react";

interface InsightItem {
  name: string;
  type: 'bias' | 'model' | 'framework';
  description?: string;
  snippet?: string;
  recommendedModels?: string[];
}

interface InsightCardProps {
  title: string;
  items: InsightItem[];
  icon: 'eye' | 'brain' | 'check';
  onSnippetClick?: (snippet: string) => void;
  onModelClick?: (modelName: string) => void;
  highlightedModel?: string;
}

export const InsightCard = ({ title, items, icon, onSnippetClick, onModelClick, highlightedModel }: InsightCardProps) => {
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
            <li 
              key={index} 
              id={item.type === 'model' ? `model-${item.name.replace(/\s+/g, '-').toLowerCase()}` : undefined}
              className={`flex items-start gap-3 p-2 rounded transition-colors duration-300 ${
                highlightedModel === item.name ? 'bg-blue-50 border border-blue-200' : ''
              }`}
            >
              <div className={`w-2 h-2 rounded-full mt-2 ${getDotColor(item.type)}`} />
              <div className="flex-1">
                <span className="font-medium text-gray-900">{item.name}</span>
                {item.description && (
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                )}
                
                {/* Show recommended mental models for biases */}
                {item.recommendedModels && onModelClick && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-1">To counter this, consider:</p>
                    <div className="flex flex-wrap gap-1">
                      {item.recommendedModels.map((model, modelIndex) => (
                        <Button
                          key={modelIndex}
                          variant="outline"
                          size="sm"
                          onClick={() => onModelClick(model)}
                          className="h-6 px-2 text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50 border-blue-200"
                        >
                          {model}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {item.snippet && onSnippetClick && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-1">Example from meeting:</p>
                    <div className="bg-gray-50 p-2 rounded text-xs text-gray-700 italic border border-gray-200">
                      "{item.snippet}"
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onSnippetClick(item.snippet!)}
                      className="mt-1 h-6 px-2 text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View in Transcript
                    </Button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
