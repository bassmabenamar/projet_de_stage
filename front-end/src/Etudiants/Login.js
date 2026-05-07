import React, { useState } from 'react';
import { 
  GraduationCap, ShieldCheck, BookOpen, User, Users, 
  Mail, Lock, Eye, EyeOff, LogIn, HelpCircle 
} from 'lucide-react';

const Login= () => {
  const [activeRole, setActiveRole] = useState('admin');
  const [showPassword, setShowPassword] = useState(false);

  const roles = [
    { id: 'admin', label: 'Admin', icon: <ShieldCheck size={18} /> },
    { id: 'teacher', label: 'Teacher', icon: <BookOpen size={18} /> },
    { id: 'student', label: 'Student', icon: <User size={18} /> },
    { id: 'parent', label: 'Parent', icon: <Users size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans">
      
      {/* Header Branding */}
      <div className="mb-8 text-center">
        <div className="bg-[#002366] w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <GraduationCap className="text-white" size={32} />
        </div>
        <h1 className="text-[#002366] text-3xl font-bold tracking-tight mb-1">Amity School</h1>
        <p className="text-slate-500 text-[11px] font-semibold uppercase tracking-wider">Portal for Academic Excellence</p>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-[480px] bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-8">
          
          {/* Role Selection */}
          <div className="mb-8">
            <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-4">Select Your Role</label>
            <div className="grid grid-cols-4 gap-2">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setActiveRole(role.id)}
                  className={`flex flex-col items-center justify-center py-3 px-1 rounded-lg border-2 transition-all duration-200 ${
                    activeRole === role.id 
                    ? "border-[#002366] bg-blue-50/30 text-[#002366]" 
                    : "border-slate-100 bg-white text-slate-400 hover:border-slate-200"
                  }`}
                >
                  <div className={`mb-1 ${activeRole === role.id ? "text-[#002366]" : "text-slate-300"}`}>
                    {role.icon}
                  </div>
                  <span className="text-[10px] font-bold">{role.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form className="space-y-5">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-slate-600 uppercase">Email or Username</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#002366] transition-colors" size={16} />
                <input 
                  type="text" 
                  placeholder="Enter your credentials"
                  className="w-full border border-slate-200 rounded-lg py-3.5 pl-11 pr-4 outline-none focus:border-[#002366] transition-all text-sm font-medium text-slate-700 placeholder:text-slate-300"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="block text-[11px] font-bold text-slate-600 uppercase">Password</label>
                <button type="button" className="text-[10px] font-bold text-[#F48120] hover:underline">Forgot Password?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#002366] transition-colors" size={16} />
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full border border-slate-200 rounded-lg py-3.5 pl-11 pr-11 outline-none focus:border-[#002366] transition-all text-sm font-medium text-slate-700 placeholder:text-slate-300"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 py-1">
              <input type="checkbox" id="remember" className="w-3.5 h-3.5 rounded border-slate-300 text-[#002366] focus:ring-[#002366] cursor-pointer" />
              <label htmlFor="remember" className="text-xs font-semibold text-slate-400 cursor-pointer select-none hover:text-slate-600">Keep me logged in</label>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#002366] text-white py-3.5 rounded-lg font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-2 hover:bg-[#001a4d] transition-all active:scale-[0.99] shadow-md shadow-blue-900/10"
            >
              Sign in to Portal <LogIn size={14}/>
            </button>
          </form>
        </div>

        {/* Support Section */}
        <div className="bg-slate-50/50 border-t border-slate-100 p-5 text-center">
          <button className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase hover:text-slate-600 transition-all">
            Need help? <HelpCircle size={14} className="text-slate-300"/> <span className="underline decoration-slate-200 underline-offset-2">Contact Support</span>
          </button>
        </div>
      </div>

      {/* Global Access Footer */}
      <div className="mt-12 w-full max-w-[480px]">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-[1px] flex-1 bg-slate-200"></div>
          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.3em]">Global Access</span>
          <div className="h-[1px] flex-1 bg-slate-200"></div>
        </div>
        <div className="flex justify-center gap-6 opacity-30 grayscale hover:opacity-50 transition-opacity duration-300">
           {/* Placeholder for flags - icons are just rectangles for layout */}
           <div className="w-5 h-3.5 bg-slate-400 rounded-sm"></div>
           <div className="w-5 h-3.5 bg-slate-400 rounded-sm"></div>
           <div className="w-5 h-3.5 bg-slate-400 rounded-sm"></div>
        </div>
      </div>

      {/* Copyright Footer */}
      <div className="mt-16 w-full max-w-7xl flex flex-col md:flex-row justify-between items-center gap-4 border-t border-slate-200 pt-8 text-[9px] font-bold text-slate-400 uppercase tracking-widest px-4">
        <p>© 2026 Amity School. Empowering Education Digitally.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-600 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-slate-600 transition-colors">Security</a>
        </div>
      </div>
    </div>
  );
};

export default Login;