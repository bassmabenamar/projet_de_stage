import { MessageSquare, Plus, Send, Search, Users, UserCheck } from "lucide-react";


export default function Messages() {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-auto">
        <div className="p-6 flex-1 flex flex-col pb-2">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-semibold text-gray-800">Messages</h1>
              <p className="text-gray-500">Discutez avec l'équipe et les étudiants.</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-3 mb-4">
            <div className="px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 bg-[#2F5D9F] text-white shadow-sm">
              <Users size={16} />
              Tous
            </div>
            <div className="px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 bg-white border border-gray-300 text-gray-700">
              <Users size={16} />
              Étudiants
            </div>
            <div className="px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 bg-white border border-gray-300 text-gray-700">
              <UserCheck size={16} />
              Formateurs
            </div>
          </div>

          {/* Chat container - prend toute la hauteur restante avec un léger padding réduit */}
          <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm min-h-0 h-[340px]">
            {/* Sidebar des conversations */}
            <div className="flex w-80 flex-col border-r border-gray-200">
              <div className="flex items-center justify-between gap-2 border-b border-gray-200 p-3">
                <h2 className="text-sm font-medium text-gray-700">Conversations <span className="ml-1 text-xs text-gray-400">(3)</span></h2>
                <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                  <Plus className="h-4 w-4 text-[#2F5D9F]" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {/* Conversation 1 - Étudiant */}
                <div className="flex w-full items-center gap-3 border-b border-gray-100 px-3 py-3 hover:bg-gray-50 transition-colors cursor-pointer bg-orange-50">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2F5D9F] to-[#E55B2D] flex items-center justify-center text-white text-sm font-medium">SM</div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-medium text-gray-800">Sarah Martin</p>
                      <span className="text-xs text-gray-400">14:30</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-xs text-gray-500">Merci pour votre aide !</p>
                      <span className="bg-[#E55B2D] text-white text-[10px] font-medium rounded-full h-5 min-w-5 px-1.5 flex items-center justify-center">2</span>
                    </div>
                    <div className="mt-1">
                      <span className="text-[10px] text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded">Étudiant</span>
                    </div>
                  </div>
                </div>

                {/* Conversation 2 - Étudiant */}
                <div className="flex w-full items-center gap-3 border-b border-gray-100 px-3 py-3 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2F5D9F] to-[#E55B2D] flex items-center justify-center text-white text-sm font-medium">LO</div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-medium text-gray-800">Leila Ouazzani</p>
                      <span className="text-xs text-gray-400">09:20</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-xs text-gray-500">Je n'ai pas reçu le lien</p>
                      <span className="bg-[#E55B2D] text-white text-[10px] font-medium rounded-full h-5 min-w-5 px-1.5 flex items-center justify-center">1</span>
                    </div>
                    <div className="mt-1">
                      <span className="text-[10px] text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded">Étudiant</span>
                    </div>
                  </div>
                </div>

                {/* Conversation 3 - Étudiant */}
                <div className="flex w-full items-center gap-3 border-b border-gray-100 px-3 py-3 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2F5D9F] to-[#E55B2D] flex items-center justify-center text-white text-sm font-medium">FZ</div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-medium text-gray-800">Fatima Zahra</p>
                      <span className="text-xs text-gray-400">Hier</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-xs text-gray-500">Quand est le prochain examen ?</p>
                      <span className="bg-[#E55B2D] text-white text-[10px] font-medium rounded-full h-5 min-w-5 px-1.5 flex items-center justify-center">3</span>
                    </div>
                    <div className="mt-1">
                      <span className="text-[10px] text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded">Étudiant</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Zone de chat */}
            <div className="flex flex-1 flex-col min-w-0 ">
              {/* Header du chat */}
              <div className="flex items-center gap-3 border-b border-gray-200 p-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2F5D9F] to-[#E55B2D] flex items-center justify-center text-white text-sm font-medium">SM</div>
                <div>
                  <p className="font-medium text-gray-800">Sarah Martin</p>
                  <p className="text-xs text-gray-500">Étudiant - 2ème Année</p>
                </div>
              </div>

              {/* Messages - prend toute la hauteur */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
                <div className="flex justify-start">
                  <div className="max-w-[70%] rounded-2xl px-4 py-2 text-sm bg-gray-100 text-gray-800">
                    <p>Bonjour, j'ai une question concernant le cours</p>
                    <p className="mt-1 text-[10px] text-gray-400">10:30</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="max-w-[70%] rounded-2xl px-4 py-2 text-sm bg-[#2F5D9F] text-white">
                    <p>Bonjour Sarah, bien sûr, je vous écoute</p>
                    <p className="mt-1 text-[10px] text-white/70">10:32</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="max-w-[70%] rounded-2xl px-4 py-2 text-sm bg-gray-100 text-gray-800">
                    <p>Merci pour votre aide !</p>
                    <p className="mt-1 text-[10px] text-gray-400">14:30</p>
                  </div>
                </div>
              </div>

              {/* Input d'envoi */}
              <div className="flex items-center gap-2 border-t border-gray-200 p-3">
                <input type="text" placeholder="Écrire un message..." className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" />
                <button className="p-2 bg-[#E55B2D] text-white rounded-lg hover:bg-[#c44d24] transition-colors">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}