# Hibit Defense Systems - Aerospace AI Systems & Data Science Interview
## Interview with Dr. Michael Stern, Head of Data Science, Aerospace Division

**Date:** January 28, 2026
**Duration:** 62 minutes
**Location:** Hibit Aerospace R&D Lab, Haifa, Israel
**Interviewer:** Sarah Mitchell (SM), Lead Consultant, Milestone Advisory
**Interviewee:** Dr. Michael Stern (MS), Head of Data Science, Aerospace Division, Hibit Defense Systems

---

**[00:00:00] SM:** Recording is live. Dr. Stern, thank you so much for meeting with me today. I've been looking forward to this one.

**[00:00:07] MS:** Sarah, welcome to the Aerospace R&D lab. Come in, come in — let me give you the proper tour before we sit down. Most people who visit Hibit see the corporate offices in Matam, so this is a bit different. Watch your step here — those cables are from last night's test rig setup.

**[00:00:22] SM:** [laughs] I'll be careful. It looks like a very active lab.

**[00:00:26] MS:** It never stops. Okay, so this first area — these rows of workstations with the large monitors — this is where our annotation team works. Fifteen people, very dedicated. You can see they're running Label Studio on every machine. We have another smaller annotation cell down in Be'er Sheva, a cleared facility we partner with for some of the higher-volume labeling work. We probably run a hundred thousand new image annotations a month across both sites.

**[00:00:52] SM:** That's a significant annotation operation.

**[00:00:55] MS:** HAWK-EYE runs on data. Garbage in, garbage out — that's the most important lesson from my Technion days, and it's still true. Quality annotations are not glamorous, but they are the foundation of everything. Through this door here, this is the drone testing area. The Golan UAV platform — that's our main test vehicle. HAWK-EYE runs on that one during field evaluations. We can't fly inside obviously, but we do ground truth capture using the UAV cameras mounted on test rigs. Let me show you the next section.

**[00:01:28] SM:** What's behind that sealed door?

**[00:01:31] MS:** That is the GPU cluster room. Here — [door opens] — and now you understand why I said "welcome to the lab" and not "welcome to the office." [laughs]

**[00:01:42] SM:** Wow, that is loud. And the heat coming off these —

**[00:01:45] MS:** Hot and loud, yes. Four DGX A100 nodes. Thirty-two A100 GPUs total. This is our primary training infrastructure. When we do a full HAWK-EYE retrain — end-to-end, the full 2.8 million image dataset — it runs for roughly seventy-two hours. This cluster is running essentially around the clock. The cooling system costs us almost as much to operate as the GPUs themselves. My team calls it "the furnace."

**[00:02:14] SM:** [laughs] That's very apt. And all of this is on-premises?

**[00:02:18] MS:** Completely on-prem. We evaluated cloud options two years ago — AWS SageMaker and Azure ML — but training data sovereignty is non-negotiable for systems at this classification level. The data never leaves our four walls. Well, our four walls and the Be'er Sheva site. Let me show you one more area and then we'll sit down. Over here we have the edge hardware bench. These are NVIDIA Jetson AGX Orin units — this is what actually flies on the UAVs. We maintain a bench testing environment so we can validate the optimized edge model before it goes into the field.

**[00:02:55] SM:** So you're testing the actual target hardware here?

**[00:02:58] MS:** Exactly. The models we train on the DGX cluster run at FP32. Before we deploy to edge, we go through quantization to INT8 using TensorRT, and we have to validate on the real Jetson hardware because the quantization can introduce subtle performance changes. The benchmark you'd see on a server GPU doesn't always match what you see on the embedded platform. Okay — let me get us some water and we can sit down at the conference table over here.

**[00:03:28] SM:** Perfect.

**[00:03:38] SM:** Alright, recording still running. Let me set the formal stage. I'm Sarah Mitchell from Milestone Advisory, and I'm speaking with Dr. Michael Stern, Head of Data Science in the Aerospace Division at Hibit Defense Systems. This is part of the AI security posture assessment we're conducting. Dr. Stern, could you start by telling me about your background and your current role?

**[00:04:00] MS:** Sure. I've been at Hibit eight years now, which makes me a veteran by aerospace R&D standards — people either leave after two years or stay for a decade. My PhD is from Technion, computer vision, with a focus on object detection under occlusion and degraded imaging conditions. Before Hibit, I did a postdoc at MIT CSAIL — three years in the Computer Vision group there. That was where I first got seriously into transformer architectures, before they became the dominant paradigm everywhere. I was working with attention mechanisms for image recognition in 2015, 2016, when most of the field was still all-in on CNNs. It gives me a certain perspective. [smiles]

**[00:04:42] SM:** I imagine HAWK-EYE is the direct descendant of that work?

**[00:04:46] MS:** In a very real sense, yes. The core architectural idea in HAWK-EYE — the CNN-transformer hybrid with a ResNet-50 backbone feeding into a multi-head attention mechanism — is something I sketched out on a whiteboard at MIT and refined over six years here. It's deeply personal. [pause] In a good way. It's the most significant technical work of my career. And I say that as someone who's published fifty-something peer-reviewed papers.

**[00:05:14] SM:** That's clear. Let me formally establish the scope: you're the technical owner of HAWK-EYE, and you also oversee ATLAS from the data science side?

**[00:05:23] MS:** Correct. HAWK-EYE is mine — I'm responsible for the model architecture, the training pipeline, the data strategy, and the performance benchmarks. ATLAS is a bit different; the primary ownership sits with the Land & C4ISR division, but my team provides the data science expertise, particularly on the multi-modal sensor fusion side. We have two data scientists embedded with the ATLAS program full-time. My broader team in Aerospace is twenty-five people — data scientists, ML engineers, and annotation specialists.

**[00:05:55] SM:** Let's start with HAWK-EYE, since I've heard about it from several people already — Amit Rozner speaks very highly of the robustness testing program, and David Chen mentioned it as the gold standard for AI V&V at Hibit.

**[00:06:08] MS:** [visibly pleased] That's good to hear. And it's deserved, I'll be honest. We've put an enormous amount of work into building the right engineering culture around HAWK-EYE — not just building a good model, but building a model that earns trust, that you can reason about rigorously. That philosophy doesn't come for free, and not every program at Hibit has it.

**[00:06:30] SM:** Walk me through the architecture. What is HAWK-EYE v3.2 under the hood?

**[00:06:35] MS:** Okay. At its core, HAWK-EYE is a real-time object detection and classification system for ISR applications. The architecture is what I call a CNN-transformer hybrid. We use ResNet-50 as the feature extraction backbone — it's computationally efficient, we've spent years profiling it on our target hardware, and we know its failure modes intimately. The extracted feature maps then feed into a custom multi-head attention mechanism that's inspired by DETR but substantially modified. The attention layers let the model focus on contextually relevant regions of the image rather than just doing a dense scan. For defense applications, that context awareness matters enormously — distinguishing a vehicle type in an urban environment requires understanding spatial relationships that pure CNN architectures struggle with.

**[00:07:22] SM:** And you're deploying this on the Jetson AGX Orin?

**[00:07:25] MS:** Right. The full model is about forty-five million parameters in FP32. For edge deployment, we quantize with TensorRT to INT8, which brings it down to a footprint the Jetson can run at thirty frames per second on 720p video. The inference pipeline uses ONNX Runtime for cross-platform compatibility — the same ONNX model runs on the Jetson at the edge and on our server-based systems for batch processing of satellite imagery. That unified model representation was a deliberate architectural choice I made three years ago, and it's paid dividends.

**[00:07:58] SM:** What's the current performance benchmark?

**[00:08:01] MS:** 94.7 percent mean average precision on our internal benchmark dataset. Under degraded weather conditions — rain, fog, dust, varying illumination — we maintain 91.2 percent mAP. I'm proud of that degraded-condition number. When I started working on this problem, most computer vision systems fell off a cliff in bad weather. The synthetic training data from our Unreal Engine simulation environment was the key breakthrough there. We generate artificial fog, rain, and lighting conditions at scale that we simply cannot collect with real UAV missions.

**[00:08:38] SM:** Tell me about the training data. Where does it come from?

**[00:08:42] MS:** Three sources. First, operational data — annotated imagery from real UAV ISR missions. We have strict processes for how this gets collected, sanitized, and ingested into the training pipeline. This is the highest-quality signal but also the most expensive to obtain. Second, satellite imagery from licensed commercial sources that we annotate ourselves. Third, synthetic data generated using Unreal Engine 5.3. We have a dedicated environment modeled to represent various operational theaters, and we can generate labeled training samples at scale. Currently we're training on approximately 2.8 million annotated images across all three sources.

**[00:09:24] SM:** What's the synthetic-to-real ratio?

**[00:09:27] MS:** Roughly 40 percent synthetic, 60 percent real. The synthetic fraction has been increasing with each HAWK-EYE generation, which gives me some comfort around data diversity, but it also means we need to be rigorous about validating that the synthetic data is actually representative of real-world conditions. Domain gap between synthetic and real imagery is a real risk and we have explicit validation procedures for it.

**[00:09:52] SM:** And the retraining cadence?

**[00:09:55] MS:** Full retraining quarterly with all new field data collected in that quarter. Monthly incremental updates using transfer learning — we freeze the backbone and retrain the attention heads on new data. The incremental runs take about eighteen hours instead of seventy-two, which is much more tractable.

**[00:10:12] SM:** Now, I want to ask about something that Noa Levine flagged during our conversation last week — she mentioned that there are some data provenance issues with historical HAWK-EYE training data. Can you walk me through that?

**[00:10:27] MS:** [pauses, sets down his water glass] Yes. That's a fair question and I'm not going to be evasive about it. So, HAWK-EYE version 1.0 launched in 2020. The v1.x and v2.x training datasets — which form the foundational data that our current v3.x models are built on through transfer learning — were assembled before we had a formal data governance framework. At the time, my team was small, we were moving fast, and the documentation practices were... incomplete. We didn't consistently record provenance metadata — where each image came from, what annotation methodology was used, what the annotator training protocol was.

**[00:11:12] SM:** When you say incomplete, how bad is it?

**[00:11:15] MS:** [exhales] For the 2020-2022 vintage data, probably about thirty percent of the annotation metadata is missing or ambiguous. We know the images exist, we know they were labeled, but we can't always reconstruct which annotator labeled them, what the quality control process was, whether any images were rejected and resubmitted, that kind of thing. It's enough to satisfy ourselves operationally — the model performs, we have held-out test sets — but it falls short of what ISO 42001 requires for training data documentation, and Noa has been very clear about that.

**[00:11:52] SM:** And there was a storage migration issue?

**[00:11:55] MS:** Yes. In early 2022 we migrated from an older NAS infrastructure to the current storage architecture. During that migration, some of the annotation project files in what was then our Label Studio version — I think it was Label Studio 1.7 — some of those project files were incompletely transferred. The images themselves came across fine, but some of the associated metadata — annotation confidence scores, annotator IDs, internal review flags — those were stored in a way that the migration tool didn't handle correctly. We didn't discover the extent of the loss until about six months later when we tried to run an audit. By then, the original NAS had been decommissioned.

**[00:12:38] SM:** Is there a remediation plan?

**[00:12:41] MS:** We've been re-annotating the affected data as resources allow. The problem is that for the operational imagery, you can't just redo the annotation from scratch without access to the original collection context — weather conditions, sensor settings, collection altitude. Some of that context is genuinely unrecoverable. Noa's team has been pushing for us to formally document this as a known gap with compensating controls rather than pretending we can fix it completely, which I think is the right approach. I've been resistant to that framing because it feels like an admission of failure, but honestly she's right. It's better to be transparent about it.

**[00:13:18] SM:** I appreciate your candor. Let me shift to the data pipeline. How does data flow from collection to a trained model?

**[00:13:26] MS:** Okay, so the orchestration layer is Apache Airflow 2.8. Every data ingestion, transformation, annotation quality check, and training job is a DAG in Airflow. This gives us reproducibility and audit trails for the current-era data — everything post-2023 is well-documented. Raw imagery comes in through two paths. For real-time sensor data from UAVs that have returned to base, we use Apache Kafka 3.6 for the streaming ingestion — the UAV's onboard systems publish telemetry and imagery chunks to Kafka topics when they connect to the base network after landing. For batch imports — satellite imagery, archived footage, synthetic data from Unreal Engine — it goes through direct storage ingestion with checksum validation.

**[00:14:14] SM:** And annotation?

**[00:14:16] MS:** Label Studio 1.10, deployed on-prem on a dedicated server. All annotation happens within our network. We have quality control DAGs in Airflow that run inter-annotator agreement checks and flag images where annotators disagree above a threshold. Those flagged images go to a senior annotation review queue. The annotation team lead — she's been with us six years — manages that review process.

**[00:14:44] SM:** Data versioning?

**[00:14:46] MS:** DVC — Data Version Control — version 3.30. Every training dataset is a versioned artifact in DVC with a SHA hash of the content. This means we can reproduce any historical training run if we need to. We store the DVC metadata in our GitLab repository alongside the code, so dataset versions are tied to specific code versions. For current data this is excellent. For the pre-2023 vintage... we retrofitted as best we could but the granularity is lower.

**[00:15:14] SM:** What about experiment tracking?

**[00:15:17] MS:** This is actually a point of friction I have to be honest about. We use Weights & Biases — W&B — for experiment tracking, and it is, frankly, the best tool for the job. The visualization, the hyperparameter comparison, the collaboration features — my team loves it. But W&B is a US-based SaaS platform, and our experiment data includes model architecture details, hyperparameters, loss curves, and performance metrics that could be considered sensitive for ITAR-controlled programs like HAWK-EYE. We're not uploading model weights — those stay on-prem — but the question of whether experiment metadata falls under ITAR is genuinely unresolved.

**[00:16:02] SM:** Have you sought legal guidance?

**[00:16:04] MS:** We've raised it with legal and with Noa's team. The current status is: we're allowed to use W&B for HAWK-EYE experiments but with restrictions on what metadata we log — no architecture diagrams, no training data statistics, no performance breakdowns by target class. Which means we're not actually using it to its full potential. Meanwhile, for ATLAS and other programs, it's a grey area that's unresolved. I've been pushing for an on-premise W&B deployment — they offer it — but it hasn't been approved budget-wise. So in parallel, we've been using MLflow 2.9 as our model registry and for some experiment tracking functions. It's on-prem, it integrates with our GitLab pipelines, and it doesn't have the data sovereignty issue. But the W&B UX is better and the team knows it. People use both, which creates its own inconsistency problem.

**[00:16:56] SM:** So you have W&B and MLflow co-existing?

**[00:16:59] MS:** Yes, which is not ideal. MLflow is the official model registry — every model that goes into staging or production is registered there, with versioning and deployment metadata. W&B is used for interactive experiment exploration during development. We need to consolidate. My preference is to get W&B on-prem approved, my fallback is to standardize on MLflow. But it's been on my list for eighteen months and hasn't moved.

**[00:17:22] SM:** Alright. Let me ask about the adversarial testing. Amit Rozner mentioned HAWK-EYE gets the full treatment from the VIPER team.

**[00:17:31] MS:** [visibly pleased] Yes. We do bi-annual red team exercises with VIPER — Amit's adversarial team — and I have to say, it's become one of the most valuable things we do. When I first engaged with Amit three years ago, I was a bit defensive about it — "you're not going to find anything wrong with my model, I built it right." That was naive. [laughs] The first VIPER exercise found an evasion attack using adversarial patches printed on vehicle rooftops that dropped our precision by about twelve percent on certain vehicle classes. That was a humbling afternoon.

**[00:18:08] SM:** How did you respond to that finding?

**[00:18:10] MS:** We incorporated adversarial examples into the training data — adversarial training as a defense — and added specific test cases for that attack vector. The current HAWK-EYE 3.2 version maintains above ninety-two percent accuracy under PGD attack with standard parameters. The quarterly retraining cycle now explicitly includes adversarially augmented samples. And we coordinate with Amit so that the adversarial examples in our training set use different epsilon bounds than the ones in his test suite — otherwise you're just overfitting to the test.

**[00:18:46] SM:** That's good engineering discipline. You also mentioned an incident about eighteen months ago — Amit referenced it briefly but went off the record.

**[00:18:54] MS:** [pauses] I can speak to it at a high level. We detected anomalous samples in an incoming batch of training data from an external annotation batch — this was before we consolidated all annotation in-house and in Be'er Sheva. Some samples had subtle modifications that would have introduced a directional bias in the model's performance on a specific target class. One of my data scientists — Avi, he's been with me four years — flagged it because a statistical distribution check he runs as part of our incoming data validation caught an unusual shift in the annotation confidence distribution. Not a perfect detection mechanism but it worked. We quarantined the batch, informed Amit and Rachel Goldberg, and conducted a full audit. We haven't used that external annotation partner since.

**[00:19:48] SM:** Were the modifications clearly deliberate?

**[00:19:51] MS:** That determination sits above my clearance level and I'm not going to speculate in this recording. What I can say is that the incident is what convinced the organization to fund the comprehensive adversarial testing program for HAWK-EYE. Sometimes bad things have to happen to change minds about security investment.

**[00:20:10] SM:** Let me shift to edge deployment monitoring. HAWK-EYE runs on UAVs — how do you monitor model behavior during a mission?

**[00:20:20] MS:** [a slight hesitation] So, we have a custom telemetry agent running on the Jetson that monitors operational health — inference latency, GPU temperature, memory usage, error rates, watchdog-style health checks. If inference latency spikes above threshold or the error rate increases, the system logs an alert and depending on severity can notify the operator. That data is stored locally on the UAV and transmitted back to the base when the UAV returns and connects to the network.

**[00:20:52] SM:** What about behavioral monitoring? Detecting whether the model is performing as expected during a live mission rather than just hardware health?

**[00:20:59] MS:** [longer pause] That's... the honest answer is we don't do that in real-time. We don't have live behavioral monitoring during mission. There's no mechanism to detect in-mission whether the model's confidence distributions have drifted, whether it's seeing inputs significantly outside the training distribution, whether it's being adversarially manipulated in the field. The model is essentially running in a black box from a behavioral monitoring standpoint during a live mission.

**[00:21:28] SM:** Is that a known gap?

**[00:21:30] MS:** It's a known limitation. "Gap" implies we have a plan to close it and a timeline. We've discussed it. The challenge is bandwidth — UAVs operate on constrained comms links and you can't stream rich telemetry during a mission without impacting the primary data link. When the UAV returns to base, we do a post-mission analysis — we pull the inference logs, review a sample of the raw frames and the model's detections, check for obvious anomalies. It's better than nothing. But real-time drift detection during mission? No. That's an open problem both technically and architecturally.

**[00:22:08] SM:** Have you defined what the monitoring thresholds should be, even for the post-mission review?

**[00:22:13] MS:** [grimaces slightly] Not formally documented. We have informal heuristics — "if more than ten percent of detections show confidence below 0.7 in a mission segment, review those frames manually." But these are not written policy, not tied to formal acceptance criteria, and not consistently applied across different UAV platforms. It's something Oren Tal's team and my team have discussed formalizing, but we haven't gotten there.

**[00:22:42] SM:** Oren mentioned in his interview that model monitoring is an area he wants to improve across the board.

**[00:22:47] MS:** Oren and I are aligned on this. He's been pushing to deploy Evidently AI — I think it's version 0.4 — for production model monitoring. For server-side deployments where we have a network connection, that's very achievable. For edge? The architecture problem is harder. I've been talking to my team about a "phone home" approach where the edge model packages behavioral telemetry during the mission and uploads it on reconnect, which could enable near-real-time post-mission drift analysis. But it's a research project, not a production plan.

**[00:23:18] SM:** Okay. Let me transition to ATLAS. You mentioned your team has two embedded data scientists on that program.

**[00:23:26] MS:** Yes. ATLAS v2.1 is our autonomous navigation system for unmanned ground vehicles. Very different problem domain from HAWK-EYE — instead of detecting and classifying objects from aerial imagery, ATLAS is doing real-time path planning and obstacle avoidance using a multi-modal sensor fusion architecture. We fuse LiDAR, camera, and radar inputs. The sensor fusion happens in a custom attention-based module that learns to weight the different modalities based on environmental conditions — in fog or dust, the model down-weights camera and up-weights LiDAR, for example.

**[00:24:04] SM:** That's an elegant approach. What's the training data situation for ATLAS?

**[00:24:08] MS:** About five hundred thousand scenarios in total, split between real-world collections and simulation. For simulation, we use MATLAB R2024a with Simulink for the physics modeling and hardware-in-the-loop testing. The CARLA simulator is used by David Chen's T&E team for higher-level scenario testing, but my team works primarily in the MATLAB/Simulink environment because it interfaces directly with the actual sensor hardware APIs. Real-world scenarios come from our test facility in the Negev — about four hundred hours of field data across various terrain types and conditions.

**[00:24:48] SM:** I want to ask about a specific concern — terrain generalization. ATLAS was primarily trained on Middle Eastern terrain. Has performance on other terrain types been formally validated?

**[00:25:00] MS:** [brief pause, slight discomfort] No. That's correct, and it's a gap that I'm aware of. The training data is heavily weighted toward the terrain types we have access to — Negev desert, semi-arid environments, urban environments in Israel. We have essentially no training data from, say, Central European forests, mountainous terrain, dense jungle environments, or winter conditions with snow and ice. ATLAS has been tested against requirements that were defined for its primary intended operational environment, which is where that training data applies. But if you asked me to characterize its performance in a Norwegian winter or a Southeast Asian jungle, I couldn't tell you. We haven't tested that.

**[00:25:48] SM:** Is this documented formally?

**[00:25:51] MS:** It's known to the program team but I wouldn't say it's documented in a way that a customer or auditor would readily find. It should be. The ATLAS specifications should include explicit operational design domain constraints that note the geographic and environmental scope. Currently those constraints are implicit — they live in the heads of the technical team rather than in the system documentation.

**[00:26:15] SM:** And what about bias testing? Have you run formal bias analyses on ATLAS to characterize its performance across different terrain categories?

**[00:26:23] MS:** [pauses, clearly uncomfortable] Formal bias testing, with the kind of rigorous slice-based analysis you might do for HAWK-EYE? No. For HAWK-EYE, Amit and David and I have put significant effort into ensuring the test suite covers the performance distribution by target class, by environmental condition, by image quality. For ATLAS, we have performance metrics overall, and we have some breakdowns by scenario type, but there's no systematic bias analysis that would tell you, "the model performs X percent worse on terrain type Y." I know that's a gap. I've been meaning to address it. It keeps getting pushed by more immediate priorities.

**[00:27:08] SM:** When was that last discussed formally?

**[00:27:11] MS:** In the ATLAS program review in October. It was flagged. Tamar Azoulay — our AI Program Manager — put it on the Q1 2026 action list. Whether it will actually happen in Q1, I genuinely don't know.

**[00:27:26] SM:** What about adversarial testing for ATLAS? Amit mentioned it's limited.

**[00:27:31] MS:** Yes, that's accurate. For ATLAS, we've done basic FGSM robustness checks — fast gradient sign method, the standard first step. We've not done PGD, Carlini & Wagner, AutoAttack. And critically, we haven't done physical adversarial testing — testing whether specific patterns on road surfaces or objects in the environment can cause the navigation system to misclassify or misbehave. Amit has raised this with me directly and he's right. Physical adversarial attacks on autonomous navigation systems are a documented real-world attack vector. It's on the ATLAS security roadmap for Q2 2026 but that's later than it should be.

**[00:28:12] SM:** What's blocking it?

**[00:28:14] MS:** Honestly, capacity. Amit's VIPER team is two people, and they're stretched across twelve production systems. HAWK-EYE gets prioritized because it's higher criticality and more mature. ATLAS is in the queue. If VIPER had six people instead of two, this would already be done.

**[00:28:31] SM:** [sound of door opening]

**[00:28:33] MS:** One second — yes, Avi, what's up?

**[Team member (AK):** Sorry to interrupt. The 3.2.5 training run — it completed about ten minutes ago. Validation mAP came in at 94.9. You asked me to let you know.]

**[00:28:44] MS:** [checking phone] Excellent. Ninety-four point nine — that's above the baseline. Flag it for David Chen's team to start the formal V&V run and tell Oren's pipeline it's ready for staging. Good work, thanks. [door closes] Sorry about that. Where were we?

**[00:29:02] SM:** ATLAS adversarial testing. You said capacity is the constraint.

**[00:29:05] MS:** Right. And budget — physically constructing adversarial patches and running test exercises at the Negev facility is not free. There's a logistics cost that keeps getting deprioritized. I want to be clear that I think the risk is real and the testing should happen. I'm not dismissing it. I just can't magically create the resources.

**[00:29:26] SM:** Let me move to the broader tooling picture. Can you walk me through the full ML engineering stack your team uses?

**[00:29:33] MS:** Sure. PyTorch 2.1 is our primary framework — this is where all the HAWK-EYE development happens, all the ATLAS work, anything new. TensorFlow 2.15 is still present for legacy models that predate our standardization decision, but we're not doing any new development in TensorFlow. The plan is to migrate the remaining TF models over the next eighteen months, but it keeps getting de-prioritized because the legacy models work and migration is risky.

**[00:30:05] SM:** Which systems are still on TensorFlow?

**[00:30:08] MS:** The older MANTIS models were originally in TensorFlow and haven't been fully ported. There are also two research models from the PRISM program that we contributed data science support to. Those aren't high on our migration priority because they're Lior Ben-David's problem more than mine. [grins slightly]

**[00:30:28] SM:** And for the optimization and deployment stack?

**[00:30:31] MS:** NVIDIA TensorRT 8.6 for the quantization and optimization step — that's what takes us from a trained PyTorch model to something that can run at thirty frames per second on the Jetson. ONNX Runtime 1.16 is the inference runtime for cross-platform deployment. The model conversion flow is: PyTorch → ONNX export → TensorRT engine compilation for Jetson targets. We maintain ONNX as the canonical exchange format so we could in principle swap out the backend inference runtime.

**[00:31:02] SM:** For version control and CI/CD?

**[00:31:04] MS:** GitLab 16.8, on-prem. Every ML experiment has a corresponding branch with the code, the DVC dataset reference, and the W&B or MLflow experiment ID. MLflow 2.9 is the model registry — models graduate from experiment tracking into MLflow when they're candidates for production. Oren's MLOps pipeline picks them up from there. For annotation specifically, Label Studio 1.10 on-prem. And DVC 3.30 for dataset versioning as I mentioned.

**[00:31:35] SM:** Orchestration?

**[00:31:37] MS:** Apache Airflow 2.8. The DAGs live in GitLab, so workflow changes go through code review the same as model code. Apache Kafka 3.6 for the real-time sensor data ingestion pathway.

**[00:31:51] SM:** And synthetic data generation?

**[00:31:53] MS:** Unreal Engine 5.3. We have a team of two people — one from my group and one from the visualization team — who maintain the simulation environments. It's more work than people realize: you need domain experts who understand what the real operational environments actually look like to build credible synthetic data. You can't just drop a box in a field and call it ground truth.

**[00:32:16] SM:** How about MATLAB?

**[00:32:18] MS:** MATLAB R2024a and Simulink, primarily for ATLAS. The HIL — hardware-in-the-loop — testing setup connects the MATLAB/Simulink simulation to physical sensor hardware and actuators on the test rig. It lets us test the full control loop of the navigation system without deploying to a real vehicle. David Chen's team uses CARLA for scenario testing; my team uses MATLAB/Simulink for the lower-level sensor and control validation.

**[00:32:48] SM:** I noticed you didn't mention any specific data validation framework. Is that done in-house?

**[00:32:53] MS:** Yes, entirely custom. We have a Python library we've built internally — we call it DataGuard internally, though it's not a product, just a collection of validation utilities. It runs as Airflow DAG steps before any data enters the training pipeline. It checks statistical distributions against expected baselines, runs image quality metrics, validates annotation format and schema, and flags outliers. The data poisoning attempt Avi caught eighteen months ago was detected partly by a distribution shift check in DataGuard. We've added several new checks since that incident.

**[00:33:30] SM:** But no integration with an external framework like Great Expectations or similar?

**[00:33:35] MS:** No. I evaluated Great Expectations about two years ago. For structured tabular data it's excellent, but the image and sensor data types we work with required too much customization to make it worthwhile. Staying custom means we own the maintenance burden, but we also have something that precisely fits our data types. The tradeoff is defensible, I think, but it means we can't benefit from community-driven improvements to the validation logic.

**[00:34:03] SM:** How is DataGuard maintained? Is it well-documented?

**[00:34:07] MS:** [slight wince] It is maintained. The documentation is... adequate. If you asked any of my senior ML engineers to use it, they'd be fine. If you asked a new hire to onboard it independently, they would struggle. It's on my technical debt list. One of my goals for Q2 is to do a proper documentation sprint.

**[00:34:28] SM:** I want to ask about model documentation practices. When a new HAWK-EYE version is released, what documentation exists?

**[00:34:36] MS:** For HAWK-EYE, we produce what we internally call a Model Fact Sheet — it documents the architecture, the training data composition, the benchmark performance, the known limitations, the adversarial robustness results, and the deployment constraints. This is something Michael — that is, Dr. Weber from the AI governance perspective, I mean, David Chen's team requests it as part of the V&V intake. It's reasonably thorough for HAWK-EYE.

**[00:35:08] SM:** For ATLAS?

**[00:35:10] MS:** Less consistent. There's a model card in MLflow that captures the performance metrics and basic metadata. But it doesn't have the same level of operational constraints documentation, the known limitations statement, the terrain scope issues we discussed. It's something the program needs to fix.

**[00:35:30] SM:** Let me ask about the data labeling outsourcing you mentioned — the Be'er Sheva facility. What oversight mechanisms exist over that external annotation work?

**[00:35:40] MS:** The Be'er Sheva facility is a cleared partner — their staff have appropriate clearances, which is why we can use them for this data. The contract specifies annotation quality standards and the data stays within that facility's secure environment. We do random quality audits — we pull a sample of their annotation batches and have our in-house senior annotators review them for correctness. The inter-annotator agreement scores go into DataGuard's quality checks.

**[00:36:08] SM:** Is there a formal vendor assessment process? Security review of their annotation systems?

**[00:36:13] MS:** There was an initial vetting process when we established the relationship — security, background checks, facility audit. That was about three years ago. I'm not aware of a systematic recurring review of their processes, their data handling practices, their staff turnover security procedures. Rachel Goldberg's team handles the vendor security side, so she would know the details better than I do. But if you're asking whether I personally know that their systems have been recently audited — I don't know.

**[00:36:46] SM:** Alright. Last major area — team and collaboration. How does your team interface with AI governance and the AI CoE?

**[00:36:55] MS:** We work very closely with Dr. Shapira's team — Yael is a strong advocate for the kind of rigorous engineering culture I'm trying to build here, and she provides the organizational cover when I need to push back on schedule pressure. Tamar Azoulay is our program management interface — she tracks the AI system roadmaps and escalates when things slip.

**[00:37:18] SM:** What about Noa Levine?

**[00:37:20] MS:** Noa and I have a good working relationship even though some of our conversations are uncomfortable. She is genuinely knowledgeable about AI ethics and compliance, and she understands the technical side well enough to not be dismissed as just a policy person. When she flags the data lineage issues on the pre-2023 data, she's right. When she flags the ATLAS bias testing gap, she's right. I sometimes wish she could make the resources appear to fix these things rather than just documenting that they need to be fixed, but that's not a fair criticism — that's a budgeting and prioritization problem above her level and mine.

**[00:38:00] SM:** Has Noa explicitly flagged the training data lineage issue for ISO 42001 compliance?

**[00:38:05] MS:** Yes. She reviewed our training data documentation as part of the ISO 42001 preparation work she's leading. Her assessment was that the pre-2023 HAWK-EYE training data documentation falls short of what Article 9 of the standard requires for training data management. She's noted it as a finding in her compliance tracker. I've committed to completing the retroactive annotation audit by Q3 2026, but I want to be honest that "retroactive audit" for data where some metadata is genuinely unrecoverable means we'll end up documenting what we can reconstruct and formally noting what's unrecoverable — not magically producing complete records.

**[00:38:50] SM:** What about Amit Rozner? How does your collaboration with AI Security work?

**[00:38:55] MS:** Amit is excellent. I have a lot of respect for him. The VIPER exercises have made HAWK-EYE a better system, and the data poisoning incident detection — even though Avi caught it through DataGuard checks rather than Amit's tooling specifically — that experience showed me how important the security mindset is for ML systems. I think the collaboration between data science and AI security should be a model for the rest of the organization. We have a monthly sync, we review each other's security and performance findings, and Amit's team has standing access to review our training pipeline architecture.

**[00:39:38] SM:** One thing I want to revisit — the edge model governance. When HAWK-EYE is deployed on a UAV for a mission, what is the lifecycle? Is there a formal approval process?

**[00:39:50] MS:** Yes. The promotion process is: my team trains and validates internally, David Chen's T&E team runs formal V&V, Amit's team runs adversarial robustness checks, and then the model has to be formally approved by a technical review board that includes me, David, Amit, and Tamar. That board produces a release record. Oren's MLOps pipeline then manages the actual deployment. The model artifact is signed in Harbor and the Jetson systems have an update mechanism that verifies the signature before installing a new model version. So the governance for HAWK-EYE model deployment is reasonably rigorous.

**[00:40:32] SM:** What about ATLAS edge deployments?

**[00:40:35] MS:** ATLAS doesn't have the same formal review board process. Releases go through a lighter technical sign-off — program manager approval and a sign-off from the lead ML engineer on the ATLAS team. The model signing and verified update mechanism is in place, so the deployment integrity is maintained. But the governance oversight — the multi-stakeholder review board — doesn't exist for ATLAS the way it does for HAWK-EYE. It probably should, given the autonomous navigation context.

**[00:41:05] SM:** Let me ask a broader question. If you had to identify the two or three things you are most concerned about from a risk perspective in your domain, what would they be?

**[00:41:16] MS:** [leans back, thinks for a moment] First: the pre-2023 training data lineage gap. We have a world-class AI system in HAWK-EYE that has been trained, in part, on data we cannot fully account for. The probability that something bad is lurking in that legacy data is low. The consequence if it were true would be significant. I'm not losing sleep every night, but it's an unresolved risk that needs proper documentation and compensating controls, not just avoidance.

**[00:41:55] MS:** Second: ATLAS. I think ATLAS is underbaked relative to its operational ambitions. The bias testing gap, the limited adversarial testing, the operational design domain that's not formally documented — if ATLAS is deployed in an operational context that differs from the training distribution, we could see significant performance degradation and we wouldn't have good early warning mechanisms to detect it. That worries me more than HAWK-EYE.

**[00:42:25] MS:** Third: honestly, the edge monitoring problem. For HAWK-EYE in the near term, the post-mission analysis compensates somewhat. But as we think about longer-duration missions, more autonomous operations, and expanded deployment contexts, the absence of real-time behavioral monitoring means we're flying partially blind. We have confidence in the model based on testing in known conditions. We have limited visibility into model behavior in novel conditions encountered during actual missions. That gap grows as operational scope expands.

**[00:42:58] SM:** Those are three very honest answers. Final question — is there anything you think I should know that I haven't asked about?

**[00:43:07] MS:** [thinks] One thing. We have a fairly significant number of research models — things that are post-proof-of-concept but pre-production — that don't fall clearly into any of our formal governance processes. Things being developed for the next generation of programs, exploratory work on new sensor modalities. These models exist in our GitLab repositories, they use real operational data for testing, but they're not inventoried in the formal AI system registry, they don't have data governance paperwork, and they're not subject to adversarial testing or formal V&V. This is the "shadow AI" problem within a formal AI organization — it's not that people are going to consumer AI platforms, it's that research activity creates model artifacts that outrun the governance frameworks. I don't know exactly how many of these exist across my team and I'll admit that's a problem.

**[00:43:56] SM:** That's very useful context. Amit touched on a similar theme. How many would you estimate?

**[00:44:01] MS:** In the Aerospace division specifically? Maybe fifteen to twenty research models in various stages that are not in the formal registry. Some of those are essentially dead experiments. Others are live enough that someone might, in a pinch, be tempted to put them in front of a real use case without going through the full production process. That scenario is what concerns me.

**[00:44:24] SM:** Have you raised this with Yael or Eyal Navon?

**[00:44:27] MS:** I've raised it in the AI governance committee context. It's on the radar. There's a working group looking at whether the model inventory should be expanded to cover research-stage models above a certain maturity threshold. It hasn't produced a policy yet.

**[00:44:43] SM:** Dr. Stern, this has been an incredibly valuable conversation. You've been very open and I appreciate that.

**[00:44:50] MS:** I'd rather tell you honestly what we haven't done so it can be fixed than tell you everything is great and have it come out in an actual incident. HAWK-EYE is something I'm genuinely proud of. Some of the other things we've discussed today are things I want to be proud of in two years, and the honest audit is how you get there.

**[00:45:07] SM:** A very good note to end on. Thank you.

**[00:45:11] MS:** Of course. If you need any technical documentation — model cards, the DataGuard pipeline specs, anything else — just let me know and I'll have someone pull it together.

**[00:45:20] SM:** That would be very helpful. I'll be in touch.

**[RECORDING ENDS — 00:45:28]**

---

## Post-Interview Notes (Sarah Mitchell)

- Dr. Stern is a highly credible technical witness. His depth on HAWK-EYE is exceptional — he has clearly built this system from first principles and understands its failure modes intimately. The model performs as claimed and the adversarial testing program is genuinely rigorous for a defense environment.
- The pre-2023 training data lineage gap is more significant than initially understood. Not only is annotation metadata missing, but a 2022 storage migration caused irreversible loss of some Label Studio project files. Approximately 30% of pre-2023 data lacks full provenance documentation. Stern acknowledged that some metadata is unrecoverable, which means the compensating control strategy is the realistic path forward, not remediation.
- ATLAS v2.1 has multiple compounding gaps: no formal terrain bias testing, no documented operational design domain, adversarial testing limited to FGSM only, and no multi-stakeholder governance review board for model releases. Stern considers this his second-highest risk concern. There is a meaningful mismatch between ATLAS's operational ambitions and its current validation maturity.
- The Weights & Biases data sovereignty issue is unresolved. W&B is being used for HAWK-EYE experiments under restrictions that prevent full use of the tool's features. The dual W&B/MLflow coexistence creates documentation inconsistency across experiments. An on-prem W&B deployment would resolve this but has been stuck in budget approval.
- Edge model monitoring is confirmed absent for real-time behavioral drift detection during UAV missions. Post-mission log analysis is the compensating mechanism. Monitoring thresholds are informal and undocumented. This gap compounds as operational mission duration and autonomy level increase.
- The research/pre-production model inventory gap is notable and represents shadow AI within the formal AI organization. Stern estimated 15-20 uninventoried research models in the Aerospace division alone. Some are mature enough to be pulled into operational use without proper governance, which is the primary risk vector.
- The external annotation partner (Be'er Sheva cleared facility) has not undergone a recurring security review since initial vetting approximately three years ago. Stern was unable to confirm current audit status and deferred to Rachel Goldberg's team.
- Stern's collaboration posture with Amit Rozner, David Chen, and Noa Levine is exemplary — he actively cites their findings as valid and is visibly invested in closing gaps, not defending against them. This is a cultural positive.
