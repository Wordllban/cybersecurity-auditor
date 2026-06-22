# AI Data Management and Privacy Policy

---

| Field | Value |
|---|---|
| **Document ID** | HBIT-POL-AI-003 |
| **Title** | AI Data Management and Privacy Policy |
| **Version** | 1.2 |
| **Classification** | Internal - Restricted |
| **Effective Date** | August 1, 2025 |
| **Last Review** | July 20, 2025 |
| **Next Review** | August 1, 2026 |
| **Owner** | Dr. Yael Shapira, VP AI & Innovation |
| **Co-Owner** | Michal Katz, Data Protection Officer |
| **Approved By** | Col. (Ret.) Eyal Navon, Chief AI Officer |
| **Supersedes** | HBIT-POL-AI-003 v1.1 (February 15, 2025) |
| **Applicable Standards** | ISO/IEC 42001:2023 (Annex A.10), NIST AI RMF (MAP 2), ISO 27001:2022, GDPR, Israeli Privacy Protection Law 5741-1981 |

> **NOTICE:** This document is the property of Hibit Defense Systems Ltd. and is classified **Internal - Restricted**. Unauthorized reproduction, distribution, or disclosure is prohibited. All recipients must hold a valid Hibit personnel clearance or be covered under an active Non-Disclosure Agreement.

---

## Table of Contents

1. [Purpose and Scope](#1-purpose-and-scope)
2. [Data Classification for AI](#2-data-classification-for-ai)
3. [Training Data Governance](#3-training-data-governance)
4. [Data Lineage and Traceability](#4-data-lineage-and-traceability)
5. [Data Privacy](#5-data-privacy)
6. [Data Security](#6-data-security)
7. [Data Retention and Disposal](#7-data-retention-and-disposal)
8. [Third-Party Data](#8-third-party-data)
9. [Data Quality Management](#9-data-quality-management)
10. [Roles and Responsibilities](#10-roles-and-responsibilities)
11. [Compliance and Audit](#11-compliance-and-audit)
12. [Related Documents](#12-related-documents)
13. [Revision History](#13-revision-history)

---

## 1. Purpose and Scope

### 1.1. Purpose

This policy establishes the requirements, standards, and procedures governing the management, protection, and privacy of data used in artificial intelligence (AI) and machine learning (ML) systems developed, deployed, or operated by Hibit Defense Systems Ltd. ("Hibit" or "the Company"). It provides a framework for responsible data stewardship throughout the AI lifecycle, from data acquisition through model decommissioning.

This policy aligns with ISO/IEC 42001:2023 Annex A.10 (Data for AI Systems) and the NIST AI Risk Management Framework MAP 2 function, and supports the Company's obligations under Israeli, European, and international defense data protection regulations.

### 1.2. Scope

This policy applies to:

- All data used in AI/ML systems across the Company's portfolio of approximately 25 active AI/ML projects, including the 12 systems currently in production.
- All categories of AI-related data, including but not limited to: training data, validation data, test data, inference input/output data, model weights and parameters, feature data, and metadata.
- All data environments, including on-premises data centers (Haifa primary, Herzliya disaster recovery), authorized cloud environments (AWS eu-west-1, Azure), and hybrid deployments.
- All Hibit personnel, contractors, subcontractors, and third parties who access, process, or manage data used in AI systems.
- All phases of the AI data lifecycle: sourcing, acquisition, ingestion, annotation, transformation, storage, usage, sharing, archival, and disposal.

This policy does not supersede the requirements of specific program-level data handling agreements, government-furnished data agreements, or customer-imposed classification guides, which shall take precedence where they impose stricter requirements.

### 1.3. Relationship to Other Policies

This policy operates as part of the Hibit AI Governance framework and should be read in conjunction with:

- HBIT-POL-AI-001 (AI Governance Framework Policy)
- HBIT-POL-AI-002 (AI Ethics and Responsible Use Policy)
- HBIT-POL-SEC-012 (Information Security Policy)
- HBIT-POL-PRI-001 (Corporate Privacy Policy)
- HBIT-POL-SEC-018 (Data Classification and Handling Policy)

Where conflicts arise between this policy and HBIT-POL-SEC-018, the more restrictive requirement shall apply.

---

## 2. Data Classification for AI

### 2.1. General Classification Levels

All data used in AI systems shall be classified according to the Hibit Data Classification Scheme, which aligns with Israeli Ministry of Defense (MOD) requirements and applicable international frameworks.

| Classification Level | Definition | AI Data Examples | Handling Environment |
|---|---|---|---|
| **Top Secret** | Israeli MOD Top Secret. Disclosure would cause exceptionally grave damage to national security. | Classified SIGINT corpus (PRISM v3.1), certain IRON SHIELD threat data | Haifa SCIF, air-gapped systems only |
| **Secret** | Israeli MOD Secret, NATO Secret, US DoD Secret equivalent. Disclosure would cause serious damage to national security. | Classified satellite imagery (HAWK-EYE v3.2), certain field test sensor data (ATLAS v2.1) | Haifa/Herzliya classified enclaves |
| **Confidential** | Disclosure would cause damage to Company interests or contractual obligations. | Proprietary model architectures, internal technical documents (FORGE v0.9), equipment maintenance records (MANTIS v2.5) | On-premises systems, encrypted storage |
| **Internal** | For internal use only. Not intended for public release. | Network traffic logs (SENTINEL AI v4.0), internal annotation guidelines, feature engineering code | On-premises or authorized cloud (encrypted) |
| **Unclassified** | No restriction on disclosure. May be publicly available. | Open-source training datasets, published research data, synthetic benchmarks | On-premises or authorized cloud |

### 2.2. Defense-Specific Classification Overlays

In addition to the general classification levels, AI data may be subject to the following regulatory overlays. Data subject to any overlay shall be handled in accordance with the most restrictive applicable requirement.

- **ITAR (International Traffic in Arms Regulations):** Technical data related to defense articles on the United States Munitions List. AI models trained on ITAR-controlled data, and the resulting model weights, are themselves subject to ITAR restrictions. The Head of Export Compliance must approve any transfer or access.
- **EAR (Export Administration Regulations):** Dual-use technology data subject to US Commerce Department controls. Classification shall reference the applicable Export Control Classification Number (ECCN).
- **NATO Classified:** Data received from or generated for NATO programs shall be handled in accordance with the NATO Security Policy (C-M(2002)49) and applicable national implementation directives.

### 2.3. AI-Specific Data Categories

For the purposes of AI governance, data shall be further categorized as follows. Each category inherits the classification level of its source data, unless a separate determination raises the classification.

| AI Data Category | Description | Governance Requirement |
|---|---|---|
| **Training Data** | Data used to train or fine-tune models | Full lineage, bias assessment, quality validation required |
| **Validation Data** | Data used to tune hyperparameters and evaluate during training | Must be statistically independent from training data; lineage required |
| **Test Data** | Data used for final model evaluation | Must be held out from training and validation; integrity controls required |
| **Inference Data** | Input data provided to models during operational use | Classification per source; access logging required |
| **Model Weights** | Learned parameters of trained models | Classified at the level of the highest-classified training data used |
| **Feature Data** | Engineered or extracted features used as model inputs | Lineage to source data required; classification per derivation |
| **Synthetic Data** | Artificially generated data used for training or testing | Source methodology must be documented; see Section 3.5 |
| **Annotation / Label Data** | Labels, annotations, or ground truth applied to raw data | Quality assurance and annotator qualification records required |

---

## 3. Training Data Governance

### 3.1. Data Sourcing Requirements

All training data shall be acquired through authorized channels and in compliance with applicable law, contractual obligations, and export control regulations. Prior to ingestion into any AI pipeline, the following requirements must be met:

1. **Provenance Documentation:** The origin, acquisition method, date of acquisition, and chain of custody for all training data shall be documented in the dataset registry (PostgreSQL-backed model registry). For government-furnished data, the applicable data rights clause shall be recorded.
2. **Legal Review:** Datasets containing personal data, data sourced from third parties, or data with potential intellectual property implications shall be reviewed by the Legal Department prior to use.
3. **Classification Determination:** A classification determination shall be made for each dataset prior to ingestion. The determination shall be recorded and approved by the Data Owner and the Information Security team.
4. **Export Control Screening:** Datasets that may contain ITAR- or EAR-controlled technical data shall be screened by the Export Compliance Office.

> **Known Limitation:** Systems deployed prior to January 2023 (including early versions of HAWK-EYE, ATLAS, and IRON SHIELD) were onboarded before the current provenance documentation requirements were established. Retroactive documentation of training data lineage for these legacy systems is ongoing under Project RETRACE (target completion: Q2 2026). Until complete, these systems carry a documented lineage gap in their risk registers.

### 3.2. Data Quality Requirements

Training data shall meet documented quality standards prior to use in model development. Quality requirements shall be defined per project and recorded in the project's Data Quality Plan.

Minimum requirements include:

- Completeness: Missing value thresholds defined and enforced.
- Accuracy: Labeling accuracy targets established (minimum 95% for production systems).
- Consistency: Cross-source consistency checks performed where applicable.
- Timeliness: Data currency requirements defined based on operational context.
- Representativeness: Assessment of whether the dataset adequately represents the target operational domain.

Automated quality validation shall be implemented using the approved data quality tooling (currently Great Expectations 0.18). Quality validation results shall be logged and retained as part of the dataset metadata.

> **Note:** While Great Expectations is the approved validation framework, consistent measurement of quality metrics across all 25 AI/ML projects has not yet been achieved. Teams are required to implement quality gates per their project Data Quality Plan; however, enforcement and reporting standardization is a priority for H2 2025.

### 3.3. Data Labeling Standards

Data annotation and labeling shall be performed in accordance with the following requirements:

1. **Tooling:** All annotation activities shall use the approved annotation platform (currently Label Studio 1.11, deployed on-premises).
2. **Annotator Qualification:** Annotators shall be qualified for the specific task and hold appropriate security clearances for the data classification level.
3. **Annotation Guidelines:** Written annotation guidelines shall be maintained for each labeling task and version-controlled.
4. **Inter-Annotator Agreement:** For subjective labeling tasks, inter-annotator agreement metrics shall be computed and documented.

### 3.4. Data Bias Assessment

A bias assessment shall be conducted for all training datasets used in production AI systems. The assessment shall evaluate:

- Demographic representation and potential underrepresentation of relevant subgroups.
- Geographic and temporal biases.
- Label bias introduced through annotation processes.
- Selection bias in data sourcing.
- Measurement bias from sensor or collection methodology.

Bias assessment results shall be documented in the AI System Risk Assessment (per HBIT-POL-AI-001) and reviewed by the AI Ethics & Compliance Lead (Noa Levine) prior to production deployment approval.

### 3.5. Synthetic Data Governance

The use of synthetic data in AI systems is increasing across the Company. Synthetic data shall be governed as follows:

1. Synthetic data shall be clearly labeled and segregated from real-world data in all storage and pipeline systems.
2. The generation methodology, parameters, and source models used to produce synthetic data shall be documented.
3. Synthetic data shall not be used as a sole substitute for real-world validation data without explicit risk acceptance by the project Data Owner and the AI Governance Board.

> **Gap Acknowledgment:** A formal Synthetic Data Governance Framework is under development and is expected to be published as HBIT-STD-AI-009 by Q1 2026. Until that standard is issued, teams shall adhere to the principles stated above and consult the Head of MLOps & AI Platform (Oren Tal) for guidance on synthetic data usage.

---

## 4. Data Lineage and Traceability

### 4.1. Lineage Requirements

Full data lineage shall be maintained for all AI systems, enabling traceability from raw source data through all transformations to the final training, validation, and test datasets. Lineage records shall include:

- Source dataset identifiers and provenance.
- All transformations, filters, augmentations, and preprocessing steps applied.
- Pipeline execution identifiers (Apache Airflow 2.7.3 DAG run IDs).
- Personnel or automated processes responsible for each transformation.
- Timestamps for all operations.

Lineage information shall be stored in the dataset metadata registry and linked to the corresponding model version in the model registry.

### 4.2. Version Control for Datasets

All datasets used in model training shall be version-controlled using the approved data version control tooling (currently DVC 3.30).

- Each dataset version shall have a unique identifier.
- Changes to datasets shall be committed with descriptive messages documenting the nature and rationale for the change.
- Dataset versions shall be linked to the model versions trained on them.

> **Known Issue:** DVC adoption is not uniform across all teams. Several legacy projects and some research teams continue to use ad-hoc storage on shared network drives for dataset management. A migration plan is in effect (see HBIT-PLAN-MLOPS-004), with a target of full DVC adoption across all active projects by Q4 2025. Until migration is complete, teams using ad-hoc storage shall maintain manual dataset version logs and notify the MLOps team of all dataset changes.

### 4.3. Data Transformation Documentation

All data transformation pipelines shall be documented and maintained as code in the approved source control system (GitLab 16.8). Pipeline definitions managed in Apache Airflow shall be version-controlled and subject to code review prior to deployment to production.

---

## 5. Data Privacy

### 5.1. Personal Data in AI Systems

AI systems that process personal data shall comply with all applicable data protection legislation, including:

- **EU General Data Protection Regulation (GDPR):** For systems processing personal data of EU residents, including Hibit's European subsidiary operations.
- **Israeli Privacy Protection Law 5741-1981** and associated regulations: For systems processing personal data of Israeli residents.

The processing of personal data for AI purposes requires a documented legal basis under the applicable law. The Data Protection Officer (Michal Katz) shall be consulted prior to the use of personal data in any AI training dataset.

### 5.2. Facial Recognition Data

AI systems that process facial recognition data or biometric data (including SHIELD v2.0) shall comply with all applicable laws governing biometric data processing.

Systems processing facial recognition data shall implement appropriate technical and organizational safeguards, including access controls, encryption, and purpose limitation. The collection and use of facial data shall be limited to the minimum necessary for the stated operational purpose.

> **Note:** Specific operational guidelines for facial recognition data handling in AI training contexts are to be developed as a supplement to this policy. Until such guidelines are issued, teams shall comply with applicable law and consult both the DPO and the AI Ethics & Compliance Lead on a case-by-case basis.

### 5.3. Data Minimization for AI

AI systems shall adhere to the principle of data minimization. Training datasets shall contain only the data necessary and proportionate to achieve the defined model objectives. Specifically:

- Personal data shall not be included in training datasets where anonymized or synthetic alternatives can achieve equivalent model performance.
- Data fields not required for the model's purpose shall be removed or masked prior to ingestion into the training pipeline.
- Periodic reviews of training data scope shall be conducted to identify opportunities for further minimization.

### 5.4. Data Subject Rights in AI Context

Where AI systems process personal data, Hibit shall ensure that data subject rights can be exercised, including:

- **Right of Access:** Data subjects may request information about whether their personal data has been used in AI training.
- **Right to Rectification:** Inaccurate personal data identified in training datasets shall be corrected or removed.
- **Right to Erasure:** Upon valid request, personal data shall be removed from active training datasets. Where removal from a trained model is technically infeasible, the system shall be documented in the data subject rights exception register and the model shall be scheduled for retraining.
- **Right to Object to Automated Decision-Making:** Where AI systems make or support decisions with significant effects on individuals, data subjects shall have the right to request human review.

All data subject requests relating to AI systems shall be routed through the DPO's office.

### 5.5. Privacy Impact Assessments for AI

A Data Protection Impact Assessment (DPIA) shall be conducted for any AI system that:

- Processes personal data at scale.
- Involves automated decision-making with legal or similarly significant effects.
- Processes special categories of personal data (biometric, health, ethnic origin).
- Combines personal data from multiple sources in novel ways.

The DPIA shall be conducted in accordance with HBIT-PROC-PRI-003 (DPIA Procedure) and shall incorporate AI-specific risk factors, including risks of re-identification from model outputs, inference attacks, and membership inference attacks.

> **Note:** A standardized AI-specific DPIA template is referenced in HBIT-PROC-PRI-003 Annex C. Teams should contact the DPO's office to obtain the current version.

---

## 6. Data Security

### 6.1. Encryption Requirements

All AI data shall be encrypted in accordance with the following minimum standards:

| Data State | Minimum Standard | Notes |
|---|---|---|
| **At Rest** | AES-256 | Applies to all storage (MinIO, PostgreSQL, local storage, cloud storage). Full-disk encryption on all servers hosting AI data. |
| **In Transit** | TLS 1.3 | All data transfers between systems, including intra-datacenter transfers and Kafka streams. |
| **In Processing** | Per classification | Top Secret and Secret data: hardware security modules (HSMs) for key management. Confidential and below: software-based key management with approved key vault. |

Cloud-hosted data (AWS S3, Azure Blob Storage) shall use provider-managed encryption with customer-managed keys (CMK) stored in the Hibit key management infrastructure. Unclassified data in cloud environments shall use, at minimum, server-side encryption with provider-managed keys.

### 6.2. Access Controls for Training Data

Access to AI training data shall be governed by the principle of least privilege. Specific requirements:

1. **Role-Based Access Control (RBAC):** Access to datasets shall be granted based on project assignment and role. Access shall be reviewed quarterly.
2. **Classification-Based Segregation:** Access permissions shall enforce classification level boundaries. Personnel shall not be granted access to data above their clearance level.
3. **Service Account Controls:** Automated pipeline service accounts (Airflow, Kafka) shall have scoped permissions limited to the datasets required for their designated pipelines.
4. **Access Logging:** All access to training datasets classified Confidential and above shall be logged with user identity, timestamp, dataset identifier, and action performed. Logs shall be retained for a minimum of three years.
5. **Multi-Factor Authentication:** Access to systems containing Secret or Top Secret training data shall require multi-factor authentication.

### 6.3. Data Segregation by Classification Level

Training data of different classification levels shall be physically or logically segregated:

- **Top Secret** data shall reside on air-gapped systems with no network connectivity to lower classification environments.
- **Secret** data shall reside in classified network enclaves with controlled interfaces to lower classification networks. No bi-directional data flow to unclassified environments without formal review and downgrade approval.
- **Confidential** and **Internal** data may coexist on the same network infrastructure with logical segregation (separate MinIO buckets, separate PostgreSQL schemas, separate Kafka topics) and appropriate access controls.
- **Unclassified** data designated for cloud processing may reside in authorized cloud environments (AWS eu-west-1, Azure) with encryption and access controls as specified in this policy.

### 6.4. Cross-Border Data Transfer Restrictions

The transfer of AI data across national borders shall comply with all applicable export control and data protection regulations.

1. **Classified Data:** No classified data (Secret or above) shall be transferred outside of Israel without explicit written authorization from the Israeli MOD DSDE (Directorate of Security of the Defense Establishment) and, where applicable, the originating government's transfer authority.
2. **ITAR/EAR Controlled Data:** Transfer of ITAR- or EAR-controlled data shall comply with applicable export licenses or exemptions. The Export Compliance Office shall approve all transfers.
3. **Personal Data (GDPR):** Transfer of personal data to countries outside the EEA shall be conducted only where an adequate legal mechanism is in place (Standard Contractual Clauses, adequacy decision, or applicable derogation).
4. **Cloud Environments:** Data stored in cloud environments shall reside in the designated regions (AWS eu-west-1 for EU-associated data). Region-locking configurations shall be enforced through infrastructure-as-code policies.

> **Note:** The current cross-border transfer procedures were designed primarily for traditional data transfers. Specific guidance for cloud-native scenarios (e.g., cloud provider cross-region replication, CDN caching, cloud-based model inference with data residency requirements) is under development and will be published as an addendum to this policy.

---

## 7. Data Retention and Disposal

### 7.1. Retention Periods for Training Data

Training data and associated artifacts shall be retained in accordance with the following minimum periods, or longer where required by contract, regulation, or legal hold.

| Data Category | Minimum Retention Period | Rationale |
|---|---|---|
| Training data for production systems | Life of system + 5 years | Auditability, model reproducibility, regulatory compliance |
| Validation and test data | Life of system + 5 years | Model evaluation reproducibility |
| Annotation and label data | Life of system + 3 years | Labeling audit trail |
| Data quality reports | 7 years from generation | Compliance documentation |
| Data lineage records | Life of system + 5 years | Traceability |
| Government-furnished data | Per contract terms | Contractual obligation |

> **Note:** Retention periods for certain AI data categories -- including synthetic data, feature engineering artifacts, and pipeline intermediate outputs -- have not yet been formally defined. Until specific retention schedules are established, such data shall be retained for a minimum of three years from last use or in accordance with the applicable project data management plan, whichever is longer.

### 7.2. Model Decommissioning Data Requirements

When an AI system is decommissioned, the following data-related actions shall be completed:

1. Final model version and associated training/validation/test datasets shall be archived in accordance with the applicable retention period.
2. Documentation of model performance, known issues, and data dependencies shall be archived.
3. Access to decommissioned model data shall be restricted to authorized personnel only.
4. A decommissioning record shall be filed with the AI Governance Board.

### 7.3. Secure Disposal Procedures

Data disposal shall be conducted in accordance with HBIT-PROC-SEC-022 (Secure Data Disposal Procedure). For AI data specifically:

- Classified training data shall be disposed of using approved sanitization methods (degaussing, cryptographic erasure, or physical destruction) appropriate to the classification level.
- Personal data shall be disposed of in compliance with applicable data protection law, and disposal shall be documented.
- Cloud-hosted data shall be deleted using provider-certified deletion mechanisms, and cryptographic key destruction shall be performed for CMK-encrypted data.

---

## 8. Third-Party Data

### 8.1. External Data Sourcing Approval

The acquisition of data from external sources for use in AI systems requires approval through the following process:

1. The requesting team shall submit a Data Sourcing Request (HBIT-FORM-AI-011) to the Head of MLOps & AI Platform.
2. The request shall document the data source, intended use, classification implications, and any licensing or contractual terms.
3. Legal review is required for all commercial data acquisitions and for any data that may contain personal data.
4. Export control screening is required where the data source is of foreign origin or the data may contain controlled technical information.

### 8.2. Open-Source Data Usage

Open-source datasets (e.g., publicly available benchmark datasets, open government data, academic datasets) may be used in AI development subject to the following:

1. The dataset license shall be reviewed and documented. Datasets with licenses incompatible with Hibit's intended use shall not be ingested.
2. The dataset shall be assessed for quality and suitability per Section 3.2.
3. Open-source datasets shall be clearly tagged in the dataset registry to distinguish them from proprietary or government-furnished data.

### 8.3. Commercial Data Provider Governance

Engagements with commercial data providers shall be governed by a Data Processing Agreement or Data License Agreement reviewed and approved by the Legal Department. Agreements shall address:

- Permitted use of the data, including AI training.
- Data quality warranties.
- Intellectual property rights in derived models.
- Compliance with applicable data protection law.

### 8.4. Data Sharing Agreements

The sharing of Hibit AI data with external parties (customers, partners, subcontractors) shall be governed by a written data sharing agreement that specifies permitted uses, security requirements, and return or destruction obligations. Sharing of classified data additionally requires government authorization per Section 6.4.

---

## 9. Data Quality Management

### 9.1. Quality Metrics and Standards

Each AI project shall define data quality metrics appropriate to its operational context. At minimum, the following metrics shall be tracked:

- **Completeness:** Percentage of records with all required fields populated.
- **Label Accuracy:** Percentage of labels verified as correct (target: 95% minimum for production systems).
- **Freshness:** Age of the most recent data in the training set relative to the operational deployment date.
- **Duplication Rate:** Percentage of duplicate records in the dataset.
- **Class Balance:** Distribution of classes or categories relative to the target distribution.

Quality metrics shall be computed and recorded as part of the data pipeline execution using the approved quality validation tooling (Great Expectations 0.18).

### 9.2. Monitoring and Alerting

Automated data quality monitoring shall be implemented for all production AI data pipelines. Quality checks shall execute as part of the Apache Airflow pipeline orchestration, with failures triggering alerts to the responsible data engineering team.

Data drift monitoring shall be implemented for production inference pipelines to detect significant changes in input data distributions that may degrade model performance.

### 9.3. Remediation Procedures

When data quality issues are identified:

1. The affected pipeline shall be halted pending investigation.
2. The root cause shall be documented in the project issue tracker.
3. Corrective actions shall be implemented, tested, and validated before the pipeline is restarted.
4. If the quality issue affects a production model, the model owner shall be notified and a risk assessment shall be conducted to determine whether model retraining or rollback is required.

---

## 10. Roles and Responsibilities

| Role | Responsibility |
|---|---|
| **VP AI & Innovation** (Dr. Yael Shapira) | Policy owner. Strategic oversight of AI data governance. Escalation point for cross-functional data governance issues. |
| **Data Protection Officer** (Michal Katz) | Oversight of personal data processing in AI systems. DPIA review and approval. Data subject rights coordination. Regulatory liaison for privacy matters. |
| **Head of MLOps & AI Platform** (Oren Tal) | Operational governance of AI data infrastructure (MinIO, DVC, Airflow, Kafka). Data pipeline standards and tooling. DVC adoption enforcement. |
| **Head of Data Science, Aerospace** (Dr. Michael Stern) | Training data quality and suitability for aerospace AI systems. Bias assessment oversight for aerospace domain. |
| **ML Engineer Lead** (Lior Ben-David) | Implementation of data lineage, version control, and quality validation in ML pipelines. Technical compliance with this policy. |
| **AI Ethics & Compliance Lead** (Noa Levine) | Bias assessment review. Ethical data sourcing oversight. Coordination with HBIT-POL-AI-002 requirements. |
| **CISO** (Rachel Goldberg) | Data security controls, encryption standards, access control enforcement, and incident response for AI data breaches. |
| **Project Data Owners** | Classification determination for project datasets. Approval of data sourcing requests. Accountability for data quality within their project scope. |
| **All AI/ML Personnel** | Compliance with this policy. Reporting of data quality issues, security incidents, and potential policy violations. |

---

## 11. Compliance and Audit

### 11.1. Internal Audit

The AI data governance posture shall be subject to annual internal audit, conducted by the Internal Audit Department in coordination with the DPO and the CISO. The audit shall assess:

- Compliance with data classification and handling requirements.
- Completeness and accuracy of data lineage records.
- Effectiveness of access controls and encryption implementation.
- Status of DVC adoption and data version control practices.
- Compliance with data quality requirements.
- Adequacy of privacy impact assessments.

### 11.2. External Audit and Regulatory Compliance

Hibit shall cooperate with external audits required by government customers, regulatory authorities, or certification bodies. AI data governance controls shall be maintained in a state of readiness for audit at all times.

Compliance with GDPR, the Israeli Privacy Protection Law, ITAR/EAR, and applicable defense security regulations shall be monitored on an ongoing basis by the responsible functional owners (DPO, Export Compliance Office, Security Department).

### 11.3. Non-Compliance

Violations of this policy may result in disciplinary action up to and including termination of employment or contract. Violations involving classified data or export-controlled information may additionally be subject to criminal penalties under applicable law.

Personnel who identify potential violations shall report them through the established reporting channels (line management, DPO, CISO, or the Hibit Ethics Hotline) without fear of retaliation.

---

## 12. Related Documents

| Document ID | Title |
|---|---|
| HBIT-POL-AI-001 | AI Governance Framework Policy |
| HBIT-POL-AI-002 | AI Ethics and Responsible Use Policy |
| HBIT-POL-SEC-012 | Information Security Policy |
| HBIT-POL-SEC-018 | Data Classification and Handling Policy |
| HBIT-POL-PRI-001 | Corporate Privacy Policy |
| HBIT-PROC-PRI-003 | Data Protection Impact Assessment (DPIA) Procedure |
| HBIT-PROC-SEC-022 | Secure Data Disposal Procedure |
| HBIT-STD-AI-005 | AI Model Lifecycle Standard |
| HBIT-STD-AI-009 | Synthetic Data Governance Standard (Draft -- Target Q1 2026) |
| HBIT-PLAN-MLOPS-004 | DVC Migration Plan |
| HBIT-FORM-AI-011 | Data Sourcing Request Form |

---

## 13. Revision History

| Version | Date | Author | Description |
|---|---|---|---|
| 0.1 | 2024-03-15 | Dr. Yael Shapira | Initial draft. |
| 0.5 | 2024-05-20 | Dr. Yael Shapira, Michal Katz | Incorporated DPO review. Added Sections 5 and 7. |
| 0.8 | 2024-07-10 | Dr. Yael Shapira, Oren Tal | Added data technology stack references. Incorporated MLOps team feedback. |
| 1.0 | 2024-09-01 | Dr. Yael Shapira | First approved release. Approved by Col. (Ret.) Eyal Navon. |
| 1.1 | 2025-02-15 | Dr. Yael Shapira, Noa Levine | Added Section 3.4 (Bias Assessment). Updated Section 2.3 (AI Data Categories). Minor corrections throughout. |
| 1.2 | 2025-07-20 | Dr. Yael Shapira, Michal Katz | Updated for ISO 42001 alignment. Added Section 3.5 (Synthetic Data Governance). Expanded cross-border transfer guidance. Updated technology versions. Documented known gaps per internal audit findings. |

---

*HBIT-POL-AI-003 v1.2 -- Classification: Internal - Restricted -- Hibit Defense Systems Ltd.*

*This document shall be reviewed no later than August 1, 2026, or earlier if triggered by a material change in regulatory requirements, organizational structure, or AI data governance posture.*

---

**Classification: Internal - Restricted**
