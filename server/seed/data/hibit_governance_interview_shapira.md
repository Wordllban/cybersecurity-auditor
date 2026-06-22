# Hibit Defense Systems - AI Governance Interview
## Interview with Dr. Yael Shapira, VP AI & Innovation

**Date:** January 15, 2026
**Duration:** 62 minutes
**Location:** Hibit HQ, Haifa, Israel - Conference Room 4A
**Interviewer:** Sarah Mitchell (SM), Lead Consultant, Milestone Advisory
**Interviewee:** Dr. Yael Shapira (YS), VP AI & Innovation, Hibit Defense Systems
**Note Taker:** Daniel Kovacs (DK), Milestone Advisory

---

**[00:00:00] SM:** Good morning, Dr. Shapira. Thank you for making time for us today. I know your calendar is, well, I imagine it's quite packed.

**[00:00:08] YS:** Good morning, Sarah. And please, call me Yael. We'll be spending the next hour together, no need for formality. Daniel, welcome as well. Can I get either of you anything? There's coffee, tea -- I just had some brought up.

**[00:00:22] SM:** Coffee would be wonderful, actually. We flew in from London last night and I'm still catching up.

**[00:00:28] YS:** Oh, you came from the London office? Did you meet with anyone at Hibit Europe while you were there?

**[00:00:33] SM:** Not this trip, no. We'll be scheduling those sessions in February. But the flight was direct from Heathrow, so at least there's that.

**[00:00:41] YS:** Good, good. Haifa is beautiful this time of year, actually. It's been cooler than usual -- maybe twelve, thirteen degrees -- but the sky is clear. If you have any free time, you should walk down to the Baha'i Gardens. Absolutely stunning in the winter light. Here, let me pour you a cup. Milk?

**[00:00:58] SM:** Just black, thank you. That's perfect.

**[00:01:03] YS:** Daniel?

**[00:01:05] DK:** I'm fine, thank you. I had two cups already this morning.

**[00:01:09] YS:** A wise man knows his limits. So, Sarah, where would you like to begin?

**[00:01:15] SM:** Right. So, as you know, Milestone Advisory has been engaged to conduct an AI security posture assessment across Hibit Defense Systems. This session is focused specifically on AI governance -- the structures, strategy, accountability, and so forth. We'll be speaking with several of your colleagues over the next two weeks on more technical topics -- MLOps, model security, data governance -- but today we want to understand the governance framework from the top down. Does that framing work for you?

**[00:01:48] YS:** Absolutely. Governance is really where everything starts, or at least where it should start. I've been looking forward to this conversation, honestly. It's not often we get an external perspective on how we've structured things, and I think it will be valuable.

**[00:02:04] SM:** Great. So let's start with the big picture. Can you walk me through the AI governance structure at Hibit? Who owns AI governance, how is it organized, and what are the key decision-making bodies?

**[00:02:18] YS:** Sure. So the AI governance structure as it exists today was really formalized in mid-2023, about six months after we established the AI Center of Excellence. The AI CoE was stood up in late 2022, under the Intelligence & Cyber division initially, and I was brought on to lead it in January 2023. But let me give you the current picture.

At the top, we have Col. -- sorry, retired Colonel -- Eyal Navon, who is our Chief AI Officer. Eyal reports directly to the CEO. He was appointed about a year and a half ago, in July 2024. Before that, AI governance was essentially my responsibility as VP of AI & Innovation, but we recognized that we needed a C-suite voice for AI, especially given the regulatory landscape and, frankly, the board's increasing interest.

**[00:03:12] SM:** So the CAO role is relatively new?

**[00:03:15] YS:** Yes, a year and a half. And I'll be honest, it's still a work in progress in terms of, um, organizational influence. Eyal comes from a very strong operational background -- twenty-five years in the IDF, including senior roles in intelligence -- so he has enormous credibility internally, particularly with the Aerospace and Land divisions. But building the governance muscle, the cross-functional authority, that takes time. We're not there yet.

**[00:03:45] SM:** That's a candid assessment. Let me ask -- what's the primary governance body?

**[00:03:52] YS:** The AI Governance Board. It was established in September 2023, and it meets monthly. Eyal chairs it. The membership includes myself, Dr. Avi Koren our CTO, Rachel Goldberg our CISO, the heads of each division -- or their designated AI leads -- Noa Levine who is our AI Ethics and Compliance Lead, and Sgt. Major Ret. Ron Adler, who chairs our AI Ethics Board and is an external member. Ron is a fascinating character, by the way. He spent thirty years in special operations and now teaches applied ethics at the Technion. He brings a very grounded perspective.

**[00:04:38] SM:** How would you describe the board's mandate?

**[00:04:42] YS:** The mandate is to provide strategic oversight of all AI activities across the company. In practice, that means reviewing and approving AI projects above a certain threshold -- currently projects with a budget above one million dollars U.S. or projects classified as high-risk. We also review the AI strategy, the AI risk register, and any incidents or near-misses related to AI systems. And we provide guidance on policy -- AI ethics policy, model governance policy, data governance for AI, that sort of thing.

**[00:05:18] SM:** You mentioned a one-million-dollar threshold. What happens with projects below that?

**[00:05:24] YS:** That's... a fair question, and it's actually something we've been debating internally. Projects below the threshold are governed at the division level. Each division has its own AI steering committee, and they're supposed to follow the centralized AI governance framework that the CoE publishes. But in practice -- and I want to be transparent here -- the enforcement is inconsistent. Some divisions are very disciplined. Intelligence & Cyber, which is where the CoE originated, follows the framework closely. Aerospace is reasonably good. But Land & C4ISR and Homeland Security tend to operate with more autonomy. It's a cultural thing as much as anything.

**[00:06:08] SM:** So there's a consistency challenge across divisions?

**[00:06:12] YS:** Yes. And the one-million-dollar threshold is probably too high, if I'm being honest. We have projects in the two-hundred-thousand to five-hundred-thousand dollar range that involve, you know, computer vision or autonomous decision-support, and they're making it through the division-level review without the AI Governance Board ever seeing them. Noa Levine has been pushing to lower the threshold, or to implement a risk-based trigger instead of a purely financial one. I agree with her, but it's a political conversation. The division heads don't want more bureaucracy.

**[00:06:48] SM:** That's a common tension. Let's talk about strategy. You mentioned an AI strategy -- can you tell me about that?

**[00:06:56] YS:** Yes, we have a formal AI strategy document called "AI Vision 2028." It was developed in the first half of 2024, approved by the board -- the corporate board, I mean, not the AI Governance Board -- in September 2024. It's a five-year roadmap that covers our strategic objectives for AI across all divisions.

The pillars are, let me think... first, operational AI -- embedding AI into our core defense products, which is obviously the highest priority. Second, enterprise AI -- using AI to improve internal processes, supply chain, manufacturing, HR, that kind of thing. Third, responsible AI -- building the governance, ethics, and safety capabilities to ensure we deploy AI responsibly. And fourth, AI talent and culture -- which includes training, hiring, and establishing an AI-fluent workforce.

**[00:07:50] SM:** And the budget you mentioned, the one-hundred-eighty million dollars -- how does that break down across those pillars?

**[00:07:58] YS:** Roughly, and these are FY2025 numbers, operational AI gets about sixty percent, so about a hundred and eight million. Enterprise AI is about fifteen percent, maybe twenty-seven million. Responsible AI and governance is about ten percent, eighteen million. And the remaining fifteen percent goes to talent, infrastructure, and what we call "exploratory" -- research partnerships, university collaborations, that sort of thing.

**[00:08:30] SM:** Eighteen million for responsible AI and governance -- that's actually not bad relative to overall spend. Is that a dedicated budget line?

**[00:08:38] YS:** It is, yes. That was something Eyal fought hard for when he came on board. Before his appointment, responsible AI spending was buried in various departmental budgets and it was very difficult to track. Having a dedicated line item gives us visibility and, more importantly, it sends a signal to the organization that this is a priority.

**[00:08:58] SM:** Excellent. Now, I want to move into the specifics of your AI systems portfolio. Can you give me a sense of scale? How many AI and ML projects does Hibit have in various stages?

**[00:09:12] YS:** As of our last count -- and I should caveat that the count itself is part of the problem -- we have approximately twenty-five AI and ML projects that we track formally. Twelve of those are in production, about eight are in development or testing, and the remainder are in planning or early pilot stages.

**[00:09:35] SM:** You said "the count itself is part of the problem." Can you elaborate?

**[00:09:40] YS:** Yes. So we don't have a comprehensive AI model inventory. This is one of our known gaps. The twenty-five projects I mentioned are the ones that are formally registered with the AI CoE. But we know there are more. Oren Tal, who heads MLOps, did an internal survey about four months ago and estimated that we're tracking maybe sixty percent of all AI-related work across the company. There are models embedded in legacy systems that were built five, six years ago that nobody formally tracks as AI. There are small-scale ML models that division data science teams have built and deployed without going through the CoE. And then there's the, um, the shadow AI issue.

**[00:10:22] SM:** Shadow AI?

**[00:10:24] YS:** Yes. We've detected -- Rachel Goldberg's team flagged this -- that some engineers and analysts are using commercial AI tools like ChatGPT, Claude, various LLM APIs, without formal approval. Now, in some cases this is relatively benign -- people using it for code assistance or drafting emails. But in a defense environment, the data sensitivity implications are enormous. We've issued guidelines, but we haven't implemented hard technical controls yet. That's on the roadmap for Q2 this year.

**[00:10:58] SM:** That's a significant concern, especially given the ITAR and classification implications. Let's talk about the production systems. Can you walk me through the critical ones?

**[00:11:10] YS:** Of course. So our most critical AI systems -- the ones that the AI Governance Board classifies as "Critical" -- there are four of them.

First is HAWK-EYE, currently at version 3.2. It's a computer vision system for ISR and targeting, deployed on our Hermes series UAVs. It does real-time object detection, classification, and tracking. This is, without question, our most sensitive AI system because it's directly involved in the targeting chain. The technical owner is Dr. Michael Stern, who heads Data Science in the Aerospace division.

**[00:11:52] SM:** And HAWK-EYE goes through the full governance review?

**[00:11:56] YS:** Absolutely. Every model update, every training data change, every deployment goes through a formal review process. We have what we call a "Model Release Board" specifically for HAWK-EYE that includes representation from the AI CoE, Aerospace division, AI Ethics Board, and our customer -- which in most cases is the Israeli MOD. Prof. David Chen, who heads AI Testing and Validation, personally oversees the validation pipeline for HAWK-EYE.

**[00:12:28] SM:** Good. What are the other critical systems?

**[00:12:32] YS:** ATLAS version 2.1 -- autonomous navigation for unmanned ground vehicles. It's critical because it controls vehicle movement in operational environments. IRON SHIELD version 1.8 -- AI-based threat classification for our air defense systems. It's analyzing radar and sensor data to classify incoming threats. And SENTINEL AI version 4.0 -- anomaly detection for cyber defense, which protects our own networks and is also sold as a product.

**[00:13:05] SM:** And below the critical tier?

**[00:13:08] YS:** We have several "High" criticality systems. MANTIS version 2.5, which is predictive maintenance -- it analyzes sensor data from deployed systems to predict component failures. PRISM version 3.1, which is our NLP platform for SIGINT and OSINT analysis. These are important but they're decision-support tools, not autonomous systems, so the risk profile is different.

Then we have some newer, lower-criticality projects. FORGE, version 0.9, is a pilot -- a generative AI system for producing technical documentation. We're using it internally right now for maintenance manuals and technical bulletins. And ORACLE, version 0.3, is planned -- it's an LLM-based Q&A system for maintenance technicians to query maintenance manuals using natural language. That one is still in early planning.

**[00:13:58] SM:** Let me come back to the governance of these systems. You mentioned the Model Release Board for HAWK-EYE. Is there an equivalent process for the other critical systems?

**[00:14:08] YS:** There should be, and that's one of the areas where we're still maturing. HAWK-EYE gets the most rigorous treatment because of its role in the targeting chain and because of the external customer requirements. ATLAS has a similar, though slightly less formal, review process because it was developed more recently and we built governance in from the start. IRON SHIELD and SENTINEL AI are... let me think about how to put this. They have review processes, but they were built under the old paradigm, before the AI Governance Board existed, so the governance was retrofitted. It's adequate but not exemplary.

**[00:14:52] SM:** That's helpful context. I want to shift to risk appetite now. How does Hibit think about AI risk, particularly for autonomous and potentially lethal systems?

**[00:15:04] YS:** This is probably the most important and most difficult topic we deal with. So, at a high level, our AI risk appetite is defined in the AI Vision 2028 document and in a separate AI Risk Appetite Statement that was approved by the corporate board in early 2025.

The framework distinguishes between four risk tiers. Tier 1 is "human-in-the-loop" -- AI provides recommendations but a human makes all decisions. Tier 2 is "human-on-the-loop" -- AI can take actions autonomously but a human monitors and can intervene. Tier 3 is "human-supervised autonomy" -- AI operates independently within defined parameters, with periodic human review. And Tier 4 is "full autonomy" -- which, for lethal or safety-critical applications, we do not pursue. Period. That's a bright line in our risk appetite.

**[00:16:02] SM:** So Tier 4 for lethal applications is explicitly off the table?

**[00:16:06] YS:** Correct. And that's a corporate board decision, not just a management decision. It's actually written into our corporate governance charter as of last year. For lethal applications -- and HAWK-EYE is the primary example -- we operate at Tier 2. AI identifies and classifies targets, but a human operator authorizes any engagement. Always. No exceptions.

**[00:16:30] SM:** And for non-lethal applications?

**[00:16:33] YS:** For non-lethal, non-safety-critical applications, we're more flexible. MANTIS, the predictive maintenance system, operates at Tier 3 -- it can autonomously generate maintenance alerts and even adjust maintenance schedules without human approval, because the worst case is an unnecessary inspection, not a safety incident. FORGE, the documentation generator, is Tier 1 -- everything it produces is reviewed by a technical writer before publication.

**[00:17:00] SM:** Is the risk tiering applied consistently across all AI projects?

**[00:17:05] YS:** For the ones we track formally, yes. The risk tiering is part of the project registration process with the AI CoE. But -- and this goes back to the inventory gap -- for the projects we don't track, we can't say. That's a gap we need to close.

**[00:17:22] SM:** Understood. Let me ask about --

*[Brief interruption -- a knock at the door]*

**[00:17:28] YS:** Sorry, one moment. -- Yes? Oh, Tamar, hi. Can it wait? I'm in the middle of -- okay, tell Oren I'll call him back after lunch. Thank you. -- Sorry about that. Tamar Azoulay, our AI Program Manager. There's apparently some issue with the MLOps pipeline that Oren needs to discuss, but it can wait.

**[00:17:52] SM:** No problem at all. So, I wanted to ask about ISO 42001. Where is Hibit on that journey?

**[00:18:00] YS:** Ah, good. So ISO 42001 is our target framework for the AI management system. We made the decision to pursue certification in early 2025, and we completed a gap assessment in Q3 2025 -- September, specifically. We brought in an external consultancy, not Milestone, a different firm -- to conduct the assessment against the standard.

**[00:18:28] SM:** And what were the high-level findings?

**[00:18:32] YS:** The good news is that our governance structure maps reasonably well to the ISO 42001 requirements. The AI Governance Board, the risk framework, the strategy document, the ethics board -- these are all elements that the standard looks for, and we have them. The gap assessment rated us as "partially conforming" overall, which for a defense company that only stood up its AI governance two years ago, I think is actually reasonable.

The major gaps that were identified -- and some of these will sound familiar from what I've already mentioned -- were the model inventory, which is a Clause 8 issue. The lack of standardized AI risk assessment across divisions, which is Clause 6. The absence of a formal AI incident response plan -- we use the general cybersecurity incident response plan, but it doesn't adequately address AI-specific scenarios like model drift, adversarial attacks on ML models, or training data poisoning. That's a Clause 10 issue.

**[00:19:32] SM:** What about the AI-specific controls in Annex B?

**[00:19:36] YS:** That's where we have the most work to do, honestly. Some of the Annex B controls around AI impact assessment, third-party AI governance, and AI system decommissioning -- we're weak on those. We don't have a formal process for decommissioning AI models, for example. When a model reaches end of life, it's handled ad hoc. There's no standardized process for ensuring that the model, the training data, the artifacts are properly archived or destroyed, that downstream systems are updated, that the risk register is revised. It's... it's just not something we've built yet.

**[00:20:12] SM:** And the third-party AI component governance you mentioned?

**[00:20:17] YS:** Right. So, many of our AI systems incorporate third-party components. Pre-trained models, open-source libraries, vendor APIs. Our procurement process evaluates these from a technical and cybersecurity perspective, but it doesn't specifically assess AI-related risks. For example, if we're using a pre-trained computer vision model from a third-party vendor as a starting point for HAWK-EYE, our current process would evaluate the vendor's security posture and the software quality, but it wouldn't necessarily assess the training data provenance, potential biases in the base model, or the vendor's own AI governance maturity. Amit Rozner, our AI Security Architect, has been flagging this for months. He's drafted a proposal for an AI-specific third-party assessment framework, but it hasn't been approved yet.

**[00:21:08] SM:** That's an important gap, especially given the supply chain risks in defense. Let me ask about the NIST AI RMF. Are you using that framework as well, or is it purely ISO 42001?

**[00:21:20] YS:** We're using both, actually, though ISO 42001 is the primary framework because that's what we're pursuing certification against. But the NIST AI Risk Management Framework is particularly relevant for Hibit America -- our Fort Worth operation -- because many of our U.S. contracts reference NIST standards. And honestly, I find the NIST framework's GOVERN function very useful as a conceptual model even if we're implementing against ISO 42001.

**[00:21:50] SM:** How would you assess your maturity against the GOVERN function specifically?

**[00:21:56] YS:** Let me think about that for a moment. Um... The GOVERN function has several categories. For GOVERN 1 -- policies, processes, procedures, and practices -- I'd say we're at a moderate level. We have the policies, we have some processes, but as I've mentioned, implementation is inconsistent. GOVERN 2 -- accountability structures and organizational governance -- we're actually fairly strong. The AI Governance Board, the CAO role, the AI CoE, the ethics board -- structurally, we're in good shape. GOVERN 3 -- workforce diversity, equity, inclusion, and accessibility considerations -- honestly, we haven't addressed this systematically for AI. Our AI teams are technically excellent but not particularly diverse, and we haven't done an AI-specific DEIA assessment.

For GOVERN 4 -- organizational risk culture -- I'd say it's a mixed picture. In the defense product divisions, there's a very strong culture of safety and risk management, because it's the nature of the work. But for enterprise AI and the newer generative AI initiatives, the risk culture is less mature. People are excited about the technology and sometimes the governance feels like it's slowing them down.

**[00:23:08] SM:** That's a very thorough self-assessment. You mentioned board-level oversight earlier. Can you tell me more about how the corporate board engages with AI topics?

**[00:23:18] YS:** Yes. So Eyal Navon presents a quarterly AI briefing to the CEO, and that briefing is then summarized for the corporate board. The board itself doesn't have a dedicated AI committee -- there's been discussion about creating one, but for now AI falls under the Technology and Innovation Committee. They receive the quarterly briefing and they have the authority to approve or reject major AI investments and policy changes, like the risk appetite statement and the lethal autonomy bright line I mentioned.

**[00:23:52] SM:** Do you think the board has sufficient AI literacy to provide effective oversight?

**[00:23:58] YS:** *[pause]* That's a diplomatically challenging question. I would say that the board's AI literacy is... improving. When Eyal started the quarterly briefings, there was a lot of very basic education required. What is machine learning, what is a neural network, that sort of thing. The board members are very capable people -- generals, executives, academics -- but AI was not their domain. I think today they understand the strategic implications reasonably well. Whether they can provide truly effective technical governance oversight -- I'm less certain. But honestly, that's what the AI Governance Board is for. The corporate board sets the strategic direction and risk appetite; the AI Governance Board handles the technical governance.

**[00:24:48] SM:** Fair enough. Let's talk about the AI CoE's relationship with the divisions. You mentioned some consistency challenges. Can you paint a more detailed picture?

**[00:24:58] YS:** Sure. So the AI CoE is, um, structurally under the Intelligence & Cyber division, which is where it was incubated. That creates an inherent challenge because the other divisions sometimes see the CoE as an Intelligence & Cyber function rather than a corporate function. We've tried to address this by having Eyal, as CAO, reporting to the CEO rather than to the Intelligence & Cyber division head, but in practice, the CoE's operational staff -- the data scientists, the MLOps engineers, the governance analysts -- they're still in the Intelligence & Cyber org chart.

**[00:25:38] SM:** So how does the CoE influence what happens in, say, the Aerospace division?

**[00:25:44] YS:** Through a hub-and-spoke model, at least in theory. The CoE provides centralized frameworks, policies, standards, tooling, and training. Each division has an AI lead who is supposed to implement these within their division and who has a dotted-line reporting relationship to me. In practice, it works well with some divisions and less well with others.

Aerospace is probably the best example of it working. Dr. Michael Stern, who heads Data Science there, is very aligned with the CoE's approach. He was actually one of the early advocates for establishing the CoE. Land & C4ISR is more challenging. They have a strong engineering culture and they tend to, um, let's say, interpret the guidelines more liberally. Homeland Security is similar. And the international operations -- Hibit America and Hibit Europe -- are largely autonomous on AI governance, which is a problem.

**[00:26:40] SM:** What do you mean by "largely autonomous"?

**[00:26:44] YS:** I mean that Hibit America in Fort Worth has its own AI team, its own processes, and while they nominally follow the corporate AI governance framework, the practical reality is that they operate largely independently. Part of this is by necessity -- they deal with U.S. classified programs, ITAR restrictions, and U.S. customer requirements that the Israel-based CoE can't always access. But part of it is simply organizational distance. We're working on it. Eyal visited Fort Worth in November and is establishing a more formal governance coordination mechanism, but it's early days.

**[00:27:22] SM:** That's a common challenge in multinational defense companies. Let me shift to the topic of AI ethics. You mentioned an AI Ethics Board and Noa Levine as the AI Ethics and Compliance Lead. How does the ethics review process work?

**[00:27:38] YS:** So the AI Ethics Board is a separate body from the AI Governance Board. It's chaired by Ron Adler, who as I mentioned is external, and it includes Noa Levine, two internal members -- one from engineering and one from legal -- and two additional external members, one from academia and one from the Israeli civil liberties community. The board reviews AI projects that are flagged as potentially raising ethical concerns.

The challenge, as I alluded to earlier, is what triggers a review. Currently, the trigger is either a budget threshold -- the same one-million-dollar threshold as the Governance Board -- or a specific request from a project team or division AI lead. There's no mandatory ethics screening for all AI projects. So lower-budget projects that might still raise significant ethical issues -- a facial recognition pilot, a social media monitoring tool -- could in theory proceed without an ethics review if nobody flags them.

**[00:28:36] SM:** Has that actually happened?

**[00:28:39] YS:** *[pause]* There was an... incident. I shouldn't call it an incident, that's too strong. There was a situation about eight months ago where a team in the Homeland Security division developed a prototype -- a proof of concept -- for behavioral anomaly detection in public spaces. It was a relatively small project, maybe three hundred thousand dollars, and it went through the division-level review but was not flagged for ethics review. When Noa found out about it, she was -- let's say she had strong opinions. The project was paused and retroactively sent through the ethics review process, and ultimately it was approved with conditions. But it highlighted the gap in our screening process.

**[00:29:22] SM:** I can see why that would be concerning. You mentioned annual AI ethics training earlier. Can you tell me more about that?

**[00:29:30] YS:** Yes. We instituted mandatory annual AI ethics training for all personnel who work on AI projects. It was launched in 2024. The training covers our AI ethics principles, the governance framework, responsible AI practices, bias and fairness considerations, and the regulatory landscape. It's a half-day program, delivered both in-person and virtually. Completion rates for 2025 were about eighty-seven percent, which is decent but not where we want to be. The twelve or thirteen percent who didn't complete it are mostly in the international subsidiaries, which again points to the governance consistency challenge.

**[00:30:08] SM:** Speaking of regulatory landscape, I want to ask about the EU AI Act. Given Hibit Europe's presence in London -- well, London is post-Brexit, but you presumably sell into EU markets -- how are you preparing?

**[00:30:22] YS:** This is an area where I'd say our readiness is, um... uncertain. The EU AI Act is obviously a major piece of regulation, and some of our systems would likely be classified as high-risk under the Act, particularly anything related to biometric identification, critical infrastructure, or law enforcement support. PRISM, our SIGINT/OSINT system, could fall into that category depending on how it's used.

We've done a preliminary mapping exercise -- Noa led it -- to identify which of our systems might be in scope. But we haven't completed a full compliance assessment, and we haven't allocated dedicated resources for EU AI Act compliance. There's a debate internally about whether the defense exemption in the Act covers all of our use cases or only military-specific ones. Our legal team is still analyzing it.

And then there's a separate issue around ITAR. Some of our AI models are developed using data or techniques that may be subject to ITAR export controls. We haven't fully mapped the ITAR implications for AI model export, model updates, or even the model architectures themselves. If a model was trained on ITAR-controlled data, is the model itself ITAR-controlled? What about a model that was fine-tuned on such data? These are questions that don't have clear regulatory answers yet, and we haven't established our own internal position.

**[00:31:48] SM:** That's a thorny set of issues. Let me come back to something more operational. You mentioned you don't have a formal AI incident response plan. Can you talk about what happens if something goes wrong with one of your AI systems?

**[00:32:02] YS:** Sure. Today, if we have an AI-related incident -- let's say SENTINEL AI generates a high-confidence false positive that triggers an automated response, or MANTIS issues a maintenance alert that turns out to be based on corrupted sensor data -- the incident would be handled through our general cybersecurity incident response plan. Rachel Goldberg's team manages that process.

The problem is that the cyber IR plan is designed for cyber incidents: unauthorized access, malware, data breaches. It doesn't have procedures for AI-specific failure modes. Model drift, adversarial inputs, training data contamination, ethical boundary violations -- these aren't covered. If HAWK-EYE started exhibiting degraded performance due to a distributional shift in the operational environment -- say, different terrain or weather conditions it wasn't trained for -- our current IR plan wouldn't really tell people what to do. The model operations team would handle it, but it would be ad hoc, not proceduralized.

Amit Rozner and Prof. David Chen have been working on an AI-specific incident response framework, and it's in draft, but it hasn't been finalized or adopted. I expect it will be completed in Q1 this year.

**[00:33:15] SM:** Good. Now I want to ask about resource allocation and competence. You mentioned an AI budget of one-hundred-eighty million. What about people? How many people work on AI-related activities, and do you have the right skills?

**[00:33:30] YS:** Across the company, we have approximately three hundred and fifty people who work primarily on AI and ML. That includes data scientists, ML engineers, MLOps engineers, AI researchers, and the governance and ethics staff. The AI CoE itself has about sixty people. The rest are distributed across the divisions.

In terms of skills, we're generally strong on the technical side. Israel has an incredibly deep talent pool for AI, partly because of the military intelligence training pipeline, partly because of the universities. Where we're less strong is in the intersection of AI and governance, AI and ethics, and AI and security. Noa Levine is excellent, but she has a team of three people to cover ethics and compliance for the entire company. Amit Rozner is our only dedicated AI security architect. These are areas where we're under-resourced.

**[00:34:22] SM:** Only three people on ethics and compliance for twenty-five-plus AI projects?

**[00:34:27] YS:** Well, you know, they're supplemented by the legal team and by the Ethics Board members who commit a certain number of hours per month. But yes, it's thin. And it's one of the reasons why the ethics review threshold is where it is -- at a million dollars. If we lowered the threshold, Noa's team simply couldn't handle the volume with their current headcount. We've requested additional headcount for FY2026, but I don't know yet whether it will be approved.

**[00:34:55] SM:** Let's talk about competence more broadly. How do you ensure that the people working on AI systems have the governance and risk management competencies they need?

**[00:35:06] YS:** Beyond the annual ethics training I mentioned, we have a few mechanisms. First, the AI CoE publishes and maintains a set of AI development standards and guidelines that all AI teams are expected to follow. These cover model documentation, testing requirements, bias assessment, and so on. Second, Prof. David Chen runs a quarterly "AI Safety and Validation" workshop series that is open to all AI practitioners. Attendance is encouraged but not mandatory, which is probably a weakness. Third, for the critical systems like HAWK-EYE and ATLAS, the teams undergo specific certification training that includes governance and safety components.

**[00:35:48] SM:** That's useful. I want to touch on something you mentioned earlier -- the shadow AI issue. You said engineers are using commercial AI tools without approval. How did this come to light, and what's been done?

**[00:36:02] YS:** It came to light through Rachel Goldberg's security operations team. They were monitoring network traffic and noticed traffic to OpenAI's API endpoints and to Anthropic's Claude from several development workstations. When they investigated, they found that about, um, I think it was around forty engineers across three divisions who were using commercial LLMs for various purposes -- code generation, documentation, analysis. Some of them were copying code snippets from classified or ITAR-controlled projects into these tools.

Oh, I should mention -- sorry, let me correct myself. The number was actually closer to sixty, not forty. I was thinking of the initial discovery, but the full investigation found more. Sixty engineers, across four divisions, not three.

**[00:36:52] SM:** That's a significant number. And some were inputting sensitive data?

**[00:36:56] YS:** That's what the investigation suggested, yes. Now, we don't have evidence that any classified data was exposed -- the workstations in question were on the unclassified network, so they didn't have access to classified systems. But ITAR-controlled technical data, proprietary algorithms, internal documentation -- yes, some of that appears to have been shared with commercial AI services.

**[00:37:18] SM:** What was the organizational response?

**[00:37:22] YS:** Several things. First, we issued an AI Usage Policy Bulletin in September 2025 that explicitly prohibits the use of unapproved AI tools with company data. Second, Rachel's team implemented DNS-level blocking for certain AI service endpoints on the corporate network. But that's a blunt instrument -- it blocks legitimate use as well, and people can still use personal devices or external networks. Third, and this is the more sustainable solution, we're building an internal AI assistant platform -- which will eventually be FORGE and ORACLE -- that provides approved AI capabilities within our security boundary. The idea is to give people the tools they want but in a controlled environment.

**[00:38:02] SM:** That's the carrot-and-stick approach. Makes sense. Let me -- actually, do you mind if we take a very quick pause? I want to make sure Daniel is keeping up with notes.

**[00:38:12] YS:** Of course. I should check my messages anyway. Tamar sent me three texts during the last twenty minutes. *[laughs]*

**[00:38:20] DK:** I'm keeping up, but the pause is welcome. Thank you.

**[00:38:25] SM:** Great. Let's pick back up.

---

*[Brief pause, approximately 2 minutes]*

---

**[00:40:30] SM:** Okay, I want to dig into a few more areas. First, the AI model inventory gap. You said you're tracking about sixty percent. What's the plan to get to full coverage?

**[00:40:42] YS:** So Oren Tal, our Head of MLOps and AI Platform, is leading an initiative that we've called the "AI Model Registry" project. The goal is to build a centralized registry of all AI and ML models across the company, including metadata like the model's purpose, owner, training data sources, version history, deployment status, risk classification, and so on. It's essentially building the model inventory that ISO 42001 requires under Clause 8.

The technical platform is partly built -- we have an ML metadata store based on MLflow that the CoE and a few divisions use. But expanding it to cover all divisions, including the international subsidiaries, and getting retroactive registration of existing models -- that's the hard part. We're targeting end of Q2 2026 for initial coverage and end of 2026 for full coverage, but I'll be honest, I think the full coverage target is optimistic.

**[00:41:38] SM:** Is there a mandate from the AI Governance Board to require registration?

**[00:41:43] YS:** There is. The AI Governance Board passed a resolution in October 2025 requiring all divisions to register their AI models in the central registry by the end of Q2 2026. The challenge is enforcement. We don't have a technical mechanism to prevent an unregistered model from being deployed. It's a policy requirement, enforced through audit, not through technical controls. And audit cycles are annual, so there's a lag.

**[00:42:08] SM:** Got it. Let me ask about documentation. ISO 42001 has significant documentation requirements. How would you characterize Hibit's current state?

**[00:42:18] YS:** For the critical systems, documentation is reasonably good. HAWK-EYE, for example, has extensive documentation -- model cards, data sheets, validation reports, operational guidelines. David Chen's team is very thorough. For the high-criticality systems, documentation is adequate but not always current. For lower-tier systems, documentation is... inconsistent at best. This is another area where the ISO gap assessment flagged issues.

We've adopted the concept of model cards -- you know, the Mitchell et al. model card framework -- and we have a template that teams are supposed to use. But compliance with the template varies. Some teams produce excellent model cards; others produce minimal ones that barely meet the requirements.

**[00:43:02] SM:** What about the AI management system documentation itself? Policies, procedures, records?

**[00:43:08] YS:** We have the core policy documents: the AI Governance Policy, the AI Ethics Policy, the AI Risk Management Policy, the AI Data Governance Policy. These were all developed in 2024 and reviewed in mid-2025. We have procedures for the AI Governance Board, the Ethics Board, the model release process for critical systems. What we're missing are some of the operational procedures -- the day-to-day stuff. Incident response, as we discussed. Decommissioning. Change management for AI models. Monitoring and performance management procedures. These exist informally in some teams but haven't been standardized and documented at the enterprise level.

**[00:43:52] SM:** Speaking of monitoring -- how do you monitor AI systems in production? Is there a systematic approach?

**[00:43:58] YS:** Oren's MLOps team has built a monitoring stack that covers the systems deployed through the CoE's platform. It monitors model performance metrics, data drift, prediction distribution shifts, and operational health. For the critical systems, there are specific monitoring SLAs -- HAWK-EYE, for example, has a dedicated monitoring dashboard with real-time performance tracking and alerting.

But here's the thing -- not all production models are on the CoE's platform. Some of the older models, and some division-specific models, are deployed on bespoke infrastructure. For those, monitoring is the responsibility of the division, and the approaches vary. Some have good monitoring; some have minimal monitoring. It's part of the broader standardization challenge.

**[00:44:42] SM:** I want to ask one more question about the international dimension, and then we can start wrapping up if you need to get to your next meeting. You mentioned ITAR concerns and the EU AI Act. Are there other regulatory or compliance considerations that factor into your AI governance?

**[00:44:58] YS:** Several. Israel doesn't have a comprehensive AI regulation yet, but the Israel Innovation Authority has published AI ethics guidelines that we follow. For U.S. operations, we need to comply with DoD AI ethics principles and the Responsible AI Strategy that the Pentagon published. There's also the NATO AI Strategy, which is relevant for some of our European contracts. And then there are customer-specific requirements -- different militaries have different requirements for AI systems they procure.

Oh, and I should mention -- this is something that came up at the AI governance conference I attended last month in Tel Aviv, at the IDC Herzliya. There was a fascinating panel on the intersection of AI governance and export controls. One of the speakers, I forget his name, made the point that AI model weights could be considered a form of controlled technical data under various export control regimes, not just ITAR but also the Wassenaar Arrangement. That's something we haven't fully analyzed, and it's on my worry list for 2026. If model weights are controlled, it has implications for how we share models between Hibit Israel, Hibit America, and Hibit Europe.

**[00:46:05] SM:** That's a really important emerging issue. Okay, let me ask a few rapid-fire questions to round things out, and then I'll give you back your morning.

**[00:46:14] YS:** Sure, go ahead.

**[00:46:16] SM:** How often is the AI risk register reviewed?

**[00:46:19] YS:** Quarterly by the AI Governance Board. But it's a relatively new practice -- we only started maintaining a formal AI risk register in mid-2025. Before that, AI risks were embedded in the enterprise risk register without specific AI categorization.

**[00:46:35] SM:** Who maintains the risk register?

**[00:46:38] YS:** Noa Levine's team, with input from the division AI leads and from Amit Rozner on the security side.

**[00:46:46] SM:** Is there a formal process for AI-related whistleblowing or raising concerns?

**[00:46:52] YS:** We use the company's general ethics hotline. There isn't an AI-specific channel. That's... probably something we should consider. I'll make a note of that.

**[00:47:02] SM:** Has the AI Governance Board ever overruled or significantly modified a project based on risk or ethics concerns?

**[00:47:10] YS:** Yes. Twice. Once was the behavioral anomaly detection project I mentioned -- that was technically the Ethics Board, not the Governance Board, but they're connected. The second was a proposal to use facial recognition in a civilian security product. The Ethics Board recommended against it, and the Governance Board upheld that recommendation. The project was redirected to use non-biometric approaches.

**[00:47:38] SM:** Good. That shows the governance structure has teeth. Do you conduct any form of AI audit?

**[00:47:46] YS:** Not a dedicated AI audit, no. Our internal audit team includes AI systems in their technology audit program, but it's not an AI-specific audit methodology. The ISO 42001 gap assessment was the closest thing to a dedicated AI audit we've done. We plan to conduct a formal internal AI audit in Q2 2026 as part of our preparation for ISO 42001 certification.

**[00:48:10] SM:** What's your target timeline for ISO 42001 certification?

**[00:48:14] YS:** We're targeting Stage 1 audit by end of Q3 2026 and Stage 2 by Q1 2027. That's ambitious, I know. It depends on how quickly we can close the gaps identified in the assessment.

**[00:48:30] SM:** One more. What keeps you up at night about AI governance at Hibit?

**[00:48:36] YS:** *[long pause]* A few things. First, the speed at which AI is evolving versus the speed at which governance can keep up. We're still building the governance framework for conventional ML, and now generative AI is changing everything. FORGE and ORACLE are just the beginning -- every division wants its own generative AI use case, and the risk profiles are different from traditional ML. Hallucination risk, intellectual property issues, prompt injection attacks -- these are new governance challenges.

Second, the consistency problem. We're a large, distributed organization with strong divisional cultures, and getting everyone to follow the same playbook is genuinely hard. I sometimes worry that we'll have a governance failure not in one of our critical, well-monitored systems, but in some small, under-the-radar project that nobody was watching.

And third, honestly, the geopolitical dimension. We're a defense company operating in Israel, selling to multiple countries, with operations in the U.S. and Europe. The regulatory environments are diverging, not converging. The EU wants one thing, the U.S. wants another, Israel has its own approach, and our customers in the Middle East and Asia have their own expectations. Building a governance framework that satisfies all of these stakeholders is enormously complex.

**[00:50:02] SM:** Those are very real concerns. I have a few more questions if you have a few minutes, or do you need to wrap up?

**[00:50:09] YS:** I have until eleven-thirty, so we have a bit more time. I'm supposed to meet Oren for lunch at noon -- apparently the MLOps issue is more of a lunchtime discussion than a five-alarm fire, thankfully.

**[00:50:22] SM:** Good. I want to circle back to something. You mentioned that the AI CoE provides centralized tooling. Can you elaborate on what the AI platform looks like?

**[00:50:32] YS:** Sure. Oren Tal's team has built what we call the "Hibit AI Platform," which is essentially our standardized ML infrastructure. It includes an ML experimentation environment based on JupyterHub, a feature store built on Feast, the model registry I mentioned based on MLflow, a model training and pipeline orchestration layer using Kubeflow, and a model serving infrastructure using Seldon Core for on-premise and SageMaker for some cloud workloads. For the generative AI initiatives, we've recently added an LLM serving layer based on vLLM.

The platform runs on our internal Kubernetes clusters. For classified workloads, it's on air-gapped infrastructure. For unclassified workloads, it's on our private cloud, and some components extend to AWS GovCloud for Hibit America.

**[00:51:22] SM:** And how many of the twenty-five tracked projects use this platform versus custom infrastructure?

**[00:51:28] YS:** Of the twelve production systems, I'd say eight or nine are on the platform. The remainder -- and these tend to be the older systems like IRON SHIELD -- are on legacy infrastructure that predates the platform. Migrating them is on the roadmap but it's a significant effort because of the validation and recertification requirements. For defense systems, you can't just migrate the infrastructure and call it a day. Every change needs to go through the validation pipeline, and for systems like IRON SHIELD that are integrated into fielded defense platforms, the validation is extremely rigorous.

**[00:52:00] SM:** Understood. Let me ask about the relationship between AI governance and cybersecurity governance. You mentioned Rachel Goldberg is on the AI Governance Board. How integrated are those two domains?

**[00:52:14] YS:** They're more integrated than they used to be, but there's still a gap. Rachel and I meet biweekly to coordinate, and Amit Rozner bridges the two teams -- he reports to me on AI matters and has a dotted line to Rachel on security matters. The AI security aspects -- adversarial ML, model robustness, supply chain security for AI -- are increasingly recognized as part of the cybersecurity domain.

Where the gap shows up most is in the security assessment process. Our security team has a well-established security assessment methodology for traditional software. But applying it to AI systems requires specialized knowledge -- how do you penetration-test a machine learning model? How do you assess the attack surface of a training pipeline? Amit understands this, but the broader security team is still building those skills. We're planning a joint training program between the AI CoE and the cybersecurity team for this year.

**[00:53:10] SM:** That's a common maturity gap. One last area I want to touch on -- metrics. How do you measure the effectiveness of AI governance?

**[00:53:20] YS:** That's an area where we're still quite immature, honestly. We track some basic metrics: number of AI projects registered, ethics training completion rate, AI Governance Board meeting attendance and decisions, number of ethics reviews conducted, and the handful of security incidents related to AI. But we don't have a comprehensive AI governance metrics framework.

I've seen some organizations track things like "time from model development to governance approval" or "percentage of AI projects with complete documentation" or "mean time to detect model drift." We should be tracking these things, but we're not there yet. It's one of the deliverables I've set for Noa's team in 2026 -- to develop an AI governance dashboard with meaningful KPIs.

**[00:54:02] SM:** Measurement is really the foundation of continuous improvement. ISO 42001 will push you on that as well, in the monitoring and measurement requirements.

**[00:54:12] YS:** Absolutely. And that's one of the reasons we're pursuing certification -- it forces discipline. Even the preparation process has been valuable. The gap assessment alone generated about forty action items, and we've closed maybe half of those so far. It's uncomfortable sometimes, having someone point out your weaknesses, but it's necessary.

**[00:54:32] SM:** Well, that's what we're here for as well. Uncomfortable but necessary. *[laughs]*

**[00:54:38] YS:** *[laughs]* Indeed. And I appreciate that you're doing this thoroughly. I've been through assessments before where the assessors just check boxes. This feels more substantive.

**[00:54:48] SM:** That's the goal. Okay, I have two more questions and then I'll let you go. First -- is there anything that we haven't covered today that you think is important for us to understand about AI governance at Hibit?

**[00:55:00] YS:** Hmm. I think one thing I haven't explicitly stated is the cultural challenge. Hibit has its roots as a traditional defense electronics company. Many of our senior leaders came up through hardware engineering, not software, and certainly not AI. There's a generational and cultural shift happening, and governance is caught in the middle. The younger AI practitioners sometimes see governance as red tape. The older engineering leaders sometimes see AI as just another technology that doesn't need special treatment. Finding the right balance -- rigorous enough to be safe and compliant, but not so rigid that it stifles innovation -- that's the art of it.

And I think we're still finding that balance. Some days I think we've got it right, and other days I see something that makes me think we have a lot more work to do. The behavioral anomaly detection incident I mentioned is a good example. On one hand, the system worked -- the Ethics Board caught it and imposed conditions. On the other hand, it shouldn't have gotten that far without a review. So we're learning.

**[00:56:02] SM:** That's a very thoughtful reflection. And my last question -- when we speak with Col. Navon and Rachel Goldberg later this week, are there any topics where you think their perspective might differ from yours?

**[00:56:16] YS:** *[smiling]* Eyal might give you a more optimistic view of the governance maturity than I have. He's very much a glass-half-full person, and he's proud of what we've built, rightfully so. But he's also been here less time than I have and may not appreciate some of the operational details where things fall short.

Rachel will probably give you a more cautious view than me on the shadow AI issue. She sees it as a significant security risk, and she's not wrong. She's been advocating for more aggressive technical controls, and I tend to favor the "provide better alternatives" approach. We disagree on tactics, not on the problem.

And on the international dimension, I'd encourage you to press Eyal on Hibit America. He's aware of the governance gap there, but I'm not sure he's allocated sufficient resources to close it. That's my personal opinion, not a formal position.

**[00:57:10] SM:** Very helpful. Thank you for the candor. That will help us triangulate perspectives.

**[00:57:16] YS:** Of course. That's the point of this exercise, isn't it? You get a more accurate picture when you hear from multiple people. And honestly, I'd rather you identify our gaps now than have a regulator or a customer find them.

**[00:57:28] SM:** Absolutely. Well, Yael, this has been an incredibly rich conversation. I think we have a very solid foundation for the governance domain of the assessment. We'll be synthesizing this along with the other interviews and providing our preliminary findings in about three weeks.

**[00:57:44] YS:** That sounds good. And please, don't hesitate to come back with follow-up questions. I know I've thrown a lot of information at you, and there may be threads you want to pull on once you've had time to digest.

**[00:57:56] SM:** I'm sure we will. Thank you for the coffee and for your time. This was really valuable.

**[00:58:02] YS:** My pleasure. Let me walk you out. Actually, before we go -- Daniel, did you get everything you needed?

**[00:58:10] DK:** Yes, very comprehensive. I have a few clarifying questions but I can send those by email if that's alright.

**[00:58:16] YS:** Of course. Send them to me directly and I'll turn them around quickly. And Sarah, I know you're meeting with Amit Rozner this afternoon for the AI security deep-dive. His office is on the sixth floor, but he'll probably meet you in the lobby. He's very organized that way.

**[00:58:32] SM:** Perfect. We're looking forward to that session as well.

**[00:58:36] YS:** Excellent. Enjoy your day in Haifa, and if you need anything, Tamar Azoulay is your point of contact for logistics. She's already arranged your access badges for the rest of the week.

**[00:58:48] SM:** Wonderful. Thank you, Yael.

**[00:58:50] YS:** Thank you both. Have a good day.

**[00:58:52] SM:** You too.

---

*[Recording ends at 00:58:52. Remaining time to 01:02:00 was informal conversation while walking to the elevator, not recorded.]*

---
