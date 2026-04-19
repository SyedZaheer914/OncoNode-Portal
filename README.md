# 🧬 OncoNode-Portal
**Clinical Data Ingestion Gateway for Oncology Research**

## 🔗 [Launch Live Portal](https://syedzaheer914.github.io/OncoNode-Portal/)

### 🚀 Overview
OncoNode-Portal is a React-based **Data Submission Tool** designed to streamline the collection of genomic and clinical data. It serves as a structured interface for researchers to submit gene expression matrices and patient metadata directly to a centralized cloud database.

This portal acts as the foundational "Data Layer," ensuring that oncology datasets are validated and stored in a standardized format for future computational analysis and machine learning workflows.

### 🛠️ Technical Stack
* **Frontend:** React.js (Hooks & Functional Components)
* **Database:** **Firebase Firestore** for real-time, scalable NoSQL data persistence.
* **Deployment:** GitHub Pages.

### 📥 Data Streams Managed
The portal is configured to capture and structure three primary clinical data types:
1. **Expression Data:** Quantitative levels of gene expression (Genes × Samples).
2. **Clinical Metadata:** Supporting factors such as **smoking status** for correlation studies.
3. **Ground Truth Labels:** Classifications (Cancer vs. Normal) intended for future model training.

### 🏗️ Project Architecture
The application follows a modern **Serverless Architecture**:
* **Data Validation:** Built to ensure inputs meet the required dimensions and formats before submission.
* **Cloud Persistence:** Utilizes Firebase to handle concurrent submissions without the need for a dedicated backend server.
* **Scalability:** Designed to support high-throughput genomic data ingestion for oncology research.



### 📂 How to Run Locally
1. **Clone the repository:**
   ```bash
   git clone https://github.com/syedzaheer914/OncoNode-Portal.git
   npm install
   npm start
Developed as part of an undergraduate specialization in Bioinformatics and Clinical Genomics at SRIHER.
