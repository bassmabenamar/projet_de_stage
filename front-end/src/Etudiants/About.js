import React from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, Menu, ArrowRight, Share2, Send, Link2, Globe,
  Users, BookOpen, Award, Phone, Quote
} from 'lucide-react';

const About = () => {
  const orangeBrand = "#F48120";
  const blueBrand = "#002366";

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-[#F48120] selection:text-white">
      
      {/* --- NAVBAR (Same as Home) --- */}
      <nav className="fixed top-0 w-full z-[100] bg-white border-b border-slate-100 px-6 md:px-16 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          <Menu className="md:hidden text-[#002366]" size={24} />
          <div className="bg-[#002366] p-1 rounded-lg">
             <GraduationCap className="text-white" size={24} />
          </div>
          <span className="text-[#002366] font-black text-xl tracking-tight uppercase">Amity School</span>
        </div>
        <div className="hidden md:flex gap-10 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
          <a href="#" className="hover:text-[#F48120] transition-all">Home</a>
          <a href="#" className="text-[#002366] border-b-2 border-[#002366] pb-1">About Us</a>
          <a href="#" className="hover:text-[#F48120] transition-all">Academics</a>
          <a href="#" className="hover:text-[#F48120] transition-all">Admission</a>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-2 text-[11px] font-black uppercase text-[#002366] border border-slate-200 rounded-md">Login</button>
          <button className="px-6 py-2 text-[11px] font-black uppercase bg-[#F48120] text-white rounded-md shadow-md">Register</button>
        </div>
      </nav>

      {/* --- ABOUT HERO / CONTENT --- */}
      <section className="pt-40 pb-24 px-6 md:px-20 max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        {/* Collage Layout bhal l-maquette */}
        <div className="relative grid grid-cols-2 gap-4">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} className="rounded-[40px] overflow-hidden h-64 shadow-xl translate-y-10">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600" className="w-full h-full object-cover" alt="Student 1" />
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="rounded-full overflow-hidden h-48 w-48 shadow-xl">
            <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600" className="w-full h-full object-cover" alt="Student 2" />
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="col-span-2 rounded-[60px] overflow-hidden h-72 shadow-2xl">
            <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800" className="w-full h-full object-cover" alt="Team Study" />
          </motion.div>
          {/* Floating Badge */}
          <div className="absolute top-1/2 -left-10 bg-[#F48120] p-6 rounded-3xl text-white shadow-2xl text-center hidden md:block">
            <p className="text-3xl font-black italic">20+</p>
            <p className="text-[10px] font-bold uppercase tracking-widest">Years of Excellence</p>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} className="space-y-8">
          <span className="text-[12px] font-black text-[#F48120] uppercase tracking-[0.4em]">About Us</span>
          <h2 className="text-5xl font-black text-[#002366] leading-tight">Our Education System Inspires You More.</h2>
          <p className="text-slate-500 leading-relaxed font-medium">Providing a transformative educational experience that nurtures creativity, discipline, and future-ready skills in every student.</p>
          
          <div className="grid grid-cols-1 gap-6">
            <div className="flex gap-4 items-start group">
              <div className="p-3 bg-[#F48120]/10 rounded-xl text-[#F48120] group-hover:bg-[#F48120] group-hover:text-white transition-all"><BookOpen size={24}/></div>
              <div>
                <h4 className="font-black text-[#002366] text-lg uppercase">Educational Services</h4>
                <p className="text-slate-400 text-sm">Top-tier academic programs and extracurricular coaching.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start group">
              <div className="p-3 bg-[#002366]/5 rounded-xl text-[#002366] group-hover:bg-[#002366] group-hover:text-white transition-all"><Globe size={24}/></div>
              <div>
                <h4 className="font-black text-[#002366] text-lg uppercase">International Hubs</h4>
                <p className="text-slate-400 text-sm">Global networking opportunities for our graduating students.</p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-6 pt-4">
            <button className="px-10 py-4 bg-[#F48120] text-white rounded-full font-bold uppercase text-[10px] tracking-widest hover:scale-105 transition-all">Discover More</button>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-slate-100 rounded-full text-[#002366]"><Phone size={18}/></div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Call Now<br/><span className="text-[#002366] text-sm">+212 654 7890</span></div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- STATS SECTION: Blue Background --- */}
      <section className="bg-[#002366] py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { icon: <BookOpen />, val: "500+", label: "Total Courses" },
            { icon: <Users />, val: "1900+", label: "Our Students" },
            { icon: <GraduationCap />, val: "750+", label: "Skilled Lecturers" },
            { icon: <Award />, val: "30+", label: "Win Awards" }
          ].map((stat, idx) => (
            <div key={idx} className="space-y-4 group">
              <div className="w-16 h-16 bg-[#F48120] rounded-2xl flex items-center justify-center text-white mx-auto group-hover:rotate-12 transition-all shadow-lg">
                {stat.icon}
              </div>
              <h3 className="text-4xl font-black text-white italic tracking-tighter">{stat.val}</h3>
              <p className="text-blue-200/50 text-[10px] font-bold uppercase tracking-[0.2em]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="py-32 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto text-center mb-20 space-y-4">
          <span className="text-[#F48120] font-black uppercase text-[10px] tracking-[0.5em]">Testimonials</span>
          <h2 className="text-4xl font-black text-[#002366]">What Our Students Say's</h2>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6">
          {[1,2,3,4].map((i) => (
            <motion.div key={i} whileHover={{ y: -10 }} className="bg-white p-8 rounded-[30px] shadow-sm border border-slate-100 relative group transition-all">
              <div className="text-orange-400 mb-4 flex gap-1">{"★".repeat(5)}</div>
              <p className="text-slate-500 text-xs italic leading-relaxed mb-6">"This platform changed my perspective on digital learning. The resources are truly premium."</p>
              <div className="flex items-center gap-3 pt-6 border-t border-slate-50">
                <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden"><img src={`https://i.pravatar.cc/100?u=${i}`} alt="user"/></div>
                <div className="text-left"><p className="text-xs font-black text-[#002366]">Student Name</p><p className="text-[9px] text-slate-400 font-bold uppercase">Amity Student</p></div>
              </div>
              <Quote className="absolute top-6 right-6 text-slate-100 group-hover:text-orange-100 transition-colors" size={40}/>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- TEACHERS --- */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto text-center mb-20 space-y-4">
          <span className="text-[#F48120] font-black uppercase text-[10px] tracking-[0.5em]">Our Teachers</span>
          <h2 className="text-4xl font-black text-[#002366]">Meet With Our Teachers</h2>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          {[1,2,3,4].map((i) => (
            <motion.div key={i} whileHover={{ scale: 1.05 }} className="bg-white rounded-[40px] overflow-hidden shadow-xl border border-slate-100 group">
              <div className="h-64 bg-slate-100 overflow-hidden relative">
                <img src={`https://images.unsplash.com/photo-${1500000000000 + i}?q=80&w=400`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Teacher" />
              </div>
              <div className="p-6 text-center space-y-2">
                <h4 className="font-black text-[#002366] uppercase text-sm tracking-tight">Angela T. Mitchell</h4>
                <p className="text-[10px] font-bold text-[#F48120] uppercase tracking-widest">Associate Professor</p>
              </div>
            </motion.div>
          ))}
        </div>
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

export default About;