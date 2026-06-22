# AI Governance and Oversight Policy

---

| Field | Detail |
|---|---|
| **Document ID** | HBIT-POL-AI-001 |
| **Version** | 2.1 |
| **Classification** | Internal - Restricted |
| **Effective Date** | September 15, 2025 |
| **Last Review** | September 1, 2025 |
| **Next Review** | September 1, 2026 |
| **Owner** | Col. (Ret.) Eyal Navon, Chief AI Officer |
| **Approved By** | Bezalel Machlis, Chief Executive Officer |
| **Applicable To** | All Hibit Defense Systems divisions, subsidiaries, and controlled entities |

> **CLASSIFICATION: INTERNAL - RESTRICTED**
> This document is the property of Hibit Defense Systems Ltd. Distribution is limited to authorized personnel with a legitimate business need. Unauthorized reproduction or disclosure is prohibited.

---

## Table of Contents

1. [Purpose and Scope](#1-purpose-and-scope)
2. [Definitions](#2-definitions)
3. [AI Governance Structure](#3-ai-governance-structure)
4. [AI Strategy and Objectives](#4-ai-strategy-and-objectives)
5. [AI Risk Appetite](#5-ai-risk-appetite)
6. [Roles and Responsibilities](#6-roles-and-responsibilities)
7. [AI Inventory and Registration](#7-ai-inventory-and-registration)
8. [Compliance and Regulatory Framework](#8-compliance-and-regulatory-framework)
9. [Training and Awareness](#9-training-and-awareness)
10. [Policy Exceptions](#10-policy-exceptions)
11. [Enforcement and Sanctions](#11-enforcement-and-sanctions)
12. [Related Policies](#12-related-policies)
13. [Revision History](#13-revision-history)

---

## 1. Purpose and Scope

### 1.1. Purpose

This policy establishes the governance framework, organizational structure, and oversight mechanisms for the responsible development, procurement, deployment, and operation of Artificial Intelligence (AI) and Machine Learning (ML) systems across Hibit Defense Systems Ltd. ("Hibit" or "the Company"). It defines the principles, authorities, and accountability structures required to ensure that all AI activities align with the Company's strategic objectives, risk tolerance, regulatory obligations, and ethical commitments.

This policy supports the Company's mission to leverage AI as a strategic enabler of defense capability while maintaining the highest standards of safety, reliability, and human oversight, particularly in systems that may affect human life, national security, and international stability.

### 1.2. Scope

This policy applies to:

- All divisions of Hibit Defense Systems Ltd., including Aerospace, Land & C4ISR, Intelligence & Cyber, Homeland Security, Hibit America (Fort Worth, TX), and Hibit Europe (London).
- All AI and ML systems developed internally, co-developed with partners, or procured from external vendors, regardless of deployment stage (research, development, testing, production, maintenance).
- All personnel engaged in AI-related activities, including full-time employees, contractors, secondees, and consultants.
- AI systems operating in on-premises, cloud, edge, and embedded environments.
- Both autonomous and semi-autonomous decision-making systems.

Each division may adapt implementation procedures to suit its operational context, provided that such adaptations remain consistent with the principles and mandatory requirements set forth in this policy.

### 1.3. Exclusions

This policy does not apply to:

- Traditional deterministic software systems that do not employ machine learning, statistical inference, or adaptive algorithms.
- Standard business intelligence reporting and static analytics dashboards.
- Customer-operated systems after formal delivery and acceptance, unless Hibit retains operational responsibility under a support agreement.

---

## 2. Definitions

For the purposes of this policy, the following definitions apply:

| Term | Definition |
|---|---|
| **AI System** | A machine-based system that, for explicit or implicit objectives, infers from the input it receives how to generate outputs such as predictions, content, recommendations, or decisions that can influence physical or virtual environments. This includes systems employing machine learning, deep learning, reinforcement learning, natural language processing, computer vision, expert systems, and hybrid approaches. |
| **Machine Learning Model** | A computational artifact produced by training an algorithm on data, resulting in a system capable of making predictions or decisions without being explicitly programmed for each scenario. |
| **Automated Decision** | A decision made by an AI system with no human intervention at the point of execution. |
| **Assisted Decision** | A decision where an AI system provides a recommendation or analysis that is reviewed and acted upon by a human decision-maker. |
| **High-Risk AI System** | An AI system whose failure, malfunction, or misuse could result in significant harm to human life, safety, fundamental rights, critical infrastructure, national security, or the Company's operational capability. |
| **Lethal Autonomous Weapons System (LAWS)** | A weapons system that, once activated, can select and engage targets without further intervention by a human operator. |
| **Human-on-the-Loop (HOTL)** | A control paradigm in which a human operator monitors the AI system's decisions and retains the ability to intervene and override at any point during operation. |
| **Human-in-the-Loop (HITL)** | A control paradigm in which a human operator must actively authorize each significant decision or action taken by the AI system. |
| **AI Inventory** | The authoritative register of all AI systems owned, operated, or in development by the Company, maintained by the AI Center of Excellence. |
| **AI System Owner** | The individual designated as accountable for the lifecycle governance, risk management, and compliance of a specific AI system. |
| **Model Card** | A standardized document describing a machine learning model's intended use, performance characteristics, limitations, training data provenance, and evaluation results. |
| **AI Center of Excellence (AI CoE)** | The centralized organizational unit responsible for AI standards, best practices, tooling, and governance support across the Company. Established 2022. |

---

## 3. AI Governance Structure

### 3.1. AI Governance Board

#### 3.1.1. Establishment and Charter

The AI Governance Board ("the Board") is the senior decision-making body for AI governance at Hibit Defense Systems. The Board operates under a charter approved by the CEO and reports to the Executive Committee on all matters of AI strategy, risk, and compliance.

#### 3.1.2. Composition

The Board shall comprise the following standing members:

- Chief AI Officer (Chair)
- Chief Technology Officer
- Chief Information Security Officer
- General Counsel
- VP of Engineering
- VP of Quality Assurance and Regulatory Affairs
- One Division Head (rotating annually)
- External Independent Advisor (AI Ethics)

The Chair may invite additional participants on an ad hoc basis depending on agenda items.

#### 3.1.3. Meeting Frequency and Quorum

The Board shall convene no fewer than six (6) times per calendar year, with a minimum of one meeting per quarter. Emergency sessions may be called by the Chair or any two Board members with 48 hours' notice. Quorum requires the presence of at least five (5) members, including the Chair or designated alternate.

#### 3.1.4. Authority

The Board holds authority to:

- Approve or reject AI projects classified as Critical or High risk.
- Approve modifications to the AI risk appetite framework.
- Commission independent audits or reviews of AI systems.
- Mandate suspension or termination of AI projects that pose unacceptable risk.
- Approve policy exceptions per Section 10.

### 3.2. Chief AI Officer

The Chief AI Officer (CAIO) serves as the Company's senior executive responsible for AI governance, strategy execution, and organizational alignment. The CAIO reports directly to the CTO and maintains a dotted-line reporting relationship to the CEO for matters of AI ethics and governance. The CAIO chairs the AI Governance Board and is responsible for presenting an annual AI governance report to the Board of Directors.

### 3.3. AI Center of Excellence

The AI CoE, established in 2022, serves as the Company's central body for AI technical standards, tooling, best practices, and governance support. The AI CoE is responsible for:

- Maintaining the AI Inventory (Section 7).
- Developing and publishing AI development standards and guidelines.
- Providing technical review and advisory services to division AI teams.
- Managing the Company's AI tooling and platform infrastructure.
- Coordinating cross-divisional AI knowledge sharing.
- Supporting the AI Governance Board with technical analysis and reporting.

The AI CoE currently comprises 18 personnel, including ML engineers, data scientists, AI ethicists, and governance specialists.

### 3.4. Division AI Leads

Each operating division shall designate a Division AI Lead responsible for:

- Ensuring divisional compliance with this policy.
- Maintaining the divisional AI project portfolio and reporting status to the AI CoE.
- Serving as the primary liaison between the division and the AI CoE.
- Escalating governance matters to the AI Governance Board through the CAIO.

Division AI Leads report functionally to the CAIO on governance matters and operationally to their respective Division Heads.

### 3.5. Reporting Lines

AI governance reporting follows a dual structure:

- **Operational Reporting:** Division AI Leads report to Division Heads, who report to the COO.
- **Governance Reporting:** Division AI Leads report functionally to the CAIO, who reports to the CTO and, on governance matters, to the CEO and the AI Governance Board.

Monthly governance dashboards shall be submitted by each Division AI Lead to the AI CoE by the fifth business day of each month. Quarterly governance reports shall be compiled by the AI CoE and presented to the AI Governance Board.

---

## 4. AI Strategy and Objectives

### 4.1. Strategic Alignment

All AI initiatives shall align with the Company's AI Vision 2028 strategy document (HBIT-STRAT-AI-002), which establishes the long-term direction for AI capability development across the Company. The AI Vision 2028 identifies five strategic pillars:

1. Autonomous and semi-autonomous defense systems.
2. Intelligence analysis and decision support.
3. Predictive maintenance and logistics optimization.
4. Cybersecurity and threat detection.
5. Corporate operational efficiency.

### 4.2. Annual AI Objectives

The CAIO shall, in coordination with Division Heads and the AI CoE, establish annual AI objectives that translate the strategic pillars into measurable targets. Annual objectives shall be approved by the AI Governance Board no later than Q1 of each fiscal year and shall include:

- Target number of AI systems to advance to production status.
- Risk reduction targets for existing AI systems.
- Workforce development and talent acquisition goals.
- Compliance milestones.
- Investment allocation by strategic pillar.

### 4.3. Portfolio Management

The AI CoE shall maintain a consolidated view of all AI initiatives across the Company. Projects with an estimated total investment exceeding $1,000,000 (USD) require formal AI Governance Board review, including an ethics impact assessment, prior to funding approval.

---

## 5. AI Risk Appetite

### 5.1. General Risk Appetite Statement

Hibit Defense Systems recognizes that the development and deployment of AI systems in defense contexts involves inherent risk. The Company accepts measured risk where it is justified by strategic, operational, or customer value, provided that such risk is identified, assessed, mitigated to acceptable levels, and subject to continuous monitoring.

### 5.2. Risk Categories and Tolerance

AI systems shall be classified into the following risk categories based on an assessment conducted at project initiation and reviewed at each lifecycle gate:

| Classification | Description | Risk Tolerance | Approval Authority |
|---|---|---|---|
| **Critical** | Systems with direct implications for human life, weapons engagement, or national security infrastructure. Includes all LAWS and autonomous targeting systems. | Very Low. Residual risk must be formally accepted by the AI Governance Board and documented in the risk register. | AI Governance Board |
| **High** | Systems that inform high-consequence decisions (e.g., intelligence analysis, threat assessment, mission planning) or process classified data. | Low. Residual risk requires CAIO approval with documented mitigation plans. | CAIO |
| **Medium** | Systems supporting operational decisions with moderate consequence, such as predictive maintenance, logistics optimization, and quality inspection. | Moderate. Standard risk management processes apply. | Division AI Lead |
| **Low** | Internal productivity tools, research prototypes, and experimental systems not connected to production environments. | Acceptable within standard corporate risk management. | AI System Owner |

### 5.3. Autonomous Systems Provisions

All AI systems that operate autonomously or semi-autonomously in physical environments shall be subject to the following additional requirements:

- A documented concept of operations (CONOPS) that specifies the operational envelope, failure modes, and human override mechanisms.
- Mandatory Human-on-the-Loop (HOTL) as a minimum control posture.
- Periodic autonomous behavior testing in controlled environments before field deployment.
- An independent safety review by the VP of Quality Assurance.

### 5.4. Lethal Autonomous Weapons Systems (LAWS) Provisions

Hibit Defense Systems maintains the following mandatory provisions for any system that could, by design or foreseeable misuse, function as a lethal autonomous weapons system:

5.4.1. **Human Control Mandate.** All weapons systems developed or produced by Hibit shall incorporate meaningful human control over the decision to use force. No system shall be designed or configured to select and engage human targets without explicit human authorization for each engagement.

5.4.2. **HITL Requirement.** LAWS-adjacent systems shall operate under a Human-in-the-Loop (HITL) control paradigm at all decision points involving the application of lethal force. HOTL is not sufficient for lethal engagement decisions.

5.4.3. **Ethics Review.** All projects classified as LAWS or LAWS-adjacent shall undergo a dedicated ethics review by the AI Governance Board, supplemented by the External Independent Advisor, prior to proceeding beyond the design phase.

5.4.4. **Customer Obligations.** Sales and delivery agreements for systems with autonomous engagement capability shall include contractual provisions requiring the customer to maintain human control consistent with this policy and applicable international humanitarian law.

5.4.5. **Compliance with International Norms.** Hibit Defense Systems shall monitor and comply with emerging international norms, treaties, and regulations governing autonomous weapons systems, including the outcomes of the United Nations Convention on Certain Conventional Weapons (CCW) Group of Governmental Experts on LAWS.

---

## 6. Roles and Responsibilities

### 6.1. Executive Leadership

The CEO bears ultimate accountability for AI governance across the Company. The CTO is responsible for ensuring that the AI governance framework is adequately resourced and integrated into the technology organization. The CFO shall ensure that AI governance costs are reflected in divisional budgets.

### 6.2. AI Center of Excellence

The AI CoE is responsible for:

- Maintaining and enforcing AI development standards.
- Operating the AI Inventory and registration system.
- Conducting or commissioning technical reviews of AI systems.
- Publishing guidance documents and templates.
- Monitoring regulatory developments and advising the CAIO.

### 6.3. Division Heads

Division Heads are accountable for AI governance within their respective divisions. They shall ensure that:

- All AI projects within the division are registered in the AI Inventory.
- Division AI Leads are empowered and resourced to fulfil their governance responsibilities.
- AI governance considerations are integrated into project planning and resource allocation.

### 6.4. Project Managers

Project managers responsible for AI projects shall ensure that:

- AI governance requirements are incorporated into project plans.
- Risk assessments are conducted at project initiation and reviewed at each lifecycle gate.
- All required approvals are obtained before advancing to the next lifecycle phase.
- Model cards and system documentation are maintained current throughout the project lifecycle.

### 6.5. Individual AI Practitioners

All personnel engaged in AI development, data science, ML engineering, or AI system operation are responsible for:

- Adhering to this policy and associated standards.
- Reporting governance concerns or potential violations through established channels.
- Completing mandatory training requirements per Section 9.
- Documenting their work in accordance with AI CoE standards.

---

## 7. AI Inventory and Registration

### 7.1. Mandatory Registration

All AI systems, regardless of classification or lifecycle stage, shall be registered in the Company's AI Inventory system. Registration is mandatory and must occur within ten (10) business days of project initiation.

This requirement applies to:

- Internally developed AI systems.
- Commercially procured AI products deployed within Hibit environments.
- AI components embedded in larger systems.
- Research prototypes and proof-of-concept systems.
- AI systems developed under contract for customers where Hibit retains operational responsibility.

### 7.2. AI System Classification

Upon registration, each AI system shall be classified according to the risk categories defined in Section 5.2. Classification shall be performed by the AI System Owner and validated by the Division AI Lead. Systems classified as Critical or High shall require additional validation by the AI CoE.

### 7.3. Required Registration Metadata

The following metadata shall be recorded for each registered AI system:

- System name and unique identifier.
- AI System Owner and technical lead.
- Division and business unit.
- Risk classification (Critical, High, Medium, Low).
- Lifecycle stage (Research, Development, Testing, Production, Maintenance, Retired).
- Description of purpose and intended use.
- Data sources and data classification.
- Model type and architecture summary.
- Deployment environment (on-premises, cloud, edge, embedded).
- Human oversight model (HITL, HOTL, fully automated).
- Applicable regulatory requirements.
- Date of last risk assessment.
- Date of last model performance evaluation.

### 7.4. Inventory Maintenance

AI System Owners shall update the AI Inventory whenever a material change occurs to any registered metadata field. At a minimum, all entries shall be reviewed and confirmed current on an annual basis, aligned with the Company's annual planning cycle.

---

## 8. Compliance and Regulatory Framework

### 8.1. ISO/IEC 42001 Alignment

This policy is designed to align with ISO/IEC 42001:2023 (Artificial Intelligence Management System). The Company is pursuing formal ISO 42001 certification, targeted for Q2 2026. The AI CoE maintains a mapping of policy provisions to ISO 42001 clauses and shall conduct gap assessments at least annually.

### 8.2. NIST AI Risk Management Framework

Hibit Defense Systems has adopted the NIST AI Risk Management Framework (AI RMF 1.0) as a complementary governance reference. The GOVERN, MAP, MEASURE, and MANAGE functions of the AI RMF are incorporated into the Company's AI lifecycle methodology. The AI CoE maintains a crosswalk between this policy and the NIST AI RMF core functions.

### 8.3. EU AI Act Considerations

Given the Company's operations in the European Union through Hibit Europe (London), the Company monitors the evolving requirements of the EU AI Act (Regulation (EU) 2024/1689). The General Counsel, in coordination with the AI CoE and Hibit Europe leadership, shall assess the applicability of EU AI Act provisions to Hibit products and services marketed or deployed within EU member states.

AI systems classified as "high-risk" under the EU AI Act that are developed or deployed by Hibit Europe shall comply with the applicable requirements of the Act, including conformity assessments, technical documentation, and post-market monitoring obligations.

### 8.4. Defense-Specific Regulatory Compliance

All AI systems that incorporate controlled technology, technical data, or defense articles shall comply with applicable export control regulations, including:

- **International Traffic in Arms Regulations (ITAR):** AI systems containing ITAR-controlled data or technology shall be managed in accordance with the Company's Export Control Policy (HBIT-POL-EC-003) and applicable Technology Control Plans.
- **Export Administration Regulations (EAR):** AI systems subject to EAR shall be classified and managed in accordance with the applicable Export Control Classification Number (ECCN).
- **Israeli Defense Export Controls:** AI systems developed in Israel shall comply with the Israeli Defense Export Control Law (5766-2007) and the directives of the Israeli Ministry of Defense, Defense Export Controls Agency (DECA).

AI systems that process classified information shall additionally comply with the applicable national security classification guidelines and information handling requirements.

### 8.5. Regulatory Monitoring

The General Counsel's office, supported by the AI CoE, shall maintain a regulatory watch function to track emerging AI-related legislation, regulation, and guidance in all jurisdictions where the Company operates. Significant regulatory developments shall be reported to the AI Governance Board at each regular meeting.

---

## 9. Training and Awareness

### 9.1. Mandatory AI Ethics and Governance Training

All employees involved in AI-related activities shall complete the following mandatory training:

| Training Module | Target Audience | Frequency | Duration |
|---|---|---|---|
| AI Ethics Foundations (HBIT-TRN-AI-101) | All employees in AI-related roles | Annual | 4 hours |
| AI Governance for Project Leaders (HBIT-TRN-AI-201) | Project managers, AI System Owners | Annual | 8 hours |
| AI Risk Management (HBIT-TRN-AI-301) | Division AI Leads, AI CoE staff | Annual | 12 hours |
| LAWS Ethics and International Humanitarian Law (HBIT-TRN-AI-401) | Personnel on LAWS-classified projects | Annual | 8 hours |
| AI Governance Board Orientation (HBIT-TRN-AI-501) | Board members | Upon appointment and annually thereafter | 4 hours |

### 9.2. Training Delivery

Training shall be delivered through a combination of e-learning modules, instructor-led workshops, and scenario-based exercises. The AI CoE, in coordination with the Human Resources department, shall administer the training program and maintain completion records.

### 9.3. Awareness Program

The AI CoE shall conduct an ongoing awareness program to promote understanding of AI governance principles across the organization. This program shall include:

- Quarterly AI governance newsletters.
- Annual AI Ethics Week events.
- Case study publications drawing on anonymized internal and external examples.
- Dedicated AI governance content on the Company intranet.

---

## 10. Policy Exceptions

### 10.1. Exception Process

Exceptions to this policy may be granted in circumstances where strict compliance is impractical or where an alternative approach provides equivalent or superior governance outcomes. Exceptions shall not be granted where they would result in non-compliance with applicable law or regulation.

### 10.2. Exception Authority

| Policy Provision Classification | Exception Authority |
|---|---|
| Critical and LAWS provisions (Sections 5.3, 5.4) | AI Governance Board (unanimous approval required) |
| High-risk provisions | CAIO, with notification to the AI Governance Board |
| Medium and Low-risk provisions | Division AI Lead, with notification to the CAIO |

### 10.3. Exception Documentation

All approved exceptions shall be documented in writing, specifying:

- The specific policy provision(s) subject to the exception.
- The business justification for the exception.
- The alternative controls or mitigations in place.
- The duration of the exception (maximum 12 months, renewable).
- The approving authority and date of approval.

Exception records shall be maintained by the AI CoE and reported to the AI Governance Board on a quarterly basis.

---

## 11. Enforcement and Sanctions

### 11.1. Compliance Monitoring

The AI CoE shall monitor compliance with this policy through:

- Review of AI Inventory completeness and accuracy.
- Periodic assessment of divisional governance practices.
- Analysis of governance dashboard submissions.
- Ad hoc reviews as directed by the CAIO or the AI Governance Board.

### 11.2. Non-Compliance

Violations of this policy may result in disciplinary action in accordance with the Company's Human Resources policies and applicable employment law. The severity of sanctions shall be proportionate to the nature and impact of the violation:

- **Minor Non-Compliance:** Failure to complete required training, late registration of AI systems, or incomplete documentation. May result in a formal notice and required remediation within 30 days.
- **Significant Non-Compliance:** Deployment of an unregistered AI system, failure to conduct required risk assessments, or circumvention of approval processes. May result in project suspension and formal disciplinary proceedings.
- **Critical Non-Compliance:** Unauthorized deployment of LAWS-classified systems, deliberate falsification of governance records, or violations resulting in harm to persons or national security. May result in immediate project termination, termination of employment, and referral to legal authorities where applicable.

### 11.3. Reporting Violations

Personnel who become aware of actual or suspected violations of this policy shall report them to their Division AI Lead, the CAIO, or through the Company's confidential ethics hotline (HBIT-ETHICS-001). The Company prohibits retaliation against individuals who report concerns in good faith.

---

## 12. Related Policies

This policy should be read in conjunction with the following documents:

| Document ID | Title |
|---|---|
| HBIT-STRAT-AI-002 | AI Vision 2028 Strategy Document |
| HBIT-POL-IS-001 | Information Security Policy |
| HBIT-POL-DP-002 | Data Protection and Privacy Policy |
| HBIT-POL-EC-003 | Export Control Policy |
| HBIT-POL-ETH-004 | Code of Ethics and Business Conduct |
| HBIT-POL-RM-005 | Enterprise Risk Management Policy |
| HBIT-POL-HR-006 | Employee Disciplinary Policy |
| HBIT-STD-AI-010 | AI Development Lifecycle Standard |
| HBIT-STD-AI-011 | Model Validation and Testing Standard |
| HBIT-STD-AI-012 | AI Data Governance Standard |
| HBIT-STD-AI-013 | AI Monitoring and Observability Standard |
| HBIT-PROC-AI-020 | AI System Registration Procedure |
| HBIT-PROC-AI-021 | AI Risk Assessment Procedure |
| HBIT-PROC-AI-022 | AI Ethics Review Procedure |
| HBIT-TMPL-AI-030 | AI Model Card Template |
| HBIT-TMPL-AI-031 | AI Risk Assessment Template |

---

## 13. Revision History

| Version | Date | Author | Description of Changes |
|---|---|---|---|
| 0.1 | March 12, 2023 | Eyal Navon | Initial draft for internal review |
| 0.5 | May 20, 2023 | Eyal Navon, Legal Dept. | Incorporated legal review comments; added ITAR/EAR provisions |
| 1.0 | July 1, 2023 | Eyal Navon | First approved release following AI Governance Board ratification |
| 1.1 | November 15, 2023 | Eyal Navon | Added LAWS-specific provisions (Sections 5.3, 5.4); updated definitions |
| 1.2 | February 28, 2024 | Eyal Navon, Hibit Europe | Incorporated EU AI Act preliminary considerations; added Hibit Europe scope |
| 2.0 | June 1, 2025 | Eyal Navon | Major revision: restructured governance framework; added AI Governance Board charter; expanded risk appetite categories; aligned to ISO 42001 and NIST AI RMF; updated training program |
| 2.1 | September 1, 2025 | Eyal Navon | Annual review: updated meeting frequency from quarterly to six per year; refined LAWS provisions; updated AI CoE headcount; corrected cross-references |

---

> **CLASSIFICATION: INTERNAL - RESTRICTED**
> Hibit Defense Systems Ltd. | HBIT-POL-AI-001 v2.1
> Unauthorized distribution prohibited. Printed copies are uncontrolled.
