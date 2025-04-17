/**
 * ADHDeer Project Data
 *
 * This file contains the structured data for the ADHDeer ADHD support app project.
 */
import React from 'react';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';

// Import project images and videos directly with standardized naming
import ADHDeerOverview from '../../../../assets/images/ADHDeer/ADHDeer_Overview.png';
import ADHDeerCoreDimensions from '../../../../assets/images/ADHDeer/ADHDeer_CoreDimensions.png';
import ADHDeerForumOverview from '../../../../assets/images/ADHDeer/ADHDeer_Forum_Overview.png';
import ADHDeerForumPostStep1 from '../../../../assets/images/ADHDeer/ADHDeer_ForumPost_Step1.png';
import ADHDeerForumPostStep2 from '../../../../assets/images/ADHDeer/ADHDeer_ForumPost_Step2.png';
import ADHDeerDiaryStep1 from '../../../../assets/images/ADHDeer/ADHDeer_Diary_Step1.png';
import ADHDeerDiaryStep2 from '../../../../assets/images/ADHDeer/ADHDeer_Diary_Step2.png';
import ADHDeerDiaryStep3 from '../../../../assets/images/ADHDeer/ADHDeer_Diary_Step3.png';
import ADHDeerArticlesStep1 from '../../../../assets/images/ADHDeer/ADHDeer_Articles_Step1.png';
import ADHDeerArticlesStep2 from '../../../../assets/images/ADHDeer/ADHDeer_Articles_Step2.png';
import ADHDeerMoodCalendarStep1 from '../../../../assets/images/ADHDeer/ADHDeer_MoodCalendar_Step1.png';
import ADHDeerMoodCalendarStep2 from '../../../../assets/images/ADHDeer/ADHDeer_MoodCalendar_Step2.png';
import ADHDeerMoodCalendarSymptoms from '../../../../assets/images/ADHDeer/ADHDeer_MoodCalendar_Symptoms.png';
import ADHDeerMainMenuOverview from '../../../../assets/images/ADHDeer/ADHDeer_MainMenu_Overview.png';
import ADHDeerRegistrationDone from '../../../../assets/images/ADHDeer/ADHDeer_Registration_Done.png';
import ADHDeerPrototypeVideo from '../../../../assets/images/ADHDeer/ADHDeer_Video_Prototype.mp4';
import presentationPDF from '../../../../assets/information/ADHDeer/ADHDeerPresentation.pdf';

// Import utility for asset paths (only for documents)
import { getAssetPath } from '../../../../utils/mediaUtils';

// Create a media object to hold all our imported media
const media = {
  images: {
    overview: ADHDeerOverview,
    coreDimensions: ADHDeerCoreDimensions,
    forumOverview: ADHDeerForumOverview,
    forumPostStep1: ADHDeerForumPostStep1,
    forumPostStep2: ADHDeerForumPostStep2,
    diaryStep1: ADHDeerDiaryStep1,
    diaryStep2: ADHDeerDiaryStep2,
    diaryStep3: ADHDeerDiaryStep3,
    articlesStep1: ADHDeerArticlesStep1,
    articlesStep2: ADHDeerArticlesStep2,
    moodCalendarStep1: ADHDeerMoodCalendarStep1,
    moodCalendarStep2: ADHDeerMoodCalendarStep2,
    moodCalendarSymptoms: ADHDeerMoodCalendarSymptoms,
    mainMenuOverview: ADHDeerMainMenuOverview,
    registrationDone: ADHDeerRegistrationDone
  },
  videos: {
    prototype: ADHDeerPrototypeVideo
  },
  documents: {
    // Use getAssetPath only for documents in the public folder
    presentation: getAssetPath('ADHDeer', 'ADHDeerPresentation.pdf')
  }
};

// Project data object
const adhdeer = {
  id: 'adhdeer',
  title: "ADHDeer – ADHD Support App",
  description: "A mobile app supporting youth with ADHD through empathic UX design and structured daily routines.",
  categories: ["UI Design", "UX Research", "Mental Health UX", "Prototyping", "Design Thinking"],
  cardVariant: 'warning',
  technologies: ["Figma", "Miro", "Adobe Illustrator", "User Testing"],
  links: [
    {
      label: "View Presentation",
      url: presentationPDF,
      icon: <DashboardIcon fontSize="small" />,
      contentType: 'pdf',
      openInPopup: true
    },
    {
      label: "Try Prototype",
      url: "https://embed.figma.com/design/XJZe9gLj6NkgA05QERnsmD/ADHDeer---Group?node-id=0-1&embed-host=share",
      icon: <DashboardIcon fontSize="small" />,
      contentType: 'iframe',
      openInPopup: true
    }
  ],
  sections: [
    {
      id: 'section-overview',
      type: 'default',
      title: 'Project Overview',
      content: (
        <>
          <Typography variant="body1" paragraph>
            <strong>ADHDeer</strong> is an innovative mobile app designed during a Design Thinking project at FH Salzburg. The app specifically targets young adults and children with Attention Deficit Hyperactivity Disorder (ADHD), helping them and their families manage daily life challenges associated with the condition. The team leveraged personal experiences, user-centered research, and empathic design methodologies to create a practical, supportive digital companion that promotes self-awareness, emotional regulation, and structured daily routines.
          </Typography>
        </>
      ),
      media: { type: 'image', src: media.images.overview, aspect: 'landscape' },
      layout: 'textLeft',
      anchor: 'overview',
      navigable: true
    },
    {
      id: 'section-motivation',
      type: 'default',
      title: 'Motivation and Context',
      content: (
        <Typography variant="body1" paragraph>
          ADHD, characterized by inattentiveness, hyperactivity, and impulsivity, significantly impacts everyday life, academic performance, social interactions, and emotional health. Team members Anica Hummel and Lucia Migacová brought personal and professional ADHD expertise, having first-hand experience with the challenges faced by neurodivergent individuals. The project was motivated by their understanding that young people with ADHD often feel misunderstood, isolated, and lack effective tools to manage their condition proactively.
        </Typography>
      ),
      media: { type: 'image', src: media.images.coreDimensions, aspect: 'landscape' },
      layout: 'textRight',
      anchor: 'motivation',
      navigable: true
    },
    {
      id: 'section-problem',
      type: 'default',
      title: 'Defining the Problem',
      content: (
        <>
          <Typography variant="body1" paragraph>
            Through extensive research and empathizing phases, key challenges emerged clearly:
          </Typography>
          <ul>
            <li><strong>Communication Barriers:</strong> Children and young adults often find it difficult to express their emotional needs or struggles to parents, caregivers, or educators. Similarly, parents often struggle to appropriately gauge how close or distant their support should be.</li>
            <li><strong>Underdiagnosis and Misdiagnosis:</strong> A lack of accurate diagnosis and understanding leads many individuals with ADHD to face exacerbated mental health issues, such as anxiety or depression.</li>
            <li><strong>Lack of Daily Structure and Routine:</strong> Individuals with ADHD frequently struggle with time management, maintaining routines, setting achievable goals, and managing emotional fluctuations, severely impacting their confidence and self-esteem.</li>
          </ul>
        </>
      ),
      media: { type: 'image', src: media.images.mainMenuOverview, aspect: 'portrait' },
      layout: 'textLeft',
      anchor: 'problem',
      navigable: true
    },
    {
      id: 'section-research',
      type: 'gallery',
      title: 'Research and Empathy',
      content: (
        <>
          <Typography variant="body1" paragraph>
            The research phase incorporated diverse methods:
          </Typography>
          <ul>
            <li><strong>Interviews & Personal Insights:</strong> Conducted in-depth conversations with ADHD experts, individuals diagnosed with ADHD, and their families to deeply understand everyday challenges and emotional landscapes.</li>
            <li><strong>Digital Ethnography:</strong> Engaged with online communities (Reddit, Quora) and ADHD-specific forums, identifying common struggles, coping strategies, and gaps in current support tools.</li>
            <li><strong>Focus Groups and Ideation Sessions:</strong> Regularly hosted collaborative brainstorming and ideation sessions utilizing techniques like Mind Mapping, Brainstorming, and Storyboarding to visualize user journeys clearly.</li>
          </ul>
          <Typography variant="body2" paragraph>
            Insights gained from these research methods profoundly shaped the conceptual framework, emphasizing the need for emotional and structural support tools.
          </Typography>
        </>
      ),
      media: [
        { type: 'image', src: media.images.forumOverview, aspect: 'portrait' },
        { type: 'image', src: media.images.forumPostStep1, aspect: 'portrait' },
        { type: 'image', src: media.images.forumPostStep2, aspect: 'portrait' }
      ],
      layout: 'gallery',
      anchor: 'research',
      navigable: true
    },
    {
      id: 'section-ideation',
      type: 'gallery',
      title: 'Ideation and Core Functionalities',
      content: (
        <>
          <Typography variant="body1" paragraph>
            Through intensive ideation, three core dimensions were identified as critical to the app’s success:
          </Typography>
          <ul>
            <li>Mental Health and Emotional Regulation</li>
            <li>Awareness and Understanding of ADHD</li>
            <li>Daily Routine Management and Self-assessment</li>
          </ul>
          <Typography variant="body2" paragraph>
            These dimensions were distilled further into practical functionalities including:
          </Typography>
          <ul>
            <li>Emotion Tracking and Management: Interactive tools allowing users to identify, articulate, and manage emotional states effectively.</li>
            <li>Routine and Task Management: Simplified task scheduling and prioritization features, designed specifically for users with ADHD, emphasizing visual and gamified components.</li>
            <li>Educational Content and Self-awareness Tools: Informative content structured to help users recognize symptoms, strengths, and effective coping strategies tailored specifically for ADHD users.</li>
            <li>Emergency Support and Low-threshold Contact: Integrated access to immediate mental health support resources, addressing acute emotional crises and stress management.</li>
          </ul>
        </>
      ),
      media: [
        { type: 'image', src: media.images.diaryStep1, aspect: 'portrait' },
        { type: 'image', src: media.images.diaryStep2, aspect: 'portrait' },
        { type: 'image', src: media.images.diaryStep3, aspect: 'portrait' }
      ],
      layout: 'gallery',
      anchor: 'ideation',
      navigable: true
    },
    {
      id: 'section-prototype',
      type: 'gallery',
      title: 'Prototyping and Design Execution',
      content: (
        <>
          <Typography variant="body1" paragraph>
            The prototype was crafted in Figma, designed with close attention to accessibility, usability, and engagement for neurodiverse audiences. The UI and UX emphasized clarity, visual appeal, and simplicity, avoiding overwhelming or distracting elements. Key prototype features included:
          </Typography>
          <ul>
            <li>Gamified Daily Planner: Encouraged users to engage actively with their routines, incorporating rewards and progress tracking to maintain motivation.</li>
            <li>Mood and Focus Journal: Enabled easy logging of emotions and concentration levels, visually representing emotional patterns and triggers.</li>
            <li>Educational Modules: User-friendly, digestible resources on ADHD management strategies, symptom recognition, and communication skills.</li>
          </ul>
        </>
      ),
      media: [
        { type: 'image', src: media.images.moodCalendarStep1, aspect: 'portrait' },
        { type: 'image', src: media.images.moodCalendarStep2, aspect: 'portrait' },
        { type: 'image', src: media.images.moodCalendarSymptoms, aspect: 'portrait' }
      ],
      layout: 'gallery',
      anchor: 'prototype',
      navigable: true
    },
    {
      id: 'section-articles',
      type: 'gallery',
      title: 'Educational Content',
      content: (
        <Typography variant="body1" paragraph>
          The app provides accessible articles and resources to help users and their families better understand ADHD and effective coping strategies.
        </Typography>
      ),
      media: [
        { type: 'image', src: media.images.articlesStep1, aspect: 'portrait' },
        { type: 'image', src: media.images.articlesStep2, aspect: 'portrait' }
      ],
      layout: 'gallery',
      anchor: 'articles',
      navigable: true
    },
    {
      id: 'section-onboarding',
      type: 'gallery',
      title: 'Onboarding and Registration',
      content: (
        <Typography variant="body1" paragraph>
          The main menu and onboarding screens are designed for clarity and accessibility, ensuring a smooth start for all users.
        </Typography>
      ),
      media: [
        { type: 'image', src: media.images.mainMenuOverview, aspect: 'portrait' },
        { type: 'image', src: media.images.registrationDone, aspect: 'portrait' }
      ],
      layout: 'gallery',
      anchor: 'onboarding',
      navigable: true
    },
    {
      id: 'section-video',
      type: 'video',
      title: 'Prototype Video',
      content: (
        <Typography variant="body1" paragraph>
          Explore the interactive prototype to experience the app’s core flows and gamified features.
        </Typography>
      ),
      media: { type: 'video', src: media.videos.prototype, aspect: 'landscape' },
      layout: 'textRight',
      anchor: 'video',
      navigable: true
    },
    {
      id: 'section-outcomes',
      type: 'default',
      title: 'Outcomes and Evaluation',
      content: (
        <Typography variant="body1" paragraph>
          The prototype received positive initial feedback from test users, who particularly appreciated the intuitive interface, playful aesthetics, and empathetic tone. Users highlighted the application’s potential to significantly improve daily structure, emotional awareness, and overall self-confidence.
        </Typography>
      ),
      layout: 'textOnly',
      anchor: 'outcomes',
      navigable: true
    },
    {
      id: 'section-future',
      type: 'default',
      title: 'Future Directions',
      content: (
        <>
          <Typography variant="body1" paragraph>
            To further develop ADHDeer, recommended enhancements include:
          </Typography>
          <ul>
            <li>AI-driven Personalization: Integrating AI capabilities to provide personalized feedback, dynamically adapting to the user’s behavior and emotional trends.</li>
            <li>Expanded Community Features: Developing safe, moderated peer-support forums within the app to foster community and peer understanding among young ADHD users.</li>
            <li>Parent and Educator Modules: Introducing specialized sections providing tailored guidance and resources for parents and educators to better support their children’s developmental needs.</li>
          </ul>
        </>
      ),
      layout: 'textOnly',
      anchor: 'future',
      navigable: true
    },
    {
      id: 'section-impact',
      type: 'default',
      title: 'Impact and Conclusion',
      content: (
        <Typography variant="body1" paragraph>
          ADHDeer exemplifies how user-centric, empathetic UX design can significantly enhance the quality of life for young individuals with ADHD. Through comprehensive research, compassionate ideation, and effective prototyping, the project showcases tangible potential for a supportive digital environment, empowering neurodivergent youth to achieve better emotional health, daily structure, and increased self-esteem.
        </Typography>
      ),
      layout: 'textOnly',
      anchor: 'impact',
      navigable: true
    }
  ]
};

adhdeer.media = (() => {
  // Find first video section
  const firstVideo = adhdeer.sections?.find(s => {
    if (Array.isArray(s.media)) {
      return s.media.some(m => m.type === 'video');
    }
    return s.media && s.media.type === 'video';
  });
  if (firstVideo) {
    if (Array.isArray(firstVideo.media)) {
      const video = firstVideo.media.find(m => m.type === 'video');
      if (video) return video;
    } else {
      return firstVideo.media;
    }
  }
  // Otherwise, find first image
  const firstImage = adhdeer.sections?.find(s => {
    if (Array.isArray(s.media)) {
      return s.media.some(m => m.type === 'image');
    }
    return s.media && s.media.type === 'image';
  });
  if (firstImage) {
    if (Array.isArray(firstImage.media)) {
      const image = firstImage.media.find(m => m.type === 'image');
      if (image) return image;
    } else {
      return firstImage.media;
    }
  }
  return undefined;
})();

export default adhdeer;