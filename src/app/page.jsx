'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// ==================== SUPABASE CONFIG ====================
const supabaseUrl = 'https://xjncogzherkgueoguqka.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqbmNvZ3poZXJrZ3Vlb2d1cWthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzMjU4OTQsImV4cCI6MjA4NTkwMTg5NH0.6kVlWRE4tLIKHnVCWCGQYFKImsFLzPy42PY98MsakaE';
const supabase = createClient(supabaseUrl, supabaseKey);

// ==================== DATA ====================
const F1_CALENDAR_2026 = [
  { id: 1, name: 'GP de Australia', circuit: 'Albert Park', country: 'au', date: '2026-03-08' },
  { id: 2, name: 'GP de China', circuit: 'Shanghai', country: 'cn', date: '2026-03-15', sprint: true },
  { id: 3, name: 'GP de Japón', circuit: 'Suzuka', country: 'jp', date: '2026-03-29' },
  { id: 4, name: 'GP de Bahréin', circuit: 'Sakhir', country: 'bh', date: '2026-04-12' },
  { id: 5, name: 'GP de Arabia Saudí', circuit: 'Jeddah', country: 'sa', date: '2026-04-19' },
  { id: 6, name: 'GP de Miami', circuit: 'Miami', country: 'us', date: '2026-05-03', sprint: true },
  { id: 7, name: 'GP de Canadá', circuit: 'Montreal', country: 'ca', date: '2026-05-24', sprint: true },
  { id: 8, name: 'GP de Mónaco', circuit: 'Monte Carlo', country: 'mc', date: '2026-06-07' },
  { id: 9, name: 'GP de Barcelona-Catalunya', circuit: 'Barcelona', country: 'es', date: '2026-06-14' },
  { id: 10, name: 'GP de Austria', circuit: 'Spielberg', country: 'at', date: '2026-06-28' },
  { id: 11, name: 'GP de Gran Bretaña', circuit: 'Silverstone', country: 'gb', date: '2026-07-05', sprint: true },
  { id: 12, name: 'GP de Bélgica', circuit: 'Spa', country: 'be', date: '2026-07-19' },
  { id: 13, name: 'GP de Hungría', circuit: 'Hungaroring', country: 'hu', date: '2026-07-26' },
  { id: 14, name: 'GP de Países Bajos', circuit: 'Zandvoort', country: 'nl', date: '2026-08-23', sprint: true },
  { id: 15, name: 'GP de Italia', circuit: 'Monza', country: 'it', date: '2026-09-06' },
  { id: 16, name: 'GP de Madrid', circuit: 'IFEMA Madrid', country: 'es', date: '2026-09-13' },
  { id: 17, name: 'GP de Azerbaiyán', circuit: 'Baku', country: 'az', date: '2026-09-26' },
  { id: 18, name: 'GP de Singapur', circuit: 'Marina Bay', country: 'sg', date: '2026-10-11', sprint: true },
  { id: 19, name: 'GP de Estados Unidos', circuit: 'Austin', country: 'us', date: '2026-10-25' },
  { id: 20, name: 'GP de México', circuit: 'Hermanos Rodríguez', country: 'mx', date: '2026-11-01' },
  { id: 21, name: 'GP de Brasil', circuit: 'Interlagos', country: 'br', date: '2026-11-08' },
  { id: 22, name: 'GP de Las Vegas', circuit: 'Las Vegas', country: 'us', date: '2026-11-21' },
  { id: 23, name: 'GP de Catar', circuit: 'Losail', country: 'qa', date: '2026-11-29' },
  { id: 24, name: 'GP de Abu Dhabi', circuit: 'Yas Marina', country: 'ae', date: '2026-12-06' },
];

// Flag component using real images from flagcdn.com
const Flag = ({ country, className = "w-10 h-7" }) => {
  // Map country codes to ISO codes for flagcdn
  const countryMap = {
    au: 'au', // Australia
    cn: 'cn', // China
    jp: 'jp', // Japan
    bh: 'bh', // Bahrain
    sa: 'sa', // Saudi Arabia
    us: 'us', // USA
    it: 'it', // Italy
    mc: 'mc', // Monaco
    es: 'es', // Spain
    ca: 'ca', // Canada
    at: 'at', // Austria
    gb: 'gb', // UK
    be: 'be', // Belgium
    hu: 'hu', // Hungary
    nl: 'nl', // Netherlands
    az: 'az', // Azerbaijan
    sg: 'sg', // Singapore
    mx: 'mx', // Mexico
    br: 'br', // Brazil
    qa: 'qa', // Qatar
    ae: 'ae', // UAE
  };

  const isoCode = countryMap[country] || country;
  
  return (
    <img 
      src={`https://flagcdn.com/w80/${isoCode}.png`}
      srcSet={`https://flagcdn.com/w160/${isoCode}.png 2x`}
      alt={country}
      className={`${className} rounded object-cover`}
    />
  );
};

const F1_DRIVERS_2026 = [
  { id: 1, name: 'Max Verstappen', team: 'Red Bull Racing', number: 1, color: '#3671C6' },
  { id: 2, name: 'Isack Hadjar', team: 'Red Bull Racing', number: 6, color: '#3671C6' },
  { id: 3, name: 'Lewis Hamilton', team: 'Ferrari', number: 44, color: '#E8002D' },
  { id: 4, name: 'Charles Leclerc', team: 'Ferrari', number: 16, color: '#E8002D' },
  { id: 5, name: 'George Russell', team: 'Mercedes', number: 63, color: '#27F4D2' },
  { id: 6, name: 'Kimi Antonelli', team: 'Mercedes', number: 12, color: '#27F4D2' },
  { id: 7, name: 'Lando Norris', team: 'McLaren', number: 4, color: '#FF8000' },
  { id: 8, name: 'Oscar Piastri', team: 'McLaren', number: 81, color: '#FF8000' },
  { id: 9, name: 'Fernando Alonso', team: 'Aston Martin', number: 14, color: '#229971' },
  { id: 10, name: 'Lance Stroll', team: 'Aston Martin', number: 18, color: '#229971' },
  { id: 11, name: 'Pierre Gasly', team: 'Alpine', number: 10, color: '#FF87BC' },
  { id: 12, name: 'Franco Colapinto', team: 'Alpine', number: 43, color: '#FF87BC' },
  { id: 13, name: 'Liam Lawson', team: 'Racing Bulls', number: 30, color: '#6692FF' },
  { id: 14, name: 'Arvid Lindblad', team: 'Racing Bulls', number: 17, color: '#6692FF' },
  { id: 15, name: 'Nico Hülkenberg', team: 'Audi', number: 27, color: '#FF0000' },
  { id: 16, name: 'Gabriel Bortoleto', team: 'Audi', number: 5, color: '#FF0000' },
  { id: 17, name: 'Esteban Ocon', team: 'Haas', number: 31, color: '#B6BABD' },
  { id: 18, name: 'Oliver Bearman', team: 'Haas', number: 87, color: '#B6BABD' },
  { id: 19, name: 'Alexander Albon', team: 'Williams', number: 23, color: '#64C4FF' },
  { id: 20, name: 'Carlos Sainz', team: 'Williams', number: 55, color: '#64C4FF' },
  { id: 21, name: 'Valtteri Bottas', team: 'Cadillac', number: 77, color: '#1E5631' },
  { id: 22, name: 'Sergio Pérez', team: 'Cadillac', number: 11, color: '#1E5631' },
];

const SHOP_ITEMS = [
  { id: 1, name: 'Gorra Red Bull Racing', price: 50, image: '/images/shop/shop-1-gorra.webp', category: 'Gorras' },
  { id: 2, name: 'Camiseta Ferrari', price: 80, image: '/images/shop/shop-2-camiseta.webp', category: 'Ropa' },
  { id: 3, name: 'Miniatura F1 1:43', price: 120, image: '/images/shop/shop-3-miniatura.webp', category: 'Coleccionables' },
  { id: 4, name: 'Poster GP Monaco', price: 30, image: '/images/shop/shop-4-poster.webp', category: 'Decoración' },
  { id: 5, name: 'Llavero Mercedes', price: 15, image: '/images/shop/shop-5-llavero.webp', category: 'Accesorios' },
  { id: 6, name: 'Sudadera McLaren', price: 150, image: '/images/shop/shop-6-sudadera.webp', category: 'Ropa' },
  { id: 7, name: 'Guantes Racing', price: 200, image: '/images/shop/shop-7-guantes.webp', category: 'Equipamiento' },
  { id: 8, name: 'Volante Replica', price: 500, image: '/images/shop/shop-8-volante.webp', category: 'Premium' },
  { id: 9, name: 'Casco Mini 1:2', price: 350, image: '/images/shop/shop-9-casco.webp', category: 'Coleccionables' },
  { id: 10, name: 'Bandera a Cuadros', price: 25, image: '/images/shop/shop-10-bandera.webp', category: 'Decoración' },
];

// ==================== UTILITIES ====================
const generateId = () => Math.random().toString(36).substr(2, 9);
const generateInviteCode = () => Math.random().toString(36).substr(2, 6).toUpperCase();

// Image compression utility
const compressImage = (file, maxSize = 200, quality = 0.8) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Calculate new dimensions (square crop from center)
        const size = Math.min(img.width, img.height);
        const offsetX = (img.width - size) / 2;
        const offsetY = (img.height - size) / 2;
        
        canvas.width = maxSize;
        canvas.height = maxSize;
        
        // Draw cropped and resized image
        ctx.drawImage(img, offsetX, offsetY, size, size, 0, 0, maxSize, maxSize);
        
        // Convert to base64 with compression
        const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedBase64);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
};

// Image Upload Component
const ImageUploader = ({ currentImage, onImageChange, size = 'lg', label = 'Cambiar foto' }) => {
  const fileInputRef = React.useRef(null);
  const [uploading, setUploading] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [tempImage, setTempImage] = useState(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona una imagen');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('La imagen es demasiado grande (máx 10MB)');
      return;
    }

    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setTempImage(ev.target.result);
        setShowEditor(true);
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      alert('Error al procesar la imagen');
      setUploading(false);
    }
  };

  const handleEditorSave = async (editedImageUrl) => {
    onImageChange({ type: 'image', url: editedImageUrl });
    setShowEditor(false);
    setTempImage(null);
  };

  const sizes = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
    xl: 'w-24 h-24'
  };

  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className={`${sizes[size]} rounded-full overflow-hidden border-2 border-dashed border-gray-600 hover:border-red-500 transition relative`}
        >
          {currentImage?.type === 'image' ? (
            <img src={currentImage.url} alt="Avatar" className="w-full h-full object-cover" />
          ) : currentImage?.type === 'gradient' ? (
            <div 
              className="w-full h-full flex items-center justify-center text-2xl"
              style={{ background: `linear-gradient(135deg, ${currentImage.colors[0]}, ${currentImage.colors[1]})` }}
            >
              {currentImage.emoji}
            </div>
          ) : (
            <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-400">
              <Icons.Plus />
            </div>
          )}
          {uploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </button>
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="text-sm text-red-400 hover:text-red-300 transition"
        >
          {uploading ? 'Subiendo...' : label}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {showEditor && tempImage && (
        <ImageEditor 
          imageUrl={tempImage}
          onSave={handleEditorSave}
          onCancel={() => { setShowEditor(false); setTempImage(null); }}
        />
      )}
    </>
  );
};

// Image Editor Component with zoom and position
const ImageEditor = ({ imageUrl, onSave, onCancel }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const canvasRef = React.useRef(null);
  const containerRef = React.useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({ x: touch.clientX - position.x, y: touch.clientY - position.y });
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    setPosition({
      x: touch.clientX - dragStart.x,
      y: touch.clientY - dragStart.y
    });
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      const outputSize = 200;
      canvas.width = outputSize;
      canvas.height = outputSize;
      
      ctx.beginPath();
      ctx.arc(outputSize/2, outputSize/2, outputSize/2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      
      const containerSize = 250;
      const imgScale = (containerSize * scale) / Math.min(img.width, img.height);
      const drawWidth = img.width * imgScale;
      const drawHeight = img.height * imgScale;
      
      const offsetX = (outputSize/2) + (position.x * outputSize / containerSize) - (drawWidth / 2);
      const offsetY = (outputSize/2) + (position.y * outputSize / containerSize) - (drawHeight / 2);
      
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      
      const result = canvas.toDataURL('image/jpeg', 0.8);
      onSave(result);
    };
    
    img.src = imageUrl;
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4">
      <h3 className="text-white text-lg font-bold mb-4">Ajusta tu foto</h3>
      
      <div 
        ref={containerRef}
        className="relative w-[250px] h-[250px] rounded-full overflow-hidden border-4 border-white/30 cursor-move"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        <img 
          src={imageUrl}
          alt="Preview"
          className="absolute pointer-events-none select-none"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: 'center center',
            left: '50%',
            top: '50%',
            marginLeft: '-125px',
            marginTop: '-125px',
            minWidth: '250px',
            minHeight: '250px',
            objectFit: 'cover'
          }}
          draggable={false}
        />
      </div>
      
      <p className="text-gray-400 text-sm mt-2 mb-4">Arrastra para mover</p>
      
      <div className="w-64 mb-6">
        <label className="text-gray-300 text-sm mb-2 block text-center">Zoom</label>
        <input
          type="range"
          min="1"
          max="3"
          step="0.1"
          value={scale}
          onChange={(e) => setScale(parseFloat(e.target.value))}
          className="w-full accent-red-500"
        />
      </div>
      
      <div className="flex gap-4">
        <button
          onClick={onCancel}
          className="px-6 py-3 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition"
        >
          Cancelar
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
        >
          Guardar
        </button>
      </div>
      
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

const calculatePoints = (predicted, actual) => {
  if (!predicted || !actual) return 0;
  let totalPoints = 0;
  predicted.forEach((driverId, predIndex) => {
    const actualIndex = actual.indexOf(driverId);
    if (actualIndex !== -1) {
      const distance = Math.abs(predIndex - actualIndex);
      const points = Math.max(0, 20 - distance * 2);
      totalPoints += points;
    }
  });
  return totalPoints;
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
};

// ==================== STORAGE ====================
const useStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.storage?.get(key);
      return stored ? JSON.parse(stored.value) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.storage?.set(key, JSON.stringify(value));
    } catch (e) {
      console.log('Storage not available');
    }
  }, [key, value]);

  return [value, setValue];
};

// ==================== ICONS ====================
const Icons = {
  Home: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>,
  Calendar: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/></svg>,
  Trophy: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/></svg>,
  Users: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>,
  Shop: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>,
  User: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>,
  Back: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>,
  Plus: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>,
  Check: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>,
  Copy: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>,
  Car: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/></svg>,
  Money: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>,
  Logout: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>,
};

// ==================== COMPONENTS ====================

// Avatar Component
const Avatar = ({ data, name, size = 'md', className = '' }) => {
  const sizes = {
    xs: 'w-8 h-8 text-sm',
    sm: 'w-10 h-10 text-lg',
    md: 'w-14 h-14 text-xl',
    lg: 'w-20 h-20 text-3xl',
    xl: 'w-24 h-24 text-4xl'
  };

  const sizeClass = sizes[size] || sizes.md;

  // Real uploaded image
  if (data?.type === 'image' && data?.url) {
    return (
      <div className={`${sizeClass} rounded-full overflow-hidden shadow-lg ${className}`}>
        <img src={data.url} alt={name} className="w-full h-full object-cover" />
      </div>
    );
  }

  // Gradient with emoji
  if (data?.type === 'gradient') {
    return (
      <div 
        className={`${sizeClass} rounded-full flex items-center justify-center shadow-lg ${className}`}
        style={{ background: `linear-gradient(135deg, ${data.colors[0]}, ${data.colors[1]})` }}
      >
        <span>{data.emoji}</span>
      </div>
    );
  }

  // Fallback: initial letter with default gradient
  const initial = name?.charAt(0)?.toUpperCase() || '?';
  return (
    <div className={`${sizeClass} bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center font-bold ${className}`}>
      {initial}
    </div>
  );
};

// Header Component
const Header = ({ title, showBack, onBack, rightAction }) => (
  <div className="bg-gradient-to-r from-red-600 to-red-800 text-white p-4 flex items-center justify-between sticky top-0 z-50 shadow-lg">
    <div className="flex items-center gap-3">
      {showBack && (
        <button onClick={onBack} className="p-1 hover:bg-white/20 rounded-full transition">
          <Icons.Back />
        </button>
      )}
      <h1 className="text-xl font-bold">{title}</h1>
    </div>
    {rightAction}
  </div>
);

// Bottom Navigation
const BottomNav = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', icon: Icons.Home, label: 'Inicio' },
    { id: 'calendar', icon: Icons.Calendar, label: 'Carreras' },
    { id: 'rankings', icon: Icons.Trophy, label: 'Rankings' },
    { id: 'leagues', icon: Icons.Users, label: 'Ligas' },
    { id: 'shop', icon: Icons.Shop, label: 'Tienda' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 flex justify-around py-2 z-50">
      {tabs.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => setActiveTab(id)}
          className={`flex flex-col items-center p-2 rounded-lg transition ${
            activeTab === id ? 'text-red-500' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Icon />
          <span className="text-xs mt-1">{label}</span>
        </button>
      ))}
    </div>
  );
};

// Driver Card for Predictions
const DriverCard = ({ driver, position, onDragStart, onDragOver, onDrop, isDragging }) => (
  <div
    draggable
    onDragStart={(e) => onDragStart(e, position)}
    onDragOver={onDragOver}
    onDrop={(e) => onDrop(e, position)}
    className={`flex items-center gap-3 p-3 bg-gray-800 rounded-lg cursor-move transition-all ${
      isDragging ? 'opacity-50 scale-95' : 'hover:bg-gray-700'
    }`}
    style={{ borderLeft: `4px solid ${driver.color}` }}
  >
    <span className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center font-bold text-sm">
      {position + 1}
    </span>
    <div className="flex-1">
      <p className="font-semibold text-white">{driver.name}</p>
      <p className="text-xs text-gray-400">{driver.team}</p>
    </div>
    <span className="text-gray-500 font-mono">#{driver.number}</span>
  </div>
);

// ==================== SCREENS ====================

// Login Screen
const LoginScreen = ({ onLogin, onRegister }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError('Completa todos los campos');
      return;
    }
    if (isRegister && !form.email) {
      setError('El email es requerido');
      return;
    }
    if (isRegister) {
      onRegister(form);
    } else {
      onLogin(form);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-red-900 flex flex-col items-center justify-center p-6">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🏎️</div>
        <h1 className="text-4xl font-bold text-white mb-2">UNAI App</h1>
        <p className="text-gray-400">Predice. Compite. Gana.</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <input
          type="text"
          placeholder="Usuario"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-red-500 focus:outline-none"
        />
        {isRegister && (
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-red-500 focus:outline-none"
          />
        )}
        <input
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-red-500 focus:outline-none"
        />

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="w-full p-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-xl hover:from-red-700 hover:to-red-800 transition shadow-lg"
        >
          {isRegister ? 'Crear Cuenta' : 'Iniciar Sesión'}
        </button>

        <button
          type="button"
          onClick={() => setIsRegister(!isRegister)}
          className="w-full p-3 text-gray-400 hover:text-white transition"
        >
          {isRegister ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
        </button>
      </form>
    </div>
  );
};

// Countdown Hook
const useCountdown = (targetDate) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
};

// Home Screen
const HomeScreen = ({ user, predictions, races, leagues, onSelectRace }) => {
  const nextRace = races.find(r => new Date(r.date) > new Date());
  const userPredictions = predictions.filter(p => p.userId === user.id);
  const totalPoints = userPredictions.reduce((sum, p) => sum + (p.points || 0), 0);
  const hasPredictionForNextRace = nextRace && userPredictions.some(p => p.raceId === nextRace.id);
  const countdown = useCountdown(nextRace?.date);

  return (
    <div className="bg-black min-h-screen pb-24">
      {/* Next Race - Hero Section */}
      {nextRace && (
        <div className="relative">
          {/* Red accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#E10600]"></div>
          
          <div className="p-5">
            {/* Label */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-[#E10600] text-xs font-bold uppercase tracking-wider">Próxima Carrera</span>
              {hasPredictionForNextRace ? (
                <span className="bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1 rounded flex items-center gap-1">
                  <Icons.Check /> PREDICHO
                </span>
              ) : (
                <span className="bg-[#E10600]/20 text-[#E10600] text-xs font-bold px-3 py-1 rounded pulse-red">
                  SIN PREDICCIÓN
                </span>
              )}
            </div>

            {/* Race Card */}
            <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
              {/* Race Header */}
              <div className="p-4 flex items-center gap-4 border-b border-gray-800">
                <Flag country={nextRace.country} className="w-16 h-12" />
                <div className="flex-1">
                  <p className="text-gray-500 text-xs uppercase tracking-wider">Ronda {nextRace.id}</p>
                  <h2 className="text-xl font-bold text-white tracking-tight">{nextRace.name}</h2>
                  <p className="text-gray-400 text-sm">{nextRace.circuit}</p>
                </div>
              </div>

              {/* Countdown */}
              <div className="p-4 bg-black">
                <div className="grid grid-cols-4 gap-2">
                  <div className="text-center">
                    <div className="bg-gray-900 border border-gray-800 rounded py-3 px-1 min-h-[60px] flex items-center justify-center">
                      <p className="f1-wide text-2xl text-white">{countdown.days}</p>
                    </div>
                    <p className="text-gray-500 text-xs mt-2 uppercase tracking-wider">Días</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gray-900 border border-gray-800 rounded py-3 px-1 min-h-[60px] flex items-center justify-center">
                      <p className="f1-wide text-2xl text-white">{countdown.hours}</p>
                    </div>
                    <p className="text-gray-500 text-xs mt-2 uppercase tracking-wider">Horas</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gray-900 border border-gray-800 rounded py-3 px-1 min-h-[60px] flex items-center justify-center">
                      <p className="f1-wide text-2xl text-white">{countdown.minutes}</p>
                    </div>
                    <p className="text-gray-500 text-xs mt-2 uppercase tracking-wider">Min</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gray-900 border border-[#E10600] rounded py-3 px-1 min-h-[60px] flex items-center justify-center">
                      <p className="f1-wide text-2xl text-[#E10600]">{countdown.seconds}</p>
                    </div>
                    <p className="text-gray-500 text-xs mt-2 uppercase tracking-wider">Seg</p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="p-4">
                {!hasPredictionForNextRace ? (
                  <button
                    onClick={() => onSelectRace(nextRace)}
                    className="w-full bg-[#E10600] text-white font-bold py-4 rounded transition hover:bg-red-700 uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    Hacer Predicción
                  </button>
                ) : (
                  <button
                    onClick={() => onSelectRace(nextRace)}
                    className="w-full bg-gray-800 border border-gray-700 text-white font-bold py-4 rounded transition hover:bg-gray-700 uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    Ver / Editar Predicción
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="px-5 mb-6">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-center">
            <p className="f1-wide text-2xl text-white">{totalPoints}</p>
            <p className="text-gray-500 text-xs uppercase tracking-wider mt-1">Puntos</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-center">
            <p className="f1-wide text-2xl text-yellow-400">{user.tokens || 0}</p>
            <p className="text-gray-500 text-xs uppercase tracking-wider mt-1">Tokens</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-center">
            <p className="f1-wide text-2xl text-white">#{user.globalRank || '-'}</p>
            <p className="text-gray-500 text-xs uppercase tracking-wider mt-1">Ranking</p>
          </div>
        </div>
      </div>

      {/* User Card */}
      <div className="px-5 mb-6">
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 flex items-center gap-4">
          <Avatar data={user.avatar} name={user.username} size="md" />
          <div className="flex-1">
            <p className="text-gray-500 text-xs uppercase tracking-wider">Bienvenido</p>
            <h2 className="text-lg font-bold text-white">{user.username}</h2>
          </div>
          <div className="text-right">
            <p className="text-white font-bold">{userPredictions.length}/24</p>
            <p className="text-gray-500 text-xs">carreras</p>
          </div>
        </div>
      </div>

      {/* My Leagues */}
      {leagues.filter(l => l.members?.includes(user.id)).length > 0 && (
        <div className="px-5 mb-6">
          <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-3">Mis Ligas</h3>
          <div className="space-y-2">
            {leagues.filter(l => l.members?.includes(user.id)).slice(0, 2).map(league => (
              <div key={league.id} className="bg-gray-900 border border-gray-800 rounded-lg p-4 flex items-center gap-4">
                <Avatar data={league.logo} name={league.name} size="sm" />
                <div className="flex-1">
                  <p className="font-bold text-white">{league.name}</p>
                  <p className="text-gray-500 text-sm">{league.members?.length || 0} miembros</p>
                </div>
                {league.pool?.enabled && (
                  <span className="bg-yellow-500/20 text-yellow-400 text-xs font-bold px-2 py-1 rounded uppercase">
                    Porra
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="px-5">
        <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-3">Actividad Reciente</h3>
        {userPredictions.length > 0 ? (
          <div className="space-y-2">
            {userPredictions.slice(-3).reverse().map(pred => {
              const race = races.find(r => r.id === pred.raceId);
              return (
                <div key={pred.id} className="bg-gray-900 border border-gray-800 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Flag country={race?.country} className="w-10 h-7" />
                    <span className="text-white text-sm">{race?.name}</span>
                  </div>
                  <span className="text-green-400 font-bold">{pred.points || 0} PTS</span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 text-center">
            <p className="text-gray-500">No hay predicciones aún</p>
            <p className="text-gray-600 text-sm">¡Haz tu primera predicción!</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Calendar Screen
const CalendarScreen = ({ races, predictions, userId, onSelectRace }) => {
  const today = new Date();
  const nextRaceId = races.find(r => new Date(r.date) > today)?.id;

  return (
    <div className="bg-black min-h-screen p-4 pb-24">
      <div className="space-y-2">
        {races.map((race) => {
          const raceDate = new Date(race.date);
          const isPast = raceDate < today;
          const isNextRace = race.id === nextRaceId;
          const hasPrediction = predictions.some(p => p.raceId === race.id && p.userId === userId);

          return (
            <button
              key={race.id}
              onClick={() => onSelectRace(race)}
              className={`w-full flex items-center gap-4 p-4 rounded-lg transition relative border ${
                isNextRace 
                  ? 'bg-gray-900 border-[#E10600]' 
                  : isPast 
                    ? 'bg-gray-900/50 border-gray-800 opacity-60' 
                    : 'bg-gray-900 border-gray-800 hover:border-gray-700'
              }`}
            >
              {isNextRace && (
                <div className="absolute -top-px left-0 right-0 h-1 bg-[#E10600] rounded-t-lg"></div>
              )}
              
              {/* Round number */}
              <div className={`w-10 min-w-[40px] text-center ${isNextRace ? 'text-[#E10600]' : 'text-gray-500'}`}>
                <span className="f1-wide text-lg">{race.id}</span>
              </div>
              
              <Flag country={race.country} className="w-12 h-8" />
              
              <div className="flex-1 text-left">
                <h3 className={`font-bold tracking-tight ${isPast ? 'text-gray-500' : 'text-white'}`}>
                  {race.name}
                </h3>
                <p className="text-gray-500 text-sm">{race.circuit}</p>
              </div>
              
              <div className="text-right">
                <p className={`font-bold text-sm ${isNextRace ? 'text-[#E10600]' : isPast ? 'text-gray-600' : 'text-gray-400'}`}>
                  {formatDate(race.date)}
                </p>
                {hasPrediction && (
                  <span className="text-xs text-green-400 flex items-center gap-1 justify-end mt-1">
                    <Icons.Check /> Predicho
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Prediction Screen
const PredictionScreen = ({ race, drivers, existingPrediction, onSave, onBack }) => {
  const [prediction, setPrediction] = useState(
    existingPrediction?.prediction || []
  );
  const [polePosition, setPolePosition] = useState(existingPrediction?.polePosition || null);
  const [fastestLap, setFastestLap] = useState(existingPrediction?.fastestLap || null);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [showPoleModal, setShowPoleModal] = useState(false);
  const [showFastestModal, setShowFastestModal] = useState(false);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    const newPrediction = [...prediction];
    const [removed] = newPrediction.splice(draggedIndex, 1);
    newPrediction.splice(targetIndex, 0, removed);
    setPrediction(newPrediction);
    setDraggedIndex(null);
  };

  const handleAddDriver = (driverId) => {
    if (prediction.length >= 10) return;
    setPrediction([...prediction, driverId]);
  };

  const handleRemoveDriver = (driverId) => {
    setPrediction(prediction.filter(id => id !== driverId));
  };

  const handleSave = () => {
    if (prediction.length !== 10) {
      alert('Debes seleccionar exactamente 10 pilotos');
      return;
    }
    onSave({ prediction, polePosition, fastestLap });
    onBack();
  };

  const selectedDrivers = prediction.map(id => drivers.find(d => d.id === id));
  const availableDrivers = drivers.filter(d => !prediction.includes(d.id));

  const poleDriver = drivers.find(d => d.id === polePosition);
  const fastestDriver = drivers.find(d => d.id === fastestLap);

  // Driver Selection Modal
  const DriverSelectModal = ({ title, subtitle, points, onSelect, onClose, selectedId }) => (
    <div className="fixed inset-0 bg-black/95 z-50 flex flex-col">
      <div className="bg-gray-900 border-b border-gray-800 p-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white uppercase tracking-wider">{title}</h3>
          <p className="text-gray-500 text-sm">{subtitle}</p>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">✕</button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {drivers.map(driver => (
            <button
              key={driver.id}
              onClick={() => { onSelect(driver.id); onClose(); }}
              className={`w-full flex items-center gap-3 p-4 rounded-lg transition text-left border ${
                selectedId === driver.id
                  ? 'bg-gray-900 border-[#E10600]'
                  : 'bg-gray-900 border-gray-800 hover:border-gray-700'
              }`}
            >
              <div className="w-1 h-10 rounded-full" style={{ backgroundColor: driver.color }}></div>
              <div className="flex-1">
                <p className="font-bold text-white">{driver.name}</p>
                <p className="text-sm text-gray-500">{driver.team}</p>
              </div>
              <span className="text-gray-500 font-mono">#{driver.number}</span>
              {selectedId === driver.id && <Icons.Check />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black">
      <Header 
        title={race.name} 
        showBack 
        onBack={onBack}
        rightAction={
          <button
            onClick={handleSave}
            disabled={prediction.length !== 10}
            className={`px-4 py-2 rounded-lg font-bold uppercase tracking-wider text-sm transition ${
              prediction.length === 10 
                ? 'bg-[#E10600] hover:bg-red-700' 
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            Guardar
          </button>
        }
      />
      
      <div className="p-4 pb-8">
        {/* Race Header */}
        <div className="flex items-center gap-4 mb-6 bg-gray-900 border border-gray-800 rounded-lg p-4">
          <Flag country={race.country} className="w-14 h-10" />
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-wider">Ronda {race.id}</p>
            <p className="text-white font-bold">{race.circuit}</p>
            <p className="text-[#E10600] text-sm font-bold">{formatDate(race.date)}</p>
          </div>
        </div>

        {/* Bonus Predictions */}
        <div className="mb-6">
          <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-3 flex items-center gap-2">
            <span className="text-yellow-400">★</span> Bonus
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setShowPoleModal(true)}
              className={`p-4 rounded-lg text-left transition border ${
                polePosition ? 'bg-purple-900/30 border-purple-500' : 'bg-gray-900 border-gray-800 hover:border-gray-700'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🏁</span>
                <span className="text-purple-400 font-bold text-xs uppercase tracking-wider">Pole</span>
              </div>
              {poleDriver ? (
                <div>
                  <p className="text-white font-semibold text-sm truncate">{poleDriver.name}</p>
                  <p className="text-gray-500 text-xs">{poleDriver.team}</p>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">+10 PTS si aciertas</p>
              )}
            </button>

            <button
              onClick={() => setShowFastestModal(true)}
              className={`p-4 rounded-lg text-left transition border ${
                fastestLap ? 'bg-orange-900/30 border-orange-500' : 'bg-gray-900 border-gray-800 hover:border-gray-700'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">⚡</span>
                <span className="text-orange-400 font-bold text-xs uppercase tracking-wider">V. Rápida</span>
              </div>
              {fastestDriver ? (
                <div>
                  <p className="text-white font-semibold text-sm truncate">{fastestDriver.name}</p>
                  <p className="text-gray-500 text-xs">{fastestDriver.team}</p>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">+10 PTS si aciertas</p>
              )}
            </button>
          </div>
        </div>

        {/* Selected Top 10 */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-bold uppercase tracking-wider text-sm">Tu Top 10</h3>
            <span className={`text-xs font-bold px-3 py-1 rounded uppercase ${
              prediction.length === 10 ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
            }`}>
              {prediction.length}/10
            </span>
          </div>
          
          {prediction.length === 0 ? (
            <div className="bg-gray-900 border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
              <p className="text-gray-500">Selecciona pilotos de la lista de abajo</p>
            </div>
          ) : (
            <div className="space-y-2">
              {selectedDrivers.map((driver, index) => (
                <div
                  key={driver.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                  className={`flex items-center gap-3 p-3 bg-gray-900 border border-gray-800 rounded-lg cursor-move transition-all ${
                    draggedIndex === index ? 'opacity-50 scale-95' : 'hover:border-gray-700'
                  }`}
                >
                  <span className="f1-wide text-lg w-8 text-center text-[#E10600]">
                    {index + 1}
                  </span>
                  <div className="w-1 h-8 rounded-full" style={{ backgroundColor: driver.color }}></div>
                  <div className="flex-1">
                    <p className="font-semibold text-white text-sm">{driver.name}</p>
                    <p className="text-xs text-gray-500">{driver.team}</p>
                  </div>
                  <span className="text-gray-600 font-mono text-sm">#{driver.number}</span>
                  <button
                    onClick={() => handleRemoveDriver(driver.id)}
                    className="w-8 h-8 bg-gray-800 hover:bg-[#E10600] text-gray-500 hover:text-white rounded flex items-center justify-center transition"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {prediction.length > 0 && prediction.length < 10 && (
            <p className="text-yellow-400 text-xs mt-3 text-center uppercase tracking-wider">
              Arrastra para reordenar · Faltan {10 - prediction.length} pilotos
            </p>
          )}
          {prediction.length === 10 && (
            <p className="text-green-400 text-xs mt-3 text-center uppercase tracking-wider">
              ✓ Predicción completa · Arrastra para reordenar
            </p>
          )}
        </div>

        {/* Available Drivers */}
        <div>
          <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-3">Pilotos disponibles</h3>
          <div className="grid grid-cols-1 gap-2">
            {availableDrivers.map(driver => (
              <button
                key={driver.id}
                onClick={() => handleAddDriver(driver.id)}
                disabled={prediction.length >= 10}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all text-left border ${
                  prediction.length >= 10
                    ? 'bg-gray-900/50 border-gray-800 opacity-50 cursor-not-allowed'
                    : 'bg-gray-900 border-gray-800 hover:border-gray-700'
                }`}
              >
                <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center">
                  <span className="text-green-400 text-lg">+</span>
                </div>
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: driver.color }}></div>
                <div className="flex-1">
                  <p className="font-semibold text-white text-sm">{driver.name}</p>
                  <p className="text-xs text-gray-500">{driver.team}</p>
                </div>
                <span className="text-gray-600 font-mono text-sm">#{driver.number}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showPoleModal && (
        <DriverSelectModal
          title="Pole Position"
          subtitle="¿Quién hará la pole?"
          points={10}
          selectedId={polePosition}
          onSelect={setPolePosition}
          onClose={() => setShowPoleModal(false)}
        />
      )}
      {showFastestModal && (
        <DriverSelectModal
          title="Vuelta Rápida"
          subtitle="¿Quién hará la vuelta rápida?"
          points={10}
          selectedId={fastestLap}
          onSelect={setFastestLap}
          onClose={() => setShowFastestModal(false)}
        />
      )}
    </div>
  );
};

// Rankings Screen
const RankingsScreen = ({ users, predictions, races }) => {
  const [tab, setTab] = useState('global');

  const rankings = users.map(user => {
    const userPreds = predictions.filter(p => p.userId === user.id);
    const points = userPreds.reduce((sum, p) => sum + (p.points || 0), 0);
    return { ...user, points, predictions: userPreds.length };
  }).sort((a, b) => b.points - a.points);

  return (
    <div className="bg-black min-h-screen p-4 pb-24">
      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab('global')}
          className={`flex-1 py-3 rounded-lg font-bold uppercase tracking-wider text-sm transition ${
            tab === 'global' ? 'bg-[#E10600] text-white' : 'bg-gray-900 border border-gray-800 text-gray-400'
          }`}
        >
          Global
        </button>
        <button
          onClick={() => setTab('season')}
          className={`flex-1 py-3 rounded-lg font-bold uppercase tracking-wider text-sm transition ${
            tab === 'season' ? 'bg-[#E10600] text-white' : 'bg-gray-900 border border-gray-800 text-gray-400'
          }`}
        >
          Temporada
        </button>
      </div>

      {/* Rankings List */}
      <div className="space-y-2">
        {rankings.map((user, index) => (
          <div
            key={user.id}
            className={`flex items-center gap-3 p-4 rounded-lg border ${
              index === 0 ? 'bg-gray-900 border-yellow-500' :
              index === 1 ? 'bg-gray-900 border-gray-400' :
              index === 2 ? 'bg-gray-900 border-orange-600' :
              'bg-gray-900 border-gray-800'
            }`}
          >
            {/* Position */}
            <div className={`w-10 text-center ${
              index === 0 ? 'text-yellow-500' :
              index === 1 ? 'text-gray-400' :
              index === 2 ? 'text-orange-500' :
              'text-gray-500'
            }`}>
              <span className="f1-wide text-xl">{index + 1}</span>
            </div>
            
            {/* Color bar */}
            <div className={`w-1 h-10 rounded-full ${
              index === 0 ? 'bg-yellow-500' :
              index === 1 ? 'bg-gray-400' :
              index === 2 ? 'bg-orange-600' :
              'bg-gray-700'
            }`}></div>
            
            <Avatar data={user.avatar} name={user.username} size="sm" />
            
            <div className="flex-1">
              <p className="font-bold text-white">{user.username}</p>
              <p className="text-gray-500 text-xs">{user.predictions} predicciones</p>
            </div>
            
            <div className="text-right">
              <p className="f1-wide text-xl text-white">{user.points}</p>
              <p className="text-gray-500 text-xs uppercase">PTS</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Leagues Screen
const LeaguesScreen = ({ user, leagues, users, onCreateLeague, onJoinLeague, onSelectLeague }) => {
  const [showCreate, setShowCreate] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const [newLeagueName, setNewLeagueName] = useState('');
  const [newLeagueLogo, setNewLeagueLogo] = useState(null);
  const [joinCode, setJoinCode] = useState('');
  const [enablePool, setEnablePool] = useState(false);
  const [poolAmount, setPoolAmount] = useState('');

  const userLeagues = leagues.filter(l => l.members?.includes(user.id));

  const handleCreate = () => {
    if (!newLeagueName.trim()) return;
    onCreateLeague({
      name: newLeagueName,
      logo: newLeagueLogo,
      pool: enablePool ? { amount: parseFloat(poolAmount) || 0, enabled: true } : null
    });
    setShowCreate(false);
    setNewLeagueName('');
    setNewLeagueLogo(null);
    setEnablePool(false);
    setPoolAmount('');
  };

  const handleJoin = () => {
    if (!joinCode.trim()) return;
    onJoinLeague(joinCode.toUpperCase());
    setShowJoin(false);
    setJoinCode('');
  };

  return (
    <div className="p-4 pb-24">
      {/* Action Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setShowCreate(true)}
          className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-bold transition"
        >
          <Icons.Plus /> Crear Liga
        </button>
        <button
          onClick={() => setShowJoin(true)}
          className="flex-1 flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl font-bold transition"
        >
          Unirse
        </button>
      </div>

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-sm max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-4">Crear Liga</h3>
            
            {/* Logo Upload */}
            <div className="flex justify-center mb-4">
              <ImageUploader
                currentImage={newLeagueLogo}
                onImageChange={setNewLeagueLogo}
                size="lg"
                label="Añadir logo"
              />
            </div>

            <input
              type="text"
              placeholder="Nombre de la liga"
              value={newLeagueName}
              onChange={(e) => setNewLeagueName(e.target.value)}
              className="w-full p-4 bg-gray-700 border border-gray-600 rounded-xl text-white mb-4"
            />
            
            <label className="flex items-center gap-3 mb-4 cursor-pointer">
              <input
                type="checkbox"
                checked={enablePool}
                onChange={(e) => setEnablePool(e.target.checked)}
                className="w-5 h-5 rounded"
              />
              <span className="text-white">Habilitar porra (dinero real)</span>
            </label>

            {enablePool && (
              <div className="mb-4">
                <label className="text-gray-400 text-sm mb-2 block">Cantidad por jugador (€)</label>
                <input
                  type="number"
                  placeholder="10"
                  value={poolAmount}
                  onChange={(e) => setPoolAmount(e.target.value)}
                  className="w-full p-4 bg-gray-700 border border-gray-600 rounded-xl text-white"
                />
                <p className="text-yellow-400 text-xs mt-2">
                  El 100% del bote se repartirá entre los ganadores
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => { setShowCreate(false); setNewLeagueLogo(null); }}
                className="flex-1 py-3 bg-gray-700 text-white rounded-xl"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreate}
                className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold"
              >
                Crear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Join Modal */}
      {showJoin && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-sm">
            <h3 className="text-xl font-bold text-white mb-4">Unirse a Liga</h3>
            <input
              type="text"
              placeholder="Código de invitación"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              className="w-full p-4 bg-gray-700 border border-gray-600 rounded-xl text-white mb-4 uppercase"
              maxLength={6}
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowJoin(false)}
                className="flex-1 py-3 bg-gray-700 text-white rounded-xl"
              >
                Cancelar
              </button>
              <button
                onClick={handleJoin}
                className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold"
              >
                Unirse
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Leagues List */}
      <h3 className="text-lg font-bold text-white mb-4">Mis Ligas</h3>
      {userLeagues.length > 0 ? (
        <div className="space-y-3">
          {userLeagues.map(league => (
            <button
              key={league.id}
              onClick={() => onSelectLeague(league)}
              className="w-full flex items-center gap-4 p-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition text-left"
            >
              <Avatar data={league.logo} name={league.name} size="md" />
              <div className="flex-1">
                <h4 className="font-bold text-white">{league.name}</h4>
                <p className="text-gray-400 text-sm">{league.members?.length || 0} miembros</p>
              </div>
              {league.pool?.enabled && (
                <span className="bg-yellow-600 text-xs px-2 py-1 rounded-full">
                  Porra
                </span>
              )}
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-400">
          <Icons.Users />
          <p className="mt-4">No estás en ninguna liga aún</p>
          <p className="text-sm">Crea una o únete con un código</p>
        </div>
      )}
    </div>
  );
};

// League Detail Screen
const LeagueDetailScreen = ({ league, users, predictions, races, currentUser, onBack, onUpdateLeague }) => {
  const [tab, setTab] = useState('ranking');
  const [showInvite, setShowInvite] = useState(false);
  const [showScuderiaModal, setShowScuderiaModal] = useState(false);
  const [scuderiaName, setScuderiaName] = useState('');
  const [scuderiaLogo, setScuderiaLogo] = useState(null);
  const [selectedPartner, setSelectedPartner] = useState('');
  const [copied, setCopied] = useState(false);

  const leagueMembers = users.filter(u => league.members?.includes(u.id));
  
  const memberRankings = leagueMembers.map(user => {
    const userPreds = predictions.filter(p => p.userId === user.id);
    const points = userPreds.reduce((sum, p) => sum + (p.points || 0), 0);
    return { ...user, points };
  }).sort((a, b) => b.points - a.points);

  const scuderias = league.scuderias || [];
  const scuderiaRankings = scuderias.map(sc => {
    const member1Points = memberRankings.find(m => m.id === sc.member1)?.points || 0;
    const member2Points = memberRankings.find(m => m.id === sc.member2)?.points || 0;
    return { ...sc, points: member1Points + member2Points };
  }).sort((a, b) => b.points - a.points);

  const copyCode = () => {
    navigator.clipboard.writeText(league.inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const availablePartners = leagueMembers.filter(m => 
    m.id !== currentUser.id && 
    !scuderias.some(sc => sc.member1 === m.id || sc.member2 === m.id)
  );

  const userInScuderia = scuderias.some(sc => 
    sc.member1 === currentUser.id || sc.member2 === currentUser.id
  );

  const handleCreateScuderia = () => {
    if (!scuderiaName.trim() || !selectedPartner) return;
    
    let logo = scuderiaLogo;
    
    // Si no se subió logo, generar uno aleatorio
    if (!logo) {
      const colors = [
        ['#E8002D', '#FF6B6B'], ['#3671C6', '#6692FF'], ['#FF8000', '#FFB347'],
        ['#229971', '#27F4D2'], ['#FF87BC', '#FFB6C1'], ['#52E252', '#90EE90']
      ];
      const emojis = ['🐎', '🐂', '🦁', '🐺', '🦅', '🐉', '🦊', '🐯'];
      const randomColors = colors[Math.floor(Math.random() * colors.length)];
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      logo = { type: 'gradient', colors: randomColors, emoji: randomEmoji };
    }

    const newScuderia = {
      id: generateId(),
      name: scuderiaName,
      member1: currentUser.id,
      member2: selectedPartner,
      logo: logo
    };
    onUpdateLeague({
      ...league,
      scuderias: [...(league.scuderias || []), newScuderia]
    });
    setShowScuderiaModal(false);
    setScuderiaName('');
    setScuderiaLogo(null);
    setSelectedPartner('');
  };

  return (
    <div className="min-h-screen bg-black">
      <Header title={league.name} showBack onBack={onBack} />

      {/* League Info */}
      <div className="p-4 bg-gray-900 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar data={league.logo} name={league.name} size="md" />
            <div>
              <p className="text-gray-500 text-sm">{leagueMembers.length} miembros</p>
              {league.pool?.enabled && (
                <p className="text-yellow-400 text-sm">
                  Bote: €{(league.pool.amount * leagueMembers.length).toFixed(2)}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={() => setShowInvite(true)}
            className="bg-[#E10600] hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition"
          >
            Invitar
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-800">
        {['ranking', 'scuderias'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-4 font-bold uppercase tracking-wider text-sm transition relative ${
              tab === t ? 'text-white' : 'text-gray-500'
            }`}
          >
            {tab === t && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E10600]"></div>}
            {t === 'ranking' ? 'Ranking' : 'Scuderías'}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4 pb-24">
        {tab === 'ranking' ? (
          <div className="space-y-2">
            {memberRankings.map((user, index) => (
              <div
                key={user.id}
                className={`flex items-center gap-3 p-4 rounded-lg border ${
                  user.id === currentUser.id ? 'bg-gray-900 border-[#E10600]' : 'bg-gray-900 border-gray-800'
                }`}
              >
                <div className={`w-8 text-center ${
                  index === 0 ? 'text-yellow-500' :
                  index === 1 ? 'text-gray-400' :
                  index === 2 ? 'text-orange-500' :
                  'text-gray-500'
                }`}>
                  <span className="f1-wide text-lg">{index + 1}</span>
                </div>
                <Avatar data={user.avatar} name={user.username} size="sm" />
                <div className="flex-1">
                  <p className="font-bold text-white">{user.username}</p>
                </div>
                <p className="f1-wide text-xl text-white">{user.points}</p>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {!userInScuderia && availablePartners.length > 0 && (
              <button
                onClick={() => setShowScuderiaModal(true)}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 text-white py-4 rounded-xl font-bold mb-6"
              >
                <Icons.Car /> Crear Scudería
              </button>
            )}

            {scuderiaRankings.length > 0 ? (
              <div className="space-y-3">
                {scuderiaRankings.map((sc, index) => {
                  const member1 = users.find(u => u.id === sc.member1);
                  const member2 = users.find(u => u.id === sc.member2);
                  return (
                    <div key={sc.id} className="bg-gray-800 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          index === 0 ? 'bg-yellow-500 text-black' : 'bg-gray-700 text-white'
                        }`}>
                          {index + 1}
                        </span>
                        <Avatar data={sc.logo} name={sc.name} size="sm" />
                        <h4 className="font-bold text-white text-lg flex-1">{sc.name}</h4>
                        <span className="text-2xl font-bold text-white">{sc.points}</span>
                      </div>
                      <div className="flex gap-2">
                        <div className="flex items-center gap-2 bg-gray-700 px-3 py-2 rounded-full">
                          <Avatar data={member1?.avatar} name={member1?.username} size="xs" />
                          <span className="text-sm text-gray-300">{member1?.username}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-700 px-3 py-2 rounded-full">
                          <Avatar data={member2?.avatar} name={member2?.username} size="xs" />
                          <span className="text-sm text-gray-300">{member2?.username}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-center text-gray-400 py-8">No hay scuderías creadas aún</p>
            )}
          </div>
        )}
      </div>

      {/* Invite Modal */}
      {showInvite && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-sm">
            <h3 className="text-xl font-bold text-white mb-4">Código de Invitación</h3>
            <div className="bg-gray-900 p-4 rounded-xl flex items-center justify-between mb-4">
              <span className="text-2xl font-mono font-bold text-white tracking-wider">
                {league.inviteCode}
              </span>
              <button onClick={copyCode} className="text-gray-400 hover:text-white">
                {copied ? <Icons.Check /> : <Icons.Copy />}
              </button>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Comparte este código con tus amigos para que se unan a la liga
            </p>
            <button
              onClick={() => setShowInvite(false)}
              className="w-full py-3 bg-gray-700 text-white rounded-xl"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Create Scuderia Modal */}
      {showScuderiaModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-sm max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-4">Crear Scudería</h3>
            
            {/* Logo Upload */}
            <div className="flex justify-center mb-4">
              <ImageUploader
                currentImage={scuderiaLogo}
                onImageChange={setScuderiaLogo}
                size="lg"
                label="Añadir escudo"
              />
            </div>

            <input
              type="text"
              placeholder="Nombre de la scudería"
              value={scuderiaName}
              onChange={(e) => setScuderiaName(e.target.value)}
              className="w-full p-4 bg-gray-700 border border-gray-600 rounded-xl text-white mb-4"
            />
            <p className="text-gray-400 text-sm mb-2">Selecciona tu compañero:</p>
            <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
              {availablePartners.map(partner => (
                <button
                  key={partner.id}
                  onClick={() => setSelectedPartner(partner.id)}
                  className={`w-full p-3 rounded-xl text-left transition flex items-center gap-3 ${
                    selectedPartner === partner.id
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <Avatar data={partner.avatar} name={partner.username} size="sm" />
                  <span className="font-medium">{partner.username}</span>
                  {selectedPartner === partner.id && <Icons.Check />}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => { setShowScuderiaModal(false); setScuderiaLogo(null); }}
                className="flex-1 py-3 bg-gray-700 text-white rounded-xl"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateScuderia}
                className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold"
                disabled={!scuderiaName.trim() || !selectedPartner}
              >
                Crear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Shop Screen
const ShopScreen = ({ user, onPurchase }) => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const categories = ['Todos', ...new Set(SHOP_ITEMS.map(i => i.category))];

  const filteredItems = selectedCategory === 'Todos' 
    ? SHOP_ITEMS 
    : SHOP_ITEMS.filter(i => i.category === selectedCategory);

  return (
    <div className="bg-black min-h-screen p-4 pb-24">
      {/* Tokens Balance */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-5 mb-6">
        <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Tus Tokens</p>
        <div className="flex items-baseline gap-2">
          <span className="f1-wide text-4xl text-yellow-400">{user.tokens || 0}</span>
          <span className="text-gray-500">disponibles</span>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-4 hide-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap font-bold text-sm uppercase tracking-wider transition ${
              selectedCategory === cat
                ? 'bg-[#E10600] text-white'
                : 'bg-gray-900 border border-gray-800 text-gray-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-3">
        {filteredItems.map(item => {
          const canAfford = (user.tokens || 0) >= item.price;
          const isImage = item.image.startsWith('http') || item.image.startsWith('/');
          return (
            <div key={item.id} className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
              <div className="h-28 bg-gray-800 flex items-center justify-center">
                {isImage ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-5xl">{item.image}</span>
                )}
              </div>
              <div className="p-3">
                <h4 className="font-bold text-white text-sm mb-2 line-clamp-2">{item.name}</h4>
                <div className="flex items-center justify-between">
                  <span className="text-yellow-400 font-bold">{item.price}</span>
                  <button
                    onClick={() => canAfford && onPurchase(item)}
                    disabled={!canAfford}
                    className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider transition ${
                      canAfford
                        ? 'bg-[#E10600] hover:bg-red-700 text-white'
                        : 'bg-gray-800 text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    Canjear
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Profile Screen
const ProfileScreen = ({ user, predictions, onLogout, onUpdateUser }) => {
  const [editing, setEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(user.username);

  const totalPoints = predictions
    .filter(p => p.userId === user.id)
    .reduce((sum, p) => sum + (p.points || 0), 0);

  const handleSave = () => {
    if (newUsername.trim()) {
      onUpdateUser({ ...user, username: newUsername });
      setEditing(false);
    }
  };

  const handleAvatarChange = (newAvatar) => {
    onUpdateUser({ ...user, avatar: newAvatar });
  };

  return (
    <div className="bg-black min-h-screen p-4 pb-24">
      {/* Profile Card */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-6 text-center">
        <div className="flex justify-center mb-4">
          <ImageUploader 
            currentImage={user.avatar} 
            onImageChange={handleAvatarChange}
            size="xl"
            label="Cambiar avatar"
          />
        </div>
        {editing ? (
          <div className="flex gap-2 justify-center">
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="bg-gray-800 border border-gray-700 px-4 py-2 rounded-lg text-white"
            />
            <button onClick={handleSave} className="bg-[#E10600] px-4 py-2 rounded-lg">
              <Icons.Check />
            </button>
          </div>
        ) : (
          <button onClick={() => setEditing(true)} className="group">
            <h2 className="text-2xl font-bold text-white group-hover:text-[#E10600] transition">
              {user.username}
            </h2>
          </button>
        )}
        <p className="text-gray-500 mt-1">{user.email}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-center">
          <p className="f1-wide text-2xl text-white">{totalPoints}</p>
          <p className="text-gray-500 text-xs uppercase tracking-wider">Puntos</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-center">
          <p className="f1-wide text-2xl text-yellow-400">{user.tokens || 0}</p>
          <p className="text-gray-500 text-xs uppercase tracking-wider">Tokens</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-center">
          <p className="f1-wide text-2xl text-white">
            {predictions.filter(p => p.userId === user.id).length}
          </p>
          <p className="text-gray-500 text-xs uppercase tracking-wider">Carreras</p>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-3 bg-gray-900 border border-gray-800 hover:border-[#E10600] text-[#E10600] py-4 rounded-lg transition uppercase tracking-wider font-bold"
        >
          <Icons.Logout />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
};

// ==================== DEMO DATA ====================
// Usuarios y datos iniciales vacíos para producción
const DEMO_USER = null;

const DEMO_USERS = [];

const DEMO_PREDICTIONS = [];

const DEMO_LEAGUES = [];

// ==================== MAIN APP ====================
export default function F1PredictorApp() {
  // State
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedRace, setSelectedRace] = useState(null);
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load data from Supabase on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Check for saved session in localStorage
        const savedUserId = localStorage.getItem('unai_user_id');
        
        // Load all users
        const { data: usersData } = await supabase.from('users').select('*');
        if (usersData) setUsers(usersData.map(u => ({
          id: u.id,
          username: u.username,
          email: u.email,
          password: u.password_hash,
          tokens: u.tokens,
          avatar: u.avatar,
          createdAt: u.created_at
        })));

        // Load all predictions
        const { data: predsData } = await supabase.from('predictions').select('*');
        if (predsData) setPredictions(predsData.map(p => ({
          id: p.id,
          userId: p.user_id,
          raceId: p.race_id,
          prediction: p.prediction,
          polePosition: p.pole_position,
          fastestLap: p.fastest_lap,
          points: p.points,
          createdAt: p.created_at
        })));

        // Load leagues with members
        const { data: leaguesData } = await supabase.from('leagues').select('*');
        const { data: membersData } = await supabase.from('league_members').select('*');
        const { data: scuderiasData } = await supabase.from('scuderias').select('*');
        
        if (leaguesData) {
          const leaguesWithMembers = leaguesData.map(l => ({
            id: l.id,
            name: l.name,
            creatorId: l.creator_id,
            inviteCode: l.invite_code,
            pool: l.pool_enabled ? { amount: l.pool_amount, enabled: true } : null,
            logo: l.logo,
            members: membersData?.filter(m => m.league_id === l.id).map(m => m.user_id) || [],
            scuderias: scuderiasData?.filter(s => s.league_id === l.id).map(s => ({
              id: s.id,
              name: s.name,
              member1: s.member1_id,
              member2: s.member2_id,
              logo: s.logo
            })) || [],
            createdAt: l.created_at
          }));
          setLeagues(leaguesWithMembers);
        }

        // Restore session
        if (savedUserId && usersData) {
          const user = usersData.find(u => u.id === savedUserId);
          if (user) setCurrentUser({
            id: user.id,
            username: user.username,
            email: user.email,
            password: user.password_hash,
            tokens: user.tokens,
            avatar: user.avatar,
            createdAt: user.created_at
          });
        }
      } catch (e) {
        console.error('Error loading data:', e);
      }
      setLoading(false);
    };
    loadData();
  }, []);

  // Auth handlers
  const handleLogin = async (form) => {
    // Buscar usuario directo en Supabase
    const { data: userData, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', form.username)
      .eq('password_hash', form.password)
      .single();
    
    if (error || !userData) {
      alert('Usuario o contraseña incorrectos');
      return;
    }
    
    const user = {
      id: userData.id,
      username: userData.username,
      email: userData.email,
      password: userData.password_hash,
      tokens: userData.tokens,
      avatar: userData.avatar,
      createdAt: userData.created_at
    };
    
    setCurrentUser(user);
    // Asegurar que vamos a home
    setActiveTab('home');
    setShowProfile(false);
    // Actualizar lista de usuarios si no existe
    if (!users.find(u => u.id === user.id)) {
      setUsers([...users, user]);
    }
    localStorage.setItem('unai_user_id', user.id);
  };

  const handleRegister = async (form) => {
    // Verificar en Supabase si el usuario ya existe
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('username', form.username)
      .single();
    
    if (existingUser) {
      alert('El usuario ya existe');
      return;
    }
    
    const colors = [
      ['#E8002D', '#FF6B6B'], ['#3671C6', '#6692FF'], ['#FF8000', '#FFB347'],
      ['#229971', '#27F4D2'], ['#FF87BC', '#FFB6C1'], ['#52E252', '#90EE90'],
      ['#8B5CF6', '#A78BFA'], ['#EC4899', '#F472B6']
    ];
    const emojis = ['🏎️', '🏁', '🔥', '⚡', '🌟', '🎯', '🚀', '💪', '🦁', '🐺'];
    const randomColors = colors[Math.floor(Math.random() * colors.length)];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    const avatar = { type: 'gradient', colors: randomColors, emoji: randomEmoji };

    console.log('Intentando crear usuario en Supabase...');
    
    const { data, error } = await supabase.from('users').insert({
      username: form.username,
      email: form.email,
      password_hash: form.password,
      tokens: 0,
      avatar: avatar
    }).select().single();

    console.log('Respuesta Supabase:', { data, error });

    if (error) {
      console.error('Error Supabase:', error);
      alert('Error al crear usuario: ' + error.message);
      return;
    }

    if (!data) {
      alert('Error: No se pudo crear el usuario');
      return;
    }

    const newUser = {
      id: data.id,
      username: data.username,
      email: data.email,
      password: data.password_hash,
      tokens: data.tokens,
      avatar: data.avatar,
      createdAt: data.created_at
    };
    
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    localStorage.setItem('unai_user_id', data.id);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('unai_user_id');
  };

  // Prediction handlers
  const handleSavePrediction = async (raceId, predictionData) => {
    const { prediction, polePosition, fastestLap } = predictionData;
    const existing = predictions.find(p => p.raceId === raceId && p.userId === currentUser.id);
    
    if (existing) {
      const { error } = await supabase.from('predictions').update({
        prediction: prediction,
        pole_position: polePosition,
        fastest_lap: fastestLap
      }).eq('id', existing.id);

      if (!error) {
        setPredictions(predictions.map(p => 
          p.id === existing.id ? { ...p, prediction, polePosition, fastestLap } : p
        ));
      }
    } else {
      const { data, error } = await supabase.from('predictions').insert({
        user_id: currentUser.id,
        race_id: raceId,
        prediction: prediction,
        pole_position: polePosition,
        fastest_lap: fastestLap,
        points: 0
      }).select().single();

      if (!error && data) {
        const newPrediction = {
          id: data.id,
          userId: data.user_id,
          raceId: data.race_id,
          prediction: data.prediction,
          polePosition: data.pole_position,
          fastestLap: data.fastest_lap,
          points: data.points,
          createdAt: data.created_at
        };
        setPredictions([...predictions, newPrediction]);
      }
    }
  };

  // League handlers
  const handleCreateLeague = async (data) => {
    let logo = data.logo;
    
    if (!logo) {
      const colors = [
        ['#E8002D', '#FF6B6B'], ['#3671C6', '#6692FF'], ['#FF8000', '#FFB347'],
        ['#229971', '#27F4D2'], ['#FF87BC', '#FFB6C1'], ['#52E252', '#90EE90']
      ];
      const emojis = ['🏆', '🏎️', '🔥', '⚡', '🌟', '🎯', '🚀', '💪'];
      const randomColors = colors[Math.floor(Math.random() * colors.length)];
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      logo = { type: 'gradient', colors: randomColors, emoji: randomEmoji };
    }

    const inviteCode = generateInviteCode();
    
    const { data: leagueData, error } = await supabase.from('leagues').insert({
      name: data.name,
      creator_id: currentUser.id,
      invite_code: inviteCode,
      pool_amount: data.pool?.amount || 0,
      pool_enabled: data.pool?.enabled || false,
      logo: logo
    }).select().single();

    if (error) {
      alert('Error al crear liga: ' + error.message);
      return;
    }

    // Add creator as member
    await supabase.from('league_members').insert({
      league_id: leagueData.id,
      user_id: currentUser.id
    });

    const newLeague = {
      id: leagueData.id,
      name: leagueData.name,
      creatorId: leagueData.creator_id,
      members: [currentUser.id],
      inviteCode: leagueData.invite_code,
      pool: leagueData.pool_enabled ? { amount: leagueData.pool_amount, enabled: true } : null,
      logo: leagueData.logo,
      scuderias: [],
      createdAt: leagueData.created_at
    };
    setLeagues([...leagues, newLeague]);
  };

  const handleJoinLeague = async (code) => {
    const league = leagues.find(l => l.inviteCode === code);
    if (!league) {
      alert('Código inválido');
      return;
    }
    if (league.members.includes(currentUser.id)) {
      alert('Ya eres miembro de esta liga');
      return;
    }

    const { error } = await supabase.from('league_members').insert({
      league_id: league.id,
      user_id: currentUser.id
    });

    if (!error) {
      setLeagues(leagues.map(l => 
        l.id === league.id ? { ...l, members: [...l.members, currentUser.id] } : l
      ));
    }
  };

  const handleUpdateLeague = async (updatedLeague) => {
    // Update league in Supabase
    await supabase.from('leagues').update({
      name: updatedLeague.name,
      pool_amount: updatedLeague.pool?.amount || 0,
      pool_enabled: updatedLeague.pool?.enabled || false,
      logo: updatedLeague.logo
    }).eq('id', updatedLeague.id);

    // Handle scuderias
    for (const scuderia of updatedLeague.scuderias || []) {
      const existing = leagues.find(l => l.id === updatedLeague.id)?.scuderias?.find(s => s.id === scuderia.id);
      if (!existing) {
        await supabase.from('scuderias').insert({
          id: scuderia.id,
          league_id: updatedLeague.id,
          name: scuderia.name,
          member1_id: scuderia.member1,
          member2_id: scuderia.member2,
          logo: scuderia.logo
        });
      }
    }

    setLeagues(leagues.map(l => l.id === updatedLeague.id ? updatedLeague : l));
  };

  // Shop handler
  const handlePurchase = async (item) => {
    if ((currentUser.tokens || 0) < item.price) return;
    
    const newTokens = (currentUser.tokens || 0) - item.price;
    
    await supabase.from('users').update({ tokens: newTokens }).eq('id', currentUser.id);
    
    const updatedUser = { ...currentUser, tokens: newTokens };
    setCurrentUser(updatedUser);
    setUsers(users.map(u => u.id === currentUser.id ? updatedUser : u));
    alert(`¡Has canjeado: ${item.name}!`);
  };

  // Update user
  const handleUpdateUser = async (updatedUser) => {
    await supabase.from('users').update({
      username: updatedUser.username,
      avatar: updatedUser.avatar,
      tokens: updatedUser.tokens
    }).eq('id', updatedUser.id);

    setCurrentUser(updatedUser);
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🏎️</div>
          <p className="text-white">Cargando...</p>
        </div>
      </div>
    );
  }

  // Render
  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} onRegister={handleRegister} />;
  }

  if (selectedRace) {
    const existingPrediction = predictions.find(
      p => p.raceId === selectedRace.id && p.userId === currentUser.id
    );
    return (
      <PredictionScreen
        race={selectedRace}
        drivers={F1_DRIVERS_2026}
        existingPrediction={existingPrediction}
        onSave={(predictionData) => handleSavePrediction(selectedRace.id, predictionData)}
        onBack={() => setSelectedRace(null)}
      />
    );
  }

  if (selectedLeague) {
    return (
      <LeagueDetailScreen
        league={selectedLeague}
        users={users}
        predictions={predictions}
        races={F1_CALENDAR_2026}
        currentUser={currentUser}
        onBack={() => setSelectedLeague(null)}
        onUpdateLeague={handleUpdateLeague}
      />
    );
  }

  if (showProfile) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Header 
          title="Perfil" 
          showBack 
          onBack={() => setShowProfile(false)} 
        />
        <ProfileScreen
          user={currentUser}
          predictions={predictions}
          onLogout={handleLogout}
          onUpdateUser={handleUpdateUser}
        />
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeScreen
            user={currentUser}
            predictions={predictions}
            races={F1_CALENDAR_2026}
            leagues={leagues}
            onSelectRace={setSelectedRace}
          />
        );
      case 'calendar':
        return (
          <CalendarScreen
            races={F1_CALENDAR_2026}
            predictions={predictions}
            userId={currentUser.id}
            onSelectRace={setSelectedRace}
          />
        );
      case 'rankings':
        return (
          <RankingsScreen
            users={users}
            predictions={predictions}
            races={F1_CALENDAR_2026}
          />
        );
      case 'leagues':
        return (
          <LeaguesScreen
            user={currentUser}
            leagues={leagues}
            users={users}
            onCreateLeague={handleCreateLeague}
            onJoinLeague={handleJoinLeague}
            onSelectLeague={setSelectedLeague}
          />
        );
      case 'shop':
        return (
          <ShopScreen
            user={currentUser}
            onPurchase={handlePurchase}
          />
        );
      default:
        return null;
    }
  };

  const titles = {
    home: 'UNAI App',
    calendar: 'Calendario 2026',
    rankings: 'Rankings',
    leagues: 'Ligas',
    shop: 'Tienda'
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header
        title={titles[activeTab]}
        rightAction={
          <button
            onClick={() => setShowProfile(true)}
            className="w-10 h-10 rounded-full overflow-hidden"
          >
            <Avatar data={currentUser.avatar} name={currentUser.username} size="sm" className="w-10 h-10" />
          </button>
        }
      />
      {renderContent()}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </div>
  );
}
