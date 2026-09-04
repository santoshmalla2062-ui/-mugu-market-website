import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, deleteDoc, doc } from "firebase/firestore";
import { Upload, Trash2, LogOut, Loader2, Image as ImageIcon, Settings, Save, Check, AppWindow } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";

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
    tickerMessages: "[]"
  });
  
  // App management state
  const [apps, setApps] = useState<any[]>([]);
  // Ticker management state
  const [tickerMessages, setTickerMessages] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (!settings.loading) {
      setFormData({
        apkUrl: settings.apkUrl || "",
        phone: settings.phone || "",
        email: settings.email || "",
        location: settings.location || "",
        apps: settings.apps || "[]",
        tickerMessages: settings.tickerMessages || "[]"
      });
      
      try {
        if (settings.apps) {
          setApps(JSON.parse(settings.apps));
        }
        if (settings.tickerMessages) {
          setTickerMessages(JSON.parse(settings.tickerMessages));
        }
      } catch (e) {
        console.error("Failed to parse settings", e);
      }
    }
  }, [settings]);

  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

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

  const resizeImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 600;
          const MAX_HEIGHT = 600;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", 0.5));
        };
        img.onerror = (error) => reject(new Error("Failed to read image file."));
      };
      reader.onerror = (error) => reject(new Error("Failed to load file."));
    });
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
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
          setTimeout(() => reject(new Error("Upload timed out. Your connection might be slow, please try again.")), 15000)
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

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      // Save all settings including the dynamic lists as JSON
      await updateSettings({
        ...formData,
        apps: JSON.stringify(apps),
        tickerMessages: JSON.stringify(tickerMessages)
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error(error);
      alert("Failed to save settings.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) return <div className="flex-1 flex items-center justify-center min-h-screen text-white">Loading...</div>;

  return (
    <div className="flex-1 p-6 relative z-10 max-w-7xl mx-auto w-full pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-400 text-sm">Logged in as {user.email}</p>
        </div>
        
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-emerald-400" />
            Manage Gallery Images
          </h2>
          
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-full font-medium transition-colors shadow-lg shadow-emerald-900/20 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
            {isUploading ? (uploadStep || "Uploading...") : "Upload New Photo"}
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
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 text-red-200 rounded-xl text-sm">
            {uploadError}
          </div>
        )}

        {images.length === 0 ? (
          <div className="text-center py-16 bg-black/20 rounded-2xl border border-white/5">
            <ImageIcon className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No images uploaded yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {images.map((img) => (
              <div key={img.id} className="group relative aspect-square bg-black rounded-xl overflow-hidden border border-white/10">
                <img src={img.imageUrl} alt="Gallery" className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 z-10 flex flex-col gap-2">
                  {confirmDeleteId === img.id ? (
                    <div className="bg-red-500/90 text-white rounded-lg p-2 shadow-lg backdrop-blur-sm flex items-center gap-2">
                      <span className="text-xs font-bold">Delete?</span>
                      <button onClick={() => handleDelete(img.id)} className="bg-white/20 hover:bg-white/40 rounded px-2 py-1 text-xs font-bold">Yes</button>
                      <button onClick={() => setConfirmDeleteId(null)} className="bg-white/20 hover:bg-white/40 rounded px-2 py-1 text-xs font-bold">No</button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setConfirmDeleteId(img.id)}
                      className="p-2.5 bg-red-500/90 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg backdrop-blur-sm ml-auto"
                      title="Delete Image"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <form onSubmit={handleSaveSettings}>
        {/* Ticker Management Section */}
        <div className="mt-8 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <AppWindow className="w-6 h-6 text-yellow-400" />
              Manage News Ticker
            </h2>
            <button
              type="button"
              onClick={handleAddTicker}
              className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-white rounded-xl text-sm font-medium transition-colors"
            >
              + Add News Text
            </button>
          </div>
          
          <p className="text-gray-400 text-sm mb-6">
            यी सन्देशहरू वेबसाइटको सबैभन्दा माथि घुमिरहने (Scrolling) खण्डमा देखिनेछन्।
          </p>

          <div className="space-y-4">
            {tickerMessages.map((ticker, index) => (
              <div key={ticker.id || index} className="p-4 bg-black/40 border border-white/10 rounded-2xl relative group">
                <button 
                  type="button"
                  onClick={() => handleRemoveTicker(index)}
                  className="absolute top-4 right-4 p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  title="Remove Message"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mr-10">
                  <div className="lg:col-span-2">
                    <label className="block text-xs font-medium text-gray-500 mb-1">Message Text</label>
                    <input 
                      type="text" 
                      value={ticker.text || ''} 
                      onChange={(e) => handleUpdateTicker(index, 'text', e.target.value)}
                      placeholder="Enter news or update..."
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-yellow-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Icon</label>
                    <select 
                      value={ticker.icon || 'Sparkles'}
                      onChange={(e) => handleUpdateTicker(index, 'icon', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-yellow-500 outline-none"
                    >
                      <option value="Sparkles">Sparkles</option>
                      <option value="Megaphone">Megaphone</option>
                      <option value="Zap">Lightning (Zap)</option>
                      <option value="Info">Info</option>
                      <option value="Star">Star</option>
                      <option value="Bell">Bell</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Icon Color</label>
                    <select 
                      value={ticker.color || 'text-blue-400'}
                      onChange={(e) => handleUpdateTicker(index, 'color', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-yellow-500 outline-none"
                    >
                      <option value="text-blue-400">Blue</option>
                      <option value="text-emerald-400">Emerald / Green</option>
                      <option value="text-yellow-400">Yellow</option>
                      <option value="text-purple-400">Purple</option>
                      <option value="text-pink-400">Pink</option>
                      <option value="text-white">White</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Text Color</label>
                    <select 
                      value={ticker.textColor || 'text-gray-300'}
                      onChange={(e) => handleUpdateTicker(index, 'textColor', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-yellow-500 outline-none"
                    >
                      <option value="text-gray-300">Default (Gray)</option>
                      <option value="text-white">White</option>
                      <option value="text-blue-400">Blue</option>
                      <option value="text-emerald-400">Emerald / Green</option>
                      <option value="text-yellow-400">Yellow</option>
                      <option value="text-purple-400">Purple</option>
                      <option value="text-pink-400">Pink</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
            
            {tickerMessages.length === 0 && (
              <div className="text-center py-8 text-gray-500 text-sm">
                कुनै पनि सन्देश छैन। "+ Add News Text" मा थिचेर नयाँ सन्देश थप्नुहोस्।
              </div>
            )}
          </div>
        </div>

        {/* Apps Management Section */}
        <div className="mt-8 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <AppWindow className="w-6 h-6 text-purple-400" />
              Manage Apps & Services
            </h2>
            <button
              type="button"
              onClick={handleAddApp}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-sm font-medium transition-colors"
            >
              + Add New App
            </button>
          </div>
          
          <p className="text-gray-400 text-sm mb-6">
            यी एपहरू वेबसाइटको "Apps & Services" खण्डमा देखिनेछन्। यहाँबाट तपाईंले नयाँ एप थप्न, लिंक परिवर्तन गर्न वा हटाउन सक्नुहुन्छ।
          </p>

          <div className="space-y-4">
            {apps.map((app, index) => (
              <div key={app.id || index} className="p-4 bg-black/40 border border-white/10 rounded-2xl relative group">
                <button 
                  type="button"
                  onClick={() => handleRemoveApp(index)}
                  className="absolute top-4 right-4 p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  title="Remove App"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mr-10">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">App Name</label>
                    <input 
                      type="text" 
                      value={app.name || ''} 
                      onChange={(e) => handleUpdateApp(index, 'name', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-purple-500 outline-none"
                    />
                  </div>
                  <div className="lg:col-span-2">
                    <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                    <input 
                      type="text" 
                      value={app.description || ''} 
                      onChange={(e) => handleUpdateApp(index, 'description', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-purple-500 outline-none"
                    />
                  </div>
                  <div className="lg:col-span-2">
                    <label className="block text-xs font-medium text-gray-500 mb-1">APK Google Drive Link (Leave empty if none)</label>
                    <input 
                      type="text" 
                      value={app.customApkUrl || ''} 
                      onChange={(e) => handleUpdateApp(index, 'customApkUrl', e.target.value)}
                      placeholder="https://drive.google.com/..."
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-purple-500 outline-none"
                    />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
                      <select 
                        value={app.status || 'Available'}
                        onChange={(e) => handleUpdateApp(index, 'status', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-purple-500 outline-none"
                      >
                        <option value="Available">Available</option>
                        <option value="Coming Soon">Coming Soon</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-gray-500 mb-1">Icon Type</label>
                      <select 
                        value={app.icon || 'Store'}
                        onChange={(e) => handleUpdateApp(index, 'icon', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-purple-500 outline-none"
                      >
                        <option value="Store">Store</option>
                        <option value="Smartphone">Smartphone</option>
                        <option value="Globe">Globe</option>
                        <option value="Box">Box</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {apps.length === 0 && (
              <div className="text-center py-8 text-gray-500 text-sm">
                कुनै पनि एप छैन। "Add New App" मा थिचेर नयाँ एप थप्नुहोस्।
              </div>
            )}
          </div>
        </div>

        {/* General Settings Section */}
        <div className="mt-8 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
            <Settings className="w-6 h-6 text-blue-400" />
            General Settings
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-gray-400 text-sm font-medium mb-2">Main APK Download Link (Used as default)</label>
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
                <label className="block text-gray-400 text-sm font-medium mb-2">Contact Phone</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">Contact Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-400 text-sm font-medium mb-2">Location / Address</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Sticky Save Button */}
            <div className="sticky bottom-4 z-50 pt-4 flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-colors shadow-xl shadow-blue-900/30 disabled:opacity-70"
              >
                {isSaving ? <Loader2 className="w-6 h-6 animate-spin" /> : (saveSuccess ? <Check className="w-6 h-6" /> : <Save className="w-6 h-6" />)}
                {isSaving ? "Saving..." : (saveSuccess ? "Saved Successfully!" : "Save All Changes")}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
