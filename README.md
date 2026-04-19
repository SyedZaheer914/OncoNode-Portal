# 🧬 OncoNode-Portal
**Clinical Data Ingestion Gateway for Oncology Research**

## 🔗 [Launch Live Portal](https://syedzaheer914.github.io/OncoNode-Portal/)

### 🚀 Overview
OncoNode-Portal is a React-based **Data Submission Tool** designed to bridge the gap between clinical data collection and bioinformatics analysis. It provides a structured interface for researchers to submit gene expression matrices, clinical metadata, and class labels directly to a centralized cloud database.

This portal acts as the frontend ingestion layer for my lung cancer classification pipeline, ensuring data is validated and stored before undergoing machine learning analysis.

### 🛠️ Technical Stack
* **Frontend:** React.js (Hooks & Functional Components)
* **Database:** **Firebase Firestore** for real-time data persistence.
* **Deployment:** GitHub Pages.

### 📥 Data Streams Managed
The portal handles three primary datasets essential for the downstream Random Forest classifier:
1. **Expression Data:** Quantitative levels of gene expression (Genes × Samples).
2. **Clinical Metadata:** Supporting factors such as **smoking status** for correlation studies.
3. **Ground Truth Labels:** Definitive classifications (Cancer vs. Normal) for supervised training.



### 🔄 Integrated Workflow
1. **Collection:** Researchers enter clinical data via the **OncoNode-Portal**.
2. **Storage:** Data is structured into NoSQL documents and pushed to **Cloud Firestore**.
3. **Analysis:** My secondary Python-based pipeline (Random Forest/ANOVA) fetches this data for biomarker discovery and diagnostic classification.

### 📂 How to Run Locally
1. Clone the repository:
   git clone [https://github.com/syedzaheer914/OncoNode-Portal.git](https://github.com/syedzaheer914/OncoNode-Portal.git)
2. Install dependencies:
   npm install
3. Start the application:
   npm start
Developed as part of an undergraduate specialization in Bioinformatics and Clinical Genomics at SRIHER.
