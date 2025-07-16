
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InsightCard } from "@/components/InsightCard";
import { FrameworkCard } from "@/components/FrameworkCard";
import { ArrowLeft, Calendar } from "lucide-react";

const mockDecisionData = {
  1: {
    title: "Q4 Product Strategy Direction",
    meetingDate: "January 15, 2025",
    summary: {
      total_blind_spots: 3,
      high_severity_count: 2,
      frameworks_recommended: 1,
      mental_models_recommended: 3
    },
    biases: [
      { 
        name: "Confirmation Bias", 
        type: "bias" as const,
        severity: "high" as const,
        description: "Found in meeting when team only discussed positive market research, ignoring competitive threats mentioned in uploaded competitor analysis document.",
        snippet: "I agree, the market research looks promising. We've seen similar products succeed.",
        recommendedModels: ["Inversion Thinking", "First Principles"]
      },
      { 
        name: "Optimism Bias", 
        type: "bias" as const,
        severity: "high" as const,
        description: "Detected when CEO stated '40% revenue increase' without discussing potential risks outlined in financial projections document.",
        snippet: "I think we can achieve a 40% revenue increase if we execute well.",
        recommendedModels: ["Inversion Thinking", "Systems Thinking"]
      },
      { 
        name: "Anchoring Bias", 
        type: "bias" as const,
        severity: "medium" as const,
        description: "Identified when discussion anchored on initial $2M budget figure from uploaded budget template, limiting exploration of alternatives.",
        snippet: "What about the budget? We're looking at about $2M investment.",
        recommendedModels: ["First Principles"]
      }
    ],
    mentalModels: [
      { 
        name: "Inversion Thinking", 
        type: "model" as const,
        description: "Think about what could go wrong first to identify potential pitfalls. This often involves exploring worst-case scenarios and systematically examining failure modes before committing to a decision.",
        process: "Develop best/worst/most likely scenarios"
      },
      { 
        name: "First Principles", 
        type: "model" as const,
        description: "Break down complex problems to their fundamental truths and build up solutions from basic components. This involves questioning assumptions and reasoning from foundational elements rather than analogy.",
        process: "Question core assumptions and build from foundational elements"
      },
      { 
        name: "Systems Thinking", 
        type: "model" as const,
        description: "Consider how different parts of the business will interact and affect each other with this decision. This involves understanding feedback loops, unintended consequences, and holistic impact across the organization.",
        process: "Map interconnections and feedback loops"
      }
    ],
    framework: {
      name: "Pros & Cons Matrix",
      description: "A structured decision-making tool that systematically lists positive and negative aspects of a choice.",
      why_recommended: "Addresses: Confirmation Bias, Optimism Bias",
      how_to_use: [
        "List all potential positive outcomes in the 'Pros' column",
        "List all potential negative outcomes in the 'Cons' column",
        "Compare the lists to inform your decision"
      ],
      content: {
        pros: [
          "Strong market demand for our product category",
          "Existing team has relevant expertise",
          "Potential for 40% revenue increase",
          "Aligns with company's strategic vision"
        ],
        cons: [
          "Requires significant upfront investment",
          "Market competition is intensifying",
          "Resource allocation from other projects",
          "Timeline is aggressive for Q4 launch"
        ]
      }
    },
    guiding_questions_for_next_discussion: [
      "How can we actively seek out and discuss information that challenges our current preferred solution?",
      "What are the potential worst-case scenarios for this decision, and what steps can we take to mitigate them?",
      "Are we truly breaking down this problem to its fundamental components, or are we relying on assumptions from past similar situations?",
      "What are the potential unintended consequences of this decision on other departments or long-term goals?"
    ],
    transcript: `Meeting Transcript - Q4 Product Strategy Direction
January 15, 2025

[00:00] Sarah (CEO): Let's discuss our Q4 product strategy. I've been thinking we should definitely move forward with the new feature set.

[00:02] Mike (CTO): I agree, the market research looks promising. We've seen similar products succeed.

[00:04] Lisa (CMO): The demand is definitely there. Our surveys show 85% interest rate.

[00:06] Sarah: Exactly. I think we can achieve a 40% revenue increase if we execute well.

[00:08] Mike: The technical implementation is straightforward. We've built similar features before.

[00:10] David (CFO): What about the budget? We're looking at about $2M investment.

[00:12] Sarah: That's manageable. The ROI projections show break-even in 6 months.

[00:14] Lisa: The marketing campaign is already planned. We can launch by Q4.

[00:16] Mike: Timeline is tight but doable with the current team.

[00:18] Sarah: Great, let's move forward. Any other concerns?

[00:20] David: Competition analysis might need more depth.

[00:22] Lisa: Agreed, but we have first-mover advantage in this specific niche.

[00:24] Sarah: Perfect. Let's finalize the plan next week.`
  }
};

export const DecisionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [highlightedModel, setHighlightedModel] = useState<string>("");
  
  const decision = mockDecisionData[Number(id) as keyof typeof mockDecisionData];

  if (!decision) {
    return <div>Decision not found</div>;
  }

  const handleSnippetClick = (snippet: string) => {
    setHighlightedText(snippet);
    const transcriptElement = document.getElementById("transcript-section");
    if (transcriptElement) {
      transcriptElement.scrollIntoView({ behavior: "smooth" });
      // Remove highlight after 3 seconds
      setTimeout(() => setHighlightedText(""), 3000);
    }
  };

  const handleModelClick = (modelName: string) => {
    setHighlightedModel(modelName);
    const modelElement = document.getElementById(`model-${modelName.replace(/\s+/g, '-').toLowerCase()}`);
    if (modelElement) {
      modelElement.scrollIntoView({ behavior: "smooth", block: "center" });
      // Remove highlight after 3 seconds
      setTimeout(() => setHighlightedModel(""), 3000);
    }
  };

  const [highlightedText, setHighlightedText] = useState<string>("");
  const highlightTranscript = (text: string) => {
    if (!highlightedText) return text;
    
    const index = text.indexOf(highlightedText);
    if (index === -1) return text;
    
    return (
      <>
        {text.substring(0, index)}
        <span className="bg-yellow-200 px-1 py-0.5 rounded font-medium transition-colors duration-300">
          {highlightedText}
        </span>
        {text.substring(index + highlightedText.length)}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to My Decisions
        </Button>

        {/* Header */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">
              {decision.title}
            </CardTitle>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>Meeting Date: {decision.meetingDate}</span>
            </div>
          </CardHeader>
        </Card>

        {/* Summary */}
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-blue-900">
              Analysis Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-700">{decision.summary.total_blind_spots}</div>
                <div className="text-sm text-blue-600">Blind Spots</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-700">{decision.summary.high_severity_count}</div>
                <div className="text-sm text-red-600">High Severity</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-700">{decision.summary.frameworks_recommended}</div>
                <div className="text-sm text-green-600">Frameworks</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-700">{decision.summary.mental_models_recommended}</div>
                <div className="text-sm text-purple-600">Mental Models</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Core Insights */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Core Clarily Insights from Meeting</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InsightCard
              title="Detected Blind Spots"
              items={decision.biases}
              icon="eye"
              onSnippetClick={handleSnippetClick}
              onModelClick={handleModelClick}
            />
            <InsightCard
              title="Suggested Mental Models"
              items={decision.mentalModels}
              icon="brain"
              highlightedModel={highlightedModel}
            />
          </div>
        </div>

        {/* Generated Framework */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Generated Framework: {decision.framework.name}
              </CardTitle>
              <p className="text-gray-600 text-sm mt-2">{decision.framework.description}</p>
              <div className="bg-blue-50 text-blue-800 text-sm px-3 py-2 rounded-lg mt-3 font-medium">
                {decision.framework.why_recommended}
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">How to Use:</h4>
                <ol className="space-y-2">
                  {decision.framework.how_to_use.map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full min-w-[24px] text-center">
                        {index + 1}
                      </span>
                      <span className="text-sm text-gray-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <FrameworkCard
                name={decision.framework.name}
                content={decision.framework.content}
              />
            </CardContent>
          </Card>
        </div>

        {/* Guiding Questions */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Guiding Questions for Your Next Discussion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Based on our analysis of this meeting, consider these questions to enhance your team's judgment in the next session:
              </p>
              <ul className="space-y-3 text-sm text-gray-700">
                {decision.guiding_questions_for_next_discussion.map((question, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-600 font-medium">•</span>
                    <span>{question}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Full Meeting Transcript */}
        <div id="transcript-section" className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Full Meeting Transcript
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-line text-sm text-gray-700 font-mono bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">
                {highlightTranscript(decision.transcript)}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
};
