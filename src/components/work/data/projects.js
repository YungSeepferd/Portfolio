// Sample projects data to ensure Work component renders properly
export const projects = [
  {
    id: 1,
    title: "Haptic Feedback System for Emotion-driven Interfaces",
    description: "Research and prototyping project exploring how haptic feedback can convey emotional states in digital interfaces",
    shortDescription: "Research on emotion-driven haptic interfaces",
    categories: ["UX Research", "Haptic Design", "Prototyping"],
    tools: ["Arduino", "Processing", "Figma", "3D Printing"],
    images: [
      "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    cardVariant: "primary",
    keyTakeaways: [
      "Cross-modal perception significantly enhances user engagement",
      "Haptic feedback creates more intuitive and accessible interfaces",
      "Emotion-driven design requires careful cultural considerations"
    ]
  },
  {
    id: 2,
    title: "Sound Design for Relaxation Mobile App",
    description: "UI/UX design and sound integration for a meditation and relaxation application",
    shortDescription: "Meditation app with custom sound design",
    categories: ["UI/UX Design", "Sound Design", "Mobile App"],
    tools: ["Adobe XD", "Ableton Live", "After Effects"],
    images: [
      "https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1542731764-7d93f387e1eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    cardVariant: "secondary",
    keyTakeaways: [
      "Sonic identity significantly impacts brand perception",
      "Sound design must adapt to both functionality and aesthetics",
      "User testing reveals surprising audio preference patterns"
    ]
  },
  {
    id: 3,
    title: "Green Wallet Hackathon Project",
    description: "Award-winning sustainable finance app prototype developed during a 48-hour hackathon",
    shortDescription: "Award-winning sustainable finance app prototype",
    categories: ["UI/UX Design", "Prototyping", "Sustainability"],
    tools: ["Figma", "React", "Material UI"],
    images: [
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    cardVariant: "success",
    keyTakeaways: [
      "Rapid prototyping benefits from established design systems",
      "Sustainability features need to balance education with simplicity",
      "Effective gamification increases user engagement with complex topics"
    ]
  }
];

// Add backwards compatibility exports
export { projects as processedProjects };
export { projects as allProjects };

export default projects;
