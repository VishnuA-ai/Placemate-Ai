import { useState, useRef, useEffect, useCallback } from "react";
import {
  Mic, MicOff, Volume2, RotateCcw, Home, BookOpen,
  Brain, FileText, ChevronRight, ChevronDown, ChevronUp, Star,
  CheckCircle, ArrowRight, Zap, Target,
  Code2, Palette, Shield, Cloud, BarChart2, PenTool,
  Lightbulb, MessageSquare, Clock, Bookmark, Filter,
  Linkedin as LinkedinIcon, Play, Square, X, Menu, Sparkles,
  GraduationCap, Globe, Database, Megaphone, Edit3
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────

interface QA { q: string; a: string; category: "hr" | "technical" | "behavioral" }
interface Project { name: string; desc: string; tech: string[]; time: string }
interface RoadmapPhase { phase: string; duration: string; topics: string[]; useCase: string; milestone: string }
interface LinkedInStrategy {
  frequency: string; days: string; weeklyTarget: number;
  topics: string[]; hashtags: string; tip: string; samplePost: string
}
interface DomainData {
  id: string; name: string; Icon: any; color: string; lightBg: string;
  description: string; roadmap: RoadmapPhase[]; questions: QA[];
  projects: Project[]; linkedin: LinkedInStrategy;
  resumeTips: string[]; useCases: string[]
}

// ─── Domain Data ─────────────────────────────────────────────────────────────

const DOMAINS: DomainData[] = [
  {
    id: "frontend", name: "Frontend Developer", Icon: Code2,
    color: "#FF6B35", lightBg: "#FFF0EB",
    description: "Build beautiful, interactive web interfaces using HTML, CSS & JavaScript",
    roadmap: [
      { phase: "Phase 1: Web Foundations", duration: "4–6 weeks", topics: ["HTML5 semantics & structure", "CSS3 — Flexbox & Grid", "JavaScript basics & DOM", "Git & GitHub basics"], useCase: "Real companies need devs who can turn polished visual designs into pixel-perfect pages.", milestone: "Build a static personal webpage" },
      { phase: "Phase 2: JavaScript Deep Dive", duration: "5–7 weeks", topics: ["ES6+ features", "Fetch API & async/await", "Array methods (map, filter, reduce)", "LocalStorage & JSON"], useCase: "E-commerce sites like Flipkart use JS for cart logic, filters, and real-time search.", milestone: "Build a movie search app using a free API" },
      { phase: "Phase 3: React & Ecosystem", duration: "6–8 weeks", topics: ["React components & JSX", "useState & useEffect hooks", "Props & state management", "React Router basics"], useCase: "Startups hire React developers to build SPAs (Single Page Applications) quickly.", milestone: "Build a Task Manager app in React" },
      { phase: "Phase 4: Job-Ready Polish", duration: "3–4 weeks", topics: ["Tailwind CSS / styled-components", "Responsive & mobile-first design", "Portfolio & GitHub profile", "LinkedIn & resume building"], useCase: "Companies filter candidates by GitHub commits and live project demos.", milestone: "Deploy 3 projects on Vercel with custom domain" }
    ],
    questions: [
      { q: "Tell me about yourself and why you chose frontend development.", a: "Briefly cover: your background, what sparked your interest in frontend (a project, a website you admired), what you have built, and where you want to go. Keep it under 2 minutes.", category: "hr" },
      { q: "Where do you see yourself in 3 years as a developer?", a: "Say something like: 'I want to grow from building UI components to leading the frontend architecture of a product, mentoring juniors, and contributing to design systems.' Show ambition + realism.", category: "hr" },
      { q: "How do you handle tight deadlines on a project?", a: "Use the STAR method: Situation → break it into must-haves vs nice-to-haves, prioritize, communicate blockers early, and deliver the core feature first. Mention a real example if you have one.", category: "hr" },
      { q: "Describe a challenge you faced while learning to code.", a: "Be honest — mention a real struggle (e.g., understanding closures, async JS). What matters is HOW you solved it: documentation, YouTube, StackOverflow, building a mini-project to test it.", category: "hr" },
      { q: "Why do you want to join our company specifically?", a: "Research before the interview! Mention their product, tech stack, culture, or a recent blog post. 'I use your product daily and noticed X — I'd love to work on improving it' wins points.", category: "hr" },
      { q: "What is the difference between == and === in JavaScript?", a: "== compares values with type coercion ('5' == 5 is true). === checks both value AND type without coercion ('5' === 5 is false). Always prefer === for predictable, bug-free comparisons.", category: "technical" },
      { q: "Explain the CSS Box Model.", a: "Every HTML element is a rectangular box: Content (the actual text/image), Padding (space between content and border), Border (the edge), and Margin (space outside the border). box-sizing: border-box makes width include padding and border.", category: "technical" },
      { q: "What is React and why is it popular?", a: "React is a JavaScript library for building UIs using reusable components. It uses a Virtual DOM to update only changed parts of the page — making it fast. Built by Meta, backed by a massive community and ecosystem.", category: "technical" },
      { q: "What is the difference between display: flex and display: grid?", a: "Flexbox is one-dimensional — align items in a row OR column. CSS Grid is two-dimensional — control both rows AND columns. Use Flexbox for navbars, buttons, card rows. Use Grid for full page layouts and complex designs.", category: "technical" },
      { q: "What is semantic HTML and why does it matter?", a: "Semantic tags like <header>, <nav>, <main>, <article>, <footer> describe the meaning of content — not just its appearance. Benefits: better SEO, screen-reader accessibility, easier code maintenance.", category: "technical" },
      { q: "Tell me about a project you built. What was the hardest part?", a: "Pick a project you're proud of. Explain: what it does, the tech you used, the specific challenge (async bugs? responsive layout?), how you debugged it, and what you'd do differently now.", category: "behavioral" },
      { q: "How do you stay updated with the latest frontend trends?", a: "Mention: CSS-Tricks, dev.to, Frontend Masters, JavaScript Weekly newsletter, Twitter/X devs like @addyosmani, building small experiments with new tools like Astro or Vite.", category: "behavioral" },
      { q: "How do you handle feedback on your code during a code review?", a: "Say: I see code review as free mentorship. I ask 'Why is this approach better?' rather than defending my first solution. I keep my ego separate from my code.", category: "behavioral" }
    ],
    projects: [
      { name: "Personal Portfolio Website", desc: "A multi-section website with About, Projects, Skills, and Contact. Include a working contact form using Formspree (free). Make it fully responsive.", tech: ["HTML5", "CSS3", "JavaScript"], time: "1–2 weeks" },
      { name: "Weather Dashboard", desc: "Show current weather + 5-day forecast for any city using the OpenWeatherMap free API. Include a search bar, weather icons, and temperature in °C/°F toggle.", tech: ["React", "Fetch API", "CSS"], time: "1–2 weeks" },
      { name: "Task Manager App", desc: "Full CRUD todo app with categories, due dates, priority levels. Store data in localStorage so tasks persist on refresh. Include a filter by status feature.", tech: ["React", "LocalStorage", "Tailwind CSS"], time: "2 weeks" }
    ],
    linkedin: {
      frequency: "3 times per week", days: "Monday, Wednesday, Friday", weeklyTarget: 3,
      topics: ["What I built today (with screenshot/GIF)", "CSS or JavaScript tip of the week", "My frontend learning journey update", "Explaining a complex concept simply"],
      hashtags: "#Frontend #WebDev #JavaScript #React #CSS #100DaysOfCode",
      tip: "Show your work visually. Screenshots and short screen recordings get 3x more engagement than text-only posts. Use Loom for free screen recording.",
      samplePost: "🚀 Just built my first React weather app!\n\nIt fetches real-time data from OpenWeatherMap API and shows:\n✅ Current temperature\n✅ 5-day forecast\n✅ °C / °F toggle\n\nBiggest learning: handling async errors gracefully.\n\nLive demo 👇 [link]\n\n#React #Frontend #WebDev #100DaysOfCode"
    },
    resumeTips: [
      "Skills section: HTML5, CSS3, JavaScript (ES6+), React.js, Git, Responsive Design, REST APIs, Tailwind CSS",
      "Projects: Always include a live demo link (Vercel/Netlify) + GitHub repo link for each project",
      "Quantify impact: 'Built responsive UI used by 300+ users' or 'Reduced page load by 40% via lazy loading'",
      "Add: Familiar with digital design handoff, Chrome DevTools, and basic web accessibility (WCAG)"
    ],
    useCases: [
      "Zomato uses React for their restaurant listing and real-time order tracking UI",
      "CRED's entire app UI is built and maintained by frontend developers",
      "Byju's hiring frontend devs to build interactive learning modules for millions of students"
    ]
  },
  {
    id: "backend", name: "Backend Developer", Icon: Database,
    color: "#2D82B7", lightBg: "#EBF5FF",
    description: "Build APIs, databases, and server-side logic that power applications",
    roadmap: [
      { phase: "Phase 1: Programming Foundation", duration: "4–6 weeks", topics: ["Python or Node.js basics", "Functions, loops, OOP basics", "File I/O & error handling", "Command line & Git"], useCase: "Every backend role needs solid programming fundamentals in at least one language.", milestone: "Build a command-line student grade calculator" },
      { phase: "Phase 2: Web & APIs", duration: "5–7 weeks", topics: ["HTTP basics — GET/POST/PUT/DELETE", "REST API design principles", "Express.js or Flask/FastAPI", "JSON & data formats"], useCase: "Startups pay backend devs specifically to build APIs that mobile apps consume.", milestone: "Build a REST API for a library book system" },
      { phase: "Phase 3: Databases", duration: "4–6 weeks", topics: ["SQL basics — SELECT, JOIN, GROUP BY", "MySQL or PostgreSQL", "MongoDB basics (NoSQL)", "Database design & relationships"], useCase: "Every company stores data — banking, e-commerce, healthcare all need database experts.", milestone: "Add a PostgreSQL database to your API" },
      { phase: "Phase 4: Security & Deployment", duration: "3–4 weeks", topics: ["Authentication — JWT & sessions", "Password hashing with bcrypt", "Environment variables & .env", "Deploy to Railway or Render (free)"], useCase: "Secure APIs are critical — companies face million-dollar breaches from poor auth.", milestone: "Deploy a secure REST API with user authentication" }
    ],
    questions: [
      { q: "Tell me about yourself and what draws you to backend development.", a: "Talk about your interest in how systems work behind the scenes — data flow, logic, databases. Mention your language of choice (Python/Node.js) and a project you built.", category: "hr" },
      { q: "How do you approach designing a new API from scratch?", a: "Walk through: understand requirements, define resources/endpoints, design data models, plan authentication, write docs (Swagger/Postman). Show you think before you code.", category: "hr" },
      { q: "Describe a time you had to debug a production issue quickly.", a: "If you haven't had production exp, use a project example. Show: systematic approach — check logs first, isolate the module, reproduce locally, fix and test, deploy with monitoring.", category: "hr" },
      { q: "How do you ensure your APIs are secure?", a: "Validate all inputs, use parameterized queries to prevent SQL injection, hash passwords with bcrypt, use JWT with expiry, enforce HTTPS, rate-limit endpoints to prevent abuse.", category: "hr" },
      { q: "Why do you prefer [Python/Node.js] for backend development?", a: "Be opinionated but fair. Python: readable, great for data-heavy apps, huge libraries. Node.js: fast, non-blocking I/O, JavaScript everywhere. Mention trade-offs to show maturity.", category: "hr" },
      { q: "What is the difference between SQL and NoSQL databases?", a: "SQL: structured, table-based, uses schemas (MySQL, PostgreSQL) — great for relational data like banking. NoSQL: flexible schema, document/key-value stores (MongoDB, Redis) — great for unstructured or rapidly changing data.", category: "technical" },
      { q: "What is REST and what are its key principles?", a: "REST (Representational State Transfer): stateless client-server, uniform interface (standard HTTP methods), resource-based URLs (/users/123), JSON responses. Not to be confused with SOAP (more complex, XML-based).", category: "technical" },
      { q: "What is JWT and how does authentication work with it?", a: "JWT = JSON Web Token. Server creates a signed token (header.payload.signature) after login. Client stores it and sends it in each request header. Server verifies the signature — no session storage needed (stateless).", category: "technical" },
      { q: "What is the N+1 query problem?", a: "When fetching a list of 100 users + their posts, a naive loop runs 1 query for users + 100 queries for posts = 101 queries. Fix: use JOIN or eager loading (e.g., include in Sequelize, select_related in Django).", category: "technical" },
      { q: "What is middleware in Express.js?", a: "Functions that execute during the request-response cycle. They have access to req, res, and next(). Used for: logging, authentication checks, body parsing, error handling. app.use(middleware) applies it globally.", category: "technical" },
      { q: "How do you design a database schema for a new project?", a: "Start with entities (users, products, orders), define relationships (one-to-many, many-to-many), normalize to avoid data duplication, add indexes on frequently queried columns, document it in ER diagram.", category: "behavioral" },
      { q: "Describe a complex problem you solved with code.", a: "Pick a real challenge — infinite loop, race condition, memory leak. Explain your debugging process step-by-step. Interviewers care more about HOW you think than the problem itself.", category: "behavioral" },
      { q: "How do you approach performance optimization in backend code?", a: "Profile first (don't guess). Common wins: database indexing, caching with Redis, pagination for large datasets, async operations, N+1 query fixes, CDN for static assets.", category: "behavioral" }
    ],
    projects: [
      { name: "REST API for a Blog", desc: "Full CRUD API with users, posts, and comments. Implement JWT authentication, input validation, and proper HTTP status codes. Test with Postman.", tech: ["Node.js", "Express", "MongoDB", "JWT"], time: "2 weeks" },
      { name: "URL Shortener", desc: "Like bit.ly — take a long URL, store it with a short code in a database, redirect when the short URL is visited. Track click count per URL.", tech: ["Python", "Flask", "SQLite"], time: "1 week" },
      { name: "Student Result Management System", desc: "API to add students, enter marks for subjects, auto-calculate grade and percentage. Include login for admin role. Use PostgreSQL for data storage.", tech: ["Node.js", "PostgreSQL", "bcrypt", "JWT"], time: "2–3 weeks" }
    ],
    linkedin: {
      frequency: "2 times per week", days: "Tuesday and Thursday", weeklyTarget: 2,
      topics: ["API design tips and best practices", "Database optimization lessons learned", "A bug I fixed and what I learned", "Explaining backend concepts in simple language"],
      hashtags: "#Backend #NodeJS #Python #API #Database #WebDev",
      tip: "Backend devs who explain complex things simply stand out. 'How JWT authentication works in 5 bullet points' gets huge engagement. Teach, don't just post.",
      samplePost: "🔐 JWT Authentication explained simply:\n\n1. User logs in → server verifies password\n2. Server creates a signed token (not stored anywhere)\n3. Client stores token in localStorage\n4. Every request → client sends token in header\n5. Server verifies signature → no database lookup needed!\n\nThis is why JWT is 'stateless' ✅\n\n#Backend #NodeJS #WebDev #API"
    },
    resumeTips: [
      "Skills: Node.js / Python, Express.js / FastAPI, REST API design, SQL (PostgreSQL/MySQL), MongoDB, Git, JWT Auth",
      "Certifications: freeCodeCamp Back End Development & APIs cert (free + recognized)",
      "Show impact: 'API handles 1,000+ requests/day' or 'Reduced query time by 60% using indexing'",
      "Include: Postman, Docker basics, Railway/Render deployment experience"
    ],
    useCases: [
      "Paytm's payment APIs are built and maintained by a team of backend developers",
      "Swiggy's order routing system uses backend logic to assign the nearest delivery partner",
      "OYO's hotel booking system backend processes thousands of reservations per minute"
    ]
  },
  {
    id: "datascience", name: "Data Science & ML", Icon: Brain,
    color: "#7B2D8B", lightBg: "#F5EBF9",
    description: "Analyze data, build ML models, and extract insights that drive decisions",
    roadmap: [
      { phase: "Phase 1: Python & Math Basics", duration: "4–6 weeks", topics: ["Python: NumPy, Pandas, Matplotlib", "Statistics: mean, median, std deviation", "Probability basics", "Jupyter Notebook workflow"], useCase: "Every DS role starts with Python — even R users need to know Python basics for job applications.", milestone: "Perform EDA on a public Kaggle dataset" },
      { phase: "Phase 2: Data Analysis & Visualization", duration: "4–6 weeks", topics: ["Data cleaning with Pandas", "Seaborn & Plotly charts", "Handling missing values & outliers", "Feature engineering basics"], useCase: "Netflix uses data analysis to decide which shows to renew, where to shoot, and what to recommend.", milestone: "Analyze the Titanic dataset and visualize survival patterns" },
      { phase: "Phase 3: Machine Learning", duration: "6–8 weeks", topics: ["Scikit-learn: regression, classification", "Train/test split, cross-validation", "Decision trees, Random Forest, SVM", "Model evaluation metrics: accuracy, F1, AUC"], useCase: "Amazon uses ML models to predict what you'll buy next — recommendation engines are built by ML engineers.", milestone: "Build a spam email classifier with 90%+ accuracy" },
      { phase: "Phase 4: Projects & Portfolio", duration: "4 weeks", topics: ["End-to-end ML project", "Deploy model with Flask API", "Kaggle competitions", "GitHub portfolio with notebooks"], useCase: "Data science portfolios on GitHub/Kaggle are reviewed by recruiters more than resumes.", milestone: "Deploy an ML model as a web app on Render" }
    ],
    questions: [
      { q: "Why do you want to become a Data Scientist?", a: "Go beyond 'data is the new oil.' Talk about a specific insight or pattern you discovered (even from a personal project) that made you realize data can solve real problems. Be specific.", category: "hr" },
      { q: "How do you handle a dataset with 40% missing values?", a: "First, understand WHY values are missing (MCAR/MAR/MNAR). Options: drop rows/columns with too much missing data, impute with mean/median/mode, use model-based imputation (KNN Imputer), or flag with a 'was_missing' indicator column.", category: "hr" },
      { q: "Explain overfitting and how you would detect and fix it.", a: "Overfitting: model memorizes training data, fails on new data. Detect: high train accuracy, low test accuracy (big gap). Fix: more training data, regularization (L1/L2), cross-validation, dropout (in neural nets), simpler model.", category: "hr" },
      { q: "How do you communicate data insights to a non-technical manager?", a: "Use visuals (bar charts, not confusion matrices). Lead with the business outcome ('Sales will drop 20% in Q3 based on X'), not methodology. Avoid jargon. Use analogies. Always answer 'So what does this mean for us?'", category: "hr" },
      { q: "What is the difference between supervised and unsupervised learning?", a: "Supervised: labeled training data — model learns to predict output (classification: spam/not-spam; regression: house price). Unsupervised: no labels — model finds hidden patterns (clustering: customer segments, dimensionality reduction).", category: "technical" },
      { q: "Explain the bias-variance tradeoff.", a: "Bias: error from wrong assumptions (underfitting — too simple model). Variance: error from sensitivity to noise (overfitting — too complex model). The tradeoff: reducing one often increases the other. Goal: find the sweet spot with cross-validation.", category: "technical" },
      { q: "What is the difference between correlation and causation?", a: "Correlation: two variables move together (ice cream sales and drowning rates both increase in summer). Causation: one causes the other (heat → both). Correlation does NOT imply causation. Always ask: is there a confounding variable?", category: "technical" },
      { q: "What evaluation metrics would you use for an imbalanced dataset?", a: "Avoid accuracy on imbalanced data (99% accuracy by predicting majority class is useless). Use: Precision, Recall, F1-Score, AUC-ROC. For fraud detection: prioritize Recall (catch all fraud, even at cost of false positives).", category: "technical" },
      { q: "What is cross-validation and why is it important?", a: "K-Fold CV splits data into K subsets, trains on K-1, tests on 1, repeats K times, averages scores. Prevents using the same test set for model selection (which leaks info). Gives a more reliable performance estimate than a single split.", category: "technical" },
      { q: "Describe a data project you're most proud of.", a: "Walk through: problem statement, data source, cleaning steps, features you engineered, model chosen and why, results, and what you'd improve. Have a Kaggle notebook or GitHub link ready to show.", category: "behavioral" },
      { q: "How would you explain a neural network to a 10-year-old?", a: "Imagine a bunch of friends passing notes. Each friend (neuron) adds a little info and decides how important it is. Together, they figure out patterns — like recognizing that an animal with 4 legs and fur is probably a dog.", category: "behavioral" },
      { q: "You have 6 hours to analyze data and present findings. Walk me through your process.", a: "1) Understand the business question. 2) Quick EDA — shape, types, nulls, distributions. 3) Identify 2-3 key hypotheses. 4) Test them with charts and statistics. 5) Build one simple predictive model if time allows. 6) Prepare 5-slide deck with clear visuals.", category: "behavioral" }
    ],
    projects: [
      { name: "Titanic Survival Predictor", desc: "Classic beginner ML project. Clean the dataset, engineer features (family size, title extraction), build a Random Forest classifier, achieve 80%+ accuracy. Deploy as a simple web form.", tech: ["Python", "Pandas", "Scikit-learn", "Streamlit"], time: "2 weeks" },
      { name: "House Price Predictor", desc: "Use the Ames Housing dataset. Perform feature engineering, handle missing values, build a regression model (Linear + XGBoost), display predictions on a simple UI. Great for regression practice.", tech: ["Python", "Pandas", "Scikit-learn", "Matplotlib"], time: "2 weeks" },
      { name: "Customer Sentiment Analyzer", desc: "Analyze Amazon product reviews using NLP. Count vectorize text, train a Naive Bayes classifier to predict positive/negative sentiment. Show accuracy and a word cloud of common words.", tech: ["Python", "NLTK", "Scikit-learn", "WordCloud"], time: "2 weeks" }
    ],
    linkedin: {
      frequency: "3 times per week", days: "Monday, Wednesday, Friday", weeklyTarget: 3,
      topics: ["Kaggle competition learnings and ranking updates", "A data insight that surprised you", "Explaining ML concepts visually (use Canva)", "Your current project progress with charts"],
      hashtags: "#DataScience #MachineLearning #Python #AI #Kaggle #DataAnalytics",
      tip: "Share a chart or visualization every post — data people respond to visuals. 'I analyzed 10,000 rows of data and found this surprising pattern...' works better than generic advice posts.",
      samplePost: "📊 I analyzed Netflix data for 3 hours and found something interesting:\n\n90% of top-rated shows were either:\n→ Drama or Documentary\n→ Released Oct–Dec\n→ Under 10 episodes\n\nWhat this means: short, story-driven content wins.\n\nFull notebook 👇 [GitHub link]\n\n#DataScience #Python #Netflix #EDA"
    },
    resumeTips: [
      "Skills: Python (NumPy, Pandas, Scikit-learn, Matplotlib), SQL, Machine Learning, Data Visualization, Statistics",
      "Certifications: Google Data Analytics (Coursera, free audit), IBM Data Science Professional Certificate",
      "Always link Kaggle profile and GitHub with notebooks — recruiters check these",
      "Projects section: mention dataset size, model accuracy, and business impact ('Model reduces churn prediction error by 25%')"
    ],
    useCases: [
      "HDFC Bank uses ML models to detect fraudulent transactions in real-time (millions of transactions daily)",
      "Ola uses data science to forecast ride demand by area and time — dynamic pricing is an ML model",
      "Myntra's fashion recommendation engine is built by data scientists using collaborative filtering"
    ]
  },
  {
    id: "digitalmarketing", name: "Digital Marketing", Icon: Megaphone,
    color: "#2ECC71", lightBg: "#EAFAF1",
    description: "Grow brands online through SEO, social media, ads, and content strategy",
    roadmap: [
      { phase: "Phase 1: Marketing Fundamentals", duration: "3–4 weeks", topics: ["Marketing funnel: AIDA model", "Target audience & buyer persona", "Google Analytics basics (GA4)", "Content marketing principles"], useCase: "Every brand — from a chai stall to Tata — needs someone who understands WHO they're marketing to.", milestone: "Create a buyer persona + content calendar for a local business" },
      { phase: "Phase 2: SEO & Content", duration: "4–5 weeks", topics: ["On-page SEO: keywords, meta tags", "Off-page SEO: backlinks", "Google Search Console", "Blog writing for SEO"], useCase: "90% of online experiences start with a search — ranking on page 1 can double a business's revenue.", milestone: "Publish 3 SEO-optimized blog posts on Medium or WordPress" },
      { phase: "Phase 3: Paid Ads & Social", duration: "4–6 weeks", topics: ["Google Ads basics (Search campaigns)", "Meta (Facebook/Instagram) Ads", "Ad copywriting & A/B testing", "Instagram & LinkedIn strategy"], useCase: "D2C brands spend crores on digital ads — skilled ad managers directly impact company revenue.", milestone: "Run a ₹500 test campaign on Meta Ads (or simulate with free Facebook Blueprint)" },
      { phase: "Phase 4: Analytics & Strategy", duration: "3 weeks", topics: ["Google Analytics 4 deep dive", "Campaign performance reporting", "Email marketing with Mailchimp (free)", "Building a marketing portfolio"], useCase: "CMOs trust marketers who can read data — 'this campaign got 3x ROAS' > 'we ran a campaign'.", milestone: "Create a complete 3-month digital marketing plan for a product" }
    ],
    questions: [
      { q: "Tell me about yourself and how you got into digital marketing.", a: "Mention: a brand or campaign that inspired you, any personal experience (ran Instagram page? grew a blog?), your core interest (SEO? social media? ads?), and where you want to specialize.", category: "hr" },
      { q: "What is ROAS and why does it matter?", a: "ROAS = Return on Ad Spend = Revenue from ads / Cost of ads. If you spend ₹10,000 on ads and earn ₹40,000 in sales, ROAS = 4x. It's the primary metric for measuring ad campaign profitability.", category: "hr" },
      { q: "How would you promote a new product with a ₹0 marketing budget?", a: "Leverage owned channels: create valuable content on Instagram/LinkedIn, post in relevant Facebook/Reddit groups, reach out to micro-influencers for barter, use SEO to drive organic traffic, list on Google My Business, partner with complementary brands.", category: "hr" },
      { q: "What is the difference between organic and paid marketing?", a: "Organic: free traffic from SEO, social media posts, word-of-mouth — takes time but compounds. Paid: instant traffic through Google Ads, Meta Ads, sponsored posts — stops when you stop paying. Best strategy: use paid to test, then scale organically.", category: "hr" },
      { q: "How do you measure the success of a social media campaign?", a: "Depends on the goal. Awareness: impressions, reach. Engagement: likes, shares, comments, saves. Traffic: link clicks, CTR. Conversions: form fills, purchases, ROAS. Always tie metrics to a business objective, not vanity numbers.", category: "hr" },
      { q: "What is SEO and what are the key ranking factors?", a: "SEO = Search Engine Optimization — improving your website's visibility in organic search. Key factors: content quality & relevance, keyword optimization, page speed, mobile-friendliness, backlinks from authoritative sites, Core Web Vitals.", category: "technical" },
      { q: "What is the Google Ads Quality Score and why does it matter?", a: "Quality Score (1-10) measures ad relevance, expected CTR, and landing page experience. Higher score = lower CPC (cost per click) and better ad placement. A score of 8-10 can reduce cost by 50% vs a score of 3.", category: "technical" },
      { q: "Explain A/B testing in marketing.", a: "Running two versions of an ad/email/landing page simultaneously to see which performs better. Only change ONE variable at a time (headline, CTA button color, image). Run until statistically significant. Then scale the winner.", category: "technical" },
      { q: "What is email marketing and what makes a good email campaign?", a: "Sending targeted emails to nurture leads or retain customers. Good campaigns: personalized subject line, valuable content (not just sales pitch), clear CTA, mobile-optimized, right send time (Tuesday–Thursday morning tends to work well), and automated sequences.", category: "technical" },
      { q: "What are UTM parameters and how are they used?", a: "UTM tags added to URLs to track traffic source in Analytics: utm_source=facebook, utm_medium=cpc, utm_campaign=summer_sale. Without UTMs, GA lumps all traffic together. With UTMs, you know exactly which ad drove which sale.", category: "technical" },
      { q: "Tell me about a campaign you planned or executed.", a: "Even a personal project works: grew your college Instagram from 0 to 500 followers? Promoted an event? Walk through: objective → strategy → execution → results → what you'd change. Numbers matter.", category: "behavioral" },
      { q: "A campaign is not performing. Walk me through your debugging process.", a: "Check: Is the targeting right? Is the ad creative resonating (low CTR = creative issue, high CTR but no conversions = landing page issue). Check budget pacing, frequency cap, competitor activity. A/B test a new element.", category: "behavioral" },
      { q: "How do you approach content creation for different platforms?", a: "Each platform has its own language: Instagram = visual storytelling, short captions, Reels. LinkedIn = professional insight posts, carousels, articles. Twitter = short punchy takes. Always adapt content natively — don't cross-post without editing.", category: "behavioral" }
    ],
    projects: [
      { name: "SEO Blog + Analytics Setup", desc: "Start a free WordPress/Medium blog on a niche topic. Write 5 SEO-optimized posts (use free Ubersuggest for keywords). Connect Google Analytics & Search Console. Track organic traffic growth over 30 days.", tech: ["WordPress / Medium", "Google Analytics", "Search Console", "Ubersuggest"], time: "3–4 weeks" },
      { name: "Social Media Content Calendar", desc: "Create a 30-day Instagram/LinkedIn content calendar for a fictional brand. Design 10 posts using free Canva. Write captions with hooks, CTAs, and relevant hashtags. Present with an engagement strategy rationale.", tech: ["Canva", "Google Sheets", "Instagram / LinkedIn"], time: "1–2 weeks" },
      { name: "Email Marketing Campaign", desc: "Use Mailchimp free tier to build a welcome email sequence (3 emails) for a fictional product. Include subject line testing strategy, segmentation plan, and expected open/click rate benchmarks.", tech: ["Mailchimp", "Canva", "Google Docs"], time: "1 week" }
    ],
    linkedin: {
      frequency: "Daily (every day)", days: "Every day — Monday through Sunday", weeklyTarget: 7,
      topics: ["Marketing tip or insight of the day", "Campaign result breakdown (yours or a famous brand)", "Platform algorithm update and what it means", "Behind-the-scenes of your current project"],
      hashtags: "#DigitalMarketing #SEO #ContentMarketing #SocialMedia #MarketingTips #GrowthHacking",
      tip: "Digital marketers MUST live on LinkedIn. Daily posting builds your personal brand — which is your portfolio. Share your own experiments: 'I tested this and here's what happened.' Real results beat generic advice every time.",
      samplePost: "🔍 I analyzed the top 10 performing LinkedIn posts in my feed this month.\n\nCommon pattern:\n→ Starts with a bold statement or question\n→ Uses single-line paragraphs (easy to read)\n→ Has a specific number in the hook\n→ Ends with a clear question to drive comments\n\nNow you know the formula 😉\n\nWhich tip will you try first? Drop it below 👇\n\n#LinkedIn #ContentMarketing #DigitalMarketing"
    },
    resumeTips: [
      "Skills: SEO (on-page & off-page), Google Analytics 4, Google Ads (Search), Meta Ads, Email Marketing, Content Strategy, Canva",
      "Certifications: Google Analytics cert (free), HubSpot Content Marketing cert (free), Meta Blueprint (free)",
      "Show results: 'Grew Instagram from 200 to 2,000 followers in 90 days using Reels strategy'",
      "Include tools: Mailchimp, Ubersuggest/Ahrefs, Hootsuite/Buffer, Google Search Console, Semrush (free version)"
    ],
    useCases: [
      "Zomato's viral social media posts are written by a digital marketing team — their meme strategy drives millions of impressions",
      "Mamaearth grew from 0 to ₹500 crore revenue primarily through digital marketing and influencer partnerships",
      "Every coaching institute (Unacademy, BYJU'S) spends heavily on Google Ads — managed by digital marketers"
    ]
  },
  {
    id: "contentwriting", name: "Content Writing", Icon: Edit3,
    color: "#1ABC9C", lightBg: "#E8FAF7",
    description: "Create compelling content that educates, entertains, and converts readers",
    roadmap: [
      { phase: "Phase 1: Writing Fundamentals", duration: "3–4 weeks", topics: ["Grammar & clarity (read Strunk & White)", "Sentence variety & active voice", "Headline writing formulas", "Reading: 1 article + 1 book chapter/day"], useCase: "Every company needs written content — websites, emails, social media, product descriptions.", milestone: "Write 5 blog posts (500+ words each) on topics you care about" },
      { phase: "Phase 2: SEO Content Writing", duration: "4–5 weeks", topics: ["Keyword research with free tools", "SEO title & meta description writing", "Structuring blog posts for readability", "Internal linking strategy"], useCase: "SEO content writers are hired by companies to drive free organic traffic — reducing ad spend.", milestone: "Write 3 SEO blog posts that rank in Google Search Console" },
      { phase: "Phase 3: Specialization", duration: "4–6 weeks", topics: ["Copywriting vs content writing", "Email sequence writing", "Social media copywriting", "Technical writing basics OR scriptwriting"], useCase: "Specialized writers earn significantly more — SaaS companies pay ₹50k-2L/month for good technical writers.", milestone: "Complete one paid or volunteer writing project for a real client or NGO" },
      { phase: "Phase 4: Portfolio & Freelance", duration: "3–4 weeks", topics: ["Build portfolio on Contently or own website", "Pitch clients on LinkedIn, Upwork", "Rate setting for freelancers", "Long-term client relationship management"], useCase: "Experienced freelance content writers earn ₹50k-3L/month working with multiple clients.", milestone: "Publish a portfolio site with 5 best samples and land 1 paid project" }
    ],
    questions: [
      { q: "Tell me about yourself and your writing journey.", a: "Mention what made you start writing (a blog? college magazine?), what you write best (tech? lifestyle? B2B?), your favorite piece you've written and why, and what you want to specialize in.", category: "hr" },
      { q: "How do you research and write about a topic you know nothing about?", a: "Show your research process: read 5-10 authoritative sources first, identify common themes, look for gaps, interview an expert if possible, then organize notes before writing. Never write without researching.", category: "hr" },
      { q: "What is the difference between copywriting and content writing?", a: "Content writing: educates, informs, builds trust over time (blog posts, guides, newsletters). Copywriting: persuades and converts immediately (ads, landing pages, CTAs, sales emails). Both use psychology but have different primary goals.", category: "hr" },
      { q: "How do you handle editor feedback and rewrites?", a: "Feedback is free improvement. Clarify: 'Is the issue tone, structure, or facts?' Then address systematically — don't just change words randomly. Follow up to confirm the revision solved the issue.", category: "hr" },
      { q: "What makes a great headline?", a: "Great headlines: use numbers ('7 ways to...'), create curiosity gaps, promise clear benefit, use power words (secret, proven, finally), are specific not vague. Test: Coschedule Headline Analyzer (free tool).", category: "hr" },
      { q: "What is SEO writing and how do you optimize a blog post?", a: "Include target keyword in: title, first 100 words, headings (H2/H3), image alt text, meta description. Use related keywords naturally. Aim for 1,500+ words for ranking. Add internal links, external links to authoritative sources.", category: "technical" },
      { q: "What is the inverted pyramid style of writing?", a: "Lead with the most important information (conclusion/key point), then supporting details, then background/context. Used in journalism and news writing. Readers skim — give them the value upfront.", category: "technical" },
      { q: "What tools do you use in your writing workflow?", a: "Research: Google Scholar, Wikipedia (for overview), Reddit (for real questions). Writing: Google Docs. SEO: Ubersuggest, Google Keyword Planner. Editing: Grammarly, Hemingway App (free). Plagiarism: Copyscape / Quetext (free tier).", category: "technical" },
      { q: "How do you write for different target audiences?", a: "First, identify: age, expertise level, pain points, preferred language (formal/casual). Beginners: define every term, use analogies. Experts: skip basics, go deeper, cite studies. Always write to ONE specific person, not a vague 'audience'.", category: "technical" },
      { q: "What is readability and how do you improve it?", a: "Readability = how easy is your writing to understand. Improve: short sentences (15-20 words avg), short paragraphs (3-4 lines), simple words over jargon, bullet points for lists, Flesch-Kincaid score 60-70 for general audience.", category: "technical" },
      { q: "Show me your best piece of writing and tell me why it works.", a: "Pick a real sample. Explain: who the target audience is, what the goal was, what writing techniques you used (hook, structure, CTA), and what results it achieved (traffic, shares, conversions). Always link to your portfolio.", category: "behavioral" },
      { q: "How do you manage multiple writing projects and deadlines?", a: "Use Trello or Notion for project tracking. Break each piece into: research, outline, draft, edit, final. Set internal deadlines 24 hours before client deadlines. Batch similar tasks (all research in morning, writing in afternoon).", category: "behavioral" },
      { q: "How do you stay original when writing about well-covered topics?", a: "Add your own experience or opinion, cite an unusual study or data point, find a new angle ('most posts say X — but here's why X is wrong'), use a specific story or case study, combine two unrelated ideas.", category: "behavioral" }
    ],
    projects: [
      { name: "Niche Blog (5 Posts)", desc: "Pick a topic you genuinely know about (college life, a hobby, a local issue). Write 5 posts of 800-1200 words each, properly formatted with headings, images, and an SEO-friendly title. Publish on Medium or Blogger.", tech: ["Medium / WordPress", "Canva", "Grammarly", "Google Keyword Planner"], time: "3–4 weeks" },
      { name: "Brand Content Kit", desc: "Choose a local business (restaurant, NGO, startup). Write: 1 About Us page, 3 Instagram captions, 1 email newsletter, 1 product description, and 1 press release. Compile into a professional portfolio PDF.", tech: ["Google Docs", "Canva", "Grammarly"], time: "2 weeks" },
      { name: "Email Welcome Sequence", desc: "Write a 5-email onboarding sequence for a fictional SaaS product. Each email has a specific goal: welcome, feature highlight, case study, FAQ, upsell. Focus on conversational tone and clear CTAs.", tech: ["Google Docs", "Mailchimp (free)", "Hemingway App"], time: "1 week" }
    ],
    linkedin: {
      frequency: "Twice per week", days: "Tuesday and Thursday", weeklyTarget: 2,
      topics: ["Writing tip or technique with example", "Published piece announcement with key takeaway", "Reading recommendation with your insight", "Behind-the-scenes of your writing process"],
      hashtags: "#ContentWriting #Copywriting #SEO #Freelancing #Writing #ContentMarketing",
      tip: "Your LinkedIn posts ARE your writing portfolio. Every post you publish shows your voice and ability. Write 2 posts/week consistently for 3 months — you'll get your first inbound client inquiry. Quality > quantity.",
      samplePost: "📝 The writing mistake that costs writers 80% of their readers:\n\nStarting with 'In this article, I will explain...'\n\nNobody wants to read a table of contents. They want the PROMISE.\n\nInstead, try:\n'Here's the one editing tip that made my articles rank on page 1.'\n\nHook them first. Explain second.\n\n#ContentWriting #Writing #Copywriting"
    },
    resumeTips: [
      "Skills: SEO Writing, Blog Content, Copywriting, Email Marketing, Research, Editing, Grammarly, WordPress",
      "Portfolio: Include 5-7 live samples on Contently, Journo Portfolio, or a personal website — not PDFs",
      "Certifications: HubSpot Content Marketing (free), Semrush SEO Writing (free), Coursera Creative Writing",
      "Quantify: 'Blog post ranked #3 on Google for target keyword' or 'Newsletter achieved 42% open rate'"
    ],
    useCases: [
      "Every tech startup (Razorpay, Freshworks) has a content team writing blog posts to drive SEO traffic and establish thought leadership",
      "E-commerce giants like Amazon/Flipkart employ content writers for thousands of product descriptions daily",
      "EdTech platforms (Unacademy, Vedantu) hire content writers to create course material and marketing content"
    ]
  },
  {
    id: "uiux", name: "UI/UX Design", Icon: Palette,
    color: "#E91E8C", lightBg: "#FDE8F4",
    description: "Design intuitive digital experiences that users love and businesses value",
    roadmap: [
      { phase: "Phase 1: Design Principles", duration: "3–4 weeks", topics: ["Visual hierarchy & typography", "Color theory & spacing", "Design fundamentals — frames, components", "Gestalt principles (proximity, similarity)"], useCase: "Even a beautiful product fails if users can't figure out how to use it — UX solves this.", milestone: "Recreate an existing app screen from scratch" },
      { phase: "Phase 2: UX Research & Process", duration: "4–5 weeks", topics: ["User personas & empathy maps", "User journey mapping", "Wireframing — low to high fidelity", "Usability testing basics"], useCase: "Companies spend millions on redesigns — UX researchers help companies fix problems before launch, not after.", milestone: "Conduct 3 user interviews and create a journey map for a real app" },
      { phase: "Phase 3: Prototyping & Design Systems", duration: "4–6 weeks", topics: ["Interactive prototyping & interactions", "Auto-layout & component variants", "Design system basics: tokens, components", "Accessibility in design (WCAG)"], useCase: "Interactive prototypes are used at Google, Airbnb, Spotify — knowing them deeply is non-negotiable for a design job.", milestone: "Build a complete app prototype with 10+ screens and a mini design system" },
      { phase: "Phase 4: Portfolio & Case Studies", duration: "3–4 weeks", topics: ["Portfolio website on Behance or Framer", "Writing a UX case study (problem→solution→result)", "Design critique skills", "Interview preparation for portfolio review"], useCase: "A strong Behance/Dribbble portfolio gets more interviews than a great resume alone.", milestone: "Publish 2 complete UX case studies showing research + design process" }
    ],
    questions: [
      { q: "Tell me about yourself and what drew you to UX/UI design.", a: "Mention: what frustrates you about poorly designed products (specific example), a design that inspired you (what made it work), your design tool of choice, and the kind of UX problems you want to solve.", category: "hr" },
      { q: "Walk me through your design process from brief to final design.", a: "Show a structured process: Understand (read brief, ask questions) → Research (user interviews, competitor analysis) → Define (problem statement, personas) → Ideate (sketches, wireframes) → Prototype (Figma) → Test (usability testing) → Iterate.", category: "hr" },
      { q: "How do you handle disagreement between you and a developer about a design decision?", a: "Have a data-first mindset: 'Let's test both options with users' or 'Here's the user research that supports this decision.' Respect technical constraints — ask 'What's the easiest way to achieve the intended user experience?'", category: "hr" },
      { q: "What is the difference between UX and UI design?", a: "UX (User Experience): the overall experience — how intuitive, useful, accessible is the product? Involves research, wireframes, user flows, testing. UI (User Interface): how it looks — colors, typography, icons, visual hierarchy. Both are needed; they're different skills.", category: "hr" },
      { q: "How do you design for accessibility?", a: "Use color contrast ratio ≥ 4.5:1, don't rely on color alone to convey info, provide text alternatives for images (alt text), ensure touch targets are 44x44px minimum, support screen readers with semantic structure.", category: "hr" },
      { q: "What is a user persona and why do designers create them?", a: "A semi-fictional character based on real user research — name, age, goals, frustrations, behaviors. Personas keep the team aligned on WHO they're designing for. Prevents designing for 'yourself' or imaginary average users.", category: "technical" },
      { q: "What are Gestalt principles and how do they apply to UI design?", a: "Gestalt: how the brain groups visual elements. Key ones: Proximity (close things seem related → group related form fields), Similarity (similar things seem related → consistent button styles), Continuity (eye follows lines → good for flow/navigation), Closure (brain completes incomplete shapes → icon design).", category: "technical" },
      { q: "What is the difference between wireframing and prototyping?", a: "Wireframe: basic structural layout — boxes, text, no color. Like a blueprint. Quick to make, easy to change. Prototype: an interactive mockup that simulates real app behavior (clickable, animated). Used for usability testing.", category: "technical" },
      { q: "Explain the concept of visual hierarchy in UI design.", a: "Visual hierarchy guides the user's eye through the page in order of importance. Techniques: size (bigger = more important), contrast, weight (bold), color (saturated = attention-grabbing), whitespace (isolated elements draw attention), position (top-left first in F-pattern reading).", category: "technical" },
      { q: "What is a design system and why do companies use them?", a: "A design system is a collection of reusable components (buttons, inputs, cards), design tokens (colors, spacing, typography), and guidelines. Ensures consistency across all products. Examples: Google Material Design, Apple Human Interface Guidelines, Atlassian Design System.", category: "technical" },
      { q: "Walk me through one of your UX case studies.", a: "Structure: 1) Problem (who's affected, what's the pain point), 2) Research (methods, findings), 3) Definition (problem statement, persona), 4) Design (iterations, key decisions), 5) Result (usability test outcome, improved metrics). Show process, not just final screens.", category: "behavioral" },
      { q: "How do you conduct usability testing on a tight timeline?", a: "Guerrilla testing: 5 users in a coffee shop or over a video call (Maze.co is free). Give them tasks, don't help, observe where they get stuck. Even 5 users reveal 85% of usability issues. Identify top 3 problems and fix them first.", category: "behavioral" },
      { q: "A design you worked hard on gets rejected by stakeholders. How do you respond?", a: "Don't take it personally — ask 'Which specific aspect doesn't work for your needs?' Understand if it's aesthetic preference, business constraint, or technical limitation. Clarify success criteria upfront next time. Come back with 3 revised options, not 1.", category: "behavioral" }
    ],
    projects: [
      { name: "Mobile App Redesign", desc: "Choose a poorly designed app (government apps are goldmines). Document current UX problems with screenshots. Create 5 improved screens using design tools and a clean layout. Write a 300-word case study explaining your decisions.", tech: ["Sketching", "Wireframes", "Maze.co (free)"], time: "2 weeks" },
      { name: "Restaurant Ordering App", desc: "Design a complete food ordering flow: browse menu → add to cart → checkout → confirmation. Include 8-10 screens, a consistent color system, icons, and a clickable prototype. Perfect for portfolio.", tech: ["UI design", "Unsplash (free photos)", "Iconify"], time: "2–3 weeks" },
      { name: "Design System Starter Kit", desc: "Build a mini design system with semantic color naming, typography scale (6 levels), and 10 reusable components (button variants, input, card, badge, avatar). Document usage guidelines.", tech: ["Design tokens", "Wireframes"], time: "2 weeks" }
    ],
    linkedin: {
      frequency: "3 times per week", days: "Monday, Wednesday, Saturday", weeklyTarget: 3,
      topics: ["UI design breakdown of a popular app", "UX principle explained visually", "Work in progress / design process reel", "Your take on a recent product redesign"],
      hashtags: "#UIUX #UIDesign #UXDesign #ProductDesign #DesignThinking",
      tip: "Show your design process, not just final screens. A post showing your messy wireframe → polished UI gets 5x more saves than just the final design. Process shows skill. Product shows taste. Both matter.",
      samplePost: "🎨 Before vs After: I redesigned the government IRCTC app booking flow.\n\nCurrent problems:\n→ 12 steps to book a ticket (should be 5)\n→ No visual hierarchy on results page\n→ Font too small on mobile\n\nMy redesigned version:\n→ 5 clean steps\n→ Key info hierarchy: train name → time → price\n→ Accessible font sizes throughout\n\nPrototype link 👇 [link]\n\n#UXDesign #UIRedesign"
    },
    resumeTips: [
      "Skills: Wireframing, Prototyping, User Research, Usability Testing, Design Systems, Accessibility, Adobe XD",
      "Portfolio: Behance or a personal Framer/Webflow site — ALWAYS include a case study showing your process, not just final screens",
      "Certifications: Google UX Design Certificate (Coursera, free audit), Interaction Design Foundation (affordable)",
      "Show impact: 'Redesign reduced task completion time by 35% in usability testing' beats 'I designed an app'"
    ],
    useCases: [
      "Swiggy's seamless ordering flow is the work of a 20+ person UX team — every tap and scroll is intentional",
      "Paytm's payment flow was completely redesigned after user research showed 60% of users abandoned at checkout",
      "CRED hires UX designers specifically to make financial products feel premium and delightful — not just functional"
    ]
  },
  {
    id: "cybersecurity", name: "Cybersecurity", Icon: Shield,
    color: "#E74C3C", lightBg: "#FDEBEA",
    description: "Protect systems and data from cyber threats and vulnerabilities",
    roadmap: [
      { phase: "Phase 1: Networking & OS Basics", duration: "5–7 weeks", topics: ["TCP/IP, DNS, HTTP/HTTPS basics", "Linux command line essentials", "How firewalls and VPNs work", "OSI model layers"], useCase: "You can't defend what you don't understand — every security role requires networking fundamentals.", milestone: "Set up a Linux VM and navigate entirely via command line" },
      { phase: "Phase 2: Security Concepts", duration: "4–6 weeks", topics: ["CIA triad: Confidentiality, Integrity, Availability", "Common attack types: phishing, SQL injection, XSS, MitM", "Authentication: passwords, MFA, OAuth", "Vulnerability scanning with Nmap (legal)"], useCase: "India reported 13.91 lakh cybersecurity incidents in 2022 — trained professionals are critically needed.", milestone: "Complete 5 beginner rooms on TryHackMe (free platform)" },
      { phase: "Phase 3: Ethical Hacking Basics", duration: "6–8 weeks", topics: ["OWASP Top 10 vulnerabilities", "Burp Suite basics (free edition)", "Web app security testing", "CTF challenges on PicoCTF / HackTheBox"], useCase: "Ethical hackers (penetration testers) are paid to break into systems legally — then help fix them.", milestone: "Complete your first CTF challenge and document your approach" },
      { phase: "Phase 4: Certs & Career Prep", duration: "4–6 weeks", topics: ["CompTIA Security+ preparation", "SOC analyst role understanding", "Incident response basics", "Building a home lab with VirtualBox"], useCase: "Security+ certified analysts start at ₹6-15 LPA in India; OSCP holders earn significantly more.", milestone: "Pass CompTIA Security+ exam OR complete TryHackMe SOC Level 1 path" }
    ],
    questions: [
      { q: "Tell me about yourself and what drew you to cybersecurity.", a: "Mention a specific moment (a news story about a breach? a CTF you tried?), what area interests you (ethical hacking? blue team? security analysis?), and what you've done to prepare (TryHackMe, home lab, certs).", category: "hr" },
      { q: "What would you do if you discovered a vulnerability in a company's system during your first week?", a: "Never exploit it or show others first. Document it thoroughly, report immediately to your supervisor/security manager through proper channels. If it's critical, escalate urgently. Follow responsible disclosure — document everything in writing.", category: "hr" },
      { q: "How do you stay updated with the latest security threats?", a: "Follow: SANS Internet Stormcenter, Krebs on Security blog, CVE database (cve.mitre.org), CERT-IN advisories (India), r/netsec on Reddit, subscribe to vendor security advisories. Threat intelligence is a daily habit in this field.", category: "hr" },
      { q: "Explain the CIA triad.", a: "Confidentiality: only authorized users access data (encryption, access controls). Integrity: data isn't altered without authorization (hashing, checksums, audit logs). Availability: systems work when needed (redundancy, DDoS protection, backups). All three must be balanced.", category: "technical" },
      { q: "What is SQL injection and how is it prevented?", a: "SQL injection: attacker inserts malicious SQL code via input fields to manipulate the database. Example: entering ' OR '1'='1 in a login form might bypass authentication. Prevention: use parameterized queries (prepared statements), input validation, WAF, principle of least privilege on DB accounts.", category: "technical" },
      { q: "What is the difference between symmetric and asymmetric encryption?", a: "Symmetric: same key encrypts and decrypts (AES) — fast, but key sharing is risky. Asymmetric: public key encrypts, private key decrypts (RSA, ECC) — used in SSL/TLS and email. HTTPS uses asymmetric to securely share a symmetric key, then uses symmetric for speed.", category: "technical" },
      { q: "What is a man-in-the-middle (MitM) attack?", a: "Attacker intercepts communication between two parties without their knowledge. Example: on public WiFi, attacker intercepts your bank login. Prevention: always use HTTPS (check the padlock), use a VPN on public networks, certificate pinning in mobile apps.", category: "technical" },
      { q: "What is a penetration test and what are its phases?", a: "Pentest = authorized simulated cyberattack to find vulnerabilities. Phases: 1) Reconnaissance (gather info), 2) Scanning/Enumeration (find open ports, services), 3) Exploitation (attempt to breach), 4) Post-exploitation (assess damage), 5) Reporting (document findings + remediation steps).", category: "technical" },
      { q: "What is two-factor authentication and why is it important?", a: "2FA requires two forms of verification: something you know (password) + something you have (OTP to phone) or something you are (biometric). Even if a password is stolen, the attacker can't access the account without the second factor. Use it everywhere.", category: "technical" },
      { q: "Tell me about a CTF challenge or security lab you completed.", a: "Walk through a specific challenge: what the task was, tools you used (Nmap, Burp Suite, Wireshark), what vulnerability you found, how you exploited it (in a legal CTF environment), and what you learned. HackTheBox and TryHackMe have great beginner paths.", category: "behavioral" },
      { q: "How would you explain phishing to an elderly relative who isn't tech-savvy?", a: "Say: 'Imagine someone dressed like a bank manager comes to your door and asks for your account number. They look real but they're not. Phishing emails do the same thing — they pretend to be your bank but they're thieves. Never click links in emails; go directly to the website.' Empathy in security education is key.", category: "behavioral" },
      { q: "You see a colleague's computer is unlocked and they've stepped away. What do you do?", a: "Lock the computer (press Win+L or Ctrl+Command+Q on Mac). Don't look at anything on the screen. When your colleague returns, politely mention it and suggest enabling auto-lock after 1-2 minutes of inactivity. Make it a teachable moment, not a lecture.", category: "behavioral" }
    ],
    projects: [
      { name: "Home Security Lab", desc: "Set up VirtualBox with Kali Linux VM and a vulnerable target (Metasploitable 2 — a deliberately vulnerable VM). Practice scanning with Nmap, analyze packets with Wireshark. Document your findings in a professional security report format.", tech: ["VirtualBox", "Kali Linux", "Nmap", "Wireshark"], time: "2–3 weeks" },
      { name: "TryHackMe Learning Path", desc: "Complete the TryHackMe 'Pre-Security' path (free, 40 hours). Document each room with: what you learned, commands used, screenshots of flags captured. Compile into a portfolio PDF showing your practical skills.", tech: ["TryHackMe (free)", "Kali Linux", "Burp Suite Community"], time: "4–6 weeks" },
      { name: "Web App Vulnerability Report", desc: "Use DVWA (Damn Vulnerable Web Application) — a legal practice target. Test for SQL injection, XSS, and CSRF vulnerabilities. Write a professional penetration testing report with findings, severity ratings, and remediation steps.", tech: ["DVWA (free, local)", "Burp Suite Community", "Firefox DevTools"], time: "2 weeks" }
    ],
    linkedin: {
      frequency: "Twice per week", days: "Tuesday and Friday", weeklyTarget: 2,
      topics: ["CTF challenge writeup (after competition ends)", "Security news analysis: what this breach means", "Security tip for everyday users", "Your learning progress and cert journey"],
      hashtags: "#Cybersecurity #EthicalHacking #InfoSec #CyberSecurity #CTF #Security",
      tip: "Cybersecurity LinkedIn content that gets traction: explain a recent major breach simply ('What really happened in the XYZ hack'), or share CTF writeups. The community is small and tight — engage genuinely and you'll be noticed.",
      samplePost: "🔐 This week I learned about SQL Injection on TryHackMe.\n\nOne simple input: ' OR '1'='1\n\nCan bypass an entire login system if the developer didn't use parameterized queries.\n\nThis is OWASP #3 — one of the most common web vulnerabilities in real applications.\n\nFix? Always sanitize inputs and use prepared statements. Takes 5 minutes to implement. Saves everything.\n\n#Cybersecurity #WebSecurity #OWASP #EthicalHacking"
    },
    resumeTips: [
      "Skills: Network Security, Linux, Vulnerability Assessment, Nmap, Wireshark, Burp Suite, OWASP Top 10, Python basics",
      "Certifications: CompTIA Security+ (most recognized entry-level), CEH, or eJPT (eLearnSecurity, affordable)",
      "TryHackMe/HackTheBox profile: include your rank and completed rooms — these are real portfolio items",
      "Highlight: Home lab setup, CTF participation (even beginner CTFs count), any security-related projects"
    ],
    useCases: [
      "After the CoWIN portal breach exposed 150 million Indian vaccination records, the demand for security analysts in government projects surged",
      "Every bank in India (SBI, HDFC, ICICI) has a large SOC (Security Operations Center) team monitoring threats 24/7",
      "IT companies like Infosys, TCS, and Wipro have dedicated cybersecurity practices with thousands of security professionals"
    ]
  },
  {
    id: "cloud", name: "Cloud & DevOps", Icon: Cloud,
    color: "#5C6BC0", lightBg: "#ECEEFF",
    description: "Build scalable infrastructure and automate deployments with cloud tools",
    roadmap: [
      { phase: "Phase 1: Linux & Networking", duration: "4–5 weeks", topics: ["Linux command line: files, permissions, processes", "Bash scripting basics", "Networking: IP, DNS, HTTP, SSH", "Git advanced: branching, merging strategies"], useCase: "All cloud servers run Linux — you can't manage cloud infrastructure without knowing the OS.", milestone: "Automate a daily backup script using Bash and cron jobs" },
      { phase: "Phase 2: Cloud Fundamentals", duration: "5–6 weeks", topics: ["AWS / GCP / Azure free tier setup", "EC2 / Compute Engine: launch a VM", "S3 / Cloud Storage: file storage basics", "IAM: identity and access management"], useCase: "Netflix, Uber, Zomato — every major tech company runs on cloud. Cloud engineers are always in demand.", milestone: "Host a static website on AWS S3 + CloudFront CDN (free tier)" },
      { phase: "Phase 3: Containers & CI/CD", duration: "5–7 weeks", topics: ["Docker: containers, images, Docker Compose", "GitHub Actions for CI/CD pipelines", "Kubernetes basics (conceptual)", "Monitoring with CloudWatch / Grafana"], useCase: "Docker is used by 80%+ of companies — containerizing apps makes them portable across any environment.", milestone: "Dockerize a web app and deploy it via a GitHub Actions CI/CD pipeline" },
      { phase: "Phase 4: Certifications & Portfolio", duration: "4–6 weeks", topics: ["AWS Cloud Practitioner exam prep", "Terraform basics (Infrastructure as Code)", "Architecture diagrams in draw.io", "DevOps portfolio project"], useCase: "AWS Certified Cloud Practitioner + 1 project on GitHub = entry into cloud roles at ₹6-12 LPA.", milestone: "Pass AWS Cloud Practitioner OR deploy a 3-tier app architecture on AWS free tier" }
    ],
    questions: [
      { q: "Tell me about yourself and why you chose cloud/DevOps.", a: "Mention your technical background, what fascinated you about cloud (scale? automation? efficiency?), what you've hands-on experience with (AWS free tier, Docker, GitHub Actions), and your target certification.", category: "hr" },
      { q: "What is the difference between DevOps and traditional IT operations?", a: "Traditional IT: dev team builds, ops team deploys — slow, siloed, blame culture. DevOps: combined culture + practices where same team builds, tests, deploys, and monitors. Enables faster releases (daily deployments vs monthly), better reliability, shared responsibility.", category: "hr" },
      { q: "How do you handle an unexpected production outage?", a: "NEVER panic. First: acknowledge the incident internally, identify impact scope. Second: assign roles (incident commander, comms person). Third: investigate logs, metrics, recent deployments. Fourth: apply quick fix or rollback. Fifth: post-mortem with timeline and root cause after resolution.", category: "hr" },
      { q: "What is the difference between a container and a virtual machine?", a: "VM: full OS + application runs on hypervisor — heavy, takes minutes to start, gigabytes of size. Container (Docker): shares host OS kernel, only packages the app + dependencies — lightweight (MB), starts in seconds, portable anywhere Docker runs.", category: "technical" },
      { q: "Explain CI/CD and why it matters.", a: "CI (Continuous Integration): developers merge code frequently → automated tests run immediately (catching bugs early). CD (Continuous Delivery/Deployment): code automatically deploys to staging or production after passing CI. Result: faster releases, fewer bugs, less manual work.", category: "technical" },
      { q: "What is Infrastructure as Code (IaC)?", a: "Managing infrastructure (servers, networks, databases) through code rather than manual UI clicks. Tools: Terraform, AWS CloudFormation, Ansible. Benefits: version control for infrastructure, reproducible environments, no 'works on my machine' — great for team collaboration.", category: "technical" },
      { q: "What is the purpose of a load balancer?", a: "Distributes incoming traffic across multiple servers so no single server gets overwhelmed. Benefits: high availability (if one server fails, others handle traffic), horizontal scaling, health checking (routes traffic away from unhealthy instances). AWS ALB / Nginx are common choices.", category: "technical" },
      { q: "What is Kubernetes used for?", a: "Kubernetes (K8s) orchestrates Docker containers at scale — automatically: deploys containers, scales up/down based on load, restarts crashed containers, manages networking between containers, handles rolling updates with zero downtime. Overkill for small apps; essential at scale.", category: "technical" },
      { q: "What is the difference between horizontal and vertical scaling?", a: "Vertical scaling: make the server bigger (more RAM, more CPU) — has a ceiling, causes downtime. Horizontal scaling: add more servers and distribute load — no ceiling, more resilient, preferred in cloud architecture. Stateless apps scale horizontally easily.", category: "technical" },
      { q: "Walk me through how you would deploy an application to AWS.", a: "Beginner flow: 1) Containerize with Docker, 2) Push image to ECR (Elastic Container Registry), 3) Launch an EC2 instance or use ECS (managed containers), 4) Set up an Application Load Balancer, 5) Point a domain to the load balancer via Route 53, 6) Add HTTPS via ACM certificate.", category: "behavioral" },
      { q: "How do you ensure security in a cloud environment?", a: "Principle of least privilege for IAM roles. Encrypt data at rest (S3 SSE) and in transit (HTTPS/TLS). Never hardcode credentials — use AWS Secrets Manager or environment variables. Enable CloudTrail for audit logs. Use security groups as virtual firewalls. Regularly rotate access keys.", category: "behavioral" },
      { q: "Describe a time you automated a manual process.", a: "Even a simple script counts. Example: wrote a bash script to auto-backup a MySQL database to S3 every night via cron, instead of manually doing it. Saved 30 minutes daily. Show initiative to reduce toil — that's the DevOps mindset.", category: "behavioral" }
    ],
    projects: [
      { name: "Static Website on AWS S3 + CloudFront", desc: "Deploy a static website using AWS S3 for storage and CloudFront as CDN. Configure a custom domain with Route 53. Enable HTTPS with AWS Certificate Manager. All within the free tier. Document the architecture diagram.", tech: ["AWS S3", "CloudFront", "Route 53", "ACM"], time: "1–2 weeks" },
      { name: "Dockerized Web App with CI/CD", desc: "Build a simple web app, containerize it with Docker, and push the image to Docker Hub. Set up GitHub Actions to automatically build and push a new Docker image on every commit to main branch.", tech: ["Docker", "GitHub Actions", "Docker Hub"], time: "2 weeks" },
      { name: "Linux System Monitor Script", desc: "Write a bash script that monitors CPU usage, memory, disk space, and running processes. Send an email alert (using Gmail SMTP) if any metric exceeds a threshold. Schedule with cron to run every 10 minutes.", tech: ["Bash scripting", "Linux", "Cron", "Gmail SMTP"], time: "1 week" }
    ],
    linkedin: {
      frequency: "Twice per week", days: "Monday and Thursday", weeklyTarget: 2,
      topics: ["Cloud architecture diagram with explanation", "CI/CD pipeline you built (with GitHub Actions workflow)", "AWS/GCP service explained simply", "Your certification journey progress update"],
      hashtags: "#Cloud #AWS #DevOps #Docker #Kubernetes #CloudComputing #CI_CD",
      tip: "Share architecture diagrams — they get massive engagement from the cloud community. Use draw.io (free) to create clean diagrams. 'How I deployed this app architecture for $0/month using AWS free tier' is LinkedIn gold.",
      samplePost: "☁️ I deployed my first app to AWS today. Here's what I used:\n\n→ S3: Static file hosting ($0/month)\n→ CloudFront: CDN for fast global delivery\n→ Route 53: Custom domain routing\n→ ACM: Free HTTPS certificate\n\nTotal cost: $0 (within free tier) ✅\n\nArchitecture diagram below 👇\n\nStarting is easier than you think. One resource at a time.\n\n#AWS #Cloud #DevOps #CloudComputing"
    },
    resumeTips: [
      "Skills: AWS (EC2, S3, IAM, CloudWatch), Docker, Linux, Git, Bash scripting, GitHub Actions, Terraform basics",
      "Certifications: AWS Cloud Practitioner (most accessible cloud cert, ₹11,000 exam fee — often vouchers available)",
      "Include: AWS free tier projects with architecture diagrams — link to GitHub repo with README explaining the architecture",
      "Quantify: 'Reduced deployment time from 2 hours to 8 minutes using GitHub Actions CI/CD pipeline'"
    ],
    useCases: [
      "Flipkart processes millions of orders during Big Billion Days — their entire auto-scaling infrastructure runs on cloud",
      "IRCTC migrated to cloud to handle 13,000+ ticket booking requests per second during Tatkal opening",
      "Ola's ride-matching algorithm runs on cloud servers that auto-scale from 10x to 100x capacity during peak hours"
    ]
  },
  {
    id: "businessanalyst", name: "Business Analyst", Icon: BarChart2,
    color: "#F39C12", lightBg: "#FEF9E7",
    description: "Bridge the gap between business needs and technical solutions",
    roadmap: [
      { phase: "Phase 1: Business & Domain Basics", duration: "3–4 weeks", topics: ["Business fundamentals: revenue, cost, KPIs", "SDLC and Agile/Scrum methodology", "Stakeholder management basics", "Reading financial statements (P&L basics)"], useCase: "BAs work with C-suite executives AND software developers — you need to speak both languages fluently.", milestone: "Write a business requirements document (BRD) for a fictional app idea" },
      { phase: "Phase 2: Data Analysis Skills", duration: "4–5 weeks", topics: ["Excel: VLOOKUP, Pivot Tables, charts", "SQL basics: SELECT, WHERE, GROUP BY, JOIN", "Data visualization with Google Looker Studio (free)", "KPI dashboard creation"], useCase: "A BA who can pull their own data is 2x more valuable than one who always waits for a data team.", milestone: "Build a business performance dashboard in Google Looker Studio using public data" },
      { phase: "Phase 3: Requirements & Documentation", duration: "4–5 weeks", topics: ["Use case writing & user stories", "Process flow diagrams (BPMN notation)", "Functional vs non-functional requirements", "Wireframing basics with Balsamiq or other design tools"], useCase: "Poor requirements cause 70% of IT project failures — skilled BAs prevent million-dollar mistakes.", milestone: "Write a complete PRD (Product Requirements Document) for an existing app improvement" },
      { phase: "Phase 4: Agile & Presentation", duration: "3–4 weeks", topics: ["Jira for sprint management basics", "Stakeholder presentations with data storytelling", "Business case writing", "Interview prep: case studies"], useCase: "BAs are promoted to Product Manager or Strategy roles — it's one of the fastest career growth paths.", milestone: "Lead a mock sprint planning session with student colleagues" }
    ],
    questions: [
      { q: "Tell me about yourself and why you want to be a Business Analyst.", a: "Highlight: your interest in problem-solving at the intersection of business and technology, any analytical projects (college projects, internships), tools you know (Excel, SQL, JIRA), and what business domain interests you (fintech, e-commerce, healthcare).", category: "hr" },
      { q: "How do you gather requirements from a stakeholder who doesn't know what they want?", a: "Use discovery techniques: interviews ('What problem are you trying to solve? What does success look like?'), workshops, user observations, competitor analysis. Document current-state vs desired-state. Show prototypes early to get concrete feedback.", category: "hr" },
      { q: "How do you prioritize features when everything is 'urgent'?", a: "Use MoSCoW method (Must Have, Should Have, Could Have, Won't Have) or Priority Matrix (Impact vs Effort). Always tie features to business value — 'This feature will increase revenue by X' wins over 'the CTO wants this.' Get alignment with data.", category: "hr" },
      { q: "Describe the SDLC and where a BA fits in.", a: "SDLC phases: Planning → Requirements → Design → Development → Testing → Deployment → Maintenance. BA is most active in Requirements: gather, document, validate. Also involved in Testing (UAT — user acceptance testing) and throughout as the link between business and dev.", category: "hr" },
      { q: "What is the difference between functional and non-functional requirements?", a: "Functional: what the system DOES ('User can reset password via email'). Non-functional: how the system PERFORMS ('Password reset email delivered within 30 seconds, system handles 10,000 concurrent users'). Both are critical — many projects fail on non-functional requirements.", category: "technical" },
      { q: "What is a use case and how do you write one?", a: "Use case describes an interaction between a user (actor) and the system to achieve a goal. Components: Title, Actor, Precondition, Main Flow (steps), Alternative Flows (edge cases), Postcondition. Example: 'User logs in' — actor: registered user, main flow: enter email → enter password → dashboard shown.", category: "technical" },
      { q: "What is Agile and how does a BA work in an Agile team?", a: "Agile: iterative development in 2-week sprints. BA role: refine product backlog with Product Owner, write detailed user stories for sprint planning, clarify requirements during development, participate in sprint reviews and retrospectives, manage stakeholder expectations throughout.", category: "technical" },
      { q: "How do you use SQL as a Business Analyst?", a: "BAs use SQL to: validate data integrity, answer ad-hoc business questions ('How many users signed up this month?'), understand data structures before writing requirements, verify that developers built what was requested. You don't need advanced SQL — SELECT, WHERE, JOIN, GROUP BY covers 90% of BA SQL needs.", category: "technical" },
      { q: "What is gap analysis?", a: "Comparing current state ('as-is') vs desired state ('to-be') to identify the gaps that need to be addressed. Template: Current Situation → Desired Outcome → Gap → Action Plan. Used to prioritize process improvements or system changes.", category: "technical" },
      { q: "Walk me through a business problem you analyzed and solved.", a: "Use STAR method: Situation (the business problem), Task (your role), Action (how you gathered info, what tools you used, how you analyzed), Result (what changed, quantified if possible). Even a college project or mock case study counts.", category: "behavioral" },
      { q: "How do you handle conflict between two stakeholders with opposing requirements?", a: "First, understand each person's underlying need (not just their stated position). Find common ground in shared goals. Present trade-offs objectively with data. Escalate to a decision-maker only if needed. Document the agreed decision in writing so there's no ambiguity later.", category: "behavioral" },
      { q: "How do you ensure that what developers built matches what was required?", a: "Write clear acceptance criteria for every user story (Given/When/Then format). Participate in sprint demos. Lead User Acceptance Testing (UAT) with business stakeholders. Create a requirements traceability matrix to track which requirements are covered by which features.", category: "behavioral" }
    ],
    projects: [
      { name: "Process Flow & BRD for an App Feature", desc: "Pick any existing app feature (e.g., Swiggy's order tracking). Document the current user journey, identify pain points, write a Business Requirements Document for an improvement, and create a process flow diagram using draw.io or Lucidchart (free).", tech: ["draw.io (free)", "Google Docs", "Excel"], time: "2 weeks" },
      { name: "Business KPI Dashboard", desc: "Use Google Looker Studio (free) to build a business performance dashboard using any public dataset (e.g., e-commerce sales data from Kaggle). Include revenue trends, top products, conversion rates. Present with a 5-slide business story.", tech: ["Google Looker Studio", "Google Sheets", "Excel"], time: "2 weeks" },
      { name: "User Story Writing Workshop", desc: "Take a problem statement (e.g., 'Students want to find study groups easily') and write 10 user stories with acceptance criteria (Given/When/Then), prioritize them using MoSCoW, and create a mock sprint backlog in Trello (free).", tech: ["Trello (free)", "Google Docs", "draw.io"], time: "1 week" }
    ],
    linkedin: {
      frequency: "Twice per week", days: "Wednesday and Friday", weeklyTarget: 2,
      topics: ["BA concept explained simply (user story, gap analysis)", "Case study analysis of a product decision", "Career path from BA to Product Manager", "Tools every BA should know"],
      hashtags: "#BusinessAnalysis #BA #ProductManagement #Agile #BusinessAnalyst #DataDriven",
      tip: "BAs who share case study analyses ('Why I think Paytm made this design decision') position themselves as strategic thinkers. 'Here's how I would have gathered requirements for this product' shows your thinking process — recruiters love it.",
      samplePost: "📋 Most BAs write user stories like this:\n'As a user, I want to search for products.'\n\nThe problem? Zero clarity for developers.\n\nBetter format (with acceptance criteria):\n\n✅ Given: I am on the homepage\n✅ When: I type in the search bar\n✅ Then: I see relevant results within 2 seconds\n✅ AND: Zero results page shows alternatives\n\nGood requirements prevent bad software.\n\n#BusinessAnalysis #Agile #ProductManagement #BA"
    },
    resumeTips: [
      "Skills: Requirements Gathering, User Stories, Process Mapping, SQL, Excel (Pivot Tables), JIRA, Agile/Scrum, Stakeholder Management",
      "Certifications: ECBA (IIBA entry-level BA cert), CBAP eventually, Agile Scrum Master (Scrum.org free course)",
      "Show deliverables: 'Documented 40+ user stories for payment module' or 'Led UAT for mobile app launch with 0 critical defects post-release'",
      "Include: Familiar with draw.io, Confluence, JIRA, Balsamiq, SQL, Google Analytics, Looker Studio"
    ],
    useCases: [
      "Every large IT project (bank system upgrade, government portal) has BAs translating business needs to technical specs — without them, projects fail",
      "PhonePe's BA team defines requirements for every new payment feature before any developer writes a single line of code",
      "Consulting firms like Accenture, Deloitte, TCS iON hire freshers as Business Analysts — one of the highest-volume entry-level tech hiring categories"
    ]
  },
  {
    id: "graphicdesign", name: "Graphic Design", Icon: PenTool,
    color: "#9B59B6", lightBg: "#F5EEF8",
    description: "Create stunning visual communications for brands, marketing, and media",
    roadmap: [
      { phase: "Phase 1: Design Principles", duration: "3–4 weeks", topics: ["Typography: font pairing & hierarchy", "Color theory: complementary, analogous, triadic", "Composition: rule of thirds, balance, contrast", "Canva for quick social media designs"], useCase: "Every business needs visual identity — logos, social posts, ads, packaging. Designers are everywhere.", milestone: "Create 5 social media posts for a fictional brand with consistent visual identity" },
      { phase: "Phase 2: Professional Tools", duration: "5–7 weeks", topics: ["Adobe Illustrator basics: vectors, pen tool", "Adobe Photoshop basics: layers, masks, retouching", "Logo design principles", "Brand identity systems"], useCase: "Illustrator and Photoshop are industry standard — even free tools like Inkscape/GIMP follow the same principles.", milestone: "Design a complete logo + brand kit (colors, fonts, logo variations) for a fictional company" },
      { phase: "Phase 3: Applied Design", duration: "4–6 weeks", topics: ["Social media template systems", "Brochure & poster design", "Infographic design", "Print vs digital design differences"], useCase: "Agencies charge ₹5,000–50,000 per brand project — and outsource to skilled freelance designers.", milestone: "Create a complete marketing kit: social media template set + A4 brochure + business card design" },
      { phase: "Phase 4: Portfolio & Freelance", duration: "3–4 weeks", topics: ["Portfolio on Behance / Dribbble", "Client communication & briefing", "Pricing your design work", "Fiverr/Upwork gig setup"], useCase: "Graphic designers with a strong Behance portfolio get approached by clients without applying to a single job.", milestone: "Publish 5 portfolio pieces on Behance and create your first Fiverr gig" }
    ],
    questions: [
      { q: "Tell me about yourself and what drew you to graphic design.", a: "Share a specific visual that inspired you — a logo, a poster, a brand identity. Talk about what tools you use, what kind of design you love (branding? motion? editorial?), and share your Behance/portfolio link.", category: "hr" },
      { q: "How do you handle a client who keeps asking for 'just one more change'?", a: "Prevention > cure: define revision rounds upfront in your brief (e.g., '2 revision rounds included'). For ongoing scope creep: be kind but firm — 'I'd be happy to make this change; it falls outside our agreed scope, so there will be an additional charge of ₹X.'", category: "hr" },
      { q: "What makes a great logo design?", a: "Great logos are: Simple (works at any size, even 16x16px favicon), Memorable (distinct, unexpected), Versatile (works in black/white, on light and dark backgrounds), Timeless (avoids trendy fonts that date quickly), Appropriate (fits the brand's industry and personality).", category: "hr" },
      { q: "Explain the difference between vector and raster graphics.", a: "Vector: mathematical paths (Illustrator, SVG) — infinitely scalable without quality loss. Use for logos, icons, illustrations. Raster: pixel-based (Photoshop, JPEG, PNG) — loses quality when scaled up. Use for photos, detailed textures. Always design logos in vector format.", category: "technical" },
      { q: "What is CMYK vs RGB and when do you use each?", a: "RGB: Red, Green, Blue — for screens (website banners, social media, apps). Colors are light-based, more vibrant. CMYK: Cyan, Magenta, Yellow, Key/Black — for print (business cards, brochures). Colors are ink-based, can appear duller. Always design for print in CMYK to avoid color surprises.", category: "technical" },
      { q: "What is visual hierarchy and how do you create it?", a: "Visual hierarchy guides where the eye travels first, second, third. Create it through: Size (big = important), Weight (bold = emphasis), Color (saturated/contrasting = attention), Spacing (whitespace isolates and elevates), Position (top and center = primary). Headers > subheadings > body text is the classic example.", category: "technical" },
      { q: "What is white space and why do professional designers value it?", a: "White space (negative space) is the empty area around design elements. It's not wasted — it gives elements room to breathe, increases readability, signals premium quality (luxury brands use tons of whitespace), and reduces cognitive load. Cluttered design = amateur design.", category: "technical" },
      { q: "How do you choose fonts for a brand?", a: "Match font personality to brand personality: Serif = tradition, trust, authority (banks, law firms). Sans-serif = modern, clean, friendly (tech startups). Script = elegance, creativity (fashion, wedding). Always pair a display font (headers) with a readable body font. Limit to 2-3 fonts max.", category: "technical" },
      { q: "Walk me through your design process for a new project.", a: "1) Brief: understand goals, audience, deliverables. 2) Research: competitor designs, industry norms, target audience preferences. 3) Mood board: collect visual references (Pinterest). 4) Sketches: rough ideas on paper. 5) Digital execution: Illustrator/Photoshop. 6) Feedback and iteration. 7) Final delivery in required formats.", category: "behavioral" },
      { q: "How do you take creative criticism?", a: "Separate your ego from your work. Ask 'What specific element isn't working for you?' vs defending it. Understand the WHY behind the feedback. Offer 2-3 alternative directions rather than one defensive revision. Good design is solving a communication problem — not expressing your personal taste.", category: "behavioral" },
      { q: "How do you ensure your designs look great across different media?", a: "Get clear on deliverables before starting: print? social? web? Use correct color mode (CMYK for print, RGB for screen), correct resolution (300dpi for print, 72-150dpi for web), correct dimensions. Export in multiple formats (AI/SVG for vector, PNG/PDF for delivery).", category: "behavioral" }
    ],
    projects: [
      { name: "Brand Identity Kit", desc: "Design a complete visual identity for a fictional local business (cafe, gym, bookstore). Include: primary logo + variations, color palette (3-5 colors), 2 font pairings, and mockups on business card + social media. Present as a Behance case study.", tech: ["Canva Pro (free trial) / Adobe Illustrator", "Mockup World (free mockups)", "Behance"], time: "2–3 weeks" },
      { name: "Social Media Template Pack", desc: "Create a set of 10 editable social media templates for Instagram (post + story format) for a beauty or lifestyle brand. Maintain consistent visual identity across all templates. Export as editable Canva templates.", tech: ["Canva", "Adobe Illustrator", "Pinterest (moodboard)"], time: "1–2 weeks" },
      { name: "Infographic Design", desc: "Turn a complex topic (climate change data, mental health statistics, career roadmap) into a visually clear and engaging infographic. Focus on data hierarchy, icons, and visual flow. Publish on Pinterest and LinkedIn.", tech: ["Canva / Adobe Illustrator", "Piktochart (free)", "Freepik (free icons)"], time: "1 week" }
    ],
    linkedin: {
      frequency: "3 times per week", days: "Monday, Wednesday, Saturday", weeklyTarget: 3,
      topics: ["Before/after brand redesign with explanation", "Design tip or principle illustrated visually", "Your work in progress or completed project showcase", "Brand dissection: what makes this logo/identity work"],
      hashtags: "#GraphicDesign #Branding #LogoDesign #VisualIdentity #Design #Canva #Illustrator",
      tip: "Show before/after transformations — they perform exceptionally well. 'I redesigned this brand in 3 hours — here's what I changed and why' drives thousands of impressions. Your portfolio posts ARE your job applications on LinkedIn.",
      samplePost: "🎨 I redesigned a local cafe's logo for free as a portfolio project.\n\nOld logo: Comic Sans, clip art cup, 4 competing colors.\n\nNew logo: Clean wordmark, custom coffee cup icon, 2-color palette.\n\nWhat I focused on:\n→ Scalability (looks great on cups + signage)\n→ Warmth without clutter\n→ Works in black/white too\n\nFull case study on Behance 👇 [link]\n\n#GraphicDesign #LogoDesign #Branding"
    },
    resumeTips: [
      "Skills: Adobe Illustrator, Adobe Photoshop, Canva, Typography, Color Theory, Brand Identity Design, Social Media Design",
      "Portfolio: Behance is non-negotiable — include case studies that explain your thinking, not just final images",
      "Add: Familiar with digital product handoff, Mockup creation, InDesign for print layouts",
      "Quantify: 'Designed 50+ social media posts increasing brand engagement by 80%' or 'Created complete brand identity delivered in 72 hours'"
    ],
    useCases: [
      "Every D2C brand (boAt, Mama Earth, WOW Skin) needs graphic designers for packaging, social media, and ad creative — continuously",
      "Ad agencies (Ogilvy, Leo Burnett, Dentsu) hire entry-level designers for client campaigns — portfolio is more important than degree",
      "Instagram and YouTube creators hire graphic designers for thumbnails, channel art, and merchandise — a growing freelance market"
    ]
  }
];

// ─── Resume Tips (General) ───────────────────────────────────────────────────

const GENERAL_RESUME_TIPS = [
  { section: "Contact Info", tip: "Use a professional email (firstname.lastname@gmail.com). Include: LinkedIn URL, GitHub/Portfolio link, city & state (no full address needed), phone number.", icon: "📧" },
  { section: "Professional Summary", tip: "2-3 sentences: Who you are → What you bring → What you're looking for. Example: 'Final-year CSE student with hands-on experience in React and Node.js, seeking a backend developer role to contribute to scalable APIs.'", icon: "✍️" },
  { section: "Skills Section", tip: "Group by category: Technical Skills | Soft Skills | Tools. Use keywords from job descriptions (ATS scan for exact matches). Don't list 'MS Word' — everyone knows that.", icon: "🔧" },
  { section: "Projects Section", tip: "For each project: Name | Tech Stack | Live Link + GitHub. One-line description of WHAT it does. One-line impact: '500+ users' or 'Reduced processing time by 30%'.", icon: "💼" },
  { section: "Education", tip: "Include: Degree, College Name, CGPA (if above 7.0/8.5 or class equivalent), Graduation Year. Add: Relevant coursework, academic achievements, or projects done in college.", icon: "🎓" },
  { section: "ATS Optimization", tip: "ATS (Applicant Tracking System) filters resumes before a human sees them. Use standard section headings (not creative ones). Use text (not tables/images/columns). Mirror keywords from the job description.", icon: "🤖" },
  { section: "Formatting Rules", tip: "1 page for freshers (max 2 for 3+ years exp). Use a clean font: Calibri, Arial, or Garamond — 11-12pt for body, 14-16pt for name. Consistent spacing. PDF format always.", icon: "📄" },
  { section: "Action Verbs", tip: "Start every bullet with a strong verb: Built, Developed, Designed, Led, Implemented, Increased, Reduced, Deployed, Automated, Analyzed, Presented, Collaborated. Never start with 'Responsible for...'", icon: "⚡" }
];

// ─── Voice Interview Hook ────────────────────────────────────────────────────

function useVoice() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [supported, setSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) setSupported(false);
  }, []);

  const speak = useCallback((text: string, onEnd?: () => void) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.88;
    utterance.pitch = 1.05;
    utterance.volume = 1.0;
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v => v.lang === "en-US" && v.name.includes("Female"))
      || voices.find(v => v.lang === "en-US")
      || voices[0];
    if (preferred) utterance.voice = preferred;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => { setIsSpeaking(false); if (onEnd) onEnd(); };
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }, []);

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  const startListening = useCallback(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    const recognition = new SR();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.onresult = (e: any) => {
      const text = Array.from(e.results).map((r: any) => r[0].transcript).join("");
      setTranscript(text);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
    recognitionRef.current = recognition;
    setIsListening(true);
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) recognitionRef.current.stop();
    setIsListening(false);
  }, []);

  const resetTranscript = useCallback(() => setTranscript(""), []);

  return { isListening, isSpeaking, transcript, supported, speak, stopSpeaking, startListening, stopListening, resetTranscript };
}

// ─── Feedback Generator ──────────────────────────────────────────────────────

function generateFeedback(question: string, answer: string): { score: number; feedback: string; tips: string[] } {
  const words = answer.trim().split(/\s+/).filter(Boolean).length;
  if (words < 10) return { score: 1, feedback: "Your answer was too brief. Interviewers need more detail to evaluate you.", tips: ["Aim for at least 60-90 seconds per answer", "Use the STAR method: Situation, Task, Action, Result", "Practice speaking your answer out loud before interviews"] };
  if (words < 30) return { score: 2, feedback: "You've started well, but need to elaborate more with specific examples and details.", tips: ["Add a specific example or project to your answer", "Explain the WHY behind your decision, not just the WHAT", "Try to include a measurable outcome or result"] };
  const hasExample = /example|project|time|experience|built|created|worked|led|managed/i.test(answer);
  const hasResult = /result|achieve|improve|reduce|increase|success|learn|taught/i.test(answer);
  const score = words > 80 && hasExample && hasResult ? 5 : words > 50 && (hasExample || hasResult) ? 4 : 3;
  const tips = [
    !hasExample ? "Add a specific real-world example from your projects or experience" : "Great use of examples!",
    !hasResult ? "Mention the outcome or what you learned from the situation" : "Strong result mentioned!",
    words < 60 ? "Expand slightly — aim for 60-120 words per answer" : "Good answer length!"
  ];
  return { score, feedback: score >= 4 ? "Excellent answer! You covered the key points effectively." : "Good answer. Add more specifics to make it memorable.", tips };
}

// ─── Utility Components ──────────────────────────────────────────────────────

function StarRating({ score, max = 5 }: { score: number; max?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star key={i} size={16} className={i < score ? "fill-yellow-400 text-yellow-400" : "text-gray-200"} />
      ))}
    </div>
  );
}

function Badge({ children, color = "bg-muted text-muted-foreground" }: { children: React.ReactNode; color?: string }) {
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${color}`}>{children}</span>;
}

function SectionHeader({ title, subtitle, accent }: { title: string; subtitle?: string; accent?: string }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-1">
        {accent && <span className="inline-block w-3 h-3 rounded-full" style={{ background: accent }} />}
        <h2 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{title}</h2>
      </div>
      {subtitle && <p className="text-muted-foreground text-sm">{subtitle}</p>}
    </div>
  );
}

// ─── Navigation ──────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: "home", label: "Home", Icon: Home },
  { id: "hr", label: "HR Round", Icon: Mic },
  { id: "questions", label: "Questions", Icon: BookOpen },
  { id: "career", label: "Career Mate", Icon: Brain },
  { id: "linkedin", label: "LinkedIn", Icon: LinkedinIcon },
  { id: "resume", label: "Resume", Icon: FileText },
];

// ─── Home Page ────────────────────────────────────────────────────────────────

function HomePage({ onNavigate, selectedDomain, onSelectDomain }: {
  onNavigate: (page: string) => void;
  selectedDomain: DomainData | null;
  onSelectDomain: (d: DomainData) => void;
}) {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden p-8 md:p-10" style={{ background: "linear-gradient(135deg, #1B1B2F 0%, #2D2D50 60%, #1B1B2F 100%)" }}>
        <div className="absolute top-4 right-4 w-24 h-24 rounded-full opacity-10" style={{ background: "#FF6B35" }} />
        <div className="absolute bottom-2 right-16 w-14 h-14 rounded-full opacity-10" style={{ background: "#4CC9F0" }} />
        <div className="absolute top-16 right-32 w-8 h-8 rotate-45 opacity-10" style={{ background: "#FF6B35" }} />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4" style={{ background: "rgba(255,107,53,0.2)", color: "#FF8C60" }}>
            <Sparkles size={12} /> AI-Powered Placement Prep — 100% Free
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3 leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Your Complete<br />
            <span style={{ color: "#FF6B35" }}>Placement Preparation</span><br />
            Hub
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-lg mb-6">
            Domain-based roadmaps, AI voice mock interviews, interview questions, LinkedIn strategy, resume tips — everything you need to get placed.
          </p>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => onNavigate("hr")} className="px-5 py-2.5 rounded-xl text-sm font-bold text-white flex items-center gap-2 transition-all hover:scale-105" style={{ background: "#FF6B35" }}>
              <Mic size={16} /> Start Mock Interview
            </button>
            <button onClick={() => onNavigate("career")} className="px-5 py-2.5 rounded-xl text-sm font-bold border border-white/20 text-white flex items-center gap-2 hover:bg-white/10 transition-all">
              <Target size={16} /> View Roadmap
            </button>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
          { icon: Mic, label: "Voice HR Interview", desc: "Practice with AI interviewer", page: "hr", color: "#FF6B35" },
          { icon: BookOpen, label: "Interview Questions", desc: "1000+ domain Q&As", page: "questions", color: "#2D82B7" },
          { icon: Brain, label: "Career Roadmap", desc: "Phase-by-phase guide", page: "career", color: "#7B2D8B" },
          { icon: LinkedinIcon, label: "LinkedIn Coach", desc: "Domain posting strategy", page: "linkedin", color: "#2ECC71" },
          { icon: FileText, label: "Resume Tips", desc: "ATS-ready resume guide", page: "resume", color: "#E91E8C" },
          { icon: Lightbulb, label: "Beginner Projects", desc: "Real-world projects only", page: "career", color: "#F39C12" },
        ].map(({ icon: Icon, label, desc, page, color }) => (
          <button key={label} onClick={() => onNavigate(page)} className="bg-card rounded-2xl p-4 text-left border border-border hover:shadow-md transition-all hover:scale-[1.02] group">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: color + "18" }}>
              <Icon size={18} style={{ color }} />
            </div>
            <p className="font-bold text-sm text-foreground group-hover:text-primary transition-colors" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
          </button>
        ))}
      </div>

      {/* Domain Picker */}
      <div>
        <SectionHeader title="Choose Your Domain" subtitle="Select your target career to get personalized guidance" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {DOMAINS.map(domain => {
            const isSelected = selectedDomain?.id === domain.id;
            return (
              <button key={domain.id} onClick={() => onSelectDomain(domain)}
                className={`rounded-2xl p-4 text-left border-2 transition-all hover:scale-[1.02] ${isSelected ? "border-2 shadow-md" : "border-transparent bg-card hover:border-border"}`}
                style={isSelected ? { borderColor: domain.color, background: domain.lightBg } : {}}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-2" style={{ background: domain.color + "22" }}>
                  <domain.Icon size={18} style={{ color: domain.color }} />
                </div>
                <p className="font-bold text-xs text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{domain.name}</p>
                {isSelected && <div className="mt-1.5 flex items-center gap-1"><CheckCircle size={11} style={{ color: domain.color }} /><span className="text-[10px] font-semibold" style={{ color: domain.color }}>Selected</span></div>}
              </button>
            );
          })}
        </div>
        {selectedDomain && (
          <div className="mt-4 rounded-2xl p-4 flex items-center justify-between gap-4 border" style={{ background: selectedDomain.lightBg, borderColor: selectedDomain.color + "40" }}>
            <div>
              <p className="font-bold text-sm" style={{ color: selectedDomain.color }}>Domain selected: {selectedDomain.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{selectedDomain.description}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => onNavigate("career")} className="px-4 py-2 rounded-xl text-xs font-bold text-white transition-all hover:opacity-90" style={{ background: selectedDomain.color }}>
                View Roadmap <ArrowRight size={12} className="inline ml-1" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { value: "10", label: "Career Domains", icon: Globe },
          { value: "130+", label: "Interview Questions", icon: MessageSquare },
          { value: "30+", label: "Beginner Projects", icon: Code2 },
          { value: "Free", label: "No API Cost", icon: Zap },
        ].map(({ value, label, icon: Icon }) => (
          <div key={label} className="bg-card rounded-2xl p-4 border border-border text-center">
            <Icon size={20} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-2xl font-extrabold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{value}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── HR Round Page ─────────────────────────────────────────────────────────────

type InterviewState = "setup" | "interviewing" | "results";

function HRRoundPage({ selectedDomain, onSelectDomain }: { selectedDomain: DomainData | null; onSelectDomain: (d: DomainData) => void }) {
  const [state, setState] = useState<InterviewState>("setup");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ q: string; answer: string; score: number; feedback: string; tips: string[] }[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [category, setCategory] = useState<"hr" | "technical" | "behavioral">("hr");
  const [questionCount, setQuestionCount] = useState(5);
  const { isListening, isSpeaking, transcript, supported, speak, stopSpeaking, startListening, stopListening, resetTranscript } = useVoice();
  const [showHint, setShowHint] = useState(false);
  const [usedTyping, setUsedTyping] = useState(false);

  const domain = selectedDomain;
  const filteredQs = domain ? domain.questions.filter(q => q.category === category).slice(0, questionCount) : [];
  const currentQ = filteredQs[questionIndex];

  const speakQuestion = useCallback((q: string) => {
    speak(`Question ${questionIndex + 1}: ${q}`);
  }, [speak, questionIndex]);

  const handleStartInterview = () => {
    if (!domain || filteredQs.length === 0) return;
    setState("interviewing");
    setQuestionIndex(0);
    setAnswers([]);
    setCurrentAnswer("");
    resetTranscript();
    setTimeout(() => speakQuestion(filteredQs[0].q), 500);
  };

  useEffect(() => {
    if (isListening && transcript) setCurrentAnswer(transcript);
  }, [transcript, isListening]);

  const handleSubmitAnswer = () => {
    if (!currentQ) return;
    stopListening();
    stopSpeaking();
    const ans = currentAnswer || transcript;
    const fb = generateFeedback(currentQ.q, ans);
    const newAnswers = [...answers, { q: currentQ.q, answer: ans, ...fb }];
    setAnswers(newAnswers);
    setCurrentAnswer("");
    resetTranscript();
    setShowHint(false);
    setUsedTyping(false);
    if (questionIndex + 1 >= filteredQs.length) {
      setState("results");
    } else {
      const nextQ = filteredQs[questionIndex + 1];
      setQuestionIndex(i => i + 1);
      setTimeout(() => speak(`Next question: ${nextQ.q}`), 300);
    }
  };

  const handleRestart = () => {
    setState("setup");
    setAnswers([]);
    setQuestionIndex(0);
    setCurrentAnswer("");
    resetTranscript();
    stopSpeaking();
    stopListening();
  };

  const avgScore = answers.length ? Math.round(answers.reduce((a, b) => a + b.score, 0) / answers.length) : 0;
  const overallFeedback = avgScore >= 4 ? "Outstanding performance! You're interview-ready." : avgScore >= 3 ? "Good job! A bit more practice and you'll ace it." : "Keep practicing — consistency will build your confidence.";

  if (state === "setup") {
    return (
      <div className="space-y-6">
        <SectionHeader title="HR Mock Interview" subtitle="AI-powered voice interview practice with real-time feedback" />
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h3 className="font-bold mb-4 text-base">1. Select Your Domain</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {DOMAINS.map(d => (
              <button key={d.id} onClick={() => onSelectDomain(d)}
                className={`rounded-xl p-3 text-left border-2 transition-all text-sm font-semibold flex items-center gap-2 ${selectedDomain?.id === d.id ? "border-2" : "border-border bg-background hover:border-border"}`}
                style={selectedDomain?.id === d.id ? { borderColor: d.color, background: d.lightBg } : {}}>
                <d.Icon size={15} style={{ color: d.color }} />
                <span className="text-xs">{d.name}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h3 className="font-bold mb-4 text-base">2. Interview Type</h3>
          <div className="grid grid-cols-3 gap-3">
            {(["hr", "technical", "behavioral"] as const).map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`rounded-xl p-3 text-center border-2 transition-all ${category === cat ? "border-accent bg-accent/10 text-accent" : "border-border text-foreground hover:border-accent/40"}`}>
                <div className="text-lg mb-1">{cat === "hr" ? "🧑‍💼" : cat === "technical" ? "💻" : "🤝"}</div>
                <p className="text-xs font-bold capitalize">{cat === "hr" ? "HR" : cat} Round</p>
              </button>
            ))}
          </div>
        </div>
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h3 className="font-bold mb-4 text-base">3. Number of Questions</h3>
          <div className="flex gap-3">
            {[3, 5, (domain?.questions.filter(q => q.category === category).length || 5)].map(n => (
              <button key={n} onClick={() => setQuestionCount(n)}
                className={`flex-1 rounded-xl py-2 text-sm font-bold border-2 transition-all ${questionCount === n ? "border-accent bg-accent/10 text-accent" : "border-border hover:border-accent/40"}`}>
                {n === (domain?.questions.filter(q => q.category === category).length || 5) ? "All" : n}
              </button>
            ))}
          </div>
        </div>
        {!supported && (
          <div className="rounded-xl p-3 bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm">
            ⚠️ Voice not supported in this browser. Use Chrome/Edge for voice features. You can still type your answers.
          </div>
        )}
        <button onClick={handleStartInterview} disabled={!domain}
          className="w-full py-4 rounded-2xl font-bold text-white text-base flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ background: domain ? "#1B1B2F" : undefined }}>
          <Play size={18} /> Start Interview
        </button>
      </div>
    );
  }

  if (state === "interviewing" && currentQ) {
    const progress = ((questionIndex) / filteredQs.length) * 100;
    return (
      <div className="space-y-4 max-w-2xl mx-auto">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-muted-foreground">Question {questionIndex + 1} of {filteredQs.length}</span>
          <button onClick={handleRestart} className="text-muted-foreground hover:text-foreground transition-colors"><X size={18} /></button>
        </div>
        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: "#FF6B35" }} />
        </div>

        {/* Interviewer */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <div className="flex items-start gap-4">
            <div className={`relative w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${isSpeaking ? "animate-pulse" : ""}`} style={{ background: "#1B1B2F" }}>
              <span className="text-2xl">🧑‍💼</span>
              {isSpeaking && <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-400 border-2 border-card animate-pulse" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">AI Interviewer</span>
                {isSpeaking && <Badge color="bg-green-100 text-green-700">Speaking…</Badge>}
              </div>
              <p className="text-base font-semibold text-foreground leading-relaxed">{currentQ.q}</p>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button onClick={() => speakQuestion(currentQ.q)} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-lg bg-muted transition-all">
              <Volume2 size={12} /> Repeat Question
            </button>
            <button onClick={() => setShowHint(!showHint)} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-lg bg-muted transition-all">
              <Lightbulb size={12} /> {showHint ? "Hide" : "Show"} Hint
            </button>
          </div>
          {showHint && (
            <div className="mt-3 rounded-xl p-3 text-sm" style={{ background: "#FFF8F5", borderLeft: "3px solid #FF6B35" }}>
              <span className="font-semibold text-accent">Hint: </span>
              <span className="text-muted-foreground">{currentQ.a.substring(0, 120)}…</span>
            </div>
          )}
        </div>

        {/* User response */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <div className="flex items-center gap-2 mb-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isListening ? "animate-pulse" : ""}`} style={{ background: isListening ? "#FF6B35" : "#F0ECE6" }}>
              {isListening ? <Mic size={18} className="text-white" /> : <MicOff size={18} className="text-muted-foreground" />}
            </div>
            <span className="text-sm font-semibold">{isListening ? "Listening to your answer…" : "Your turn to answer"}</span>
            {isListening && <div className="flex gap-0.5 ml-auto">
              {[1, 2, 3, 4].map(i => <div key={i} className="w-1 rounded-full bg-accent animate-bounce" style={{ height: `${8 + i * 4}px`, animationDelay: `${i * 0.1}s` }} />)}
            </div>}
          </div>

          {supported && (
            <div className="flex gap-2 mb-3">
              {!isListening ? (
                <button onClick={() => { setUsedTyping(false); startListening(); }} className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90" style={{ background: "#FF6B35" }}>
                  <Mic size={15} /> Start Speaking
                </button>
              ) : (
                <button onClick={stopListening} className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-red-500 text-white flex items-center justify-center gap-2 hover:bg-red-600 transition-all">
                  <Square size={15} /> Stop Recording
                </button>
              )}
            </div>
          )}

          <textarea
            value={currentAnswer}
            onChange={e => { setCurrentAnswer(e.target.value); setUsedTyping(true); }}
            placeholder={supported ? "Or type your answer here if you prefer…" : "Type your answer here…"}
            rows={4}
            className="w-full rounded-xl p-3 text-sm border border-border bg-background resize-none focus:outline-none focus:ring-2 focus:ring-accent/40 font-[Nunito]"
          />

          {(currentAnswer || transcript) && (
            <div className="mt-2 text-xs text-muted-foreground">
              {(currentAnswer || transcript).split(/\s+/).filter(Boolean).length} words
            </div>
          )}

          <button onClick={handleSubmitAnswer} disabled={!currentAnswer && !transcript}
            className="w-full mt-3 py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-40"
            style={{ background: "#1B1B2F" }}>
            Submit Answer <ChevronRight size={15} />
          </button>
        </div>
      </div>
    );
  }

  if (state === "results") {
    return (
      <div className="space-y-5 max-w-2xl mx-auto">
        <div className="bg-card rounded-2xl p-6 border border-border text-center">
          <div className="text-5xl mb-3">{avgScore >= 4 ? "🏆" : avgScore >= 3 ? "💪" : "📚"}</div>
          <h2 className="text-2xl font-extrabold mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Interview Complete!</h2>
          <StarRating score={avgScore} />
          <p className="text-sm text-muted-foreground mt-2">{overallFeedback}</p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white" style={{ background: "#1B1B2F" }}>
            Overall Score: {avgScore}/5
          </div>
        </div>

        <div className="space-y-3">
          {answers.map((a, i) => (
            <div key={i} className="bg-card rounded-2xl p-5 border border-border">
              <div className="flex items-start justify-between gap-3 mb-2">
                <p className="text-sm font-semibold">Q{i + 1}: {a.q}</p>
                <StarRating score={a.score} />
              </div>
              {a.answer && <div className="rounded-xl p-3 bg-muted/50 text-xs text-muted-foreground mb-3 italic">"{a.answer.substring(0, 200)}{a.answer.length > 200 ? "…" : ""}"</div>}
              <p className="text-sm font-medium text-foreground mb-2">{a.feedback}</p>
              <div className="space-y-1">
                {a.tips.map((tip, j) => (
                  <div key={j} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="text-accent mt-0.5">→</span> {tip}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button onClick={handleRestart} className="flex-1 py-3 rounded-xl text-sm font-bold border-2 border-foreground text-foreground flex items-center justify-center gap-2 hover:bg-foreground hover:text-background transition-all">
            <RotateCcw size={15} /> Try Again
          </button>
          <button onClick={() => setState("setup")} className="flex-1 py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 hover:opacity-90 transition-all" style={{ background: "#FF6B35" }}>
            New Interview
          </button>
        </div>
      </div>
    );
  }

  return null;
}

// ─── Questions Page ───────────────────────────────────────────────────────────

function QuestionsPage({ selectedDomain, onSelectDomain }: { selectedDomain: DomainData | null; onSelectDomain: (d: DomainData) => void }) {
  const [cat, setCat] = useState<"hr" | "technical" | "behavioral">("hr");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());

  const domain = selectedDomain;
  const questions = domain ? domain.questions.filter(q => q.category === cat) : [];

  const toggleBookmark = (key: string) => {
    setBookmarked(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  };

  return (
    <div className="space-y-5">
      <SectionHeader title="Interview Questions" subtitle="Domain-specific Q&As with model answers to study and practice" />

      <div className="bg-card rounded-2xl p-4 border border-border">
        <p className="text-xs font-bold text-muted-foreground mb-2 uppercase tracking-wider">Domain</p>
        <div className="flex flex-wrap gap-2">
          {DOMAINS.map(d => (
            <button key={d.id} onClick={() => onSelectDomain(d)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold border-2 transition-all"
              style={selectedDomain?.id === d.id ? { borderColor: d.color, background: d.lightBg, color: d.color } : { borderColor: "transparent", background: "#F0ECE6", color: "#7A7267" }}>
              {d.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        {(["hr", "technical", "behavioral"] as const).map(c => (
          <button key={c} onClick={() => { setCat(c); setOpenIndex(null); }}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold border-2 transition-all capitalize ${cat === c ? "border-accent bg-accent/10 text-accent" : "border-border text-muted-foreground hover:border-accent/40"}`}>
            {c === "hr" ? "HR" : c}
          </button>
        ))}
      </div>

      {!domain ? (
        <div className="bg-card rounded-2xl p-8 border border-border text-center">
          <Filter size={32} className="text-muted-foreground mx-auto mb-3" />
          <p className="font-semibold text-foreground">Select a domain above to view questions</p>
          <p className="text-sm text-muted-foreground mt-1">Each domain has HR, Technical, and Behavioral questions</p>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-semibold text-muted-foreground">{questions.length} questions</span>
            {bookmarked.size > 0 && <span className="text-xs text-accent font-semibold">{bookmarked.size} bookmarked</span>}
          </div>
          {questions.map((q, i) => {
            const key = `${domain.id}-${cat}-${i}`;
            const isOpen = openIndex === i;
            return (
              <div key={i} className={`bg-card rounded-2xl border transition-all ${isOpen ? "border-accent/40 shadow-sm" : "border-border"}`}>
                <button className="w-full text-left px-5 py-4 flex items-start gap-3" onClick={() => setOpenIndex(isOpen ? null : i)}>
                  <span className="text-xs font-bold text-muted-foreground mt-0.5 w-6 flex-shrink-0">Q{i + 1}</span>
                  <span className="flex-1 text-sm font-semibold text-foreground">{q.q}</span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button onClick={e => { e.stopPropagation(); toggleBookmark(key); }} className="text-muted-foreground hover:text-accent transition-colors">
                      <Bookmark size={15} className={bookmarked.has(key) ? "fill-accent text-accent" : ""} />
                    </button>
                    {isOpen ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 pb-4">
                    <div className="rounded-xl p-4 text-sm leading-relaxed text-foreground" style={{ background: domain.lightBg, borderLeft: `3px solid ${domain.color}` }}>
                      <span className="text-xs font-bold block mb-2" style={{ color: domain.color }}>✦ Model Answer</span>
                      {q.a}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Career Mate Page ─────────────────────────────────────────────────────────

type CareerTab = "roadmap" | "projects" | "usecases";

function CareerMatePage({ selectedDomain, onSelectDomain }: { selectedDomain: DomainData | null; onSelectDomain: (d: DomainData) => void }) {
  const [tab, setTab] = useState<CareerTab>("roadmap");
  const [expandedPhase, setExpandedPhase] = useState<number | null>(0);
  const domain = selectedDomain;

  return (
    <div className="space-y-5">
      <SectionHeader title="Career Mate" subtitle="Your AI-powered career guide — roadmap, projects & real-world context" />

      <div className="flex overflow-x-auto gap-2 pb-1">
        {DOMAINS.map(d => (
          <button key={d.id} onClick={() => onSelectDomain(d)} className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold border-2 transition-all whitespace-nowrap"
            style={selectedDomain?.id === d.id ? { borderColor: d.color, background: d.lightBg, color: d.color } : { borderColor: "transparent", background: "#EDE9E2", color: "#7A7267" }}>
            {d.name}
          </button>
        ))}
      </div>

      {!domain ? (
        <div className="bg-card rounded-2xl p-10 border border-border text-center">
          <GraduationCap size={36} className="text-muted-foreground mx-auto mb-3" />
          <p className="font-semibold text-foreground">Select a domain to view your personalized career path</p>
        </div>
      ) : (
        <>
          <div className="rounded-2xl p-4 flex items-center gap-3" style={{ background: domain.lightBg }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: domain.color }}>
              <domain.Icon size={22} className="text-white" />
            </div>
            <div>
              <p className="font-extrabold text-base text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{domain.name}</p>
              <p className="text-xs text-muted-foreground">{domain.description}</p>
            </div>
          </div>

          <div className="flex gap-2">
            {(["roadmap", "projects", "usecases"] as CareerTab[]).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold border-2 transition-all capitalize ${tab === t ? "border-2 text-white" : "border-border text-muted-foreground hover:border-foreground/20"}`}
                style={tab === t ? { borderColor: domain.color, background: domain.color } : {}}>
                {t === "roadmap" ? "🗺 Roadmap" : t === "projects" ? "💡 Projects" : "🌍 Real World"}
              </button>
            ))}
          </div>

          {tab === "roadmap" && (
            <div className="space-y-3">
              {domain.roadmap.map((phase, i) => {
                const isOpen = expandedPhase === i;
                return (
                  <div key={i} className="bg-card rounded-2xl border border-border overflow-hidden">
                    <button className="w-full text-left p-5 flex items-start gap-4" onClick={() => setExpandedPhase(isOpen ? null : i)}>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ background: domain.color }}>
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-sm text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{phase.phase}</p>
                        <p className="text-xs text-muted-foreground mt-0.5"><Clock size={10} className="inline mr-1" />{phase.duration}</p>
                      </div>
                      {isOpen ? <ChevronUp size={16} className="text-muted-foreground flex-shrink-0 mt-1" /> : <ChevronDown size={16} className="text-muted-foreground flex-shrink-0 mt-1" />}
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">What to Learn</p>
                            <div className="space-y-1.5">
                              {phase.topics.map((t, j) => (
                                <div key={j} className="flex items-center gap-2 text-sm">
                                  <CheckCircle size={13} style={{ color: domain.color, flexShrink: 0 }} />
                                  <span>{t}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="rounded-xl p-3" style={{ background: domain.lightBg }}>
                              <p className="text-xs font-bold mb-1" style={{ color: domain.color }}>🌍 Why This Matters</p>
                              <p className="text-xs text-muted-foreground leading-relaxed">{phase.useCase}</p>
                            </div>
                            <div className="rounded-xl p-3 bg-muted/50">
                              <p className="text-xs font-bold text-foreground mb-1">🏁 Phase Milestone</p>
                              <p className="text-xs text-muted-foreground">{phase.milestone}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {tab === "projects" && (
            <div className="space-y-3">
              <div className="rounded-xl p-3 bg-yellow-50 border border-yellow-200 text-yellow-800 text-xs font-medium">
                💡 Beginner-level projects only — designed to challenge without overwhelming. Build these to grow your portfolio.
              </div>
              {domain.projects.map((proj, i) => (
                <div key={i} className="bg-card rounded-2xl border border-border p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ background: domain.color }}>{i + 1}</div>
                    <div>
                      <p className="font-bold text-sm text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{proj.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><Clock size={10} />{proj.time}</p>
                    </div>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed mb-3">{proj.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tech.map((t, j) => (
                      <span key={j} className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: domain.color + "18", color: domain.color }}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "usecases" && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">See how <span className="font-semibold text-foreground">{domain.name}</span> skills are used by real companies in India and globally.</p>
              {domain.useCases.map((uc, i) => (
                <div key={i} className="bg-card rounded-2xl border border-border p-5 flex gap-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: domain.color + "18" }}>
                    <Globe size={16} style={{ color: domain.color }} />
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{uc}</p>
                </div>
              ))}
              <div className="bg-card rounded-2xl border border-border p-5">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Resume Tips for {domain.name}</p>
                <div className="space-y-2">
                  {domain.resumeTips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <ArrowRight size={12} className="flex-shrink-0 mt-1" style={{ color: domain.color }} />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─── LinkedIn Coach Page ──────────────────────────────────────────────────────

function LinkedInPage({ selectedDomain, onSelectDomain }: { selectedDomain: DomainData | null; onSelectDomain: (d: DomainData) => void }) {
  const [showPost, setShowPost] = useState(false);
  const domain = selectedDomain;

  return (
    <div className="space-y-5">
      <SectionHeader title="LinkedIn Coach" subtitle="Domain-based strategy to build your personal brand and get noticed" />

      <div className="flex overflow-x-auto gap-2 pb-1">
        {DOMAINS.map(d => (
          <button key={d.id} onClick={() => { onSelectDomain(d); setShowPost(false); }} className="flex-shrink-0 px-3 py-2 rounded-full text-xs font-semibold border-2 transition-all whitespace-nowrap"
            style={selectedDomain?.id === d.id ? { borderColor: d.color, background: d.lightBg, color: d.color } : { borderColor: "transparent", background: "#EDE9E2", color: "#7A7267" }}>
            {d.name}
          </button>
        ))}
      </div>

      {!domain ? (
        <div className="bg-card rounded-2xl p-10 border border-border text-center">
          <LinkedinIcon size={36} className="text-muted-foreground mx-auto mb-3" />
          <p className="font-semibold">Select your domain above to see your LinkedIn strategy</p>
        </div>
      ) : (
        <>
          {/* Frequency Card */}
          <div className="rounded-2xl p-6 text-white" style={{ background: "linear-gradient(135deg, #0A66C2, #004182)" }}>
            <p className="text-sm font-semibold opacity-70 mb-1">Your LinkedIn Posting Frequency</p>
            <p className="text-3xl font-extrabold mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{domain.linkedin.frequency}</p>
            <p className="text-sm opacity-80">📅 Best days: {domain.linkedin.days}</p>
            <p className="text-sm opacity-80">🎯 Weekly target: {domain.linkedin.weeklyTarget} post{domain.linkedin.weeklyTarget > 1 ? "s" : ""}</p>
          </div>

          {/* Content Topics */}
          <div className="bg-card rounded-2xl p-5 border border-border">
            <p className="font-bold text-sm mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>What to Post ({domain.name})</p>
            <div className="space-y-2">
              {domain.linkedin.topics.map((topic, i) => (
                <div key={i} className="flex items-start gap-3 text-sm">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: domain.color }}>{i + 1}</span>
                  <span>{topic}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hashtags */}
          <div className="bg-card rounded-2xl p-5 border border-border">
            <p className="font-bold text-sm mb-3">Hashtags to Use</p>
            <div className="flex flex-wrap gap-2">
              {domain.linkedin.hashtags.split(" ").map((tag, i) => (
                <span key={i} className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "#0A66C2" + "15", color: "#0A66C2" }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Pro Tip */}
          <div className="rounded-2xl p-5 border" style={{ background: domain.lightBg, borderColor: domain.color + "40" }}>
            <p className="text-xs font-bold mb-2" style={{ color: domain.color }}>💡 PRO TIP FOR {domain.name.toUpperCase()}</p>
            <p className="text-sm leading-relaxed">{domain.linkedin.tip}</p>
          </div>

          {/* Sample Post */}
          <div className="bg-card rounded-2xl p-5 border border-border">
            <div className="flex items-center justify-between mb-3">
              <p className="font-bold text-sm">Sample Post Template</p>
              <button onClick={() => setShowPost(!showPost)} className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all" style={{ background: domain.color + "18", color: domain.color }}>
                {showPost ? "Hide" : "Show"} Template
              </button>
            </div>
            {showPost && (
              <div className="rounded-xl p-4 text-sm leading-relaxed whitespace-pre-line font-[Nunito]" style={{ background: "#F8F5F0", border: "1px dashed " + domain.color }}>
                {domain.linkedin.samplePost}
              </div>
            )}
            {!showPost && <p className="text-xs text-muted-foreground">Click to reveal a real-world LinkedIn post template designed for {domain.name} professionals.</p>}
          </div>

          {/* General LinkedIn Tips */}
          <div className="bg-card rounded-2xl p-5 border border-border">
            <p className="font-bold text-sm mb-4">LinkedIn Profile Must-Haves (All Domains)</p>
            <div className="space-y-3">
              {[
                { icon: "🖼", tip: "Professional photo — well-lit, plain background. Profiles with photos get 21x more views." },
                { icon: "✍️", tip: "Headline: Don't just say your title. Say 'Frontend Developer | Building accessible web apps | Open to opportunities'" },
                { icon: "📝", tip: "About section: 3-4 lines. What you do, what you're passionate about, what you're looking for." },
                { icon: "🔗", tip: "Add portfolio/GitHub link to Featured section. Recruiters click the first external link they see." },
                { icon: "⭐", tip: "Get 3-5 skills endorsed by peers or professors. Endorsed skills rank higher in recruiter searches." },
                { icon: "📢", tip: `Turn on 'Open to Work' (visible to recruiters only option). It dramatically increases recruiter InMail.` }
              ].map(({ icon, tip }, i) => (
                <div key={i} className="flex items-start gap-3 text-sm">
                  <span className="text-base flex-shrink-0">{icon}</span>
                  <span className="text-foreground">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Resume Page ──────────────────────────────────────────────────────────────

function ResumePage({ selectedDomain }: { selectedDomain: DomainData | null }) {
  const [openTip, setOpenTip] = useState<number | null>(null);

  return (
    <div className="space-y-5">
      <SectionHeader title="Resume Correction" subtitle="Build an ATS-ready resume that gets you shortlisted" />

      {/* ATS Score Card */}
      <div className="bg-card rounded-2xl p-5 border border-border">
        <p className="font-bold text-sm mb-4">How an ATS (Applicant Tracking System) Reads Your Resume</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { label: "Step 1: Keyword Scan", desc: "ATS looks for keywords from the job description. If they're missing, your resume gets rejected before any human sees it.", icon: "🔍" },
            { label: "Step 2: Format Parse", desc: "ATS reads text only — it can't read tables, text boxes, images, or multi-column PDFs. Use single-column, plain text formatting.", icon: "📄" },
            { label: "Step 3: Score & Rank", desc: "Your resume is scored against the job description. Top scorers get to a recruiter. The rest go to trash — automatically.", icon: "⚖️" }
          ].map(({ label, desc, icon }) => (
            <div key={label} className="rounded-xl p-3 bg-muted/50">
              <span className="text-2xl">{icon}</span>
              <p className="font-bold text-xs mt-2 mb-1">{label}</p>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section-by-Section Tips */}
      <div>
        <p className="font-bold text-sm mb-3">Section-by-Section Guide</p>
        <div className="space-y-2">
          {GENERAL_RESUME_TIPS.map((tip, i) => (
            <div key={i} className="bg-card rounded-2xl border border-border overflow-hidden">
              <button className="w-full text-left px-5 py-4 flex items-center gap-3" onClick={() => setOpenTip(openTip === i ? null : i)}>
                <span className="text-xl">{tip.icon}</span>
                <span className="flex-1 font-semibold text-sm">{tip.section}</span>
                {openTip === i ? <ChevronUp size={15} className="text-muted-foreground" /> : <ChevronDown size={15} className="text-muted-foreground" />}
              </button>
              {openTip === i && (
                <div className="px-5 pb-4">
                  <p className="text-sm text-foreground leading-relaxed">{tip.tip}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Domain-specific tips */}
      {selectedDomain && (
        <div className="bg-card rounded-2xl border border-border p-5">
          <div className="flex items-center gap-2 mb-4">
            <selectedDomain.Icon size={16} style={{ color: selectedDomain.color }} />
            <p className="font-bold text-sm">{selectedDomain.name} — Specific Resume Tips</p>
          </div>
          <div className="space-y-2">
            {selectedDomain.resumeTips.map((tip, i) => (
              <div key={i} className="flex items-start gap-3 text-sm p-3 rounded-xl" style={{ background: selectedDomain.lightBg }}>
                <CheckCircle size={14} className="flex-shrink-0 mt-0.5" style={{ color: selectedDomain.color }} />
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Common Mistakes */}
      <div className="bg-card rounded-2xl p-5 border border-border">
        <p className="font-bold text-sm mb-4">❌ Common Resume Mistakes to Avoid</p>
        <div className="space-y-2">
          {[
            "Using 'Responsible for...' instead of action verbs like Built, Designed, Implemented",
            "Listing every college subject as a skill — only list what you've actually used in a project",
            "No live project links — every project must have a GitHub repo link and a live demo if possible",
            "Generic objective statement: 'Seeking a challenging position...' — replace with a targeted professional summary",
            "Including photo, date of birth, or father's name — these are irrelevant and take valuable space",
            "Using creative resume templates with columns, icons, and graphics — ATS cannot read these",
            "CGPA below 6.5 — if below, omit it or mention achievements instead",
            "Skills mismatch — if you've listed Python, you WILL be asked Python questions in the interview"
          ].map((mistake, i) => (
            <div key={i} className="flex items-start gap-2 text-sm">
              <span className="text-red-500 flex-shrink-0 mt-0.5">✕</span>
              <span>{mistake}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Free Tools */}
      <div className="bg-card rounded-2xl p-5 border border-border">
        <p className="font-bold text-sm mb-4">Free Resume Tools</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { name: "Resume.io", desc: "Clean, ATS-friendly templates — free tier available" },
            { name: "Zety Resume Builder", desc: "Guided builder with ATS-optimized formats" },
            { name: "Canva Resume", desc: "Beautiful designs — use the simple single-column templates only for ATS" },
            { name: "Jobscan", desc: "Paste your resume + job description → get ATS match score" },
            { name: "Grammarly", desc: "Check grammar and clarity in your resume content (free tier)" },
            { name: "LinkedIn Easy Apply", desc: "Upload your resume — let LinkedIn fill in your profile fields automatically" }
          ].map(({ name, desc }) => (
            <div key={name} className="flex items-start gap-3 p-3 rounded-xl bg-muted/50">
              <Zap size={14} className="text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold">{name}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── App Shell ────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedDomain, setSelectedDomain] = useState<DomainData | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSelectDomain = (d: DomainData) => setSelectedDomain(d);

  const pageProps = { selectedDomain, onSelectDomain: handleSelectDomain };

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: "'Nunito', sans-serif" }}>
      {/* Top Nav */}
      <header className="sticky top-0 z-50 bg-card border-b border-border backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "#1B1B2F" }}>
              <GraduationCap size={16} className="text-white" />
            </div>
            <span className="font-extrabold text-base text-foreground tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              PlaceMate<span style={{ color: "#FF6B35" }}>AI</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(({ id, label, Icon }) => (
              <button key={id} onClick={() => setPage(id)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${page === id ? "text-white" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}
                style={page === id ? { background: "#1B1B2F" } : {}}>
                <Icon size={13} /> {label}
              </button>
            ))}
          </nav>

          {selectedDomain && (
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ background: selectedDomain.lightBg, color: selectedDomain.color }}>
              <selectedDomain.Icon size={12} /> {selectedDomain.name}
            </div>
          )}

          <button className="md:hidden text-muted-foreground hover:text-foreground" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <div className="px-4 py-2 grid grid-cols-3 gap-1">
              {NAV_ITEMS.map(({ id, label, Icon }) => (
                <button key={id} onClick={() => { setPage(id); setMenuOpen(false); }}
                  className={`py-2.5 rounded-xl text-xs font-semibold flex flex-col items-center gap-1 transition-all ${page === id ? "text-white" : "text-muted-foreground"}`}
                  style={page === id ? { background: "#1B1B2F" } : {}}>
                  <Icon size={16} /> {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
        <div className="flex items-center justify-around h-16 px-1">
          {NAV_ITEMS.map(({ id, label, Icon }) => (
            <button key={id} onClick={() => setPage(id)}
              className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-all ${page === id ? "text-accent" : "text-muted-foreground"}`}>
              <Icon size={19} />
              <span className="text-[9px] font-bold">{label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-6 pb-24 md:pb-8">
        {page === "home" && <HomePage onNavigate={setPage} {...pageProps} />}
        {page === "hr" && <HRRoundPage {...pageProps} />}
        {page === "questions" && <QuestionsPage {...pageProps} />}
        {page === "career" && <CareerMatePage {...pageProps} />}
        {page === "linkedin" && <LinkedInPage {...pageProps} />}
        {page === "resume" && <ResumePage selectedDomain={selectedDomain} />}
      </main>
    </div>
  );
}
