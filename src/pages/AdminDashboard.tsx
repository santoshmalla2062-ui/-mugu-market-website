import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, deleteDoc, doc } from "firebase/firestore";
import { Upload, Trash2, LogOut, Loader2, Image as ImageIcon, Settings, Save, Check } from "lucide-react";
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
    location: ""
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (!settings.loading) {
      setFormData({
        apkUrl: settings.apkUrl || "",
        phone: settings.phone || "",
        email: settings.email || "",
        location: settings.location || ""
      });
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

  const resizeImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 600; // Aggressive compression
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
          resolve(canvas.toDataURL("image/jpeg", 0.5)); // 50% quality for safety
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
        
        // Timeout wrapper for addDoc to prevent endless spinning
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

  if (!user) return <div className="flex-1 flex items-center justify-center min-h-screen text-white">Loading...</div>;

  return (
    <div className="flex-1 p-6 relative z-10 max-w-7xl mx-auto w-full">
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

      <div className="mt-8 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8">
        <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
          <Settings className="w-6 h-6 text-blue-400" />
          App Settings & Contact Info
        </h2>
        
        <form onSubmit={async (e) => {
          e.preventDefault();
          setIsSaving(true);
          setSaveSuccess(false);
          try {
            await updateSettings(formData);
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
          } catch (error) {
            console.error(error);
            alert("Failed to save settings.");
          } finally {
            setIsSaving(false);
          }
        }} className="space-y-6">
          
          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2">APK Download Link (e.g. Google Drive Link)</label>
            <input
              type="url"
              value={formData.apkUrl}
              onChange={(e) => setFormData({...formData, apkUrl: e.target.value})}
              placeholder="https://drive.google.com/..."
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
            <p className="text-xs text-gray-500 mt-2">Paste your APK download link here. Leave empty to disable the download button.</p>
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

          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-lg shadow-blue-900/20 disabled:opacity-70"
          >
            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : (saveSuccess ? <Check className="w-5 h-5" /> : <Save className="w-5 h-5" />)}
            {isSaving ? "Saving..." : (saveSuccess ? "Saved Successfully!" : "Save Settings")}
          </button>
        </form>
      </div>
    </div>
  );
}
