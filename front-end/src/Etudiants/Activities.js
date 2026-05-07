import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, MapPin, Users, ArrowRight, 
  Plus, Rocket, Globe, Search, Bell, RefreshCw, MoreVertical
} from 'lucide-react';
import Navbar from './Navbar';

const Activities= () => {
  const premiumSpring = { type: "spring", stiffness: 100, damping: 18, mass: 1 };

  const containerVars = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.12, delayChildren: 0.2 } 
    }
  };

  const itemVars = {
    hidden: { y: 25, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: premiumSpring }
  };

  return (
    // Zt w-full hna bach t-ched l-ecran kamla
    <div className="flex min-h-screen w-full bg-[#F8FAFC] font-sans text-[#1E293B] antialiased">

      <main className="flex-1 w-full overflow-x-hidden overflow-y-auto pb-20">
        <Navbar />

        <motion.div 
          variants={containerVars}
          initial="hidden"
          animate="visible"
          className="p-4 md:p-10 max-w-[1550px] mx-auto"
        >
          {/* Header Section - Stacked on mobile */}
          <motion.div variants={itemVars} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
            <div>
              <h2 className="text-3xl md:text-[40px] font-black text-[#002366] tracking-tight leading-none">Activities & Events</h2>
              <p className="text-slate-400 font-bold text-base md:text-lg mt-3">Explore and join the vibrant life of Amity School.</p>
            </div>
            
            <div className="flex bg-white/80 backdrop-blur-md p-1.5 rounded-[20px] border border-slate-100 shadow-sm overflow-x-auto max-w-full no-scrollbar">
              {['Upcoming', 'My Registrations', 'Past Events'].map((tab, i) => (
                <motion.button 
                  key={tab}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`whitespace-nowrap px-6 md:px-8 py-3 rounded-[16px] text-[11px] font-black uppercase tracking-widest transition-all ${i === 0 ? 'bg-[#002366] text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:text-[#002366]'}`}
                >
                  {tab}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Grid - 1 col on mobile, 12 on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10">
            
            {/* HERO FEATURED CARD */}
            <motion.div 
              variants={itemVars}
              className="col-span-1 lg:col-span-8 relative group cursor-pointer overflow-hidden rounded-[35px] md:rounded-[45px] h-[400px] md:h-[500px] shadow-2xl shadow-blue-900/5"
            >
              <motion.div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] group-hover:scale-110"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002366] via-transparent to-transparent opacity-90" />
              
              <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 right-8 text-white">
                <span className="bg-orange-500 text-[9px] md:text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest mb-6 inline-block shadow-lg shadow-orange-500/40">Featured Event</span>
                <h3 className="text-2xl md:text-6xl font-black mb-4 md:mb-6 leading-tight tracking-tight">Annual Sports <br className="hidden md:block"/> Festival 2024</h3>
                <div className="flex flex-wrap gap-4 md:gap-8 items-center font-bold text-xs md:text-sm text-slate-100">
                  <div className="flex items-center gap-3"><Calendar size={20} className="text-orange-400"/> October 15-17</div>
                  <div className="flex items-center gap-3"><MapPin size={20} className="text-orange-400"/> Main Stadium</div>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05, gap: '20px' }}
                  className="mt-8 md:mt-10 bg-orange-600 text-white px-8 md:px-10 py-4 md:py-5 rounded-[18px] md:rounded-[22px] font-black uppercase text-xs tracking-[0.25em] flex items-center gap-3 shadow-xl shadow-orange-600/30 transition-all"
                >
                  Register Now <ArrowRight size={18} />
                </motion.button>
              </div>
            </motion.div>

            {/* SIDEBAR (Deadlines) */}
            <div className="col-span-1 lg:col-span-4 space-y-8">
              <motion.div variants={itemVars} className="bg-white rounded-[35px] md:rounded-[40px] p-8 md:p-10 border border-slate-50 shadow-sm relative overflow-hidden group hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500">
                <h4 className="font-black text-xl md:text-2xl text-[#002366] mb-8 md:mb-10 tracking-tight">Upcoming Deadlines</h4>
                <div className="space-y-6 md:space-y-8">
                  <DeadlineItem icon={<Rocket className="text-orange-500"/>} title="Robotics Club Finals" sub="Closes in 2 days" color="border-orange-500" />
                  <DeadlineItem icon={<Globe className="text-blue-500"/>} title="Europe Science Trip" sub="Deposit due Friday" color="border-blue-500" />
                </div>

                <div className="mt-10 md:mt-12 pt-8 md:pt-10 border-t border-slate-50 flex justify-between">
                  <StatBox label="Active Clubs" value="24" />
                  <div className="w-px h-12 bg-slate-100 self-center" />
                  <StatBox label="Students Joined" value="1.2k" />
                </div>
              </motion.div>
            </div>

            {/* ALL ACTIVITIES GRID */}
            <div className="col-span-1 lg:col-span-12 mt-8 md:mt-12">
              <motion.div variants={itemVars} className="flex justify-between items-center mb-8 md:mb-10">
                <h3 className="text-2xl md:text-3xl font-black text-[#002366] tracking-tight">All Activities</h3>
                <div className="flex gap-4">
                  <button className="p-3 md:p-4 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-[#002366] transition-all shadow-sm"><MoreVertical size={20}/></button>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                <ActivityCard 
                  img="https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=500"
                  tag="Sports"
                  title="Varsity Soccer Tryouts"
                  desc="Open to all grades. Bring your own cleats and hydration. Mandatory for team consideration."
                  tagColor="bg-green-100 text-green-700"
                  buttonType="details"
                />
                <ActivityCard 
                  img="https://images.unsplash.com/photo-1586165368502-1bad197a6461?q=80&w=500"
                  tag="Clubs"
                  title="Grandmaster Chess Club"
                  desc="Weekly meetings every Tuesday in Library Hall B. All skill levels welcome."
                  tagColor="bg-purple-100 text-purple-700"
                  buttonType="register"
                />
                <ActivityCard 
                  img="https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=500"
                  tag="Trip"
                  title="Arts & History NYC Tour"
                  desc="A 3-day immersive experience visiting the Met, MoMA, and Broadway."
                  tagColor="bg-blue-100 text-blue-700"
                  badge="5 Spots Left"
                  buttonType="register"
                />
              </div>
            </div>

            {/* THE WEEK AHEAD SECTION */}
            <motion.div 
              variants={itemVars}
              className="col-span-1 lg:col-span-12 mt-6 md:mt-10 bg-[#002366] rounded-[35px] md:rounded-[50px] p-8 md:p-12 text-white flex flex-col xl:flex-row items-center justify-between shadow-2xl shadow-blue-900/30 relative overflow-hidden group gap-10"
            >
              <div className="relative z-10 text-center xl:text-left">
                <h3 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">The Week Ahead</h3>
                <p className="text-blue-200/60 font-bold max-w-sm mb-8 md:mb-10 mx-auto xl:mx-0">Synchronize your portal calendar with your personal device.</p>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-[#002366] px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center gap-3 shadow-xl transition-all mx-auto xl:mx-0"
                >
                  <RefreshCw size={16} /> Sync Calendar
                </motion.button>
              </div>

              <div className="flex flex-wrap justify-center gap-4 relative z-10">
                <TimelineCard day="MONDAY" title="Debate Prep" sub="3:30 PM" />
                <TimelineCard day="TUESDAY" title="Coding 101" sub="4:00 PM" />
                <TimelineCard day="WEDNESDAY" title="Art Gala" sub="6:00 PM" active />
              </div>
              
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] -mr-40 -mt-40 group-hover:bg-blue-500/20 transition-all duration-700" />
            </motion.div>
          </div>
        </motion.div>

        <motion.button 
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-6 right-6 md:bottom-12 md:right-12 w-16 h-16 md:w-20 md:h-20 bg-orange-600 text-white rounded-full flex items-center justify-center shadow-2xl z-50 border-4 border-white"
        >
          <Plus className="w-8 h-8 md:w-10 md:h-10" strokeWidth={3} />
        </motion.button>
      </main>
    </div>
  );
};

// --- Sub-components ---

const DeadlineItem = ({ icon, title, sub, color }) => (
  <motion.div 
    whileHover={{ x: 10, backgroundColor: '#F8FAFC' }}
    className={`flex items-center gap-4 md:gap-6 p-4 rounded-3xl cursor-pointer border-l-[6px] ${color} transition-all duration-300`}
  >
    <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-800 shadow-sm shrink-0">{icon}</div>
    <div className="min-w-0">
      <h5 className="font-black text-[#002366] text-sm md:text-lg leading-tight truncate">{title}</h5>
      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-1">{sub}</p>
    </div>
  </motion.div>
);

const StatBox = ({ label, value }) => (
  <div className="text-center">
    <h5 className="text-3xl md:text-4xl font-black text-[#002366] tracking-tighter">{value}</h5>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{label}</p>
  </div>
);

const ActivityCard = ({ img, tag, title, desc, tagColor, next, badge, buttonType = 'details' }) => (
  <motion.div 
    whileHover={{ y: -15 }}
    className="bg-white rounded-[35px] md:rounded-[45px] overflow-hidden border border-slate-50 shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 group flex flex-col h-full"
  >
    <div className="relative h-48 md:h-64 overflow-hidden shrink-0">
      <motion.img 
        src={img} 
        whileHover={{ scale: 1.15 }}
        transition={{ duration: 0.8 }}
        className="w-full h-full object-cover"
      />
      <span className={`absolute top-6 left-6 md:top-8 md:left-8 px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg ${tagColor}`}>
        {tag}
      </span>
    </div>
    <div className="p-6 md:p-10 flex flex-col flex-1">
      <h4 className="text-xl md:text-2xl font-black text-[#002366] leading-tight mb-4 group-hover:text-orange-600 transition-colors">{title}</h4>
      <p className="text-slate-400 font-bold text-xs md:text-sm leading-relaxed mb-8 line-clamp-2">{desc}</p>
      
      <div className="mt-auto flex justify-between items-center pt-6 md:pt-8 border-t border-slate-50">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-3">
            {[1,2].map(i => <img key={i} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 md:border-4 border-white shadow-sm" src={`https://i.pravatar.cc/100?u=${i+title}`} alt="user"/>)}
          </div>
          <span className="text-[11px] font-black text-slate-400">+42</span>
        </div>

        {buttonType === 'register' ? (
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#002366] text-white px-6 md:px-8 py-2 md:py-3 rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg hover:bg-orange-600 transition-all duration-300"
          >
            Register
          </motion.button>
        ) : (
          <button className="text-[#002366] font-black text-[11px] uppercase tracking-widest hover:text-orange-600 transition-colors">
            Details
          </button>
        )}
      </div>
      {badge && <div className="mt-4 text-orange-600 font-black text-[9px] md:text-[10px] uppercase flex items-center gap-2 tracking-widest">⚠️ {badge}</div>}
    </div>
  </motion.div>
);

const TimelineCard = ({ day, title, sub, active }) => (
  <motion.div 
    whileHover={{ y: -5, scale: 1.02 }}
    className={`p-5 md:p-6 rounded-[24px] md:rounded-[28px] min-w-[140px] md:min-w-[180px] border transition-all cursor-pointer ${active ? 'bg-orange-600 border-transparent shadow-xl shadow-orange-600/30' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
  >
    <p className={`text-[9px] md:text-[10px] font-black tracking-widest mb-3 md:mb-4 ${active ? 'text-white/70' : 'text-slate-400'}`}>{day}</p>
    <h5 className="font-black text-sm md:text-base mb-1 tracking-tight">{title}</h5>
    <p className={`text-[10px] md:text-[11px] font-bold ${active ? 'text-white/80' : 'text-slate-400'}`}>{sub}</p>
  </motion.div>
);

export default Activities;