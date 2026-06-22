# AI System Incident Response and Recovery Plan

> **⚠️ DRAFT DOCUMENT — NOT YET APPROVED ⚠️**
> This document is currently under review and has NOT been formally approved or adopted.
> It does not represent official Hibit Defense Systems policy.
> Draft Owner: Amit Rozner, AI Security Architect
> Review Status: Pending AI Governance Board approval (submitted November 2025)

---

| Field | Detail |
|---|---|
| **Document ID** | HBIT-POL-AI-005 |
| **Version** | 0.8 (DRAFT) |
| **Classification** | Internal - Confidential |
| **Effective Date** | Pending Approval |
| **Last Review** | December 15, 2025 |
| **Next Review** | N/A (pending approval) |
| **Owner** | Amit Rozner, AI Security Architect |
| **Co-Owner** | Rachel Goldberg, Chief Information Security Officer |
| **Approved By** | Pending — Col. (Ret.) Eyal Navon, Chief AI Officer |
| **Applicable To** | All Hibit Defense Systems divisions involved in AI/ML system development and operation |

> **CLASSIFICATION: INTERNAL - CONFIDENTIAL**
> This document is the property of Hibit Defense Systems Ltd. Distribution is restricted to authorized personnel with a demonstrated need-to-know. This document contains sensitive incident response procedures and security architecture information. Unauthorized reproduction, disclosure, or distribution is strictly prohibited and may result in disciplinary and legal action.

---

## Table of Contents

1. [Purpose and Scope](#1-purpose-and-scope)
2. [Relationship to Existing Incident Response](#2-relationship-to-existing-incident-response)
3. [AI Incident Categories](#3-ai-incident-categories)
4. [Severity Classification](#4-severity-classification)
5. [Roles and Responsibilities](#5-roles-and-responsibilities)
6. [Detection and Triage](#6-detection-and-triage)
7. [Response Procedures by Category](#7-response-procedures-by-category)
8. [Model Rollback and Recovery](#8-model-rollback-and-recovery)
9. [Evidence Collection and Forensics](#9-evidence-collection-and-forensics)
10. [Communication and Escalation](#10-communication-and-escalation)
11. [Post-Incident Analysis](#11-post-incident-analysis)
12. [Training and Exercises](#12-training-and-exercises)
13. [Metrics and Reporting](#13-metrics-and-reporting)
14. [Related Documents](#14-related-documents)
15. [Revision History](#15-revision-history)

---

## 1. Purpose and Scope

### 1.1. Purpose

This document establishes the Incident Response and Recovery Plan ("AI IRP" or "the Plan") specifically for incidents involving Artificial Intelligence (AI) and Machine Learning (ML) systems operated by Hibit Defense Systems Ltd. ("Hibit" or "the Company"). It defines the procedures, roles, and responsibilities required to detect, contain, eradicate, and recover from AI-specific security incidents, as well as to conduct post-incident analysis and drive continuous improvement.

AI and ML systems present a distinct category of security incident that cannot be adequately addressed by conventional cyber incident response procedures alone. Traditional incident response disciplines focus primarily on unauthorized access, data breach, malware infection, and system availability. AI-specific incidents may manifest as subtle degradation in model behavior, adversarially-induced misclassification, covert backdoors activated by trigger conditions, or silent training data compromise — none of which are reliably detectable through conventional network or endpoint telemetry. In a defense context, undetected AI model behavioral compromise may have direct and severe mission-critical consequences including loss of life, compromise of national security assets, or degradation of strategic capabilities.

This Plan addresses:

- Incidents that affect the integrity, confidentiality, or availability of AI/ML models, training data, inference infrastructure, or model artifacts.
- Events that cause or could cause AI/ML systems to behave in ways inconsistent with their intended function, particularly where such behavior could affect operational decisions.
- Security incidents in the AI supply chain, including compromised ML libraries, pre-trained model repositories, and third-party AI components.
- Unauthorized use of AI tools ("shadow AI") that results in exposure of Company sensitive data.

### 1.2. Scope

This Plan applies to:

- All production AI/ML systems registered in the Company AI System Inventory (HBIT-POL-AI-001, Section 7), including the twelve (12) production systems: HAWK-EYE v3.2, ATLAS v2.1, IRON SHIELD v1.8, SENTINEL AI v4.0, MANTIS v2.5, PRISM v3.1, SHIELD v2.0, VIPER v1.2, NEXUS v1.5, FORGE v0.9, INSIGHT v1.3, and COMPASS v0.5.
- All AI/ML systems in pre-production, staging, or advanced development phases where a security incident could compromise production systems or sensitive data.
- All environments hosting AI workloads: on-premises GPU compute clusters, the air-gapped classified training environment, edge-deployed AI systems (including UAV-mounted and vehicle-mounted deployments), and authorized cloud AI services.
- All personnel, contractors, and authorized third parties with access to AI/ML systems, model artifacts, training data, or inference infrastructure.
- Third-party AI/ML components, pre-trained models, and open-source ML libraries integrated into Hibit systems.

### 1.3. Exclusions

This Plan does not replace the general Information Security Incident Response Plan (HBIT-SEC-IRP-001), which continues to govern all cyber incidents. Incidents involving AI systems that are purely availability-related (e.g., hardware failure, network outage with no suspected malicious cause) are handled under HBIT-SEC-IRP-001. Incidents involving classified AI systems operating in accredited classified facilities are subject to additional procedures defined by the Facility Security Officer; this Plan governs the AI-specific components of response for such systems to the extent permitted under applicable classification handling requirements.

### 1.4. Plan Authority

The AI Security Architect (Amit Rozner) holds authority as AI Incident Commander for incidents governed by this Plan. The CISO (Rachel Goldberg) holds escalation authority for decisions with enterprise-wide security or regulatory implications. The Chief AI Officer (Col. (Ret.) Eyal Navon) serves as executive sponsor and holds authority for decisions requiring operational mission impact assessment.

---

## 2. Relationship to Existing Incident Response

### 2.1. Addendum Structure

This Plan is designed as a specialized addendum and extension to the Company's Information Security Incident Response Plan (HBIT-SEC-IRP-001). It does not replace or supersede HBIT-SEC-IRP-001 as the primary incident response governance document for the Company's broader information security program. Rather, it provides the AI-specific procedures, classification frameworks, playbooks, and expertise structures required to respond effectively to incidents that involve AI/ML system integrity, adversarial attacks, and model compromise — areas not addressed in sufficient depth by the general IRP.

### 2.2. Plan Precedence

Where both HBIT-SEC-IRP-001 and this Plan apply to the same incident, the AI-specific procedures defined herein take precedence for all AI/ML-specific response actions. General organizational structures defined in HBIT-SEC-IRP-001 (e.g., Incident Management Team composition, executive notification thresholds, external regulatory reporting) continue to apply unless this Plan specifies AI-specific modifications or supplements.

When an incident is determined to involve both traditional cyber components (e.g., network intrusion, endpoint compromise) and AI-specific components (e.g., model artifact exfiltration following a credential compromise), the AI Incident Commander and the Cyber Incident Commander (as defined in HBIT-SEC-IRP-001) shall jointly lead the response, with clear delineation of workstreams and a unified communication chain to the CISO.

### 2.3. Integration Points

The following integration points exist between this Plan and HBIT-SEC-IRP-001:

| Integration Point | HBIT-SEC-IRP-001 Reference | AI IRP Supplement |
|---|---|---|
| Incident ticket creation | Section 4.2 — ServiceNow INC record | AI incident type flag and AI category field added |
| CISO notification threshold | Section 5.1 — SEV-1/SEV-2 criteria | AI-specific SEV-1/SEV-2 criteria defined in Section 4 of this Plan |
| Evidence preservation | Section 6.3 — Digital forensics | AI-specific artifacts and chain of custody (Section 9 of this Plan) |
| External notification | Section 7 — Regulatory/customer | AI-specific notification thresholds (Section 10 of this Plan) |
| Post-incident review | Section 9 — PIR template | AI-specific root cause categories (Section 11 of this Plan) |
| Exercises | Section 10.2 — Annual tabletop | AI-specific exercise scenarios (Section 12 of this Plan) |

### 2.4. Triggering This Plan

The SOC Tier 2 Analyst or AI Security Architect shall invoke this Plan (in addition to HBIT-SEC-IRP-001) when any of the following conditions are met:

- An event or alert involves the AI/ML model artifacts, training datasets, inference endpoints, or MLOps pipeline for any registered AI system.
- Model behavioral monitoring (via RIME AI Stress Testing, Datadog APM, or Splunk ML Toolkit) indicates anomalous inference behavior that cannot be explained by input distribution shift alone.
- A CrowdStrike Falcon alert on a GPU compute node, ML engineering workstation, or MLOps pipeline system indicates potential compromise.
- A report is received from a system operator, end user, or field unit indicating unexpected or anomalous AI system outputs.
- An AI/ML-related security vulnerability with active exploitation potential is disclosed for a component used in production systems.

---

## 3. AI Incident Categories

### 3.1. Category Framework

The following seven (7) incident categories define the primary types of AI-specific security incidents recognized under this Plan. Each category corresponds to a distinct threat vector, a distinct set of affected assets, and a distinct set of required response procedures. Incidents may span multiple categories; in such cases, the category with the highest assigned severity shall govern the primary response track, with supplementary procedures from other applicable categories.

### 3.2. Incident Category Definitions

| Category | Name | Definition | Primary Threat Vector | Potentially Affected Systems |
|---|---|---|---|---|
| **AI-1** | Adversarial Attack Detection | Detection of, or evidence of, adversarial inputs deliberately crafted to cause AI/ML model misclassification, evasion, or incorrect output at inference time. Includes white-box and black-box evasion attacks, physical adversarial attacks, and black-box query campaigns consistent with model probing for adversarial example discovery. | External adversary, nation-state actor | HAWK-EYE, IRON SHIELD, SENTINEL AI, ATLAS |
| **AI-2** | Training Data Compromise | Unauthorized access to, modification of, injection into, or deletion of training datasets, validation datasets, or data pipelines used to train or retrain AI/ML models. Includes confirmed or suspected data poisoning, label flipping, backdoor injection through data, and unauthorized export of labeled training data. | External adversary, insider threat, supply chain | All systems using supervised learning |
| **AI-3** | Model Behavioral Anomaly | Anomalous AI/ML model behavior detected through monitoring, user report, or operational observation that is inconsistent with validated performance baselines and cannot be attributed solely to expected input distribution shift. Includes significant performance degradation, unexpected output patterns, classification boundary shifts, and unexplained behavioral changes following retraining or deployment updates. | Model drift, covert poisoning, misconfiguration, pipeline integrity failure | All production AI systems |
| **AI-4** | Model Theft / Exfiltration | Unauthorized access to, copying of, or exfiltration of AI/ML model artifacts including trained weights, model architectures, hyperparameter configurations, training scripts, and evaluation results. Includes both cyber-enabled exfiltration and physical removal of media containing model artifacts. | External adversary, insider threat | HAWK-EYE, SENTINEL AI, VIPER, PRISM |
| **AI-5** | Shadow AI Data Exposure | Confirmed or suspected exposure of Hibit sensitive, proprietary, or classified information through unauthorized use of external AI tools, consumer LLM services, or unsanctioned AI applications by Company personnel. | Insider (inadvertent or intentional), unauthorized tools | Uncontrolled — any data handled by personnel |
| **AI-6** | AI Supply Chain Compromise | Confirmed or suspected compromise of a third-party AI/ML component integrated into Hibit systems, including malicious code in ML framework libraries, backdoored or tampered pre-trained models sourced from model hubs, and compromised AI development tools. | Supply chain attack, dependency confusion, typosquatting | All systems using third-party ML components |
| **AI-7** | GenAI / LLM Specific Incident | Incidents specific to Generative AI and Large Language Model systems, including prompt injection attacks (direct and indirect), system prompt extraction, training data reconstruction, safety guardrail bypass with real-world operational impact, and hallucination-driven decisions with adverse consequences. | Adversarial user input, indirect injection via external content | FORGE v0.9, PRISM v3.1 |

### 3.3. Category AI-1: Adversarial Attack Detection — Detail

An AI-1 incident is declared when any of the following conditions are met:

- RIME AI Stress Testing reports anomalous robustness degradation on an active production model that is consistent with adversarial example discovery.
- Inference logging analysis reveals structured query campaigns against a model API or endpoint consistent with black-box adversarial attack techniques (e.g., systematic boundary exploration, repetitive perturbation patterns).
- A field unit or system operator reports that HAWK-EYE, IRON SHIELD, or SENTINEL AI produced outputs inconsistent with ground truth in circumstances where adversarial interference cannot be ruled out.
- Forensic analysis of inputs to a deployed model reveals artifacts consistent with adversarial perturbation (e.g., imperceptible perturbations, adversarial patches in imagery).
- Threat intelligence from INCD, industry partners, or government sources indicates active targeting of defense AI classification systems with adversarial techniques.

### 3.4. Category AI-2: Training Data Compromise — Detail

An AI-2 incident is declared when any of the following conditions are met:

- Data integrity monitoring (Splunk alerts on data pipeline audit logs) detects unauthorized modification of training dataset files or labels in the AI data repository (NetApp NAS or S3 data lake).
- Data access logs reveal unauthorized access to training datasets by personnel without appropriate authorization.
- A covert poisoning attack is discovered through forensic analysis of model behavior, particularly where performance degradation is concentrated on specific input subclasses in ways consistent with targeted poisoning.
- A third-party data provider or data annotation partner notifies Hibit of a compromise affecting datasets supplied to Hibit.
- Internal audit or the VIPER team identifies label manipulation, dataset drift unexplained by legitimate data evolution, or unexplained additions to training corpora.

---

## 4. Severity Classification

### 4.1. Severity Level Definitions

All AI incidents declared under this Plan shall be assigned an initial severity level at time of triage. Severity shall be reassessed at each major status transition (Contained, Eradicated, Recovered) and upgraded or downgraded as evidence warrants.

| Severity | Label | Criteria | Initial Response SLA | Executive Notification |
|---|---|---|---|---|
| **SEV-1** | Critical | (a) Confirmed or highly probable AI system compromise with direct operational mission impact; (b) Active adversarial attack on a mission-critical AI system during live operation; (c) Confirmed training data poisoning affecting a production mission-critical system; (d) Confirmed model artifact exfiltration of a Critical-tier AI system; (e) AI system behavioral anomaly during an active military operation | Immediate — AI Incident Commander engaged within 15 minutes of declaration | Immediate — CISO, CAIO, and CEO notified within 30 minutes |
| **SEV-2** | High | (a) Confirmed adversarial attack or poisoning on a production system with no current operational mission impact but high potential; (b) Confirmed model artifact exfiltration of a High-tier system; (c) Confirmed shadow AI data exposure involving classified or export-controlled data; (d) AI supply chain compromise affecting a production dependency; (e) Significant unexplained model behavioral anomaly on a mission-critical system | 1 hour — AI Incident Commander engaged; containment actions initiated | Within 2 hours — CISO and CAIO notified |
| **SEV-3** | Medium | (a) Suspected (unconfirmed) adversarial attack or poisoning requiring investigation; (b) Model behavioral anomaly on a High-priority system without confirmed malicious cause; (c) Shadow AI data exposure involving internal-only sensitive data; (d) AI supply chain vulnerability identified in a production dependency (no confirmed exploitation); (e) Unauthorized access to training data without evidence of modification | 4 hours — AI incident response team assembled; initial containment assessed | Within 8 hours — CISO notified; CAIO notified if AI system suspension required |
| **SEV-4** | Low | (a) AI behavioral anomaly on a supporting-tier system with low mission impact; (b) Policy violation involving shadow AI without data exposure; (c) Identified AI supply chain vulnerability in development or staging (not production); (d) User-reported anomalous AI output that does not meet higher-severity criteria after initial assessment | 24 hours — Assigned to AI Security team for investigation; tracked in ServiceNow | As needed — standard reporting cycle |

### 4.2. Severity Mapping by Incident Category and System Tier

| Incident Category | Mission-Critical Systems (HAWK-EYE, ATLAS, IRON SHIELD, SENTINEL AI) | High-Priority Systems (MANTIS, PRISM, SHIELD, VIPER) | Supporting Systems (NEXUS, FORGE, INSIGHT, COMPASS) |
|---|---|---|---|
| **AI-1 Adversarial Attack** | SEV-1 (confirmed) / SEV-2 (suspected) | SEV-2 (confirmed) / SEV-3 (suspected) | SEV-3 (confirmed) / SEV-4 (suspected) |
| **AI-2 Training Data Compromise** | SEV-1 (confirmed modification) / SEV-2 (unauthorized access) | SEV-2 (confirmed) / SEV-3 (suspected) | SEV-3 |
| **AI-3 Behavioral Anomaly** | SEV-2 (unexplained) / SEV-3 (under investigation) | SEV-3 | SEV-4 |
| **AI-4 Model Theft/Exfiltration** | SEV-1 (confirmed) / SEV-2 (suspected) | SEV-2 (confirmed) / SEV-3 (suspected) | SEV-3 |
| **AI-5 Shadow AI Exposure** | N/A — severity based on data classification: Classified/ITAR = SEV-1; Confidential = SEV-2; Internal = SEV-3 | | |
| **AI-6 Supply Chain Compromise** | SEV-2 (confirmed active exploitation) / SEV-3 (vulnerability, no exploitation) | SEV-3 (confirmed) / SEV-4 (vulnerability) | SEV-4 |
| **AI-7 GenAI/LLM Specific** | N/A (no mission-critical GenAI systems currently deployed) | SEV-2 (PRISM - confirmed real-world impact) / SEV-3 (FORGE) | SEV-3 (FORGE) / SEV-4 (other) |

### 4.3. Severity Escalation Triggers

Any incident shall be immediately escalated to the next severity level if:

- The incident scope expands to include additional systems beyond the initially identified affected system.
- Evidence of persistence, lateral movement, or ongoing attack activity is discovered.
- An AI system cannot be safely isolated without unacceptable operational mission impact.
- Classified or export-controlled data (ITAR-controlled) is implicated in the incident.
- Media enquiry, customer contact, or regulatory inquiry is received regarding the incident.

---

## 5. Roles and Responsibilities

### 5.1. AI Incident Response Team Structure

The AI Incident Response Team (AI-IRT) is assembled at the time of incident declaration. Team composition scales with incident severity. For SEV-1 and SEV-2 incidents, all roles below are activated. For SEV-3, a core team is assembled with other roles on standby. For SEV-4, the AI Security Architect and affected system owner manage the response.

### 5.2. Roles

| Role | Individual | Responsibilities | Activation Threshold |
|---|---|---|---|
| **AI Incident Commander** | Amit Rozner, AI Security Architect | Overall coordination and leadership of AI incident response; technical decision-making authority for AI-specific actions; liaison to CISO; briefing escalations; approving containment and eradication actions; authorizing model suspension | All severities |
| **Escalation Authority / CISO** | Rachel Goldberg, CISO | Escalation authority for enterprise-wide decisions; approving external notifications; directing Legal & Compliance engagement; customer and regulatory interface; resource authorization | SEV-1, SEV-2; available for SEV-3 escalation |
| **Executive Sponsor / CAIO** | Col. (Ret.) Eyal Navon, Chief AI Officer | Operational mission impact assessment; authorization for suspension of mission-critical AI systems; executive stakeholder communication; interface with Ministry of Defense stakeholders | SEV-1; SEV-2 notification |
| **AI Security — VIPER Team** | Lior Ben-David (lead) + VIPER team members | Adversarial forensic analysis; model artifact examination; reverse engineering of attack techniques; adversarial testing of candidate remediated models; post-incident robustness assessment | SEV-1, SEV-2; SEV-3 as directed |
| **MLOps Platform Lead** | Oren Tal, Head of MLOps & AI Platform | Model rollback execution via MLflow and Harbor; pipeline integrity verification and restoration; inference infrastructure operations; MLOps monitoring and alerting | All AI-1, AI-2, AI-3, AI-4 incidents; SEV-3 and above |
| **AI Ethics & Compliance Lead** | Noa Levine, AI Ethics & Compliance Lead | Ethics and societal impact assessment for incidents with broad deployment scope; compliance obligations assessment; documentation of ethics impact in PIR; GDPR and data protection obligations | SEV-1 (automatic); SEV-2 where AI-5 or AI-7 involved |
| **Affected System Technical Owner** | Varies by system (see HBIT-POL-AI-001, Section 7) | System-specific operational expertise; operational workarounds; interface with operational users; system configuration and deployment knowledge; recovery validation testing | All incidents affecting their system |
| **SOC Team** | On-call SOC Analyst / SOC Lead | Initial detection and alert triage; first-responder actions (evidence preservation, initial isolation where authorized); escalation to AI Incident Commander; ongoing monitoring during incident | First responders on all incidents |
| **Legal & Compliance** | Company Legal Counsel + Compliance Officer | Regulatory notification obligations (Israeli law, customer contracts, ITAR); legal hold instructions; litigation hold preservation requirements; privilege protection for incident communications | SEV-1 (automatic); SEV-2 involving classified or ITAR data; as directed by CISO |
| **IT Infrastructure / System Administration** | On-call IT Operations | Network isolation support; infrastructure-level access revocation; backup system access; coordination with Oren Tal on infrastructure operations | As directed by AI Incident Commander |
| **[TODO: Define communications/PR role for AI incidents]** | **[TODO]** | Internal and external communications strategy; media response if required; customer communications drafting; coordination with Government Relations for MOD stakeholders | **[TODO: Threshold to be defined]** |

### 5.3. Escalation Authority Matrix

| Decision | Authority |
|---|---|
| Declare AI incident | SOC Tier 2 Analyst or AI Incident Commander |
| Upgrade/downgrade severity | AI Incident Commander |
| Isolate / suspend an AI system (High-priority or Supporting tier) | AI Incident Commander |
| Isolate / suspend a mission-critical AI system | CISO in consultation with CAIO (operational impact assessment required) |
| Authorize model rollback | AI Incident Commander + MLOps Lead (Oren Tal) |
| Authorize emergency retraining with modified dataset | AI Incident Commander; CISO notification required for mission-critical systems |
| External customer notification | CISO |
| Regulatory / government notification | CISO + Legal Counsel |
| Engage third-party AI security specialist | CISO |
| Lift isolation and return system to service | AI Incident Commander (final validation); CAIO sign-off for mission-critical systems |

---

## 6. Detection and Triage

### 6.1. Detection Sources

AI incidents may be detected through multiple channels. The following detection sources are integrated into the Company's AI security monitoring posture:

| Detection Source | Tool / System | AI Incident Categories | Notes |
|---|---|---|---|
| ML model behavioral monitoring | RIME AI Stress Testing Platform | AI-1, AI-3 | Automated robustness checks post-deployment and on scheduled intervals |
| Infrastructure and endpoint monitoring | Splunk Enterprise 9.1 (SIEM) | AI-2, AI-4, AI-6 | Custom ML-specific dashboards; data pipeline integrity alerts; model artifact access alerts |
| Endpoint protection | CrowdStrike Falcon | AI-4, AI-6 | GPU nodes, ML engineering workstations, MLOps servers |
| APM / model performance monitoring | Datadog APM + custom ML metrics | AI-3 | Input distribution drift, prediction distribution shift, latency anomalies |
| User / operator reports | ServiceNow portal, direct escalation | AI-1, AI-3, AI-5, AI-7 | Field operators, data scientists, end users |
| ITAR / data loss prevention | [DLP tool — see HBIT-SEC-IRP-001] | AI-5 | Outbound data monitoring; cloud upload detection |
| Threat intelligence feeds | INCD, sector ISACs, vendor advisories | AI-1, AI-6 | Active adversary TTPs; supply chain vulnerability disclosures |
| Dependency and supply chain scanning | GitLab CI/CD pipeline security scanning | AI-6 | Automated scanning on every pipeline run; alerts on new CVEs |
| Internal audit and access review | Splunk audit logs, quarterly access review | AI-2, AI-4 | Data repository access; model registry access logs |

> **[TODO: Develop AI-specific detection signatures for SOC integration]**
> Current SOC runbooks (HBIT-SEC-IRP-001, Annex B) do not include AI-specific detection signatures or triage procedures. SOC Tier 1 analysts are trained to escalate alerts from RIME and ML-tagged Splunk dashboards, but lack structured guidance on interpreting model behavioral anomalies or distinguishing adversarial activity from legitimate input distribution shift. Development of a dedicated SOC AI Incident Triage Guide is a priority deliverable for Q1 2026, assigned to Amit Rozner in coordination with the SOC Lead.

> **Note:** At present, SOC analysts do not have sufficient training to independently assess whether a model behavioral alert represents a security incident, performance degradation due to natural data drift, or a pipeline misconfiguration. All RIME alerts and Splunk ML Toolkit anomaly alerts are currently escalated directly to the AI Security Architect on-call for initial assessment. This is a recognized operational gap that increases response latency and AI Security team on-call burden.

### 6.2. Triage Criteria

Upon receipt of an alert or report, the following triage questions shall be applied to determine whether an event constitutes an AI-specific security incident requiring activation of this Plan:

**Step 1 — Is an AI/ML system involved?**
- Is the alert, report, or anomaly associated with a registered AI/ML system, its training data, model artifacts, or AI/ML pipeline infrastructure?
- If NO → Handle under HBIT-SEC-IRP-001. This Plan does not apply.
- If YES → Proceed to Step 2.

**Step 2 — Is there a security dimension?**
- Is there any indication of unauthorized access, malicious intent, adversarial manipulation, data theft, or supply chain compromise?
- Could the observed anomaly be caused by a security event (as opposed to a software bug, infrastructure failure, or natural data drift)?
- If NO → Handle as an AI quality/performance issue via the MLOps team. No incident declaration required. Monitor and document.
- If YES or UNCERTAIN → Proceed to Step 3.

**Step 3 — Initial category assessment**
- Review the AI Incident Category Definitions (Section 3) and assign the most applicable category or categories.
- Apply the severity mapping table (Section 4.2) to assign initial severity.
- If SEV-1 or SEV-2 → Immediately notify AI Incident Commander. Do not wait for full triage completion.
- If SEV-3 or SEV-4 → AI Incident Commander notified; full triage completed before team assembly.

**Step 4 — Evidence preservation**
- Before any containment actions, initiate evidence preservation per Section 9 of this Plan.
- Create ServiceNow incident record with AI incident flag.

### 6.3. Triage Decision Flowchart

*(Narrative description — visual flowchart to be developed as Annex A in v1.0)*

Alert/Report Received → Is an AI/ML system involved? [No → HBIT-SEC-IRP-001] [Yes → Is there a security dimension?] → [No → MLOps quality process] [Yes/Uncertain → Assign AI incident category] → [Assign severity per Section 4.2] → [SEV-1/2: Immediate AI Incident Commander notification] [SEV-3/4: AI Incident Commander notification, complete triage] → [Preserve evidence per Section 9] → [Create ServiceNow record] → [Initiate response procedures per Section 7]

---

## 7. Response Procedures by Category

### 7.1. General Response Principles

The following principles apply to all AI incident response actions regardless of category:

1. **Preserve before containing** — Where operationally feasible, capture forensic evidence before taking containment actions that may destroy or alter evidence.
2. **Mission continuity assessment** — Before suspending or isolating any AI system, assess operational mission impact with the CAIO and affected system owner. Suspension of mission-critical systems requires explicit CAIO authorization unless delay would cause greater harm.
3. **Assume persistence** — AI attacks (particularly training data poisoning and adversarial backdoors) may have been present for extended periods before detection. Do not assume a recent event boundary without evidence.
4. **Model rollback is not remediation** — Rolling back to a previously validated model baseline is a containment measure, not a root cause fix. The root cause must be identified and addressed before the rolled-back model is considered fully remediated.
5. **Chain of custody** — All evidence collected must maintain documented chain of custody per Section 9.

### 7.2. Category AI-1: Adversarial Attack Detection — Response Playbook

#### Phase 1: Initial Containment (0–1 hour for SEV-1/SEV-2)

1. **Alert the AI Incident Commander** (Amit Rozner). If unreachable, escalate to CISO (Rachel Goldberg).
2. **Assess operational context**: Is the affected system currently deployed in an active operational mission? Notify CAIO immediately if yes. Document any operational decisions that may have been influenced by adversarial outputs.
3. **Preserve inference logs**: Direct Oren Tal to immediately snapshot all recent inference logs from the affected system (last 30 days minimum, or back to last known clean state). Store in write-once evidence repository. Preserve input samples associated with anomalous outputs.
4. **Assess immediate suspension**: Evaluate whether the affected system can be safely suspended or switched to human-in-the-loop mode. If HAWK-EYE is affected and is in active UAV deployment, coordinate suspension with operational command through CAIO. Do not suspend without authorization.
5. **Engage VIPER team**: Direct Lior Ben-David to begin adversarial forensics. Initial task: characterize the attack type (evasion, probing campaign, physical adversarial), estimate attack boundary (which input regions are affected), and assess whether the attack is ongoing.

#### Phase 2: Investigation and Characterization (1–24 hours for SEV-1, 1–72 hours for SEV-2)

1. **VIPER adversarial analysis**:
   - Extract and analyze the set of inputs associated with anomalous or suspected adversarial outputs.
   - Apply white-box analysis tools (if model access available) to characterize perturbation structure.
   - Determine whether inputs match known adversarial attack families (FGSM, PGD, C&W, AutoAttack, patch attacks).
   - Assess the attack's apparent sophistication and resources required — this informs attribution assessment.
   - Produce an Attack Characterization Report within the timeframes above.

2. **Impact assessment**:
   - Reconstruct the timeline of adversarial inputs. When was the first suspected adversarial input received?
   - Identify all operational decisions (by human operators or automated systems) that were informed by affected AI outputs during the attack window.
   - Assess whether any harm (operational, safety, intelligence) resulted from adversarially-induced misclassifications. Document fully.
   - Notify Legal & Compliance if harm to third parties or customer systems is possible.

3. **Attribution assessment**:
   - Was the attack conducted via direct access to an internal inference endpoint, or through a publicly accessible interface?
   - Review network access logs (Splunk) for the inference endpoint during the attack window. Look for unusual source IPs, query volumes, or query patterns.
   - CrowdStrike forensics on affected inference servers — look for compromise indicators.
   - Escalate to INCD coordination channel if nation-state TTPs are suspected.

#### Phase 3: Eradication and Recovery

1. **Model hardening assessment**: The VIPER team shall assess whether the existing model can be hardened against the identified attack vector through adversarial training, input pre-processing defenses, or certified robustness techniques, or whether full retraining is required.
2. **Adversarial retraining** (if required): Work with the affected system technical owner and MLOps team to incorporate adversarial examples into training data and retrain. New model version must pass full adversarial robustness test suite on RIME before deployment.
3. **Inference endpoint hardening**: Review and harden inference endpoint access controls. Implement rate limiting, query logging, and anomaly detection on inference APIs. Consult HBIT-POL-AI-004 Section 4 for adversarial robustness requirements.
4. **Model deployment**: Coordinate deployment of hardened model version through MLOps pipeline (Oren Tal). Verify Harbor image signature before deployment.
5. **Validation before return to service**: Full operational validation with the affected system technical owner. Document sign-off.

#### Phase 4: Post-Incident

- Complete Post-Incident Review per Section 11.
- Incorporate attack characteristics into RIME test suite for ongoing monitoring.
- Brief CAIO and CISO on hardening measures and residual risk.

---

### 7.3. Category AI-2: Training Data Compromise — Response Playbook

#### Phase 1: Initial Containment (0–2 hours for SEV-1/SEV-2)

1. **Alert the AI Incident Commander.** For SEV-1 (confirmed modification of mission-critical training data), immediately notify CISO and CAIO.
2. **Freeze data repositories**: Direct IT Infrastructure to place all affected training data repositories in read-only mode. Disable write access and retraining pipeline triggers immediately. Contact Oren Tal to halt any in-flight retraining jobs.
3. **Preserve data state**: Before any investigation activity that touches the data, take an immutable snapshot of the affected dataset(s) in their current state. This snapshot becomes primary evidence. Hash all dataset files and preserve hash records.
4. **Assess contamination scope**: Which datasets are potentially affected? Which registered AI systems use those datasets for training or fine-tuning? Which systems have been retrained since the earliest possible compromise window?

#### Phase 2: Investigation and Data Forensics (2–72 hours for SEV-1, variable for SEV-2/SEV-3)

1. **Access log forensics**:
   - Pull full access and modification logs for affected data repositories from Splunk.
   - Identify all users, service accounts, and systems that accessed the data during the suspected compromise window.
   - Identify any access patterns inconsistent with normal data science workflows (e.g., bulk downloads, access from unusual workstations, access outside business hours from unexpected accounts).
   - CrowdStrike forensics on workstations associated with suspicious access.

2. **Data integrity analysis**:
   - Compare current dataset contents against the most recent verified backup snapshot.
   - Generate statistical analysis of training label distributions — look for label flip patterns, class imbalance changes, or unexpected label value introductions.
   - Check file modification timestamps and compare against access logs for consistency.
   - Engage VIPER team to perform targeted poisoning detection analysis on affected datasets.

3. **Downstream model impact assessment**:
   - For each AI system that was retrained using potentially compromised data, assess whether behavioral changes consistent with poisoning are present.
   - Run RIME AI Stress Testing robustness suite against production model versions trained after the earliest possible compromise window.
   - Compare performance on held-out validation sets against pre-compromise baselines.
   - For mission-critical systems showing any anomaly, escalate to SEV-1 model behavioral anomaly (AI-3) concurrent track.

#### Phase 3: Eradication and Recovery

1. **Data restoration**: Restore affected datasets from the most recent verified clean backup. Verify integrity of restored data against known-good hashes.
2. **Retraining assessment**: Determine which AI systems must be retrained using clean data. Priority order: mission-critical systems first, then high-priority, then supporting.
3. **Clean retraining**: Execute retraining under enhanced monitoring. All retraining jobs to be run under dual-control — MLOps engineer plus AI Security representative. Retraining pipeline access restricted to authorized personnel during recovery.
4. **Post-retraining validation**: All retrained models to pass full validation test suite plus targeted backdoor detection tests (BadNets-style trigger detection) before re-deployment.
5. **Data pipeline security hardening**: Review and remediate the vulnerability that enabled the compromise. Update access controls, monitoring alerts, and data integrity checks.

#### Phase 4: Post-Incident

- Determine whether retraining pipeline access controls must be permanently revised.
- Assess whether additional data provenance and integrity monitoring is required.
- Brief CAIO on affected systems and model retraining status.
- Complete Post-Incident Review per Section 11.

---

### 7.4. Category AI-3: Model Behavioral Anomaly — Response Playbook

#### Phase 1: Initial Assessment (0–4 hours for SEV-2, 0–8 hours for SEV-3)

1. **Gather behavioral evidence**: Collect inference logs, performance metric time-series from Datadog, and RIME monitoring alerts. Establish the timeline of anomaly onset.
2. **Rule out benign causes first**: The AI Incident Commander and affected system technical owner shall assess whether the anomaly is attributable to:
   - Input distribution shift (legitimate change in incoming data characteristics)
   - Infrastructure change, model version mismatch, or deployment misconfiguration
   - Known and documented model limitation or edge case
3. **If benign cause confirmed**: Document findings in ServiceNow, close as AI quality issue, route to MLOps for remediation. This Plan no longer applies.
4. **If malicious cause suspected or cannot be ruled out**: Proceed with full AI incident response. Engage VIPER team for forensic behavioral analysis.
5. **System suspension assessment**: For unexplained behavioral anomalies on mission-critical systems, assess the risk of continued operation vs. operational impact of suspension. Suspend if risk of continued operation is unacceptable, subject to CAIO authorization.

#### Phase 2: Investigation

1. **Model forensics**: VIPER team to analyze model artifact — compare current production model weights/checksums against Harbor-signed baseline. Look for unauthorized modification.
2. **Training lineage review**: Review the training and deployment history of the affected model. Was a retraining event triggered recently? Review retraining job logs for anomalies.
3. **Correlate with AI-2**: If forensics suggest the anomaly could be caused by a training data issue, open a concurrent AI-2 track.
4. **Performance root cause**: Characterize the behavioral anomaly precisely. Which input classes are affected? What is the magnitude of performance change? Is there a pattern consistent with a targeted backdoor or poisoning attack?

#### Phase 3: Recovery

1. Roll back to last verified baseline model per Section 8.
2. Investigate and remediate root cause before redeployment.
3. If training data poisoning is confirmed as root cause, follow AI-2 playbook.

---

### 7.5. Category AI-4: Model Theft / Exfiltration

> Initial response procedures are defined. Detailed forensics and legal procedures require further development.

1. **Immediate actions**: Revoke access credentials associated with suspected exfiltration. Preserve network and endpoint logs. Freeze model artifact repository access.
2. **Scope assessment**: Determine which model artifacts were accessed. Assess whether exfiltrated models provide meaningful capability to an adversary (standalone value, ITAR implications).
3. **Legal implications**: Engage Legal & Compliance immediately. If ITAR-controlled AI technology may have been exfiltrated, notify Legal Counsel for export control compliance obligations. Notify CISO for potential customer contractual obligations.
4. **Technical response**: Assess whether model watermarking (if implemented) can assist in attribution or detection of misuse. Review HBIT-POL-AI-004 Section 6 for model protection requirements.

---

### 7.6. Category AI-5: Shadow AI Data Exposure

> **[PLACEHOLDER — Detailed procedures to be developed]**
>
> Shadow AI incidents present unique response challenges because they involve data exposure through a channel (external AI service) that is largely outside the Company's forensic visibility. Response procedures for this category require input from Legal & Compliance regarding applicable data protection obligations, from IT Security regarding DLP capabilities, and from HR regarding disciplinary process integration. A detailed playbook is pending development in coordination with these stakeholders.
>
> *Interim guidance:* Upon detection or report of unauthorized use of an external AI tool involving Company data, the AI Incident Commander shall immediately:
> 1. Interview the individual involved to establish scope of data shared and services used.
> 2. Notify Legal & Compliance for data protection and GDPR assessment.
> 3. If classified or ITAR-controlled data is involved, notify the Facility Security Officer and Legal Counsel immediately.
> 4. Document in ServiceNow. Escalate to CISO per severity thresholds in Section 4.

---

### 7.7. Category AI-6: AI Supply Chain Compromise

> **[PLACEHOLDER — Detailed procedures to be developed]**
>
> Supply chain compromise response requires detailed coordination with the GitLab CI/CD pipeline security posture, the ML framework dependency management process, and the Harbor container registry. Procedures for isolating and replacing compromised dependencies, assessing which deployed systems were built using affected components, and determining the scope of potential backdoor introduction require a dedicated playbook developed with the MLOps team (Oren Tal) and DevOps Lead (Martin Keller).
>
> *Interim guidance:* Upon detection of a supply chain compromise alert:
> 1. Freeze all pipeline builds using the affected component.
> 2. Identify all production systems potentially built with compromised dependencies using GitLab build artifact provenance.
> 3. Assess severity per Section 4.2 and activate appropriate response.
> 4. Coordinate remediation with Oren Tal and Martin Keller.

---

### 7.8. Category AI-7: GenAI / LLM Specific Incidents

> **[PLACEHOLDER — Detailed procedures to be developed]**
>
> GenAI and LLM-specific incident response procedures are in early development. Current production GenAI systems (FORGE v0.9, PRISM v3.1) have limited deployment scope. Detailed playbooks covering prompt injection forensics, system prompt confidentiality breach response, and hallucination-with-real-world-impact escalation will be developed as FORGE moves toward broader operational deployment. These procedures will be informed by the OWASP Top 10 for LLM Applications and NIST AI RMF guidance on GenAI risk.
>
> *Interim guidance:* LLM incidents shall be triaged by the AI Incident Commander in consultation with the system technical owner. If hallucination has influenced a real operational decision with adverse consequences, SEV-2 or higher shall be declared and post-incident review conducted with particular attention to human oversight and decision gate failures.

---

## 8. Model Rollback and Recovery

### 8.1. Rollback Principles

Model rollback to a verified baseline is the primary containment and recovery mechanism for AI-3 (behavioral anomaly) and AI-2 (training data compromise) incidents, and a candidate response for AI-1 incidents where the model's adversarial vulnerability cannot be rapidly patched. The following principles govern rollback operations:

1. **Golden baseline requirement**: All production AI systems shall maintain at least two (2) verified golden baseline model versions in the Harbor container registry, with signed image manifests. Baselines must have passed the full RIME AI Stress Testing suite and operational acceptance tests at time of baseline establishment.
2. **Rollback is not remediation**: Rollback restores operational capability but does not address root cause. The rollback baseline itself must be assessed — if the compromise window may have predated the baseline, the baseline cannot be assumed clean.
3. **Dual authorization**: All production model rollbacks require authorization from both the AI Incident Commander and the MLOps Lead (Oren Tal). Emergency rollbacks during active missions require CAIO notification within 30 minutes.
4. **Operational validation**: Before return to service, the rolled-back model must pass operational validation tests conducted by the affected system technical owner.

### 8.2. Centralized System Rollback Procedure

For AI systems deployed on centralized on-premises infrastructure (GPU cluster, OpenShift):

1. AI Incident Commander authorizes rollback and specifies target baseline version.
2. Oren Tal or designated MLOps engineer executes rollback via MLflow model registry and Harbor registry pull.
3. Verify Harbor image signature before deployment.
4. Deploy baseline model through standard deployment pipeline (GitLab CI/CD with security gates active).
5. Run smoke tests and operational validation suite. Obtain system technical owner sign-off.
6. Document rollback in ServiceNow incident record.
7. Estimated execution time: 30–90 minutes for centralized systems under normal conditions.

### 8.3. Edge-Deployed System Rollback Procedure

For AI systems deployed on edge hardware — including HAWK-EYE v3.2 mounted on UAV platforms, ATLAS v2.1 on armored vehicles, and SHIELD v2.0 on shipboard systems — standard pipeline-based rollback is not possible. Manual rollback procedures apply:

1. AI Incident Commander authorizes rollback and coordinates with CAIO and operational command to bring affected edge units to a safe location for model update.
2. Affected edge unit must be physically retrieved or connected to a secure update channel (satellite link with cryptographic verification or physical maintenance access).
3. MLOps team prepares signed model update package from Harbor baseline.
4. Update deployed via field maintenance procedure (see system-specific deployment runbooks maintained by each system's technical owner).
5. Post-deployment validation tests run on-device before returning unit to operational status.

> **[TODO: Define RTOs for edge-deployed AI systems — coordination with operational deployment teams required]**
>
> Recovery time objectives for edge-deployed systems are highly dependent on operational deployment context and physical access constraints. RTOs for HAWK-EYE UAV-mounted systems and ATLAS vehicle-mounted systems cannot be defined without input from the Aerospace Division and Land & C4ISR Division operational deployment teams. This coordination is outstanding and represents a known gap in this document. Target: RTOs for edge systems to be defined by end of Q1 2026.

### 8.4. Recovery Time Objectives by System

| System | Tier | Deployment Type | Target RTO (Rollback to Restored Service) | Notes |
|---|---|---|---|---|
| HAWK-EYE v3.2 | Mission-Critical | Edge (UAV) | **[TODO — see above]** | Dependent on field access |
| ATLAS v2.1 | Mission-Critical | Edge (vehicle) | **[TODO — see above]** | Dependent on field access |
| IRON SHIELD v1.8 | Mission-Critical | On-premises | 2 hours | Centralized; high operational priority |
| SENTINEL AI v4.0 | Mission-Critical | On-premises | 2 hours | Centralized; high operational priority |
| MANTIS v2.5 | High-Priority | On-premises | 4 hours | — |
| PRISM v3.1 | High-Priority | On-premises + Cloud | 4 hours | Cloud component RTO subject to AWS SLA |
| SHIELD v2.0 | High-Priority | Edge (shipboard) | **[TODO — see above]** | Dependent on vessel access |
| VIPER v1.2 | High-Priority | On-premises | 6 hours | — |
| NEXUS v1.5 | Supporting | On-premises | 8 hours | — |
| FORGE v0.9 | Supporting | On-premises | 8 hours | — |
| INSIGHT v1.3 | Supporting | On-premises | 12 hours | — |
| COMPASS v0.5 | Supporting | Cloud (AWS) | 12 hours | Subject to AWS SLA |
| ORACLE v0.3 | Supporting | On-premises | 24 hours | Early development; limited production use |

---

## 9. Evidence Collection and Forensics

### 9.1. Evidence Preservation Principles

Evidence preservation in AI incidents requires capture of artifacts that differ substantially from traditional cyber incident forensics. AI forensics must address: what data the model was trained on, what the model's behavioral characteristics were at key points in time, what inputs the model received and what outputs it produced, and whether the model artifacts have been tampered with. These requirements impose evidence collection actions that must be initiated before containment activities that might alter or destroy AI-specific artifacts.

### 9.2. AI Forensic Artifact Inventory

The following artifact types shall be collected and preserved for all SEV-1 and SEV-2 AI incidents, and for SEV-3 incidents as directed by the AI Incident Commander:

| Artifact Type | Description | Preservation Method | Priority |
|---|---|---|---|
| Production model artifacts | Trained model weights, architecture definition, hyperparameter configuration | Immutable copy from Harbor registry; hash verification | Critical |
| Training dataset snapshots | Dataset files, labels, and metadata at time of incident | Write-once snapshot; SHA-256 hash of all files | Critical |
| Inference logs | All model inputs, outputs, confidence scores, and metadata from inference endpoint | Export from Splunk; write-protect log files | Critical |
| MLOps pipeline logs | GitLab CI/CD pipeline run history, deployment records, MLflow experiment logs | GitLab pipeline artifact export; MLflow run export | High |
| Data pipeline audit logs | Access logs and modification history for training data repositories from Splunk | Splunk log export to evidence repository | High |
| Endpoint forensic images | Disk images of potentially compromised ML engineering workstations or GPU nodes | CrowdStrike-guided forensic capture per HBIT-SEC-IRP-001 | High |
| Network traffic logs | NetFlow/PCAP data for affected systems during incident window | Splunk network analytics export; TAP capture if available | High |
| Model evaluation records | RIME test results, validation metrics, performance benchmarks | Export from RIME platform; MLflow metric history | Medium |
| Container images | All container images run on affected infrastructure during incident window | Harbor registry audit log; image digest records | Medium |
| Input data samples | Representative samples of inputs that produced anomalous outputs | Extract from inference logs; preserve originals | Medium |
| Configuration files | Inference server configurations, model serving configurations | Version-controlled copy from GitLab; live system capture | Medium |

### 9.3. Chain of Custody

All evidence collected under this Plan shall be handled in accordance with the following chain of custody requirements:

1. **Evidence log**: A chain of custody log shall be created in ServiceNow for each AI incident. Every piece of evidence shall be logged with: artifact description, collection date/time, collecting personnel, storage location, and hash value.
2. **Immutable storage**: Evidence shall be stored in a designated write-once evidence repository (separate from production systems). Access to the evidence repository shall be limited to the AI Incident Commander, CISO, and designated forensic analysts.
3. **Integrity verification**: Hash values (SHA-256) shall be recorded at time of collection and verified at each access. Any discrepancy must be documented and escalated.
4. **Access logging**: All access to the evidence repository shall be logged and auditable.
5. **Air-gapped forensic environment**: Forensic analysis of suspected malicious model artifacts, training datasets, or code shall be conducted in the Company's air-gapped AI testing and forensic lab, not on production systems. The VIPER team is responsible for operation of the forensic lab.

> **[PLACEHOLDER: AI forensics toolkit and procedures — pending VIPER team input]**
>
> A formal AI forensics toolkit — including specific tools for model artifact analysis, adversarial input detection, training data integrity analysis, and backdoor detection — has not yet been documented. The VIPER team uses an evolving set of research tools and proprietary scripts for forensic analysis. Formalizing these into a documented and version-controlled forensics toolkit is required for audit defensibility. Oren Tal and Lior Ben-David are to jointly develop and document the AI forensics toolkit specification as a priority input to the v1.0 version of this Plan.
>
> *Additionally, the current air-gapped AI testing lab is not formally accredited as a forensic evidence handling environment. Facility requirements for forensic accreditation (physical access control, chain of custody logging infrastructure, forensic workstation build standards) are to be assessed by the Facility Security Officer and Amit Rozner in Q1 2026.*

---

## 10. Communication and Escalation

### 10.1. Internal Escalation Matrix

| Scenario | Notify | Timeline | Channel |
|---|---|---|---|
| Any AI incident declared (any severity) | AI Incident Commander | Immediate | Phone + ServiceNow |
| SEV-1 declared | AI Incident Commander, CISO, CAIO | Within 15 minutes | Phone (mandatory, not email) |
| SEV-2 declared | AI Incident Commander, CISO | Within 1 hour | Phone + ServiceNow |
| Mission-critical system suspension required | CAIO | Before action (except imminent harm) | Phone |
| Classified data suspected in AI-5 incident | Facility Security Officer, Legal Counsel | Immediately | Phone (mandatory) |
| ITAR-controlled model artifact exfiltration suspected | CISO, Legal Counsel | Within 1 hour | Phone + secure channel |
| Incident scope expands to additional systems | CISO | Within 2 hours of scope expansion | Phone or Signal |
| Return to service authorization | Affected system technical owner, AI Incident Commander, CAIO (mission-critical) | Before action | Written (email acceptable) |
| Incident closed | CISO, CAIO, affected system technical owners | Within 24 hours of closure | Incident summary via ServiceNow |

### 10.2. External Notification

| Scenario | External Party | Obligation Basis | Timeline | Decision Authority |
|---|---|---|---|---|
| Confirmed compromise of AI system integrated into an Israeli MOD program | Israeli Ministry of Defense, program contracting officer | Customer contract and government program requirements | Within 24 hours of confirmation (verify exact obligation with Legal) | CISO + Legal Counsel |
| Suspected ITAR violation (model exfiltration or unauthorized foreign disclosure) | Company Legal Counsel for U.S. Directorate of Defense Trade Controls (DDTC) assessment | ITAR (22 CFR Part 130) | Legal Counsel to advise on timeline | CISO + Legal Counsel (mandatory) |
| Confirmed compromise of AI system delivered to a commercial customer | Customer security contact per contract | Customer contract terms | Per contract (Legal to advise) | CISO |
| Confirmed or suspected compromise involving EU personal data (GDPR) | Relevant EU supervisory authority | GDPR Article 33 (72-hour notification) | Within 72 hours of awareness | Legal Counsel + CISO + DPO |
| AI incident with potential national security implications (non-MOD) | Israel National Cyber Directorate (INCD) | National Cyber Security Authority guidelines | Consult INCD reporting obligations (Legal to advise) | CISO |

> **[TODO: Define threshold for customer notification of AI system compromise]**
>
> The threshold for notifying customers of an AI system compromise (beyond contractual minimum obligations) has not been defined. This is particularly relevant for scenarios where a customer-deployed version of a Hibit AI system may have been affected by the same vulnerability as an internally-deployed version, even if there is no direct evidence of compromise of the customer's system. Rachel Goldberg and Legal Counsel are to define a notification decision framework and include it in the v1.0 version of this Plan.

### 10.3. Communication Security

All communications regarding AI security incidents shall be conducted through secure channels. For SEV-1 and SEV-2 incidents:

- **Voice**: Encrypted mobile communications; Signal messaging for informal coordination among response team.
- **Documentation**: Incident documentation in ServiceNow (access-controlled); sensitive technical details in secure document share, not email.
- **External communications**: No details of an AI security incident shall be communicated to any external party without prior authorization from the CISO. This includes informal communications with vendors, partners, and industry contacts.
- **Classification marking**: Incident documentation involving classified AI systems shall be appropriately classified and handled under applicable classification procedures.

---

## 11. Post-Incident Analysis

### 11.1. Post-Incident Review Requirements

A formal Post-Incident Review (PIR) shall be conducted for all SEV-1, SEV-2, and selected SEV-3 AI incidents. For SEV-4 incidents, a streamlined lessons-learned note shall be documented in ServiceNow. The PIR shall be completed within five (5) business days of incident closure for SEV-2 and SEV-3 incidents, and within ten (10) business days for SEV-1 incidents (to allow for full forensic analysis).

### 11.2. AI-Specific Post-Incident Review Template

The AI PIR shall address the following items in addition to standard PIR elements from HBIT-SEC-IRP-001:

**Section A — Incident Summary**
- AI incident category (AI-1 through AI-7), final severity level
- Affected AI systems, with system tier
- Timeline: detection, triage, containment, eradication, recovery
- Detection method: Was the incident detected by automated monitoring, or by human observation/report?
- Detection latency: Time between estimated attack initiation and detection

**Section B — AI-Specific Root Cause Analysis**

Root cause shall be assigned to one or more of the following AI-specific categories:

| Root Cause Category | Description |
|---|---|
| **Data quality / provenance failure** | Insufficient data integrity controls, inadequate data provenance tracking, or reliance on unverified external data sources |
| **Model architecture vulnerability** | Inherent adversarial vulnerability in model architecture; insufficient robustness to adversarial inputs; inadequate representation of adversarial conditions in training |
| **Adversarial attack (external)** | Deliberate, externally-initiated adversarial attack with no internal contributing failure |
| **AI supply chain compromise** | Compromised third-party dependency, pre-trained model, or AI tool |
| **MLOps / pipeline integrity failure** | Unauthorized modification of training pipeline, CI/CD compromise, or inadequate pipeline access controls |
| **Human error** | Inadvertent action by authorized personnel (e.g., data contamination, misconfiguration, unauthorized tool use) |
| **Shadow AI / policy violation** | Unauthorized use of AI tools by personnel leading to data exposure |
| **Monitoring / detection gap** | Incident not detected by existing monitoring; detection by alternative means |

**Section C — AI System-Specific Findings**
- Was the affected system's adversarial robustness assessment (RIME) up to date?
- Was the incident within the scope of the system's documented risk assessment?
- Were model monitoring thresholds adequate to detect the incident?
- Was human oversight sufficient to detect or mitigate the impact?

**Section D — Impact Assessment**
- Operational impact on affected AI system(s)
- Mission impact (if applicable): Was any operational decision affected by compromised AI outputs?
- Data impact: Was training data, proprietary model intellectual property, or sensitive data compromised?
- Customer / third-party impact

**Section E — Lessons Learned and Recommendations**
- Specific actionable recommendations, each with an owner and target completion date
- RIME test suite updates: New adversarial test cases or robustness tests to be added based on incident characteristics
- Monitoring and detection improvements
- Policy or training recommendations

**Section F — Sign-off**
- AI Incident Commander review and approval
- CISO review
- CAIO review (for SEV-1 and mission-critical system incidents)

### 11.3. Lessons Learned Integration

Findings from AI PIRs shall feed into the following continuous improvement cycles:

- **RIME test suite**: The VIPER team shall incorporate attack characteristics and newly discovered adversarial examples into the RIME AI Stress Testing library within 30 days of PIR completion.
- **Policy updates**: Material gaps identified in this Plan or other AI security policies shall be tracked as policy revision items, with the appropriate policy owner notified.
- **Training updates**: Training deficiencies identified in the PIR (e.g., SOC analyst AI triage capability gaps) shall be escalated to the relevant team lead for inclusion in training programs.
- **AI Risk Register**: The AI Risk Register (HBIT-FRM-AI-001) shall be updated to reflect any new or elevated risks identified through the incident.

---

## 12. Training and Exercises

### 12.1. Training Requirements

All personnel with roles in AI incident response (as defined in Section 5) shall complete AI incident response training appropriate to their role:

| Role | Training Requirement | Frequency |
|---|---|---|
| AI Incident Commander | AI incident response procedures (this Plan); adversarial ML fundamentals; AI forensics orientation | Annual; upon Plan update |
| SOC Analysts (all tiers) | AI incident triage fundamentals; AI-specific alert interpretation; escalation procedures | Annual; upon SOC AI runbook development |
| MLOps Team | Model rollback and recovery procedures; pipeline integrity; evidence preservation | Annual |
| VIPER Team | Advanced adversarial ML forensics; RIME platform; forensic lab procedures | Annual + continuous professional development |
| Legal & Compliance | AI regulatory notification obligations; ITAR and AI; GDPR AI considerations | Annual |
| System Technical Owners | System-specific incident response; evidence preservation basics | Annual |

> **Note:** SOC analyst AI triage training does not currently exist as a formal module. Development is a prerequisite for SOC integration of AI detection signatures. **[TODO: Develop AI-specific SOC analyst training module — target Q2 2026, owner Amit Rozner]**

### 12.2. Tabletop Exercises

AI incident response tabletop exercises shall be conducted to test this Plan, identify gaps, and build team familiarity with AI-specific response challenges. General cyber tabletop exercises are currently conducted bi-annually by Rachel Goldberg's team; AI-specific exercises are additional and distinct.

**Completed Exercises:**

| Exercise | Date | Scenario | Participants | Key Findings |
|---|---|---|---|---|
| AI Supply Chain Attack Tabletop | October 2025 | Compromised ML framework library with backdoor affecting HAWK-EYE and SENTINEL AI | Amit Rozner, Oren Tal, Lior Ben-David, Rachel Goldberg, Legal Counsel | Key finding: No defined escalation path for ITAR-implications in supply chain scenario; edge-deployed system rollback timelines undefined; communications strategy gap for MOD notification |

**Planned Exercises:**

| Exercise | Planned Timeframe | Proposed Scenario | Target Participants |
|---|---|---|---|
| AI-1 Adversarial Attack Tabletop | Q2 2026 | Active adversarial evasion campaign against IRON SHIELD during simulated operational scenario | Full AI-IRT including CAIO, operations representatives |
| AI-2 Training Data Poisoning Tabletop | Q3 2026 | Insider-driven training data poisoning of HAWK-EYE discovered post-deployment | AI-IRT + HR + Legal |
| AI-5 Shadow AI / Data Exposure Tabletop | Q4 2026 | Employee use of commercial LLM with sensitive project data; ITAR implications | AI-IRT + Legal + HR + Communications |

> **[TODO: Develop AI-specific tabletop exercise scenarios for H1 2026]**
>
> Exercise scenarios for H1 2026 require development as detailed scenario scripts, inject documents, and observer checklists. Scenario development is assigned to Amit Rozner with VIPER team support. The October 2025 exercise highlighted the need for operations representatives (from Aerospace and Land & C4ISR divisions) to participate in exercises involving mission-critical system scenarios — their absence was noted as a gap in the previous exercise.

> **[TODO: Establish formal exercise reporting template and lessons-learned integration process for AI tabletop exercises]**

---

## 13. Metrics and Reporting

### 13.1. AI Incident Response KPIs

The following KPIs shall be tracked to measure AI incident response effectiveness. Metrics shall be reported quarterly to the CISO and AI Governance Board, and included in the annual AI management review.

| Metric | Description | Target | Current Baseline |
|---|---|---|---|
| Mean Time to Detect (MTTD) — AI incidents | Average time from estimated incident initiation to detection | To be established | No baseline — see note |
| Mean Time to Acknowledge (MTTA) | Average time from alert generation to AI Incident Commander acknowledgement | SEV-1: < 15 min; SEV-2: < 1 hr; SEV-3: < 4 hrs | No baseline |
| Mean Time to Contain (MTTC) | Average time from incident declaration to containment of affected systems | SEV-1: < 2 hrs; SEV-2: < 8 hrs | No baseline |
| Mean Time to Recover (MTTR) | Average time from incident declaration to full service restoration | Per RTO targets in Section 8.4 | No baseline |
| % PIRs completed on time | Percentage of required PIRs completed within defined timeframes | > 90% | No baseline |
| % RIME findings remediated on schedule | Percentage of RIME test suite gaps identified in PIRs addressed within 30-day target | > 85% | No baseline |
| AI incident detection source | % of AI incidents detected by automated monitoring vs. human report | Target: > 70% automated detection (maturity goal) | No baseline |
| % AI-IRT role coverage at all times | Percentage of time all required AI-IRT roles have a designated on-call individual | 100% | Not yet measured |

> **[PLACEHOLDER: Baseline metrics to be established after first 6 months of operation]**
>
> No baseline exists for any AI-specific incident response metrics, as this Plan has not yet been formally implemented. All targets in the table above are aspirational and based on comparable metrics from general cyber incident response programs adjusted for the additional complexity of AI incidents. Baselines shall be established during the first six (6) months of operation following Plan approval. The AI Security Architect shall present initial baseline data to the AI Governance Board at the 6-month operational review.
>
> *Metric collection tooling for AI-specific KPIs has not yet been configured in ServiceNow or Splunk. ServiceNow incident form customization to capture AI-specific fields (incident category, affected AI system, detection source) is a prerequisite for automated metric collection and is on the Q1 2026 IT operations backlog.*

### 13.2. Reporting Cadence

| Report | Audience | Frequency | Content |
|---|---|---|---|
| AI Incident Status Update | CISO, CAIO | Real-time during active SEV-1/SEV-2 incidents | Hourly or as directed |
| AI Incident Closure Summary | CISO, CAIO, affected division leads | Within 24 hours of incident closure | Incident summary, impact, immediate actions, PIR scheduled |
| AI Incident KPI Dashboard | AI Governance Board, CISO | Quarterly | All KPIs above; trend analysis; open recommendations from PIRs |
| Annual AI Incident Response Review | AI Governance Board, CEO, Board Audit Committee | Annual | Annual KPI summary; exercise outcomes; Plan revision recommendations; benchmark vs. AI RMF GOVERN/MANAGE |

---

## 14. Related Documents

| Document ID | Title | Relationship |
|---|---|---|
| HBIT-SEC-IRP-001 | Information Security Incident Response Plan | Parent plan — this document is an addendum |
| HBIT-POL-AI-001 | AI Governance Policy | Defines AI Governance Board; AI System Inventory; overall AI governance framework |
| HBIT-POL-AI-002 | AI Ethics and Responsible Use Policy | Ethics and societal impact assessment requirements applicable to incidents |
| HBIT-FRM-AI-001 | AI Risk Management Framework | AI Risk Register; risk assessment methodology |
| HBIT-POL-AI-003 | AI Data Management Policy | Data handling, provenance, and integrity requirements relevant to AI-2 incidents |
| HBIT-POL-AI-004 | AI System Security Policy | AI security controls and adversarial robustness requirements |
| — | NIST AI Risk Management Framework (AI RMF 1.0) | MANAGE function — AI incident response alignment |
| — | ISO/IEC 42001:2023 | AI Management System — Annex A controls relevant to incident response |
| — | MITRE ATLAS (Adversarial Threat Landscape for AI Systems) | AI-specific threat taxonomy and adversary techniques |
| — | OWASP Top 10 for Large Language Model Applications | LLM-specific threat categories (AI-7) |
| — | NIST SP 800-61r3 | Computer Security Incident Handling Guide — general IRP framework |
| — | ITAR (22 CFR Parts 120-130) | Export control obligations relevant to model artifact exfiltration |

---

## 15. Revision History

| Version | Date | Author | Changes | Review / Approval Status |
|---|---|---|---|---|
| 0.5 | September 10, 2025 | Amit Rozner, AI Security Architect | Initial draft. Sections 1–7 complete; Sections 8–15 placeholder or outline only. Distributed to Oren Tal and Lior Ben-David for initial review. | Draft — not reviewed |
| 0.7 | November 18, 2025 | Amit Rozner, AI Security Architect | Incorporated review comments from Rachel Goldberg (CISO): expanded Section 10 communication matrix; added ITAR notification guidance; strengthened chain of custody requirements in Section 9; revised severity classification thresholds in Section 4. Added AI-5 and AI-6 placeholders. Distributed to AI Governance Board for review. | Draft — CISO review complete; AI Governance Board review pending |
| **0.8** | **December 15, 2025** | **Amit Rozner, AI Security Architect** | **Current version. Incorporated initial comments from Oren Tal on rollback procedures (Section 8) and from Noa Levine on ethics impact assessment integration (Sections 5 and 11). Sections 6, 9, 12, 13 remain incomplete or contain placeholders. Submitted to AI Governance Board for formal approval — review pending.** | **Draft — Submitted to AI Governance Board November 2025; awaiting formal review session** |
| 1.0 (target) | Q1 2026 (target) | Amit Rozner + AI Governance Board | Expected changes: Complete all [TODO] and [PLACEHOLDER] items; finalize edge-deployed system RTOs (Section 8); develop AI forensics toolkit documentation (Section 9); develop AI tabletop exercise scenarios (Section 12); establish metric baselines (Section 13); formal legal review of notification thresholds (Section 10). | **Pending AI Governance Board approval** |

> **⚠️ REMINDER: This document (v0.8) has NOT been approved. It does not constitute official Hibit Defense Systems policy. Personnel should continue to follow HBIT-SEC-IRP-001 as the governing incident response document until this Plan receives formal approval. Questions should be directed to Amit Rozner (ai-security@hibit-defense.il). ⚠️**

---

*Document ID: HBIT-POL-AI-005 | Version: 0.8 DRAFT | Classification: Internal - Confidential | Last Updated: December 15, 2025*
*Draft Owner: Amit Rozner, AI Security Architect | Review Status: Pending AI Governance Board Approval*
