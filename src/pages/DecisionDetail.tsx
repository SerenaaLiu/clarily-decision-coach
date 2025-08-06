import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { InsightCard } from "@/components/InsightCard";
import { FrameworkCard } from "@/components/FrameworkCard";
import { ArrowLeft, Calendar, ChevronDown, ChevronRight, Eye, Plus } from "lucide-react";

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
    blindSpots: [
      { 
        name: "Confirmation Blind Spot",
        type: "blind_spot" as const,
        severity: "high" as const,
        description: "Found in meeting when team only discussed positive market research, ignoring competitive threats mentioned in uploaded competitor analysis document.",
        snippet: "I agree, the market research looks promising. We've seen similar products succeed.",
        recommendedModels: ["Inversion Thinking", "First Principles"]
      },
      { 
        name: "Optimism Blind Spot",
        type: "blind_spot" as const,
        severity: "high" as const,
        description: "Detected when CEO stated '40% revenue increase' without discussing potential risks outlined in financial projections document.",
        snippet: "I think we can achieve a 40% revenue increase if we execute well.",
        recommendedModels: ["Inversion Thinking", "Systems Thinking"]
      },
      { 
        name: "Anchoring Blind Spot",
        type: "blind_spot" as const,
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
    frameworks: {
      "pros-cons": {
      name: "Pros & Cons Matrix",
      description: "A structured decision-making tool that systematically lists positive and negative aspects of a choice.",
        why_recommended: "Addresses: Confirmation Blind Spot, Optimism Blind Spot",
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
      "swot": {
        name: "SWOT Analysis",
        description: "A strategic planning tool that evaluates Strengths, Weaknesses, Opportunities, and Threats.",
        why_recommended: "Addresses: Anchoring Blind Spot, Confirmation Blind Spot",
        how_to_use: [
          "Identify internal Strengths and Weaknesses",
          "Analyze external Opportunities and Threats",
          "Use insights to inform strategic decisions"
        ],
        content: {
          strengths: [
            "Strong technical team with relevant experience",
            "Existing customer base and brand recognition",
            "Proven product development process"
          ],
          weaknesses: [
            "Limited marketing budget for new features",
            "Small team size for aggressive timeline",
            "Limited experience in target market segment"
          ],
          opportunities: [
            "Growing market demand for our product type",
            "Potential for strategic partnerships",
            "First-mover advantage in specific niche"
          ],
          threats: [
            "Intensifying competition from larger players",
            "Economic uncertainty affecting customer spending",
            "Rapid technology changes in our space"
          ]
        }
      },
      "risk-reward": {
        name: "Risk-Reward Matrix",
        description: "A framework to evaluate potential risks against expected rewards for different options.",
        why_recommended: "Addresses: Optimism Blind Spot, Anchoring Blind Spot",
        how_to_use: [
          "Plot different options on risk vs. reward axes",
          "Consider probability and impact of each risk",
          "Choose options with optimal risk-reward balance"
        ],
        content: {
          high_reward_low_risk: [
            "Incremental feature improvements",
            "Customer feedback integration"
          ],
          high_reward_high_risk: [
            "Major new product launch",
            "Market expansion to new regions"
          ],
          low_reward_low_risk: [
            "Minor UI improvements",
            "Documentation updates"
          ],
          low_reward_high_risk: [
            "Complete product redesign",
            "Entry into unrelated markets"
          ]
        }
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
  const { projectId, decisionId } = useParams();
  const navigate = useNavigate();
  const [highlightedModel, setHighlightedModel] = useState<string>("");
  const [highlightedText, setHighlightedText] = useState<string>("");
  const [isBlindSpotsOpen, setIsBlindSpotsOpen] = useState(false);
  const [activeFramework, setActiveFramework] = useState<keyof typeof mockDecisionData[number]["frameworks"]>("pros-cons");
  
  const decision = mockDecisionData[Number(decisionId) as keyof typeof mockDecisionData];

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
          onClick={() => navigate(`/project/${projectId}`)}
          className="mb-6 flex items-center gap-2 hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Project
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

        {/* Decision Summary */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-blue-900">
              Decision Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Key Decision Points</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-medium">•</span>
                      <span>Q4 product strategy direction and feature prioritization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-medium">•</span>
                      <span>Resource allocation for new feature development</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-medium">•</span>
                      <span>Market expansion strategy and competitive positioning</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Decision Context</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><span className="font-medium">Budget:</span> $2M investment required</p>
                    <p><span className="font-medium">Timeline:</span> Q4 launch target</p>
                    <p><span className="font-medium">Team:</span> 15 developers available</p>
                    <p><span className="font-medium">Risk Level:</span> Medium-High</p>
                  </div>
                </div>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <p className="text-sm text-blue-900 font-medium">
                  <span className="font-semibold">Primary Decision:</span> Proceed with Q4 product strategy including new feature set, 
                  with 40% projected revenue increase and 6-month break-even timeline.
                </p>
              </div>
            </div>
          </CardContent>
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
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Body */}
            <div className="lg:col-span-2 space-y-6">
              {/* Framework Selector Cards */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Generated Frameworks</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Pros & Cons Card */}
                  <Card 
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      activeFramework === "pros-cons" 
                        ? "ring-2 ring-blue-500 bg-blue-50" 
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveFramework("pros-cons")}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <CardTitle className="text-base font-semibold text-gray-900">
                          Pros & Cons Matrix
                        </CardTitle>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Weigh advantages and disadvantages systematically
                      </p>
                      <div className="mt-3">
                        <p className="text-xs font-medium text-gray-700">Best for:</p>
                        <p className="text-xs text-gray-600">Binary decisions, clear trade-offs</p>
                      </div>
                    </CardHeader>
                  </Card>

                  {/* SWOT Card */}
                  <Card 
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      activeFramework === "swot" 
                        ? "ring-2 ring-blue-500 bg-blue-50" 
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveFramework("swot")}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <CardTitle className="text-base font-semibold text-gray-900">
                          SWOT Analysis
                        </CardTitle>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Evaluate internal and external factors comprehensively
                      </p>
                      <div className="mt-3">
                        <p className="text-xs font-medium text-gray-700">Best for:</p>
                        <p className="text-xs text-gray-600">Strategic planning, competitive analysis</p>
                      </div>
                    </CardHeader>
                  </Card>

                  {/* Risk-Reward Card */}
                  <Card 
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      activeFramework === "risk-reward" 
                        ? "ring-2 ring-blue-500 bg-blue-50" 
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveFramework("risk-reward")}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                        </div>
                        <CardTitle className="text-base font-semibold text-gray-900">
                          Risk-Reward Matrix
                        </CardTitle>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Map options by risk level and potential reward
                      </p>
                      <div className="mt-3">
                        <p className="text-xs font-medium text-gray-700">Best for:</p>
                        <p className="text-xs text-gray-600">Investment decisions, portfolio planning</p>
                      </div>
                    </CardHeader>
                  </Card>
          </div>
        </div>

              {/* Selected Framework Content */}
          <Card>
            <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {decision.frameworks[activeFramework].name}
              </CardTitle>
                  <p className="text-gray-600 text-sm">
                    {decision.frameworks[activeFramework].description}
                  </p>
              <div className="bg-blue-50 text-blue-800 text-sm px-3 py-2 rounded-lg mt-3 font-medium">
                    {decision.frameworks[activeFramework].why_recommended}
              </div>
            </CardHeader>
            <CardContent>
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">How to Use:</h4>
                    <ol className="space-y-1">
                      {decision.frameworks[activeFramework].how_to_use.map((step, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full min-w-[20px] text-center">
                        {index + 1}
                      </span>
                          <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <FrameworkCard
                    name={decision.frameworks[activeFramework].name}
                    content={decision.frameworks[activeFramework].content}
              />
            </CardContent>
          </Card>

              {/* Action Items */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                    Action Items
                  </CardTitle>
                  <p className="text-gray-600 text-sm mt-2">
                    Specific next steps and deliverables identified from this decision
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Immediate Actions (This Week)</h4>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">Finalize Q4 product roadmap</p>
                              <p className="text-xs text-gray-600">Owner: Sarah Johnson | Due: Friday</p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">Conduct competitive analysis</p>
                              <p className="text-xs text-gray-600">Owner: Lisa Rodriguez | Due: Thursday</p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">Prepare budget breakdown</p>
                              <p className="text-xs text-gray-600">Owner: David Kim | Due: Wednesday</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Strategic Actions (Next 2 Weeks)</h4>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">Develop risk mitigation plan</p>
                              <p className="text-xs text-gray-600">Owner: Mike Chen | Due: Next Friday</p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">Create stakeholder communication plan</p>
                              <p className="text-xs text-gray-600">Owner: Sarah Johnson | Due: Next Monday</p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">Set up progress tracking system</p>
                              <p className="text-xs text-gray-600">Owner: Lisa Rodriguez | Due: Next Tuesday</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-900 mb-2">Key Deliverables</h4>
                      <ul className="space-y-2 text-sm text-yellow-800">
                        <li>• Q4 Product Roadmap Document</li>
                        <li>• Competitive Analysis Report</li>
                        <li>• Budget Allocation Spreadsheet</li>
                        <li>• Risk Mitigation Strategy</li>
                        <li>• Stakeholder Communication Plan</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Supplemental Insights */}
            <div className="space-y-6">
              {/* Mental Models */}
              <InsightCard
                title="Suggested Mental Models"
                items={decision.mentalModels}
                icon="brain"
                highlightedModel={highlightedModel}
              />

              {/* Guiding Questions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                Guiding Questions for Your Next Discussion
              </CardTitle>
            </CardHeader>
            <CardContent>
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

              {/* Collapsible Blind Spots */}
              <Collapsible open={isBlindSpotsOpen} onOpenChange={setIsBlindSpotsOpen}>
                <CollapsibleTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-between p-4 hover:bg-gray-50 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Eye className="h-4 w-4 text-orange-600" />
                      <div className="text-left">
                        <h3 className="font-medium text-gray-900">Detected Blind Spots</h3>
                        <p className="text-xs text-gray-600">
                          {decision.blindSpots.length} blind spot{decision.blindSpots.length !== 1 ? 's' : ''} found
                        </p>
                      </div>
                    </div>
                    {isBlindSpotsOpen ? (
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="mt-4">
                    <InsightCard
                      title=""
                      items={decision.blindSpots}
                      icon="eye"
                      onSnippetClick={handleSnippetClick}
                      onModelClick={handleModelClick}
                    />
                  </div>
                </CollapsibleContent>
              </Collapsible>
        </div>
              </div>
        </div>

      </div>
    </div>
  );
};
