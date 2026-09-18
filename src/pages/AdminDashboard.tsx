import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, deleteDoc, doc } from "firebase/firestore";
import { 
  Upload, 
  Trash2, 
  LogOut, 
  Loader2, 
  Image as ImageIcon, 
  Settings, 
  Save, 
  Check, 
  AppWindow, 
  Store, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  Plus, 
  AlertCircle,
  ToggleLeft,
  ToggleRight,
  RefreshCw
} from "lucide-react";
import { useSettings } from "@/hooks/useSettings";
import { DEFAULT_MARKET_PRODUCE, MarketProduceItem, TraderContact } from "@/types/market";

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [images, setImages] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStep, setUploadStep] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { settings, updateSettings } = useSettings();
  const [formData, setFormData] = useState({
    apkUrl: "",
    phone: "",
    email: "",
    location: "",
    apps: "[]",
    tickerMessages: "[]",
    showSellerContacts: true,
    useAdminPhoneForSellers: false,
  });
  
  // App management state
  const [apps, setApps] = useState<any[]>([]);
  // Ticker management state
  const [tickerMessages, setTickerMessages] = useState<any[]>([]);
  // Market produce & sellers management state
  const [marketProduce, setMarketProduce] = useState<MarketProduceItem[]>(DEFAULT_MARKET_PRODUCE);
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Active navigation tab inside Admin Dashboard for clear management
  const [activeTab, setActiveTab] = useState<"market" | "general" | "gallery" | "apps" | "ticker">("market");

  useEffect(() => {
    if (!settings.loading) {
      setFormData({
        apkUrl: settings.apkUrl || "",
        phone: settings.phone || "",
        email: settings.email || "",
        location: settings.location || "",
        apps: settings.apps || "[]",
        tickerMessages: settings.tickerMessages || "[]",
        showSellerContacts: settings.showSellerContacts !== false,
        useAdminPhoneForSellers: Boolean(settings.useAdminPhoneForSellers),
      });
      
      try {
        if (settings.apps) {
          setApps(JSON.parse(settings.apps));
        }
        if (settings.tickerMessages) {
          setTickerMessages(JSON.parse(settings.tickerMessages));
        }
        if (settings.marketProduceJson) {
          const parsed = JSON.parse(settings.marketProduceJson);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setMarketProduce(parsed);
          }
        }
      } catch (e) {
        console.error("Failed to parse settings", e);
      }
    }
  }, [settings]);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/login");
      } else {
        setUser(currentUser);
      }
    });

    return () => unsubscribeAuth();
  }, [navigate]);

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "images"), orderBy("createdAt", "desc"));
    const unsubscribeData = onSnapshot(q, (snapshot) => {
      const fetchedImages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setImages(fetchedImages);
    });

    return () => unsubscribeData();
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "images", id));
      setConfirmDeleteId(null);
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("Failed to delete image");
    }
  };

  // Image upload with compression
  const resizeImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
          const maxDim = 1200;
          if (width > height && width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", 0.7));
        };
        img.onerror = (err) => reject(err);
      };
      reader.onerror = (err) => reject(err);
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setUploadError(null);
        setIsUploading(true);
        setUploadStep("Compressing photo...");
        const base64Image = await resizeImage(file);
        setUploadStep("Saving to database...");
        
        const uploadPromise = addDoc(collection(db, "images"), {
          imageUrl: base64Image,
          createdAt: serverTimestamp(),
        });
        
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error("Upload is taking longer than expected. Please check your internet connection and try again.")), 60000)
        );

        await Promise.race([uploadPromise, timeoutPromise]);
        setUploadStep(null);
      } catch (error: any) {
        console.error("Error uploading image: ", error);
        setUploadError(error?.message || "Failed to upload image.");
      } finally {
        setIsUploading(false);
        setUploadStep(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    }
  };

  // Seller & Market Produce Management Helpers
  const handleUpdateProductField = (prodIndex: number, field: keyof MarketProduceItem, value: any) => {
    const updated = [...marketProduce];
    updated[prodIndex] = { ...updated[prodIndex], [field]: value };
    setMarketProduce(updated);
  };

  const handleUpdateSellerField = (prodIndex: number, sellerIndex: number, field: keyof TraderContact, value: any) => {
    const updated = [...marketProduce];
    const sellers = [...updated[prodIndex].featuredSellers];
    sellers[sellerIndex] = { ...sellers[sellerIndex], [field]: value };
    updated[prodIndex] = { ...updated[prodIndex], featuredSellers: sellers };
    setMarketProduce(updated);
  };

  const handleAddSeller = (prodIndex: number) => {
    const updated = [...marketProduce];
    const newSeller: TraderContact = {
      name: "नयाँ बिक्रेता / कृषक",
      role: "स्थानीय कृषक",
      phone: formData.phone || "९८४८१२३४५६",
      location: "मुगु",
      isVerified: true,
    };
    updated[prodIndex] = {
      ...updated[prodIndex],
      featuredSellers: [...updated[prodIndex].featuredSellers, newSeller]
    };
    setMarketProduce(updated);
  };

  const handleRemoveSeller = (prodIndex: number, sellerIndex: number) => {
    const updated = [...marketProduce];
    const sellers = [...updated[prodIndex].featuredSellers];
    sellers.splice(sellerIndex, 1);
    updated[prodIndex] = { ...updated[prodIndex], featuredSellers: sellers };
    setMarketProduce(updated);
  };

  const handleResetMarketData = () => {
    if (confirm("के तपाईं बजार उत्पादन र बिक्रेताहरूको सूची सुरुवाती अवस्थामा फर्काउन चाहनुहुन्छ?")) {
      setMarketProduce(DEFAULT_MARKET_PRODUCE);
    }
  };

  // App management
  const handleAddApp = () => {
    const newApp = {
      id: `app-${Date.now()}`,
      name: "New App",
      description: "App description",
      icon: "Smartphone",
      platform: "Android",
      customApkUrl: "",
      status: "Available"
    };
    setApps([...apps, newApp]);
  };

  const handleUpdateApp = (index: number, field: string, value: any) => {
    const updatedApps = [...apps];
    updatedApps[index] = { ...updatedApps[index], [field]: value };
    setApps(updatedApps);
  };

  const handleRemoveApp = (index: number) => {
    const updatedApps = [...apps];
    updatedApps.splice(index, 1);
    setApps(updatedApps);
  };

  // Ticker management
  const handleAddTicker = () => {
    const newTicker = {
      id: `ticker-${Date.now()}`,
      text: "नयाँ सन्देश यहाँ लेख्नुहोस्",
      icon: "Sparkles",
      color: "text-blue-400",
      textColor: "text-gray-300"
    };
    setTickerMessages([...tickerMessages, newTicker]);
  };

  const handleUpdateTicker = (index: number, field: string, value: any) => {
    const updatedTickers = [...tickerMessages];
    updatedTickers[index] = { ...updatedTickers[index], [field]: value };
    setTickerMessages(updatedTickers);
  };

  const handleRemoveTicker = (index: number) => {
    const updatedTickers = [...tickerMessages];
    updatedTickers.splice(index, 1);
    setTickerMessages(updatedTickers);
  };

  // Save all settings to Firebase
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      await updateSettings({
        ...formData,
        apps: JSON.stringify(apps),
        tickerMessages: JSON.stringify(tickerMessages),
        marketProduceJson: JSON.stringify(marketProduce),
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    } catch (error) {
      console.error(error);
      alert("Failed to save settings.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) return <div className="flex-1 flex items-center justify-center min-h-screen text-white font-medium">लोडिङ हुँदैछ...</div>;

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 relative z-10 max-w-7xl mx-auto w-full pb-24 text-left">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 bg-white/5 border border-white/10 rounded-3xl p-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-xs text-emerald-400 font-bold mb-2">
            Admin Control Center
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">मुगु लोकल मार्केट व्यवस्थापन</h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            प्रशासक: <span className="text-white font-mono">{user.email}</span>
          </p>
        </div>
        
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      {/* Tabs Navigation for easy and clean management */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none border-b border-white/10">
        <button
          onClick={() => setActiveTab("market")}
          className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === "market"
              ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/30"
              : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
          }`}
        >
          <Store className="w-4 h-4" />
          <span>बिक्रेता तथा बजार सम्पर्क (Live Sellers & Contacts)</span>
        </button>

        <button
          onClick={() => setActiveTab("general")}
          className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === "general"
              ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30"
              : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>सामान्य सेटिङ (Phone, APK & Email)</span>
        </button>

        <button
          onClick={() => setActiveTab("ticker")}
          className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === "ticker"
              ? "bg-yellow-600 text-white shadow-lg shadow-yellow-900/30"
              : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
          }`}
        >
          <AppWindow className="w-4 h-4" />
          <span>न्युज टिकर (Scrolling Ticker)</span>
        </button>

        <button
          onClick={() => setActiveTab("gallery")}
          className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === "gallery"
              ? "bg-purple-600 text-white shadow-lg shadow-purple-900/30"
              : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>फोटो ग्यालरी (Gallery)</span>
        </button>

        <button
          onClick={() => setActiveTab("apps")}
          className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === "apps"
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/30"
              : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
          }`}
        >
          <AppWindow className="w-4 h-4" />
          <span>एप्स सूची (Apps Directory)</span>
        </button>
      </div>

      <form onSubmit={handleSaveSettings}>

        {/* TAB 1: MARKET & TRADER CONTACT MANAGEMENT (Main User Request) */}
        {activeTab === "market" && (
          <div className="space-y-6">
            
            {/* Master Toggle Controls Banner */}
            <div className="bg-gradient-to-r from-emerald-950/40 via-emerald-900/20 to-blue-950/40 border border-emerald-500/30 rounded-3xl p-6 sm:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Store className="w-6 h-6 text-emerald-400" />
                    बिक्रेता तथा सम्पर्क व्यवस्थापन (Sellers & Contacts Control)
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-2xl leading-relaxed">
                    यहाँबाट तपाईंले मुगु बजारमा सामान बिक्री गर्ने कृषक/व्यापारीहरूको फोन नम्बर देखाउने कि नदेखाउने, नम्बर परिवर्तन गर्ने, वा सबै कलहरू सिधै आफ्नै नम्बरमा फर्काउने सेट गर्न सक्नुहुन्छ।
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={handleResetMarketData}
                    className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-xs font-semibold border border-white/10 flex items-center gap-1.5 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>सुरुवाती डाटा रिसेट</span>
                  </button>
                </div>
              </div>

              {/* Toggles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/10">
                
                {/* 1. Show/Hide Sellers Contact Toggle */}
                <div className="bg-black/40 border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      <span>बिक्रेताको फोन तथा ह्वाट्सएप देखाउने</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        formData.showSellerContacts ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-gray-700 text-gray-400"
                      }`}>
                        {formData.showSellerContacts ? "सक्रिय (ENABLED)" : "निष्क्रिय (DISABLED)"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      बन्द गरेमा वेबसाइटको मुख्य पृष्ठमा बिक्रेताहरूको फोन नम्बर हट्नेछ र केवल सोधपुछ हटलाइन मात्र देखिनेछ।
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, showSellerContacts: !formData.showSellerContacts })}
                    className="shrink-0 text-emerald-400 focus:outline-none"
                  >
                    {formData.showSellerContacts ? (
                      <ToggleRight className="w-10 h-10 text-emerald-400" />
                    ) : (
                      <ToggleLeft className="w-10 h-10 text-gray-600" />
                    )}
                  </button>
                </div>

                {/* 2. Forward all seller calls to Admin Phone Toggle */}
                <div className="bg-black/40 border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      <span>सबै कल आफ्नै नम्बरमा फर्काउने (Forward to My Phone)</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        formData.useAdminPhoneForSellers ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "bg-gray-700 text-gray-400"
                      }`}>
                        {formData.useAdminPhoneForSellers ? "सक्रिय (FORWARDING ON)" : "निष्क्रिय (DIRECT TO SELLER)"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      चालु गर्दा कुनै पनि उत्पादनमा कल/ह्वाट्सएप थिच्दा सिधै <strong>तपाईंको आफ्नै मुख्य नम्बर ({formData.phone || "९८४८..."})</strong> मा सम्पर्क हुनेछ।
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, useAdminPhoneForSellers: !formData.useAdminPhoneForSellers })}
                    className="shrink-0 text-blue-400 focus:outline-none"
                  >
                    {formData.useAdminPhoneForSellers ? (
                      <ToggleRight className="w-10 h-10 text-blue-400" />
                    ) : (
                      <ToggleLeft className="w-10 h-10 text-gray-600" />
                    )}
                  </button>
                </div>

              </div>
            </div>

            {/* Individual Product & Seller Details Editing Cards */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>उत्पादन अनुसारका बिक्रेताहरूको सूची र नम्बर फेर्ने ठाउँ</span>
                </h3>
                <span className="text-xs text-gray-400 font-mono">
                  कुल उत्पादन: {marketProduce.length} वटा
                </span>
              </div>

              {marketProduce.map((prod, pIdx) => (
                <div 
                  key={prod.id || pIdx} 
                  className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-4 hover:border-white/20 transition-colors"
                >
                  {/* Product Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                    <div>
                      <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
                        उत्पादन #{pIdx + 1}
                      </div>
                      <h4 className="text-lg font-bold text-white mt-0.5">{prod.nameNepali}</h4>
                      <p className="text-xs text-gray-400 font-mono">{prod.nameEnglish}</p>
                    </div>

                    <div className="grid grid-cols-2 sm:flex items-center gap-3">
                      <div>
                        <label className="block text-[10px] text-gray-400 mb-1">वर्तमान बजार दर</label>
                        <input
                          type="text"
                          value={prod.rateCurrent}
                          onChange={(e) => handleUpdateProductField(pIdx, "rateCurrent", e.target.value)}
                          className="bg-black/50 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-emerald-400 font-bold w-32 focus:border-emerald-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-gray-400 mb-1">उत्पादन क्षेत्र</label>
                        <input
                          type="text"
                          value={prod.mainOrigin}
                          onChange={(e) => handleUpdateProductField(pIdx, "mainOrigin", e.target.value)}
                          className="bg-black/50 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white w-32 focus:border-emerald-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Sellers List for this product */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Store className="w-3.5 h-3.5 text-emerald-400" />
                        बिक्रेता तथा कृषकहरूको सम्पर्क विवरण (Sellers Contacts):
                      </span>
                      <button
                        type="button"
                        onClick={() => handleAddSeller(pIdx)}
                        className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 bg-emerald-500/10 hover:bg-emerald-500/20 px-3 py-1 rounded-xl transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>नयाँ बिक्रेता थप्नुहोस्</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {prod.featuredSellers.map((seller, sIdx) => (
                        <div 
                          key={sIdx}
                          className="bg-black/40 border border-white/10 rounded-2xl p-4 relative group space-y-3"
                        >
                          <button
                            type="button"
                            onClick={() => handleRemoveSeller(pIdx, sIdx)}
                            className="absolute top-3 right-3 p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                            title="बिक्रेता हटाउनुहोस्"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>

                          <div className="pr-6">
                            <label className="block text-[10px] text-gray-400 mb-1">बिक्रेता/फर्मको नाम</label>
                            <input
                              type="text"
                              value={seller.name}
                              onChange={(e) => handleUpdateSellerField(pIdx, sIdx, "name", e.target.value)}
                              placeholder="उदा: रारा स्याउ फार्म"
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white font-medium focus:border-emerald-500 outline-none"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[10px] text-gray-400 mb-1">भूमिका / प्रकार</label>
                              <input
                                type="text"
                                value={seller.role}
                                onChange={(e) => handleUpdateSellerField(pIdx, sIdx, "role", e.target.value)}
                                placeholder="उदा: थोक बिक्रेता"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-gray-300 focus:border-emerald-500 outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] text-gray-400 mb-1">सम्पर्क नम्बर (Phone / WhatsApp)</label>
                              <input
                                type="text"
                                value={seller.phone}
                                onChange={(e) => handleUpdateSellerField(pIdx, sIdx, "phone", e.target.value)}
                                placeholder="९८४८......"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-emerald-400 font-mono font-bold focus:border-emerald-500 outline-none"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] text-gray-400 mb-1">स्थान / ठेगाना</label>
                            <input
                              type="text"
                              value={seller.location}
                              onChange={(e) => handleUpdateSellerField(pIdx, sIdx, "location", e.target.value)}
                              placeholder="उदा: गमगढी, मुगु"
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-gray-300 focus:border-emerald-500 outline-none"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {prod.featuredSellers.length === 0 && (
                      <div className="p-4 bg-black/20 border border-white/5 rounded-2xl text-center text-xs text-gray-500">
                        यस उत्पादनका लागि कुनै बिक्रेता जोडिएको छैन। "नयाँ बिक्रेता थप्नुहोस्" मा थिच्नुहोस्।
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 2: GENERAL SETTINGS (Phone, APK, Email) */}
        {activeTab === "general" && (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Settings className="w-6 h-6 text-blue-400" />
              सामान्य सेटिङ तथा सम्पर्क (General Settings)
            </h2>
            
            <div>
              <label className="block text-gray-400 text-sm font-medium mb-2">
                मुख्य APK डाउनलोड लिङ्क (Direct APK Download Link)
              </label>
              <input
                type="url"
                value={formData.apkUrl}
                onChange={(e) => setFormData({...formData, apkUrl: e.target.value})}
                placeholder="https://drive.google.com/..."
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">
                  मुख्य हटलाइन फोन / WhatsApp नम्बर (Phone)
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors font-mono"
                />
                <p className="text-[11px] text-gray-500 mt-1">
                  यो नम्बर वेबसाइटको सबैभन्दा माथि, फुटरमा र प्रत्यक्ष सम्पर्क खण्डमा देखिन्छ।
                </p>
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">
                  सम्पर्क इमेल (Email)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-400 text-sm font-medium mb-2">
                  कार्यालय तथा मुख्य बजार ठेगाना (Location / Address)
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TICKER MANAGEMENT */}
        {activeTab === "ticker" && (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <AppWindow className="w-6 h-6 text-yellow-400" />
                  न्युज टिकर व्यवस्थापन (Manage News Ticker)
                </h2>
                <p className="text-gray-400 text-xs mt-1">
                  यी सन्देशहरू वेबसाइटको सबैभन्दा माथि घुमिरहने (Scrolling) खण्डमा देखिनेछन्।
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddTicker}
                className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>नयाँ सन्देश थप्नुहोस्</span>
              </button>
            </div>

            <div className="space-y-3">
              {tickerMessages.map((ticker, index) => (
                <div key={ticker.id || index} className="p-4 bg-black/40 border border-white/10 rounded-2xl relative group">
                  <button 
                    type="button"
                    onClick={() => handleRemoveTicker(index)}
                    className="absolute top-4 right-4 p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                    title="सन्देश हटाउनुहोस्"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  
                  <div className="mr-10">
                    <label className="block text-xs font-medium text-gray-500 mb-1">सन्देश (Message Text)</label>
                    <input 
                      type="text" 
                      value={ticker.text || ''} 
                      onChange={(e) => handleUpdateTicker(index, 'text', e.target.value)}
                      placeholder="Enter news or update..."
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-yellow-500 outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: GALLERY MANAGEMENT */}
        {activeTab === "gallery" && (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <ImageIcon className="w-6 h-6 text-purple-400" />
                  फोटो ग्यालरी (Manage Gallery Images)
                </h2>
                <p className="text-xs text-gray-400 mt-1">मुगुका स्थानीय उत्पादन र प्राकृतिक सुन्दरताका फोटोहरू अपलोड गर्नुहोस्।</p>
              </div>
              
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-2xl font-bold text-xs transition-colors shadow-lg shadow-emerald-900/20 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                {isUploading ? (uploadStep || "Uploading...") : "नयाँ फोटो अपलोड गर्नुहोस्"}
              </button>
              <input 
                type="file" 
                accept="image/*" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                className="hidden" 
              />
            </div>

            {uploadError && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 text-red-200 rounded-xl text-xs">
                {uploadError}
              </div>
            )}

            {images.length === 0 ? (
              <div className="text-center py-16 bg-black/20 rounded-2xl border border-white/5">
                <ImageIcon className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-xs">कुनै पनि फोटो अपलोड गरिएको छैन।</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {images.map((img) => (
                  <div key={img.id} className="group relative aspect-square bg-gray-900 rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center">
                    <img src={img.imageUrl} alt="Gallery" className="w-full h-full object-contain" />
                    <div className="absolute top-2 right-2 z-10 flex flex-col gap-2">
                      {confirmDeleteId === img.id ? (
                        <div className="bg-red-500/90 text-white rounded-lg p-2 shadow-lg backdrop-blur-sm flex items-center gap-2">
                          <span className="text-xs font-bold">मेटाउने?</span>
                          <button type="button" onClick={() => handleDelete(img.id)} className="bg-white/20 hover:bg-white/40 rounded px-2 py-1 text-xs font-bold">हो</button>
                          <button type="button" onClick={() => setConfirmDeleteId(null)} className="bg-white/20 hover:bg-white/40 rounded px-2 py-1 text-xs font-bold">होइन</button>
                        </div>
                      ) : (
                        <button 
                          type="button"
                          onClick={() => setConfirmDeleteId(img.id)}
                          className="p-2 bg-red-500/90 text-white rounded-xl hover:bg-red-600 transition-colors shadow-lg backdrop-blur-sm ml-auto"
                          title="Delete Image"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: APPS DIRECTORY */}
        {activeTab === "apps" && (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <AppWindow className="w-6 h-6 text-indigo-400" />
                  एप्स तथा सेवाहरूको सूची (Manage Apps & Services)
                </h2>
                <p className="text-gray-400 text-xs mt-1">
                  साइटमा देखिने एप्सहरूको विवरण र डाउनलोड लिङ्क।
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddApp}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add New App</span>
              </button>
            </div>

            <div className="space-y-4">
              {apps.map((app, index) => (
                <div key={app.id || index} className="p-4 bg-black/40 border border-white/10 rounded-2xl relative group">
                  <button 
                    type="button"
                    onClick={() => handleRemoveApp(index)}
                    className="absolute top-4 right-4 p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mr-10">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">App Name</label>
                      <input 
                        type="text" 
                        value={app.name || ''} 
                        onChange={(e) => handleUpdateApp(index, 'name', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                      <input 
                        type="text" 
                        value={app.description || ''} 
                        onChange={(e) => handleUpdateApp(index, 'description', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Global Sticky Save Button */}
        <div className="sticky bottom-4 z-40 pt-6 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white px-8 py-3.5 rounded-2xl font-black text-sm sm:text-base transition-all shadow-2xl shadow-emerald-950/80 hover:scale-[1.02] disabled:opacity-70 cursor-pointer"
          >
            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : (saveSuccess ? <Check className="w-5 h-5" /> : <Save className="w-5 h-5" />)}
            {isSaving ? "परिवर्तनहरू सेभ हुँदैछन्..." : (saveSuccess ? "सफलतापूर्वक सेभ भयो!" : "सबै परिवर्तन सेभ गर्नुहोस् (Save All Changes)")}
          </button>
        </div>

      </form>
    </div>
  );
}
