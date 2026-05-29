import { useState, useRef, useEffect } from "react";

// ============================================================
//  ✏️  CONFIG — Remplace les noms de fichiers de tes communes
//  Mets tous les PNG dans le même dossier que l'application
// ============================================================
const COMMUNES = [
  {
    id: "kinshasa",
    nom: "Kinshasa",
    carteImage: "kinshasa.png",       // ← fichier PNG du design
    qrImage:    "qr-kinshasa.png",    // ← fichier PNG du QR code
    whatsappLien: "https://chat.whatsapp.com/LIEN_KINSHASA",
    cercle: { cx: 0.50, cy: 0.52, r: 0.25 }, // position du cercle dans le design
  },
  {
    id: "lubumbashi",
    nom: "Lubumbashi",
    carteImage: "lubumbashi.png",
    qrImage:    "qr-lubumbashi.png",
    whatsappLien: "https://chat.whatsapp.com/LIEN_LUBUMBASHI",
    cercle: { cx: 0.50, cy: 0.52, r: 0.25 },
  },
  {
    id: "goma",
    nom: "Goma",
    carteImage: "goma.png",
    qrImage:    "qr-goma.png",
    whatsappLien: "https://chat.whatsapp.com/LIEN_GOMA",
    cercle: { cx: 0.50, cy: 0.52, r: 0.25 },
  },
  {
    id: "bukavu",
    nom: "Bukavu",
    carteImage: "bukavu.png",
    qrImage:    "qr-bukavu.png",
    whatsappLien: "https://chat.whatsapp.com/LIEN_BUKAVU",
    cercle: { cx: 0.50, cy: 0.52, r: 0.25 },
  },
  {
    id: "mbuji-mayi",
    nom: "Mbuji-Mayi",
    carteImage: "mbuji-mayi.png",
    qrImage:    "qr-mbuji-mayi.png",
    whatsappLien: "https://chat.whatsapp.com/LIEN_MBUJIMAYI",
    cercle: { cx: 0.50, cy: 0.52, r: 0.25 },
  },
  {
    id: "kisangani",
    nom: "Kisangani",
    carteImage: "kisangani.png",
    qrImage:    "qr-kisangani.png",
    whatsappLien: "https://chat.whatsapp.com/LIEN_KISANGANI",
    cercle: { cx: 0.50, cy: 0.52, r: 0.25 },
  },
];
// ============================================================

// ---- Icônes ----
const IcoWhatsapp = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// ---- Composant Accueil ----
function PageAccueil({ onSelect }) {
  return (
    <div style={s.page}>
      <div style={s.hero}>
        <span style={s.badge}>4e Édition · 18 Juillet 2026</span>
        <h1 style={s.titre}>Forum 10.000 Codeurs</h1>
        <p style={s.sousTitre}>
          Crée ta carte <em>« J'y serai »</em> — choisis ta commune
        </p>
        <div style={{ fontSize: 44, lineHeight: 1 }}>🇨🇩</div>
      </div>

      <div style={s.grille}>
        {COMMUNES.map((c) => (
          <button key={c.id} style={s.communeBtn} onClick={() => onSelect(c)}
            onMouseEnter={e => Object.assign(e.currentTarget.style, { transform: "translateY(-3px)", boxShadow: "0 10px 28px rgba(15,45,94,0.15)", borderColor: "#2a4caa" })}
            onMouseLeave={e => Object.assign(e.currentTarget.style, { transform: "translateY(0)", boxShadow: "0 2px 8px rgba(15,45,94,0.07)", borderColor: "#dde3f0" })}
          >
            <span style={s.communeNom}>{c.nom}</span>
            <span style={{ fontSize: 18, color: "#2a4caa" }}>→</span>
          </button>
        ))}
      </div>

      <div style={s.footer}>🌐 10000codeurs.com/forums</div>
    </div>
  );
}

// ---- Composant Commune ----
function PageCommune({ commune, onRetour }) {
  const canvasRef = useRef(null);
  const [photoSrc, setPhotoSrc] = useState(null);
  const [pret, setPret] = useState(false);
  const [etape, setEtape] = useState(1);

  // Dessiner sur le canvas à chaque changement de photo
  useEffect(() => {
    dessiner(canvasRef.current, commune, photoSrc, setPret, setEtape);
  }, [photoSrc, commune]);

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setEtape(2);
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoSrc(ev.target.result);
    reader.readAsDataURL(file);
  };

  const telecharger = () => {
    const link = document.createElement("a");
    link.download = `carte-jyserai-${commune.id}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.communeHeader}>
        <button style={s.retourBtn} onClick={onRetour}>← Toutes les communes</button>
        <span style={s.badge}>18 Juil 2026</span>
      </div>

      <h2 style={{ ...s.titre, fontSize: 26, marginBottom: 2 }}>J'y serai — {commune.nom}</h2>
      <p style={{ ...s.sousTitre, marginBottom: 20 }}>Forum 10.000 Codeurs · 4e Édition</p>

      {/* Étapes */}
      <div style={s.steps}>
        {["Aperçu", "Ta photo", "Télécharger"].map((label, i) => (
          <span key={i} style={{ ...s.step, ...(etape === i + 1 ? s.stepActive : {}) }}>
            {i + 1}. {label}
          </span>
        ))}
      </div>

      {/* Canvas */}
      <div style={s.canvasWrap}>
        <canvas ref={canvasRef} width={800} height={800} style={{ width: "100%", display: "block" }} />
      </div>

      {/* Upload */}
      <label style={s.uploadZone}>
        <span style={{ fontSize: 26 }}>📷</span>
        <span style={s.uploadText}>Choisir ma photo</span>
        <span style={s.uploadSub}>JPG ou PNG — insérée dans le cadre circulaire</span>
        <input type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhoto} />
      </label>

      {/* Bouton télécharger */}
      <button style={{ ...s.dlBtn, ...(pret ? {} : s.dlBtnOff) }} disabled={!pret} onClick={telecharger}>
        ⬇ Télécharger ma carte
      </button>

      {/* WhatsApp */}
      <div style={s.waSec}>
        <hr style={s.divider} />
        <h3 style={{ ...s.titre, fontSize: 17, marginBottom: 4 }}>Rejoindre le groupe WhatsApp</h3>
        <p style={{ ...s.sousTitre, marginBottom: 16 }}>Scanne le QR code ou clique sur le bouton</p>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div style={s.qrBox}>
            <img src={commune.qrImage} alt={`QR ${commune.nom}`}
              style={{ width: 120, height: 120, objectFit: "contain" }}
              onError={e => { e.currentTarget.parentNode.innerHTML = "<span style='font-size:36px'>📱</span>"; }}
            />
          </div>
          <a href={commune.whatsappLien} target="_blank" rel="noopener noreferrer" style={s.waBtn}
            onMouseEnter={e => (e.currentTarget.style.background = "#1aad4e")}
            onMouseLeave={e => (e.currentTarget.style.background = "#25d366")}
          >
            <IcoWhatsapp />
            Rejoindre le groupe de {commune.nom}
          </a>
        </div>
      </div>

      <div style={s.footer}>🌐 10000codeurs.com/forums</div>
    </div>
  );
}

// ---- Logique Canvas ----
// ORDRE : 1) photo clippée dans le cercle  2) PNG du design par-dessus
// → Le design PNG doit avoir le cercle transparent (ou avec le fond du cadre)
// → La photo apparaît à travers le cercle, avec tout le design bien visible au-dessus
function dessiner(canvas, commune, photoSrc, setPret, setEtape) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const W = canvas.width, H = canvas.height;
  const { cx, cy, r } = commune.cercle;
  const CX = cx * W, CY = cy * H, R = r * W;

  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = "#f5f7fc";
  ctx.fillRect(0, 0, W, H);

  const loadImage = (src) =>
    new Promise((res) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => res(img);
      img.onerror = () => res(null);
      img.src = src;
    });

  (async () => {
    if (photoSrc) {
      // ── ÉTAPE 1 : photo clippée dans le cercle ──
      const photo = await loadImage(photoSrc);
      if (photo) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(CX, CY, R, 0, Math.PI * 2);
        ctx.clip();
        const scale = Math.max((R * 2) / photo.width, (R * 2) / photo.height);
        const sw = photo.width * scale, sh = photo.height * scale;
        ctx.drawImage(photo, CX - sw / 2, CY - sh / 2, sw, sh);
        ctx.restore();
      }
    }

    // ── ÉTAPE 2 : design PNG par-dessus ──
    const banner = await loadImage(commune.carteImage);
    if (banner) {
      ctx.drawImage(banner, 0, 0, W, H);
    } else {
      // Placeholder si le fichier n'est pas encore présent
      ctx.fillStyle = "#1a3d78";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "rgba(255,255,255,0.25)";
      ctx.font = "bold 18px Segoe UI";
      ctx.textAlign = "center";
      ctx.fillText(`Fichier : ${commune.carteImage}`, W / 2, H * 0.1);
      ctx.font = "14px Segoe UI";
      ctx.fillText("Place ce fichier dans le dossier de l'app", W / 2, H * 0.16);
      // Cercle indicatif
      ctx.beginPath();
      ctx.arc(CX, CY, R, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,255,255,0.4)";
      ctx.lineWidth = 3;
      ctx.setLineDash([10, 6]);
      ctx.stroke();
      ctx.fillStyle = "rgba(255,255,255,0.15)";
      ctx.font = "46px serif";
      ctx.fillText("📷", CX, CY + 16);
    }

    if (photoSrc) {
      setPret(true);
      setEtape(3);
    }
  })();
}

// ---- App ----
export default function App() {
  const [commune, setCommune] = useState(null);
  return commune
    ? <PageCommune commune={commune} onRetour={() => setCommune(null)} />
    : <PageAccueil onSelect={setCommune} />;
}

// ---- Styles ----
const s = {
  page: {
    minHeight: "100vh",
    background: "#ffffff",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    color: "#1a1a1a",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0 0 48px",
  },
  hero: { textAlign: "center", padding: "44px 24px 24px", maxWidth: 560 },
  badge: {
    display: "inline-block",
    background: "#f0f4ff",
    border: "1px solid #c7d4f5",
    borderRadius: 20,
    padding: "6px 16px",
    fontSize: 13,
    fontWeight: 600,
    color: "#2a4caa",
    marginBottom: 18,
  },
  titre: { fontSize: 32, fontWeight: 800, margin: "0 0 10px", letterSpacing: "-0.02em", color: "#0f2d5e", textAlign: "center" },
  sousTitre: { fontSize: 15, color: "#5a6a8a", margin: "0 0 16px", lineHeight: 1.5, textAlign: "center" },
  grille: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
    gap: 12,
    width: "100%",
    maxWidth: 680,
    padding: "0 20px",
    boxSizing: "border-box",
  },
  communeBtn: {
    background: "#fff",
    border: "1.5px solid #dde3f0",
    borderRadius: 14,
    padding: "16px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    color: "#0f2d5e",
    transition: "transform .2s, box-shadow .2s, border-color .2s",
    boxShadow: "0 2px 8px rgba(15,45,94,0.07)",
    textAlign: "left",
  },
  communeNom: { fontSize: 16, fontWeight: 700 },
  communeHeader: {
    width: "100%",
    maxWidth: 560,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 20px 8px",
    boxSizing: "border-box",
  },
  retourBtn: {
    background: "none", border: "none", color: "#5a6a8a",
    cursor: "pointer", fontSize: 14, padding: 0,
  },
  steps: { display: "flex", gap: 6, alignItems: "center", marginBottom: 14 },
  step: {
    background: "#f0f4ff", border: "1.5px solid #dde3f0",
    borderRadius: 20, padding: "4px 14px", fontSize: 11, fontWeight: 700, color: "#8a9ab5",
  },
  stepActive: { background: "#0f2d5e", color: "#fff", borderColor: "#0f2d5e" },
  canvasWrap: {
    width: "100%", maxWidth: 460, padding: "0 20px", boxSizing: "border-box",
    borderRadius: 16, overflow: "hidden",
    boxShadow: "0 8px 32px rgba(15,45,94,0.15)",
    border: "1.5px solid #dde3f0", marginBottom: 14,
  },
  uploadZone: {
    width: "100%", maxWidth: 460, margin: "0 20px",
    boxSizing: "border-box",
    border: "2px dashed #c7d4f5", borderRadius: 12, padding: "18px 20px",
    display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
    cursor: "pointer", background: "#f8faff",
    transition: "border-color .2s, background .2s",
  },
  uploadText: { fontSize: 14, fontWeight: 700, color: "#2a4caa" },
  uploadSub: { fontSize: 12, color: "#8a9ab5" },
  dlBtn: {
    display: "flex", alignItems: "center", gap: 8,
    background: "#0f2d5e", color: "#fff",
    border: "none", borderRadius: 12, padding: "13px 24px",
    fontSize: 15, fontWeight: 700, cursor: "pointer",
    width: "calc(100% - 40px)", maxWidth: 460,
    justifyContent: "center", marginTop: 12,
    transition: "background .15s",
  },
  dlBtnOff: { background: "#c5cedf", cursor: "default" },
  waSec: { width: "100%", maxWidth: 460, padding: "0 20px", boxSizing: "border-box" },
  divider: { border: "none", borderTop: "1.5px solid #eef1f8", margin: "24px 0" },
  qrBox: {
    background: "#fff", borderRadius: 12, padding: 10,
    width: 140, height: 140,
    display: "flex", alignItems: "center", justifyContent: "center",
    border: "1.5px solid #dde3f0",
  },
  waBtn: {
    display: "flex", alignItems: "center", gap: 8,
    background: "#25d366", color: "#fff", textDecoration: "none",
    borderRadius: 12, padding: "13px 20px", fontSize: 14, fontWeight: 600,
    width: "100%", justifyContent: "center",
    transition: "background .15s", boxSizing: "border-box",
  },
  footer: {
    marginTop: 40, borderTop: "1.5px solid #eef1f8",
    width: "100%", maxWidth: 560, paddingTop: 16,
    textAlign: "center", fontSize: 12, color: "#aab5cc", letterSpacing: ".04em",
  },
};
