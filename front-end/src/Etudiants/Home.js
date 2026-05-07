import React from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Layout, 
  Menu, 
  Globe2, 
  GraduationCap,
  BookOpen,
  Share2,
  Send,
  Link2,
  Globe
} from 'lucide-react';

const Home = () => {
  const orangeBrand = "#F48120";
  const blueBrand = "#002366";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-[#F48120] selection:text-white">
      
      {/* --- NAVBAR (Nfss l-code dialek) --- */}
      <nav className="fixed top-0 w-full z-[100] bg-white border-b border-slate-100 px-6 md:px-16 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          <Menu className="md:hidden text-[#002366]" size={24} />
          <div className="bg-[#002366] p-1 rounded-lg">
             <GraduationCap className="text-white" size={24} />
          </div>
          <span className="text-[#002366] font-black text-xl tracking-tight uppercase">Amity School</span>
        </div>
        
        <div className="hidden md:flex gap-10 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
          <a href="#" className="text-[#002366] border-b-2 border-[#002366] pb-1">Home</a>
          {['About Us', 'Academics', 'Admission'].map((item) => (
            <a key={item} href="#" className="hover:text-[#F48120] transition-colors duration-300">{item}</a>
          ))}
        </div>

        <div className="flex gap-4">
          <button className="px-6 py-2 text-[11px] font-black uppercase text-[#002366] border border-slate-200 rounded-md hover:bg-slate-50 transition-all">Login</button>
          <button className="px-6 py-2 text-[11px] font-black uppercase bg-[#F48120] text-white rounded-md shadow-md hover:bg-orange-600 transition-all">Register</button>
        </div>
      </nav>

      {/* --- HERO: Maquette Style --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/30 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1523050853051-be991f85a6ad?q=80&w=2000" 
            className="w-full h-full object-cover" 
            alt="Campus" 
          />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="relative z-20 text-center px-6 max-w-5xl"
        >
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight mb-8 drop-shadow-lg">
            Empowering Education Digitally
          </h1>
          <p className="text-white text-lg md:text-xl font-medium mb-12 opacity-95 leading-relaxed max-w-3xl mx-auto drop-shadow-md">
            Nurturing the next generation of leaders through innovative digital integration and a commitment to academic excellence in a global community.
          </p>
          
          <div className="flex flex-col md:flex-row gap-5 justify-center">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 bg-[#002366] text-white rounded-md font-bold text-sm uppercase tracking-widest hover:bg-[#001a4d] transition-all"
            >
              Explore Programs
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-white text-[#002366] border-2 border-white rounded-md font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-transparent hover:text-white transition-all"
            >
              <Play size={16} fill="currentColor" /> Watch Virtual Tour
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* --- MISSION: Exact Maquette Layout --- */}
      <section className="py-32 px-6 md:px-20 max-w-7xl mx-auto grid md:grid-cols-2 gap-24 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-[#F8F9FA] p-8 md:p-16 rounded-[60px] relative shadow-inner group"
        >
          <img 
            src="https://img.freepik.com/free-vector/happy-students-group-standing-together-holding-books-illustration_1150-39164.jpg" 
            alt="Students" 
            className="w-full h-auto group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="mt-8 text-center">
             <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">Teachbbit Safee Work</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <span className="text-[12px] font-black text-[#F48120] uppercase tracking-[0.5em]">Our Mission</span>
          <h2 className="text-5xl font-black text-[#002366] leading-[1.1]">Academic Excellence & Modern Values</h2>
          <div className="space-y-6 text-slate-500 text-md leading-relaxed font-medium">
            <p>At Amity School, we believe that education is the foundation of a bright future. Our mission is to provide a holistic learning environment that fosters critical thinking, creativity, and social responsibility.</p>
            <p>By integrating cutting-edge digital tools with traditional pedagogical strengths, we ensure our students are prepared for the challenges of the 21st century.</p>
          </div>
          <button className="flex items-center gap-3 text-[#002366] font-black text-xs uppercase tracking-widest hover:text-[#F48120] transition-all group">
            Learn more about our heritage <ArrowRight size={16} className="group-hover:translate-x-3 transition-transform" />
          </button>
        </motion.div>
      </section>

      {/* --- CORE PILLARS: Grid Maquette --- */}
      <section className="py-32 bg-[#F1F5F9]/50 px-6">
        <div className="max-w-7xl mx-auto text-center mb-24 space-y-4">
          <h2 className="text-5xl font-black text-[#002366]">Our Core Pillars</h2>
          <p className="text-slate-400 font-medium max-w-2xl mx-auto">Leveraging technology to bridge the gap between students, teachers, and parents.</p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: Large White */}
          <motion.div 
            whileHover={{ y: -15, scale: 1.02 }}
            className="md:col-span-2 bg-white p-12 rounded-[40px] shadow-sm border border-slate-100 flex flex-col md:flex-row gap-10 items-center overflow-hidden transition-all"
          >
            <div className="flex-1 space-y-5">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center"><Layout size={24} /></div>
              <h3 className="text-2xl font-black text-[#002366]">Unified School Management</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Seamlessly manage attendance, schedules, and resources with our intelligent portal designed for modern administrative efficiency.</p>
            </div>
            <div className="flex-1 bg-slate-900 rounded-3xl h-64 w-full overflow-hidden">
               <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800" className="w-full h-full object-cover opacity-80" alt="Dashboard" />
            </div>
          </motion.div>

          {/* Card 2: Deep Blue */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-[#002366] p-12 rounded-[40px] text-white flex flex-col justify-between shadow-2xl relative overflow-hidden"
          >
            <div className="space-y-6">
               <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-[#F48120]"><BookOpen size={24} /></div>
               <h3 className="text-2xl font-bold italic">Academic Excellence</h3>
               <p className="text-blue-100/60 text-sm leading-relaxed">Curriculums designed to challenge and inspire students toward world-class results.</p>
            </div>
            <div className="flex items-center gap-3 mt-12">
               <div className="flex -space-x-3">
                  {[1,2,3].map(i => <img key={i} src={`https://i.pravatar.cc/100?u=${i+10}`} className="w-10 h-10 rounded-full border-2 border-[#002366]" alt="Student" />)}
               </div>
               <span className="text-xs font-black text-orange-400">+1200 Students</span>
            </div>
          </motion.div>

          {/* Card 3: Orange Hub */}
          <motion.div 
            whileHover={{ y: -15 }}
            className="bg-[#F48120] p-12 rounded-[40px] text-white flex flex-col items-center justify-center text-center gap-6 shadow-xl"
          >
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center shadow-inner"><ShieldCheck size={40} /></div>
            <h3 className="text-3xl font-black italic">Parent Hub</h3>
            <p className="text-white/90 text-sm">Real-time updates on student progress and school activities.</p>
          </motion.div>

          {/* Card 4: Classrooms */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="md:col-span-2 bg-white p-12 rounded-[40px] border border-slate-100 shadow-sm flex flex-col md:flex-row-reverse gap-10 items-center overflow-hidden"
          >
            <div className="flex-1 space-y-5">
              <h3 className="text-2xl font-black text-[#002366]">Next-Gen Classrooms</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Smart classrooms equipped with VR, AI-assisted learning, and collaborative platforms that make education engaging.</p>
              <div className="flex gap-6">
                <span className="text-[11px] font-black text-orange-500 flex items-center gap-2 uppercase"><Zap size={14}/> VR Ready</span>
                <span className="text-[11px] font-black text-blue-500 flex items-center gap-2 uppercase"><Zap size={14}/> AI Mentors</span>
              </div>
            </div>
            <div className="flex-1 rounded-3xl overflow-hidden h-64 w-full">
               <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Classroom" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- READY TO JOIN: Blue Banner --- */}
      <section className="py-32 px-6 md:px-20">
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="max-w-7xl mx-auto bg-[#001a4d] rounded-[60px] p-16 md:p-32 text-center text-white relative overflow-hidden shadow-2xl"
        >
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-7xl font-black tracking-tight leading-none">Ready to join the<br/>Amity Community?</h2>
            <p className="text-blue-200/70 max-w-2xl mx-auto text-lg font-medium leading-relaxed">Enrollment for the 2024-2025 academic session is now open. Start your journey toward excellence today.</p>
            <div className="flex flex-col md:flex-row gap-6 justify-center pt-8">
              <motion.button 
                whileHover={{ scale: 1.1, backgroundColor: "#e67300" }}
                className="px-12 py-5 bg-[#F48120] text-white rounded-full font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-orange-500/20"
              >
                Register Now
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                className="px-12 py-5 border-2 border-white/20 text-white rounded-full font-black uppercase text-xs tracking-[0.2em] transition-all"
              >
                Contact Admissions
              </motion.button>
            </div>
          </div>
          {/* Abstract background circle */}
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]"></div>
        </motion.div>
      </section>

      {/* --- FOOTER: Pure Brand Blue #002366 --- */}
      <footer className="bg-[#002366] pt-24 pb-12 text-white px-6 md:px-20 mt-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16 border-b border-white/10 pb-20 mb-12">
          
          {/* Logo & Intro Section */}
          <div className="col-span-1 space-y-8">
            <div className="flex items-center gap-3">
              <div className="bg-[#F48120] p-2 rounded-xl shadow-lg shadow-orange-500/20">
                <GraduationCap size={24} />
              </div>
              <span className="text-2xl font-black italic tracking-tighter uppercase">Amity School</span>
            </div>
            <p className="text-blue-100/60 text-sm leading-relaxed">
              Leading the way in digital transformation of education and student management systems.
            </p>
            <div className="flex gap-5">
              <Share2 size={20} className="text-blue-200/40 hover:text-[#F48120] cursor-pointer transition-all" />
              <Send size={20} className="text-blue-200/40 hover:text-[#F48120] cursor-pointer transition-all" />
              <Link2 size={20} className="text-blue-200/40 hover:text-[#F48120] cursor-pointer transition-all" />
            </div>
          </div>
          
          {/* Links Section */}
          <div className="space-y-8">
            <h4 className="text-[12px] font-black uppercase tracking-[0.3em] text-[#F48120]">Our Links</h4>
            <ul className="space-y-5 text-blue-100/60 text-xs font-bold uppercase tracking-widest">
              <li className="hover:text-white cursor-pointer transition-all hover:translate-x-2">About Us</li>
              <li className="hover:text-white cursor-pointer transition-all hover:translate-x-2">Academics</li>
              <li className="hover:text-white cursor-pointer transition-all hover:translate-x-2">Contact Support</li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-8 md:col-span-2">
            <h4 className="text-[12px] font-black uppercase tracking-[0.3em] text-[#F48120]">Newsletter</h4>
            <p className="text-blue-100/60 text-sm font-medium">Join our community to stay updated on latest academic news.</p>
            <div className="relative group max-w-md">
              <input 
                type="text" 
                placeholder="Your Email Address" 
                className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 text-sm outline-none focus:border-[#F48120] transition-all placeholder:text-blue-200/20 text-white" 
              />
              <button className="absolute right-2 top-2 bg-[#F48120] p-3 rounded-full text-white hover:scale-110 active:scale-95 transition-all shadow-lg shadow-orange-600/40">
                <ArrowRight size={18}/>
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-blue-200/30 text-[10px] font-bold uppercase tracking-[0.2em]">
          <span>© 2026 Amity School - Empowering Education Digitally</span>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-all">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-all">Terms of Service</a>
            <div className="flex gap-2 items-center"><Globe size={12}/> EN</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;