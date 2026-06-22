# Hibit Defense Systems - AI Ethics & Compliance Interview
## Interview with Noa Levine, AI Ethics & Compliance Lead

**Date:** January 20, 2026
**Duration:** 55 minutes
**Location:** Hibit HQ, Haifa, Israel - Legal Wing, Room L-201
**Interviewer:** Sarah Mitchell (SM), Lead Consultant, Milestone Advisory
**Interviewee:** Noa Levine (NL), AI Ethics & Compliance Lead, Legal & Compliance Division, Hibit Defense Systems

---

**[00:00:00] SM:** Alright, I think we are recording. Noa, thank you so much for making time today. I know you just got back from travel, so I really appreciate it.

**[00:00:08] NL:** Of course, happy to do it. And yes, I literally got back from Brussels on Thursday evening. The EU AI Act Stakeholder Forum -- three days of very intense panel discussions. My suitcase is still half-unpacked, honestly.

**[00:00:22] SM:** Oh, the Stakeholder Forum! I saw some of the coverage. Was it useful, or more of the same industry hand-wringing?

**[00:00:28] NL:** *laughs* A bit of both. The most useful sessions were the ones focused on implementation timelines. There is still a lot of uncertainty about the high-risk classification criteria, especially for dual-use technologies, which is obviously very relevant for us. I sat in on a breakout session specifically about defense and national security exemptions. The short version is: the exemption language is narrower than most defense companies assume. We cannot just wave a flag and say "defense" and walk away from compliance. But I will get into all of that later, I'm sure.

**[00:01:05] SM:** Absolutely, that is very much on my list. Before we dive in, just for the recording -- could you walk me through your background and how you ended up in this role? It is a pretty unique position.

**[00:01:17] NL:** Sure. So my background is -- I trained as a lawyer originally, did my LL.M. at Hebrew University with a focus on technology law and human rights. Then I spent almost six years at Deloitte in their Responsible AI practice, the last three years as a senior manager. I worked mostly with large enterprises in Europe -- financial services, telecom, a couple of pharma companies -- helping them build responsible AI frameworks. Governance structures, bias testing methodologies, that sort of thing.

**[00:01:50] SM:** That is solid grounding.

**[00:01:52] NL:** It was. But I hit a point where I felt like I was writing frameworks that went into binders and sat on shelves. I wanted to be inside an organization, actually implementing this, actually wrestling with the hard questions. And then this role opened up at Hibit. The timing was right. The defense context adds a layer of complexity that you simply do not get in banking or telecom. The stakes are fundamentally different when you are talking about systems that can influence life-or-death decisions.

**[00:02:22] SM:** Two years in now -- how has the reality compared to the expectation?

**[00:02:27] NL:** *pauses* Harder than I expected, if I am being honest. Not because of the ethical complexity itself -- I was prepared for that. It is the organizational dynamics. In consulting, everyone nods and agrees that ethics is important. Inside a defense company, you are constantly balancing ethics against program timelines, contract deliverables, and a deeply ingrained engineering culture that sees ethics review as... overhead. I have learned to pick my battles very carefully.

**[00:02:58] SM:** I appreciate the candor. Let us start with the structural picture. Can you describe the AI ethics governance structure at Hibit?

**[00:03:08] NL:** Yes, so at the top we have the AI Ethics Board. It was established in 2022, the same year as the AI Center of Excellence, and that was deliberate -- Col. Navon, our Chief AI Officer, pushed for both to be created simultaneously. He had the foresight to see that you cannot scale AI in defense without having a governance layer from the beginning.

**[00:03:32] SM:** Good. Walk me through the Board composition.

**[00:03:35] NL:** The Board has seven members. Three are internal: Col. Navon as CAO, our General Counsel Dina Levi, and Dr. Yael Shapira who is VP of AI and Innovation. Then we have four external members. The chair is Sgt. Maj. Adler, retired, who spent thirty years in IDF intelligence and now consults on defense ethics. We have Prof. Ruth Arnon from the Technion, who is an expert in computational ethics. We have a human rights lawyer -- I will not name her for confidentiality reasons but she is very well known in Israel -- and a philosopher from Tel Aviv University who specializes in just war theory.

**[00:04:18] SM:** That is a strong external representation. How often does the Board meet?

**[00:04:22] NL:** Quarterly. Four times a year, with the ability to convene emergency sessions if needed.

**[00:04:28] SM:** And how many emergency sessions have there been?

**[00:04:31] NL:** In the two years I have been here, one. It was related to HAWK-EYE v3.2 -- there was a bias testing result that flagged a significant issue with object classification accuracy across different terrain types, and we needed a Board-level decision on whether to pause a customer delivery. That was early 2025.

**[00:04:52] SM:** What was the outcome?

**[00:04:54] NL:** We paused the delivery for six weeks while the team recalibrated. It was the right call. The customer was not happy, obviously, but it was the right call.

**[00:05:05] SM:** Good. Now, let me ask about the ethics review process itself. When does a project trigger a mandatory ethics review?

**[00:05:13] NL:** So currently, the threshold is any AI or ML project with a budget exceeding one million dollars US. That triggers a mandatory Ethics Impact Assessment, which my team conducts. The assessment covers intended use, potential misuse scenarios, bias risk, human oversight requirements, data provenance, explainability needs, and regulatory implications.

**[00:05:40] SM:** One million dollars -- how did you land on that threshold?

**[00:05:44] NL:** It was a pragmatic decision when the process was established. The thinking was to capture all the major programs. And to be fair, it does capture most of them. Our production AI systems -- HAWK-EYE, ATLAS, IRON SHIELD, SENTINEL AI, PRISM, SHIELD -- they are all well above that threshold.

**[00:06:05] SM:** But?

**[00:06:07] NL:** But it misses things. FORGE, for example. It is our generative AI pilot for technical documentation -- using a large language model to auto-generate maintenance manuals and technical documentation. The budget is under a million, classified as a pilot project, so it never triggered an ethics review. And yet it is a GenAI system with real hallucination risks. If it generates incorrect maintenance procedures for a weapons system and someone follows those procedures... that is a safety issue.

**[00:06:42] SM:** Has anyone raised that concern internally?

**[00:06:45] NL:** I have. Multiple times. And Dr. Shapira agrees with me, to her credit. But changing the threshold requires Board approval and a revision to the AI Governance Policy, and the Board meets quarterly, so... *sighs* ...the pace of change is not always aligned with the pace of risk.

**[00:07:02] SM:** Understood. What about ORACLE? I saw it on the portfolio list.

**[00:07:07] NL:** ORACLE is still in the planned stage -- it is an LLM-based Q&A system for maintenance manuals. So a different approach to the same problem FORGE is trying to solve. ORACLE will be a retrieval-augmented generation system, so the hallucination risk profile is different, potentially lower. But it has not gone through any ethics review yet because it does not have a budget allocation. Once it gets funded, if it comes in above a million, it will trigger the review automatically. If it comes in under, it will fall into the same gap as FORGE.

**[00:07:40] SM:** Let me note that as a finding. The threshold-based trigger creates a gap for lower-budget but potentially high-risk projects. Is there a risk-based trigger at all, independent of budget?

**[00:07:53] NL:** Not currently, no. That is one of the changes I am proposing for 2026. I want to move to a dual-trigger system: budget threshold plus a risk classification trigger. So if a project involves generative AI, biometric data, autonomous decision-making, or interfaces with lethal systems, it should automatically trigger a review regardless of budget. I have the proposal written. I am presenting it to the Board in March.

**[00:08:22] SM:** Good. Let us talk about bias and fairness testing. Which systems currently undergo formal bias testing?

**[00:08:30] NL:** So HAWK-EYE v3.2 is our gold standard. It has the most mature bias testing regime. Because it is a computer vision system used for ISR and targeting on UAV platforms, we test extensively for demographic fairness in object detection -- ensuring the system performs consistently across different population demographics, different environments, urban versus rural, different lighting conditions, and different geographic regions. Dr. Stern's team in Aerospace runs quarterly bias audits using a test dataset that we refresh every six months.

**[00:09:08] SM:** What metrics do you use?

**[00:09:11] NL:** For HAWK-EYE, we track false positive rate parity, false negative rate parity, and equal opportunity metrics across demographic groups. We also measure performance degradation across geographic and environmental conditions. There is a defined acceptable variance threshold -- I believe it is five percent currently -- and any result outside that threshold triggers a remediation workflow.

**[00:09:38] SM:** That sounds robust. What about ATLAS?

**[00:09:42] NL:** ATLAS v2.1 is... a different story. It is the autonomous navigation system for unmanned ground vehicles. The focus has been heavily on safety testing -- obstacle avoidance, terrain navigation, mission completion rates. And that testing is thorough, I will give the team credit. But there is no formal bias testing framework for ATLAS. The argument from the engineering side is that navigation is a physics problem, not a fairness problem. You are navigating terrain, not making decisions about people.

**[00:10:15] SM:** And your view?

**[00:10:17] NL:** My view is that is too narrow. ATLAS makes decisions in populated environments. It decides which routes to take. It decides what constitutes an obstacle versus a passable area. If the training data is skewed toward certain environments -- and I suspect it is, because most of the test data comes from specific training grounds in the Negev and a facility in Arizona -- then the system may not perform equally well in, say, a dense South Asian urban environment or a West African village. That is a fairness issue even if you do not call it one.

**[00:10:52] SM:** Has this been escalated?

**[00:10:55] NL:** I raised it with the program manager, Tamar Azoulay, last quarter. She was receptive, but the response was essentially that the program is under delivery pressure and bias testing is not in the current test plan. It is on the backlog. I flagged it formally in my Q3 ethics report. It is documented.

**[00:11:15] SM:** And SHIELD v2.0? I understand there is a facial recognition component.

**[00:11:20] NL:** Yes. SHIELD is our AI-enhanced perimeter threat detection system. It has multiple sensing modalities -- thermal, radar, visual -- and one of those visual processing modules includes facial recognition for access control and threat identification. And yes, we have known demographic bias issues with that component.

**[00:11:42] SM:** Can you be specific?

**[00:11:44] NL:** The false positive rate for individuals with darker skin tones is approximately two-point-three times higher than for individuals with lighter skin tones. And for women with head coverings, it is about one-point-eight times higher. This is based on our internal testing from mid-2025. The team is working on it -- they have a remediation plan that involves expanding the training dataset and retraining the model. But the fix has been "in progress" for about seven months now.

**[00:12:18] SM:** Seven months is a long time for a known bias issue.

**[00:12:21] NL:** I agree. Between you and me, I think part of the problem is that the SHIELD program views the facial recognition module as a secondary feature, not the primary value proposition. The primary value is the multi-sensor fusion for perimeter detection. So the facial recognition bias gets deprioritized because the overall system "works." But that is not acceptable from an ethics standpoint. A biased facial recognition system is a biased facial recognition system regardless of what else the product does.

**[00:12:52] SM:** And PRISM? I saw a note about language bias.

**[00:12:56] NL:** PRISM v3.1 is our NLP system for signals intelligence and open-source intelligence analysis. It processes text in multiple languages -- Hebrew, Arabic, English, Farsi, Russian, Mandarin, and a few others. The bias concern there is linguistic. The system performs significantly better on formal written text than on informal dialect, slang, or code-switching. In Arabic, for example, performance on Modern Standard Arabic is strong, but on regional dialects -- Gulf Arabic, Levantine Arabic, Maghrebi Arabic -- the accuracy drops significantly. That is a bias issue with operational implications, because intelligence targets do not conveniently write in Modern Standard Arabic.

**[00:13:42] SM:** Has that been formally assessed?

**[00:13:44] NL:** Not formally, no. The data science team is aware of it -- they see it in their performance metrics. But there is no formal fairness assessment framework for NLP bias at Hibit. HAWK-EYE has one because computer vision bias is well-understood and there are established methodologies. NLP bias, especially for multilingual intelligence systems, is a less mature field. I do not have the in-house expertise on my team to design a rigorous NLP bias audit framework. That is a gap I have flagged.

**[00:14:15] SM:** Let me shift to human oversight. This is a critical area for defense AI. What are Hibit's requirements?

**[00:14:24] NL:** *leans forward* This is the area I feel most strongly about, and I will say, it is the area where Hibit has the clearest and most non-negotiable policy. Our Responsible AI Principles document -- published internally in 2023 and endorsed by the CEO -- states explicitly that all AI systems involved in lethal decision-making must maintain meaningful human control. We define three levels of human oversight.

**[00:14:52] SM:** Go on.

**[00:14:53] NL:** Level One is human-in-the-loop: a human operator must authorize every consequential action. This applies to HAWK-EYE when used in targeting mode and to IRON SHIELD v1.8 for threat classification and engagement recommendations. No engagement decision is made without a human operator confirming it. Period.

**[00:15:16] NL:** Level Two is human-on-the-loop: the system can operate autonomously but a human supervisor monitors and can intervene at any point. This applies to ATLAS v2.1 in navigation mode and SENTINEL AI v4.0 for cyber defense. The system acts, but a human is watching and can override.

**[00:15:38] NL:** Level Three is human-over-the-loop: the system operates based on pre-approved rules and parameters set by humans, with periodic human review. This applies to some of the lower-risk applications -- FORGE, some of the analytics tools.

**[00:15:56] SM:** And these levels are formally documented and enforced?

**[00:16:00] NL:** Documented, yes. Enforced... mostly. The policy is clear. The implementation is where it gets complicated. For HAWK-EYE and IRON SHIELD, the human-in-the-loop is enforced through the system architecture itself -- you literally cannot fire without human confirmation. That is hardcoded. For ATLAS, the human-on-the-loop is currently a procedural control, not a technical one. Meaning it depends on operators following procedure. I have been pushing to make it architectural.

**[00:16:35] SM:** That is an important distinction.

**[00:16:37] NL:** It is. An architectural control cannot be bypassed in the field. A procedural control can. And in a high-stress combat environment, procedural controls are the first thing to degrade.

**[00:16:50] SM:** Noted. Let me ask about your autonomous weapons policy specifically.

**[00:16:56] NL:** *pauses for several seconds* We have one. It was drafted in 2023, shortly after I joined. It is based on the principles of International Humanitarian Law -- distinction, proportionality, precaution. It states that Hibit will not develop fully autonomous weapons systems -- meaning systems that can select and engage targets without human intervention. We commit to meaningful human control in all lethal applications.

**[00:17:28] SM:** When was it last updated?

**[00:17:30] NL:** 2023. It has not been updated since it was written.

**[00:17:35] SM:** That is three years ago. The technology landscape has changed significantly.

**[00:17:39] NL:** You are right. And I am aware of that. The policy does not address several things that have emerged since 2023 -- swarm autonomy, for example. We are doing R&D on multi-agent autonomous systems. The policy was written for single-platform autonomy. It also does not address the increasing use of AI in target identification -- not just engagement, but the intelligence pipeline that leads to targeting decisions. Where does "human control" begin in that chain? The policy is silent on that.

**[00:18:12] SM:** Is an update planned?

**[00:18:14] NL:** I have it on my roadmap for Q2 2026. But I want to do it properly, with input from the Ethics Board, from operations, from legal. Not a quick patch.

**[00:18:26] SM:** Fair enough. Let us talk about explainability. What are Hibit's requirements for AI system explainability?

**[00:18:34] NL:** So this is another area where I would say we have good intentions but underdeveloped implementation. Our Responsible AI Principles state that AI systems should be "as transparent and explainable as reasonably possible given operational and security constraints." That is the language.

**[00:18:55] SM:** That is quite broad.

**[00:18:57] NL:** Very broad. And deliberately so, which is part of the problem. There are no formal explainability requirements defined by criticality level. HAWK-EYE has extensive explainability features -- saliency maps, confidence scores, classification rationale -- because the targeting use case demands it and because the program team invested in it. But that was a program-level decision, not a company-level requirement. Other systems have minimal explainability. SENTINEL AI v4.0, for example, generates anomaly alerts with confidence scores but limited explanation of why something was flagged. For a cyber defense tool, that may be acceptable. But there is no formal framework that says "for this criticality level, you need this level of explainability."

**[00:19:45] SM:** Another gap to note. Let me move to regulatory compliance. You mentioned the EU AI Act at the start. Where is Hibit on compliance readiness?

**[00:19:55] NL:** Early stage. And I want to be transparent about that because I think it is important that this assessment reflects reality. We have not yet formally mapped our AI portfolio against the EU AI Act risk classification framework. That mapping exercise is planned for Q1 2026 -- in fact, that is one of the things that the Brussels conference motivated me to accelerate.

**[00:20:20] SM:** What is the current understanding of where your systems would fall?

**[00:20:24] NL:** So the defense exemption under Article 2 does exclude AI systems developed exclusively for military purposes. But here is the nuance that most defense companies underestimate: dual-use. If a system has both military and civilian applications, or if a military-origin system is adapted for civilian use, the exemption may not apply. SHIELD v2.0 is a perfect example. The perimeter security system is sold to military customers, yes, but also to critical infrastructure operators, ports, airports. Some of those are clearly civilian applications. SENTINEL AI is another one -- cyber defense has obvious civilian applications.

**[00:21:08] SM:** So some of your systems may be in scope?

**[00:21:10] NL:** Some of them almost certainly are. SHIELD with its facial recognition component, if sold into the EU for civilian critical infrastructure protection, would likely be classified as high-risk under Annex III. PRISM, if any variant is used for law enforcement or border control purposes by EU customers, same thing. The facial recognition alone puts SHIELD squarely in the prohibited or high-risk category depending on the use case.

**[00:21:38] SM:** And ITAR and EAR implications? How do export controls interact with your AI models?

**[00:21:44] NL:** This is an area where we work very closely with our export compliance team. The fundamental issue is that AI models are a form of technical data. The trained model weights, the training data, the architecture -- these are potentially controlled under ITAR if the system is defense-specific. We have protocols for that. Where it gets complicated is with transfer learning and foundation models. If we take a commercially available model -- say, an open-source LLM -- and fine-tune it with classified or controlled data for a defense application, at what point does it become ITAR-controlled? We have a working policy on this but it is an evolving legal question.

**[00:22:30] SM:** Let me shift gears. Tell me about the responsible AI training program.

**[00:22:36] NL:** We launched mandatory AI ethics training in 2024 for all personnel who work on AI projects. That is developers, data scientists, program managers, testers, and their direct management. The training is a half-day session -- four hours -- covering our Responsible AI Principles, bias awareness, human oversight requirements, ethical decision-making frameworks, and the regulatory landscape. We also have a two-hour refresher course that runs annually.

**[00:23:05] SM:** What is the completion rate?

**[00:23:07] NL:** For the initial training, we have reached eighty-five percent of the target population. For the annual refresher, it is lower -- about seventy percent.

**[00:23:16] SM:** What accounts for the fifteen percent gap on the initial training?

**[00:23:19] NL:** Scheduling, mostly. We have engineers deployed at customer sites, field teams, people on extended international assignments. It is logistically difficult to get one hundred percent. I am working with HR to create an online self-paced version that field-deployed personnel can complete remotely. But -- and this is my personal frustration -- the training is awareness-level. It tells people why ethics matters. What it does not do is give them practical tools for their daily work. I want to develop role-specific modules. A data scientist needs different guidance than a program manager. We are not there yet.

**[00:23:58] SM:** How large is your team, Noa?

**[00:24:02] NL:** *laughs* Me and two others. I have one junior ethics analyst and one compliance specialist who splits time between AI ethics and general regulatory compliance. Three people. For twenty-five AI projects across a sixteen-thousand-person company.

**[00:24:20] SM:** That is... lean.

**[00:24:22] NL:** That is one way to put it. I submitted a headcount request for 2026. I asked for two additional FTEs -- a senior ethics analyst and a dedicated NLP or fairness testing specialist. I got approved for one. So we will be four people by mid-year. Maybe. If I can find someone with defense sector clearance who also has responsible AI expertise. That is a very small talent pool.

**[00:24:48] SM:** Understood. Let me ask about --

*[sound of door opening]*

**[00:24:52] NL:** Oh -- sorry, one second.

*[brief exchange in Hebrew with a colleague]*

**[00:25:05] NL:** Apologies. That was someone dropping off the quarterly ethics report drafts for my review. Where were we?

**[00:25:12] SM:** No problem at all. I was about to ask about whistleblower and concern reporting mechanisms. If someone at Hibit has an ethical concern about an AI system, what do they do?

**[00:25:23] NL:** We have an AI Ethics Concern Channel. It was established in 2024. Employees can report concerns either through an anonymous web form or by contacting my team directly. It is separate from the general compliance hotline, which I pushed for because I wanted people to feel that AI-specific concerns would be handled by someone who understands the technology, not just a generic compliance officer.

**[00:25:50] SM:** How many reports have you received?

**[00:25:52] NL:** Three in the past year.

**[00:25:55] SM:** That seems low for twenty-five AI projects. Do you think there is underreporting?

**[00:26:00] NL:** Honestly? Probably. Three reports from a population of several hundred AI practitioners is low. I think there are a few factors. One, people may not know the channel exists -- our awareness campaign was modest. Two, there is always a cultural barrier in defense organizations to reporting concerns. People worry about being seen as disruptive, about affecting program timelines. Three, some people may go directly to their management rather than using the formal channel, which means I never see the concern.

**[00:26:34] SM:** How are the three reports you did receive tracked and resolved?

**[00:26:38] NL:** Informally, I will admit. We have a shared spreadsheet. Each report gets logged with a date, summary, assigned owner, and status. But there is no formal case management system, no SLA for response time, no escalation protocol. If I am being self-critical, that is not good enough. If an auditor looked at our concern management process, they would find it lacking in rigor.

**[00:27:05] SM:** Can you share the nature of the three reports without identifying details?

**[00:27:10] NL:** Of course. One was about data provenance concerns for a training dataset -- the reporter was unsure whether proper consent had been obtained for some of the data used to train a model. That was substantive; we investigated and found that the consent documentation was actually in place but had not been properly linked in the data catalog. Second was a concern about SHIELD's facial recognition accuracy -- this was from an engineer who had independently noticed the demographic performance disparities before the formal testing confirmed it. They were right, and it validated what the testing later found. Third was about FORGE -- someone flagged that the GenAI pilot was generating outputs without proper review workflows, meaning generated content could potentially be included in technical documentation without a human verifying accuracy.

**[00:28:02] SM:** All three sound legitimate and actionable.

**[00:28:05] NL:** They were. Which is why the low volume worries me. If three out of three are substantive, it suggests there are more concerns out there that are not being reported.

**[00:28:15] SM:** Agreed. Let me ask about third-party AI. When Hibit integrates third-party AI components into your systems, is there an ethics review?

**[00:28:25] NL:** No. And this is a gap I want to be upfront about. Our ethics review process is focused on AI systems that we develop internally. When a program integrates a third-party component -- say, a commercial computer vision model from a vendor, or a pre-trained NLP model from an open-source project -- there is no formal ethics review of that component. The program team evaluates it for technical performance, for security, for export compliance. But not for bias, not for fairness, not for ethical alignment.

**[00:29:00] SM:** How prevalent is third-party AI integration?

**[00:29:03] NL:** More than you would think. FORGE uses a commercial large language model as its foundation. SENTINEL AI integrates some third-party threat intelligence ML models. Even HAWK-EYE has some components that originated from academic research partnerships. In each case, we trust that the AI component has been responsibly developed, but we do not verify it.

**[00:29:28] SM:** That is a significant gap, particularly as supply chain scrutiny increases.

**[00:29:32] NL:** I know. It is on my list. But when you are a team of three, you have to prioritize. And right now, the internal systems with the highest risk profile get my attention first.

**[00:29:44] SM:** Fair. Let us talk about the broader engagement with AI ethics frameworks. You mentioned Israel's National AI Ethics Framework. How does Hibit engage with that?

**[00:29:56] NL:** Israel published its national AI ethics principles in 2022 through the Innovation Authority. Hibit participated in the industry consultation process. Our Responsible AI Principles document is explicitly aligned with the national framework. We reference it. Col. Navon sits on an industry advisory panel that the Innovation Authority convenes twice a year. So at a policy level, we are engaged. At a practical level, the national framework is aspirational -- it sets principles but does not prescribe specific controls or requirements. It is not like the EU AI Act.

**[00:30:35] SM:** Speaking of the EU AI Act, let us come back to that. You mentioned the risk classification mapping. What is your timeline and approach?

**[00:30:43] NL:** So the plan is to complete the portfolio risk classification mapping by end of Q1 2026. That means taking each of our twenty-five AI projects, assessing the use cases -- especially the dual-use scenarios -- and determining which risk tier they would fall into under the Act. For any system classified as high-risk, we then need a gap analysis against the Article 9 through 15 requirements: risk management, data governance, technical documentation, transparency, human oversight, accuracy and robustness.

**[00:31:18] SM:** And what is your biggest concern about that exercise?

**[00:31:21] NL:** Honestly? The dual-use question. The exemption for purely military systems is clear. But Hibit is not purely military. We sell into homeland security, border protection, critical infrastructure, and some of those customers are in the EU. SHIELD is already sold to three EU customers for civilian applications. So we cannot hide behind the defense exemption for those use cases. My concern is that the organization has not fully internalized that yet. There is a mindset that says "we are a defense company, the EU AI Act does not apply to us." That is incorrect, and correcting that misconception is part of my job.

**[00:32:05] SM:** Let me ask about something specific -- the intersection of AI ethics and ITAR. When you have AI models that are export-controlled, how does that affect transparency and ethics reporting?

**[00:32:17] NL:** It creates real tension. Transparency is a core principle of responsible AI. But ITAR and national security classifications limit what you can disclose about a system's behavior, training data, performance characteristics. When an external stakeholder -- a regulator, a customer, a civil society organization -- asks for information about how HAWK-EYE makes decisions, we have to navigate between the ethical obligation to be transparent and the legal obligation to protect classified and controlled information. There is no easy answer. We try to provide the maximum transparency that is legally permissible, but "legally permissible" is sometimes very limited.

**[00:33:02] SM:** That is a challenge. Let me shift to post-deployment monitoring. Once an AI system is deployed to a customer, what ongoing ethics oversight exists?

**[00:33:12] NL:** This is an area where I have to be honest: it is weak. Our ethics review process is front-loaded. It happens during development -- the Ethics Impact Assessment, bias testing, the human oversight design review. But once a system is deployed, the ongoing monitoring is primarily technical -- performance monitoring, software updates, bug fixes. There is no formal process for ongoing post-deployment ethics monitoring. If the operating environment changes, if the system encounters scenarios not anticipated during development, if the user employs the system in a way we did not intend -- we do not have a systematic way to detect and respond to emerging ethical issues in deployed systems.

**[00:33:58] SM:** Is there any feedback mechanism from the field?

**[00:34:02] NL:** Customer support and field service teams will escalate technical issues, and sometimes those have an ethical dimension. But it is ad hoc. There is no structured "ethics in the field" reporting process. I would like to build one, but it requires buy-in from the customer-facing teams, and it requires a framework for what constitutes an "ethics incident" versus a "performance incident."

**[00:34:28] SM:** Noted. Let us talk about the GenAI governance gap you alluded to earlier. FORGE is in pilot, ORACLE is planned. Is there a GenAI-specific governance framework?

**[00:34:40] NL:** No. And I consider that one of our most pressing gaps. Generative AI introduces a fundamentally different risk profile than traditional ML systems. Hallucination, confabulation, prompt injection, data leakage, intellectual property concerns, the ability to generate persuasive misinformation -- these are risks that our existing governance framework was not designed to address. It was built for discriminative models, classification systems, computer vision, signal processing. GenAI is a different animal.

**[00:35:14] SM:** What is being done?

**[00:35:16] NL:** I drafted a GenAI governance framework proposal in November. It covers acceptable use policies, mandatory human review of all generated outputs, hallucination testing requirements, data isolation to prevent leakage of classified information into model context, and specific guidance on when GenAI is and is not appropriate in a defense context. It is with Dr. Shapira for review. I am hoping to get it to the Ethics Board by the Q1 meeting in March.

**[00:35:48] SM:** March again.

**[00:35:50] NL:** March again. *laughs* The Board meets quarterly. Everything queues up for the next Board meeting. It is -- look, I understand why a quarterly cadence was chosen. Getting seven busy people in a room is hard, especially with external members. But the reality is that AI development moves faster than a quarterly governance cycle. By the time the Board reviews something, the technology has often moved on. I have suggested moving to bimonthly meetings, or at minimum establishing a working committee that can make interim decisions. It is under consideration.

**[00:36:28] SM:** That seems important. Let me ask a broader question. When the Ethics Board or your team conducts a review, what criteria do you evaluate against?

**[00:36:38] NL:** Our Ethics Impact Assessment has twelve criteria. I can walk through them. Intended use and scope. Potential misuse scenarios. Impact on human rights and fundamental freedoms. Bias and fairness risks. Human oversight and control mechanisms. Data provenance and consent. Transparency and explainability. Safety and security. Environmental impact -- which is newer, we added it last year. Regulatory compliance. Alignment with Hibit's Responsible AI Principles. And proportionality -- is the AI approach proportionate to the problem, or could a simpler, less risky approach achieve the same outcome?

**[00:37:22] SM:** That is comprehensive. How rigorous is the evaluation in practice?

**[00:37:26] NL:** Variable. For the critical systems -- HAWK-EYE, IRON SHIELD, ATLAS -- the evaluation is thorough. Multiple reviews, deep technical analysis, Board involvement. For the high-priority but less visible systems, it can be more cursory. Three people, twenty-five projects, limited bandwidth. We prioritize depth on the systems with the highest risk.

**[00:37:50] SM:** How do you ensure that divisions actually implement the Ethics Board's recommendations?

**[00:37:56] NL:** Ah. That is -- that is the question, is it not? *pauses* The honest answer is that we have limited visibility. The Ethics Board makes recommendations. The program teams acknowledge them. But there is no formal tracking mechanism to ensure implementation. We do not have an ethics recommendation tracker with assigned owners and due dates and escalation paths. I find out whether recommendations were implemented when I do periodic check-ins with program managers, which are informal and dependent on their willingness to engage. Some teams are excellent -- HAWK-EYE's team actively partners with us. Other teams view ethics as a checkbox exercise and give us the minimum required engagement.

**[00:38:42] SM:** That is a common challenge. Before we wrap up, I want to come back to one thing. Col. Navon -- the Chief AI Officer. How would you characterize his support for the ethics function?

**[00:38:54] NL:** Strong. Genuinely strong. Col. Navon is the reason the ethics function exists. He created the Ethics Board, he pushed for the Responsible AI Principles, he backed me in the HAWK-EYE delivery pause. He understands that responsible AI is not a constraint on innovation; it is a precondition for trust. Without trust, you cannot sell AI systems to governments. His support is why we have what we have. The challenge is that his support alone is not enough. He can mandate structure. He cannot mandate culture. And cultural change -- getting every engineer, every program manager, every business development lead to internalize these principles -- that takes more than a governance framework. It takes time, persistent engagement, and frankly, more resources than I currently have.

**[00:39:48] SM:** Well said. A couple of quick items before we close. The Israel National AI Ethics Framework you mentioned -- does Hibit formally report or disclose against it?

**[00:39:58] NL:** Not formally. It is voluntary. We align our principles with it, but there is no formal disclosure or reporting mechanism required. Some companies in Israel are starting to publish responsible AI reports voluntarily. I have recommended we do the same -- even a modest annual transparency report. But it is not a priority for leadership at this time. The concern is disclosing information that could be competitively sensitive or that could raise questions from activist groups.

**[00:40:28] SM:** One more question on dual-use. You mentioned some of your systems have civilian applications. How do you manage the ethical implications when a system designed for military use gets adapted for civilian contexts?

**[00:40:40] NL:** Inconsistently, to be blunt. There is no formal dual-use ethics review process. When the business development team identifies a civilian application for a military-origin system, the review focuses on export compliance, contract terms, and technical adaptation. The ethics dimension -- does the civilian use case introduce new fairness concerns, new transparency requirements, new human oversight needs -- is not systematically evaluated. SHIELD is the most visible example. When it was adapted for civilian port security, nobody asked whether the facial recognition bias that is "acceptable" in a military context -- and I use that word with heavy quotation marks -- becomes unacceptable in a civilian access control context. It does. But the question was never formally asked.

**[00:41:28] SM:** That is an important observation. Noa, I think we have covered a tremendous amount of ground. Let me give you a chance -- is there anything we have not discussed that you think is important for this assessment?

**[00:41:42] NL:** Two things. First, I want to flag the pace issue explicitly. The AI landscape is accelerating. Generative AI went from novelty to production deployment in two years. Agentic AI is next. Multi-agent autonomous systems are on our R&D roadmap. Our governance framework was designed for a world of narrow, supervised AI systems. We need to evolve it faster than we are currently evolving it, and that requires investment -- in people, in tools, in organizational commitment. Three people and a quarterly Board meeting are not sufficient for the challenge we face.

**[00:42:20] NL:** Second -- and this is something I feel strongly about as someone who works in defense AI -- the conversation about autonomous weapons and AI ethics in the defense context is too often binary. People say "ban killer robots" or "full speed ahead on autonomy." The reality is more nuanced. The question is not whether to use AI in defense. It is how to use it responsibly, with meaningful human control, with rigorous testing, with accountability. Hibit, for all the gaps we have discussed today, is genuinely trying to get this right. I would not have left consulting to join a company that was not. But trying is not the same as succeeding, and there is still a lot of work to do.

**[00:43:08] SM:** I appreciate that perspective, Noa. And the candor throughout this entire conversation has been extremely valuable. Just to confirm for the record -- is there anything you shared today that you would like to flag as confidential beyond the standard NDA we have in place?

**[00:43:25] NL:** No, everything I shared is within the scope of the assessment. I would ask that the specific bias metrics I quoted for SHIELD -- the two-point-three and one-point-eight multipliers -- be treated as internal data and not included in any client-facing deliverable without sanitization.

**[00:43:42] SM:** Absolutely, we will handle that appropriately. Thank you so much, Noa. This has been one of the most informative sessions in this assessment.

**[00:43:50] NL:** Thank you, Sarah. I hope it is useful. And if you need anything follow-up -- clarifications, documents -- just email me directly. I want this assessment to be as thorough as possible.

**[00:43:58] SM:** I will definitely take you up on that. We will stop the recording here.

**[00:44:02]** *[End of recorded session]*

---
