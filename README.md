🧬 OncoNode-Portal
Clinical Data Ingestion Gateway for Oncology Research

🔗 Launch Live Portal
🚀 Overview
OncoNode-Portal is a React-based Data Submission Tool designed to bridge the gap between clinical data collection and bioinformatics pipelines. It provides a structured interface for researchers to submit gene expression matrices, metadata, and clinical labels directly to a centralized cloud database.

This portal acts as the frontend ingestion layer for my [Lung Cancer Prediction Pipeline], ensuring that data is properly formatted and stored before undergoing machine learning analysis.

🛠️ Technical Stack
Frontend: React.js (Hooks & Functional Components)

Database: Firebase Firestore (NoSQL) for real-time data persistence.

Deployment: GitHub Pages with automated gh-pages build workflow.

📥 Data Streams Managed
The portal handles three primary datasets essential for cancer classification:

Expression Data: Quantitative levels of gene expression across samples.

Clinical Metadata: Supporting factors such as smoking status for correlation studies.

Ground Truth Labels: Definitive classifications (Cancer vs. Normal) used for supervised learning.

🔄 Integrated Workflow
Collection: Clinical data is uploaded via the OncoNode-Portal.

Storage: Data is securely pushed to Cloud Firestore.

📂 Local Development
Clone the repository:

Bash
git clone https://github.com/syedzaheer914/OncoNode-Portal.git
Install dependencies:

Bash
npm install
Run the application:

Bash
npm start
Developed as part of an undergraduate specialization in Bioinformatics and Clinical Genomics at SRIHER.
