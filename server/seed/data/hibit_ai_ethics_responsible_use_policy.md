# AI Ethics and Responsible Use Policy

| Field | Value |
|---|---|
| **Document ID** | HBIT-POL-AI-002 |
| **Version** | 1.3 |
| **Classification** | Internal - Restricted |
| **Effective Date** | June 1, 2025 |
| **Last Review** | May 15, 2025 |
| **Next Review** | June 1, 2026 |
| **Document Owner** | Noa Levine, AI Ethics & Compliance Lead |
| **Approved By** | Col. (Ret.) Eyal Navon, Chief AI Officer |
| | Bezalel Machlis, Chief Executive Officer |
| **Supersedes** | HBIT-POL-AI-002 v1.2 (January 15, 2025) |
| **Related Documents** | HBIT-POL-AI-001 (AI Governance Policy), HBIT-POL-SEC-014 (Information Security Policy), HBIT-POL-PRI-003 (Data Privacy Policy), HBIT-STD-AI-005 (AI System Risk Classification Standard) |

---

## Table of Contents

1. [Purpose and Scope](#1-purpose-and-scope)
2. [Definitions](#2-definitions)
3. [Ethical Principles](#3-ethical-principles)
4. [AI Ethics Board](#4-ai-ethics-board)
5. [Ethics Impact Assessment](#5-ethics-impact-assessment)
6. [Human Oversight Requirements](#6-human-oversight-requirements)
7. [Bias and Fairness](#7-bias-and-fairness)
8. [Transparency and Explainability](#8-transparency-and-explainability)
9. [Responsible AI in Defense Applications](#9-responsible-ai-in-defense-applications)
10. [Generative AI and Foundation Models](#10-generative-ai-and-foundation-models)
11. [Reporting and Whistleblowing](#11-reporting-and-whistleblowing)
12. [Training and Awareness](#12-training-and-awareness)
13. [Compliance and Enforcement](#13-compliance-and-enforcement)
14. [Related Documents](#14-related-documents)
15. [Revision History](#15-revision-history)

---

## 1. Purpose and Scope

### 1.1. Purpose

This policy establishes the ethical principles, governance structures, and operational requirements that govern the design, development, deployment, and operation of Artificial Intelligence (AI) and Machine Learning (ML) systems at Hibit Defense Systems Ltd. ("Hibit" or "the Company"). It provides the framework through which the Company ensures that its AI capabilities are developed and employed in a manner consistent with international law, ethical norms, and the Company's corporate values.

This policy complements HBIT-POL-AI-001 (AI Governance Policy) by articulating the ethical dimension of AI governance. While HBIT-POL-AI-001 addresses organizational structures, lifecycle management, and technical governance, this document focuses on the ethical obligations, human oversight mandates, and responsible use requirements applicable to all AI/ML activities.

### 1.2. Scope

This policy applies to:

- All AI and ML systems designed, developed, procured, deployed, or operated by Hibit Defense Systems, including but not limited to computer vision systems (e.g., HAWK-EYE), autonomous navigation platforms (e.g., ATLAS), air defense AI (e.g., IRON SHIELD), natural language processing systems (e.g., PRISM), generative AI initiatives (e.g., FORGE), and perimeter detection systems (e.g., SHIELD).
- All employees, contractors, consultants, and third-party partners engaged in AI/ML activities on behalf of the Company.
- AI/ML systems across all stages of the lifecycle: research, design, development, testing, deployment, operation, monitoring, and decommissioning.
- AI/ML systems deployed domestically and internationally, including systems delivered to customer nations under defense contracts.

This policy does not apply to conventional software systems that do not incorporate AI or ML components, nor to basic statistical analysis tools that do not employ learning algorithms.

### 1.3. Regulatory and Standards Alignment

This policy is informed by and aligned with:

- ISO/IEC 42001:2023 (AI Management System), Annex B
- NIST AI Risk Management Framework (AI RMF 1.0), GOVERN and MAP functions
- EU Artificial Intelligence Act (Regulation 2024/1689), risk classification framework
- OECD Principles on Artificial Intelligence (2019, updated 2024)
- International Humanitarian Law (IHL), including the Geneva Conventions and Additional Protocols
- Israeli Privacy Protection Law, 5741-1981

---

## 2. Definitions

| Term | Definition |
|---|---|
| **AI System** | A machine-based system that, for explicit or implicit objectives, infers from input how to generate outputs such as predictions, content, recommendations, or decisions that can influence physical or virtual environments. |
| **Autonomous Weapon System** | A weapon system that, once activated, can select and engage targets without further human intervention. |
| **Bias** | Systematic and repeatable errors in an AI system that create unfair outcomes for specific groups or contexts. |
| **Ethics Impact Assessment (EIA)** | A structured evaluation of an AI system's potential ethical risks, societal impacts, and compliance with this policy. |
| **Explainability** | The degree to which the internal mechanics of an AI system can be described in human-understandable terms. |
| **Fairness** | The property of an AI system that ensures equitable treatment and outcomes across relevant population groups. |
| **Foundation Model** | A large-scale AI model trained on broad data that can be adapted to a wide range of downstream tasks. |
| **Generative AI (GenAI)** | AI systems capable of generating text, images, code, or other content based on learned patterns. |
| **Human-in-Command (HIC)** | The human operator retains overall authority to intervene and override the AI system at any point, including the ability to refuse activation or deactivate the system. |
| **Human-in-the-Loop (HITL)** | A human operator is required to authorize each individual action or decision taken by the AI system before execution. |
| **Human-on-the-Loop (HOTL)** | A human operator supervises the AI system's operation and can intervene to override, correct, or halt its actions. |
| **Lethal Autonomous Weapons System (LAWS)** | An autonomous weapon system that can independently identify, select, and engage human targets with lethal force. |
| **Meaningful Human Control** | Human involvement in AI decision-making that is informed, substantive, and timely, not merely pro-forma. |

---

## 3. Ethical Principles

Hibit Defense Systems commits to the following ethical principles as the foundation for all AI/ML activities. These principles are derived from international standards and are to be interpreted in the context of the Company's defense mission.

### 3.1. Fairness and Non-Discrimination

AI systems shall be designed and operated to avoid unjust bias and discrimination. Systems that make or inform decisions affecting individuals or groups shall be tested for disparate impact across relevant protected characteristics, including but not limited to ethnicity, gender, age, and national origin. Where AI systems are deployed in contexts involving civilian populations, particular care shall be taken to ensure equitable treatment.

### 3.2. Transparency and Explainability

Hibit shall ensure that AI systems provide appropriate levels of transparency and explainability commensurate with the system's risk classification and intended use. Stakeholders affected by AI-driven decisions shall, where operationally feasible and consistent with security classification requirements, be provided with sufficient information to understand the basis of those decisions.

### 3.3. Human Autonomy and Oversight

AI systems shall be designed to support and augment human decision-making, not to supplant it in matters of significant consequence. The Company maintains that meaningful human control must be preserved over all AI systems whose outputs carry the potential for serious harm, irreversible consequences, or implications for human life.

### 3.4. Safety and Robustness

AI systems shall be engineered to operate safely, reliably, and predictably across their intended operational environments. Systems shall incorporate appropriate fail-safe mechanisms, be resilient to adversarial manipulation, and degrade gracefully under conditions outside their design envelope. Safety requirements shall be proportionate to the severity of potential harms.

### 3.5. Privacy and Data Protection

AI systems shall be developed and operated in compliance with applicable data protection laws and the Company's Data Privacy Policy (HBIT-POL-PRI-003). The collection, processing, and storage of personal data for AI training, testing, and inference shall adhere to principles of data minimization, purpose limitation, and lawful processing. AI systems incorporating biometric capabilities (e.g., SHIELD facial recognition) shall be subject to enhanced privacy safeguards.

### 3.6. Accountability

Clear lines of accountability shall be established for all AI systems. Every AI system in production shall have a designated Technical Owner and Business Owner, as defined in HBIT-POL-AI-001. The Company accepts institutional responsibility for the behavior and outcomes of AI systems it develops and deploys, and shall maintain audit trails sufficient to support accountability determinations.

### 3.7. Societal and Environmental Wellbeing

Hibit recognizes the broader societal implications of defense AI technologies and commits to developing these capabilities in a manner that contributes to international security and stability. The Company shall consider the long-term societal consequences of its AI systems and endeavor to minimize adverse environmental impacts associated with AI development and operations.

---

## 4. AI Ethics Board

### 4.1. Establishment and Mandate

The AI Ethics Board ("the Board") is established as a standing advisory body reporting to the Chief AI Officer. The Board is chartered to provide independent ethical review and guidance on AI/ML systems and practices across the Company. Its mandate encompasses:

- Reviewing and advising on AI projects that raise significant ethical concerns.
- Evaluating Ethics Impact Assessments for high-risk AI systems.
- Issuing recommendations to the Chief AI Officer on ethical matters.
- Monitoring emerging international norms and regulatory developments pertaining to AI ethics.
- Advising on updates to this policy and related standards.

### 4.2. Composition

The Board comprises the following members:

- **Chair:** Sgt. Maj. (Ret.) Ron Adler (External, appointed by the CEO)
- **External Academic Member:** Prof. Ruth Arnon, Technion - Israel Institute of Technology
- **Chief AI Officer:** Col. (Ret.) Eyal Navon (ex officio)
- **AI Ethics & Compliance Lead:** Noa Levine (Secretary)
- **VP AI & Innovation:** Dr. Yael Shapira
- **CISO:** Rachel Goldberg
- One rotating member from the AI/ML engineering organization, appointed annually by the VP AI & Innovation.

The inclusion of two external members ensures independence and diversity of perspective. External members are bound by non-disclosure agreements commensurate with the Company's security requirements.

### 4.3. Meeting Frequency and Quorum

The Board shall convene quarterly, with a minimum of four scheduled meetings per calendar year. Extraordinary meetings may be convened at the request of the Chair, the Chief AI Officer, or any two Board members. A quorum requires a minimum of four members, including at least one external member.

### 4.4. Review Process

AI projects may be referred to the Board through the following channels:

- Automatically, upon completion of an Ethics Impact Assessment that identifies "High" or "Unacceptable" risk.
- By request of any Board member.
- By referral from a Project Manager, Technical Owner, or Business Owner.
- Through the ethics concern reporting channel (see Section 11).

The Board shall review referred matters and issue written recommendations within thirty (30) calendar days of referral. Recommendations are advisory; however, the Chief AI Officer must document justification for any decision to proceed contrary to Board recommendations.

---

## 5. Ethics Impact Assessment

### 5.1. Applicability

An Ethics Impact Assessment (EIA) is mandatory for all AI/ML projects meeting one or more of the following criteria:

- Project budget exceeds $1,000,000 USD (total lifecycle cost).
- The system is classified as "High Risk" or "Unacceptable Risk" under the Company's AI risk classification framework (HBIT-STD-AI-005), aligned with EU AI Act risk categories.
- The system involves lethal or potentially lethal applications.
- The system processes biometric data for identification purposes.

Projects not meeting these thresholds may voluntarily undergo an EIA at the discretion of the Project Manager or upon recommendation of the AI Ethics & Compliance Lead.

### 5.2. Risk Categories

Consistent with the EU AI Act risk classification and as further defined in HBIT-STD-AI-005, AI systems are classified into the following categories:

| Risk Level | Description | Examples at Hibit |
|---|---|---|
| **Unacceptable** | Systems posing a clear threat to safety, livelihoods, or fundamental rights in a manner that cannot be adequately mitigated. | Deployment prohibited without CEO and Board exemption. |
| **High** | Systems whose failure or misuse could result in serious harm to individuals, critical infrastructure, or national security. | HAWK-EYE (targeting), ATLAS (autonomous UGV), IRON SHIELD (air defense), PRISM (SIGINT NLP), SHIELD (perimeter detection). |
| **Medium** | Systems with moderate potential impact, where harms are reversible or limited in scope. | Internal analytics tools, predictive maintenance AI. |
| **Low** | Systems with minimal risk of harm. | AI-assisted document formatting, internal chatbot prototypes. |

### 5.3. Assessment Process

The EIA process consists of the following stages:

1. **Initiation:** The Project Manager submits an EIA request form to the AI Ethics & Compliance Lead, including a system description, intended use cases, and preliminary risk assessment.
2. **Scoping:** The AI Ethics & Compliance Lead determines the appropriate depth of assessment based on the risk classification.
3. **Analysis:** The assessment team evaluates the system across the following dimensions: fairness and bias risk, privacy and data protection, transparency and explainability, human oversight adequacy, safety and security, societal impact, and compliance with international humanitarian law (where applicable).
4. **Findings and Recommendations:** The assessment team produces a written report documenting findings, risk ratings, and recommended mitigations.
5. **Review:** For systems rated "High" or "Unacceptable," the EIA is referred to the AI Ethics Board (see Section 4.4).
6. **Decision:** The Chief AI Officer, informed by the Board's recommendations, approves, conditionally approves, or rejects the project on ethical grounds.

### 5.4. Documentation

Completed EIAs shall be retained for the operational life of the AI system plus five (5) years. EIA records are classified at the same level as the AI system they assess and are stored in the Company's AI governance repository.

---

## 6. Human Oversight Requirements

### 6.1. General Principle

Hibit Defense Systems maintains that meaningful human control over AI systems is a non-negotiable requirement for all systems whose outputs have the potential to cause serious harm. The level and modality of human oversight shall be proportionate to the risk classification and operational context of the AI system.

### 6.2. Human-in-the-Loop (HITL)

HITL is mandatory for the following categories of AI systems:

- Any system involved in the selection or engagement of targets where lethal force may be applied.
- Any system making or materially contributing to decisions regarding the use of force.
- Any system whose autonomous action could result in irreversible harm to human life.

Under HITL requirements, a qualified human operator must explicitly authorize each individual engagement or critical decision before the AI system executes. The operator must have access to sufficient information, adequate time, and appropriate training to exercise informed judgment.

**Applicable systems:** HAWK-EYE (targeting assistance), IRON SHIELD (engagement recommendations).

### 6.3. Human-on-the-Loop (HOTL)

HOTL is required for AI systems classified as "High Risk" that do not fall under the HITL mandate. Under HOTL requirements:

- A qualified human operator must continuously supervise the AI system's operation.
- The operator must be able to intervene, override, or halt the system's actions within operationally meaningful timeframes.
- System alerts and anomaly detection mechanisms must be implemented to draw the operator's attention to situations requiring intervention.

**Applicable systems:** ATLAS (autonomous UGV navigation in non-engagement modes), PRISM (SIGINT analysis), SHIELD (perimeter detection).

### 6.4. Human-in-Command (HIC)

HIC applies at the strategic level, ensuring that senior leadership retains authority over AI system activation, deployment decisions, rules of engagement, and operational boundaries. HIC requires that:

- A designated commander or senior decision-maker authorizes the deployment and operational parameters of AI systems before use.
- The commanding authority retains the ability to deactivate any AI system at any time.
- Decisions to transition between operational modes (e.g., from surveillance to engagement) require explicit human authorization at the appropriate command level.

### 6.5. Override and Shutdown Mechanisms

All AI systems classified as "High Risk" or above shall incorporate:

- Manual override controls accessible to the designated human operator.
- Emergency shutdown mechanisms that can be activated without system cooperation.
- Fail-safe states that default to a safe condition upon loss of communication, operator incapacitation, or system malfunction.

---

## 7. Bias and Fairness

### 7.1. Pre-Deployment Bias Testing

All AI systems classified as "High Risk" shall undergo structured bias testing prior to deployment. Bias testing shall evaluate the system's performance across relevant demographic groups, including but not limited to age, gender, ethnicity, and skin tone (for vision systems). Testing protocols shall be documented and results retained as part of the system's deployment approval package.

Bias testing shall employ appropriate statistical measures, including but not limited to demographic parity, equalized odds, and calibration metrics. The selection of fairness metrics shall be justified in writing and approved by the AI Ethics & Compliance Lead.

### 7.2. Ongoing Fairness Monitoring

For systems classified as "High Risk," fairness metrics shall be incorporated into the system's operational monitoring dashboard. Significant deviations from baseline fairness metrics shall trigger a review by the Technical Owner and, if warranted, escalation to the AI Ethics & Compliance Lead.

### 7.3. Protected Characteristics

The following characteristics are designated as protected for the purposes of bias evaluation: ethnicity, national origin, gender, age, religion, and disability status. Additional characteristics may be designated by the AI Ethics Board as appropriate to specific operational contexts.

### 7.4. Remediation

Where bias testing or ongoing monitoring identifies material fairness concerns, the Technical Owner shall:

1. Document the nature and extent of the bias.
2. Assess the operational impact and potential harms.
3. Develop and implement a remediation plan, which may include data augmentation, model retraining, algorithmic adjustments, or operational constraints.
4. Retest the system to confirm that remediation has been effective.
5. Report findings and remediation outcomes to the AI Ethics & Compliance Lead.

---

## 8. Transparency and Explainability

### 8.1. Explainability Requirements

AI systems shall provide explanations for their outputs at a level of detail appropriate to the context, the risk classification, and the needs of the intended audience. Specifically:

- **High Risk systems:** Must provide technically substantive explanations that enable qualified operators to understand the principal factors contributing to system outputs. Explanation mechanisms shall be documented in the system's technical design documentation.
- **Medium Risk systems:** Must provide summary-level explanations sufficient for operators to understand the general basis of system outputs.
- **Low Risk systems:** Documentation of the system's general operating principles is sufficient.

### 8.2. Documentation Requirements

All AI systems shall maintain the following documentation, proportionate to their risk classification:

- System design documentation, including model architecture, training methodology, and data sources.
- Risk assessment and Ethics Impact Assessment (where applicable).
- Test and validation results, including bias testing outcomes.
- Operational procedures, including human oversight protocols.
- Known limitations, failure modes, and operational boundaries.

Documentation shall be maintained in the AI governance repository and kept current throughout the system's operational life, in accordance with HBIT-POL-AI-001.

### 8.3. Stakeholder Communication

Where AI systems are delivered to customers or deployed in contexts affecting external stakeholders, appropriate disclosure shall be provided regarding:

- The fact that an AI system is involved in the relevant process or decision.
- The general nature and capabilities of the AI system.
- The human oversight mechanisms in place.
- Limitations and known risks.

Such disclosures shall be reviewed by the Legal Department and the AI Ethics & Compliance Lead prior to release, and shall comply with all applicable security classification requirements.

---

## 9. Responsible AI in Defense Applications

### 9.1. Lethal Autonomous Weapons Systems (LAWS) Policy

Hibit Defense Systems affirms the following position with respect to Lethal Autonomous Weapons Systems:

- The Company does not develop fully autonomous weapons systems that select and engage human targets without meaningful human control.
- All weapon systems incorporating AI components shall maintain human-in-the-loop authorization for engagement decisions involving lethal force (see Section 6.2).
- The Company supports international efforts to establish norms and regulations governing autonomous weapons, and commits to compliance with any binding international instruments adopted in this area.

This position has been in effect since the initial adoption of this policy in 2023 and reflects the Company's longstanding commitment to responsible defense innovation.

### 9.2. International Humanitarian Law Compliance

All AI systems developed for military applications shall be designed and deployed in compliance with International Humanitarian Law (IHL), including:

- **Distinction:** AI systems must be capable of distinguishing between combatants and civilians, and between military objectives and civilian objects. Systems must be designed to minimize the risk of misidentification.
- **Proportionality:** AI systems that inform or contribute to targeting decisions must support the operator's assessment of whether anticipated military advantage is proportionate to expected civilian harm.
- **Precaution:** The Company shall take all feasible precautions in the design and deployment of AI systems to minimize civilian casualties and damage to civilian infrastructure.

### 9.3. Proportionality and Distinction in AI Design

AI systems used in targeting, engagement, or force application contexts shall incorporate:

- Multi-sensor fusion and redundant identification mechanisms to support accurate distinction.
- Confidence scoring that provides operators with quantified assessment certainty.
- Operational constraints that prevent engagement below defined confidence thresholds.
- Logging and audit trail capabilities sufficient to support post-engagement review and accountability.

### 9.4. Human Judgment in Use-of-Force Decisions

Notwithstanding any AI system recommendation, the decision to apply lethal force shall at all times remain with a qualified human operator exercising informed judgment. AI system outputs in use-of-force contexts are to be treated as decision support, not directives. Operators shall be trained to critically evaluate AI recommendations and to exercise independent judgment, including the authority to override AI-generated recommendations.

---

## 10. Generative AI and Foundation Models

Generative AI technologies, including large language models and foundation models, present emerging opportunities and risks for the Company. The FORGE GenAI pilot program is currently underway to evaluate enterprise applications of these technologies. Specific governance requirements for generative AI will be developed as the FORGE pilot matures and will be incorporated into a future revision of this policy or issued as a supplementary standard.

In the interim, all generative AI activities shall comply with the general provisions of this policy and HBIT-POL-AI-001.

---

## 11. Reporting and Whistleblowing

### 11.1. Ethics Concern Reporting Channel

Hibit Defense Systems maintains a dedicated channel for reporting AI ethics concerns. Any employee, contractor, or third-party partner who observes or becomes aware of an AI system, process, or practice that they believe violates this policy, applicable law, or ethical norms is encouraged to report the concern through one of the following mechanisms:

- **Email:** ai-ethics@hibit-defense.co.il (monitored by the AI Ethics & Compliance Lead)
- **Internal Portal:** Ethics reporting module within the Company's compliance management system
- **Direct Contact:** Any member of the AI Ethics Board

Reports may be submitted anonymously through the internal portal. All reports shall be acknowledged within five (5) business days and investigated within thirty (30) calendar days.

### 11.2. Non-Retaliation Policy

Hibit Defense Systems strictly prohibits retaliation against any individual who, in good faith, reports an AI ethics concern or participates in an ethics investigation. Retaliation includes, but is not limited to, adverse employment actions, harassment, intimidation, or professional marginalization. Violations of this non-retaliation policy shall be treated as serious misconduct subject to disciplinary action up to and including termination.

---

## 12. Training and Awareness

### 12.1. General Awareness

All employees and contractors whose work involves AI/ML systems shall complete an annual AI ethics awareness training module. This training shall cover:

- The principles set forth in this policy.
- The Company's position on LAWS and human oversight.
- Bias recognition and mitigation fundamentals.
- The ethics concern reporting channel and non-retaliation protections.
- Relevant regulatory developments (EU AI Act, international norms).

### 12.2. Role-Specific Training

Personnel in roles with direct responsibility for AI/ML development, deployment, or operation shall receive enhanced training appropriate to their function:

- **AI Engineers and Data Scientists:** Bias testing methodologies, fairness metrics, explainability techniques, and secure AI development practices.
- **Human Operators of High-Risk Systems:** System-specific training on human oversight protocols, override mechanisms, and operator responsibilities.
- **Project Managers:** Ethics Impact Assessment procedures and escalation protocols.
- **AI Ethics Board Members:** International AI governance developments, IHL, and emerging ethical frameworks.

### 12.3. Training Records

Completion of required training shall be tracked in the Company's learning management system. The AI Ethics & Compliance Lead shall report on training compliance rates to the Chief AI Officer on a quarterly basis.

---

## 13. Compliance and Enforcement

### 13.1. Compliance Monitoring

The AI Ethics & Compliance Lead, supported by the three-person AI Ethics & Compliance team, is responsible for monitoring compliance with this policy. Compliance activities include:

- Reviewing Ethics Impact Assessments and ensuring timely completion.
- Tracking resolution of AI Ethics Board recommendations.
- Conducting periodic spot checks of AI system documentation and operational practices.
- Investigating ethics concern reports.

### 13.2. Non-Compliance

Violations of this policy may result in disciplinary action commensurate with the severity and nature of the violation, up to and including termination of employment or contract. Non-compliance that results in a breach of applicable law may be referred to the Legal Department for further action.

### 13.3. Policy Exceptions

Exceptions to any provision of this policy must be approved in writing by the Chief AI Officer, with documented justification and, for exceptions to Sections 6 or 9, the concurrence of the AI Ethics Board Chair. Approved exceptions shall be time-limited, shall specify compensating controls, and shall be reviewed at each policy review cycle.

---

## 14. Related Documents

| Document ID | Title |
|---|---|
| HBIT-POL-AI-001 | AI Governance Policy |
| HBIT-STD-AI-005 | AI System Risk Classification Standard |
| HBIT-POL-SEC-014 | Information Security Policy |
| HBIT-POL-PRI-003 | Data Privacy Policy |
| HBIT-PRO-AI-010 | Ethics Impact Assessment Procedure |
| HBIT-STD-AI-012 | AI Model Documentation Standard |
| HBIT-POL-HR-022 | Whistleblower and Non-Retaliation Policy |

---

## 15. Revision History

| Version | Date | Author | Description |
|---|---|---|---|
| 1.0 | March 1, 2023 | Noa Levine | Initial release. Established ethical principles, AI Ethics Board charter, LAWS policy, and human oversight requirements. |
| 1.1 | September 15, 2023 | Noa Levine | Added Ethics Impact Assessment process (Section 5). Expanded bias and fairness requirements (Section 7). Minor editorial corrections. |
| 1.2 | January 15, 2025 | Noa Levine | Updated regulatory alignment references to include EU AI Act (Regulation 2024/1689). Added risk classification table (Section 5.2). Updated AI Ethics Board composition to reflect current membership. Added placeholder for Generative AI section (Section 10). |
| 1.3 | May 15, 2025 | Noa Levine | Annual review. Updated definitions section. Refined human oversight requirements (Section 6). Added FORGE pilot reference in Section 10. Updated related documents table. |

---

*HBIT-POL-AI-002 v1.3 | Internal - Restricted | Hibit Defense Systems Ltd.*

*This document is the property of Hibit Defense Systems Ltd. Unauthorized distribution, reproduction, or disclosure is prohibited. This policy shall be reviewed annually or upon significant changes to the regulatory environment, organizational AI capabilities, or international norms governing AI in defense applications.*

*Internal - Restricted*
