# ESG Scoring & Emissions Platform

🚀 **Live Deployment (AWS)**  
- **Environment:** Production  
- **URL:** https://YOUR-AWS-URL-HERE  

A full-stack ESG (Environmental, Social, Governance) scoring and emissions analysis platform designed for **company-level ESG screening, climate accounting, and risk assessment**.


A full-stack ESG (Environmental, Social, Governance) scoring and emissions analysis platform designed for **company-level ESG screening, climate accounting, and risk assessment**.

The system combines structured ESG questionnaires with automated scoring, greenhouse gas calculations, and weighted aggregation to produce **transparent, reproducible ESG scores** aligned with internationally recognized frameworks.

---

## Overview

This application enables companies to:

- Submit structured ESG data through a web interface
- Automatically calculate **Scope 1, Scope 2, and Scope 3 emissions**
- Generate ESG scores across **12 assessment sections**
- View historical submissions and results
- Export results for reporting and auditing (Excel)

The platform is designed for **internal assessment, screening, and comparative analysis**, with a strong emphasis on transparency, auditability, and consistency.

---

## Architecture

### 2.1 Technology Used

This application is built using a modern **full-stack JavaScript architecture** designed for scalability, security, and maintainability.

#### Frontend
- **React**
- Component-based UI with dynamic forms and conditional inputs
- State managed using React hooks
- API communication via **Axios**
- Supports ESG form submission, history views, and data export

#### Backend
- **Node.js + Express**
- RESTful API for authentication, ESG submissions, scoring, and history
- **JWT-based authentication** for secure, multi-tenant access
- Centralized ESG scoring engine

#### Database
- **MongoDB** with **Mongoose**
- Stores:
  - Company accounts
  - ESG submissions (raw inputs)
  - Calculated scores and emissions
  - Historical records linked to each company

#### ESG Scoring & Emissions Logic
- Custom backend scoring engine
- Independent scoring of Sections 1–12
- Scope 1, 2, and 3 emissions calculated programmatically
- Emissions aggregated into total **tCO₂e**
- Results stored alongside raw inputs for auditability

#### Containerization & Environment
- **Docker** for consistent development and deployment
- Environment variables used for configuration and secrets

---

### 2.2 System Structure

#### Frontend (React)
- Handles registration, login, ESG form submission, and history viewing
- Sends JSON requests to the backend
- Includes JWT in the `Authorization: Bearer` header for protected routes

#### Authentication Flow
- `/register` and `/login` routes issue signed JWTs
- Tokens represent the authenticated company
- Required for all ESG-related actions

#### JWT Middleware
- Verifies token validity
- Extracts `companyId`
- Attaches identity to `req.user`
- Enforces strict multi-tenant data isolation

#### ESG Routes
- `POST /esg-score`
- `GET /history`
- `DELETE /history/:id`
- Accessible only after authentication

#### Controllers
- Handle validation, ownership checks, and orchestration
- Coordinate between scoring logic and database operations

#### ESG Calculator (Scoring Engine)
- Scores Sections 1–12 independently
- Applies predefined weights
- Handles non-applicable sections
- Normalizes final score
- Assigns ESG grade

---

## Calculations

### 3.1 Standards and Methodology

#### Greenhouse Gas Accounting
The emissions calculator follows principles from the **Greenhouse Gas Protocol**, including:
- Scope 1, Scope 2, and Scope 3 categorization
- Standardized carbon accounting logic
- Emissions expressed in **tCO₂e**
- Emphasis on data quality and uncertainty awareness

#### ESG Risk Framework
The ESG scoring model is informed by the structure of the **European Investment Bank (EIB) Environmental and Social Standards**, covering environmental, social, governance, and climate-related risks.

---

### 3.2 ESG Assessment Structure

The framework adapts recognized standards into **12 structured assessment sections**:

1. Company Information  
2. Environmental & Social Risk Management  
3. Stakeholder Engagement & Disclosure  
4. Resource Efficiency & Pollution Prevention  
5. Biodiversity & Ecosystems  
6. Climate Change & Greenhouse Gas Emissions  
7. Land Acquisition & Involuntary Resettlement  
8. Indigenous Peoples, Gender & Vulnerable Groups  
9. Labour & Working Conditions  
10. Occupational Health, Safety & Security  
11. Cultural Heritage  
12. Financial Institutions & Financed Emissions  
13. Governance, Ethics & Cybersecurity  

Each section produces a **0–100 score** and may be marked **not applicable**.

---

## Final ESG Score Calculation

### Section Scoring
Each ESG section produces:
- A score between **0 and 100**
- A **not applicable** flag when the section does not apply

Non-applicable sections are excluded from the final calculation.

---

### Section Weighting

| ESG Section | Weight |
|------------|--------|
| Environmental & Social Risk Management | 8% |
| Stakeholder Engagement & Disclosure | 8% |
| Resource Efficiency & Pollution Prevention | 15% |
| Biodiversity & Ecosystems | 8% |
| **Climate Change & GHG Emissions** | **25%** |
| Land Acquisition & Involuntary Resettlement | 6% |
| Indigenous Peoples, Gender & Vulnerable Groups | 6% |
| Labour & Working Conditions | 8% |
| Occupational Health, Safety & Security | 6% |
| Cultural Heritage | 4% |
| Financial Institutions & Financed Emissions | 4% |
| Governance, Ethics & Cybersecurity | 8% |

---

### Weighted Aggregation

For each applicable section:
- Section score × section weight
- All weighted scores are summed
- Total is normalized by applicable weights

This ensures:
- Fair comparison across companies
- No penalty for non-applicable risks
- Greater influence from high-impact areas

---

### Final Score and Grade

The result is a final ESG score (**0–100**, rounded).

| Score | Grade |
|------|------|
| ≥ 85 | A |
| ≥ 70 | B |
| ≥ 55 | C |
| < 55 | High Risk |

---

## Output

For each submission, the platform provides:
- Section-level scores and breakdowns
- Final ESG score and grade
- Scope 1, 2, and 3 emissions (tCO₂e)
- Total emissions
- Historical comparison
- Exportable Excel results

---


