export type AcademyLanguage = "rw" | "en";

type Topic = readonly [rw: string, en: string];
type ModuleSpec = {
  year: number;
  term: number;
  titleRw: string;
  titleEn: string;
  descriptionRw: string;
  descriptionEn: string;
  topics: readonly Topic[];
  resource: { label: string; url: string };
  review: "stable" | "annual";
};

export type AcademyLesson = {
  id: string;
  number: number;
  title: Record<AcademyLanguage, string>;
  explanation: Record<AcademyLanguage, string>;
  workedExample: Record<AcademyLanguage, string>;
  practice: Record<AcademyLanguage, string>;
  check: {
    question: Record<AcademyLanguage, string>;
    options: Record<AcademyLanguage, string[]>;
    answer: number;
    feedback: Record<AcademyLanguage, string>;
  };
};

export type AcademyModule = {
  id: string;
  year: number;
  term: number;
  level: Record<AcademyLanguage, string>;
  title: Record<AcademyLanguage, string>;
  description: Record<AcademyLanguage, string>;
  estimatedHours: number;
  prerequisites: Record<AcademyLanguage, string>;
  outcomes: Record<AcademyLanguage, string[]>;
  project: {
    title: Record<AcademyLanguage, string>;
    instructions: Record<AcademyLanguage, string>;
    rubric: Record<AcademyLanguage, string[]>;
  };
  resources: { label: string; url: string }[];
  review: "stable" | "annual";
  lessons: AcademyLesson[];
};

const resources = {
  web: { label: "MDN Web Docs", url: "https://developer.mozilla.org/en-US/docs/Learn" },
  scratch: { label: "Scratch Learning Resources", url: "https://scratch.mit.edu/educators" },
  cs: { label: "CS Unplugged", url: "https://www.csunplugged.org/en/" },
  python: { label: "Python documentation", url: "https://docs.python.org/3/tutorial/" },
  data: { label: "UNICEF Data Literacy", url: "https://www.unicef.org/globalinsight/reports/data-literacy" },
  ml: { label: "Google Machine Learning Crash Course", url: "https://developers.google.com/machine-learning/crash-course" },
  tensorflow: { label: "TensorFlow tutorials", url: "https://www.tensorflow.org/tutorials" },
  pytorch: { label: "PyTorch tutorials", url: "https://pytorch.org/tutorials/" },
  hf: { label: "Hugging Face course", url: "https://huggingface.co/learn" },
  nist: { label: "NIST AI Risk Management Framework", url: "https://www.nist.gov/itl/ai-risk-management-framework" },
  oecd: { label: "OECD AI Principles", url: "https://oecd.ai/en/ai-principles" },
  openai: { label: "OpenAI developer documentation", url: "https://developers.openai.com/" },
  research: { label: "arXiv computer science", url: "https://arxiv.org/archive/cs" }
} as const;

const m = (year: number, term: number, titleRw: string, titleEn: string, descriptionRw: string, descriptionEn: string, topics: readonly Topic[], resource: ModuleSpec["resource"], review: ModuleSpec["review"] = "stable"): ModuleSpec => ({ year, term, titleRw, titleEn, descriptionRw, descriptionEn, topics, resource, review });

const specs: ModuleSpec[] = [
  m(1,1,"Kumenya mudasobwa","Digital Foundations","Menya ibice bya mudasobwa, dosiye, internet n'umutekano w'ibanze.","Understand devices, files, the internet and basic safety.",[["Ibikoresho bya digital","Digital devices"],["Dosiye na folders","Files and folders"],["Internet ikora ite","How the internet works"],["Gushaka amakuru","Finding information"],["Ijambobanga rikomeye","Strong passwords"],["Kuba umuturage mwiza online","Digital citizenship"]],resources.web),
  m(1,2,"Gutekereza mu buryo bwa algorithm","Computational Thinking","Gabanya ikibazo mo ibice, ushake patterns kandi wandike amabwiriza asobanutse.","Break problems into parts, find patterns and write clear instructions.",[["Gucamo ikibazo ibice","Decomposition"],["Kumenya patterns","Pattern recognition"],["Gukuramo iby'ingenzi","Abstraction"],["Amabwiriza akurikirana","Sequences"],["Guhitamo ukoresheje conditions","Conditions"],["Gusubiramo ibikorwa","Loops"]],resources.cs),
  m(1,3,"AI ni iki?","What Is AI?","Sobanukirwa AI, data n'uko imashini zibona patterns mu buzima bwa buri munsi.","Understand AI, data and pattern recognition in everyday life.",[["AI n'imashini zisanzwe","AI and ordinary machines"],["Data ni iki","What is data"],["Kumenya patterns","Recognising patterns"],["AI mu Rwanda","AI in Rwanda"],["Ibyo AI ishoboye","What AI can do"],["Ibyo AI idashoboye","AI limitations"]],resources.ml),
  m(1,4,"Umushinga wa AI utekanye","Safe AI Project","Koresha ubumenyi bw'ibanze utegure igitekerezo cya AI gifasha umuryango kandi kirinda abantu.","Apply foundations to design a safe AI idea for the community.",[["Guhitamo ikibazo","Choose a problem"],["Kumenya abo gifasha","Know the users"],["Gukusanya data itekanye","Collect safe data"],["Gushushanya solution","Sketch a solution"],["Kugerageza igitekerezo","Test the idea"],["Kukimurika","Present the idea"]],resources.oecd),

  m(2,1,"Coding ukoresheje blocks","Block Coding","Wubake programs zoroshye ukoresheje events, variables, conditions na loops.","Build simple programs with events, variables, conditions and loops.",[["Events","Events"],["Sequences","Sequences"],["Variables","Variables"],["Conditions","Conditions"],["Loops","Loops"],["Debugging","Debugging"]],resources.scratch),
  m(2,2,"Data n'imibare","Data and Mathematics","Tegura data, ukoreshe averages na charts, kandi wirinde imyanzuro itari yo.","Organise data, use averages and charts, and avoid misleading conclusions.",[["Tables","Tables"],["Types za data","Data types"],["Average na median","Mean and median"],["Charts","Charts"],["Probability y'ibanze","Basic probability"],["Kuvuga inkuru ukoresheje data","Data storytelling"]],resources.data),
  m(2,3,"AI ibona amashusho n'amajwi","AI Perception","Menya uburyo images, sound na text bihindurwa data AI ishobora gusesengura.","Learn how images, sound and text become data AI can analyse.",[["Pixels","Pixels"],["Amafoto na labels","Images and labels"],["Sound waves","Sound waves"],["Speech recognition","Speech recognition"],["Text nk'amakuru","Text as data"],["Amakosa ya sensors","Sensor errors"]],resources.ml),
  m(2,4,"Storytelling ikoresha AI","AI Storytelling","Tegura inkuru ifashwa na AI ariko ugumane ubuhanzi, ukuri n'uburenganzira bw'umuhanzi.","Create an AI-assisted story while protecting creativity, truth and authorship.",[["Audience n'intego","Audience and purpose"],["Story structure","Story structure"],["Prompt y'ibanze","Basic prompting"],["Kugenzura ukuri","Fact checking"],["Copyright","Copyright"],["Kwerekana ibyo AI yafashije","Disclosing AI help"]],resources.oecd,"annual"),

  m(3,1,"Python y'ibanze","Python Foundations","Andika Python ukoresheje variables, input, conditions, loops na functions.","Write Python with variables, input, conditions, loops and functions.",[["Python syntax","Python syntax"],["Variables na types","Variables and types"],["Input na output","Input and output"],["If statements","If statements"],["Loops","Loops"],["Functions","Functions"]],resources.python),
  m(3,2,"Data muri Python","Data with Python","Koresha lists, dictionaries, CSV n'imibare y'ibanze mu gusesengura data.","Use lists, dictionaries, CSV files and basic statistics to analyse data.",[["Lists","Lists"],["Dictionaries","Dictionaries"],["Reading CSV","Reading CSV"],["Cleaning data","Cleaning data"],["Summary statistics","Summary statistics"],["Simple charts","Simple charts"]],resources.python),
  m(3,3,"Machine Learning y'ibanze","Machine Learning Foundations","Sobanukirwa features, labels, training, testing n'ibipimo bya model.","Understand features, labels, training, testing and model metrics.",[["Features na labels","Features and labels"],["Training examples","Training examples"],["Train-test split","Train-test split"],["Classification","Classification"],["Regression","Regression"],["Accuracy n'amakosa","Accuracy and errors"]],resources.ml),
  m(3,4,"Model ya mbere","First Model Project","Tegura, ugerageze kandi usobanure model nto ikemura ikibazo gifite data yoroshye.","Plan, test and explain a small model for a simple data problem.",[["Problem statement","Problem statement"],["Dataset card","Dataset card"],["Baseline","Baseline"],["Training","Training"],["Evaluation","Evaluation"],["Model report","Model report"]],resources.ml),

  m(4,1,"Imibare ya AI","Mathematics for AI","Menya vectors, functions, graphs, probability na statistics AI yubakiraho.","Learn vectors, functions, graphs, probability and statistics used in AI.",[["Coordinates na vectors","Coordinates and vectors"],["Functions","Functions"],["Graphs na slopes","Graphs and slopes"],["Probability","Probability"],["Distributions","Distributions"],["Correlation si causation","Correlation is not causation"]],resources.ml),
  m(4,2,"Gutunganya data","Data Preparation","Sukura, uhindure kandi wandike inkomoko ya data mbere yo kuyikoresha.","Clean, transform and document data before using it.",[["Missing values","Missing values"],["Duplicates","Duplicates"],["Outliers","Outliers"],["Encoding categories","Encoding categories"],["Scaling","Scaling"],["Data documentation","Data documentation"]],resources.data),
  m(4,3,"Algorithms za ML","Machine Learning Algorithms","Gereranya decision trees, nearest neighbours, regression na clustering.","Compare decision trees, nearest neighbours, regression and clustering.",[["Linear regression","Linear regression"],["Logistic regression","Logistic regression"],["Decision trees","Decision trees"],["K-nearest neighbours","K-nearest neighbours"],["Clustering","Clustering"],["Choosing an algorithm","Choosing an algorithm"]],resources.ml),
  m(4,4,"AI ikemura ikibazo cy'aho dutuye","Local AI Challenge","Kora prototype ishingiye ku kibazo nyakuri cyo mu Rwanda cyangwa Afurika.","Build a prototype around a real Rwandan or African challenge.",[["Community research","Community research"],["Ethical data plan","Ethical data plan"],["Prototype","Prototype"],["User testing","User testing"],["Model improvement","Model improvement"],["Impact presentation","Impact presentation"]],resources.nist),

  m(5,1,"Neural Networks","Neural Networks","Sobanukirwa neurons, layers, activation, loss n'uko network yiga.","Understand neurons, layers, activation, loss and network learning.",[["Artificial neuron","Artificial neuron"],["Layers","Layers"],["Activation functions","Activation functions"],["Loss functions","Loss functions"],["Gradient descent","Gradient descent"],["Overfitting","Overfitting"]],resources.tensorflow),
  m(5,2,"Computer Vision","Computer Vision","Tegura images, wige convolution kandi upime model ibona amashusho.","Prepare images, learn convolution and evaluate an image model.",[["Image tensors","Image tensors"],["Convolution","Convolution"],["Pooling","Pooling"],["Image augmentation","Image augmentation"],["Transfer learning","Transfer learning"],["Vision evaluation","Vision evaluation"]],resources.tensorflow,"annual"),
  m(5,3,"Language na NLP","Language and NLP","Hindura ururimi data, wige tokens, embeddings na text classification.","Turn language into data and learn tokens, embeddings and text classification.",[["Tokenisation","Tokenisation"],["Word frequency","Word frequency"],["Embeddings","Embeddings"],["Text classification","Text classification"],["Translation systems","Translation systems"],["Low-resource languages","Low-resource languages"]],resources.hf,"annual"),
  m(5,4,"Multilingual AI Project","Multilingual AI Project","Kora prototype yubaha Kinyarwanda n'izindi ndimi, uyipime ku bantu batandukanye.","Build and evaluate a prototype that respects Kinyarwanda and other languages.",[["Language needs","Language needs"],["Collecting consented text","Consented text collection"],["Baseline system","Baseline system"],["Error analysis","Error analysis"],["Inclusive testing","Inclusive testing"],["Project demonstration","Project demonstration"]],resources.hf,"annual"),

  m(6,1,"Generative AI","Generative AI","Menya uburyo models zitanga text, images cyangwa code n'aho zishobora kwibeshya.","Understand models that generate text, images or code and where they fail.",[["Generative vs predictive AI","Generative vs predictive AI"],["Language models","Language models"],["Image generation","Image generation"],["Hallucinations","Hallucinations"],["Context windows","Context windows"],["Responsible use","Responsible use"]],resources.openai,"annual"),
  m(6,2,"Prompt Design","Prompt Design","Andika prompts zifite context, constraints, examples n'ibipimo byo kugenzura answer.","Write prompts with context, constraints, examples and evaluation criteria.",[["Clear instructions","Clear instructions"],["Context","Context"],["Constraints","Constraints"],["Examples","Examples"],["Structured output","Structured output"],["Prompt evaluation","Prompt evaluation"]],resources.openai,"annual"),
  m(6,3,"Kubaka AI Assistant","Building an AI Assistant","Huza interface, server API, grounding, safety n'ibizamini bya assistant.","Connect an interface, server API, grounding, safety and assistant tests.",[["User journey","User journey"],["API basics","API basics"],["Server-side secrets","Server-side secrets"],["Grounding","Grounding"],["Safety rules","Safety rules"],["Assistant tests","Assistant tests"]],resources.openai,"annual"),
  m(6,4,"Learning Assistant Project","Learning Assistant Project","Kora assistant yigisha topic imwe, idatanga amakuru y'ibanga kandi igenzurwa n'abantu.","Build an assistant for one topic with privacy and human oversight.",[["Learning objective","Learning objective"],["Trusted source set","Trusted source set"],["Conversation design","Conversation design"],["Safety testing","Safety testing"],["Learner feedback","Learner feedback"],["Release notes","Release notes"]],resources.nist,"annual"),

  m(7,1,"AI Evaluation","AI Evaluation","Tegura test sets, metrics, human review na error analysis mbere yo kwizera system.","Design test sets, metrics, human review and error analysis before trusting a system.",[["Evaluation goals","Evaluation goals"],["Test datasets","Test datasets"],["Precision na recall","Precision and recall"],["Human evaluation","Human evaluation"],["Error categories","Error categories"],["Evaluation report","Evaluation report"]],resources.nist),
  m(7,2,"Responsible AI","Responsible AI","Suzuma fairness, privacy, transparency, accountability n'ingaruka ku bantu.","Examine fairness, privacy, transparency, accountability and human impact.",[["Fairness","Fairness"],["Privacy","Privacy"],["Transparency","Transparency"],["Accountability","Accountability"],["Human oversight","Human oversight"],["Impact assessment","Impact assessment"]],resources.oecd),
  m(7,3,"Security ya AI","AI Security","Rinda data, APIs na models; menya prompt injection n'uburyo bwo kugabanya risk.","Protect data, APIs and models; understand prompt injection and risk reduction.",[["Threat modelling","Threat modelling"],["Authentication","Authentication"],["Secret management","Secret management"],["Prompt injection","Prompt injection"],["Data leakage","Data leakage"],["Incident response","Incident response"]],resources.nist,"annual"),
  m(7,4,"AI Audit Project","AI Audit Project","Kora audit ya system ukoresheje evidence, risk register n'inama zo kuyinoza.","Audit a system using evidence, a risk register and improvement recommendations.",[["System inventory","System inventory"],["Stakeholder map","Stakeholder map"],["Risk identification","Risk identification"],["Test execution","Test execution"],["Risk prioritisation","Risk prioritisation"],["Audit briefing","Audit briefing"]],resources.nist),

  m(8,1,"Gushyira model muri application","Model Deployment","Menya APIs, containers, latency, versioning n'uburyo model ikorera users.","Learn APIs, containers, latency, versioning and serving models to users.",[["Inference","Inference"],["REST APIs","REST APIs"],["Containers","Containers"],["Latency","Latency"],["Versioning","Versioning"],["Rollback","Rollback"]],resources.pytorch,"annual"),
  m(8,2,"MLOps","MLOps","Tegura pipelines, experiment tracking, monitoring na retraining igenzurwa.","Design pipelines, experiment tracking, monitoring and controlled retraining.",[["Data pipelines","Data pipelines"],["Experiment tracking","Experiment tracking"],["Model registry","Model registry"],["Monitoring","Monitoring"],["Data drift","Data drift"],["Retraining policy","Retraining policy"]],resources.ml,"annual"),
  m(8,3,"AI Product Design","AI Product Design","Huza user needs, feasibility, safety, cost n'ibipimo bya product.","Combine user needs, feasibility, safety, cost and product metrics.",[["User research","User research"],["Value proposition","Value proposition"],["Human-AI interaction","Human-AI interaction"],["Cost planning","Cost planning"],["Success metrics","Success metrics"],["Responsible launch","Responsible launch"]],resources.nist,"annual"),
  m(8,4,"Production Prototype","Production Prototype","Shyira prototype kuri server y'igerageza, uyikurikirane kandi wandike operations guide.","Deploy a prototype to a test server, monitor it and write an operations guide.",[["Architecture diagram","Architecture diagram"],["Build pipeline","Build pipeline"],["Test deployment","Test deployment"],["Observability","Observability"],["Load testing","Load testing"],["Operations handover","Operations handover"]],resources.pytorch,"annual"),

  m(9,1,"Advanced Deep Learning","Advanced Deep Learning","Wige architectures zigezweho, attention, transformers n'uburyo bwo kuzipima.","Study modern architectures, attention, transformers and their evaluation.",[["Representation learning","Representation learning"],["Sequence models","Sequence models"],["Attention","Attention"],["Transformers","Transformers"],["Fine-tuning","Fine-tuning"],["Efficiency","Efficiency"]],resources.pytorch,"annual"),
  m(9,2,"Retrieval na Knowledge Systems","Retrieval and Knowledge Systems","Huza search, embeddings, vector indexes na citations kugira ngo answers zishingire ku masoko.","Combine search, embeddings, vector indexes and citations for grounded answers.",[["Information retrieval","Information retrieval"],["Embeddings","Embeddings"],["Vector search","Vector search"],["Chunking","Chunking"],["Grounded generation","Grounded generation"],["Citation evaluation","Citation evaluation"]],resources.hf,"annual"),
  m(9,3,"AI Agents na Automation","AI Agents and Automation","Tegura workflows zifite tools, state, approvals, limits na audit logs.","Design workflows with tools, state, approvals, limits and audit logs.",[["Workflow design","Workflow design"],["Tool use","Tool use"],["State and memory","State and memory"],["Approval gates","Approval gates"],["Failure recovery","Failure recovery"],["Agent evaluation","Agent evaluation"]],resources.openai,"annual"),
  m(9,4,"Team Capstone","Team Capstone","Korana n'itsinda mukore system yuzuye ifite research, prototype, evaluation na presentation.","Build a complete team system with research, prototype, evaluation and presentation.",[["Team roles","Team roles"],["Technical proposal","Technical proposal"],["Data governance","Data governance"],["Implementation sprint","Implementation sprint"],["Independent testing","Independent testing"],["Public demonstration","Public demonstration"]],resources.nist,"annual"),

  m(10,1,"AI Research Methods","AI Research Methods","Andika ikibazo cya research, usome papers, utegure experiment kandi wirinde conclusions zirenze evidence.","Frame research questions, read papers, design experiments and avoid claims beyond evidence.",[["Research questions","Research questions"],["Literature review","Literature review"],["Hypotheses","Hypotheses"],["Experimental design","Experimental design"],["Reproducibility","Reproducibility"],["Research ethics","Research ethics"]],resources.research),
  m(10,2,"Advanced Responsible Innovation","Advanced Responsible Innovation","Suzuma policy, society, environment n'uburenganzira mbere yo gushyira AI ku isoko.","Assess policy, society, environment and rights before releasing AI.",[["AI governance","AI governance"],["Rights and consent","Rights and consent"],["Environmental cost","Environmental cost"],["Labour impacts","Labour impacts"],["Public participation","Public participation"],["Governance proposal","Governance proposal"]],resources.oecd,"annual"),
  m(10,3,"Entrepreneurship ya AI","AI Entrepreneurship","Va ku kibazo nyakuri ujye kuri responsible business model, budget na pilot.","Move from a real problem to a responsible business model, budget and pilot.",[["Problem validation","Problem validation"],["Market research","Market research"],["Business model","Business model"],["Budget and pricing","Budget and pricing"],["Pilot design","Pilot design"],["Impact metrics","Impact metrics"]],resources.nist,"annual"),
  m(10,4,"Final Research Capstone","Final Research Capstone","Kora umushinga usoza imyaka 10: proposal, prototype, evaluation, report na defence.","Complete a final proposal, prototype, evaluation, report and defence.",[["Capstone proposal","Capstone proposal"],["Research plan","Research plan"],["Prototype build","Prototype build"],["Evaluation study","Evaluation study"],["Technical report","Technical report"],["Capstone defence","Capstone defence"]],resources.research,"annual")
];

function buildLesson(spec: ModuleSpec, topic: Topic, index: number): AcademyLesson {
  const [rw, en] = topic;
  return {
    id: `y${spec.year}-t${spec.term}-l${index + 1}`,
    number: index + 1,
    title: { rw, en },
    explanation: {
      rw: `${rw} ni igice cy'ingenzi cya ${spec.titleRw}. Muri iri somo usobanukirwa icyo ari cyo, impamvu gikoreshwa, n'uko wagikoresha utabangamiye umutekano cyangwa uburenganzira bw'abandi. ${spec.descriptionRw}`,
      en: `${en} is an essential part of ${spec.titleEn}. In this lesson you learn what it means, why it is used, and how to apply it without compromising safety or other people's rights. ${spec.descriptionEn}`
    },
    workedExample: {
      rw: `Urugero: umunyeshuri ahitamo ikibazo gito cyo mu ishuri cyangwa mu muryango, akoresha ${rw.toLowerCase()} mu gutegura igisubizo, yandika ibyo yakoresheje n'impamvu, hanyuma akagenzura ko igisubizo gishobora gusobanurwa n'undi muntu.`,
      en: `Worked example: a learner chooses a small school or community problem, applies ${en.toLowerCase()} to plan a solution, records the inputs and reasons, then checks that another person can understand the result.`
    },
    practice: {
      rw: `Igikorwa: andika urugero rumwe rwa ${rw.toLowerCase()} ubona mu buzima bwa buri munsi. Sobanura intambwe eshatu zo kurukoresha neza, risk imwe ishobora kubaho, n'uko wayigabanya.`,
      en: `Practice: identify one everyday example of ${en.toLowerCase()}. Write three steps for using it well, one possible risk, and one action that reduces that risk.`
    },
    check: {
      question: { rw: `Ni iki cyerekana ko wasobanukiwe neza ${rw.toLowerCase()}?`, en: `What best demonstrates an understanding of ${en.toLowerCase()}?` },
      options: {
        rw: [`Kubisobanura, kubikoresha ku rugero no kugenzura ingaruka`, "Gufata igisubizo cyose nka cyo", "Gusangira amakuru y'ibanga", "Gusimbuka igerageza"],
        en: ["Explain it, apply it to an example and check the impact", "Accept every output as correct", "Share private information", "Skip testing"]
      },
      answer: 0,
      feedback: {
        rw: `Igisubizo cya mbere ni cyo: ubumenyi bwa ${rw.toLowerCase()} bugaragarira mu gusobanura, gukoresha no kugenzura ingaruka.`,
        en: `The first answer is correct: understanding ${en.toLowerCase()} requires explanation, application and impact checking.`
      }
    }
  };
}

export const academyCurriculum: AcademyModule[] = specs.map((spec) => ({
  id: `year-${spec.year}-term-${spec.term}`,
  year: spec.year,
  term: spec.term,
  level: { rw: `Umwaka ${spec.year} · Igihembwe ${spec.term}`, en: `Year ${spec.year} · Term ${spec.term}` },
  title: { rw: spec.titleRw, en: spec.titleEn },
  description: { rw: spec.descriptionRw, en: spec.descriptionEn },
  estimatedHours: 18 + Math.min(spec.year, 7) * 2,
  prerequisites: {
    rw: spec.year === 1 && spec.term === 1 ? "Nta bumenyi bubanza bukenewe; umunyeshuri agomba kuba afite nibura imyaka 10." : "Kurangiza module ibanza muri uru rugendo.",
    en: spec.year === 1 && spec.term === 1 ? "No prior knowledge; learners should be at least 10 years old." : "Completion of the previous module in this pathway."
  },
  outcomes: {
    rw: [`Gusobanura neza ${spec.titleRw.toLowerCase()}`, "Gukoresha ubumenyi ku kibazo gifatika", "Kugaragaza umutekano, ukuri n'inshingano"],
    en: [`Explain ${spec.titleEn.toLowerCase()} clearly`, "Apply the knowledge to a practical problem", "Demonstrate safety, accuracy and responsibility"]
  },
  project: {
    title: { rw: `Umushinga: ${spec.titleRw}`, en: `Project: ${spec.titleEn}` },
    instructions: {
      rw: `Hitamo ikibazo gifitanye isano na ${spec.titleRw.toLowerCase()}. Tegura igisubizo gito, werekane intambwe wakoresheje, ibimenyetso by'uko gikora, risks n'uko wazigabanyije. Soza ukora presentation y'iminota itanu.`,
      en: `Choose a problem related to ${spec.titleEn.toLowerCase()}. Build a small solution, document the steps, provide evidence that it works, identify risks and mitigations, then give a five-minute presentation.`
    },
    rubric: {
      rw: ["40%: kumva no gukoresha concept", "25%: evidence n'igerageza", "20%: umutekano n'inshingano", "15%: ibisobanuro na presentation"],
      en: ["40%: concept understanding and application", "25%: evidence and testing", "20%: safety and responsibility", "15%: explanation and presentation"]
    }
  },
  resources: [spec.resource],
  review: spec.review,
  lessons: spec.topics.map((topic, index) => buildLesson(spec, topic, index))
}));

export const academyYears = Array.from({ length: 10 }, (_, index) => ({
  year: index + 1,
  modules: academyCurriculum.filter((courseModule) => courseModule.year === index + 1)
}));

export function findAcademyLesson(lessonId: string) {
  for (const courseModule of academyCurriculum) {
    const lesson = courseModule.lessons.find((item) => item.id === lessonId);
    if (lesson) return { module: courseModule, lesson };
  }
  return null;
}

export const academyCurriculumStats = {
  years: academyYears.length,
  modules: academyCurriculum.length,
  lessons: academyCurriculum.reduce((total, courseModule) => total + courseModule.lessons.length, 0)
};
