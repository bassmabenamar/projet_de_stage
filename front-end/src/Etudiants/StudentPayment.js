import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, CheckCircle2, Clock, AlertCircle, 
  Download, Filter, Receipt, ArrowUpRight, 
  X, Wallet, ShieldCheck, Printer, Share2, User, Mail, Phone
} from 'lucide-react';
import Navbar from './Navbar';
import api from './api';
import jsPDF from 'jspdf';

const StudentPayment = () => {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  
  const [userInfo, setUserInfo] = useState({
    nom: '',
    prenom: '',
    email: '',
    phone: '',
    classe: '',
    biographie: '',
    photo: null,
    role: 'Étudiant'
  });

  const schoolInfo = {
    name: "Amity International School Tanger",
    address: "Rue Ibn Achir N°03, Quartier Nzaha Souryenne",
    city: "Tanger 90000, Maroc",
    phone: "+212 5 39 32 63 00",
    email: "info@amitytanger.com",
    website: "www.amitytanger.com"
  };

  useEffect(() => {
    async function getUserProfile() {
      try {
        const res = await api.get("/student/profile");
        const profileData = res.data?.data || res.data;
        
        setUserInfo({
          nom: profileData.user?.nom || profileData.nom || "",
          prenom: profileData.user?.prenom || profileData.prenom || "",
          email: profileData.user?.email || profileData.email || "",
          phone: profileData.user?.phone || profileData.phone || profileData.tel || "",
          classe: profileData.classe?.nom || profileData.classe || "",
          biographie: profileData.user?.biographie || profileData.biographie || "",
          photo: profileData.user?.photo || profileData.photo || null,
          role: profileData.role || 'Étudiant'
        });
      } catch (error) {
        console.error("Erreur chargement profil:", error);
        setUserInfo({
          nom: 'Benani',
          prenom: 'Ahmed',
          email: 'ahmed.benani@etu.um5.ac.ma',
          phone: '+212 6 12 34 56 78',
          classe: 'Master 2',
          biographie: 'Étudiant en Master Informatique',
          photo: null,
          role: 'Étudiant'
        });
      }
    }
    getUserProfile();
  }, []);

  useEffect(() => {
    const getPayments = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await api.get('/student/payments');
        
        let paymentsData = [];
        if (response.data?.data && Array.isArray(response.data.data)) {
          paymentsData = response.data.data;
        } else if (Array.isArray(response.data)) {
          paymentsData = response.data;
        } else if (response.data?.payments && Array.isArray(response.data.payments)) {
          paymentsData = response.data.payments;
        } else {
          paymentsData = [];
        }
        
        setPayments(paymentsData);
      } catch (error) {
        console.error("Erreur Backend:", error);
        setError(error.response?.data?.message || "Impossible de charger les paiements");
        setPayments([]);
      } finally {
        setLoading(false);
      }
    };
    getPayments();
  }, []);

  const filteredPayments = payments.filter(payment => {
    if (filterStatus === 'all') return true;
    const status = (payment.status || '').toLowerCase();
    if (filterStatus === 'paid') return status === 'payé' || status === 'complété' || status === 'completed' || status === 'paid';
    if (filterStatus === 'pending') return status === 'en_attente' || status === 'pending';
    return true;
  });

  // ✅ Totaux corrigés
  const totalPaid = Array.isArray(payments) && payments.length > 0
    ? payments
        .filter(p => {
          const status = (p.status || '').toLowerCase();
          return status === 'payé' || status === 'complété' || status === 'completed' || status === 'paid';
        })
        .reduce((acc, curr) => {
          const amount = parseFloat(curr.amount || curr.montant || 0);
          return acc + (isNaN(amount) ? 0 : amount);
        }, 0)
    : 0;

  const totalPending = Array.isArray(payments) && payments.length > 0
    ? payments
        .filter(p => {
          const status = (p.status || '').toLowerCase();
          return status === 'en_attente' || status === 'pending';
        })
        .reduce((acc, curr) => {
          const amount = parseFloat(curr.amount || curr.montant || 0);
          return acc + (isNaN(amount) ? 0 : amount);
        }, 0)
    : 0;

  const lastTransaction = payments.length > 0 && payments[0] 
    ? `${(payments[0].amount || payments[0].montant || 0).toLocaleString()} MAD`
    : "0 MAD";

  const getNextPaymentDate = () => {
    if (payments.length === 0) return "Non programmé";
    const pendingPayments = payments.filter(p => {
      const status = (p.status || '').toLowerCase();
      return status === 'en_attente' || status === 'pending';
    });
    if (pendingPayments.length > 0 && pendingPayments[0].date) {
      return new Date(pendingPayments[0].date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    }
    return "15 Juin, 2024";
  };

  const generatePDF = (payment) => {
    try {
      const doc = new jsPDF();
      const primaryColor = [0, 35, 102];
      const accentColor = [255, 107, 53];
      
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(0, 0, 210, 55, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(26);
      doc.setFont('helvetica', 'bold');
      doc.text('REÇU OFFICIEL', 105, 28, { align: 'center' });
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`N° FACTURE: INV-${payment.id || '000000'}`, 105, 42, { align: 'center' });
      doc.text(`N° REÇU: REC-${payment.id || '000000'}`, 105, 50, { align: 'center' });
      
      const currentDate = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
      doc.setTextColor(80, 80, 80);
      doc.setFontSize(9);
      doc.text(`Date d'émission: ${currentDate}`, 150, 68);
      
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('Établissement', 20, 85);
      
      doc.setTextColor(80, 80, 80);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text(schoolInfo.name, 20, 93);
      doc.text(schoolInfo.address, 20, 101);
      doc.text(schoolInfo.city, 20, 109);
      doc.text(`Tél: ${schoolInfo.phone}`, 20, 117);
      doc.text(`Email: ${schoolInfo.email}`, 20, 125);
      
      doc.line(20, 133, 190, 133);
      
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('Facturé à', 20, 148);
      
      doc.setTextColor(80, 80, 80);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      
      const fullName = `${userInfo.prenom} ${userInfo.nom}`.trim();
      doc.text(`Nom complet: ${fullName || 'Étudiant'}`, 20, 158);
      doc.text(`Email: ${userInfo.email}`, 20, 166);
      doc.text(`Téléphone: ${userInfo.phone}`, 20, 174);
      if (userInfo.classe) {
        doc.text(`Niveau: ${userInfo.classe}`, 20, 182);
      }
      
      doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(20, 195, 170, 85, 5, 5, 'FD');
      
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('DÉTAILS DU PAIEMENT', 35, 212);
      
      doc.setTextColor(80, 80, 80);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      
      doc.text('Service:', 35, 230);
      doc.text(`${payment.type || payment.description || 'Frais de scolarité'}`, 100, 230);
      
      doc.text('Méthode de paiement:', 35, 245);
      doc.text(`${payment.method || payment.payment_method || 'Carte Bancaire'}`, 100, 245);
      
      doc.text('Date de transaction:', 35, 260);
      doc.text(`${payment.date || new Date().toLocaleDateString()}`, 100, 260);
      
      doc.text('Statut:', 35, 275);
      const isPaid = (payment.status || '').toLowerCase() === 'payé' || 
                     (payment.status || '').toLowerCase() === 'complété' || 
                     (payment.status || '').toLowerCase() === 'completed' ||
                     (payment.status || '').toLowerCase() === 'paid';
      if (isPaid) {
        doc.setTextColor(16, 185, 129);
      } else {
        doc.setTextColor(234, 88, 12);
      }
      doc.text(`${payment.status || 'En attente'}`, 100, 275);
      
      doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
      doc.roundedRect(20, 295, 170, 30, 5, 5, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('TOTAL TTC:', 35, 315);
      doc.text(`${(payment.amount || payment.montant || 0).toLocaleString()} MAD`, 175, 315, { align: 'right' });
      
      doc.setTextColor(150, 150, 150);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'italic');
      doc.text('Ce document fait office de reçu officiel et justificatif de paiement.', 105, 340, { align: 'center' });
      doc.text(`Généré automatiquement le ${new Date().toLocaleString()}`, 105, 348, { align: 'center' });
      doc.text(`${userInfo.email} | ${userInfo.prenom} ${userInfo.nom}`, 105, 356, { align: 'center' });
      
      const studentId = `${userInfo.prenom}_${userInfo.nom}`.toLowerCase().replace(/\s/g, '_');
      doc.save(`RECU_${studentId}_${payment.id || 'payment'}_${Date.now()}.pdf`);
      
      showNotification('✅ PDF généré avec succès !');
    } catch (error) {
      console.error('Erreur PDF:', error);
      showNotification('❌ Erreur lors de la génération du PDF', true);
    }
  };

  const showNotification = (message, isError = false) => {
    const notification = document.createElement('div');
    notification.innerHTML = message;
    notification.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: ${isError ? '#ef4444' : '#10b981'};
      color: white;
      padding: 12px 24px;
      border-radius: 12px;
      z-index: 9999;
      font-weight: bold;
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);
      animation: slideIn 0.3s ease-out;
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  };

  const handleDownloadPDF = (payment) => {
    generatePDF(payment);
  };

  const handlePrint = (payment) => {
    const fullName = `${userInfo.prenom} ${userInfo.nom}`.trim();
    const currentDate = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    const isPaid = (payment.status || '').toLowerCase() === 'payé' || 
                   (payment.status || '').toLowerCase() === 'complété' || 
                   (payment.status || '').toLowerCase() === 'completed' ||
                   (payment.status || '').toLowerCase() === 'paid';
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Reçu #${payment.id} - ${fullName}</title>
        <meta charset="UTF-8">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: 'Segoe UI', Arial, sans-serif;
            padding: 40px;
            max-width: 900px;
            margin: 0 auto;
            background: white;
          }
          .header {
            background: linear-gradient(135deg, #002366 0%, #001845 100%);
            color: white;
            padding: 35px;
            text-align: center;
            border-radius: 20px;
            margin-bottom: 30px;
          }
          .header h1 { font-size: 32px; margin-bottom: 10px; }
          .header p { font-size: 12px; opacity: 0.9; }
          .info-section {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
            padding: 20px;
            background: #f8fafc;
            border-radius: 15px;
            flex-wrap: wrap;
            gap: 20px;
          }
          .info-box { flex: 1; min-width: 250px; }
          .info-box h3 { 
            color: #002366; 
            margin-bottom: 15px; 
            font-size: 14px; 
            border-left: 3px solid #ff6b35; 
            padding-left: 10px;
          }
          .info-box p { margin: 8px 0; font-size: 12px; color: #475569; }
          .info-box p strong { color: #002366; }
          .detail-row {
            display: flex;
            justify-content: space-between;
            margin: 10px 0;
            padding: 15px;
            background: white;
            border-radius: 10px;
            border: 1px solid #e2e8f0;
          }
          .detail-row strong { color: #002366; }
          .total {
            background: linear-gradient(135deg, #ff6b35 0%, #ff9a44 100%);
            color: white;
            padding: 25px;
            border-radius: 15px;
            margin-top: 30px;
            text-align: center;
          }
          .total .amount { font-size: 32px; font-weight: bold; margin-top: 10px; }
          .footer {
            margin-top: 50px;
            text-align: center;
            font-size: 11px;
            color: #94a3b8;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
          }
          .status-paid {
            color: #10b981;
            font-weight: bold;
          }
          .status-pending {
            color: #ea580c;
            font-weight: bold;
          }
          @media print {
            body { margin: 0; padding: 20px; }
            .header, .total { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>REÇU OFFICIEL</h1>
          <p>N° FACTURE: INV-${payment.id} | N° REÇU: REC-${payment.id}</p>
          <p style="margin-top: 10px; font-size: 11px;">Date d'émission: ${currentDate}</p>
        </div>
        
        <div class="info-section">
          <div class="info-box">
            <h3>🏫 ÉTABLISSEMENT</h3>
            <p><strong>${schoolInfo.name}</strong></p>
            <p>${schoolInfo.address}</p>
            <p>${schoolInfo.city}</p>
            <p>📞 ${schoolInfo.phone}</p>
            <p>✉️ ${schoolInfo.email}</p>
          </div>
          <div class="info-box">
            <h3>👤 ÉTUDIANT</h3>
            <p><strong>${fullName}</strong></p>
            <p>📧 ${userInfo.email}</p>
            <p>📱 ${userInfo.phone || '+212 6 12 34 56 78'}</p>
            ${userInfo.classe ? `<p>📚 Niveau: ${userInfo.classe}</p>` : ''}
          </div>
        </div>
        
        <h3 style="color:#002366; margin: 20px 0 15px 0;">📋 Détails du paiement</h3>
        
        <div class="detail-row"><strong>Service:</strong> <span>${payment.type || payment.description || 'Frais de scolarité'}</span></div>
        <div class="detail-row"><strong>Méthode de paiement:</strong> <span>${payment.method || payment.payment_method || 'Carte Bancaire'}</span></div>
        <div class="detail-row"><strong>Date de transaction:</strong> <span>${payment.date || new Date().toLocaleDateString()}</span></div>
        <div class="detail-row"><strong>Statut:</strong> <span class="${isPaid ? 'status-paid' : 'status-pending'}">${isPaid ? '✓ PAYÉ' : '⏳ EN ATTENTE'}</span></div>
        
        <div class="total">
          <div style="font-size: 16px;">MONTANT TOTAL TTC</div>
          <div class="amount">${(payment.amount || payment.montant || 0).toLocaleString()} MAD</div>
        </div>
        
        <div class="footer">
          <p>Ce document est un justificatif officiel de paiement.</p>
          <p>Amity International School Tanger - Tous droits réservés</p>
          <p>Généré le ${new Date().toLocaleString()} | ${userInfo.email}</p>
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleShare = async (payment) => {
    const fullName = `${userInfo.prenom} ${userInfo.nom}`.trim();
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Reçu #${payment.id} - ${fullName}`,
          text: `Paiement de ${(payment.amount || payment.montant || 0)} MAD`,
        });
      } catch (err) {}
    } else {
      navigator.clipboard.writeText(`Reçu #${payment.id} - ${(payment.amount || payment.montant || 0)} MAD`);
      showNotification('✅ Lien copié !');
    }
  };

  const handleExportAll = () => {
    const fullName = `${userInfo.prenom} ${userInfo.nom}`.trim();
    const headers = ['ID', 'Description', 'Date', 'Montant', 'Statut', 'Méthode'];
    const rows = payments.map(p => [
      p.id, p.type || 'Paiement', p.date, `${p.amount || p.montant || 0}`, p.status, p.method || 'CB'
    ]);
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob(["\uFEFF" + csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `transactions_${fullName.replace(/\s/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
    showNotification('✅ Export CSV terminé !');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-bounce">💰</div>
          <div className="text-2xl font-black text-[#002366] animate-pulse">Chargement des données...</div>
          <p className="text-slate-400 text-sm mt-2">Veuillez patienter</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="text-center p-8 bg-red-50 rounded-3xl max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 font-bold text-lg mb-2">Erreur de chargement</p>
          <p className="text-slate-600">{error}</p>
          <button onClick={() => window.location.reload()} className="mt-6 px-6 py-3 bg-[#002366] text-white rounded-xl font-bold hover:bg-[#1e3a8a] transition-all">
            🔄 Réessayer
          </button>
        </div>
      </div>
    );
  }

  const fullName = `${userInfo.prenom} ${userInfo.nom}`.trim();
  const initials = `${userInfo.prenom?.[0] || ''}${userInfo.nom?.[0] || ''}`.toUpperCase();

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-[#1E293B]">
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
      `}</style>
      
      <main className="flex-1 flex flex-col min-w-0">
        <Navbar />

        <div className="flex-1 overflow-y-auto p-6 md:p-10 relative">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-[1400px] mx-auto">
            
            {/* Header avec Glass Gradient Icon */}
            <motion.div variants={itemVariants} className="flex justify-between items-start mb-12 flex-wrap gap-6">
              <div>
                <h1 className="text-5xl font-black text-[#002366] tracking-tight mb-2">Espace Finance</h1>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.3em]">Compte Vérifié • {new Date().getFullYear()}</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-[#002366] shadow-sm hover:shadow-md transition-all cursor-pointer">
                  <Wallet size={24} />
                </div>
                <div className="w-14 h-14 rounded-2xl bg-[#002366] text-white flex items-center justify-center shadow-lg shadow-blue-900/20 cursor-pointer">
                  <ShieldCheck size={24} />
                </div>
              </div>
            </motion.div>

            {/* Premium Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              <StatusCard 
                title="Solde Réglé" 
                amount={`${totalPaid.toLocaleString()} MAD`} 
                icon={<CheckCircle2 className="w-6 h-6 text-emerald-500" />} 
                color="emerald" 
              />
              <StatusCard 
                title="En Attente" 
                amount={`${totalPending.toLocaleString()} MAD`} 
                icon={<Clock className="w-6 h-6 text-orange-500" />} 
                color="orange" 
              />
              <StatusCard 
                title="Dernière Transaction" 
                amount={lastTransaction}
                icon={<AlertCircle className="w-6 h-6 text-blue-500" />} 
                color="blue" 
              />
              <StatusCard 
                title="Prochain Paiement" 
                amount={getNextPaymentDate()}
                icon={<CreditCard className="w-6 h-6 text-purple-500" />} 
                color="purple" 
              />
            </div>

            {/* Table Container */}
            <motion.div variants={itemVariants} className="bg-white rounded-[45px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] border border-slate-50 overflow-hidden mb-12">
              <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6 bg-gradient-to-r from-white to-slate-50/50">
                <div>
                  <h3 className="text-2xl font-black text-[#002366] mb-1">Historique des Transactions</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Relevés du semestre actuel</p>
                </div>
                <div className="flex gap-3">
                  <select 
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black text-slate-500 hover:border-orange-200 transition-all uppercase tracking-widest shadow-sm cursor-pointer"
                    value={filterStatus}
                  >
                    <option value="all">📋 Tous</option>
                    <option value="paid">✅ Payés</option>
                    <option value="pending">⏳ En attente</option>
                  </select>
                  <button 
                    onClick={handleExportAll}
                    className="flex items-center gap-2 px-6 py-3 bg-[#002366] text-white rounded-2xl text-[10px] font-black hover:bg-[#1e3a8a] transition-all uppercase tracking-widest shadow-lg shadow-blue-900/20"
                  >
                    <Download className="w-4 h-4" /> Tout Exporter
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/50">
                    <tr className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
                      <th className="px-10 py-6">ID</th>
                      <th className="px-10 py-6">Description</th>
                      <th className="px-10 py-6">Date</th>
                      <th className="px-10 py-6">Montant</th>
                      <th className="px-10 py-6">Statut</th>
                      <th className="px-10 py-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredPayments.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center py-12 text-slate-400">
                          <div className="flex flex-col items-center gap-3">
                            <Receipt className="w-16 h-16 text-slate-300" />
                            <p className="font-bold">Aucun paiement trouvé</p>
                            <p className="text-xs">Essayez de changer les filtres</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredPayments.map((pay, idx) => {
                        const isPaid = (pay.status || '').toLowerCase() === 'payé' || 
                                       (pay.status || '').toLowerCase() === 'complété' || 
                                       (pay.status || '').toLowerCase() === 'completed' ||
                                       (pay.status || '').toLowerCase() === 'paid';
                        return (
                          <tr 
                            key={pay.id || idx} 
                            className="hover:bg-[#F8FAFC] transition-all group cursor-pointer" 
                            onClick={() => setSelectedPayment(pay)}
                          >
                            <td className="px-10 py-7 text-xs font-bold text-slate-400 group-hover:text-orange-500">
                              #{pay.id || idx + 1}
                            </td>
                            <td className="px-10 py-7">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-[#002366] group-hover:scale-110 group-hover:bg-[#002366] group-hover:text-white transition-all duration-300 shadow-sm">
                                  <Receipt className="w-5 h-5" />
                                </div>
                                <span className="text-sm font-black text-[#002366]">
                                  {pay.type || pay.description || 'Paiement'}
                                </span>
                              </div>
                            </td>
                            <td className="px-10 py-7 text-sm font-bold text-slate-500">
                              {pay.date || new Date().toLocaleDateString()}
                            </td>
                            <td className="px-10 py-7 text-sm font-black text-[#002366]">
                              {(pay.amount || pay.montant || 0).toLocaleString()} MAD
                            </td>
                            <td className="px-10 py-7">
                              <span className={`text-[9px] font-black uppercase px-4 py-2 rounded-xl tracking-wider border ${
                                isPaid ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-orange-50 text-orange-600 border-orange-100'
                              }`}>
                                {pay.status || 'En attente'}
                              </span>
                            </td>
                            <td className="px-10 py-7 text-right">
                              <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-orange-500 group-hover:text-white text-slate-400 transition-all inline-flex">
                                <ArrowUpRight className="w-4 h-4" />
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Résumé */}
              {filteredPayments.length > 0 && (
                <div className="p-6 border-t border-slate-100 bg-slate-50/30">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">
                      Affichage de <strong className="text-[#002366]">{filteredPayments.length}</strong> sur <strong className="text-[#002366]">{payments.length}</strong> transactions
                    </span>
                    <span className="text-sm font-bold text-[#002366]">
                      Total: {filteredPayments.reduce((sum, p) => sum + parseFloat(p.amount || p.montant || 0), 0).toLocaleString()} MAD
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* Modal Premium */}
          <AnimatePresence>
            {selectedPayment && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }} 
                  onClick={() => setSelectedPayment(null)} 
                  className="absolute inset-0 bg-[#002366]/40 backdrop-blur-xl" 
                />
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0, y: 20 }} 
                  animate={{ scale: 1, opacity: 1, y: 0 }} 
                  exit={{ scale: 0.9, opacity: 0, y: 20 }} 
                  className="relative bg-white w-full max-w-lg rounded-[40px] shadow-3xl overflow-hidden"
                >
                  <div className="p-10">
                    <div className="flex justify-between items-start mb-10">
                      <div className="w-16 h-16 bg-blue-50 rounded-[22px] flex items-center justify-center text-[#002366]">
                        <Receipt size={32} />
                      </div>
                      <button 
                        onClick={() => setSelectedPayment(null)} 
                        className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <h2 className="text-3xl font-black text-[#002366] mb-1">Détails du Reçu</h2>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">Document Officiel • #{selectedPayment.id}</p>

                    <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-4 mb-6">
                      <div className="flex items-center gap-3">
                        <User size={16} className="text-[#002366]" />
                        <span className="text-sm font-bold text-[#002366]">{fullName}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <Mail size={16} className="text-slate-400" />
                        <span className="text-xs text-slate-500">{userInfo.email}</span>
                      </div>
                      {userInfo.phone && (
                        <div className="flex items-center gap-3 mt-2">
                          <Phone size={16} className="text-slate-400" />
                          <span className="text-xs text-slate-500">{userInfo.phone}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-6">
                      <div className="flex justify-between items-center py-4 border-b border-dashed border-slate-100">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Service</span>
                        <span className="text-sm font-black text-[#002366]">{selectedPayment.type || selectedPayment.description || 'Paiement'}</span>
                      </div>
                      <div className="flex justify-between items-center py-4 border-b border-dashed border-slate-100">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Mode de Paiement</span>
                        <span className="text-sm font-black text-[#002366]">{selectedPayment.method || selectedPayment.payment_method || 'Carte Bancaire'}</span>
                      </div>
                      <div className="flex justify-between items-center py-4 border-b border-dashed border-slate-100">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Date</span>
                        <span className="text-sm font-bold text-[#002366]">{selectedPayment.date || new Date().toLocaleDateString()}</span>
                      </div>
                      <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-3xl p-8 flex justify-between items-center mt-6">
                        <span className="text-xs font-black text-[#002366] uppercase tracking-[0.2em]">Montant Total</span>
                        <span className="text-3xl font-black text-orange-500">
                          {(selectedPayment.amount || selectedPayment.montant || 0).toLocaleString()} MAD
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-10">
                      <button 
                        onClick={() => handlePrint(selectedPayment)}
                        className="flex flex-col items-center gap-2 p-4 bg-slate-50 rounded-2xl hover:bg-blue-50 hover:text-[#002366] transition-all group"
                      >
                        <Printer size={18} className="text-slate-400 group-hover:text-[#002366]" />
                        <span className="text-[9px] font-black uppercase">Imprimer</span>
                      </button>
                      <button 
                        onClick={() => handleDownloadPDF(selectedPayment)}
                        className="flex flex-col items-center gap-2 p-4 bg-slate-50 rounded-2xl hover:bg-blue-50 hover:text-[#002366] transition-all group"
                      >
                        <Download size={18} className="text-slate-400 group-hover:text-[#002366]" />
                        <span className="text-[9px] font-black uppercase">PDF</span>
                      </button>
                      <button 
                        onClick={() => handleShare(selectedPayment)}
                        className="flex flex-col items-center gap-2 p-4 bg-slate-50 rounded-2xl hover:bg-blue-50 hover:text-[#002366] transition-all group"
                      >
                        <Share2 size={18} className="text-slate-400 group-hover:text-[#002366]" />
                        <span className="text-[9px] font-black uppercase">Partager</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

// Composant StatusCard avec le même style
const StatusCard = ({ title, amount, icon, color }) => {
  const themes = {
    emerald: "bg-emerald-50/50 border-emerald-100 hover:bg-emerald-50 shadow-emerald-200/20",
    orange: "bg-orange-50/50 border-orange-100 hover:bg-orange-50 shadow-orange-200/20",
    blue: "bg-blue-50/50 border-blue-100 hover:bg-blue-50 shadow-blue-200/20",
    purple: "bg-purple-50/50 border-purple-100 hover:bg-purple-50 shadow-purple-200/20"
  };

  return (
    <motion.div 
      whileHover={{ y: -8, scale: 1.02 }} 
      className={`p-10 rounded-[40px] border ${themes[color]} transition-all duration-500 cursor-pointer`}
    >
      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 border border-white">
        {icon}
      </div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{title}</p>
      <h3 className="text-3xl font-black text-[#002366]">{amount}</h3>
    </motion.div>
  );
};

export default StudentPayment;