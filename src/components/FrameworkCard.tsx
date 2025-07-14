
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface FrameworkCardProps {
  name: string;
  content: {
    pros?: string[];
    cons?: string[];
    criteria?: { name: string; score: number }[];
    steps?: string[];
  };
}

export const FrameworkCard = ({ name, content }: FrameworkCardProps) => {
  const renderProsConsMatrix = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h4 className="font-semibold text-green-700 mb-3">Pros</h4>
        <ul className="space-y-2">
          {content.pros?.map((pro, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
              <span className="text-gray-700">{pro}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-semibold text-red-700 mb-3">Cons</h4>
        <ul className="space-y-2">
          {content.cons?.map((con, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
              <span className="text-gray-700">{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const renderCriteriaMatrix = () => (
    <div className="space-y-3">
      {content.criteria?.map((criterion, index) => (
        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="font-medium text-gray-900">{criterion.name}</span>
          <div className="flex items-center gap-2">
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full" 
                style={{ width: `${criterion.score * 10}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-600">{criterion.score}/10</span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderStepsList = () => (
    <ol className="space-y-2">
      {content.steps?.map((step, index) => (
        <li key={index} className="flex items-start gap-3">
          <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
            {index + 1}
          </div>
          <span className="text-gray-700">{step}</span>
        </li>
      ))}
    </ol>
  );

  const renderContent = () => {
    if (content.pros || content.cons) return renderProsConsMatrix();
    if (content.criteria) return renderCriteriaMatrix();
    if (content.steps) return renderStepsList();
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <CheckCircle className="h-5 w-5 text-green-600" />
          Generated Framework
        </CardTitle>
        <p className="text-lg font-semibold text-gray-900">{name}</p>
      </CardHeader>
      <CardContent>
        {renderContent()}
      </CardContent>
    </Card>
  );
};
