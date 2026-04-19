import React, { useState, useEffect, useMemo } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, query, onSnapshot, orderBy, serverTimestamp } from 'firebase/firestore';
import { Mail, UploadCloud, Cpu, User, LogOut, Info, Home, MessageSquare, AlertTriangle, Loader, CheckCircle, Lock } from 'lucide-react';

// Import the config
import { __app_id, __firebase_config } from './config';

// Use the imported config
const appId = __app_id;
const firebaseConfig = JSON.parse(__firebase_config);

// --- Firebase Initialization ---
let app;
let db;
let auth;
if (firebaseConfig) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
} else {
    console.error("Firebase configuration is missing. Data persistence will not work.");
}

// --- Utility Components ---

/** General purpose button with accent styling */
const AccentButton = ({ children, onClick, disabled = false, icon: Icon, className = "", type = "button" }) => (
    <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`flex items-center justify-center space-x-2 px-6 py-3 font-semibold text-black rounded-xl transition-all duration-200 shadow-lg
            ${disabled
                ? 'bg-gray-500 cursor-not-allowed opacity-70'
                : 'bg-[#4ecca3] hover:bg-[#3fa98c] active:scale-[0.98] focus:ring-4 focus:ring-[#4ecca3] focus:ring-opacity-50'
            }
            ${className}`}
    >
        {Icon && <Icon className="w-5 h-5" />}
        <span>{children}</span>
    </button>
);

/** Display box for messages (e.g., success, error) */
const MessageBox = ({ children, type = 'info' }) => {
    let style = "bg-blue-900 text-blue-200 border-blue-700";
    let Icon = Info;
    if (type === 'error') { style = "bg-red-900 text-red-200 border-red-700"; Icon = AlertTriangle; }
    if (type === 'success') { style = "bg-green-900 text-green-200 border-green-700"; Icon = CheckCircle; }

    return (
        <div className={`flex items-start p-4 mb-4 rounded-xl border ${style}`}>
            <Icon className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
            <p className="text-sm">{children}</p>
        </div>
    );
};

// --- NEW: Authentication View Component ---

const AuthView = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
        } catch (err) {
            setError(err.message.replace("Firebase: ", ""));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-[#2b2d42] p-8 rounded-2xl shadow-2xl border border-gray-700 mt-10">
            <div className="flex justify-center mb-4">
                <Lock className="w-12 h-12 text-[#4ecca3]" />
            </div>
            <h2 className="text-3xl font-bold text-white text-center mb-6">
                {isLogin ? "Researcher Login" : "Create Account"}
            </h2>
            
            {error && <MessageBox type="error">{error}</MessageBox>}
            
            <form onSubmit={handleAuth} className="space-y-4">
                <div>
                    <label className="block text-sm text-gray-400 mb-1">Email Address</label>
                    <input 
                        type="email" 
                        required 
                        className="w-full p-3 bg-gray-700 rounded-lg text-white border border-gray-600 outline-none focus:border-[#4ecca3]" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-400 mb-1">Password</label>
                    <input 
                        type="password" 
                        required 
                        className="w-full p-3 bg-gray-700 rounded-lg text-white border border-gray-600 outline-none focus:border-[#4ecca3]" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <AccentButton type="submit" className="w-full" disabled={loading}>
                    {loading ? <Loader className="animate-spin mx-auto" /> : (isLogin ? "Sign In" : "Register")}
                </AccentButton>
            </form>
            
            <button 
                onClick={() => setIsLogin(!isLogin)} 
                className="w-full mt-6 text-sm text-gray-400 hover:text-[#4ecca3] transition"
            >
                {isLogin ? "Don't have an account? Register here" : "Already have an account? Log in"}
            </button>
        </div>
    );
};

// --- View Components ---

const IntroSection = () => (
    <div className="space-y-6">
        <h1 className="text-5xl font-extrabold text-[#4ecca3]">Precision Oncology through Gene Expression</h1>
        <p className="text-xl text-gray-300">
            Welcome to the cutting edge of non-invasive diagnostics. Our application uses state-of-the-art machine learning models, specifically Random Forest Classification, to analyze your gene expression data and predict lung cancer status.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <FeatureCard title="Advanced Feature Selection" description="We use F-classification to select the 100 most informative genes, ensuring rapid and accurate model training." Icon={Cpu} />
            <FeatureCard title="Smoking Status Integration" description="Optionally include smoking history to refine contextual risk assessment and stratified analysis." Icon={MessageSquare} />
            <FeatureCard title="Real-Time Submission" description="Upload your data securely and receive a comprehensive diagnostic report directly via email." Icon={Mail} />
        </div>
    </div>
);

const AboutSection = () => (
    <div className="space-y-6">
        <h2 className="text-3xl font-bold text-white border-b border-gray-700 pb-2">Our Mission</h2>
        <p className="text-lg text-gray-400">
            The Lung Cancer Gene Expression Classifier was developed to provide researchers and clinicians with a robust tool for hypothesis generation and initial risk stratification. By integrating complex gene expression data with clinical covariates (like smoking status), we aim to uncover powerful biomarkers and improve diagnostic speed. Our methodology emphasizes transparency, reproducibility, and high predictive power, as demonstrated by strong AUC scores and classification metrics.
        </p>
        <h3 className="text-2xl font-bold text-white pt-4">The Model: Random Forest</h3>
        <p className="text-gray-400">
            The core engine is a Random Forest model, chosen for its resilience against overfitting, ability to handle high-dimensional gene data, and inherent feature importance ranking. This allows us not only to classify samples but also to identify the top 20 genes most critical to the prediction.
        </p>
    </div>
);

const ContactSection = () => (
    <div className="space-y-6">
        <h2 className="text-3xl font-bold text-white border-b border-gray-700 pb-2">Get in Touch</h2>
        <p className="text-lg text-gray-400">
            We are always open to collaborations, research inquiries, and feedback on improving the model.
        </p>
        <div className="space-y-3">
            <ContactDetail Icon={Mail} label="Email Support" value="syedzaheershah914@gmail.com" />
            <ContactDetail Icon={Info} label="Business Address" value="Bioinformatics Dept, First Floor, No.1 Ramachandra Nagar, Porur, Chennai, Tamil Nadu 600116." />
            <ContactDetail Icon={User} label="Developer Contact" value="@s_its_syed & @10leo.x9x5" />
        </div>
    </div>
);

const FeatureCard = ({ title, description, Icon }) => (
    <div className="p-6 bg-[#2b2d42] rounded-xl shadow-2xl border border-gray-700 transition duration-300 hover:border-[#4ecca3]">
        <Icon className="w-8 h-8 text-[#4ecca3] mb-3" />
        <h4 className="text-xl font-bold text-white mb-2">{title}</h4>
        <p className="text-sm text-gray-400">{description}</p>
    </div>
);

const ContactDetail = ({ Icon, label, value }) => (
    <div className="flex items-center space-x-4 p-3 bg-[#2b2d42] rounded-lg">
        <Icon className="w-5 h-5 text-[#4ecca3] flex-shrink-0" />
        <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-white font-medium">{value}</p>
        </div>
    </div>
);

// --- Main Application Components ---

const FileUploader = ({ title, requirement, setFile, file, required = false }) => {
    const fileId = title.toLowerCase().replace(/\s/g, '-');
    const isUploaded = !!file;

    return (
        <div className="bg-[#2b2d42] p-5 rounded-xl shadow-inner border border-gray-700">
            <label htmlFor={fileId} className="cursor-pointer">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <UploadCloud className={`w-6 h-6 ${isUploaded ? 'text-[#4ecca3]' : 'text-gray-500'}`} />
                        <h4 className="text-white font-semibold">{title} {required && <span className="text-red-500">*</span>}</h4>
                    </div>
                    {isUploaded ? (
                        <div className="text-[#4ecca3] flex items-center text-sm">
                            <CheckCircle className="w-4 h-4 mr-1" /> Ready
                        </div>
                    ) : (
                        <span className="text-sm text-gray-500 hover:text-gray-300 transition duration-150">
                            Click to Upload
                        </span>
                    )}
                </div>
            </label>
            <p className="text-xs text-gray-500 mt-1 mb-3">{requirement}</p>

            <input
                id={fileId}
                type="file"
                accept=".csv,.tsv,.txt"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
            />

            {isUploaded && (
                <div className="mt-3 p-3 bg-gray-800 rounded-lg text-xs text-gray-300 break-words">
                    File: <span className="text-white">{file.name}</span> ({(file.size / 1024).toFixed(2)} KB)
                </div>
            )}
        </div>
    );
};

const SubmissionForm = ({ userId }) => {
    const [exprFile, setExprFile] = useState(null);
    const [labelFile, setLabelFile] = useState(null);
    const [smokingFile, setSmokingFile] = useState(null);
    const [userEmail, setUserEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState(null);

    const isFormValid = exprFile && labelFile && userEmail && !isSubmitting;

    const readFileContent = (file) => {
        return new Promise((resolve, reject) => {
            if (!file) return resolve(null);
            const reader = new FileReader();
            reader.onload = (event) => {
                const content = event.target.result;
                const lines = content.split('\n').slice(0, 5).join('\n');
                resolve(lines);
            };
            reader.onerror = (error) => reject(error);
            reader.readAsText(file);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid || !db || !userId) return;

        setIsSubmitting(true);
        setMessage(null);

        try {
            const exprPreview = await readFileContent(exprFile);
            const labelPreview = await readFileContent(labelFile);
            const smokingPreview = await readFileContent(smokingFile);

            const submissionRef = doc(collection(db, `artifacts/${appId}/users/${userId}/submissions`));

            const submissionData = {
                user_id: userId,
                user_email: userEmail,
                timestamp: serverTimestamp(),
                status: 'Pending',
                expression_matrix: {
                    filename: exprFile.name,
                    size: exprFile.size,
                    preview_lines: exprPreview,
                },
                labels: labelFile ? {
                    filename: labelFile.name,
                    size: labelFile.size,
                    preview_lines: labelPreview,
                } : null,
                smoking_status: smokingFile ? {
                    filename: smokingFile.name,
                    size: smokingFile.size,
                    preview_lines: smokingPreview,
                } : null,
            };

            await setDoc(submissionRef, submissionData);

            setMessage({
                type: 'success',
                text: 'Submission successful! Your data has been queued for analysis.'
            });

            setExprFile(null);
            setLabelFile(null);
            setSmokingFile(null);

        } catch (error) {
            console.error("Error submitting data:", error);
            setMessage({ type: 'error', text: 'An error occurred during submission.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-[#1e1e2f] p-8 rounded-2xl shadow-2xl border border-gray-700 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-3">Data Submission Portal</h2>
            {message && <MessageBox type={message.type}>{message.text}</MessageBox>}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <FileUploader title="Gene Expression Matrix" requirement="Upload your CSV/TSV file." file={exprFile} setFile={setExprFile} required={true} />
                    <FileUploader title="Sample Labels (Tumor/Normal)" requirement="Required: CSV with SampleID and Label columns." file={labelFile} setFile={setLabelFile} required={true} />
                    <FileUploader title="Smoking Status Data" requirement="Optional: CSV file containing SampleID and smoking status." file={smokingFile} setFile={setSmokingFile} />
                </div>
                <div className="pt-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email for Results <span className="text-red-500">*</span></label>
                    <input 
                        type="email" 
                        value={userEmail} 
                        onChange={(e) => setUserEmail(e.target.value)} 
                        placeholder="your.professional.email@lab.com" 
                        required 
                        className="w-full px-4 py-3 bg-gray-700 text-white rounded-xl border border-gray-600 focus:border-[#4ecca3] outline-none" 
                    />
                </div>
                <div className="pt-4">
                    <AccentButton type="submit" disabled={!isFormValid}>
                        {isSubmitting ? <><Loader className="w-5 h-5 animate-spin mr-2" /> Processing...</> : <><Cpu className="w-5 h-5 mr-2" /> Submit Data for Analysis</>}
                    </AccentButton>
                </div>
            </form>
        </div>
    );
};

const SubmissionHistory = ({ userId }) => {
    const [submissions, setSubmissions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!db || !userId || userId === 'loading') return;
        const q = query(collection(db, `artifacts/${appId}/users/${userId}/submissions`), orderBy("timestamp", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setSubmissions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, [userId]);

    const getStatusColor = (status) => {
        if (status === 'Complete') return 'bg-green-600';
        if (status === 'Processing') return 'bg-yellow-600';
        return 'bg-blue-600';
    };

    if (isLoading) return <div className="text-center py-10 text-gray-400"><Loader className="animate-spin inline mr-2" /> Loading History...</div>;

    return (
        <div className="mt-10 bg-[#2b2d42] p-8 rounded-2xl shadow-2xl border border-gray-700 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-3">Submission History</h3>
            {submissions.length === 0 ? <MessageBox>No previous analysis found.</MessageBox> : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-700">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Date</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Expression File</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {submissions.map((s) => (
                                <tr key={s.id} className="hover:bg-gray-800 transition">
                                    <td className="px-4 py-4 text-sm text-gray-400">{s.timestamp?.toDate().toLocaleString() || 'Pending...'}</td>
                                    <td className="px-4 py-4 text-sm text-white">{s.expression_matrix?.filename}</td>
                                    <td className="px-4 py-4"><span className={`px-2 py-1 text-xs font-semibold rounded-full text-white ${getStatusColor(s.status)}`}>{s.status}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

/** Main App component */
const App = () => {
    const [view, setView] = useState('home');
    const [user, setUser] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);

    useEffect(() => {
        if (!auth) {
            setIsAuthReady(true);
            return;
        }
        return onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setIsAuthReady(true);
        });
    }, []);

    const userId = useMemo(() => user?.uid || (isAuthReady ? 'guest' : 'loading'), [user, isAuthReady]);

    const handleSignOut = async () => {
        if (auth) {
            await signOut(auth);
            setUser(null);
            setView('home');
        }
    };

    const navItems = [
        { name: 'Introduction', view: 'home', icon: Home },
        { name: 'Data Submission', view: 'submission', icon: UploadCloud },
        { name: 'About the App', view: 'about', icon: Info },
        { name: 'Contact', view: 'contact', icon: MessageSquare },
    ];

    const renderContent = () => {
        if (!isAuthReady) return <div className="text-center py-20 text-[#4ecca3]"><Loader className="animate-spin inline mr-3" /> Initializing...</div>;

        // AUTH GATE: Redirect to login only for submission page
        if (view === 'submission' && !user) {
            return <AuthView />;
        }

        if (view === 'home') return <IntroSection />;
        if (view === 'about') return <AboutSection />;
        if (view === 'contact') return <ContactSection />;
        if (view === 'submission') {
            return (
                <div className="space-y-10">
                    <MessageBox type="info">Logged in as: <span className="text-white font-mono">{user.email}</span></MessageBox>
                    <SubmissionForm userId={userId} />
                    <SubmissionHistory userId={userId} />
                </div>
            );
        }
        return <IntroSection />;
    };

    return (
        <div className="min-h-screen bg-[#131521] font-sans">
            <header className="sticky top-0 z-10 bg-[#1e1e2f] shadow-lg border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
                    <div className="flex-shrink-0 text-2xl font-bold text-white flex items-center">
                        <Cpu className="w-6 h-6 text-[#4ecca3] mr-2" /> GeneClassify
                    </div>
                    <nav className="hidden md:flex space-x-4">
                        {navItems.map((item) => (
                            <button
                                key={item.view}
                                onClick={() => setView(item.view)}
                                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${view === item.view ? 'bg-[#4ecca3] text-black' : 'text-gray-300 hover:bg-gray-700'}`}
                            >
                                <item.icon className="w-4 h-4 mr-1.5 inline" /> {item.name}
                            </button>
                        ))}
                    </nav>
                    <div className="flex items-center">
                        {user ? (
                            <AccentButton onClick={handleSignOut} icon={LogOut} className="!px-3 !py-1 !text-sm">Sign Out</AccentButton>
                        ) : (
                            <button onClick={() => setView('submission')} className="text-[#4ecca3] font-semibold text-sm hover:underline">Researcher Login</button>
                        )}
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-12 px-4">
                <div className="p-8 bg-[#1e1e2f] rounded-3xl shadow-2xl min-h-[70vh]">
                    {renderContent()}
                </div>
            </main>

            <footer className="bg-[#131521] border-t border-gray-800 py-6 text-center text-gray-500 text-sm">
                &copy; 2026 GeneClassify. Authorized research personnel only.
            </footer>
        </div>
    );
};

export default App;