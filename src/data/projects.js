// image: card cover, filename in public/projects/ (cards without one show the placeholder)
// Everything below is optional and only shown in the popup when it has content:
//   summary: one line, also shown on featured cards
//   images: real result images (model outputs, charts, diagrams) [{ src, alt }], src in public/projects/ or a full URL
//           a src ending in .mp4 or .webm is shown as a video with player controls
//           portrait: true gives tall media (e.g. phone recordings) a tall frame instead of the 16:9 one
//   links: [{ label, url, note }]; note e.g. 'Restricted access'; url can be left out for links that aren't public
//   problem: 2-3 sentences
//   approach: short steps, shown numbered
//   results: strings, or { label, value } for key numbers (shown as a small table)
//   learned: 2-3 lessons or limitations
//   stack: tech used, shown on featured cards
//   role: your part, for team projects
const gh = (repo, path = '') => `https://github.com/mahya-ehs/${repo}${path && `/blob/main/${path}`}`
const raw = (repo, path) => `https://raw.githubusercontent.com/mahya-ehs/${repo}/main/${path}`

export const projectsData = [
  {
    title: 'Steel Surface Defect Detection with Small Datasets', category: 'AI & ML', featured: true, image: 'steel.jpg',
    summary: 'Master’s thesis at the University of Oulu: deep learning for finding surface defects on steel when only a small number of labeled images is available.',
    problem: 'In industry, defects are rare, so labeled data is scarce and collecting more is expensive. The question: which deep learning approaches still work well with a small dataset?',
    approach: [
      'Compared three approaches: patch-based image classification, object detection with Faster R-CNN, and anomaly detection',
      'Dealt with limited data and class imbalance through small-patch extraction, data augmentation, focal loss and transfer learning from pretrained CNNs',
      'Evaluated with F1, precision, recall and AUROC, using leakage-free data splits and Grad-CAM to check what the models actually focused on',
    ],
    results: [
      'Patch-based classification performed best overall, and its small patch size also gave rough defect localization.',
      'For anomaly detection, using features adapted to the steel domain worked much better than generic ImageNet features.',
    ],
    learned: [
      'How to choose between classification, detection and anomaly detection depending on how much labeled data exists.',
      'Why careful data splitting and explainability matter: a model can score well while learning the wrong cues.',
      'Working on a real industrial problem with limited data.',
    ],
    stack: ['Computer Vision', 'Deep Learning', 'Faster R-CNN', 'Anomaly Detection'],
  },
  {
    title: 'Diabetic Retinopathy Detection', category: 'AI & ML', featured: true, image: 'diabetic.jpg',
    summary: "Grading diabetic retinopathy into five severity levels from retinal images with transfer learning, reaching Cohen's kappa 0.87.",
    links: [
      { label: 'GitHub', url: gh('Diabetic-Retina-Detection-Transfer-Learning') },
      { label: 'Report (PDF)', url: gh('Diabetic-Retina-Detection-Transfer-Learning', 'Mahya_Ehsanimeh_report.pdf') },
    ],
    images: [
      {
        src: raw('Diabetic-Retina-Detection-Transfer-Learning', 'DeepDRiD/train/12/12_r1.jpg'),
        alt: 'Retinal fundus image from the DeepDRiD dataset, graded level 3, with yellow exudates visible around the vessels',
      },
    ],
    problem: 'Diabetic retinopathy can lead to blindness. The goal was to grade it into five levels from retinal images, using only 2,000 training images.',
    approach: [
      'Fine-tuned pretrained ResNet and DenseNet models, using one or both eyes per patient',
      'Pretrained first on a larger dataset (APTOS), then fine-tuned on DeepDRiD',
      'Tested attention, ensembles and image preprocessing, and used Grad-CAM to see what the model looks at',
    ],
    results: [
      'Best model reached Cohen’s kappa 0.87 (agreement with the true grade, 1 = perfect).',
      'Two-stage training gave the biggest gain, from about 0.80 to 0.87.',
      'Attention and ensembles did not help on this small dataset.',
    ],
    learned: [
      'Pretraining on related data helped more than extra complexity, and extra techniques need testing, not assuming.',
    ],
    stack: ['Computer Vision', 'Transfer Learning', 'Deep Learning', 'Explainable AI'],
  },
  {
    title: 'GPU Image Search with CUDA', category: 'Software & Systems', image: 'cuda.jpg',
    summary: 'Image similarity search over 5,000 images, ported from C++/OpenMP to CUDA.',
    links: [
      { label: 'GitHub', url: gh('Image-Search-CUDA') },
      { label: 'Report (PDF)', url: gh('Image-Search-CUDA', 'multicoreproject-CUDA-doc.pdf') },
    ],
    problem: 'Comparing a query image against a whole dataset is slow when done serially.',
    approach: [
      'Extracted image features: mean, median, standard deviation, Hu moments and histograms',
      'Wrote a CUDA kernel where each GPU thread computes the distance for one image',
      'Timed it against the serial and OpenMP versions on the same 5,000 images',
    ],
    results: [
      'The distance calculation took 3.7 s on the GPU, against 57.6 s serial and 14.6 s with OpenMP.',
      'End to end it took 20.5 s, slower than OpenMP, because copying the dataset to the GPU took most of the time.',
    ],
    learned: [
      'A GPU is only worth it when there is enough computation to pay for the data transfer.',
    ],
    stack: ['CUDA', 'C++', 'OpenCV', 'OpenMP'],
  },

  {
    title: 'Recommender System & RAG', category: 'AI & ML', image: 'rag.jpg',
    summary: 'Product recommendations from Amazon data with Elasticsearch, plus a RAG-based assistant that combines an LLM with data retrieval.',
    links: [{ label: 'GitHub', url: gh('Recommender-System-and-RAG') }],
    stack: ['Python', 'Elasticsearch', 'LLMs'],
  },
  {
    title: 'Twitter Sentiment Analysis', category: 'AI & ML', image: 'twitter.jpg',
    summary: 'Classifying tweets as positive, neutral or negative, and testing whether transformers, topic models and country-level data can improve on a simple text-only baseline.',
    links: [{ label: 'GitHub', url: gh('Twitter-Sentiment-Analysis') }],
    problem: 'Sentiment analysis usually looks at tweet text alone. In this NLP course group project, we tested whether extra context (time of tweet, country density and land area) helps.',
    approach: [
      'Explored the data and found topics with LDA, tuning the number of topics by coherence score',
      'Compared TF-IDF with logistic regression against DistilBERT, BERT-base and BERT-large embeddings',
      'Built a BERT model that combines the tweet text with country data, and used SHAP to see how much those features mattered',
      'Tried zero-shot and few-shot prompting with pretrained models',
    ],
    results: [
      'Every approach landed around 65-71% accuracy on three classes (TF-IDF 69.6%, best BERT model with country data 70.7%), so the extra context added little.',
      'Training on the selected_text column gave 85.6% on validation but only 56.9% on test, because that column isn’t available for new tweets.',
      'Time of day showed no relationship with sentiment.',
    ],
    learned: [
      'Simple baselines are hard to beat on short, noisy tweets, and checking that your features exist at prediction time matters as much as the model.',
    ],
    stack: ['NLP', 'Transformers', 'Sentiment Analysis', 'Topic Modeling'],
  },
  {
    title: 'Automatic SOP Writer', category: 'Data', image: 'sop.jpg',
    summary: 'A data mining pipeline that cleans a dataset of 60,000 master’s programs, extracts the key facts for a chosen university and field, and sends them to an online tool that drafts a Statement of Purpose.',
    links: [{ label: 'GitHub', url: gh('Automatic-SOP-Writer') }],
    problem: 'Writing an SOP that fits a specific program takes time, and the program details are scattered across messy data.',
    approach: [
      'Cleaned the dataset: removed near-empty records, standardised durations and tuition, and filled missing values column by column',
      'Extracted keywords from the HTML admission requirements with BeautifulSoup and spaCy',
      'Collected rank, location, tuition, IELTS score, courses and keywords for a chosen program, and sent them to an SOP generator (Moonbeam) with Selenium',
    ],
    results: [
      'End-to-end pipeline from a university and field name to a drafted SOP (sample output in the repo).'
    ],
    learned: [
      'A large share of data mining is cleaning, and every missing-value choice changes what the output says.',
    ],
    stack: ['Data Mining', 'Data Cleaning', 'NLP', 'Web Automation'],
  },

  {
    title: 'Finnish Energy Pipeline', category: 'Data', featured: true, image: 'finnish.jpg',
    summary: 'A data engineering pipeline that combines Finnish electricity consumption, prices and weather into one hourly table, to see how weather affects both.',
    images: [
      { src: raw('Finnish-energy-pipeline', 'docs/temperature.png'), alt: 'Electricity price and consumption by temperature in Finland' },
      { src: raw('Finnish-energy-pipeline', 'docs/price_by_wind.png'), alt: 'Electricity price by wind speed' },
      { src: raw('Finnish-energy-pipeline', 'docs/dagster.png'), alt: 'Dagster asset graph of the pipeline' },
    ],
    links: [{ label: 'GitHub', url: gh('Finnish-energy-pipeline') }],
    problem: 'Does cold weather make electricity more expensive, and does wind make it cheaper? The data comes from three APIs with different formats, time zones and resolutions.',
    approach: [
      'Ingested data daily from Fingrid, ENTSO-E and FMI and kept the raw responses unchanged (bronze layer)',
      'Cleaned it with dbt, converting everything to UTC (silver), and joined it into one hourly table (gold)',
      'Added dbt data quality tests, and backfilled 13 months of history with retries for rate limits',
      'Scheduled every step with Dagster',
    ],
    results: [
      { label: 'Temperature vs consumption correlation', value: '−0.86' },
      { label: 'Consumption at −20 °C vs mild weather', value: '+60%' },
      { label: 'Avg price at 2 m/s wind', value: '93 €/MWh' },
      { label: 'Avg price at 6 m/s wind', value: '9 €/MWh' },
      'Prices stay around 40 €/MWh between 0 and 15 °C but are almost four times higher at −20 °C. These are correlations, with weather averaged over six stations, so a rough guide only.',
    ],
    learned: [
      'Time zones were the hardest part: an unlabelled timestamp silently joined the wrong hours.',
      'Tests caught real problems in the source data, and known gaps are documented so new ones still fail.',
    ],
    stack: ['Python', 'dbt', 'DuckDB', 'Dagster', 'Parquet'],
  },
  {
    title: 'Amazon Crawler & Elasticsearch', category: 'Data', image: 'amazon.jpg',
    summary: 'A Selenium crawler for Amazon’s video games section, with the collected products indexed and searched in Elasticsearch. Built as a team project.',
    links: [{ label: 'GitHub', url: gh('Amazon-Crawler-and-Elastic-Search') }],
    approach: [
      'Crawled product pages with Selenium: name, price, rating, description and reviews, plus the related products of each item',
      'Indexed about 170 products on Elastic Cloud',
      'Ran searches by name and description, combined with filters on price and rating and a check for products with no reviews',
    ],
    stack: ['Python', 'Elasticsearch'],
  },
  {
    title: 'Boolean Information Retrieval', category: 'Data', image: 'boolean.jpg',
    summary: 'A search engine that finds documents with AND, OR and NOT queries, on English movie summaries and Persian book records. Built for the Information Retrieval course.',
    links: [{ label: 'GitHub', url: gh('Boolean-Information-Retrieval') }],
    problem: 'Searching text collections in two very different languages, English movie summaries (42,303) and Persian book records (2,824), with Boolean queries.',
    approach: [
      'Tokenised, normalised, stemmed and removed stop words for each language (NLTK for English, hazm for Persian)',
      'Built an inverted index and a term occurrence matrix from the processed text',
      'Turned each query into the same terms and answered it with AND, OR and NOT on the matrix',
    ],
    results: [
      'Working search in both languages, shown with sample queries in the notebook.',
      'Indexes the first 1,000 documents of each collection.',
    ],
    stack: ['Python', 'NLTK', 'Hazm', 'pandas'],
  },
  {
    title: 'Cloud Deployment with Docker & Kubernetes', category: 'Software & Systems', image: 'cloud.jpg',
    summary: 'A multi-container application, deployed step by step with Docker, Docker Compose and Kubernetes. Built for the Cloud Computing course.',
    links: [{ label: 'GitHub', url: gh('Cloud-Computing-Project') }],
    problem: 'Deploying a multi-container application, and moving it from single containers to a Kubernetes setup.',
    approach: [
      'Wrote Dockerfiles for Java, Python and JavaScript apps behind an Nginx reverse proxy',
      'Deployed a Go REST API with a MySQL database using Docker Compose, with volumes and resource limits',
      'Migrated it to Kubernetes on minikube: deployments, a StatefulSet and persistent volume for MySQL, services, a ConfigMap, secrets, an Ingress and a deploy script',
    ],
    stack: ['Go', 'Docker', 'Docker Compose', 'Kubernetes', 'Nginx', 'MySQL'],
  },

  {
    title: 'Medical Students’ Mental Health', category: 'AI & ML', image: 'medical-students.jpg',
    summary: 'How demographics and health traits predict burnout, depression and anxiety among Swiss medical students.',
    links: [
      { label: 'GitHub', url: gh('Medical-Students-Mental-Health') },
      { label: 'Report (PDF)', url: gh('Medical-Students-Mental-Health', 'data_mining_project_mental_health-FINAL-REPORT.pdf') },
    ],
    problem: 'Medical students face high stress, but most studies test only a few factors at a time. This university project asked how well demographics and health traits (therapy use, self-rated health, empathy, study hours) can predict depression, anxiety and burnout.',
    approach: [
      'Cleaned a public survey dataset and turned each outcome into an at-risk / not-at-risk label',
      'Compared five classifiers (Logistic Regression, Linear SVM, Random Forest, AdaBoost, XGBoost) with cross-validation and a held-out test set, testing six feature setups and class-imbalance fixes',
      'Modelled the three burnout scores together with multi-output classifiers and classifier chains',
      'Read feature importance from the model coefficients to see which factors matter',
    ],
    results: [
      'Simple linear models worked best: AUC 0.74 for depression and 0.81 for anxiety on unseen students (0.5 is a coin flip).',
      'Burnout was harder to predict (AUC 0.61-0.71).',
      'Therapy use, self-rated health and affective empathy were the strongest predictors, while age and mother tongue mattered little.',
      'Small, unbalanced dataset, so the results are indicative, not conclusive.',
    ],
    stack: ['Python', 'pandas', 'scikit-learn', 'Matplotlib'],
    role: 'Machine learning: preprocessing pipeline, all five classifiers, tuning, class-imbalance experiments, and the burnout models.',
  },
  // {
  //   title: 'Netflix Data Analysis & Classification', category: 'AI & ML', image: 'netflix.jpg',
  //   summary: 'Analysis and classification of the Netflix dataset, developed for the Data Mining course.',
  //   images: [
  //     { src: raw('Netflix-Dataset-Analysis-and-Classification', 'phase1.png'), alt: 'Share of directors above and below the average number of films' },
  //     { src: raw('Netflix-Dataset-Analysis-and-Classification', 'phase2.png'), alt: 'Association rules between directors, cast and genre' },
  //     { src: raw('Netflix-Dataset-Analysis-and-Classification', 'kmeans.png'), alt: 'K-means clustering results' },
  //     { src: raw('Netflix-Dataset-Analysis-and-Classification', 'phase3.png'), alt: 'Genre classification results' },
  //   ],
  //   links: [{ label: 'GitHub', url: gh('Netflix-Dataset-Analysis-and-Classification') }],
  //   problem: 'The Netflix dataset covers over 8,000 movies and shows with their directors, cast, genres and descriptions. The project looked for patterns in it and predicted genre from a description.',
  //   approach: [
  //     'Compared each director’s number of films with the average',
  //     'Mined association rules between directors, cast and genre using support and confidence',
  //     'Clustered titles with k-means',
  //     'Classified titles by genre and predicted a genre from the description',
  //   ],
  //   stack: ['Python', 'pandas'],
  // },

  {
    title: 'Custom Linux Shell', category: 'Software & Systems', image: 'linux.jpg',
    summary: 'An implementation of a Linux shell written in C, developed for the Operating Systems course.',
    images: [{ src: raw('Custom-Linux-Shell', 'result.png'), alt: 'Commands running in the custom shell' }],
    links: [{ label: 'GitHub', url: gh('Custom-Linux-Shell') }],
    approach: [
      'Parsed and tokenised input, then sorted commands into built-in, Linux and piped',
      'Implemented built-ins: cd, pwd, exit, help, date, clear and history',
      'Ran Linux commands in a child process with fork() and wait()',
      'Supported multiple pipes by alternating file descriptors with dup2()',
      'Ignored Ctrl+C with a signal handler and saved history to a file',
    ],
    stack: ['C', 'Linux'],
  },
  {
    title: 'Jython Compiler', category: 'Software & Systems', image: 'jython.jpg',
    summary: 'A compiler front end in Java for Jython, a small language that mixes Python and Java. It parses source code, builds symbol tables, and reports semantic errors with line and column positions.',
    images: [
      { src: raw('Jython-Compiler', 'out1.png'), alt: 'Detected program structure for the test case' },
      { src: raw('Jython-Compiler', 'out2.png'), alt: 'Semantic errors found in the test case' },
    ],
    links: [{ label: 'GitHub', url: gh('Jython-Compiler') }],
    approach: [
      'Generated the parse tree of a Jython snippet with ANTLR’s ParseTreeWalker',
      'Detected classes, parents, variables and functions in a custom listener',
      'Detects duplicate methods and fields, undefined classes, variables and methods, wrong return types and mismatched arguments',
    ],
    stack: ['Java', 'ANTLR'],
  },
  {
    title: 'Language Grammar with ANTLR', category: 'Software & Systems', image: 'antlr.png',
    summary: 'Writing the grammar (parser and lexer rules) of a programming language using ANTLR.',
    images: [{ src: raw('Grammar-with-ANTLR', 'result.png'), alt: 'Parse tree generated for a test case' }],
    links: [{ label: 'GitHub', url: gh('Grammar-with-ANTLR') }],
    approach: [
      'Defined lexer rules for names, keywords and comments',
      'Wrote parser rules for imports, classes, access levels, functions and variables',
      'Covered control flow: if, switch-case, while and for loops',
      'Visualised parse trees for test programs',
    ],
    stack: ['ANTLR'],
  },
  {
    title: 'MIDI Player in C', category: 'Software & Systems', image: 'midi.jpg',
    summary: 'A program in C that reads a MIDI music file byte by byte and plays it as sound. It was my first programming project.',
    links: [{ label: 'GitHub', url: gh('Midi-Player-in-C') }],
    images: [{ src: 'midi-demo.mp4', alt: 'Demo: compiling and running the MIDI player, playing Für Elise' }],
    approach: [
      'Parsed the MIDI file format by hand: the header (tracks and timing) and the track events (note on/off, tempo)',
      'Converted note numbers to frequencies, and used the tempo to work out how long each note lasts',
      'Played each note as a tone, building the project in three phases from a simple note player to the full MIDI player'
    ],
    stack: ['C'],
  },
  {
    title: 'Turing Machine Simulator', category: 'Software & Systems', image: 'turing.png',
    summary: 'A Turing machine simulator in Java with a JavaFX interface. You define a machine and watch it process an input string step by step. Built for the Formal Languages and Automata course.',
    links: [{ label: 'GitHub', url: gh('Turing-Machine') }],
    images: [{ src: 'turing-demo.mp4', alt: 'Demo: defining states, alphabets and transitions in the JavaFX app, then running the machine on a tape' }],
    approach: [
      'Entered the states, alphabets and transition functions (with left/right moves) through a graphical interface',
      'Simulated the machine on a visual tape, showing the head position and current state at each step',
      'Showed whether the input is accepted or rejected, and allowed new inputs without redefining the machine',
    ],
    results: [
      'Runs any machine you define, and shows the accept or reject result for each input.',
    ],
    stack: ['Java', 'JavaFX'],
  },
  {
    title: 'Smart Grocery Android App', category: 'Software & Systems', image: 'grocery.jpg', featured: true,
    summary: 'A grocery app that tracks what you bought, where, and how much you spent.',
    links: [{ label: 'GitHub', url: gh('Smart-Grocery-Android-App') }],
    images: [{ src: 'grocery-demo.mp4', alt: 'Demo: creating a grocery list, browsing shopping history, picking a store on the map and saving a receipt', portrait: true }],
    problem: 'I kept forgetting what I’d bought and where it was cheapest.',
    approach: [
      'Shopping lists and purchase history, stored locally with Room',
      'Map screen that finds nearby supermarkets through the Overpass API, so you can pick the store',
      'Receipt photos from the camera or gallery, saved on the device',
      'MVVM architecture with Flow, so the UI updates when the data changes',
    ],
    results: [
      'Working app with a demo video: lists, history, store map and receipt saving.',
    ],
    learned: [
      'Building a full Android app with Jetpack Compose and keeping UI state clean with MVVM.',
      'Using an open map API (Overpass) alongside Google Maps.',
    ],
    stack: ['Kotlin', 'Jetpack Compose', 'Room', 'Google Maps'],
  },
  {
    title: 'Battleship in JavaFX', category: 'Software & Systems', image: 'battleship.jpg',
    summary: 'A two-player strategy game in Java with a JavaFX interface, based on Battleship with new rules. Built for the Advanced Programming course.',
    links: [{ label: 'GitHub', url: gh('Battle-Ship-JavaFX') }],
    images: [
      { src: 'battle1.png', alt: 'Main menu with Start, Rules and Exit buttons' },
      { src: 'battle2.png', alt: 'Entering the two player names' },
      { src: 'battle3.png', alt: 'A player placing units of different sizes on the board' },
      { src: 'battle4.png', alt: 'Turn-based battle between the two players’ boards' },
    ],
    approach: [
      'Designed the game with object-oriented classes for the board, players and four unit types of different sizes (1, 2, 4 and 9 cells)',
      'Added recovery times, so stronger units need 2 to 4 turns before they can attack again',
      'Built the screens in JavaFX: menu, board size (10 to 40), unit placement for each player, and the turn-based battle, with background music',
    ],
    results: [
      'A playable two-player game on one computer.',
    ],
    stack: ['Java', 'JavaFX'],
  },
];

export const imageUrl = (image) => `${import.meta.env.BASE_URL}projects/${image}`
// Smaller web copies (same name, .webp): thumbs/ for More work cards, large/ for the featured slider
export const thumbUrl = (image) => imageUrl(`thumbs/${image.replace(/\.[^.]+$/, '')}.webp`)
export const largeUrl = (image) => imageUrl(`large/${image.replace(/\.[^.]+$/, '')}.webp`)

// onError handler: if the web copy is missing (e.g. a newly added project), fall back to the original image
export const fallbackToOriginal = (image) => (event) => {
  const original = imageUrl(image)
  if (!event.currentTarget.src.endsWith(original)) event.currentTarget.src = original
}

// Tabs in the More work section, in this order
export const categories = ['AI & ML', 'Data', 'Software & Systems']
