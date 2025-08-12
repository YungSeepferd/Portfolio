// Section schema for canonical project section types
// Each type lists its expected subfields (all optional unless noted)

export const sectionSchema = {
  overview: {
    summary: '', // Short summary of the project/section
    context: '', // Context or background
    image: '', // Main image (string or media ref)
    subtitle: '',
    links: [], // Optional related links
  },
  problem: {
    challenges: '', // Main challenges
    background: '', // Background info
    list: [], // List of specific problems
    image: '',
  },
  research: {
    methods: '', // Research methods used
    participants: '', // Participant info
    findings: '', // Key findings
    insights: '', // Insights or discussion
    images: [],
    documents: [],
  },
  methodology: {
    steps: [], // Ordered steps or phases
    tools: '', // Tools or frameworks used
    process: '', // Description of process
    images: [],
  },
  technical: {
    implementation: '', // Technical implementation details
    stack: '', // Tech stack
    images: [],
    videos: [],
  },
  outcomes: {
    takeaways: [], // Key takeaways (array of strings)
    outcomes: { title: '', points: [] }, // Structured outcome list
    metrics: '', // Quantitative results
    images: [],
  },
  future: {
    directions: '', // Future work or roadmap
    recommendations: [], // List of recommendations
    images: [],
  },
  gallery: {
    images: [], // Array of image refs/objects
    captions: [], // Array of captions
  },
  video: {
    src: '', // Video source
    description: '', // Description or context
    poster: '', // Poster image
  },
  impact: {
    summary: '',
    details: '',
    images: [],
  },
  concept: {
    features: [], // List of features or concepts
    description: '',
    images: [],
  },
  content: {
    title: '',
    body: '',
    images: [],
  },
  // Add more types as needed based on project data
};

export default sectionSchema;
